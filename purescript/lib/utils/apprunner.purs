module Utils.AppRunner where

import Effect
import Prelude
import Effect.Aff
import Halogen as H
import Halogen.Aff as HA
import Halogen.VDom.Driver (runUI)


runApp :: forall query output. H.Component query Unit output Aff -> Effect Unit
runApp rootComponent = do
  HA.runHalogenAff do
    body <- HA.awaitBody
    runUI rootComponent unit body