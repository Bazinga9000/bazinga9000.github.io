module Mines.ChargeDisplay where

import Color
import Control.Monad.Gen.Trans
import Prelude
import Random.LCG
import Utils.Generators

import Color.HSLuv (hsluv)
import Control.Monad.Gen as G
import Data.Int (floor, toNumber)
import Data.Number (sign, atan2, sqrt, pi)


classicalColorGenerator :: Gen Color 
classicalColorGenerator = do 
    r <- chooseInt 0 150
    g <- chooseInt 0 150
    b <- chooseInt 0 150
    pure $ rgb r g b

classicalColor :: Int -> String
classicalColor (-9) = "#CBBCA6"
classicalColor (-8) = "#2A2A2A"
classicalColor (-7) = "#9B9B9B"
classicalColor (-6) = "#253A7A"
classicalColor (-5) = "#A94400"
classicalColor (-4) = "#BE40BA"
classicalColor (-3) = "#FF34A4"
classicalColor (-2) = "#80DF1D"
classicalColor (-1) = "#22D7F1"
classicalColor    0 = "#000000" 
classicalColor    1 = "#0000FA"
classicalColor    2 = "#4B802D"
classicalColor    3 = "#DB1300"
classicalColor    4 = "#202081"
classicalColor    5 = "#690400"
classicalColor    6 = "#457A7A"
classicalColor    7 = "#1B1B1B"
classicalColor    8 = "#7A7A7A"
classicalColor    9 = "#CBBC16"
classicalColor    k = runOnceWithSeed (toHexString <$> colorGen) (mkSeed k) where
    colorGen = if k > 0 then classicalColorGenerator else do
        c <- classicalColorGenerator
        brightnessFactor <- G.chooseFloat 0.2 0.4
        brightnessSign <- sign <$> G.chooseFloat (-1.0) 1.0

        hueFactor <- G.chooseFloat (-20.0) 20.0
        
        let c' = lighten (brightnessSign * brightnessFactor) c 
        pure $ rotateHue hueFactor c'


colorChargeColor :: Int -> Int -> Int -> String 
colorChargeColor r g b = if r == g && g == b then "#000000" else toHexString $ hsv angle 1.0 0.75 where    
    rp = r - b -- real part
    op = g - b -- omega part
    r3o2 = (sqrt 3.0) / 2.0
    x = (toNumber rp) - ((toNumber op) / 2.0)
    y = (toNumber op) * r3o2
    angle = (atan2 y x) * (180.0 / pi)



colorChargeMagnitude :: Int -> Int -> Int -> String 
colorChargeMagnitude r g b = if isq * isq == sqmag then show isq else "√" <> show sqmag where 
    rp = r - b -- real part
    op = g - b -- omega part
    sqmag = (rp * rp) - (rp * op) + (op * op) 
    isq = floor (sqrt $ toNumber sqmag)
