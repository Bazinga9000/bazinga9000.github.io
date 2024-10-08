module Utils.String where

import Data.Array
import Data.Maybe
import Prelude

import Data.String as S
import Data.String.Common as S
import Data.String.Utils as S

capitalize :: String -> String
capitalize str = case S.uncons str of
  Just o -> (S.toUpper $ S.fromCodePointArray [o.head]) <> o.tail
  _ -> str

unwords :: Array String -> String
unwords = S.joinWith " "

toTitleCase :: String -> String
toTitleCase = S.words >>> titleJoin

titleJoin :: Array String -> String
titleJoin = map capitalize >>> unwords