module Mines.Settings where

import Graphics.Canvas
import Prelude

import Data.Maybe (Maybe(..))
import Effect (Effect)
import Effect.Timer (IntervalId)
import Partial.Unsafe (unsafePartial)


type Settings = {
    -- config
    autoDecrement :: Boolean,

    -- things renderers care about
    mfCanvas :: CanvasElement, 
    mfCtx :: Context2D,
    timerId :: Maybe IntervalId
}


defaultSettings :: Effect Settings
defaultSettings = unsafePartial do 
    Just canvas <- getCanvasElementById "minefield"
    ctx <- getContext2D canvas
    pure {
        autoDecrement: false, 
        mfCanvas: canvas, 
        mfCtx: ctx, 
        timerId: Nothing
    }