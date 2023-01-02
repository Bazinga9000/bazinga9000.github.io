module Count.RootComponent (rootComponent) where

import Count.State
import Data.Foldable
import Data.Tuple
import Data.Maybe
import ExpantaNum
import Prelude hiding (zero, one)
import Data.Map as M

import Control.Monad.State (state)
import Halogen as H
import Halogen.HTML as HH
import Halogen.HTML.Events as HE
import Halogen.HTML.Properties as HP
import Halogen.Subscription as HS

import Control.Monad.Rec.Class (forever)
import Effect (Effect)
import Effect.Aff (Milliseconds(..))
import Effect.Aff as Aff
import Effect.Aff.Class (class MonadAff)

type State = GlobalState

data Action = Initialize | Increment | BuyIncreaser String | Tick

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
  HH.div [HP.style "text-align: center;"] (
    [ HH.h4 blockmargin [ HH.text "You have" ]
    , HH.h1 blockmargin [ HH.text $ displayEN state.count]
    , HH.h4 blockmargin [ HH.text "Count."]
    , HH.br_
    , HH.button [ HE.onClick \_ -> Increment ] [ HH.text "Increment Count" ]
    ] <> map (\(Tuple id inc) -> HH.div [HP.style "text-align: center;"]
        [ HH.h3 blockmargin [HH.text inc.name]
        , HH.h4 blockmargin [HH.text $ "×" <> displayEN inc.multiplier]
        , HH.h3 blockmargin [HH.text $ displayEN inc.owned]
        , if state.count >= inc.cost then
            HH.button [ HE.onClick \_ -> BuyIncreaser id] [ HH.text $ "Buy for " <> displayEN inc.cost ]
        else
            HH.button_ [ HH.text $ "Can't Afford " <> displayEN inc.cost ]
        ]) (M.toUnfoldable state.increasers)
    ) where
    blockmargin = [HP.style "display: inline-block; margin-right: 20px"]


timer :: forall m a. MonadAff m => a -> m (HS.Emitter a)
timer val = do
  { emitter, listener } <- H.liftEffect HS.create
  _ <- H.liftAff $ Aff.forkAff $ forever do
    Aff.delay $ Milliseconds 30.0
    H.liftEffect $ HS.notify listener val
  pure emitter
  
handleAction :: forall output m. MonadAff m => Action -> H.HalogenM State Action () output m Unit
handleAction = case _ of
  Initialize -> do
    _ <- H.subscribe =<< timer Tick
    pure unit
  Increment ->
    H.modify_ \state -> manualCount state
  BuyIncreaser id -> 
    H.modify_ \state -> buyIncreaser id state
  Tick ->
    H.modify_ \state -> tick one state
