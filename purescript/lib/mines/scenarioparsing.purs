module Mines.Parsing where

import Data.Argonaut.Parser
import Data.YAML.Foreign.Decode
import Graphics.Path2D
import Mines.Charge
import Mines.Graphics
import Mines.Mine
import Mines.Minefield
import Prelude
import Utils.IPoint

import Control.Monad.Except (runExcept)
import Data.Argonaut (Json, JsonDecodeError(..))
import Data.Argonaut.Decode.Class (class DecodeJson)
import Data.Argonaut.Decode.Decoders (decodeArray, decodeInt, decodeJObject, decodeString, getField, getFieldOptional)
import Data.Array (any, foldr)
import Data.Either (Either(..))
import Data.Map (Map, fromFoldable, lookup)
import Data.Maybe (Maybe(..))
import Data.Tuple (Tuple(..))
import Debug (spy)

decodeMineCharge :: Json -> Either JsonDecodeError MineCharge
decodeMineCharge j = do 
    arr <- decodeArray decodeInt j
    case arr of 
        [n, r, g, b] -> pure $ Charge n r g b
        _ -> Left $ UnexpectedValue j

decodeIPoint :: Json -> Either JsonDecodeError IPoint
decodeIPoint j = do
    arr <- decodeArray decodeInt j
    case arr of
        [x, y] -> pure $ mkIPoint x y
        _ -> Left $ UnexpectedValue j

decodeMineValuation :: Json -> Either JsonDecodeError MineValuation
decodeMineValuation j = do
    obj <- decodeJObject j
    point <- getField decodeIPoint obj "point"
    charge <- getField decodeMineCharge obj "charge"
    pure $ MineValuation point charge

defaultMines :: Map String Mine 
defaultMines = fromFoldable [
    Tuple "standardMine" standardMine,
    Tuple "doubleMine" doubleMine,
    Tuple "antiMine" antiMine, 
    Tuple "redMine" redMine,
    Tuple "blueMine" blueMine, 
    Tuple "greenMine" greenMine,
    Tuple "magnetMine" magnetMine,
    Tuple "antiRedMine" antiRedMine,
    Tuple "antiGreenMine" antiGreenMine,
    Tuple "antiBlueMine" antiBlueMine,
    Tuple "largeMine" largeMine,
    Tuple "largeAntiMine" largeAntiMine, 
    Tuple "largeRedMine" largeRedMine,
    Tuple "largeBlueMine" largeBlueMine, 
    Tuple "largeGreenMine" largeGreenMine,
    Tuple "largeAntiRedMine" largeAntiRedMine,
    Tuple "largeAntiGreenMine" largeAntiGreenMine,
    Tuple "largeAntiBlueMine" largeAntiBlueMine
]


decodeMineGraphic :: Json -> Either JsonDecodeError MineGraphic
decodeMineGraphic j = do
    obj <- decodeJObject j
    path <- getFieldOptional decodeString obj "path"
    case path of
        Just s -> (pure <<< MinePath <<< fromPathString) s
        Nothing -> do
            sym <- getField decodeString obj "symbol"
            (pure <<< MineSymbol) sym

decodeCustomMine :: Json -> Either JsonDecodeError Mine
decodeCustomMine j = do
    obj <- decodeJObject j
    mineGraphic <- getField decodeMineGraphic obj "mineGraphic"
    mineColor <- getField decodeString obj "mineColor"
    flagGraphic <- getField decodeMineGraphic obj "flagGraphic"
    flagColor <- getField decodeString obj "flagColor"
    neighborhoods <- getField (decodeArray decodeMineValuation) obj "neighborhoods"
    let graphics = {
        mineGraphic: mineGraphic,
        mineColor: mineColor,
        flagGraphic: flagGraphic,
        flagColor: flagColor
    }
    pure $ Mine graphics neighborhoods

decodeMine :: Json -> Either JsonDecodeError Mine 
decodeMine j = do
    case decodeCustomMine j of
        Right mine -> pure mine
        Left _ -> do
            s <- decodeString j
            case lookup s defaultMines of
                Nothing -> Left $ UnexpectedValue j
                (Just mine) -> pure mine
            

decodeMineCount :: Json -> Either JsonDecodeError MineCount
decodeMineCount j = do
    obj <- decodeJObject j
    mine <- getField decodeMine obj "mine"
    count <- getField decodeInt obj "count"
    pure $ MineCount mine count

data BoardData = BoardData Int Int (Array IPoint)
decodeBoardData :: Json -> Either JsonDecodeError BoardData
decodeBoardData j = do
    obj <- decodeJObject j
    width <- getField decodeInt obj "width"
    height <- getField decodeInt obj "height"
    pure $ BoardData width height []

decodeMinefield :: Json -> Either JsonDecodeError Minefield
decodeMinefield j = do
        obj <- decodeJObject j
        (BoardData width height _) <- getField decodeBoardData obj "board" 
        mineDistribution <- getField (decodeArray decodeMineCount) obj "distribution"
        pure $ blankMinefield height width mineDistribution

parseScenarioToMinefield :: String -> Either (Either String JsonDecodeError) Minefield
parseScenarioToMinefield y = case runExcept $ parseYAMLToJson y of
    Left _ -> Left $ Left "Could not parse YAML"
    Right j -> case decodeMinefield j of
        Left e -> Left $ Right e
        Right m -> Right m