module TestPurescript where

import Prelude

import Effect (Effect)
import Effect.Console (log)
import TestLib

main :: Effect Unit
main = do
  log $ "🍝" <> (show $ plusone 0)
