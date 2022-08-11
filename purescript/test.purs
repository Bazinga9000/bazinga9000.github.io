module TestPurescript where

import Prelude
import Effect (Effect)
import Effect.Console (log)
import NumberSystems
import Data.Maybe
import Partial.Unsafe (unsafePartial)
import Data.Decimal
import NumberSystems.Systems

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
