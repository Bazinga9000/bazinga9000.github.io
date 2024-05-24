module Mines where

import Data.Map
import Data.Maybe
import Effect.Ref
import Graphics.Canvas
import Graphics.Path2D
import Mines.Charge
import Mines.ChargeDisplay
import Mines.Colortest
import Mines.Graphics
import Mines.Mine
import Mines.Minefield
import Mines.Parsing
import Mines.Settings
import Mines.Templates
import Prelude
import Utils.Generators
import Utils.IPoint
import Web.Event.Event
import Web.Event.EventTarget
import Web.UIEvent.MouseEvent
import Web.UIEvent.KeyboardEvent as KE

import Data.Array (length, (..), (!!))
import Data.Array as A
import Data.DateTime.Instant (Instant, diff)
import Data.Either (Either(..))
import Data.Formatter.Number (formatNumber)
import Data.Int (floor, toNumber)
import Data.Time.Duration (Milliseconds(..), fromDuration)
import Data.Traversable (sequence)
import Effect (Effect)
import Effect.Console (logShow)
import Effect.Now (now)
import Effect.Timer (clearInterval, setInterval)
import Graphics.Canvas.Utils (toCanvasElement)
import Partial.Unsafe (unsafePartial)
import Random.LCG (randomSeed)
import Web.DOM.Document (createElement, toNonElementParentNode)
import Web.DOM.Document as D
import Web.DOM.Element (getBoundingClientRect, setAttribute, toEventTarget, toNode)
import Web.DOM.Node (appendChild, firstChild, removeChild, setTextContent, textContent)
import Web.DOM.NonElementParentNode (getElementById)
import Web.HTML (window)
import Web.HTML.HTMLDocument (toDocument)
import Web.HTML.HTMLTableCellElement as TD
import Web.HTML.HTMLTableElement as T
import Web.HTML.HTMLTableRowElement as TR
import Web.HTML.HTMLTextAreaElement as TA
import Web.HTML.Window (document)

main :: Effect Unit
main = do
  minefieldRef <- new $ blankMinefield 15 15 []
  settingsRef <- defaultSettings >>= new
  scenarioLoad settingsRef minefieldRef
  draw settingsRef minefieldRef
  setupEvents settingsRef minefieldRef
  --colorTestRenderer -- uncomment this line to render some small charges for color testing


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

  Just scenarioButtonNode <- getElementById "loadscenario" npn 
  scenarioLoadEvent <- eventListener (\_ -> scenarioLoad settingsRef minefieldRef)
  addEventListener (EventType "click") scenarioLoadEvent true (toEventTarget scenarioButtonNode)

  let presetScenario = setupPresetScenarioEvent settingsRef minefieldRef
  presetScenario "classicscenario" classicScenario
  presetScenario "antiminescenario" antiMineScenario
  presetScenario "threecolorscenario" threeColorScenario
  presetScenario "sixcolorscenario" sixColorScenario
  presetScenario "magnetscenario" magnetScenario
  presetScenario "redshiftscenario" redShiftScenario
  presetScenario "swathscenario" swathScenario
  presetScenario "swaththreecolorsscenario" swathThreeColorScenario

  d <- map (toDocument) (document =<< window)
  resetBoardListener <- eventListener (resetBoardEvent settingsRef minefieldRef)
  addEventListener (EventType "keydown") resetBoardListener true (D.toEventTarget d)

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
    (Just clue) -> let ctx = s.mfCtx in do
        let x = (toNumber $ p'.x) * squareSize
        let y = (toNumber $ p'.y) * squareSize

        let boundRect = { 
            x: x,
            y: y,
            width: squareSize,
            height: squareSize
        } 

        -- draw background 
        let backgroundColor = if clue.revealed then case clue.mine of 
                Nothing -> "#FFF"
                (Just _) -> "#F88"
            else if m.gameState == Won then "#0c7" else "#999"

        setFillStyle ctx backgroundColor
        fillPath ctx $ rect ctx boundRect

        -- draw border
        setStrokeStyle ctx "#000000"
        strokePath ctx $ rect ctx boundRect 

        if m.gameState == Ungenerated || m.gameState == Generated then 
            -- the game is still actively being played
            if clue.revealed then do  
                drawCharge s x y squareSize clue m.displayMode
            else 
                drawFlag s boundRect clue m.mineDistribution
        else 
            -- the game is won/lost, uncover all mines
            case clue.mine of 
                Nothing -> if clue.revealed then do 
                    drawCharge s x y squareSize clue m.displayMode
                else do 
                    drawFlag s boundRect clue m.mineDistribution
                    if clue.flagState == Nothing then pure unit else do 
                        -- misflag, flagged an empty cell
                        drawMineGraphic ctx boundRect (MinePath misflagX) "#FFFFFF" 
                (Just (Mine g _)) -> case clue.flagState of 
                    Nothing -> drawMineGraphic ctx boundRect g.mineGraphic g.mineColor
                    (Just UnknownMine) -> drawMineGraphic ctx boundRect g.mineGraphic g.mineColor
                    (Just (Flag k)) -> let k' = fromMaybe k clue.mineIndex in do 
                        logShow k 
                        logShow k'
                        if k == k' then -- correct flag
                            drawFlag s boundRect clue m.mineDistribution
                        else unsafePartial do 
                            -- misflag, flagged mine incorrectly
                            let offset = squareSize * 0.4 
                            let dim = squareSize * 0.6
                            let mineRect = {x: x, y: y + offset, width: dim, height: dim}
                            let flagRect = {x: x + offset, y: y, width: dim, height: dim}
                            drawMineGraphic ctx mineRect g.mineGraphic g.mineColor 
                            let (Just (Mine fg _)) = m.presentMines !! k
                            drawMineGraphic ctx flagRect fg.flagGraphic fg.flagColor
                            drawMineGraphic ctx flagRect (MinePath misflagX) "#FFFFFF" 

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
                ComplexCharges -> do 
                    setFont ctx $ (show $ floor halfSize) <> "px gothica"
                    let quarterSize = squareSize / 4.0
                    let offset = halfSize * 0.15
                    -- render clasical part
                    setFillStyle ctx (classicalColor n)
                    fillText ctx (show n) (x + halfSize - offset) (y + quarterSize)
                    -- render color part 
                    let cm = (colorChargeMagnitude r g b)
                    let cc = (colorChargeColor r g b) 
                    setFillStyle ctx cc 
                    fillText ctx cm (x + halfSize + offset) (y + halfSize + quarterSize)


drawMineGraphic :: Context2D -> Rectangle -> MineGraphic -> String -> Effect Unit
drawMineGraphic ctx rect g color = case g of 
    (MineSymbol s) -> do
        let halfSize = (rect.width) / 2.0 
        setFillStyle ctx color
        setTextAlign ctx AlignCenter
        setFont ctx $ (show $ floor $ 1.2 * halfSize) <> "px gothica"
        fillText ctx s (rect.x + halfSize) (rect.y + halfSize)
    (MinePath p) -> do
        setFillStyle ctx color
        let offset = (rect.width) / 6.0
        let dim = (rect.width) - (2.0 * offset)
        let r = {x: rect.x + offset, y: rect.y + offset, width: dim, height: dim}
        fillPath2D ctx p r

drawFlag :: Settings -> Rectangle -> Clue -> Array MineCount -> Effect Unit 
drawFlag s rect clue mineDistribution = let ctx = s.mfCtx in case clue.flagState of
    Nothing -> pure unit 
    (Just (Flag k)) -> case (mineDistribution A.!! k >>= (mineOf >>> mineGraphicsOf >>> Just)) of
        Nothing -> pure unit 
        (Just g) -> drawMineGraphic ctx rect g.flagGraphic g.flagColor
    (Just UnknownMine) -> drawMineGraphic ctx rect (MineSymbol "?") "#FFFFFF"

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

scenarioLoad :: Ref Settings -> Ref Minefield -> Effect Unit 
scenarioLoad sr mr = unsafePartial $ do
    npn <- map (toNonElementParentNode <<< toDocument) (document =<< window)
    Just node <- getElementById "scenarioinput" npn
    let (Just input) = TA.fromElement node
    scenario <- TA.value input
    
    case parseScenarioToMinefield scenario of
            Left e -> logShow e
            Right m -> void $ modify (\_ -> m) mr

    --stop timer if started
    s <- read sr
    case s.timerId of
            Nothing -> pure unit
            (Just iid) -> unsafePartial $ do 
                clearInterval iid
                Just timer <- getElementById "timer" npn
                setTextContent "0:00.00" (toNode timer)
    draw sr mr


setScenario :: String -> Ref Settings -> Ref Minefield -> Effect Unit
setScenario scenario sr mr = unsafePartial $ do
    npn <- map (toNonElementParentNode <<< toDocument) (document =<< window)
    Just node <- getElementById "scenarioinput" npn
    let (Just input) = TA.fromElement node
    TA.setValue scenario input
    scenarioLoad sr mr

setupPresetScenarioEvent :: Ref Settings -> Ref Minefield -> String -> String -> Effect Unit
setupPresetScenarioEvent sr mr id scenario = unsafePartial $ do
    npn <- map (toNonElementParentNode <<< toDocument) (document =<< window)
    Just scenarioChangeNode <- getElementById id npn 
    scenarioChangeEvent <- eventListener (\_ -> setScenario scenario sr mr)
    addEventListener (EventType "click") scenarioChangeEvent true (toEventTarget scenarioChangeNode)

resetBoardEvent :: Ref Settings -> Ref Minefield -> Event -> Effect Unit
resetBoardEvent sr mr e = unsafePartial do
    let (Just keyboardEvent) = KE.fromEvent e
    if KE.key keyboardEvent == "r" then scenarioLoad sr mr else pure unit

{---------------------------------------
MINE COUNT TABLE RENDERING
---------------------------------------}

makeFractionalString :: Int -> Int -> String 
makeFractionalString a b = show a <> "/" <> show b

makeFlagTableRow :: T.HTMLTableElement -> Maybe FlagCount -> Effect Unit 
makeFlagTableRow _ Nothing = pure unit 
makeFlagTableRow t (Just fc) = void $ unsafePartial do 
    Just row <- TR.fromHTMLElement <$> T.insertRow t
    case fc.mine.flagGraphic of 
        (MineSymbol s) -> do
            Just newCell <- TD.fromHTMLElement <$> TR.insertCell row
            setTextContent s (TD.toNode newCell)
            let style = "font-size: 50px; font-family: gothica; vertical-align: center; text-align: center; color: " <> fc.mine.flagColor
            setAttribute "style" style (TD.toElement newCell)

        (MinePath p) -> do
            Just newCell <- TD.fromHTMLElement <$> TR.insertCell row 
            ce <- ((createElement "canvas") <<< toDocument) =<< document =<< window 
            setAttribute "width" "50px" ce
            setAttribute "height" "50px" ce
            let (Just canvas) = toCanvasElement ce
            ctx <- getContext2D canvas
            setFillStyle ctx fc.mine.flagColor
            fillPath2D ctx p {x: 0.0, y: 0.0, width: 50.0, height: 50.0}
            appendChild (toNode ce) (toNode $ TD.toElement newCell)

    Just countCell <- TD.fromHTMLElement <$> TR.insertCell row
    setTextContent (makeFractionalString fc.current fc.total) (TD.toNode countCell)
    setAttribute "style" "font-family: gothica; vertical-align: center; text-align: center" (TD.toElement countCell)


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
  Just revealedGlyphCell <- TD.fromHTMLElement <$> TR.insertCell revealedRow
  setTextContent "▣" (TD.toNode revealedGlyphCell)
  setAttribute "style" "font-size: 50px; vertical-align: center; text-align: center" (TD.toElement revealedGlyphCell)  

  Just revealedCountCell <- TD.fromHTMLElement <$> TR.insertCell revealedRow
  setTextContent (makeFractionalString revealedCount totalCount)  (TD.toNode revealedCountCell)
  setAttribute "style" "font-family: gothica; vertical-align: center; text-align: center" (TD.toElement revealedCountCell)


  let flagArray = map Flag (0..(length m.presentMines - 1))
  void $ sequence $ map (\k -> makeFlagTableRow table (getFlagCount m k)) flagArray
  if length flagArray /= 1 && s.allowQuestionFlags then makeFlagTableRow table (getFlagCount m UnknownMine) else pure unit