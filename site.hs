--------------------------------------------------------------------------------
{-# LANGUAGE OverloadedStrings #-}
import           Control.Monad
import qualified Data.ByteString.Char8 as BS
import           Data.List
import           Data.Maybe
import           Data.Monoid         (mappend)
import           Data.String         (fromString)
import qualified Data.Text           as T
import           Hakyll
import           Text.Pandoc.Options
import           System.Directory (getCurrentDirectory)
import           System.FilePath (joinPath, takeFileName)
import           System.IO.Temp (withTempFile)
import           System.Process (callCommand)

{-------------------------------------------------------------------------------
Configuration
-------------------------------------------------------------------------------}
config :: Configuration
config = defaultConfiguration
  { destinationDirectory = "docs"
  }
{-------------------------------------------------------------------------------
Main
-------------------------------------------------------------------------------}
main :: IO ()
main = hakyllWith config $ do
        forM_ [ "CNAME"
              , "resources/**"
              , "fonts/**"
              ] $ \f -> match f $ do
            route   idRoute
            compile copyFileCompiler

        match "css/*" $ do
            route   idRoute
            compile compressCssCompiler

        match "pages/**.html" $ do
            route $ stripPrefixRoute "pages/"
            compile $ compileWithDefaultOptions getResourceBody

        match "pages/**.markdown" $ do
            route $ stripPrefixRoute "pages/" `composeRoutes` setExtension "html"
            compile $ compileWithDefaultOptions fullPandocCompiler

        forM_ ["cgt", "tsal"] $ \f -> do
            match (postFolder f ".html") $ do
                route $ stripPrefixRoute "posts/"
                compile $ postCompiler getResourceBody

            match (postFolder f ".markdown") $ do
                route $ stripPrefixRoute "posts/" `composeRoutes` setExtension "html"
                compile $ postCompiler fullPandocCompiler

            match (fromGlob $ "posts/" ++ f ++ ".markdown") $ do
                route $ stripPrefixRoute "posts/" `composeRoutes` setExtension "html"
                compile $ compileWithDefaultOptions $ do
                    posts <- loadAll (fromGlob $ "posts/" ++ f ++ "/**.markdown")

                    let indexCtx = getIndexContext posts

                    fullPandocCompiler >>=
                        loadAndApplyTemplate "templates/postlist.html" indexCtx




        match "js/**" $ do
            route idRoute
            compile copyFileCompiler --todo minify or something

        match "purescript/src/*" $ do
            route $ gsubRoute "purescript/src" (const "js") `composeRoutes` gsubRoute ".purs" (const ".js")
            compile purescriptCompiler

        match "templates/*" $ compile templateBodyCompiler

        match "misc/**" $ do
            route $ stripPrefixRoute "misc/"
            compile copyFileCompiler
{-------------------------------------------------------------------------------
Math In Pandoc
-------------------------------------------------------------------------------}
globalReaderOptions :: ReaderOptions
globalReaderOptions = defaultHakyllReaderOptions

globalWriterOptions :: WriterOptions
globalWriterOptions = defaultHakyllWriterOptions

mathReaderOptions :: ReaderOptions
mathReaderOptions =  globalReaderOptions {
    readerExtensions =
        readerExtensions globalReaderOptions <> extensionsFromList [
            Ext_tex_math_single_backslash  -- TeX math btw (..) [..]
          , Ext_tex_math_double_backslash  -- TeX math btw \(..\) \[..\]
          , Ext_tex_math_dollars           -- TeX math between $..$ or $$..$$
          , Ext_latex_macros               -- Parse LaTeX macro definitions (for math only)
        ]
      }

mathWriterOptions :: WriterOptions
mathWriterOptions = globalWriterOptions {
        writerHTMLMathMethod = MathJax "" --render math
    }

mathPandocCompiler :: Compiler (Item String)
mathPandocCompiler = pandocCompilerWith mathReaderOptions mathWriterOptions

fullPandocCompiler :: Compiler (Item String)
fullPandocCompiler = do
  identifier <- getUnderlying
  s <- getMetadataField identifier "katex"
  case s of
    Just "on"   -> mathPandocCompiler
    Just "true" -> mathPandocCompiler
    _           -> pandocCompiler

{-------------------------------------------------------------------------------
Context Manipulation
-------------------------------------------------------------------------------}

makeBooleanContext :: String -> Context a
makeBooleanContext fieldName = field fieldName $ \item -> do
    f <- getMetadataField (itemIdentifier item) fieldName
    case f of
        Just "true" -> return ""
        Just "on"   -> return ""
        _           -> noResult "intentional failure"

mathContext :: Context a
--mathContext = makeBooleanStringContext "katex" katexScriptString
mathContext = makeBooleanContext "katex"

makeListOfStringsContext :: String -> String -> (String -> String) -> Context a
makeListOfStringsContext fieldName subfieldName subFieldF = listFieldWith fieldName ctx (\item -> do
    rawlist <- getMetadataField (itemIdentifier item) fieldName

    return $ makeList rawlist
    ) where
        makeList (Just l) = map (makeItem . trim) $ splitAll "," l
        makeList Nothing  = []
        ctx = field subfieldName (return . itemBody)
        makeItem i = Item {
            itemIdentifier = fromString i,
            itemBody = fromString $ subFieldF i
        }

includesContext :: Context String
includesContext = makeListOfStringsContext "includes" "include" (\s -> "/js/" ++ s ++ ".js")

externIncludesContext :: Context String
externIncludesContext = makeListOfStringsContext "extincludes" "include" id

lateIncludesContext :: Context String
lateIncludesContext = makeListOfStringsContext "lateincludes" "include" (\s -> "/js/" ++ s ++ ".js")

fullContext :: Context String
fullContext = externIncludesContext
           <> includesContext
           <> lateIncludesContext
           <> mathContext
           <> defaultContext

stripPrefixRoute :: String -> Routes
stripPrefixRoute s = gsubRoute s (const "")

compileWithDefaultOptions :: Compiler (Item String) -> Compiler (Item String)
compileWithDefaultOptions c = do
    c >>= loadAndApplyTemplate "templates/default.html" fullContext
      >>= relativizeUrls

{-------------------------------------------------------------------------------
Posts
-------------------------------------------------------------------------------}
postFolder :: String -> String -> Pattern
postFolder f ext = fromGlob $ "posts/" ++ f ++ "/**" ++ ext

getIndexContext :: [Item String] -> Context String
getIndexContext posts = listField "posts" fullContext (filterAndSortPosts posts) <> fullContext

getPostIndex :: Item String -> Compiler (Maybe Int)
getPostIndex post = do
    s <- getMetadataField (itemIdentifier post) "index"
    return $ read <$> s

isPostVisible :: Item String -> Compiler Bool
isPostVisible post = isJust <$> getMetadataField (itemIdentifier post) "index"

filterAndSortPosts :: [Item String] -> Compiler [Item String]
filterAndSortPosts posts = do
    filteredPosts <- filterM isPostVisible posts
    let makePair p = getPostIndex p >>= (\i -> return (p, i))
    postsWithIndices <- mapM makePair filteredPosts
    return $ map fst $ sortOn snd postsWithIndices

postCompiler :: Compiler (Item String) -> Compiler (Item String)
postCompiler c = do
    compileWithDefaultOptions $ c
        >>= loadAndApplyTemplate "templates/post.html" fullContext

{-------------------------------------------------------------------------------
Purescript
-------------------------------------------------------------------------------}
purescriptCompiler :: Compiler (Item String)
purescriptCompiler = do
    inputFile <- getResourceFilePath
    compiledJs <- unsafeCompiler $ do
        -- get purescript module name
        inputText <- readFile inputFile
        let moduleName = words inputText !! 1 --quiet, you.
        --build it
        dir <- getCurrentDirectory
        withTempFile (joinPath [dir, "purescript"]) "index.js" $ \outputFile h -> do
            putStrLn $ "Building purescript" ++ inputFile
            -- using the absolute path for spago 0.93.40 until it gets actually added to nixpkgs or until i learn how to use nixos overlays
            -- this does mean that practically nobody else will be able to build this site. but who else would want to build this site.
            let spago = "cd purescript; /etc/profiles/per-user/bazinga/bin/spago bundle --module " ++ moduleName ++ " --outfile " ++ takeFileName outputFile
            putStrLn $ "Running " ++ spago
            callCommand spago
            BS.unpack <$> BS.hGetContents h

    makeItem compiledJs
