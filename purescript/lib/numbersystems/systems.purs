module NumberSystems.Systems where

import Prelude
import NumberSystems.NumberSystem
import NumberSystems.Names
import Data.String.Utils
import Data.Tuple

argam :: NumberSystem
argam =
  MkNumberSystem
    { name: "Argam"
    , digitNames: n
    , digitSuffixes: [ "", "ta", "un", "zand", "" ] <> map (\x -> "-" <> x) (makeSuffixesFromDigits n "lion")
    --, fonts: [ Tuple "florence" m ]
    , maxBase: m
    , alphabet: makePUAAlphabet 0xE000 m
    }
  where
  n = words "zero one two three four five six seven eight nine dess ell zen thise zeff trick tess zote dine ax score tress dell flore cadex quint dithe trine caven neve kinex sode twive trell dote kineff exent mack dax trithe kinoct lume exeff sill cadell kinove diore foss exoct effent kiness trote cadithe sull exove kinell sevoct trax deve clore shock ark disode senove twex kinithe exell kale cazote triore sevess calse octove scand dimack kinchick catax sevell exithe tite kintess novent dilume van sezzen kinote dill treve octell crome novess sevithe cadore trisode doss kinax ozzen mang seneff novell kent ferr exote cobe octithe setrick disull nick catrine cupe desell trimack setess zinn exax kinore caneve novithe diclore sevote hund ellent diark trilume casode kincue disenove gall tweven trisill desithe gerr ellzen sevax dikale kintrine octote arsen exore selene dezeff tross dalse ellithe zenent kineve discand sentress camack brome exquint krypt octax novote ellzeff kinsode zenithe rube dite trisull kintwive seflore extrine stron calume trikinell divan yttr zenzeff thisent dessote novax casill zirc exeve sequint elltess triclore dicrome niobe zenchick molyb thizeff triark offlore kinmack exsode ellote cafoss setrine dessax technes zentess ruthe dimang trickithe zeffent rhode elldine pallade descore trikale diferr seneve zenote kinlume dicobe noveflore thitess ellax kinexeff argene cadsull trialse dinick kinsill excue sesode dicupe triscand cadkinell thiote exmack cadme setwive trickent dinn inde zenax stann desore trisevell octeve stibbe thidine kinoss caclore trite zeffote tellure trikintess iode elldell novetrine cadark effinkin exume thiax octsode trivan desquint xeen exineff ellore digall trickote tweight caese exill semack cadkinithe noneve digerr bare cadexell kinsull zeffax tricrome cakale lanthe destrine cere tessote trisevithe diarsen ellquint zenore prase diselene novesode kinsevoct neo exfoss prome cacalse trikinax thidell selume novetwive zotent desneve trimang cascand samare effinex kinclore octmack elltrine dibrome thiore zenquint sesill dikrypt triferr tessax kinark dinovote europ cadsevell tricobe desode gadole cadexithe terbe dirube kinsenove catite dyss exsull ellneve kintwex trinick zefflore zotax dinent thiquint distron tricupe octlume sefoss kinexell holme cadvan novemack ditt kinkale testress erbe thidithe trinn cadkinote ellsode dinovax effcue octsill trikinore dirc thume zeneve ytterb kinsevess thitrine elltwive lute exclore kincalse cacrome trisevote diobe hafne kinoctove axent dimolyb elltrell cadsevithe kinscand exark tante tessore novelume desmack sesull zensode wolfre dellote chickquint octfoss thineve zeftrine rhene cadkinax trigall ditechnes osme tritweven kinsevell diruthe novesill camang iride kinexithe zotore effinoct trigerr dirhode kintite exinell platt dipallade trisevax scorent aure exkale thisode caferr novinkin zeffneve ellmack cadexote hyde deslume triarsen cacobe seclore dinoveflore kinvan thitwive triselene axdell thule kinsezzen plumb diargene novefoss octsull zotquint exalse sevark canick thitrell dessill biss testrine polone zeffsode trikineve cacupe axore exscand aste kinoctell tressent thidote nite zenmack kincrome dicadme tribrome setwex fran kinovess ellume cazinn trikrypt dyinde kinsevithe cadexax rade distann zotrine cadkinore acte exsevell thor tesseve trikinsode distibbe prote exinithe sekale desfoss trirube octclore ellsill extite axquint cadsevote novesull ditellure urane kinozzen thimack dyiode triseflore dellent kinmang dinovetrine nept octark tristron"

  m = 480

computerese :: NumberSystem
computerese =
  MkNumberSystem
    { name: "Computerese"
    , digitNames: n
    , digitSuffixes: [ "" ]
    , maxBase: 36
    , alphabet: n
    }
  where
  n = words "0 1 2 3 4 5 6 7 8 9 A B C D E F G H I J K L M N O P Q R S T U V W X Y Z"
