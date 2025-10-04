// Q: why didn't you write this in purescript?
// A: purescript's datetime libraries are woefully inadequate compared to raw JS, which has luxon

DateTime = luxon.DateTime;

class TsalDateTime {
  constructor(obj) {
    this.year = obj.year;
    this.month = obj.month;
    this.day = obj.day;
    this.lhig = obj.lhig; // 2h43m (1/12 day)
    this.osho = obj.osho; // 1.1 minutes (1/12^3 day)
    this.dzaosho = obj.dzaosho; // 470 ms (1/12^5 day)
  }

  static fromObject(obj) {
    return new TsalDateTime(obj);
  }

  static fromDays(tsal_days) {
    var days_left = tsal_days;

    var num_cycles = Math.floor(days_left / BIG_CYCLE_LENGTH);
    var year = 203 * num_cycles;
    days_left -= BIG_CYCLE_LENGTH * num_cycles;

    var i = 0;
    while (days_left > YEAR_LENGTHS[YEARS[i]]) {
      days_left -= YEAR_LENGTHS[YEARS[i]];
      i += 1;
      year += 1;
    }

    var month = 0;
    while (days_left > MONTH_LENGTHS[month]) {
      days_left -= MONTH_LENGTHS[month];
      month += 1;
    }

    var day = Math.floor(days_left);
    days_left -= day;

    days_left *= 12;
    var lhig = Math.floor(days_left);
    days_left -= lhig;

    days_left *= 12 * 12;
    var osho = Math.floor(days_left);
    days_left -= osho;

    days_left *= 12 * 12;
    var dzaosho = days_left;

    return TsalDateTime.fromObject({
      year: year,
      month: month,
      day: day,
      lhig: lhig,
      osho: osho,
      dzaosho: dzaosho,
    });
  }

  static fromEarthTime(t) {
    var earth_days = t.diff(EARTH_EPOCH, "days").days;
    var tsal_days_delta = earth_days / TSAL_EARTH_RATIO;
    var tsal_days = TSAL_EPOCH_DAYS + tsal_days_delta;
    return TsalDateTime.fromDays(tsal_days);
  }

  get earthTime() {
    var tsal_days = this.days - TSAL_EPOCH_DAYS;
    var earth_days_delta = tsal_days * TSAL_EARTH_RATIO;
    return EARTH_EPOCH.plus({ days: earth_days_delta });
  }

  get days() {
    var out = 0;

    // add in the 203 cycles
    out += BIG_CYCLE_LENGTH * Math.floor(this.year / 203);

    // add in the completed years in the current 203 cycles
    for (var i = 0; i < this.year % 203; i++) {
      out += YEAR_LENGTHS[YEARS[i]];
    }

    // add in the completed months in the current year
    for (var i = 0; i < this.month; i++) {
      out += MONTH_LENGTHS[i];
    }

    // add in the number of completed days
    out += this.day;

    // add in the rest
    out += this.lhig / 12;
    out += this.osho / 12 ** 3;
    out += this.dzaosho / 12 ** 5;

    return out;
  }

  toString() {
    return `${this.day + 1} ${MONTH_NAMES[this.month]}ğus ${this.year} ${this.lhig}:${this.osho}:${Math.floor(this.dzaosho)}`;
  }
}

// epochs
const EARTH_EPOCH = DateTime.fromISO("2022-07-08T20:09:12.046Z");

const TSAL_EPOCH = TsalDateTime.fromObject({
  year: parseInt("3600", 12),
  month: 2,
  day: 36,
  lhig: 3,
  osho: 9,
  dzaosho: 127,
});

// how long a tsal day is compared to an earth day
const TSAL_EARTH_RATIO = 32.603 / 24.0;

// year types
const W = 0; // white year
const B = 1; // black year
const G = 2; // gray year

// the year cycle
const YEARS = (function () {
  var whiteCycle = [G, G, G, G, G, G, W];
  var blackCycle = [G, G, G, G, G, G, G, B];
  var S = blackCycle;
  var L = [whiteCycle, blackCycle].flat();
  return [L, L, L, L, L, L, L, L, L, L, L, L, L, S].flat();
})();

const YEAR_LENGTHS = [711, 711 - 40, 711 - 39];

const MONTH_LENGTHS = [
  40, 39, 40, 39, 40, 39, 40, 39, 40, 39, 40, 39, 40, 39, 40, 39, 40, 39,
];

const BIG_CYCLE_LENGTH = YEARS.reduce((a, b) => a + YEAR_LENGTHS[b], 0);

const MONTH_NAMES = [
  "Qu",
  "Masi",
  "Lēmot",
  "Jiğeu",
  "Xyereł",
  "Itsō",
  "Žamje",
  "Bežuč",
  "Buxwil",
  "Ludim",
  "Žyis",
  "Myoge",
  "Oxlo",
  "Okšokus",
  "Epyi",
  "Tsyak",
  "Qucno",
  "Roc",
];

const TSAL_EPOCH_DAYS = TSAL_EPOCH.days;

function update_time() {
  const tst = TsalDateTime.fromEarthTime(DateTime.now());
  document.getElementById("clock").innerText = tst.toString();
}

function convert() {
  let earth_d = document.getElementById("earthtsalinput").value;
  let earth_d_tsal = TsalDateTime.fromEarthTime(DateTime.fromISO(earth_d));
  document.getElementById("earthtsal").innerText = earth_d_tsal.toString();
}
setInterval(update_time, 10);
convert();
