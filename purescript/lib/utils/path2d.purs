module Graphics.Path2D
  ( Path2D
  , boundingBox
  , fillPath2D
  , fromPathString
  , strokePath2D
  )
  where

import Graphics.Canvas
import Prelude
import Effect
import Web.HTML.HTMLElement

import Data.Function.Uncurried (Fn3, runFn3)

foreign import data Path2D :: Type

foreign import fromPathString :: String -> Path2D

foreign import _fillPath2D :: Fn3 Context2D Path2D Rectangle (Effect Unit)

fillPath2D :: Context2D -> Path2D -> Rectangle -> Effect Unit 
fillPath2D = runFn3 _fillPath2D

foreign import _strokePath2D :: Fn3 Context2D Path2D Rectangle (Effect Unit)

strokePath2D :: Context2D -> Path2D -> Rectangle -> Effect Unit 
strokePath2D = runFn3 _strokePath2D

foreign import boundingBox :: Path2D -> Rectangle
