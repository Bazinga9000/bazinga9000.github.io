module Syllables.Tsal where

import Control.Monad.Gen.Trans
import Data.Array.NonEmpty
import Data.Tuple
import Prelude

import Data.Array as A
import Data.Array.NonEmpty
import Data.Array.NonEmpty.Internal
import Data.List.Lazy (replicateM)
import Data.String as S
import Data.String.Pattern



tsalConsonants :: NonEmptyArray String
tsalConsonants = NonEmptyArray ["p","t","k","b","d","g","s","lh","sh","x","z","zh","xh","TS","ch","kh","DZ","j","m","n","rh","r","l","y","w"]

tsalInitialConsonants :: NonEmptyArray String
tsalInitialConsonants = NonEmptyArray ["p","t","k","b","d","g","s","lh","sh","x","z","zh","xh","TS","ch","kh","DZ","j","m","n","rh","r","l"]

tsalInitialConsonantsWithW :: NonEmptyArray String
tsalInitialConsonantsWithW = tsalInitialConsonants <> singleton ""

tsalInitialConsonantsWithY :: NonEmptyArray String
tsalInitialConsonantsWithY = tsalInitialConsonants <> singleton ""

tsalVowels :: NonEmptyArray String
tsalVowels = NonEmptyArray ["a", "e", "i", "o", "u"]

tsalFinalConsonants :: NonEmptyArray String
tsalFinalConsonants = tsalInitialConsonants



tsalSyllableList :: Gen (Array String)
tsalSyllableList = do
    initial <- frequency $ NonEmptyArray [
        Tuple 2.0 $ pure [], -- null initial 
        Tuple 5.0 $ (\x -> [x]) <$> elements tsalInitialConsonants, -- consonant initial 
        Tuple 1.0 $ (\x -> [x, "y"]) <$> elements tsalInitialConsonantsWithY, -- Cj
        Tuple 1.0 $ (\x -> [x, "w"]) <$> elements tsalInitialConsonantsWithW -- Cw
    ]
    rime <- frequency $ NonEmptyArray [
        Tuple 2.0 $ (\x -> [x]) <$> elements tsalVowels, -- short vowel
        Tuple 1.0 $ (\x -> [x <> "h"]) <$> elements tsalVowels, -- long vowel
        Tuple 3.0 $ do -- closed syllable
            v <- elements tsalVowels
            c <- elements tsalFinalConsonants 
            pure [v,c]
    ]

    pure $ initial <> rime

fixSpelling :: String -> String
fixSpelling = fixTS >>> fixDZ >>> lowerAffTS >>> lowerAffDZ where
    fixTS = S.replaceAll (Pattern "ts") (Replacement "t's")
    fixDZ = S.replaceAll (Pattern "dz") (Replacement "d'z")
    lowerAffTS = S.replaceAll (Pattern "TS") (Replacement "ts")
    lowerAffDZ = S.replaceAll (Pattern "DZ") (Replacement "dz")

tsalWord :: Gen String
tsalWord = sized tsalPolysyllabic where
    tsalPolysyllabic sz = A.fromFoldable >>> A.concat >>> A.fold >>> fixSpelling <$> replicateM sz tsalSyllableList