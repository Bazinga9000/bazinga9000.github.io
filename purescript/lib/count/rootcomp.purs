module Count.RootComponent (rootComponent) where

import Count.State
import Data.Foldable
import Data.Maybe
import Data.Tuple
import ExpantaNum
import Prelude hiding (zero, one)

import Control.Monad.Rec.Class (forever)
import Control.Monad.State (state)
import Data.Map as M
import Effect (Effect)
import Effect.Aff (Milliseconds(..))
import Effect.Aff as Aff
import Effect.Aff.Class (class MonadAff)
import Halogen as H
import Halogen.HTML as HH
import Halogen.HTML.Events as HE
import Halogen.HTML.Properties as HP
import Halogen.Subscription as HS

type State = GlobalState

data Action = Initialize | Increment | BuyIncreaser String | Tick | MaxIncreaser String | BuyTickSpeed | MaxTickSpeed | MaxAll | Debug DebugAction
data DebugAction = GainGrahamsNumberCount 

rootComponent :: forall query input output m. MonadAff m => H.Component query input output m
rootComponent =
  H.mkComponent
    { initialState
    , render
    , eval: H.mkEval H.defaultEval { 
        handleAction = handleAction,
        initialize = Just Initialize 
        }
    }

initialState :: forall input. input -> State
initialState _ = newGlobalState

render :: forall m. State -> H.ComponentHTML Action () m
render state = 
  HH.div [HP.style "text-align: center;"]
    [ HH.h4 blockmargin [ HH.text "You have" ]
    , HH.h1 blockmargin [ HH.text $ displayEN state.count]
    , HH.h4 blockmargin [ HH.text "Count."]
    , HH.br_
    , HH.h5 blockmargin [ HH.text "You are making"]
    , HH.h3 blockmargin [ HH.text $ displayEN $ getCountPerSecond state]
    , HH.h5 blockmargin [ HH.text "Count per second."]
    , HH.br_
    , HH.h5 blockmargin [ HH.text "Ticks are ticking"]
    , HH.h3 blockmargin [ HH.text $ displayEN $ state.tickSpeed]
    , HH.h5 blockmargin [ HH.text if state.tickSpeed == one then "time per second." else "times per second."]
    , HH.br_
    , HH.button [ HE.onClick \_ -> Increment ] [ HH.text "Increment Count" ]
    , HH.button [ HE.onClick \_ -> MaxAll ] [ HH.text "Max All"]
    , HH.br_
    , HH.h2 blockmargin [ HH.text $ "Multiply Tickspeed by " <> displayEN state.tickSpeedInc.multPerPurch]
    , let inc = state.tickSpeedInc in if state.count >= inc.cost then
            HH.button [ HE.onClick \_ -> BuyTickSpeed] [ HH.text $ "Buy for " <> displayEN inc.cost ]
        else
            HH.button_ [ HH.text $ "Can't Afford " <> displayEN inc.cost ]
    , HH.button [ HE.onClick \_ -> MaxTickSpeed] [ HH.text $ "Buy Max"]    
    , HH.br_
    -- , HH.button [ HE.onClick \_ -> Debug GainGrahamsNumberCount] [ HH.text "grahams number"]
    , HH.table [HP.style "table-layout: fixed; width: 75%; margin-left: auto; margin-right: auto"] increaserRows
    ] where
    increaserRows = map (makeIncreaserRow state) (M.toUnfoldable state.increasers)
    blockmargin = [HP.style "display: inline-block; margin-right: 20px"]


makeIncreaserRow ∷ forall a. GlobalState -> Tuple String Increaser → HH.HTML a Action
makeIncreaserRow state (Tuple id inc) = HH.tr_ [ 
          HH.td bm [HH.h3_ [HH.text $ inc.name]]
        , HH.td bm [HH.h4_ [HH.text $ "×" <> displayEN inc.multiplier]]
        , HH.td bm [HH.h3_ [HH.text $ displayEN $ floor inc.owned]]
        , if state.count >= inc.cost then
            HH.td bm [HH.button [ HE.onClick \_ -> BuyIncreaser id] [ HH.text $ "Buy for " <> displayEN inc.cost ]]
        else
            HH.td bm [HH.button_ [ HH.text $ "Can't Afford " <> displayEN inc.cost ]]
        , HH.td bm [HH.button [ HE.onClick \_ -> MaxIncreaser id] [ HH.text $ "Buy Max"]]
        ] where 
        bm = [HP.style "display: inline-block; width: 15%; align: center"]

timer :: forall m a. MonadAff m => Number -> a -> m (HS.Emitter a)
timer tickRate val = do
  { emitter, listener } <- H.liftEffect HS.create
  _ <- H.liftAff $ Aff.forkAff $ forever do
    Aff.delay $ Milliseconds tickRate
    H.liftEffect $ HS.notify listener val
  pure emitter
  
handleAction :: forall output m. MonadAff m => Action -> H.HalogenM State Action () output m Unit
handleAction = case _ of
  Initialize -> do
    s <- H.get
    _ <- H.subscribe =<< timer s.settings.updateRate Tick
    pure unit
  Increment ->
    H.modify_ manualCount
  BuyIncreaser id -> 
    H.modify_ $ buyIncreaser id
  Tick ->
    H.modify_ tick
  BuyTickSpeed ->
    H.modify_ buyTickSpeed
  MaxIncreaser id ->
    H.modify_ $ maxIncreaser id
  MaxTickSpeed ->
    H.modify_ $ maxTickSpeed
  MaxAll ->
    H.modify_ maxAll
  Debug a -> case a of
    GainGrahamsNumberCount -> H.modify_ \state -> state {count = grahamsNumber}