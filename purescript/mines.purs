module Mines where

import Data.Map
import Data.Maybe
import Effect.Ref
import Graphics.Canvas
import Mines.Charge
import Mines.ChargeDisplay
import Mines.Mine
import Mines.Minefield
import Prelude
import Utils.Generators
import Utils.IPoint
import Web.Event.Event
import Web.Event.EventTarget
import Web.UIEvent.MouseEvent

import Data.Array (length, (..))
import Data.Array as A
import Data.Int (floor, toNumber)
import Data.Traversable (sequence, sum)
import Effect (Effect)
import Effect.Console (logShow)
import Partial.Unsafe (unsafePartial)
import Random.LCG (randomSeed)
import Web.DOM.Document (toNonElementParentNode)
import Web.DOM.Element (getBoundingClientRect, toEventTarget)
import Web.DOM.Node (firstChild, removeChild, setTextContent)
import Web.DOM.NonElementParentNode (getElementById)
import Web.HTML (window)
import Web.HTML.HTMLDocument (toDocument)
import Web.HTML.HTMLTableCellElement as TD
import Web.HTML.HTMLTableElement as T
import Web.HTML.HTMLTableRowElement as TR
import Web.HTML.Window (document)

main :: Effect Unit
main = do
  --minefieldRef <- new $ blankMinefield 10 10 [MineCount magnetMine 15]
  --minefieldRef <- new $ blankMinefield 10 10 [MineCount standardMine 10, MineCount antiMine 10]
  minefieldRef <- new $ blankMinefield 15 15 [MineCount redMine 15, MineCount greenMine 15, MineCount blueMine 15]
  drawMinefield minefieldRef
  setupEvents minefieldRef


setupEvents :: Ref Minefield -> Effect Unit 
setupEvents minefieldRef = void $ unsafePartial do 
  npn <- map (toNonElementParentNode <<< toDocument) (document =<< window)
  Just node <- getElementById "minefield" npn

  minefieldEvent <- eventListener (onMinefieldClick minefieldRef)
  addEventListener (EventType "mousedown") minefieldEvent true (toEventTarget node) 

drawMinefield :: Ref Minefield -> Effect Unit 
drawMinefield mr = void $ unsafePartial do
    Just canvas <- getCanvasElementById "minefield"
    ctx <- getContext2D canvas
    m <- read mr
    
    --clearing canvas
    dims <- getCanvasDimensions canvas
    clearRect ctx $ {x: 0.0, y: 0.0, width: dims.width, height: dims.height}

    let (IPoint p) = m.bounds
    let points = A.fromFoldable $ keys m.map
    let squareSize = 1000.0 / (toNumber m.maximalExtent)
    let draw = drawSquare ctx m squareSize
    _ <- sequence (map draw points) 
    renderTable mr
    
    
drawSquare :: Context2D -> Minefield -> Number -> IPoint -> Effect Unit
drawSquare ctx m squareSize p@(IPoint p') = case (lookup p m.map) of 
    Nothing -> pure unit
    (Just clue) -> do
        let x = (toNumber $ p'.x) * squareSize
        let y = (toNumber $ p'.y) * squareSize
        if clue.revealed then do  
            drawBackground ctx x y squareSize clue 
            drawCharge ctx x y squareSize clue m.displayMode
        else do
            setFillStyle ctx "#999" 
            fillPath ctx $ rect ctx { 
                x: x,
                y: y,
                width: squareSize,
                height: squareSize
            }  
        drawFlag ctx x y squareSize clue m.mineDistribution

            
        

drawBackground :: Context2D -> Number -> Number -> Number -> Clue -> Effect Unit 
drawBackground ctx x y squareSize clue = do 
    let color = case clue.mine of
            Nothing -> "#FFF"
            (Just _) -> "#F88"
            
    setFillStyle ctx color
    fillPath ctx $ rect ctx { 
        x: x,
        y: y,
        width: squareSize,
        height: squareSize} 


drawCharge :: Context2D -> Number -> Number -> Number -> Clue -> ChargeDisplayMode -> Effect Unit 
drawCharge ctx x y squareSize clue dm = case clue.mine of 
    (Just _) -> pure unit 
    Nothing -> case (fromMaybe NoMines clue.charge) of  
        -- case (fromMaybe NoMines clue.charge) <> (negateCharge $ fromMaybe NoMines clue.flagCharge) of 
        NoMines -> pure unit 
        (Charge n r g b) -> do 
            let halfSize = squareSize / 2.0 
            setTextAlign ctx AlignCenter
            setTextBaseline ctx BaselineMiddle
            setFont ctx $ (show $ floor halfSize) <> "px gothica"

            case dm of
                ClassicalOnly -> do   
                    setFillStyle ctx (classicalColor n)
                    fillText ctx (show n) (x + halfSize) (y + halfSize)
                ColorOnly -> do 
                    let cm = (colorChargeMagnitude r g b)
                    let cc = (colorChargeColor r g b) 
                    setFillStyle ctx cc 
                    fillText ctx cm (x + halfSize) (y + halfSize)
                ComplexCharges -> pure unit


drawFlag :: Context2D -> Number -> Number -> Number -> Clue -> Array MineCount -> Effect Unit 
drawFlag ctx x y squareSize clue mineDistribution = do
    let flagText = case clue.flagState of 
            Nothing -> ""
            (Just k) -> fromMaybe "x" (mineDistribution A.!! k >>= (mineOf >>> show >>> Just))
    let halfSize = squareSize / 2.0 

    setFillStyle ctx "#F00"
    setTextAlign ctx AlignCenter
    setFont ctx "30px gothica"
    fillText ctx flagText (x + halfSize) (y + halfSize)


onMinefieldClick :: Ref Minefield -> Event -> Effect Unit 
onMinefieldClick mr e = void $ unsafePartial do  
    -- get coordinates on canvas
    npn <- map (toNonElementParentNode <<< toDocument) (document =<< window)
    Just node <- getElementById "minefield" npn
    cbr <- getBoundingClientRect node

    let (Just me) = fromEvent e
    let x = (toNumber $ clientX me) - cbr.left
    let y = (toNumber $ clientY me) - cbr.top
    logShow $ show x <> " " <> show y 

    -- convert to minefield coordinates
    m <- read mr
    let squareSize = 1000.0 / (toNumber m.maximalExtent)
    let mx = floor $ x / squareSize
    let my = floor $ y / squareSize
    let minefieldCoords = mkIPoint mx my

    logShow minefieldCoords

    let pressedButtons = button me
    logShow pressedButtons
    -- reveal squares, generating minefield if not generated
    if not $ member minefieldCoords m.map then pure unit else case m.gameState of 
        Ungenerated -> if pressedButtons /= 0 then pure unit else do 
            s <- randomSeed
            let field = runOnceWithSeed (minefieldGenerator m minefieldCoords) s 
            void $ modify (\_ -> field) mr  
            pure unit
        Dead -> logShow "Dead"
        Generated -> case pressedButtons of 
            2 -> void $ modify (flagSquare minefieldCoords) mr 
            0 -> void $ modify (handleReveal minefieldCoords) mr where 
                handleReveal p = case (lookup p m.map) of 
                    Nothing -> (\mf -> mf) 
                    (Just clue) -> if clue.revealed then chordSquare p else revealSquare p
        
    drawMinefield mr


makeFractionalString :: Int -> Int -> String 
makeFractionalString a b = show a <> "/" <> show b

addCellWithText :: TR.HTMLTableRowElement -> String -> Effect Unit 
addCellWithText tr s = void $ unsafePartial do 
    Just newCell <- TD.fromHTMLElement <$> TR.insertCell tr
    setTextContent s (TD.toNode newCell)

makeFlagTableRow :: T.HTMLTableElement -> Maybe FlagCount -> Effect Unit 
makeFlagTableRow _ Nothing = pure unit 
makeFlagTableRow t (Just fc) = void $ unsafePartial do 
    Just row <- TR.fromHTMLElement <$> T.insertRow t
    addCellWithText row fc.mine
    addCellWithText row (makeFractionalString fc.current fc.total) 


renderTable :: Ref Minefield -> Effect Unit 
renderTable mr = void $ unsafePartial do 
  d <- toDocument <$> (document =<< window)
  let npn = toNonElementParentNode d
  Just table' <- (getElementById "minecount" npn)
  let (Just table) = T.fromElement table' 

  -- reduce table to atoms
  Just tbody <- firstChild (T.toNode table)
  removeChild tbody (T.toNode table)

  m <- read mr

  -- revealed cell count
  let totalCount = (size m.map) - (sum $ map countOf m.mineDistribution)
  let revealedCount = size $ filter (\c -> c.revealed && isNothing c.mine) m.map

  Just revealedRow <- TR.fromHTMLElement <$> T.insertRow table
  addCellWithText revealedRow "Revealed"
  addCellWithText revealedRow (makeFractionalString revealedCount totalCount) 
 
  sequence $ map (\k -> makeFlagTableRow table (getFlagCount m k)) (0..(length m.presentMines - 1))
