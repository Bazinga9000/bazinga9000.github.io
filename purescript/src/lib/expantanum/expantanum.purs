module ExpantaNum
  ( EN(..)
  , absoluteValue
  , affordArithmeticSeries
  , affordGeometricSeries
  , arrow
  , cbrt
  , ceil
  , ceiling
  , choose
  , cubeRoot
  , eMaxSafeInteger
  , eeMaxSafeInteger
  , eulers
  , expansion
  , fact
  , factorial
  , floor
  , fromNumber
  , fromString
  , gamma
  , generalLogarithm
  , grahamsNumber
  , hyper
  , infinity
  , isFinite
  , isInfinite
  , isInteger
  , isNaN
  , isNeg
  , isNegative
  , isPos
  , isPositive
  , iteratedLog
  , lambertW
  , layerAdd
  , layerAdd10
  , ln
  , ln10
  , ln2
  , log
  , log10
  , log10Eulers
  , log2Eulers
  , logarithm
  , logbase
  , maxSafeInteger
  , minSafeInteger
  , mkEN
  , nan
  , naturalLogarithm
  , neg
  , negate
  , negativeInfinity
  , one
  , pent
  , pentate
  , pi
  , pow
  , rec
  , reciprocate
  , root
  , round
  , slog
  , sqrt
  , sqrt2
  , sqrtOneHalf
  , squareRoot
  , sumArithmeticSeries
  , sumGeometricSeries
  , tetr
  , tetrate
  , tetrateWithPayload
  , tetratedMaxSafeInteger
  , toExponential
  , toFixed
  , toHyperE
  , toJson
  , toNumber
  , toPower
  , toPrecision
  , toString
  , toStringWithDecimalPlaces
  , zero
  )
  where

import Data.Function.Uncurried (Fn2, Fn3, Fn4, runFn2, runFn3, runFn4)
import Prelude


data EN = EN {
    sign :: Number,
    array :: Array (Array Number),
    layer :: Number
}

-------------------------------------------
-- RAW IMPORTS
-------------------------------------------
-- constants
foreign import _zero :: EN
foreign import _one :: EN
foreign import _eulers :: EN
foreign import _ln2 :: EN
foreign import _ln10 :: EN
foreign import _log2Eulers :: EN
foreign import _log10Eulers :: EN
foreign import _pi :: EN
foreign import _sqrtOneHalf :: EN
foreign import _sqrt2 :: EN
foreign import _maxSafeInteger :: EN
foreign import _minSafeInteger :: EN
foreign import _NaN :: EN
foreign import _negativeInfinity :: EN
foreign import _infinity :: EN
foreign import _eMaxSafeInteger :: EN
foreign import _eeMaxSafeInteger :: EN
foreign import _tetratedMaxSafeInteger :: EN
foreign import _grahamsNumber :: EN

-- functions
foreign import _absoluteValue :: EN -> EN
foreign import _affordArithmeticSeries :: Fn4 EN EN EN EN EN
foreign import _affordGeometricSeries :: Fn4 EN EN EN EN EN
foreign import _arrow :: Fn3 EN EN EN EN
foreign import _ceiling :: EN -> EN --ceil
foreign import _choose :: Fn2 EN EN EN
foreign import _compare :: Fn2 EN EN Int --cmp
foreign import _cubeRoot :: EN -> EN --cbrt
foreign import _divide :: Fn2 EN EN EN --div
foreign import _equalsTo :: Fn2 EN EN Boolean --eq
foreign import _expansion :: Fn2 EN EN EN
foreign import _factorial :: EN -> EN --fact
foreign import _floor :: EN -> EN
foreign import _gamma :: EN -> EN
foreign import _generalLogarithm :: EN -> EN --log10
foreign import _hyper :: EN -> Fn2 EN EN EN --this type is awful
foreign import _isFinite :: EN -> Boolean
foreign import _isInfinite :: EN -> Boolean
foreign import _isInteger :: EN -> Boolean --isint
foreign import _isNaN :: EN -> Boolean
foreign import _isNegative :: EN -> Boolean --isneg
foreign import _isPositive :: EN -> Boolean --ispos
foreign import _iteratedLog :: Fn3 EN EN EN EN
foreign import _lambertW :: EN -> EN
foreign import _layerAdd :: Fn3 EN EN EN EN
foreign import _layerAdd10 :: Fn2 EN EN EN
foreign import _logarithm :: Fn2 EN EN EN --logbase
foreign import _minus :: Fn2 EN EN EN
foreign import _modular :: Fn2 EN EN EN --modulo, mod
foreign import _naturalLogarithm :: EN -> EN --ln, log
foreign import _negate :: EN -> EN --neg
foreign import _pentate :: Fn2 EN EN EN --pent
foreign import _plus :: Fn2 EN EN EN
foreign import _reciprocate :: EN -> EN --rec
foreign import _root :: Fn2 EN EN EN
foreign import _round :: EN -> EN
foreign import _slog :: Fn2 EN EN EN
foreign import _squareRoot :: EN -> EN --sqrt
foreign import _ssqrt :: EN -> EN --ssrt
foreign import _sumArithmeticSeries :: Fn4 EN EN EN EN EN
foreign import _sumGeometricSeries :: Fn4 EN EN EN EN EN
foreign import _times :: Fn2 EN EN EN
foreign import _tetrate :: Fn3 EN EN EN EN --tetr, do shit with payload
foreign import _toPower :: Fn2 EN EN EN --pow

-- io
foreign import _toString :: EN -> String --value of
foreign import _toExponential :: Fn3 EN Int Boolean String
foreign import _toFixed :: Fn3 EN Int Boolean String
foreign import _toHyperE :: EN -> String
foreign import _toJSON :: EN -> String
foreign import _toNumber :: EN -> Number
foreign import _toPrecision :: Fn3 EN Int Boolean String
foreign import _toStringWithDecimalPlaces :: Fn3 EN Int Boolean String
foreign import _fromString :: String -> EN
foreign import _fromNumber :: Number -> EN
-------------------------------------------
-- UNCURRIED/UNUNDERSCORED DERIVATIONS
-- These are what are actually exported
-------------------------------------------
-- constants
zero ∷ EN
zero = _zero
one ∷ EN
one = _one
eulers ∷ EN
eulers = _eulers
ln2 ∷ EN
ln2 = _ln2
ln10 ∷ EN
ln10 = _ln10
log2Eulers ∷ EN
log2Eulers = _log2Eulers
log10Eulers ∷ EN
log10Eulers = _log10Eulers
pi ∷ EN
pi = _pi
sqrtOneHalf ∷ EN
sqrtOneHalf = _sqrtOneHalf
sqrt2 ∷ EN
sqrt2 = _sqrt2
maxSafeInteger ∷ EN
maxSafeInteger = _maxSafeInteger
minSafeInteger ∷ EN
minSafeInteger = _minSafeInteger
nan ∷ EN
nan = _NaN
negativeInfinity ∷ EN
negativeInfinity = _negativeInfinity
infinity ∷ EN
infinity = _infinity
eMaxSafeInteger ∷ EN
eMaxSafeInteger = _eMaxSafeInteger
eeMaxSafeInteger ∷ EN
eeMaxSafeInteger = _eeMaxSafeInteger
tetratedMaxSafeInteger ∷ EN
tetratedMaxSafeInteger = _tetratedMaxSafeInteger
grahamsNumber ∷ EN
grahamsNumber = _grahamsNumber

--functions (curried, not eta reduced because of compiler magic)
absoluteValue ∷ EN → EN
absoluteValue = _absoluteValue
affordArithmeticSeries :: EN -> EN -> EN -> EN -> EN
affordArithmeticSeries a b c d = runFn4 _affordArithmeticSeries a b c d
affordGeometricSeries :: EN -> EN -> EN -> EN -> EN
affordGeometricSeries a b c d = runFn4 _affordGeometricSeries a b c d
arrow :: EN -> EN -> EN -> EN 
arrow a b c = runFn3 _arrow a b c
ceiling ∷ EN → EN
ceiling = _ceiling
ceil ∷ EN → EN
ceil = _ceiling
choose :: EN -> EN -> EN
choose a b = runFn2 _choose a b
compareTo :: EN -> EN -> Int
compareTo a b = runFn2 _compare a b
cubeRoot ∷ EN → EN
cubeRoot = _cubeRoot
cbrt ∷ EN → EN
cbrt = cubeRoot
divide :: EN -> EN -> EN
divide a b = runFn2 _divide a b
equalTo :: EN -> EN -> Boolean
equalTo a b = runFn2 _equalsTo a b
expansion :: EN -> EN -> EN
expansion a b = runFn2 _expansion a b
factorial ∷ EN → EN
factorial = _factorial
fact ∷ EN → EN
fact = factorial
floor ∷ EN → EN
floor = _floor
gamma ∷ EN → EN
gamma = _gamma
generalLogarithm ∷ EN → EN
generalLogarithm = _generalLogarithm
log10 ∷ EN → EN
log10 = generalLogarithm
hyper :: EN -> EN -> EN -> EN
hyper a b c = runFn2 (_hyper a) b c
isFinite ∷ EN → Boolean
isFinite = _isFinite
isInfinite ∷ EN → Boolean
isInfinite = _isInfinite
isInteger ∷ EN → Boolean
isInteger = _isInteger
isNaN ∷ EN → Boolean
isNaN = _isNaN
isNegative ∷ EN → Boolean
isNegative = _isNegative
isNeg ∷ EN → Boolean
isNeg = isNegative
isPositive ∷ EN → Boolean
isPositive = _isPositive
isPos ∷ EN → Boolean
isPos = isPositive
iteratedLog :: EN -> EN -> EN -> EN
iteratedLog a b c = runFn3 _iteratedLog a b c
lambertW ∷ EN → EN
lambertW = _lambertW
layerAdd :: EN -> EN -> EN -> EN
layerAdd a b c = runFn3 _layerAdd a b c
layerAdd10 :: EN -> EN -> EN
layerAdd10 a b = runFn2 _layerAdd10 a b
logarithm :: EN -> EN -> EN
logarithm a b = runFn2 _logarithm a b
logbase ∷ EN → EN → EN
logbase = logarithm
minus :: EN -> EN -> EN
minus a b = runFn2 _minus a b
modular :: EN -> EN -> EN
modular a b = runFn2 _modular a b
naturalLogarithm ∷ EN → EN
naturalLogarithm = _naturalLogarithm
log ∷ EN → EN
log = naturalLogarithm
ln ∷ EN → EN
ln = naturalLogarithm
negate ∷ EN → EN
negate = _negate
neg ∷ EN → EN
neg = negate
pentate :: EN -> EN -> EN
pentate a b = runFn2 _pentate a b
pent ∷ EN → EN → EN
pent = pentate
plus :: EN -> EN -> EN
plus a b = runFn2 _plus a b
reciprocate ∷ EN → EN
reciprocate = _reciprocate
rec ∷ EN → EN
rec = reciprocate
root :: EN -> EN -> EN
root a b = runFn2 _root a b
round ∷ EN → EN
round = _round
slog :: EN -> EN -> EN
slog a b = runFn2 _slog a b
squareRoot ∷ EN → EN
squareRoot = _squareRoot
sqrt ∷ EN → EN
sqrt = squareRoot
sumArithmeticSeries :: EN -> EN -> EN -> EN -> EN
sumArithmeticSeries a b c d = runFn4 _sumArithmeticSeries a b c d
sumGeometricSeries :: EN -> EN -> EN -> EN -> EN
sumGeometricSeries a b c d = runFn4 _sumGeometricSeries a b c d
times :: EN -> EN -> EN
times a b = runFn2 _times a b
tetrateWithPayload :: EN -> EN -> EN -> EN
tetrateWithPayload a b c = runFn3 _tetrate a b c 
tetrate :: EN -> EN -> EN
tetrate a b = tetrateWithPayload a b one
tetr ∷ EN → EN → EN
tetr = tetrate
toPower :: EN -> EN -> EN
toPower a b = runFn2 _toPower a b
pow ∷ EN → EN → EN
pow = toPower
--io (curried, not eta reduced because of compiler magic)
toString ∷ EN → String
toString = _toString
toExponential :: EN -> Int -> Boolean -> String
toExponential a b c = runFn3 _toExponential a b c
toFixed :: EN -> Int -> Boolean -> String
toFixed a b c = runFn3 _toFixed a b c
toHyperE ∷ EN → String
toHyperE = _toHyperE
toJson ∷ EN → String
toJson = _toJSON
toNumber ∷ EN → Number
toNumber = _toNumber
toPrecision :: EN -> Int -> Boolean -> String
toPrecision a b c = runFn3 _toPrecision a b c
toStringWithDecimalPlaces :: EN -> Int -> Boolean -> String
toStringWithDecimalPlaces a b c = runFn3 _toStringWithDecimalPlaces a b c
fromString :: String -> EN
fromString = _fromString
fromNumber :: Number -> EN
fromNumber = _fromNumber
mkEN :: String -> EN
mkEN = fromString
-------------------------------------------
-- TYPECLASS IMPLS
-------------------------------------------
instance showEN :: Show EN where
    show = toString

instance eqEN :: Eq EN where 
    eq = equalTo

instance ordEN :: Ord EN where
    compare x y = let c = compareTo x y in
        if c == 0 then EQ else if c > 0 then GT else LT

instance semiringEN :: Semiring EN where
    zero = zero
    one = one
    add = plus
    mul = times

instance ringEN :: Ring EN where
    sub = minus

instance divisionRingEN :: DivisionRing EN where
    recip = reciprocate

instance commutativeRingEN :: CommutativeRing EN 
instance euclideanRingEN :: EuclideanRing EN where
    div = divide
    mod = modular
    degree _ = 1

