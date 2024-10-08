module Count.Constants where

import Prelude hiding (zero, one)
import ExpantaNum


two :: EN
two = mkEN "2"

ten :: EN
ten = mkEN "10"

hundred :: EN
hundred = mkEN "100"

------------------------------------------
-- INCREASERS
------------------------------------------
baseI1Cost :: EN
baseI1Cost = one

baseI2Cost :: EN
baseI2Cost = mkEN "1e3"

baseI3Cost :: EN
baseI3Cost = mkEN "1e6"

baseIncreaserMult :: EN
baseIncreaserMult = root two ten

baseI1CostScaling :: EN
baseI1CostScaling = root ten ten

baseI2CostScaling :: EN
baseI2CostScaling = root (mkEN "1e4") ten

baseI3CostScaling :: EN
baseI3CostScaling = root (mkEN "1e7") ten 

------------------------------------------
-- TICKSPEED
------------------------------------------

baseTickSpeedCost :: EN
baseTickSpeedCost = mkEN "5"

baseTickSpeedCostScaling :: EN
baseTickSpeedCostScaling = mkEN "5"

baseTickSpeedMult :: EN
baseTickSpeedMult = mkEN "1.02"

------------------------------------------
-- SETTINGS
------------------------------------------
defaultUpdateRate :: Number
defaultUpdateRate = 30.0