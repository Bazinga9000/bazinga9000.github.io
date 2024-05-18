module Utils.IPoint where

import Prelude

import Data.Array (concatMap, (..))

newtype IPoint = IPoint {
    x :: Int, 
    y :: Int
}
derive instance ordIPoint :: Ord IPoint
derive instance eqIPoint :: Eq IPoint
instance showIPoint :: Show IPoint where 
    show (IPoint p) = "(" <> show p.x <> "," <> show p.y <> ")"

mkIPoint :: Int -> Int -> IPoint 
mkIPoint x y = IPoint {x : x, y : y}

instance semigroupIPoint :: Semigroup IPoint where 
    append (IPoint p) (IPoint q) = mkIPoint (p.x + q.x) (p.y + q.y) 

instance monoidIPoint :: Monoid IPoint where 
    mempty = mkIPoint 0 0


latticeOneIndex :: Int -> Int -> Array IPoint 
latticeOneIndex width height = concatMap (\i -> map (\j -> mkIPoint i j) (1 .. width)) (1 .. height)

lattice :: Int -> Int -> Array IPoint 
lattice width height = concatMap (\i -> map (\j -> mkIPoint i j) (0 .. (width - 1))) (0 .. (height - 1))

sub :: IPoint -> IPoint -> IPoint 
sub (IPoint p) (IPoint q) = mkIPoint (p.x - q.x) (p.y - q.y)

add :: IPoint -> IPoint -> IPoint 
add p q = p <> q

infixl 5 add as .+
infixl 5 sub as .- 
