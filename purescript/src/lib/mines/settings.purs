module Mines.Settings where

import Graphics.Canvas
import Prelude

import Data.Maybe (Maybe(..))
import Effect (Effect)
import Effect.Timer (IntervalId)
import Partial.Unsafe (unsafePartial)
import Web.DOM.Document (toNonElementParentNode)
import Web.DOM.Element (getAttribute)
import Web.DOM.NonElementParentNode (getElementById)
import Web.HTML (window)
import Web.HTML.HTMLDocument (toDocument)
import Web.HTML.HTMLInputElement (checked, fromElement)
import Web.HTML.Window (document)


type Settings = {
    -- config
    autoDecrement :: Boolean,
    allowQuestionFlags :: Boolean,

    -- things renderers care about
    mfCanvas :: CanvasElement, 
    mfCtx :: Context2D,
    timerId :: Maybe IntervalId
}


getCheckboxValue :: String -> Effect Boolean
getCheckboxValue s = unsafePartial do
    npn <- map (toNonElementParentNode <<< toDocument) (document =<< window)
    Just adCheckbox' <- (getElementById s npn)
    let (Just adCheckbox) = fromElement adCheckbox'
    checked adCheckbox


defaultSettings :: Effect Settings
defaultSettings = unsafePartial do 
    Just canvas <- getCanvasElementById "minefield"
    ctx <- getContext2D canvas
    ad <- getCheckboxValue "autodecrement"
    aqf <- getCheckboxValue "questionflags"
    pure {
        autoDecrement: ad, 
        allowQuestionFlags: aqf,
        mfCanvas: canvas, 
        mfCtx: ctx, 
        timerId: Nothing
    }