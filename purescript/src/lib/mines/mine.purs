module Mines.Mine where

import Data.Array
import Mines.Charge
import Mines.Graphics
import Prelude
import Utils.IPoint

import Data.Foldable (maximum, minimum)
import Data.Maybe (Maybe(..))

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

getMineValuationDims :: Mine -> Maybe {min :: IPoint, max :: IPoint}
getMineValuationDims (Mine _ vs) = do
    let xs = map (\(MineValuation (IPoint p) _) -> p.x) vs
    let ys = map (\(MineValuation (IPoint p) _) -> p.y) vs
    minX <- min 0 <$> minimum xs
    maxX <- max 0 <$> maximum xs
    minY <- min 0 <$> minimum ys
    maxY <- max 0 <$> maximum ys
    pure $ {min: mkIPoint minX minY, max: mkIPoint maxX maxY}

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

constDoubleMooreMine :: MineGraphics -> MineCharge -> Mine 
constDoubleMooreMine g c = Mine g [
    MineValuation (mkIPoint 1 1) c,
    MineValuation (mkIPoint 1 0) c,
    MineValuation (mkIPoint 1 (-1)) c,
    MineValuation (mkIPoint 0 1) c,
    MineValuation (mkIPoint 0 (-1)) c,
    MineValuation (mkIPoint (-1) 1) c,
    MineValuation (mkIPoint (-1) 0) c,
    MineValuation (mkIPoint (-1) (-1)) c,
    MineValuation (mkIPoint 2 2) c,
    MineValuation (mkIPoint 2 1) c, 
    MineValuation (mkIPoint 2 0) c,
    MineValuation (mkIPoint 2 (-1)) c,
    MineValuation (mkIPoint 2 (-2)) c,
    MineValuation (mkIPoint 1 (-2)) c, 
    MineValuation (mkIPoint 0 (-2)) c,
    MineValuation (mkIPoint (-1) (-2)) c,
    MineValuation (mkIPoint (-2) (-2)) c,
    MineValuation (mkIPoint (-2) (-1)) c,
    MineValuation (mkIPoint (-2) 0) c,
    MineValuation (mkIPoint (-2) 1) c,
    MineValuation (mkIPoint (-2) 2) c,
    MineValuation (mkIPoint (-1) 2) c,
    MineValuation (mkIPoint 0 2) c,
    MineValuation (mkIPoint 1 2) c 
]

largeMine :: Mine
largeMine = constDoubleMooreMine largeMineGraphics (classicalCharge 1)

largeRedMine :: Mine 
largeRedMine = constDoubleMooreMine largeRedMineGraphics (redCharge 1)

largeGreenMine :: Mine 
largeGreenMine = constDoubleMooreMine largeGreenMineGraphics (greenCharge 1)

largeBlueMine :: Mine 
largeBlueMine = constDoubleMooreMine largeBlueMineGraphics (blueCharge 1)

largeAntiMine :: Mine 
largeAntiMine = constDoubleMooreMine largeAntiMineGraphics (classicalCharge (-1))

largeAntiRedMine :: Mine 
largeAntiRedMine = constDoubleMooreMine largeAntiRedMineGraphics (redCharge (-1))

largeAntiGreenMine :: Mine 
largeAntiGreenMine = constDoubleMooreMine largeAntiGreenMineGraphics (greenCharge (-1))

largeAntiBlueMine :: Mine 
largeAntiBlueMine = constDoubleMooreMine largeAntiBlueMineGraphics (blueCharge (-1))