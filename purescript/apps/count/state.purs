module Count.State where

import Data.Foldable
import Data.Map
import Data.Maybe
import Data.Tuple
import ExpantaNum
import Prelude hiding (zero, one)

import Count.Constants as C
import Data.Map as M

type GlobalState = {
    count :: EN, --the almighty count
    manualPower :: EN, --increments per click
    tickSpeed :: EN, --number of ticks in a 30ms interval
    increasers :: Map String Increaser, --data for increasers
    settings :: Settings,
    tickSpeedInc :: Increaser
}

type Settings = {
    updateRate :: Number
}

newGlobalState :: GlobalState
newGlobalState = {
    count: zero,
    manualPower: one,
    tickSpeed: one,
    tickSpeedInc: tickSpeedIncreaser,
    increasers: newIncreasers,
    settings: defaultSettings
}

defaultSettings :: Settings
defaultSettings = {
    updateRate: C.defaultUpdateRate
}

data Target = TCount | TIncreaser String
type Increaser = {
    name :: String,
    isVisible :: Boolean,
    owned :: EN,
    bought :: EN,
    baseCost :: EN,
    cost :: EN,
    costPerPurch :: EN,
    multiplier :: EN,
    multPerPurch :: EN,
    targets :: Array Target
}

tickSpeedIncreaser :: Increaser 
tickSpeedIncreaser = {
    name: "Tickspeed Increaser",
    isVisible: true,
    owned: zero,
    bought: zero,
    baseCost: one,
    cost: C.baseTickSpeedCost,
    costPerPurch: C.baseTickSpeedCostScaling,
    multiplier: one,
    multPerPurch: C.baseTickSpeedMult,
    targets: []
}

newIncreasers :: Map String Increaser
newIncreasers = M.fromFoldable [
    Tuple "1" {
        name: "Count Increaser",
        isVisible: true,
        owned: zero,
        bought: zero,
        baseCost: C.baseI1Cost,
        cost: C.baseI1Cost,
        costPerPurch: C.baseI1CostScaling,
        multiplier: one,
        multPerPurch: C.baseIncreaserMult,
        targets: [TCount]
    },
    Tuple "2" {
        name: "Count Increaser Increaser",
        isVisible: true,
        owned: zero,
        bought: zero,
        baseCost: C.baseI2Cost,
        cost: C.baseI2Cost,
        costPerPurch: C.baseI2CostScaling,
        multiplier: one,
        multPerPurch: C.baseIncreaserMult,
        targets: [TIncreaser "1"]
    },
    Tuple "3" {
        name: "Count In3ser",
        isVisible: true,
        owned: zero,
        bought: zero,
        baseCost: C.baseI3Cost,
        cost: C.baseI3Cost,
        costPerPurch: C.baseI3CostScaling,
        multiplier: one,
        multPerPurch: C.baseIncreaserMult,
        targets: [TIncreaser "2"]
    }
]
handleTarget :: GlobalState -> Target -> EN -> GlobalState
handleTarget state target delta = case target of 
    TCount -> state { count = state.count + delta }
    TIncreaser id -> state { increasers = M.update (\inc -> Just $ inc {owned = inc.owned + delta}) id state.increasers}

handleIncreaser :: EN ->  Increaser -> GlobalState -> GlobalState
handleIncreaser speed inc state = 
    let delta = inc.owned * inc.multiplier * speed in foldr (\t st -> handleTarget st t delta) state inc.targets


tick :: GlobalState -> GlobalState 
tick = setTickSpeed >>> tickIncreasers

tickIncreasers :: GlobalState -> GlobalState 
tickIncreasers state = foldr (handleIncreaser speed) state state.increasers where
  speed = state.tickSpeed * (reciprocate $ fromNumber $ state.settings.updateRate)

setTickSpeed :: GlobalState -> GlobalState
setTickSpeed state = state {tickSpeed = tickSpeed'} where
  tickSpeed' = state.tickSpeedInc.multiplier

manualCount :: GlobalState -> GlobalState
manualCount state = state {count = state.count + state.manualPower}

--update an increaser after it is bought N times
updateIncreaser :: EN -> Increaser -> Increaser
updateIncreaser n inc = inc {
        owned = inc.owned + n,
        bought = inc.bought + n,
        cost = inc.cost * (pow inc.costPerPurch n),
        multiplier = inc.multiplier * (pow inc.multPerPurch n)
    }

buyIncreaser :: String -> GlobalState -> GlobalState
buyIncreaser id state = case M.lookup id state.increasers of
  Nothing -> state
  Just inc -> if state.count < inc.cost then state else state {
    count = state.count - inc.cost,
    increasers = M.insert id (updateIncreaser one inc) state.increasers
  }

buyTickSpeed :: GlobalState -> GlobalState
buyTickSpeed state = if state.count < state.tickSpeedInc.cost then state else state {
    tickSpeedInc = updateIncreaser one state.tickSpeedInc    
}


displayEN :: EN -> String
displayEN n = if n == zero then show n else toStringWithDecimalPlaces n 3 true

maxIncreaser :: String -> GlobalState -> GlobalState
maxIncreaser id state = case M.lookup id state.increasers of
  Nothing -> state
  Just inc ->
    let amountToBuy = affordGeometricSeries state.count inc.baseCost inc.costPerPurch inc.bought in
    if not $ isPos amountToBuy then state else
    let totalCost = sumGeometricSeries amountToBuy inc.baseCost inc.costPerPurch inc.bought in
    state {
      count = state.count - totalCost,
      increasers = M.insert id (updateIncreaser amountToBuy inc) state.increasers
  }

maxTickSpeed :: GlobalState -> GlobalState
maxTickSpeed state = let inc = state.tickSpeedInc in
  let amountToBuy = affordGeometricSeries state.count inc.baseCost inc.costPerPurch inc.bought in
  if not $ isPos amountToBuy then state else
  let totalCost = sumGeometricSeries amountToBuy inc.baseCost inc.costPerPurch inc.bought in
  state { 
    count = state.count - totalCost, 
    tickSpeedInc = updateIncreaser amountToBuy inc
  }

maxAll :: GlobalState -> GlobalState
maxAll = maxTickSpeed >>> maxAllIncreasers

maxAllIncreasers :: GlobalState -> GlobalState
maxAllIncreasers s = foldr maxIncreaser s (M.keys s.increasers)

getCountPerSecond :: GlobalState -> EN
getCountPerSecond state = countIncreaserContrib * tickSpeedContrib where
  tickSpeedContrib = state.tickSpeed
  countIncreaserContrib = case M.lookup "1" state.increasers of
    Nothing -> one
    Just inc -> inc.owned * inc.multiplier