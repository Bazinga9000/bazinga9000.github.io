module Count where

import Count.RootComponent
import ExpantaNum
import Prelude

import Effect (Effect)
import Effect.Console (log)
import Halogen as H
import Halogen.Aff as HA
import Halogen.HTML as HH
import Halogen.HTML.Events as HE
import Halogen.VDom.Driver (runUI)

main :: Effect Unit
main = do
  test
  HA.runHalogenAff do
    body <- HA.awaitBody
    runUI rootComponent unit body

test :: Effect Unit
test = do
  log $ show $ grahamsNumber
  log $ show $ tetr grahamsNumber (mkEN "3")
  log $ show $ tetr (mkEN "3") (mkEN "4")
  log $ show $ (mkEN "2") + (mkEN "2") 
  log $ show $ toStringWithDecimalPlaces (mkEN "1283192831293819831928") 3 true