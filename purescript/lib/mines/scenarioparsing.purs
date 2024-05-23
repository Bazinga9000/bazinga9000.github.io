module Mines.Parsing where

import Data.Argonaut.Parser
import Data.YAML.Foreign.Decode
import Mines.Charge
import Mines.Mine
import Mines.Minefield
import Prelude
import Utils.IPoint

import Control.Monad.Except (runExcept)
import Data.Argonaut (Json, JsonDecodeError(..))
import Data.Argonaut.Decode.Class (class DecodeJson)
import Data.Argonaut.Decode.Decoders (decodeArray, decodeInt, decodeJObject, decodeString, getField)
import Data.Array (any, foldr)
import Data.Either (Either(..))
import Data.Map (Map, fromFoldable, lookup)
import Data.Maybe (Maybe(..))
import Data.Tuple (Tuple(..))

decodeMineCharge :: Json -> Either JsonDecodeError MineCharge
decodeMineCharge j = do 
    arr <- decodeArray decodeInt j
    case arr of 
        [n, r, g, b] -> pure $ Charge n r g b
        _ -> Left $ UnexpectedValue j

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
    Tuple "antiBlueMine" antiBlueMine
]


decodeMine :: Json -> Either JsonDecodeError Mine 
decodeMine j = do
    case decodeString j of
        Right s -> do
            case lookup s defaultMines of
                Nothing -> Left $ UnexpectedValue j
                (Just mine) -> pure mine
        Left _ -> Left $ UnexpectedValue j -- NOT YET IMPLEMENTED

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