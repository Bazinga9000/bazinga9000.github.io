module TestPurescript where

import Prelude

import Effect (Effect)
import Effect.Console (log)
import Argam
import Data.Maybe
import Partial.Unsafe (unsafePartial)
import Data.Decimal

main :: Effect Unit
main = do
  initArgam
  let d = (unsafePartial $ fromJust $ fromString "-123456789.2347823470000000000000001")
  log $ show d
  log $ show $ toBase 10 d
  log $ show $ toBase 60 d
  log $ show $ toArgamName d 10
  log $ show $ toArgamName d 60
  log $ show $ toArgamName d 120
