module Tsal.Calendar where

import Prelude
import Data.Array as A
import Partial.Unsafe as PU 
import Data.Foldable (sum)
import Data.Maybe
import Data.Eq
import Data.Int

-- no idea if this even works which is why i haven't built a frontend but i'll leave this here for posterity
data TsalYearType = W | B | G
derive instance eqTsalYearType :: Eq TsalYearType

data TsalMonth = Black | Midnight | Blue |
 Cyan | Teal | Green | Forest | Yellowgreen | 
 Yellow | Lightyellow | Orange | Pink | Red |
 Crimson | Magenta | Purple | Purplepink | White

instance showTsalMonth :: Show TsalMonth where
    show Black = "Black"
    show Midnight = "Midnight"
    show Blue = "Blue"
    show Cyan = "Cyan"
    show Teal = "Teal"
    show Green = "Green"
    show Forest = "Forest"
    show Yellowgreen = "Yellowgreen"
    show Yellow = "Yellow"
    show Lightyellow = "Lightyellow"
    show Orange = "Orange"
    show Pink = "Pink"
    show Red = "Red"
    show Crimson = "Crimson"
    show Magenta = "Magenta"
    show Purple = "Purple"
    show Purplepink = "Purplepink"
    show White = "White"


data TsalDate = TsalDate Int TsalMonth Int 

instance showTsalDate :: Show TsalDate where 
    show (TsalDate y m d) = "(TsalDate " <> show y <> " " <> show m <> " " <> show d <> ")"

data TsalTime = TsalTime Int Int Number

instance showTsalTime :: Show TsalTime where 
    show (TsalTime h m s) = "(TsalTime " <> show h <> " " <> show m <> " " <> show s <> ")"

data TsalDateTime = TsalDateTime TsalDate (Maybe TsalTime)

instance showTsalDateTime :: Show TsalDateTime where
    show (TsalDateTime d t) = "(TsalDateTime " <> show d <> " " <> show t <> ")"

-- checks if a month/day pair is a valid Tsal date (i.e, the day is within bounds)
isValidMonthDay :: TsalMonth -> Int -> Boolean 
isValidMonthDay m d = if (d <= 0) || (d > daysInMonth m) then false else true

-- checks if a year/month pair is a valid Tsal date (i.e, no white months in black years)
isValidYearMonth :: Int -> TsalMonth -> Boolean 
isValidYearMonth y White = getYearType y /= B
isValidYearMonth y Black = getYearType y /= W
isValidYearMonth _ _ = true

-- makes a TsalDate iff the input is valid
mkTsalDate :: Int -> TsalMonth -> Int -> Maybe TsalDate 
mkTsalDate y m d = if (isValidMonthDay m d) && (isValidYearMonth y m) then Just (TsalDate y m d) else Nothing

mkTsalTime :: Int -> Int -> Number -> Maybe TsalTime
mkTsalTime h m s = if (between 0 11 h) && (between 0 143 h) && (between 0.0 143.0 s) then Just (TsalTime h m s) else Nothing

mkTsalDateTime :: Int -> TsalMonth -> Int -> Int -> Int -> Number -> Maybe TsalDateTime 
mkTsalDateTime y m d h min s = do 
    date <- mkTsalDate y m d 
    time <- mkTsalTime h min s 
    pure $ TsalDateTime date (Just time)

-- the number of days in a given Tsal month.
daysInMonth :: TsalMonth -> Int 
daysInMonth Black = 40
daysInMonth Midnight = 39 
daysInMonth Blue = 40
daysInMonth Cyan = 39
daysInMonth Teal = 40
daysInMonth Green = 39
daysInMonth Forest = 40
daysInMonth Yellowgreen = 39 
daysInMonth Yellow = 40
daysInMonth Lightyellow = 39 
daysInMonth Orange = 40
daysInMonth Pink = 39
daysInMonth Red = 40
daysInMonth Crimson = 39 
daysInMonth Magenta = 40
daysInMonth Purple = 39
daysInMonth Purplepink = 40 
daysInMonth White = 39

-- computes the number of days before a given month (in a gray/black year)
daysBeforeMonthG :: TsalMonth -> Int
daysBeforeMonthG Black = 0
daysBeforeMonthG Midnight = 40*1 + 39*0
daysBeforeMonthG Blue = 40*1 + 39*1
daysBeforeMonthG Cyan = 40*2 + 39*1
daysBeforeMonthG Teal = 40*2 + 39*2
daysBeforeMonthG Green = 40*3 + 39*2
daysBeforeMonthG Forest = 40*3 + 39*3
daysBeforeMonthG Yellowgreen = 40*4 + 39*3
daysBeforeMonthG Yellow = 40*4 + 39*4
daysBeforeMonthG Lightyellow = 40*5 + 39*4
daysBeforeMonthG Orange = 40*5 + 39*5
daysBeforeMonthG Pink = 40*6 + 39*5
daysBeforeMonthG Red = 40*6 + 39*6
daysBeforeMonthG Crimson = 40*7 + 39*6
daysBeforeMonthG Magenta = 40*7 + 39*7
daysBeforeMonthG Purple = 40*8 + 39*7
daysBeforeMonthG Purplepink = 40*8 + 39*8
daysBeforeMonthG White = 40*9 + 39*8



-- the number of days in a given Tsal year.
daysInYear :: TsalYearType -> Int 
daysInYear G = 711
daysInYear W = 711 - daysInMonth Black 
daysInYear B = 711 - daysInMonth White

-- 203-long array storing the 203 year cycle
yearCycle :: Array TsalYearType
yearCycle = A.concat [A.concat (A.replicate 13 longCycle), shortCycle] where 
    whiteCycle = [G, G, G, G, G, G, W]
    blackCycle = [G, G, G, G, G, G, G, B]
    shortCycle = blackCycle 
    longCycle = A.concat [whiteCycle, blackCycle]

-- 203-long array storing the length of each year in the 203 year cycle
yearLengthCycle :: Array Int 
yearLengthCycle = map daysInYear yearCycle

-- get the year type of a given Tsal year.
getYearType :: Int -> TsalYearType
getYearType y = PU.unsafePartial $ A.unsafeIndex yearCycle ((y - 1) `mod` 203) -- unsafeIndex because we know the index will be in bounds

-- constant for number of Tsal seconds in a Tsal day (12^5)
tsalSecondsInDay :: Number
tsalSecondsInDay = toNumber $ 12 * 12 * 12 * 12 * 12

-- constant for number of Tsal seconds in a 203 year cycle (derived from length array and the per-day constant)
tsalSecondsIn203Cycle :: Number 
tsalSecondsIn203Cycle = tsalSecondsInDay * (toNumber $ sum $ yearLengthCycle)

-- computes the number of seconds in a given time (part of a day)
tsalSecondsInTime :: TsalTime -> Number 
tsalSecondsInTime (TsalTime h m s) = s + ms + hs where 
    hs = toNumber $ h * 12 * 12 * 12 * 12
    ms = toNumber $ m * 12 * 12 * 12
    
-- computes the number of seconds from 0 in a given date (the "unix" timestamp with epoch 0)
tsalSecondsInDate :: TsalDate -> Number
tsalSecondsInDate (TsalDate y m d) = prevCycleSeconds + currentCycleSeconds + currentYearSeconds + currentMonthSeconds where
    y' = y - 1 -- this is anti-oboe since year 1 is yearCycle !! 0
    numCycles = toNumber $ y' `div` 203 
    yearIndex = y' `mod` 203
    prevCycleSeconds = tsalSecondsIn203Cycle * numCycles
    currentCycleSeconds = tsalSecondsInDay * (toNumber $ sum $ A.slice 0 yearIndex yearLengthCycle)
    whiteYearAdjustment = if getYearType y == W then -40 else 0
    currentYearSeconds = tsalSecondsInDay * (toNumber $ whiteYearAdjustment + daysBeforeMonthG m)
    currentMonthSeconds = tsalSecondsInDay * (toNumber $ d - 1)


tsalSecondsInDateTime :: TsalDateTime -> Number
tsalSecondsInDateTime (TsalDateTime d Nothing) = tsalSecondsInDate d 
tsalSecondsInDateTime (TsalDateTime d (Just t)) = (tsalSecondsInTime t) + (tsalSecondsInDate d)


testEpoch :: TsalDateTime
testEpoch = TsalDateTime (TsalDate 5136 Black 1) (Just (TsalTime 0 0 0.0))
