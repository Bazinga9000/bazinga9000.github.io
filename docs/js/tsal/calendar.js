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
    // skip month 0 if we're in a white year, so we don't add an extra 40 days
    // (this doesn't need to be adjusted for black years since the skipped month is 17, at the end)
    let starting_month = 0;
    if (YEARS[this.year % 203] == W) {
      starting_month = 1;
    }
    for (var i = starting_month; i < this.month; i++) {
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

  format(base) {
    var conv = function (n) {
      if (base == 12) {
        return n.toString(12).replaceAll("a", "↊").replaceAll("b", "↋");
      } else {
        return n.toString();
      }
    };
    return `${conv(this.day + 1)} ${MONTH_NAMES[this.month]}ğus ${conv(this.year)} ${conv(this.lhig)}:${conv(this.osho)}:${conv(Math.floor(this.dzaosho))}`;
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

const YEAR_LENGTHS = [711 - 40, 711 - 39, 711];

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
  let base = document.querySelector('input[name="base"]:checked').value;
  document.getElementById("clock").innerText = tst.format(base);
}

function convert_earth_tsal() {
  let earth_d = document.getElementById("earthtsalinput").value;
  let earth_d_tsal = TsalDateTime.fromEarthTime(DateTime.fromISO(earth_d));
  let base = document.querySelector('input[name="base"]:checked').value;
  document.getElementById("earthtsal").innerText = earth_d_tsal.format(base);
}

function update_tsal_selectors() {
  let year_sel = document.getElementById("tsalyearinput");
  let month_sel = document.getElementById("tsalmonthinput");
  let day_sel = document.getElementById("tsaldayinput");
  let lhig_sel = document.getElementById("tsallhiginput");
  let osho_sel = document.getElementById("tsaloshoinput");
  let dzaosho_sel = document.getElementById("tsaldzaoshoinput");

  // get the selected month for later
  let set_month = month_sel.value;

  // fix the day selector if we go from a 40 month to a 39 month
  day_sel.max = MONTH_LENGTHS[set_month];
  if (day_sel.value > day_sel.max) {
    day_sel.value = day_sel.max;
  }

  // set up the month selector to account for which type of year we're in
  month_sel.innerHTML = "";
  let year_type = YEARS[year_sel.value % 203];
  console.log(year_type, year_sel.value);

  for (let n = 0; n < 18; n++) {
    if (
      (n == 0 && year_type != W) ||
      (n == 17 && year_type != B) ||
      (n > 0 && n < 17)
    ) {
      let opt = document.createElement("option");
      opt.value = n;
      opt.innerHTML = `${MONTH_NAMES[n]}ğus`;
      month_sel.appendChild(opt);
    }
  }

  // fix the month selector so as not to reset it
  if (set_month == 0 && year_type == W) {
    month_sel.value = 1;
  } else if (set_month == 17 && year_type == B) {
    month_sel.value = 16;
  } else {
    month_sel.value = set_month;
  }

  // now perform the actual date conversion
  let tsal_date = TsalDateTime.fromObject({
    year: parseInt(year_sel.value),
    month: parseInt(month_sel.value),
    day: parseInt(day_sel.value) - 1, // anti-oboe
    lhig: parseInt(lhig_sel.value),
    osho: parseInt(osho_sel.value),
    dzaosho: parseInt(dzaosho_sel.value),
  });

  document.getElementById("tsalearth").innerHTML =
    tsal_date.earthTime.toLocaleString({
      ...luxon.DateTime.DATETIME_FULL_WITH_SECONDS,
      era: "short",
    });
}

setInterval(update_time, 10);
convert_earth_tsal();
update_tsal_selectors();
document.getElementById("tsalmonthinput").value = 2;
