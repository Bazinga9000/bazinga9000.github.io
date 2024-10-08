module NumberSystems where

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
import Data.String.Utils as U
import Utils.String
import NumberSystems.Names
import NumberSystems.NumberSystem
import Control.Monad.Reader
import Data.Traversable

foreign import initArgam :: Effect Unit

maxDecimalPlaces :: Int
maxDecimalPlaces = 20

data BaseRepresentation
  = BaseRepresentation Int Boolean (Array Int) (Array Int)

instance showBaseRepresentation :: Show BaseRepresentation where
  show (BaseRepresentation base sign is fs) = show base <> " " <> show sign <> " " <> show is <> " " <> show fs

toInteger :: Decimal -> Int
toInteger = toNumber >>> I.floor

toBase :: Int -> Decimal -> BaseRepresentation
toBase base n = BaseRepresentation base (n >= fromInt 0) (handleIntegerPart i) (handleFractionalPart f maxDecimalPlaces)
  where
  n' = abs n

  i = floor n'

  f = n' - i

  base' = fromInt base

  handleIntegerPart x = if x == fromInt 0 then [ 0 ] else reverse $ handleIntegerPart' x

  handleIntegerPart' x
    | x < fromInt 1 = []
    | otherwise = (toInteger d) : (handleIntegerPart' m)
      where
      d = x `modulo` base'

      m = floor $ x `div` base'

  handleFractionalPart x dp = reverse $ dropWhile (\y -> y == 0) $ reverse $ handleFractionalPart' x dp

  handleFractionalPart' _ 0 = []

  handleFractionalPart' x dp = (toInteger d) : (handleFractionalPart' m (dp - 1))
    where
    x' = x * base'

    d = floor x'

    m = x' - d

baseRepToString :: BaseRepresentation -> Reader NumberSystem String
baseRepToString (BaseRepresentation _ isPositive ipart fpart) = do
  digits <- alphabet <$> ask
  let
    sign = if isPositive then [] else [ "-" ]

    idigits = map (toArgamCharacter digits) ipart

    fdigits = map (toArgamCharacter digits) fpart

    dp = if null fdigits then [] else [ "." ]

    biglist = concat [ sign, idigits, dp, fdigits ]
  pure $ U.fromCharArray biglist

convertToNumberSystem :: NumberSystem -> Int -> Decimal -> String
convertToNumberSystem ns base x
  | x /= x = "NaN" -- society when there's no isNan
  | not $ isFinite x = if x > fromInt 0 then "∞" else "-∞"
  | otherwise = runReader (baseRepToString (toBase base x)) ns

baseRepToName :: BaseRepresentation -> Reader NumberSystem String
baseRepToName (BaseRepresentation base sign ipart fpart) = do
  inames <- sequence $ reverse $ zipWith (nameSingleDigit base) (reverse ipart) (range 0 $ length ipart)
  fnames <- sequence $ map (\x -> nameSingleDigit base x 0) fpart
  let
    dp = if null fpart then [] else [ "point" ]

    minus = if sign then [] else [ "negative" ]

    biglist = concat [ minus, inames, dp, fnames ]
  pure $ titleJoin biglist

nameInNumberSystem :: NumberSystem -> Int -> Decimal -> String
nameInNumberSystem ns base x
  | x /= x = "Not a Number" -- society when there's no isNan
  | not $ isFinite x = if x > fromInt 0 then "Infinity" else "Negative Infinity"
  | otherwise = runReader (baseRepToName $ toBase base x) ns

getArgamCSSClass :: Decimal -> Int -> String
getArgamCSSClass x base
  | x /= x = "error"
  | isFinite x && base <= 62 = "argam"
  | otherwise = "argam-large"
