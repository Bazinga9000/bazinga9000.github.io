module TestPurescript where

import Data.Decimal
import Data.Maybe
import NumberSystems
import NumberSystems.Systems
import Prelude

import Effect (Effect)
import Effect.Console (log)
import Partial.Unsafe (unsafePartial)

main :: Effect Unit
main = do
  initArgam
  let
    d = (unsafePartial $ fromJust $ fromString "-123456789.2347823470000000000000001")
  log $ show d
  log $ show $ toBase 10 d
  log $ show $ toBase 60 d
  log $ show $ convertToNumberSystem argam 10 d
  log $ show $ convertToNumberSystem argam 60 d
  log $ show $ convertToNumberSystem argam 120 d
  log $ show $ convertToNumberSystem computerese 10 d
  log $ show $ nameInNumberSystem argam 10 d