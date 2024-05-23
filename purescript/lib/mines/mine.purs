module Mines.Mine where

import Mines.Charge
import Mines.Graphics
import Prelude
import Utils.IPoint
import Data.Array

data MineValuation = MineValuation IPoint MineCharge

data Mine = Mine MineGraphics (Array MineValuation)

mineGraphicsOf :: Mine -> MineGraphics
mineGraphicsOf (Mine g _) = g

usesClassical :: Mine -> Boolean 
usesClassical (Mine _ vs) = any (\(MineValuation _ c) -> hasClassical c) vs

usesColor :: Mine -> Boolean 
usesColor (Mine _ vs) = any (\(MineValuation _ c) -> hasColor c) vs

-- the charge a mine exerts on a given point
pointCharge :: Mine -> IPoint -> MineCharge 
pointCharge (Mine _ vs) p = foldr (\(MineValuation p' c') c -> if p == p' then c <> c' else c) NoMines vs

constMooreMine :: MineGraphics -> MineCharge -> Mine 
constMooreMine g c = Mine g [
    MineValuation (mkIPoint 1 1) c,
    MineValuation (mkIPoint 1 0) c,
    MineValuation (mkIPoint 1 (-1)) c,
    MineValuation (mkIPoint 0 1) c,
    MineValuation (mkIPoint 0 (-1)) c,
    MineValuation (mkIPoint (-1) 1) c,
    MineValuation (mkIPoint (-1) 0) c,
    MineValuation (mkIPoint (-1) (-1)) c
]

emptyMine :: Mine 
emptyMine = Mine (fromSymbol "0") []

standardMine :: Mine 
standardMine = constMooreMine standardMineGraphics (classicalCharge 1) 

doubleMine :: Mine 
doubleMine = constMooreMine (fromSymbol "XX") (classicalCharge 2) 

redMine :: Mine 
redMine = constMooreMine redMineGraphics (redCharge 1)

greenMine :: Mine 
greenMine = constMooreMine greenMineGraphics (greenCharge 1)

blueMine :: Mine 
blueMine = constMooreMine blueMineGraphics (blueCharge 1)

antiMine :: Mine 
antiMine = constMooreMine antiMineGraphics (classicalCharge (-1))

antiRedMine :: Mine 
antiRedMine = constMooreMine antiRedMineGraphics (redCharge (-1))

antiGreenMine :: Mine 
antiGreenMine = constMooreMine antiGreenMineGraphics (greenCharge (-1))

antiBlueMine :: Mine 
antiBlueMine = constMooreMine antiBlueMineGraphics (blueCharge (-1))

magnetMine :: Mine 
magnetMine = Mine magnetMineGraphics [
    MineValuation (mkIPoint 1 1) (blueCharge 1),
    MineValuation (mkIPoint 0 1) (blueCharge 1),
    MineValuation (mkIPoint (-1) 1) (blueCharge 1),
    MineValuation (mkIPoint 1 2) (blueCharge 1),
    MineValuation (mkIPoint 0 2) (blueCharge 1),
    MineValuation (mkIPoint (-1) 2) (blueCharge 1),
    MineValuation (mkIPoint 1 (-1)) (redCharge 1),     
    MineValuation (mkIPoint 0 (-1)) (redCharge 1),
    MineValuation (mkIPoint (-1) (-1)) (redCharge 1),
    MineValuation (mkIPoint 1 (-2)) (redCharge 1),     
    MineValuation (mkIPoint 0 (-2)) (redCharge 1),
    MineValuation (mkIPoint (-1) (-2)) (redCharge 1)    
]