module Mines.Colortest where


import Data.Maybe
import Mines.Charge
import Mines.ChargeDisplay
import Prelude

import Data.Array (concatMap, (..))
import Data.Traversable (sequence)
import Effect (Effect)
import Partial.Unsafe (unsafePartial)
import Web.DOM.Document (toNonElementParentNode)
import Web.DOM.Element (setAttribute)
import Web.DOM.Node (firstChild, removeChild, setTextContent)
import Web.DOM.NonElementParentNode (getElementById)
import Web.HTML (window)
import Web.HTML.HTMLDocument (toDocument)
import Web.HTML.HTMLTableCellElement as TD
import Web.HTML.HTMLTableElement as T
import Web.HTML.HTMLTableRowElement as TR
import Web.HTML.Window (document)


chargeTestArray :: Array MineCharge 
chargeTestArray = map classicalCharge (concatMap (\x -> [x, -x]) (0 .. 50))
{-
chargeTestArray = [
    Charge 0 0 0 1,
    Charge 0 0 1 0,
    Charge 0 0 1 1,
    Charge 0 0 1 2,
    Charge 0 0 1 3,
    Charge 0 0 1 4,
    Charge 0 0 2 1,
    Charge 0 0 2 3,
    Charge 0 0 3 1,
    Charge 0 0 3 2,
    Charge 0 0 3 4,
    Charge 0 0 4 1,
    Charge 0 0 4 3,
    Charge 0 1 0 0, 
    Charge 0 1 0 1,
    Charge 0 1 0 2,
    Charge 0 1 0 3,
    Charge 0 1 0 4,
    Charge 0 1 1 0,
    Charge 0 1 2 0,
    Charge 0 1 3 0,
    Charge 0 1 4 0,
    Charge 0 2 0 1,
    Charge 0 2 0 3,
    Charge 0 2 1 0,
    Charge 0 2 3 0,
    Charge 0 3 0 1,
    Charge 0 3 0 2,
    Charge 0 3 0 4,
    Charge 0 3 1 0,
    Charge 0 3 2 0,
    Charge 0 3 4 0,
    Charge 0 4 0 1,
    Charge 0 4 0 3,
    Charge 0 4 1 0, 
    Charge 0 4 3 0
]
-}

addChargeTestCell :: T.HTMLTableElement -> MineCharge -> Effect Unit 
addChargeTestCell _ (NoMines) = pure unit
addChargeTestCell tr (Charge n r g b) = void $ unsafePartial do 
    Just row <- TR.fromHTMLElement <$> T.insertRow tr
    Just newCell <- TD.fromHTMLElement <$> TR.insertCell row
    let e = TD.toElement newCell
    let color = if n /= 0 then classicalColor n else colorChargeColor r g b
    setAttribute "style" ("font-family: gothica; color: " <> color) e

    let t = if n /= 0 then show n else show r <> "," <> show g <> "," <> show b <> " " <> (colorChargeMagnitude r g b)
    setTextContent t (TD.toNode newCell)

colorTestRenderer :: Effect Unit
colorTestRenderer = void $ unsafePartial do
    d <- toDocument <$> (document =<< window)
    let npn = toNonElementParentNode d
    Just table' <- (getElementById "colortest" npn)
    let (Just table) = T.fromElement table' 

    -- reduce table to atoms
    tbody' <- firstChild (T.toNode table)
    case tbody' of 
        Nothing -> pure unit 
        (Just tbody) -> removeChild tbody (T.toNode table)

    void $ sequence $ map (addChargeTestCell table) chargeTestArray

    

