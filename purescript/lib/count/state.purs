module Count.State where

import Prelude hiding (zero, one)
import ExpantaNum
import Data.Foldable
import Data.Map
import Data.Map as M
import Data.Tuple
import Data.Maybe

type GlobalState = {
    count :: EN, --the almighty count
    manualPower :: EN, --increments per click
    tickSpeed :: EN, --number of ticks in a 30ms interval
    increasers :: Map String Increaser --data for increasers
}

newGlobalState :: GlobalState
newGlobalState = {
    count: zero,
    manualPower: one,
    tickSpeed: one,
    increasers: newIncreasers
}

data Target = TCount | TIncreaser String
type Increaser = {
    name :: String,
    displayPrio :: Int,
    owned :: EN,
    bought :: EN,
    cost :: EN,
    costPerPurch :: EN,
    multiplier :: EN,
    multPerPurch :: EN,
    targets :: Array Target
}

newIncreasers :: Map String Increaser
newIncreasers = M.fromFoldable [
    Tuple "1" {
        name: "Count Increaser",
        displayPrio: 1,
        owned: zero,
        bought: zero,
        cost: one,
        costPerPurch: mkEN "1.25",
        multiplier: one,
        multPerPurch: mkEN "1.08",
        targets: [TCount]
    },
    Tuple "2" {
        name: "Count Increaser Increaser",
        displayPrio: 2,
        owned: zero,
        bought: zero,
        cost: mkEN "1000",
        costPerPurch: mkEN "1.25",
        multiplier: one,
        multPerPurch: mkEN "1.08",
        targets: [TIncreaser "1"]
    },
    Tuple "3" {
        name: "Count In3ser",
        displayPrio: 3,
        owned: zero,
        bought: zero,
        cost: mkEN "1000000",
        costPerPurch: mkEN "1.25",
        multiplier: one,
        multPerPurch: mkEN "1.08",
        targets: [TIncreaser "2"]
    }
]
handleTarget :: GlobalState -> Target -> EN -> GlobalState
handleTarget state target delta = case target of 
    TCount -> state { count = ceil $ state.count + delta }
    TIncreaser id -> state { increasers = M.update (\inc -> Just $ inc {owned = ceil $ inc.owned + delta}) id state.increasers}

handleIncreaser :: EN ->  Increaser -> GlobalState -> GlobalState
handleIncreaser speed inc state = 
    let delta = inc.owned * inc.multiplier * speed in foldr (\t st -> handleTarget st t delta) state inc.targets

tick :: EN -> GlobalState -> GlobalState 
tick speed state = foldr (handleIncreaser speed) state state.increasers

manualCount :: GlobalState -> GlobalState
manualCount state = state {count = state.count + state.manualPower}

buyIncreaser :: String -> GlobalState -> GlobalState
buyIncreaser id state = case M.lookup id state.increasers of
  Nothing -> state
  Just inc -> state {
    count = state.count - inc.cost,
    increasers = M.insert id (inc {
        owned = inc.owned + one,
        bought = inc.bought + one,
        cost = ceil $ inc.cost * inc.costPerPurch,
        multiplier = inc.multiplier * inc.multPerPurch
    }) state.increasers
  }


displayEN :: EN -> String
displayEN n = if n == zero then show n else toStringWithDecimalPlaces n 3 true