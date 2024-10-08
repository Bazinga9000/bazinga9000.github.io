module Color.HSLuv (hsluv, toHSLuv)
  where

import Color
import Prelude

import Data.Function.Uncurried (Fn3, runFn3)




type RGB = {
    r :: Number,
    g :: Number, 
    b :: Number 
}

type HSLUV = {
    h :: Number,
    s :: Number,
    l :: Number
}


foreign import _toHSLuv :: Fn3 Number Number Number HSLUV 
foreign import _toRGB :: Fn3 Number Number Number RGB

rgbToHSLuv :: Number -> Number -> Number -> HSLUV
rgbToHSLuv = runFn3 _toHSLuv

hsluvToRGB :: Number -> Number -> Number -> RGB 
hsluvToRGB = runFn3 _toRGB 

hsluv :: Number -> Number -> Number -> Color 
hsluv h s l = rgb' c.r c.g c.b where 
    c = hsluvToRGB h s l

toHSLuv :: Color -> {h :: Number, s :: Number, l :: Number}
toHSLuv c = {h: c'.h, s: c'.s, l: c'.l} where
    r = toRGBA' c
    c' = rgbToHSLuv r.r r.g r.b
