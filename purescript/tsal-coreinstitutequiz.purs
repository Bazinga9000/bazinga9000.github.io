module Main where

import Prelude
import Effect (Effect)
import Effect.Console (log)
import Halogen as H
import Halogen.Aff as HA
import Halogen.HTML as HH
import Halogen.HTML.Events as HE
import Halogen.VDom.Driver (runUI)

import Tsal.CoreInstituteQuiz.RootComponent

main :: Effect Unit
main = HA.runHalogenAff do
    body <- HA.awaitBody
    runUI rootComponent unit body