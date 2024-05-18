module Mines.Settings where

import Prelude

import Data.Maybe (Maybe(..))
import Effect (Effect)
import Graphics.Canvas
import Partial.Unsafe (unsafePartial)


type Settings = {
    autoDecrement :: Boolean,
    mfCanvas :: CanvasElement, 
    mfCtx :: Context2D
}


defaultSettings :: Effect Settings
defaultSettings = unsafePartial do 
    Just canvas <- getCanvasElementById "minefield"
    ctx <- getContext2D canvas
    pure {
        autoDecrement: false, 
        mfCanvas: canvas, 
        mfCtx: ctx 
    }