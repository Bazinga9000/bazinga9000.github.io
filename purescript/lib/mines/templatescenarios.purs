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