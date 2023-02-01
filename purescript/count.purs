module Count where

import Count.RootComponent
import ExpantaNum
import Prelude

import Effect (Effect)
import Effect.Console (log)
import Utils.AppRunner

main :: Effect Unit
main = do
  test
  runApp rootComponent

test :: Effect Unit
test = do
  log $ show $ grahamsNumber
  log $ show $ tetr grahamsNumber (mkEN "3")
  log $ show $ tetr (mkEN "3") (mkEN "4")
  log $ show $ (mkEN "2") + (mkEN "2") 
  log $ show $ toStringWithDecimalPlaces (mkEN "1283192831293819831928") 3 true