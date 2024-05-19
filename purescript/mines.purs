module Mines where

import Data.Map
import Data.Maybe
import Effect.Ref
import Graphics.Canvas
import Mines.Charge
import Mines.ChargeDisplay
import Mines.Mine
import Mines.Minefield
import Mines.Settings
import Prelude
import Utils.Generators
import Utils.IPoint
import Web.Event.Event
import Web.Event.EventTarget
import Web.UIEvent.MouseEvent

import Data.Array (length, (..))
import Data.Array as A
import Data.DateTime.Instant (Instant, diff)
import Data.Either (Either(..))
import Data.Formatter.Number (formatNumber)
import Data.Int (floor, toNumber)
import Data.Time.Duration (Milliseconds(..), fromDuration)
import Data.Traversable (sequence, sum)
import Effect (Effect)
import Effect.Console (logShow)
import Effect.Now (now)
import Effect.Timer (clearInterval, setInterval)
import Partial.Unsafe (unsafePartial)
import Random.LCG (randomSeed)
import Web.DOM.Document (toNonElementParentNode)
import Web.DOM.Element (getBoundingClientRect, setAttribute, toEventTarget, toNode)
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
  --minefieldRef <- new $ blankMinefield 15 15 [MineCount standardMine 10]
  settingsRef <- defaultSettings >>= new
  draw settingsRef minefieldRef
  setupEvents settingsRef minefieldRef


setupEvents :: Ref Settings -> Ref Minefield -> Effect Unit 
setupEvents settingsRef minefieldRef = void $ unsafePartial do 
  npn <- map (toNonElementParentNode <<< toDocument) (document =<< window)

  Just minefieldNode <- getElementById "minefield" npn
  minefieldEvent <- eventListener (onMinefieldClick settingsRef minefieldRef)
  addEventListener (EventType "mousedown") minefieldEvent true (toEventTarget minefieldNode) 

  Just autodecNode <- getElementById "autodecrement" npn 
  autoDecrementEvent <- eventListener (autoDecHandler settingsRef minefieldRef)
  addEventListener (EventType "click") autoDecrementEvent true (toEventTarget autodecNode)
  
  Just qfNode <- getElementById "questionflags" npn 
  qfEvent <- eventListener (questionFlagHandler settingsRef minefieldRef)
  addEventListener (EventType "click") qfEvent true (toEventTarget qfNode)

getSquareSize :: Settings -> Minefield -> Effect Number
getSquareSize s m = unsafePartial do
    dims <- getCanvasDimensions s.mfCanvas
    let canvasLength = min dims.width dims.height
    pure $ canvasLength / (toNumber m.maximalExtent)



{---------------------------------------
THE ONE TRUE DRAW CALL
---------------------------------------}

draw :: Ref Settings -> Ref Minefield -> Effect Unit
draw sr mr = do 
    drawMinefield sr mr
    renderTable sr mr
    colorizeTimer mr

{---------------------------------------
BOARD DRAWING
---------------------------------------}

drawMinefield :: Ref Settings -> Ref Minefield -> Effect Unit 
drawMinefield sr mr = void $ unsafePartial do
    m <- read mr
    s <- read sr
    --clearing canvas
    dims <- getCanvasDimensions s.mfCanvas
    clearRect s.mfCtx $ {x: 0.0, y: 0.0, width: dims.width, height: dims.height}
    -- drawing all squares
    let points = A.fromFoldable $ keys m.map
    squareSize <- getSquareSize s m
    sequence (map (drawSquare s m squareSize) points) 
    
    
drawSquare :: Settings -> Minefield -> Number -> IPoint -> Effect Unit
drawSquare s m squareSize p@(IPoint p') = case (lookup p m.map) of 
    Nothing -> pure unit
    (Just clue) -> do
        let x = (toNumber $ p'.x) * squareSize
        let y = (toNumber $ p'.y) * squareSize
        if clue.revealed then do  
            drawBackground s x y squareSize clue 
            drawCharge s x y squareSize clue m.displayMode
        else do
            let ctx = s.mfCtx
            let color = if m.gameState == Won then "#0c7" else "#999"
            setFillStyle ctx color
            fillPath ctx $ rect ctx { 
                x: x,
                y: y,
                width: squareSize,
                height: squareSize
            }  
        drawFlag s x y squareSize clue m.mineDistribution

            
        

drawBackground :: Settings -> Number -> Number -> Number -> Clue -> Effect Unit 
drawBackground s x y squareSize clue = do 
    let color = case clue.mine of
            Nothing -> "#FFF"
            (Just _) -> "#F88"
    
    let ctx = s.mfCtx
    setFillStyle ctx color
    fillPath ctx $ rect ctx { 
        x: x,
        y: y,
        width: squareSize,
        height: squareSize} 


getDisplayCharge :: Clue -> Boolean -> MineCharge 
getDisplayCharge clue true = (fromMaybe NoMines clue.charge) <> (negateCharge $ fromMaybe NoMines clue.flagCharge)
getDisplayCharge clue false = (fromMaybe NoMines clue.charge)
drawCharge :: Settings -> Number -> Number -> Number -> Clue -> ChargeDisplayMode -> Effect Unit 
drawCharge s x y squareSize clue dm = case clue.mine of 
    (Just _) -> pure unit 
    Nothing -> case getDisplayCharge clue s.autoDecrement of  
        NoMines -> pure unit 
        (Charge n r g b) -> do
            let ctx = s.mfCtx 
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


drawFlag :: Settings -> Number -> Number -> Number -> Clue -> Array MineCount -> Effect Unit 
drawFlag s x y squareSize clue mineDistribution = do
    let ctx = s.mfCtx
    let flagText = case clue.flagState of 
            Nothing -> ""
            (Just (Flag k)) -> fromMaybe "x" (mineDistribution A.!! k >>= (mineOf >>> show >>> Just))
            (Just UnknownMine) -> "?"

    let halfSize = squareSize / 2.0 

    setFillStyle ctx "#600"
    setTextAlign ctx AlignCenter
    setFont ctx "30px gothica"
    fillText ctx flagText (x + halfSize) (y + halfSize)

colorizeTimer :: Ref Minefield -> Effect Unit 
colorizeTimer mr = unsafePartial $ do
    m <- read mr
    let color = case m.gameState of
            Ungenerated -> "#CCC"
            Generated -> "#FFF"
            Dead -> "#F00"
            Won -> "#0F0"

    npn <- map (toNonElementParentNode <<< toDocument) (document =<< window)
    Just node <- getElementById "timer" npn
    setAttribute "style" ("font-family: gothica; color: " <> color) node 


{---------------------------------------
EVENT HANDLING
---------------------------------------}

onMinefieldClick :: Ref Settings -> Ref Minefield -> Event -> Effect Unit 
onMinefieldClick sr mr e = void $ unsafePartial do  
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
    s <- read sr
    squareSize <- getSquareSize s m
    let mx = floor $ x / squareSize
    let my = floor $ y / squareSize
    let minefieldCoords = mkIPoint mx my

    logShow minefieldCoords

    let pressedButtons = button me
    let prevState = m.gameState
    -- reveal squares, generating minefield if not generated
    if not $ member minefieldCoords m.map then pure unit else case m.gameState of 
        Ungenerated -> if pressedButtons /= 0 then pure unit else do 
            -- generate minefield
            seed <- randomSeed
            let field = runOnceWithSeed (minefieldGenerator m minefieldCoords) seed
            void $ modify (\_ -> field) mr
            -- start timer  
            t <- now 
            iid <- setInterval 4 (handleTimer mr t)
            void $ modify (\st -> st {timerId = Just iid}) sr
            pure unit
        Generated -> case pressedButtons of 
            2 -> void $ modify (flagSquare s.allowQuestionFlags minefieldCoords) mr 
            0 -> void $ modify (handleReveal minefieldCoords) mr where 
                handleReveal p = case (lookup p m.map) of 
                    Nothing -> (\mf -> mf) 
                    (Just clue) -> if clue.revealed then chordSquare p else revealSquare p
        _ -> pure unit
        

    m' <- modify setWinningBoard mr

    -- stop timer if this click ended the game
    if m'.gameState /= Generated && prevState == Generated then do 
        case s.timerId of
            Nothing -> pure unit
            (Just iid) -> clearInterval iid 
    else pure unit

    draw sr mr


onCheckboxClick :: String -> (Boolean -> Settings -> Settings) -> (Boolean -> Minefield -> Minefield) -> Ref Settings -> Ref Minefield -> Event -> Effect Unit 
onCheckboxClick s f g sr mr _ = do 
      v <- getCheckboxValue s 
      _ <- modify (f v) sr
      _ <- modify (g v) mr 
      draw sr mr

autoDecHandler :: Ref Settings -> Ref Minefield -> Event -> Effect Unit 
autoDecHandler = onCheckboxClick "autodecrement" (\a s -> s {autoDecrement = a}) (\_ m -> m)

questionFlagHandler :: Ref Settings -> Ref Minefield -> Event -> Effect Unit 
questionFlagHandler = onCheckboxClick "questionflags" (\a s -> s {allowQuestionFlags = a}) g where 
    g true m = m 
    g false m = m {map = map (\c ->  c {flagState = if c.flagState /= Just UnknownMine then c.flagState else Nothing}) m.map}

handleTimer :: Ref Minefield -> Instant -> Effect Unit 
handleTimer mr t = unsafePartial $ do

    -- compute duration
    t' <- now
    let (elapsedTime :: Milliseconds)  = diff t' t
    let (Milliseconds dur) = fromDuration elapsedTime
    let centis = toNumber $ ((floor dur)/10) `mod` 100
    let seconds = toNumber $ ((floor dur)/1000) `mod` 60
    let minutes = dur/60000.0

    let (Right centisString) = formatNumber "00" centis 
    let (Right secondsString) = formatNumber "00" seconds 
    let minutesString = show $ floor minutes

    -- render it
    npn <- map (toNonElementParentNode <<< toDocument) (document =<< window)
    Just elem <- getElementById "timer" npn
    setTextContent (minutesString <> ":" <> secondsString <> "." <> centisString) (toNode elem)

    pure unit

{---------------------------------------
MINE COUNT TABLE RENDERING
---------------------------------------}

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


renderTable :: Ref Settings -> Ref Minefield -> Effect Unit 
renderTable sr mr = void $ unsafePartial do 
  d <- toDocument <$> (document =<< window)
  let npn = toNonElementParentNode d
  Just table' <- (getElementById "minecount" npn)
  let (Just table) = T.fromElement table' 

  -- reduce table to atoms
  tbody' <- firstChild (T.toNode table)
  case tbody' of 
    Nothing -> pure unit 
    (Just tbody) -> removeChild tbody (T.toNode table)

  m <- read mr
  s <- read sr

  -- revealed cell count
  let totalCount = countSafeSquares m 
  let revealedCount = countRevealedSquares m

  Just revealedRow <- TR.fromHTMLElement <$> T.insertRow table
  addCellWithText revealedRow "▣"
  addCellWithText revealedRow (makeFractionalString revealedCount totalCount) 
 
  let flagArray = map Flag (0..(length m.presentMines - 1))
  void $ sequence $ map (\k -> makeFlagTableRow table (getFlagCount m k)) flagArray
  if length flagArray /= 1 && s.allowQuestionFlags then makeFlagTableRow table (getFlagCount m UnknownMine) else pure unit