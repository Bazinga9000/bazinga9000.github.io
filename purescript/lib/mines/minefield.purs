module Mines.Minefield where

import Control.Monad.Gen.Trans
import Data.Map
import Data.Maybe
import Debug
import Mines.Charge
import Mines.Mine
import Prelude
import Utils.IPoint

import Data.Array (all, any, concat, concatMap, drop, elem, filter, fromFoldable, head, length, nub, tail, take, (!!), (..))
import Data.Foldable (foldr, maximum, sum)
import Data.Map as M


data Flag = Flag Int | UnknownMine
derive instance eqFlag :: Eq Flag 

-- a clue contains all relevant information about a given square
type Clue = {
    revealed :: Boolean,
    flagState :: Maybe Flag,
    mine :: Maybe Mine,
    charge :: Maybe MineCharge,
    flagCharge :: Maybe MineCharge
}

-- the clue on an ungenerated minefield
defaultClue :: Clue
defaultClue = {
    revealed: false,
    flagState: Nothing,
    mine: Nothing, 
    charge: Nothing,
    flagCharge: Nothing
}

-- are we dead yet?
data GameState = Ungenerated | Generated | Dead | Won
derive instance eqGameState :: Eq GameState

-- decides how to render clues based on which charges are present
data ChargeDisplayMode = ClassicalOnly | ColorOnly | ComplexCharges 

-- stores info on mine distribution
data MineCount = MineCount Mine Int
mineOf :: MineCount -> Mine 
mineOf (MineCount m _) = m 

countOf :: MineCount -> Int 
countOf (MineCount _ c) = c

-- a minefield, the game board and all parameters
type Minefield = {
    map :: (Map IPoint Clue),
    gameState :: GameState,
    bounds :: IPoint, 
    maximalExtent :: Int,
    mineDistribution :: Array MineCount,
    presentMines :: Array Mine,
    displayMode :: ChargeDisplayMode
}


-- make a blank minefield based on a given size and mine distribution
blankMinefield :: Int -> Int -> Array MineCount -> Minefield
blankMinefield width height mineDistribution = {
    map: grid,
    gameState: Ungenerated,
    bounds: mkIPoint maxX maxY, 
    maximalExtent: max maxX maxY,
    mineDistribution: mineDistribution,
    presentMines: map mineOf mineDistribution,
    displayMode: displayMode
} where 
    grid = foldr (\k m -> insert k defaultClue m) empty (lattice width height)
    maxX = 1 + (fromMaybe 0 $ maximum $ map (\(IPoint p) -> p.x) (fromFoldable $ keys grid))
    maxY = 1 + (fromMaybe 0 $ maximum $ map (\(IPoint p) -> p.y) (fromFoldable $ keys grid))
    mines = map mineOf mineDistribution
    displayMode = if any usesColor mines then if any usesClassical mines then ComplexCharges else ColorOnly else ClassicalOnly

-- the Gen instance that actually generates a minefield based on your initial click
-- all squares from which at least one mine can see the initial click are guaranteed safe
minefieldGenerator :: Minefield -> IPoint -> Gen Minefield
minefieldGenerator blank initial = do 
    let squares = fromFoldable $ keys blank.map

    -- generate the position of the mines
    pairs <- shuffle $ squares
    let safeSquares = unionVisibilities initial blank.presentMines
    let unsafePairs = filter (\p -> not (p == initial || elem p safeSquares)) pairs
    let mineMap = placeMines blank.mineDistribution unsafePairs
    
    -- generate the total charge of each square
    let emptyCharges = foldr (\k m -> insert k NoMines m) empty pairs
    let chargeMap = foldr (chargeSingleMine mineMap) emptyCharges squares

    -- make the minefield
    let filledGrid = foldr (\p m -> insert p {
        revealed: false, 
        flagState: Nothing, 
        flagCharge: Nothing,
        mine: lookup p mineMap, 
        charge: lookup p chargeMap
    } m ) empty squares

    let m' = blank {
        map = filledGrid,
        gameState = Generated
    }

    pure $ foldr revealSquare m' (safeSquares <> [initial])

-- given a mine distribution and a list of points, place mines in those points according to the distribution
placeMines :: Array MineCount -> Array IPoint -> (Map IPoint Mine)
placeMines mines points = case (head mines) of
    Nothing -> empty
    (Just (MineCount mine count)) -> foldr (\k m -> insert k mine m) map' (take count points) where 
        points' = drop count points 
        map' = placeMines (fromMaybe [] $ tail mines) points'

-- adds the charges from a single mine onto a given global charge map
chargeSingleMine :: (Map IPoint Mine) -> IPoint -> (Map IPoint MineCharge) -> (Map IPoint MineCharge)
chargeSingleMine mines p charges = case (lookup p mines) of 
    Nothing -> charges 
    (Just (Mine _ valuations)) -> foldr (\(MineValuation p c) charges' -> addCharge charges' p c) charges valuations where
        addCharge charges' point charge = update (\currentCharge -> Just $ currentCharge <> charge) (point .+ p) charges'

-- the INTERSECTION of all mine visibilities aruond a square. used for the flood fill on clicking an empty square
-- horrendously inefficient, but i dont feel like writing anything better
intersectVisibilities :: IPoint -> Array Mine -> Array IPoint
intersectVisibilities p mines = nub $ filter (\x -> all (elem x) visibilities) (concat visibilities) where
    visibilities = map visibleSquares mines
    visibleSquares (Mine _ valuations) = map (\(MineValuation q _) -> p .- q) valuations

-- the union of all mine visibilities around a square. used for the initial click and chord legality checking 
unionVisibilities :: IPoint -> Array Mine -> Array IPoint
unionVisibilities p mines = nub $ concatMap visibleSquares mines where
    visibleSquares (Mine _ valuations) = map (\(MineValuation q _) -> p .- q) valuations

-- reveals a given clue on the board
revealSquare :: IPoint -> Minefield -> Minefield
revealSquare p m = if m.gameState /= Generated then m else case (lookup p m.map) of 
    Nothing -> m --void square, do nothing
    (Just clue) -> if clue.revealed || isJust clue.flagState then m else case clue.mine of 
        (Just mine) -> revealAllMines $ m {gameState = Dead}
        Nothing -> let m' = m {map = update (\c -> Just $ c {revealed = true}) p m.map} in case (clue.charge) of 
            -- only show current square
            Nothing -> m'
            (Just (Charge _ _ _ _)) -> m' 
            -- recursively reveal all guaranteed safe squares
            (Just NoMines) -> foldr revealSquare m' (intersectVisibilities p m.presentMines)


-- reveals all mines (used when you Die)
revealAllMines :: Minefield -> Minefield
revealAllMines m = m { map = updatedMap } where
    updatedMap = map (\c -> if isJust c.mine then c {revealed = true} else c) m.map


-- cycles the flag on a given square, updating relevant flag charges
flagSquare :: Boolean -> IPoint -> Minefield -> Minefield
flagSquare qflags p m = if m.gameState /= Generated then m else case (lookup p m.map) of 
    Nothing -> m --void square, do nothing
    (Just clue) -> if clue.revealed then m else foldr updateFlagCharge m' toUpdate where
        toUpdate = unionVisibilities p m.presentMines
        m' = m {map = update (\c -> Just $ c {flagState = incrementFlagState c.flagState}) p m.map} 
        incrementFlagState Nothing = Just (Flag 0)
        incrementFlagState (Just (Flag k)) = if k == (length m.mineDistribution) - 1 then 
            if (length m.mineDistribution == 1) || (not qflags) then Nothing else Just UnknownMine else Just (Flag (k+1)) 
        incrementFlagState (Just UnknownMine) = Nothing



updateFlagCharge :: IPoint -> Minefield -> Minefield
updateFlagCharge p m = case (lookup p m.map) of 
    Nothing -> m 
    (Just _) -> m { map = update (\c -> Just $ c {flagCharge = Just $ foldr (<>) NoMines pointCharges}) p m.map} where
        visibilities = unionVisibilities p m.presentMines
        pointCharges = map (\p' -> fromMaybe NoMines (flagPointCharge p')) visibilities
        flagPointCharge p' = do 
            clue <- lookup p' m.map 
            flag <- clue.flagState 
            case flag of
                Flag k -> do 
                    flagMine <- m.presentMines !! k
                    pure $ pointCharge flagMine (p .- p')
                UnknownMine -> pure NoMines 


-- allow dangerous chords
isLegalChord :: Maybe MineCharge -> Maybe MineCharge -> Boolean 
isLegalChord (Just a) (Just b) = equalModCancellation a b 
isLegalChord _ _ = false

chordSquare :: IPoint -> Minefield -> Minefield 
chordSquare p m = if m.gameState /= Generated then m else case (lookup p m.map) of 
    Nothing -> m --void square, do nothing
    (Just clue) ->  if isLegalChord clue.flagCharge clue.charge then 
        foldr revealSquare m (unionVisibilities p m.presentMines) else m

type FlagCount = {
    mine :: String,
    current :: Int,
    total :: Int
}

getFlagCount :: Minefield -> Flag -> Maybe FlagCount 
getFlagCount m fc = case fc of 
    (Flag k) -> do
        (MineCount (Mine mine _) total) <- (m.mineDistribution !! k) 
        let current = size $ M.filter (\c -> c.flagState == Just fc) m.map
        pure {
            mine: mine,
            current: current, 
            total: total
        }
    UnknownMine -> pure {
            mine: "?",
            current: size $ M.filter (\c -> c.flagState == Just fc) m.map, 
            total: 0
        }

countSafeSquares :: Minefield -> Int 
countSafeSquares m = (size m.map) - (sum $ map countOf m.mineDistribution) 

countRevealedSquares :: Minefield -> Int 
countRevealedSquares m = size $ M.filter (\c -> c.revealed && isNothing c.mine) m.map 

setWinningBoard :: Minefield -> Minefield
setWinningBoard m = if (countSafeSquares m) == (countRevealedSquares m) then m {gameState = Won} else m