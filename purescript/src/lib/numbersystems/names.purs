module NumberSystems.Names where

import Data.Array
import Data.Array as A
import Data.Maybe
import Data.String.Utils
import Prelude
import Data.String as S
import Data.String.CodePoints as C
import NumberSystems.NumberSystem
import Data.Array as A
import Data.String.CodeUnits as SCU
import Data.Char as C
import Control.Monad.Reader
import NumberSystems.NumberSystem

combineSuffix :: String -> String -> String
combineSuffix prefix "" = prefix

combineSuffix prefix suffix = trimmedPrefix <> trimmedSuffix
  where
  rprefix = reverse $ S.toCodePointArray $ prefix

  trimletter = fromMaybe (C.codePointFromChar '?') $ head rprefix

  trimmedPrefix = S.fromCodePointArray $ reverse $ dropWhile (\x -> x == trimletter) rprefix

  suffix' = S.toCodePointArray suffix

  trimmedSuffix = S.fromCodePointArray $ trimletter : dropWhile (\x -> x == trimletter) suffix'

nameSingleDigit :: Int -> Int -> Int -> Reader NumberSystem String
nameSingleDigit base value suffixIndex = do
  ns <- ask
  let
    digitName = fromMaybe "unnamed" (digitNames ns !! value)

    suffix = fromMaybe "unnamed" (digitSuffixes ns !! suffixIndex)
  pure $ combineSuffix digitName suffix

toArgamCharacter :: Array String -> Int -> String
toArgamCharacter alphabet n = case alphabet !! n of
  Nothing -> "?"
  Just x -> x

makeSuffixesFromDigits :: Array String -> String -> Array String
makeSuffixesFromDigits digits suffix = map (flip combineSuffix suffix) (fromMaybe [] $ A.tail digits)

makePUAAlphabet :: Int -> Int -> Array String
makePUAAlphabet start b = A.catMaybes >>> map (SCU.singleton) $ map f (A.range 0 b)
  where
  f = ((\x -> x + start) >>> C.fromCharCode)
