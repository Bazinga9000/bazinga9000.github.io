module WordGenerator.RootComponent where

import Data.Maybe
import Prelude
import Random.LCG
import Syllables
import WordGenerator.State

import Control.Monad.Gen (chooseInt)
import Data.Tuple as T
import Effect.Aff.Class (class MonadAff)
import Halogen as H
import Halogen.HTML as HH
import Halogen.HTML.Events as HE
import Halogen.HTML.Properties as HP
import Utils.Arrays (chunks)
import Control.Monad.Gen.Trans
import Data.Tuple

data Action = Reseed | ChangeLanguage String

rootComponent :: forall query input output m. MonadAff m => H.Component query input output m
rootComponent = H.mkComponent
    { initialState
    , render
    , eval: H.mkEval H.defaultEval { 
        handleAction = handleAction,
        initialize = Just Reseed  }
    } where
    initialState _ = defaultState

render :: forall m. State -> H.ComponentHTML Action () m
render st = HH.div [HP.style "text-align: center;"] [
    HH.b_ [HH.text "Language: "],
    HH.select [HE.onValueChange ChangeLanguage] $ map makeOptions languages,
    HH.br_,
    HH.button [HE.onClick \_ -> Reseed] [HH.text "Regenerate" ],
    HH.br_,
    HH.table [HP.style "table-layout: fixed; width: 75%; margin-left: auto; margin-right: auto"] (map renderChunks $ chunks 10 st.results)    
] where
    renderChunks c = HH.tr_ (map renderWord c)
    renderWord w = HH.td_ [HH.text w]
    makeOptions (Tuple name _) = HH.option [HE.onClick \i -> ChangeLanguage name] [HH.text name]

handleAction :: forall output m. MonadAff m => Action -> H.HalogenM State Action () output m Unit
handleAction = case _ of
    Reseed -> do
        seed <- H.liftEffect randomSeed
        H.modify_ \st -> regenerate $ st {seed = seed}
    ChangeLanguage l -> H.modify_ \st -> regenerate $ st {generator = lookUpLanguageGenerator l}
