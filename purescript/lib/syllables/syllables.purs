module Syllables
  ( languages
  , lookUpLanguageGenerator
  , manyWords
  , module Syllables.Tsal
  )
  where

import Control.Monad.Gen.Trans
import Data.Array
import Prelude
import Syllables.Tsal
import Data.Tuple
import Data.List.Lazy (replicateM)
import Data.Traversable (sequence)
import Data.Map (Map)
import Data.Map (fromFoldable, lookup) as M
import Data.Maybe

manyWords :: Int -> Gen Int -> Gen String -> Gen (Array String)
manyWords count szgen gen = do
  sizes <- fromFoldable <$> replicateM count szgen
  sequence $ map (flip resizeGen gen) sizes

languages :: Array (Tuple String (Gen String))
languages = [
    Tuple "Tsal" tsalWord
    --Tuple "Q" (pure "q")
]

languageMap :: Map String (Gen String)
languageMap = M.fromFoldable languages

lookUpLanguageGenerator :: String -> Gen String
lookUpLanguageGenerator l = case M.lookup l languageMap of
  Just g -> g
  Nothing -> pure "Error"