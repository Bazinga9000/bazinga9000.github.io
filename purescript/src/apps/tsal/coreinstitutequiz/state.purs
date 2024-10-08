module Tsal.CoreInstituteQuiz.State where

import Data.Map
import Data.Map as M
import Prelude

import Data.Maybe
import Data.Tuple
import Data.Array as A
import Data.List
import Data.List as L

data QuestionState = QNum Int | ShowResults | ViewAll
type State = {
    questionNumber :: QuestionState,
    weights :: Array Int,
    previousWeights :: List (Array Int)
}
defaultState :: State
defaultState = {
    questionNumber: QNum 0,
    weights: [0,0,0,0,0,0,0,0,0,0,0,0],
    previousWeights: L.singleton [0,0,0,0,0,0,0,0,0,0,0,0]
    
}

type Question = {
    question :: String,
    answers :: List (Tuple String (Array Int))
}


lookupAnswer' :: List (Tuple String (Array Int)) -> String -> Maybe (Array Int)
lookupAnswer' Nil target = Nothing
lookupAnswer' (Cons (Tuple s wts) t) target = if s == target then Just wts else lookupAnswer' t target

lookupAnswer :: Question -> String -> Maybe (Array Int)
lookupAnswer q s = lookupAnswer' q.answers s

mkQuestion :: String -> Array (Tuple String (Array Int)) -> Question
mkQuestion q wts = {
    question: q,
    answers: L.fromFoldable wts
}

questions :: Array Question
questions = [
    mkQuestion "Q1: You're building a computer. What's the most important part?" [
        Tuple "The monitor. Gotta make sure everything looks right!" [2,0,1,0,3,0,0,0,1,2,1],
        Tuple "The storage space. I am eater of data." [1,1,0,0,1,0,2,2,0,3,0],
        Tuple "The RAM. The more my machine can do at once, the better." [0,0,1,2,0,3,2,0,1,1,0],
        Tuple "The CPU. It literally has \"central\" in the name." [0,1,2,1,0,2,0,3,0,0,1],
        Tuple "Coolant. Things can't be going out of control." [1,0,1,0,2,0,0,0,3,1,2],
        Tuple "The GPU. I want to push games to their limits." [0,1,2,3,0,2,0,1,1,0,0]
    ],
    mkQuestion "Q2: What does victory look like to you?" [
        Tuple "An exalted breeze flowing throughout the land." [3,0,1,0,2,0,2,0,1,0,1],
        Tuple "A glorious conflagration ending a great struggle." [0,1,1,3,0,1,0,0,0,2,2],
        Tuple "Myriad connections forming in ultimate clarity." [1,2,2,0,0,0,1,3,0,0,1],
        Tuple "The calm rest after a long storm." [2,1,0,1,0,0,0,0,1,2,3],
        Tuple "Everything moving in synchrony to your design." [1,1,0,0,0,3,0,0,2,1,2],
        Tuple "The flash of divine insight that you take advantage of." [2,0,3,0,1,1,0,2,0,0,1],
        Tuple "The last domino falling, finally complete." [0,3,1,1,2,0,0,2,1,0,0],
        Tuple "A grand agreement bringing the conflict to a halt." [1,0,1,2,0,0,3,0,1,2,0]
    ],
    mkQuestion "Q3: Have you ever dismantled a physical object for the sole purpose of seeing how it worked?" [
        Tuple "Yes" [0,2,0,2,0,2,0,2,2,2,0],
        Tuple "No" [2,0,2,0,2,0,2,0,0,0,2]
    ],
    mkQuestion "Q4: If you had to pick one, what was your favorite class in school?" [
        Tuple "English" [3,0,2,0,0,1,1,0,1,0,2],
        Tuple "Math" [2,1,0,0,3,0,0,2,0,0,1],
        Tuple "History" [2,1,1,0,0,0,1,0,0,3,2],
        Tuple "Chemistry" [0,3,0,2,0,0,0,0,2,0,0],
        Tuple "Physics" [2,1,1,0,0,0,0,3,1,0,2],
        Tuple "Biology" [0,2,3,0,0,0,1,0,2,1,1],
        Tuple "Foreign Language" [1,0,2,1,0,2,3,1,0,0,0],
        Tuple "Art / Music" [1,0,0,0,2,2,0,0,3,1,1]
    ],
    mkQuestion "Q5: What's your go-to rock paper scissors move?" [
        Tuple "Rock" [0,2,0,2,0,0,0,0,2,2,0],
        Tuple "Paper" [2,0,0,0,0,2,2,2,0,0,0],
        Tuple "Scissors" [0,0,2,0,2,0,0,0,0,0,2]
    ],
    mkQuestion "Q6: Choose one." [
        Tuple "EMPTY SET" [4,0,1,0,0,0,1,1,0,0,1],
        Tuple "FIRE SALE" [0,4,0,1,1,0,0,0,1,1,0],
        Tuple "FADE OUT" [1,0,4,0,1,0,0,1,0,0,1],
        Tuple "FORCE THROUGH" [0,1,1,4,0,1,0,0,1,0,0],
        Tuple "FOUR WAYS" [1,0,1,0,4,0,0,0,0,1,1],
        Tuple "BROKEN GOD" [1,1,1,1,0,4,0,0,0,0,0],
        Tuple "FULL HOUSE" [0,0,0,0,1,1,4,1,0,0,1],
        Tuple "SILVER BULLET" [0,1,0,0,0,1,0,4,1,1,0],
        Tuple "SEVERED SKIES" [0,0,0,1,1,0,1,0,4,0,0],
        Tuple "GRAND DESIGN" [0,1,0,1,0,1,1,0,0,4,0],
        Tuple "DOUBLE OVER" [1,0,0,0,0,0,1,1,1,0,4]
    ],
    mkQuestion "Q7: How would you solve an escape room if the door vanished after you walked in?" [
        Tuple "Clip through the wall. Doors are just suggestions." [0,2,0,0,3,0,0,0,1,2,1],
        Tuple "Keep solving the room normally, this is just part of the experience." [2,0,3,1,0,0,1,2,0,0,1],
        Tuple "Create one microgram of antimatter and hide." [0,3,0,2,1,0,0,0,2,1,1],
        Tuple "Bribe the actor in the room." [1,0,2,3,0,1,2,0,0,1,0],
        Tuple "Simply put the door back. It's not hard." [0,1,1,0,2,2,0,3,1,0,0],
        Tuple "Break through the wall with a feather in your pocket." [0,1,0,2,0,1,0,1,3,0,2],
        Tuple "Backwards Long Jump on a nearby chair." [3,1,1,0,2,0,1,0,0,2,0],
        Tuple "Get arbitrary code execution." [2,0,0,0,0,3,1,2,1,0,1]
    ],
    mkQuestion "Q8: Choose a playing card suit." [
        Tuple "Hearts" [0,0,2,0,0,0,0,0,0,0,2],
        Tuple "Clubs" [0,2,0,0,0,0,0,2,0,2,0],
        Tuple "Diamonds" [2,0,0,0,2,0,2,0,0,0,0],
        Tuple "Spades" [0,0,0,2,0,2,0,0,2,0,0]
    ],
    mkQuestion "Q9: Which power would you want?" [
        Tuple "Omnipotence - The ability to manipulate matter in accordance with arbitrary whims." [0,2,0,2,0,0,0,0,2,2,0],
        Tuple "Omniscience - The answers to any question you could ever hope to ask." [0,0,2,0,0,2,0,2,0,0,0],
        Tuple "Omnipresence - Wherever you go, there you are." [2,0,0,0,2,0,2,0,0,0,2]
    ],
    mkQuestion "Q10: Which type of game do you prefer?" [
        Tuple "A game with many different mechanics that act in glorious synchrony" [2,0,2,0,0,2,2,0,2,2,0],
        Tuple "A game with a handful of mechanics with intricacy and depth" [0,2,0,2,2,0,0,2,0,0,2]
    ],
    mkQuestion "Q11: If you had to hide something so that nobody would ever find again, where would you put it?" [
        Tuple "Encase it in tungsten and drop it into a volcano." [0,0,0,0,0,0,0,2,0,0,2],
        Tuple "Bury it in some anonymous cubic meter of the Earth's crust." [0,2,0,0,0,2,0,0,0,0,0],
        Tuple "Drop it into the Mariana Trench." [0,0,2,0,0,0,2,0,0,0,0],
        Tuple "Make it invisible and throw it into the stratosphere." [0,0,0,0,0,0,0,0,2,2,0],
        Tuple "Hitch it to a rocket headed out of the Solar System." [2,0,0,0,2,0,0,0,0,0,0],
        Tuple "Destroy it." [0,0,0,3,0,0,0,0,0,0,0]
    ]
]

applyAnswer :: Int -> String -> State -> State
applyAnswer n a st = case (A.index questions n) >>= (\q -> lookupAnswer q a) of 
    Nothing -> st
    Just (wts) -> st {
        weights = A.zipWith (+) st.weights wts,
        previousWeights = st.weights : st.previousWeights
    }

nextQuestion :: State -> State
nextQuestion st = st {
    questionNumber = case st.questionNumber of
        ShowResults -> ShowResults
        ViewAll -> ViewAll
        QNum n -> if n + 1 == A.length questions then ShowResults else QNum (n+1)
}

prevQuestion :: State -> State
prevQuestion st = case st.questionNumber of
    ShowResults -> st
    ViewAll -> st
    QNum 0 -> st
    QNum n -> case st.previousWeights of 
        Nil -> st
        Cons h t -> st {
            questionNumber = QNum (n-1),
            weights = h,
            previousWeights = t
        }


 
type Result = {
    name :: String,
    color :: String,
    motto :: String,
    svg_path :: String,
    desc :: String
}


-- colors
-- cosm: #848BF5
-- trans: #ED84F5
-- mind: #F5848E
-- combat: #F59684
-- 3D: #A484F5
-- thaumoglottics: #84F5CB
-- ling: #84F587
-- mt: #F5E684
-- ench: #84E6F5
-- artif: #D7F584
-- chron: #84B2F5

results :: Array Result
results = [
    {
        name: "Cosmology",
        color: "#848BF5",
        motto: "We stop at nothing.",
        svg_path: "cosmology.svg",
        desc: "The Amalgam of Cosmology studies the large-scale structure of reality, on the level of the galaxy, universe, and up to the universe complex. After Dirhexwate's announcement, the weird transdimensional structure that they discovered will presumably also become part of their purview. They send out (usually unmanned) expeditions throughout the universe-complex to discover universes with new physics, or, hopefully soon... new life. Our field of astronomy is also folded up into this amalgam."
    },
    {
        name: "Transmogrification",
        color: "#ED84F5",
        motto: "All techniques are one technique.",
        svg_path: "transmogrification.svg",
        desc: "The Amalgam of Transmogrification is a fusion of chemistry, what we would call alchemy, and the general part magic involving matter. Their primary focuses are figuring out simpler techniques to process the vast swaths of raw resources that Tsal has access to across the galaxy, handling the production and distribution of exotic materials such as stabilized superheavy elements, and the more alchemy-esque practice of bypassing natural chemistry entirely using magic. One of their star researchers, Dirhexwate Piiwe Kaxas Poshiko, synthesized the first of a prophesized quintuplet of artifacts."
    },
    {
        name: "The Mind",
        color: "#F5848E",
        motto: "Inside the castle of dreams.",
        svg_path: "mind.svg",
        desc: "The Amalgam of The Mind handles everything and anything brain. Their mundane equivalent is neurology and psychology, but magic plays much with the brain. They work on various ways to manipulate memory, including backing up and erasing it outright. The mental magic of telepathy and its counters resides here as well. Beyond the immediately obvious, The Mind handles almost everything that has to do with perception. Illusions, apparitions, and (anti)memetics are all under their perview."
    },
    {
        name: "Combat",
        color: "#F59684",
        motto: "Someone to watch over us.",
        svg_path: "combat.svg",
        desc: "The Amalgam of Combat is the closest thing an intragalactic mega-government organization of a handful of species needs to a military. While they could in theory respond to any internal threat if one were to arise, their primary purpose is defense against unknown outside threat. They are who keep the Core Institute so heavily warded that Cosmopolis' night sky softly glows with dozens colors to produce a truly unique view not seen anywhere else in the galaxy. These efforts both keep the Institute's sensitive experiments undamaged and protect the greater world from unfortunate catastrophe."
    },
    {
        name: "Three Dimensions",
        color: "#A484F5",
        motto: "There is no such thing as distance.",
        svg_path: "3d.svg",
        desc: "The Amalgam of Three Dimensions is in the business of taking the fabric of space and weaving it into a pretzel. Their efforts both expand space, leading to Core Institute being far bigger on the inside once you go inside the dome (Three Dimensions does not however hold themselves responsible for the moderately labyrinthine structure of its campus after several rounds of space expansion), and contract space, such as with the wormholes that conjoin the parts of Transit City to form its contiguous whole. They also handle more run-of-the-mill teleportation, used by travellers through Transit City and packages through Freight City."
    },
    {
        name: "Thaumoglottics",
        color: "#84F5CB",
        motto: "We speak, you hear.",
        svg_path: "thaumoglottics.svg",
        desc: "The Amalgam of Thaumoglottics focuses on a very specific branch of language, which is potent enough in its own right to justify their divergence from the Amalgam of Linguistics. While Linguistics handles how natural lanuages interact with magic, Thaumoglottics works backwards. They create languages tailored for specific magical purposes. A significant chunk of Core Institute can speak at least one of their creations, as a language can only be used in magic if there is some stable community that speaks it."
    },
    {
        name: "Linguistics",
        color: "#84F587",
        motto: "You speak, we hear.",
        svg_path: "linguistics.svg",
        desc: "The Amalgam of Linguistics handles... languages. While they do handle everything that our linguistics does, language study to the Tsalians is a much more important art. This is because properties of the spoken language are one influence on what magic can be cast using words from that language. Even though a large contingent of spells have incantations with words from many languages haphazardly strewn together, the study of languages and their linkage to magic allows these intricate incantations to be woven together in the first place."
    },
    {
        name: "Magical Theory",
        color: "#F5E684",
        motto: "The beating heart of power.",
        svg_path: "magicaltheory.svg",
        desc: "The Amalgam of Magical Theory are the ones that go deeper, trying to pick at the fundamental structure of magic. One may think of Magical Theory as the pure magic as opposed to the other Amalga's applied magic, as their theories on, say, thaumological carrier bosons, may not be immediately useful. But they will be useful. It was the precursors to Magical Theory who unravelled the original connections between logic, language, and magic, turning the latter from random nonsense that nobody could ever hope to understand into the active field of theory full of unknown riches and known ideas that the researchers of the modern day know and love."
    },
    {
        name: "Enchantment",
        color: "#84E6F5",
        motto: "The magic of the mundane.",
        svg_path: "enchantment.svg",
        desc: "The Amalgam of Enchantment covers the very broad field of using magic to affect mundane objects, giving them new properties or manipulating them in some way. One of the primary hurdles in Enchantment is persistence, as it is very rare for magic to not require a sentient mind in the loop. Fortunately, they've managed to stretch the efficacy of spells quite long in some cases, which allowed for such advancements as the Great Ward, which can automatically teleport the gravely injured to the Core Institute's top-notch medical facilities."
    },
    {
        name: "Artifacts",
        color: "#D7F584",
        motto: "Look back.",
        svg_path: "artifacts.svg",
        desc: "The Amalgam of Artifacts are the group that deals with all the random magical things that people find or make. People can send in things they find to be tested and analyzed to figure out what is is they actually do. In addition to serving as the populace's lab, they also look into the Transcendental Artifacts, those devices which defy the current knowledge of magic and do things that are thought to be impossible. The notable exception to this, though, is the Quintessence, which is held by Transmogrification."
    },
    {
        name: "Chronology",
        color: "#84B2F5",
        motto: "No idle hands.",
        svg_path: "chronology.svg",
        desc: "The Amalgam of Chronology handles temporal magic. This mostly comes in the form of slowing up or speeding down time in a certain region, which is of great importance to some experiments. Watching light itself crawl is an amazing sight. Chronology also handles divination and prophecy, figuring out how to reach beyond the present and into the future. One thing that they have not figured out, however, is any form of time travel. While it is known that, if it is possible, time travel has to function under 'single stable time-loop' rules, whether or not one can actually bend time this much is currently open."
    }
]


errorResult :: Result
errorResult = {
    name: "Error",
    color: "#000000",
    motto: "This should never happen.",
    svg_path: "",
    desc: "If this shows up on the page, something somewhere went really really wrong!"
}