module Graphics.Path2D
  ( Path2D
  , boundingBox
  , fillPath2D
  , fromPathString
  , fromPathStrings
  , strokePath2D
  )
  where

import Effect
import Graphics.Canvas
import Prelude
import Web.HTML.HTMLElement

import Data.Array (intercalate)
import Data.Function.Uncurried (Fn3, runFn3)
import Utils.String (unwords)

foreign import data Path2D :: Type

foreign import fromPathString :: String -> Path2D

fromPathStrings :: Array String -> Path2D
fromPathStrings arr = fromPathString $ intercalate "M 0 0" arr

foreign import _fillPath2D :: Fn3 Context2D Path2D Rectangle (Effect Unit)

fillPath2D :: Context2D -> Path2D -> Rectangle -> Effect Unit 
fillPath2D = runFn3 _fillPath2D

foreign import _strokePath2D :: Fn3 Context2D Path2D Rectangle (Effect Unit)

strokePath2D :: Context2D -> Path2D -> Rectangle -> Effect Unit 
strokePath2D = runFn3 _strokePath2D

foreign import boundingBox :: Path2D -> Rectangle
