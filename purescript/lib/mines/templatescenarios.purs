module Mines.Templates where

import Prelude

classicScenario :: String 
classicScenario = """board:
    width: 15
    height: 15
distribution:
    - mine: standardMine 
      count: 30
"""

threeColorScenario :: String
threeColorScenario = """board:
    width: 15
    height: 15
distribution:
    - mine: redMine 
      count: 15
    - mine: greenMine 
      count: 15
    - mine: blueMine
      count: 15
"""

antiMineScenario :: String 
antiMineScenario = """board:
    width: 15
    height: 15
distribution:
    - mine: standardMine 
      count: 15
    - mine: antiMine 
      count: 15
"""

magnetScenario :: String
magnetScenario = """board:
    width: 15
    height: 15
distribution:
    - mine: magnetMine 
      count: 30
"""

sixColorScenario :: String
sixColorScenario = """board:
    width: 15
    height: 15
distribution:
    - mine: redMine 
      count: 10
    - mine: greenMine 
      count: 10
    - mine: blueMine
      count: 10
    - mine: antiRedMine 
      count: 10
    - mine: antiGreenMine 
      count: 10
    - mine: antiBlueMine
      count: 10
"""

redShiftScenario :: String
redShiftScenario = """board:
    width: 15
    height: 15
distribution: 
    - mine: 
          mineGraphic:
            path: m525 0v225h150v-225zm-296.21 122.76-106.03 106.03 159.1 159.1 106.03-106.03zm742.4 0-159.1 159.1 106.08 106.03 159.05-159.1zm-371.21 177.24c-164.81 0-300 135.19-300 300s135.19 300 300 300c164.81 0 300-135.19 300-300s-135.19-300-300-300zm0 150c83.719 0 150 66.281 150 150s-66.281 150-150 150-150-66.281-150-150 66.281-150 150-150zm-600 75v150h225v-150zm975 0v150h225v-150zm-693.14 287.11-159.1 159.1 106.03 106.03 159.1-159.05zm636.32 0-106.08 106.08 159.1 159.05 106.03-106.03zm-393.19 162.89v225h150v-225z
          mineColor: "#ffffee"
          flagGraphic:
            path: m525 0v225h150v-225zm-296.21 122.76-106.03 106.03 159.1 159.1 106.03-106.03zm742.4 0-159.1 159.1 106.08 106.03 159.05-159.1zm-371.21 177.24c-164.81 0-300 135.19-300 300s135.19 300 300 300c164.81 0 300-135.19 300-300s-135.19-300-300-300zm0 150c83.719 0 150 66.281 150 150s-66.281 150-150 150-150-66.281-150-150 66.281-150 150-150zm-600 75v150h225v-150zm975 0v150h225v-150zm-693.14 287.11-159.1 159.1 106.03 106.03 159.1-159.05zm636.32 0-106.08 106.08 159.1 159.05 106.03-106.03zm-393.19 162.89v225h150v-225z
          flagColor: "#eeffff"
          neighborhoods:
            - point: [1,0]
              charge: [0,0,0,1]
            - point: [-1,0]
              charge: [0,0,0,1]
            - point: [0,1]
              charge: [0,0,0,1]
            - point: [0,-1]
              charge: [0,0,0,1]
            - point: [1,1]
              charge: [0,0,1,0]
            - point: [-1,1]
              charge: [0,0,1,0]
            - point: [1,-1]
              charge: [0,0,1,0]
            - point: [-1,-1]
              charge: [0,0,1,0]
            - point: [2,0]
              charge: [0,1,0,0]
            - point: [-2,0]
              charge: [0,1,0,0]
            - point: [0,2]
              charge: [0,1,0,0]
            - point: [0,-2]
              charge: [0,1,0,0]
      count: 30
"""

swathScenario :: String 
swathScenario = """board:
    width: 15
    height: 15
distribution:
    - mine: largeMine 
      count: 30
"""

swathThreeColorScenario :: String
swathThreeColorScenario = """board:
    width: 15
    height: 15
distribution:
    - mine: largeRedMine 
      count: 15
    - mine: largeGreenMine 
      count: 15
    - mine: largeBlueMine
      count: 15
"""