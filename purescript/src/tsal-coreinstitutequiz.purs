module Tsal.CoreInstituteQuiz where

import Prelude
import Effect (Effect)
import Utils.AppRunner
import Tsal.CoreInstituteQuiz.RootComponent

main :: Effect Unit
main = runApp rootComponent