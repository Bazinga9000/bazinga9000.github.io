module Utils.Generators where

import Control.Monad.Gen.Trans
import Data.Tuple
import Effect
import Prelude
import Random.LCG

import Data.Int (fromNumber, toNumber)
import Data.Maybe (fromJust)
import Data.Number ((%))
import Partial.Unsafe (unsafePartial)



runGenWithSeed :: forall a. Gen a -> Seed -> Tuple a GenState
runGenWithSeed gen seed = runGen gen {newSeed: seed, size: 0}
runOnceWithSeed :: forall a. Gen a -> Seed -> a
runOnceWithSeed gen seed = fst $ runGenWithSeed gen seed


modExp :: Number -> Int -> Number -> Number
modExp base exp modulo = go base exp 1.0 where
    go :: Number -> Int -> Number -> Number    
    go b e r = if e == 0 then r else go b' e' r' where
        b' = (b * b) % modulo
        e' = e `div` 2
        r' = if ((e `mod` 2) == 1) then (r * b) % modulo else r

lcgNextMany :: Int -> Seed -> Seed
lcgNextMany n s = mkSeed $ unsafePartial fromJust $ fromNumber $ xnk where
    xk = toNumber $ unSeed s
    a = toNumber lcgA
    m = toNumber lcgM
    c = toNumber lcgC
    an = modExp a n m
    anxk = (an * xk) % m
    cnum = (an - 1.0) % ((a - 1.0) * m)
    cdenom = a - 1.0
    xnk = (anxk + (cnum/cdenom)*c) % m
