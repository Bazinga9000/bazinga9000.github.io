module Web.HTML.Utils
  ( clearChildren
  , replaceChildren
  )
  where

import Prelude

import Data.Function.Uncurried (Fn2, runFn2)
import Effect (Effect)
import Web.DOM (Node)
import Web.HTML (HTMLElement)


foreign import clearChildren :: HTMLElement -> Effect Unit

foreign import _replaceChildren :: Fn2 HTMLElement (Array Node) (Effect Unit)

replaceChildren :: HTMLElement -> Array Node -> Effect Unit
replaceChildren = runFn2 _replaceChildren