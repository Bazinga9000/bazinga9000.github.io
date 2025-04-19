const argamAlphabet = String.fromCharCode(
  ...Array.from({ length: 720 }, (_, i) => 0xe000 + i),
);

BigNumber.config({ ALPHABET: argamAlphabet });

const digitNames =
  "zero one two three four five six seven eight nine dess ell zen thise zeff trick tess zote dine ax score tress dell flore cadex quint dithe trine caven neve kinex sode twive trell dote kineff exent mack dax trithe kinoct lume exeff sill cadell kinove diore foss exoct effent kiness trote cadithe sull exove kinell sevoct trax deve clore shock ark disode senove twex kinithe exell kale cazote triore sevess calse octove scand dimack kinchick catax sevell exithe tite kintess novent dilume van sezzen kinote dill treve octell crome novess sevithe cadore trisode doss kinax ozzen mang seneff novell kent ferr exote cobe octithe setrick disull nick catrine cupe desell trimack setess zinn exax kinore caneve novithe diclore sevote hund ellent diark trilume casode kincue disenove gall tweven trisill desithe gerr ellzen sevax dikale kintrine octote arsen exore selene dezeff tross dalse ellithe zenent kineve discand sentress camack brome exquint krypt octax novote ellzeff kinsode zenithe rube dite trisull kintwive seflore extrine stron calume trikinell divan yttr zenzeff thisent dessote novax casill zirc exeve sequint elltess triclore dicrome niobe zenchick molyb thizeff triark offlore kinmack exsode ellote cafoss setrine dessax technes zentess ruthe dimang trickithe zeffent rhode elldine pallade descore trikale diferr seneve zenote kinlume dicobe noveflore thitess ellax kinexeff argene cadsull trialse dinick kinsill excue sesode dicupe triscand cadkinell thiote exmack cadme setwive trickent dinn inde zenax stann desore trisevell octeve stibbe thidine kinoss caclore trite zeffote tellure trikintess iode elldell novetrine cadark effinkin exume thiax octsode trivan desquint xeen exineff ellore digall trickote tweight caese exill semack cadkinithe noneve digerr bare cadexell kinsull zeffax tricrome cakale lanthe destrine cere tessote trisevithe diarsen ellquint zenore prase diselene novesode kinsevoct neo exfoss prome cacalse trikinax thidell selume novetwive zotent desneve trimang cascand samare effinex kinclore octmack elltrine dibrome thiore zenquint sesill dikrypt triferr tessax kinark dinovote europ cadsevell tricobe desode gadole cadexithe terbe dirube kinsenove catite dyss exsull ellneve kintwex trinick zefflore zotax dinent thiquint distron tricupe octlume sefoss kinexell holme cadvan novemack ditt kinkale testress erbe thidithe trinn cadkinote ellsode dinovax effcue octsill trikinore dirc thume zeneve ytterb kinsevess thitrine elltwive lute exclore kincalse cacrome trisevote diobe hafne kinoctove axent dimolyb elltrell cadsevithe kinscand exark tante tessore novelume desmack sesull zensode wolfre dellote chickquint octfoss thineve zeftrine rhene cadkinax trigall ditechnes osme tritweven kinsevell diruthe novesill camang iride kinexithe zotore effinoct trigerr dirhode kintite exinell platt dipallade trisevax scorent aure exkale thisode caferr novinkin zeffneve ellmack cadexote hyde deslume triarsen cacobe seclore dinoveflore kinvan thitwive triselene axdell thule kinsezzen plumb diargene novefoss octsull zotquint exalse sevark canick thitrell dessill biss testrine polone zeffsode trikineve cacupe axore exscand aste kinoctell tressent thidote nite zenmack kincrome dicadme tribrome setwex fran kinovess ellume cazinn trikrypt dyinde kinsevithe cadexax rade distann zotrine cadkinore acte exsevell thor tesseve trikinsode distibbe prote exinithe sekale desfoss trirube octclore ellsill extite axquint cadsevote novesull ditellure urane kinozzen thimack dyiode triseflore dellent kinmang dinovetrine nept octark tristron effiness plute zenlume zoteve thidax kinovell tessode sevalse exvan merr desinkin [501] [502] [503] [504] [505] [506] [507] [508] [509] [510] [511] [512] [513] [514] [515] [516] [517] [518] [519] [520] [521] [522] [523] [524] [525] [526] [527] [528] [529] [530] [531] [532] [533] [534] [535] [536] [537] [538] [539] [540] [541] [542] [543] [544] [545] [546] [547] [548] [549] [550] [551] [552] [553] [554] [555] [556] [557] [558] [559] [560] [561] [562] [563] [564] [565] [566] [567] [568] [569] [570] [571] [572] [573] [574] [575] [576] [577] [578] [579] [580] [581] [582] [583] [584] [585] [586] [587] [588] [589] [590] [591] [592] [593] [594] [595] [596] [597] [598] [599] [600] [601] [602] [603] [604] [605] [606] [607] [608] [609] [610] [611] [612] [613] [614] [615] [616] [617] [618] [619] [620] [621] [622] [623] [624] [625] [626] [627] [628] [629] [630] [631] [632] [633] [634] [635] [636] [637] [638] [639] [640] [641] [642] [643] [644] [645] [646] [647] [648] [649] [650] [651] [652] [653] [654] [655] [656] [657] [658] [659] [660] [661] [662] [663] [664] [665] [666] [667] [668] [669] [670] [671] [672] [673] [674] [675] [676] [677] [678] [679] [680] [681] [682] [683] [684] [685] [686] [687] [688] [689] [690] [691] [692] [693] [694] [695] [696] [697] [698] [699] [700] [701] [702] [703] [704] [705] [706] [707] [708] [709] [710] [711] [712] [713] [714] [715] [716] [717] [718] [719] [720]".split(
    " ",
  );

console.log(digitNames.length);

const suffixes = ["", "ta", "un", "zand", "myr", "lak", "cro", "so"];

for (let i = suffixes.length; i < digitNames.length; i++) {
  suffixes.push("-" + parse_suffix(digitNames[i].toLowerCase(), "pow"));
}

function parse_suffix(name, suffix) {
  if (suffix == "") return name;
  const consonants = "bcdfghjklmnpqrstvwxyz";
  const vowels = "aeiou";
  while (name[name.length - 1] == name[name.length - 2]) {
    name = name.slice(0, -1);
  }

  while (name[name.length - 1] == suffix[0]) {
    suffix = suffix.substring(1);
  }
  return name + suffix;
}

function getCSSClass(num, base) {
  const n = new BigNumber(num);
  if (n.isNaN()) {
    return "error";
  }

  return "argam";
}

function toTitleCase(str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

function toArgamString(num, base) {
  const n = new BigNumber(num);
  if (n.isFinite()) {
    return n.toString(base);
  }

  if (n.isNaN()) {
    return "NaN";
  }

  return n.isPositive() ? "∞" : "-∞";
}

function toArgamName(num, base) {
  const val = new BigNumber(num);
  if (val.isNaN()) {
    return "Not a Number";
  }
  let numberString = val.toString(base);
  let name = "";
  if (numberString[0] == "-") {
    name += "Negative ";
    numberString = numberString.substring(1);
  }

  let decimalPointLocation = numberString.indexOf(".");
  const hasDecimal = decimalPointLocation != -1;
  if (decimalPointLocation == -1) {
    decimalPointLocation = numberString.length;
  }

  const getSuffix = (x) => (x < suffixes.length ? suffixes[x] : "(" + x + ")");

  for (let i = 0; i < numberString.length; i++) {
    let index;
    if (i < decimalPointLocation) {
      index = decimalPointLocation - i - 1;
    } else if (i > decimalPointLocation) {
      index = numberString.length - 1 - i;
    } else {
      name += " and ";
      continue;
    }

    if (numberString[i] == "0" && numberString != "0" && !hasDecimal) {
      continue;
    }

    const suffix = getSuffix(index);

    const n = digitNames[argamAlphabet.indexOf(numberString[i])];
    name += parse_suffix(n, suffix) + " ";
  }

  const trailingDecimalDigitCount = numberString.length - decimalPointLocation;
  if (trailingDecimalDigitCount != 0) {
    name += " in ";
    const suffix = getSuffix(trailingDecimalDigitCount - 1);
    name += parse_suffix("One", suffix) + " ";
  }

  return toTitleCase(name.slice(0, -1));
}
