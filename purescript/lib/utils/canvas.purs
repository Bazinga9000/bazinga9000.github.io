module Graphics.Canvas.Utils
  ( toCanvasElement
  )
  where

import Data.Maybe
import Graphics.Canvas
import Prelude

import Data.Function.Uncurried (Fn3, runFn3)
import Web.DOM (Element)

foreign import toCanvasElementImpl
  :: forall r . Fn3 Element (CanvasElement -> r CanvasElement) (r CanvasElement) (r CanvasElement)

toCanvasElement :: Element -> Maybe CanvasElement
toCanvasElement e = runFn3 toCanvasElementImpl e Just Nothing
