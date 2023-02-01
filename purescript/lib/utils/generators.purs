module Utils.Generators where

import Control.Monad.Gen.Trans
import Data.Tuple
import Effect
import Prelude
import Random.LCG


runGenWithSeed :: forall a. Gen a -> Seed -> Tuple a GenState
runGenWithSeed gen seed = runGen gen {newSeed: seed, size: 0}
runOnceWithSeed :: forall a. Gen a -> Seed -> a
runOnceWithSeed gen seed = fst $ runGenWithSeed gen seed
