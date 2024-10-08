module NumberSystems.NumberSystem where

import Prelude
import Data.Tuple
import Control.Monad.Reader

data NumberSystem
  = MkNumberSystem
    { name :: String
    , digitNames :: Array String
    , digitSuffixes :: Array String
    --  , fonts :: Array (Tuple String Int)
    , maxBase :: Int
    , alphabet :: Array String
    }

name :: NumberSystem -> String
name (MkNumberSystem x) = x.name

digitNames :: NumberSystem -> Array String
digitNames (MkNumberSystem x) = x.digitNames

digitSuffixes :: NumberSystem -> Array String
digitSuffixes (MkNumberSystem x) = x.digitSuffixes

--fonts :: NumberSystem -> Array (Tuple String Int)
--fonts (MkNumberSystem x) = x.fonts
maxBase :: NumberSystem -> Int
maxBase (MkNumberSystem x) = x.maxBase

alphabet :: NumberSystem -> Array String
alphabet (MkNumberSystem x) = x.alphabet
