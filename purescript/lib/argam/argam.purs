module Argam where

import Prelude
import Data.Decimal
import Data.Char
import Data.Array
import Data.Array as A
import Data.Maybe
import Data.Map
import Data.Map as M
import Data.Tuple
import Effect
import Data.Int as I
import Data.Show
import Data.String as S
import Data.String.Common as S
import Data.String.CodePoints as SC
import Data.String.CodeUnits as SCU
import Utils.String
import Argam.Names

foreign import initArgam :: Effect Unit

maxBase :: Int
maxBase = 500

maxDecimalPlaces :: Int
maxDecimalPlaces = 20

upToMaxBase :: Array Int
upToMaxBase = range 0 maxBase

alphabet :: Array String
alphabet = A.catMaybes >>> map (SCU.singleton) $ map f upToMaxBase where
    f = ((\x -> x + 0xE000) >>> fromCharCode)

alphabetInverse :: Map String Int
alphabetInverse = foldr (\t acc -> M.insert (fst t) (snd t) acc) empty $ zip alphabet upToMaxBase

data BaseRepresentation = BaseRepresentation Int Boolean (Array Int) (Array Int)
instance showBaseRepresentation :: Show BaseRepresentation where
    show (BaseRepresentation base sign is fs) = show base <> " " <> show sign <> " " <> show is <> " " <> show fs

toInteger :: Decimal -> Int
toInteger = toNumber >>> I.floor

toBase :: Int -> Decimal -> BaseRepresentation
toBase base n = BaseRepresentation base (n >= fromInt 0) (handleIntegerPart i) (handleFractionalPart f maxDecimalPlaces) where
    n' = abs n
    i = floor n'
    f = n' - i
    base' = fromInt base

    handleIntegerPart x = if x == fromInt 0 then [0] else reverse $ handleIntegerPart' x
    handleIntegerPart' x
        | x < fromInt 1 = []
        | otherwise = (toInteger d) : (handleIntegerPart' m) where
            d = x `modulo` base'
            m = floor $ x `div` base'

    handleFractionalPart x dp = reverse $ dropWhile (\y -> y == 0) $ reverse $ handleFractionalPart' x dp

    handleFractionalPart' _ 0 = []
    handleFractionalPart' x dp = (toInteger d) : (handleFractionalPart' m (dp - 1)) where
            x' = x * base'
            d = floor x'
            m = x' - d
            

toArgamCharacter :: Int -> String
toArgamCharacter n = case alphabet !! n of
    Nothing -> "?"
    Just x -> x

baseRepToString :: BaseRepresentation -> String
baseRepToString (BaseRepresentation _ isPositive ipart fpart) = foldr (\a acc -> acc <> a) "" $ biglist where 
        biglist = concat [sign, idigits, dp, fdigits]
        sign = if isPositive then [] else ["-"]
        idigits = map toArgamCharacter ipart
        dp = if null fdigits then [] else ["."]
        fdigits = map toArgamCharacter fpart 

toArgamString :: Decimal -> Int -> String
toArgamString x base
    | x /= x = "NaN" -- society when there's no isNan
    | not $ isFinite x = if x > fromInt 0 then "∞" else "-∞"
    | otherwise = toBase base >>> baseRepToString $ x


baseRepToName :: BaseRepresentation -> String
baseRepToName (BaseRepresentation base sign ipart fpart) = titleJoin biglist where 
    biglist = concat [minus, inames, dp, fnames]
    minus = if sign then [] else ["negative"]
    inames = reverse $ zipWith (nameSingleDigit base) (reverse ipart) (range 0 $ length ipart)
    dp = if null fpart then [] else ["point"]
    fnames = map (\x -> nameSingleDigit base x 0) fpart

toArgamName :: Decimal -> Int -> String
toArgamName x base
    | x /= x = "Not a Number" -- society when there's no isNan
    | not $ isFinite x = if x > fromInt 0 then "Infinity" else "Negative Infinity"
    | otherwise = toBase base >>> baseRepToName $ x

getArgamCSSClass :: Decimal -> Int -> String
getArgamCSSClass x base
    | x /= x = "error"
    | isFinite x && base <= 62 = "argam"
    | otherwise = "argam-large"