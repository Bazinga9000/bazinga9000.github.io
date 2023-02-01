module Utils.Arrays where

import Prelude
import Data.Array
import Data.List as L

chunks :: forall a. Int -> Array a -> Array (Array a)
chunks n a
    | length a <= n = [a]
    | otherwise = [take n a] <> chunks n (drop n a)