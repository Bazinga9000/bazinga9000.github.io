module WordGenerator.State where

import Prelude
import Control.Monad.Gen.Trans
import Syllables
import Random.LCG
import Utils.Generators
import Data.Map
import Data.Tuple

type State = {
    generator :: Gen String,
    syllableMinimum :: Int,
    syllableMaximum :: Int,
    seed :: Seed,
    results :: Array String
}


defaultState :: State 
defaultState = {
    generator: tsalWord,
    syllableMinimum: 1,
    syllableMaximum: 3,
    seed: mkSeed 0,
    results: []
}

regenerate :: State -> State
regenerate st = st {
    results = runOnceWithSeed (manyWords 100 (chooseInt st.syllableMinimum st.syllableMaximum) st.generator) (st.seed)
}

