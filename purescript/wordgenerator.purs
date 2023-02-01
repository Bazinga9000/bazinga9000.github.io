module WordGenerator where

import Prelude
import Effect (Effect)
import Utils.AppRunner
import WordGenerator.RootComponent

main :: Effect Unit
main = runApp rootComponent