module Mines.Mine where

import Mines.Charge
import Prelude
import Utils.IPoint

import Data.Array (any, foldr)

data MineValuation = MineValuation IPoint MineCharge

data Mine = Mine String (Array MineValuation)

instance showMine :: Show Mine where
    show (Mine s _) = s

usesClassical :: Mine -> Boolean 
usesClassical (Mine _ vs) = any (\(MineValuation _ c) -> hasClassical c) vs

usesColor :: Mine -> Boolean 
usesColor (Mine _ vs) = any (\(MineValuation _ c) -> hasColor c) vs

-- the charge a mine exerts on a given point
pointCharge :: Mine -> IPoint -> MineCharge 
pointCharge (Mine _ vs) p = foldr (\(MineValuation p' c') c -> if p == p' then c <> c' else c) NoMines vs

constMooreMine :: String -> MineCharge -> Mine 
constMooreMine s c = Mine s [
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
emptyMine = Mine "0" []

standardMine :: Mine 
standardMine = constMooreMine "X" (classicalCharge 1) 

doubleMine :: Mine 
doubleMine = constMooreMine "XX" (classicalCharge 2) 

redMine :: Mine 
redMine = constMooreMine "R" (redCharge 1)

greenMine :: Mine 
greenMine = constMooreMine "G" (greenCharge 1)

blueMine :: Mine 
blueMine = constMooreMine "B" (blueCharge 1)

antiMine :: Mine 
antiMine = constMooreMine "A" (classicalCharge (-1))

ferzMine :: Mine 
ferzMine = Mine "F" [
    MineValuation (mkIPoint 1 1) (classicalCharge 1),
    MineValuation (mkIPoint 1 (-1)) (classicalCharge 1),
    MineValuation (mkIPoint (-1) 1) (classicalCharge 1),
    MineValuation (mkIPoint (-1) (-1)) (classicalCharge 1)
]

wazirMine :: Mine 
wazirMine = Mine "W" [
    MineValuation (mkIPoint 1 0) (classicalCharge 1),
    MineValuation (mkIPoint 0 1) (classicalCharge 1),
    MineValuation (mkIPoint 0 (-1)) (classicalCharge 1),
    MineValuation (mkIPoint (-1) 0) (classicalCharge 1)
]

magnetMine :: Mine 
magnetMine = Mine "M" [
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