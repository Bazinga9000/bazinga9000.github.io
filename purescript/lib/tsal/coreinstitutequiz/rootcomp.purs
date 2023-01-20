module Tsal.CoreInstituteQuiz.RootComponent where

import Data.Array
import Data.Maybe
import Data.Tuple
import Prelude
import Tsal.CoreInstituteQuiz.State

import Data.Map as M
import Data.Tuple as T
import Effect (Effect)
import Effect.Aff.Class (class MonadAff)
import Halogen as H
import Halogen.HTML as HH
import Halogen.HTML.Events as HE
import Halogen.HTML.Properties as HP
import Halogen.Subscription as HS

data Action = RegisterAnswer String | Back | ShowAll | ShowYours

rootComponent :: forall query input output m. MonadAff m => H.Component query input output m
rootComponent = H.mkComponent
    { initialState
    , render
    , eval: H.mkEval H.defaultEval { handleAction = handleAction }
    } where
    initialState _ = defaultState

render :: forall m. State -> H.ComponentHTML Action () m
render state = case state.questionNumber of
    ShowResults -> renderResults state
    QNum n -> renderQuestionNumber n
    ViewAll -> renderAllResults

renderResults :: forall m. State -> H.ComponentHTML Action () m
renderResults state = HH.div [HP.style "text-align: center;"]
    [ 
        HH.h2_ [ HH.text "Your Core Institute Amalgam is"]
        , renderResult first
        , HH.br_
        , HH.h3_ [ HH.text "Scores"]
        , HH.div [HP.style "text-align: center;"] scoreTable
        , HH.button [ HE.onClick \_ -> ShowAll] [HH.text "Show All Amalga"]
    ] where
        weightResults = sortBy (\a b -> compare (fst b) (fst a)) (zip (state.weights) results)
        first = case head weightResults of
            Just a -> snd a
            Nothing -> errorResult
        scoreTable = map (\t -> HH.p_ [HH.text $ (snd t).name <> ": " <> show (fst t)]) weightResults
        

renderQuestionNumber :: forall m. Int -> H.ComponentHTML Action () m
renderQuestionNumber n = case questions !! n of
    Nothing -> HH.div [HP.style "text-align: center;"] [ HH.h1_ [HH.text $ "E: No Question " <> show (n+1)]]
    Just q -> HH.div [HP.style "text-align: center;"] ([ 
          HH.h3_ [HH.text q.question]
        , HH.br_
        , HH.button [ HE.onClick \_ -> Back] [HH.text "Return to Previous Question"]
        , HH.br_
        , HH.br_
    ] <> concatMap (\x -> renderAnswerButton $ T.fst x) (fromFoldable q.answers))

renderAnswerButton :: forall m. String -> Array (H.ComponentHTML Action () m)
renderAnswerButton s = [
    HH.button [ HE.onClick \_ -> RegisterAnswer s] [HH.text $ s], HH.br_
]

renderResult :: forall m. Result -> H.ComponentHTML Action () m
renderResult r =  HH.div [HP.style "text-align: center;"] [
      HH.h2 colorstyle [HH.text r.name]
    , HH.img [HP.src $ "/resources/tsal/coreinstitutequiz/" <> r.svg_path, HP.style "width: 10%; height: auto"]
    , HH.h4 colorstyle [HH.i_ [HH.text r.motto]]
    , HH.p [HP.style "display: inline-block; width: 40%; align: center; line-height: 1.3"] [HH.text r.desc]
] where
    colorstyle = [HP.style $ "color: " <> r.color]

renderAllResults :: forall m. H.ComponentHTML Action () m
renderAllResults = HH.div [HP.style "text-align: center;"] $ [
    HH.button [HE.onClick \_ -> ShowYours] [HH.text "Return to your results."], HH.br_
] <> map renderResult results

handleAction :: forall output m. MonadAff m => Action -> H.HalogenM State Action () output m Unit
handleAction = case _ of
    RegisterAnswer s -> H.modify_ \st -> case st.questionNumber of
        ShowResults -> st
        ViewAll -> st
        QNum n -> nextQuestion (applyAnswer n s st)

    Back -> H.modify_ prevQuestion

    ShowAll -> H.modify_ \st -> st {questionNumber = ViewAll}
    ShowYours -> H.modify_ \st -> st {questionNumber = ShowResults}