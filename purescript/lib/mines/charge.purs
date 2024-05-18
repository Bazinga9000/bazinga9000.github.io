module Mines.Charge where

import Prelude
import Data.Number
import Data.Int

data MineCharge = NoMines | Charge Int Int Int Int
derive instance eqMineCharge :: Eq MineCharge
instance showMineCharge :: Show MineCharge where
    show NoMines = "NoMines"
    show (Charge f r b g) = "(Charge " <> show f <> " " <> show r <> " " <> show g <> " " <> show b <> ")"

instance semigroupMineCharge :: Semigroup MineCharge where
    append NoMines x = x 
    append x NoMines = x
    append (Charge f1 r1 g1 b1) (Charge f2 r2 g2 b2) = Charge (f1 + f2) (r1 + r2) (g1 + g2) (b1 + b2)

instance monoidMineCharge :: Monoid MineCharge where
    mempty = NoMines

negateCharge :: MineCharge -> MineCharge 
negateCharge NoMines = NoMines
negateCharge (Charge n r g b) = (Charge (-n) (-r) (-g) (-b))

zero :: MineCharge
zero = Charge 0 0 0 0

classicalCharge :: Int -> MineCharge 
classicalCharge n = Charge n 0 0 0

redCharge :: Int -> MineCharge 
redCharge n = Charge 0 n 0 0 

greenCharge :: Int -> MineCharge
greenCharge n = Charge 0 0 n 0 

blueCharge :: Int -> MineCharge 
blueCharge n = Charge 0 0 0 n

hasClassical :: MineCharge -> Boolean 
hasClassical NoMines = false
hasClassical (Charge n _ _ _) = n /= 0

hasColor :: MineCharge -> Boolean
hasColor NoMines = false 
hasColor (Charge _ r g b) = r /= 0 || g /= 0 || b /= 0