const argamAlphabet = String.fromCharCode(...Array.from({length: 490}, (_, i) => 0xE000 + i));

BigNumber.config({ ALPHABET: argamAlphabet });

const digitNames = "zero one two three four five six seven eight nine dess ell zen thise zeff trick tess zote dine ax score tress dell flore cadex quint dithe trine caven neve kinex sode twive trell dote kineff exent mack dax trithe kinoct lume exeff sill cadell kinove diore foss exoct effent kiness trote cadithe sull exove kinell sevoct trax deve clore shock ark disode senove twex kinithe exell kale cazote triore sevess calse octove scand dimack kinchick catax sevell exithe tite kintess novent dilume van sezzen kinote dill treve octell crome novess sevithe cadore trisode doss kinax ozzen mang seneff novell kent ferr exote cobe octithe setrick disull nick catrine cupe desell trimack setess zinn exax kinore caneve novithe diclore sevote hund ellent diark trilume casode kincue disenove gall tweven trisill desithe gerr ellzen sevax dikale kintrine octote arsen exore selene dezeff tross dalse ellithe zenent kineve discand sentress camack brome exquint krypt octax novote ellzeff kinsode zenithe rube dite trisull kintwive seflore extrine stron calume trikinell divan yttr zenzeff thisent dessote novax casill zirc exeve sequint elltess triclore dicrome niobe zenchick molyb thizeff triark offlore kinmack exsode ellote cafoss setrine dessax technes zentess ruthe dimang trickithe zeffent rhode elldine pallade descore trikale diferr seneve zenote kinlume dicobe noveflore thitess ellax kinexeff argene cadsull trialse dinick kinsill excue sesode dicupe triscand cadkinell thiote exmack cadme setwive trickent dinn inde zenax stann desore trisevell octeve stibbe thidine kinoss caclore trite zeffote tellure trikintess iode elldell novetrine cadark effinkin exume thiax octsode trivan desquint xeen exineff ellore digall trickote tweight caese exill semack cadkinithe noneve digerr bare cadexell kinsull zeffax tricrome cakale lanthe destrine cere tessote trisevithe diarsen ellquint zenore prase diselene novesode kinsevoct neo exfoss prome cacalse trikinax thidell selume novetwive zotent desneve trimang cascand samare effinex kinclore octmack elltrine dibrome thiore zenquint sesill dikrypt triferr tessax kinark dinovote europ cadsevell tricobe desode gadole cadexithe terbe dirube kinsenove catite dyss exsull ellneve kintwex trinick zefflore zotax dinent thiquint distron tricupe octlume sefoss kinexell holme cadvan novemack ditt kinkale testress erbe thidithe trinn cadkinote ellsode dinovax effcue octsill trikinore dirc thume zeneve ytterb kinsevess thitrine elltwive lute exclore kincalse cacrome trisevote diobe hafne kinoctove axent dimolyb elltrell cadsevithe kinscand exark tante tessore novelume desmack sesull zensode wolfre dellote chickquint octfoss thineve zeftrine rhene cadkinax trigall ditechnes osme tritweven kinsevell diruthe novesill camang iride kinexithe zotore effinoct trigerr dirhode kintite exinell platt dipallade trisevax scorent aure exkale thisode caferr novinkin zeffneve ellmack cadexote hyde deslume triarsen cacobe seclore dinoveflore kinvan thitwive triselene axdell thule kinsezzen plumb diargene novefoss octsull zotquint exalse sevark canick thitrell dessill biss testrine polone zeffsode trikineve cacupe axore exscand aste kinoctell tressent thidote nite zenmack kincrome dicadme tribrome setwex fran kinovess ellume cazinn trikrypt dyinde kinsevithe cadexax rade distann zotrine cadkinore acte exsevell thor tesseve trikinsode distibbe prote exinithe sekale desfoss trirube octclore ellsill extite axquint cadsevote novesull ditellure urane kinozzen thimack dyiode triseflore dellent kinmang dinovetrine nept octark tristron".split(" ");

console.log(digitNames.length);

const suffixes = [
    '', 'ta', 'un', 'zand', 'myr', 'lak', 'cro'
];

for (let i = suffixes.length; i < digitNames.length; i++) {
    suffixes.push('-' + parse_suffix(digitNames[i].toLowerCase(), 'pow'));
}

function parse_suffix(name, suffix) {
    if (suffix == '') return name;
    const consonants = 'bcdfghjklmnpqrstvwxyz';
    const vowels = 'aeiou';
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
        return 'error';
    }

    if (!n.isFinite() || base <= 62) {
        return 'argam';
    }

    return 'argam-large';
}

function toTitleCase(str) {
    return str.replace(
      /\w\S*/g,
      function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );
  }

function toArgamString(num, base) {
    const n = new BigNumber(num);
    if (n.isFinite()) {
        return n.toString(base);
    }

    if (n.isNaN()) {
        return 'NaN';
    }

    return (n.isPositive() ? '∞' : '-∞');
}

function toArgamName(num, base) {
    const val = new BigNumber(num);
    if (val.isNaN()) {
        return 'Not a Number';
    }
    let numberString = val.toString(base);
    let name = '';
    if (numberString[0] == '-') {
        name += 'Negative ';
        numberString = numberString.substring(1);
    }

    let decimalPointLocation = numberString.indexOf('.');
    const hasDecimal = (decimalPointLocation != -1);
    if (decimalPointLocation == -1) {
        decimalPointLocation = numberString.length;
    }

    const getSuffix = (x) => (x < suffixes.length ? suffixes[x] : '(' + x + ')');

    for (let i = 0; i < numberString.length; i++) {
        let index;
        if (i < decimalPointLocation) {
            index = decimalPointLocation - i - 1;
        } else if (i > decimalPointLocation) {
            index = numberString.length - 1 - i;
        } else {
            name += ' and ';
            continue;
        }

        if (numberString[i] == '0' && numberString != '0' && !hasDecimal) {
            continue;
        }

        const suffix = getSuffix(index);

        const n = digitNames[argamAlphabet.indexOf(numberString[i])];
        name += parse_suffix(n, suffix) + ' ';
    }

    const trailingDecimalDigitCount = numberString.length - decimalPointLocation;
    if (trailingDecimalDigitCount != 0) {
        name += ' in ';
        const suffix = getSuffix(trailingDecimalDigitCount - 1);
        name += parse_suffix('One', suffix) + ' ';
    }

    return toTitleCase(name.slice(0, -1));
}
