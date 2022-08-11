(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod2) => function __require() {
    return mod2 || (0, cb[__getOwnPropNames(cb)[0]])((mod2 = { exports: {} }).exports, mod2), mod2.exports;
  };
  var __copyProps = (to, from2, except, desc) => {
    if (from2 && typeof from2 === "object" || typeof from2 === "function") {
      for (let key of __getOwnPropNames(from2))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from2[key], enumerable: !(desc = __getOwnPropDesc(from2, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod2, isNodeMode, target) => (target = mod2 != null ? __create(__getProtoOf(mod2)) : {}, __copyProps(isNodeMode || !mod2 || !mod2.__esModule ? __defProp(target, "default", { value: mod2, enumerable: true }) : target, mod2));

  // ../node_modules/decimal.js/decimal.js
  var require_decimal = __commonJS({
    "../node_modules/decimal.js/decimal.js"(exports, module) {
      (function(globalScope) {
        "use strict";
        var EXP_LIMIT = 9e15, MAX_DIGITS = 1e9, NUMERALS = "0123456789abcdef", LN10 = "2.3025850929940456840179914546843642076011014886287729760333279009675726096773524802359972050895982983419677840422862486334095254650828067566662873690987816894829072083255546808437998948262331985283935053089653777326288461633662222876982198867465436674744042432743651550489343149393914796194044002221051017141748003688084012647080685567743216228355220114804663715659121373450747856947683463616792101806445070648000277502684916746550586856935673420670581136429224554405758925724208241314695689016758940256776311356919292033376587141660230105703089634572075440370847469940168269282808481184289314848524948644871927809676271275775397027668605952496716674183485704422507197965004714951050492214776567636938662976979522110718264549734772662425709429322582798502585509785265383207606726317164309505995087807523710333101197857547331541421808427543863591778117054309827482385045648019095610299291824318237525357709750539565187697510374970888692180205189339507238539205144634197265287286965110862571492198849978748873771345686209167058", PI = "3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132823066470938446095505822317253594081284811174502841027019385211055596446229489549303819644288109756659334461284756482337867831652712019091456485669234603486104543266482133936072602491412737245870066063155881748815209209628292540917153643678925903600113305305488204665213841469519415116094330572703657595919530921861173819326117931051185480744623799627495673518857527248912279381830119491298336733624406566430860213949463952247371907021798609437027705392171762931767523846748184676694051320005681271452635608277857713427577896091736371787214684409012249534301465495853710507922796892589235420199561121290219608640344181598136297747713099605187072113499999983729780499510597317328160963185950244594553469083026425223082533446850352619311881710100031378387528865875332083814206171776691473035982534904287554687311595628638823537875937519577818577805321712268066130019278766111959092164201989380952572010654858632789", DEFAULTS = {
          precision: 20,
          rounding: 4,
          modulo: 1,
          toExpNeg: -7,
          toExpPos: 21,
          minE: -EXP_LIMIT,
          maxE: EXP_LIMIT,
          crypto: false
        }, Decimal3, inexact, noConflict, quadrant, external = true, decimalError = "[DecimalError] ", invalidArgument = decimalError + "Invalid argument: ", precisionLimitExceeded = decimalError + "Precision limit exceeded", cryptoUnavailable = decimalError + "crypto unavailable", tag = "[object Decimal]", mathfloor = Math.floor, mathpow = Math.pow, isBinary = /^0b([01]+(\.[01]*)?|\.[01]+)(p[+-]?\d+)?$/i, isHex = /^0x([0-9a-f]+(\.[0-9a-f]*)?|\.[0-9a-f]+)(p[+-]?\d+)?$/i, isOctal = /^0o([0-7]+(\.[0-7]*)?|\.[0-7]+)(p[+-]?\d+)?$/i, isDecimal = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i, BASE = 1e7, LOG_BASE = 7, MAX_SAFE_INTEGER = 9007199254740991, LN10_PRECISION = LN10.length - 1, PI_PRECISION = PI.length - 1, P = { toStringTag: tag };
        P.absoluteValue = P.abs = function() {
          var x = new this.constructor(this);
          if (x.s < 0)
            x.s = 1;
          return finalise(x);
        };
        P.ceil = function() {
          return finalise(new this.constructor(this), this.e + 1, 2);
        };
        P.clampedTo = P.clamp = function(min5, max5) {
          var k, x = this, Ctor = x.constructor;
          min5 = new Ctor(min5);
          max5 = new Ctor(max5);
          if (!min5.s || !max5.s)
            return new Ctor(NaN);
          if (min5.gt(max5))
            throw Error(invalidArgument + max5);
          k = x.cmp(min5);
          return k < 0 ? min5 : x.cmp(max5) > 0 ? max5 : new Ctor(x);
        };
        P.comparedTo = P.cmp = function(y) {
          var i, j, xdL, ydL, x = this, xd = x.d, yd = (y = new x.constructor(y)).d, xs = x.s, ys = y.s;
          if (!xd || !yd) {
            return !xs || !ys ? NaN : xs !== ys ? xs : xd === yd ? 0 : !xd ^ xs < 0 ? 1 : -1;
          }
          if (!xd[0] || !yd[0])
            return xd[0] ? xs : yd[0] ? -ys : 0;
          if (xs !== ys)
            return xs;
          if (x.e !== y.e)
            return x.e > y.e ^ xs < 0 ? 1 : -1;
          xdL = xd.length;
          ydL = yd.length;
          for (i = 0, j = xdL < ydL ? xdL : ydL; i < j; ++i) {
            if (xd[i] !== yd[i])
              return xd[i] > yd[i] ^ xs < 0 ? 1 : -1;
          }
          return xdL === ydL ? 0 : xdL > ydL ^ xs < 0 ? 1 : -1;
        };
        P.cosine = P.cos = function() {
          var pr, rm, x = this, Ctor = x.constructor;
          if (!x.d)
            return new Ctor(NaN);
          if (!x.d[0])
            return new Ctor(1);
          pr = Ctor.precision;
          rm = Ctor.rounding;
          Ctor.precision = pr + Math.max(x.e, x.sd()) + LOG_BASE;
          Ctor.rounding = 1;
          x = cosine(Ctor, toLessThanHalfPi(Ctor, x));
          Ctor.precision = pr;
          Ctor.rounding = rm;
          return finalise(quadrant == 2 || quadrant == 3 ? x.neg() : x, pr, rm, true);
        };
        P.cubeRoot = P.cbrt = function() {
          var e2, m, n, r, rep, s, sd, t, t3, t3plusx, x = this, Ctor = x.constructor;
          if (!x.isFinite() || x.isZero())
            return new Ctor(x);
          external = false;
          s = x.s * mathpow(x.s * x, 1 / 3);
          if (!s || Math.abs(s) == 1 / 0) {
            n = digitsToString(x.d);
            e2 = x.e;
            if (s = (e2 - n.length + 1) % 3)
              n += s == 1 || s == -2 ? "0" : "00";
            s = mathpow(n, 1 / 3);
            e2 = mathfloor((e2 + 1) / 3) - (e2 % 3 == (e2 < 0 ? -1 : 2));
            if (s == 1 / 0) {
              n = "5e" + e2;
            } else {
              n = s.toExponential();
              n = n.slice(0, n.indexOf("e") + 1) + e2;
            }
            r = new Ctor(n);
            r.s = x.s;
          } else {
            r = new Ctor(s.toString());
          }
          sd = (e2 = Ctor.precision) + 3;
          for (; ; ) {
            t = r;
            t3 = t.times(t).times(t);
            t3plusx = t3.plus(x);
            r = divide(t3plusx.plus(x).times(t), t3plusx.plus(t3), sd + 2, 1);
            if (digitsToString(t.d).slice(0, sd) === (n = digitsToString(r.d)).slice(0, sd)) {
              n = n.slice(sd - 3, sd + 1);
              if (n == "9999" || !rep && n == "4999") {
                if (!rep) {
                  finalise(t, e2 + 1, 0);
                  if (t.times(t).times(t).eq(x)) {
                    r = t;
                    break;
                  }
                }
                sd += 4;
                rep = 1;
              } else {
                if (!+n || !+n.slice(1) && n.charAt(0) == "5") {
                  finalise(r, e2 + 1, 1);
                  m = !r.times(r).times(r).eq(x);
                }
                break;
              }
            }
          }
          external = true;
          return finalise(r, e2, Ctor.rounding, m);
        };
        P.decimalPlaces = P.dp = function() {
          var w, d = this.d, n = NaN;
          if (d) {
            w = d.length - 1;
            n = (w - mathfloor(this.e / LOG_BASE)) * LOG_BASE;
            w = d[w];
            if (w)
              for (; w % 10 == 0; w /= 10)
                n--;
            if (n < 0)
              n = 0;
          }
          return n;
        };
        P.dividedBy = P.div = function(y) {
          return divide(this, new this.constructor(y));
        };
        P.dividedToIntegerBy = P.divToInt = function(y) {
          var x = this, Ctor = x.constructor;
          return finalise(divide(x, new Ctor(y), 0, 1, 1), Ctor.precision, Ctor.rounding);
        };
        P.equals = P.eq = function(y) {
          return this.cmp(y) === 0;
        };
        P.floor = function() {
          return finalise(new this.constructor(this), this.e + 1, 3);
        };
        P.greaterThan = P.gt = function(y) {
          return this.cmp(y) > 0;
        };
        P.greaterThanOrEqualTo = P.gte = function(y) {
          var k = this.cmp(y);
          return k == 1 || k === 0;
        };
        P.hyperbolicCosine = P.cosh = function() {
          var k, n, pr, rm, len, x = this, Ctor = x.constructor, one2 = new Ctor(1);
          if (!x.isFinite())
            return new Ctor(x.s ? 1 / 0 : NaN);
          if (x.isZero())
            return one2;
          pr = Ctor.precision;
          rm = Ctor.rounding;
          Ctor.precision = pr + Math.max(x.e, x.sd()) + 4;
          Ctor.rounding = 1;
          len = x.d.length;
          if (len < 32) {
            k = Math.ceil(len / 3);
            n = (1 / tinyPow(4, k)).toString();
          } else {
            k = 16;
            n = "2.3283064365386962890625e-10";
          }
          x = taylorSeries(Ctor, 1, x.times(n), new Ctor(1), true);
          var cosh2_x, i = k, d8 = new Ctor(8);
          for (; i--; ) {
            cosh2_x = x.times(x);
            x = one2.minus(cosh2_x.times(d8.minus(cosh2_x.times(d8))));
          }
          return finalise(x, Ctor.precision = pr, Ctor.rounding = rm, true);
        };
        P.hyperbolicSine = P.sinh = function() {
          var k, pr, rm, len, x = this, Ctor = x.constructor;
          if (!x.isFinite() || x.isZero())
            return new Ctor(x);
          pr = Ctor.precision;
          rm = Ctor.rounding;
          Ctor.precision = pr + Math.max(x.e, x.sd()) + 4;
          Ctor.rounding = 1;
          len = x.d.length;
          if (len < 3) {
            x = taylorSeries(Ctor, 2, x, x, true);
          } else {
            k = 1.4 * Math.sqrt(len);
            k = k > 16 ? 16 : k | 0;
            x = x.times(1 / tinyPow(5, k));
            x = taylorSeries(Ctor, 2, x, x, true);
            var sinh2_x, d5 = new Ctor(5), d16 = new Ctor(16), d20 = new Ctor(20);
            for (; k--; ) {
              sinh2_x = x.times(x);
              x = x.times(d5.plus(sinh2_x.times(d16.times(sinh2_x).plus(d20))));
            }
          }
          Ctor.precision = pr;
          Ctor.rounding = rm;
          return finalise(x, pr, rm, true);
        };
        P.hyperbolicTangent = P.tanh = function() {
          var pr, rm, x = this, Ctor = x.constructor;
          if (!x.isFinite())
            return new Ctor(x.s);
          if (x.isZero())
            return new Ctor(x);
          pr = Ctor.precision;
          rm = Ctor.rounding;
          Ctor.precision = pr + 7;
          Ctor.rounding = 1;
          return divide(x.sinh(), x.cosh(), Ctor.precision = pr, Ctor.rounding = rm);
        };
        P.inverseCosine = P.acos = function() {
          var halfPi, x = this, Ctor = x.constructor, k = x.abs().cmp(1), pr = Ctor.precision, rm = Ctor.rounding;
          if (k !== -1) {
            return k === 0 ? x.isNeg() ? getPi(Ctor, pr, rm) : new Ctor(0) : new Ctor(NaN);
          }
          if (x.isZero())
            return getPi(Ctor, pr + 4, rm).times(0.5);
          Ctor.precision = pr + 6;
          Ctor.rounding = 1;
          x = x.asin();
          halfPi = getPi(Ctor, pr + 4, rm).times(0.5);
          Ctor.precision = pr;
          Ctor.rounding = rm;
          return halfPi.minus(x);
        };
        P.inverseHyperbolicCosine = P.acosh = function() {
          var pr, rm, x = this, Ctor = x.constructor;
          if (x.lte(1))
            return new Ctor(x.eq(1) ? 0 : NaN);
          if (!x.isFinite())
            return new Ctor(x);
          pr = Ctor.precision;
          rm = Ctor.rounding;
          Ctor.precision = pr + Math.max(Math.abs(x.e), x.sd()) + 4;
          Ctor.rounding = 1;
          external = false;
          x = x.times(x).minus(1).sqrt().plus(x);
          external = true;
          Ctor.precision = pr;
          Ctor.rounding = rm;
          return x.ln();
        };
        P.inverseHyperbolicSine = P.asinh = function() {
          var pr, rm, x = this, Ctor = x.constructor;
          if (!x.isFinite() || x.isZero())
            return new Ctor(x);
          pr = Ctor.precision;
          rm = Ctor.rounding;
          Ctor.precision = pr + 2 * Math.max(Math.abs(x.e), x.sd()) + 6;
          Ctor.rounding = 1;
          external = false;
          x = x.times(x).plus(1).sqrt().plus(x);
          external = true;
          Ctor.precision = pr;
          Ctor.rounding = rm;
          return x.ln();
        };
        P.inverseHyperbolicTangent = P.atanh = function() {
          var pr, rm, wpr, xsd, x = this, Ctor = x.constructor;
          if (!x.isFinite())
            return new Ctor(NaN);
          if (x.e >= 0)
            return new Ctor(x.abs().eq(1) ? x.s / 0 : x.isZero() ? x : NaN);
          pr = Ctor.precision;
          rm = Ctor.rounding;
          xsd = x.sd();
          if (Math.max(xsd, pr) < 2 * -x.e - 1)
            return finalise(new Ctor(x), pr, rm, true);
          Ctor.precision = wpr = xsd - x.e;
          x = divide(x.plus(1), new Ctor(1).minus(x), wpr + pr, 1);
          Ctor.precision = pr + 4;
          Ctor.rounding = 1;
          x = x.ln();
          Ctor.precision = pr;
          Ctor.rounding = rm;
          return x.times(0.5);
        };
        P.inverseSine = P.asin = function() {
          var halfPi, k, pr, rm, x = this, Ctor = x.constructor;
          if (x.isZero())
            return new Ctor(x);
          k = x.abs().cmp(1);
          pr = Ctor.precision;
          rm = Ctor.rounding;
          if (k !== -1) {
            if (k === 0) {
              halfPi = getPi(Ctor, pr + 4, rm).times(0.5);
              halfPi.s = x.s;
              return halfPi;
            }
            return new Ctor(NaN);
          }
          Ctor.precision = pr + 6;
          Ctor.rounding = 1;
          x = x.div(new Ctor(1).minus(x.times(x)).sqrt().plus(1)).atan();
          Ctor.precision = pr;
          Ctor.rounding = rm;
          return x.times(2);
        };
        P.inverseTangent = P.atan = function() {
          var i, j, k, n, px, t, r, wpr, x2, x = this, Ctor = x.constructor, pr = Ctor.precision, rm = Ctor.rounding;
          if (!x.isFinite()) {
            if (!x.s)
              return new Ctor(NaN);
            if (pr + 4 <= PI_PRECISION) {
              r = getPi(Ctor, pr + 4, rm).times(0.5);
              r.s = x.s;
              return r;
            }
          } else if (x.isZero()) {
            return new Ctor(x);
          } else if (x.abs().eq(1) && pr + 4 <= PI_PRECISION) {
            r = getPi(Ctor, pr + 4, rm).times(0.25);
            r.s = x.s;
            return r;
          }
          Ctor.precision = wpr = pr + 10;
          Ctor.rounding = 1;
          k = Math.min(28, wpr / LOG_BASE + 2 | 0);
          for (i = k; i; --i)
            x = x.div(x.times(x).plus(1).sqrt().plus(1));
          external = false;
          j = Math.ceil(wpr / LOG_BASE);
          n = 1;
          x2 = x.times(x);
          r = new Ctor(x);
          px = x;
          for (; i !== -1; ) {
            px = px.times(x2);
            t = r.minus(px.div(n += 2));
            px = px.times(x2);
            r = t.plus(px.div(n += 2));
            if (r.d[j] !== void 0)
              for (i = j; r.d[i] === t.d[i] && i--; )
                ;
          }
          if (k)
            r = r.times(2 << k - 1);
          external = true;
          return finalise(r, Ctor.precision = pr, Ctor.rounding = rm, true);
        };
        P.isFinite = function() {
          return !!this.d;
        };
        P.isInteger = P.isInt = function() {
          return !!this.d && mathfloor(this.e / LOG_BASE) > this.d.length - 2;
        };
        P.isNaN = function() {
          return !this.s;
        };
        P.isNegative = P.isNeg = function() {
          return this.s < 0;
        };
        P.isPositive = P.isPos = function() {
          return this.s > 0;
        };
        P.isZero = function() {
          return !!this.d && this.d[0] === 0;
        };
        P.lessThan = P.lt = function(y) {
          return this.cmp(y) < 0;
        };
        P.lessThanOrEqualTo = P.lte = function(y) {
          return this.cmp(y) < 1;
        };
        P.logarithm = P.log = function(base) {
          var isBase10, d, denominator, k, inf, num, sd, r, arg = this, Ctor = arg.constructor, pr = Ctor.precision, rm = Ctor.rounding, guard2 = 5;
          if (base == null) {
            base = new Ctor(10);
            isBase10 = true;
          } else {
            base = new Ctor(base);
            d = base.d;
            if (base.s < 0 || !d || !d[0] || base.eq(1))
              return new Ctor(NaN);
            isBase10 = base.eq(10);
          }
          d = arg.d;
          if (arg.s < 0 || !d || !d[0] || arg.eq(1)) {
            return new Ctor(d && !d[0] ? -1 / 0 : arg.s != 1 ? NaN : d ? 0 : 1 / 0);
          }
          if (isBase10) {
            if (d.length > 1) {
              inf = true;
            } else {
              for (k = d[0]; k % 10 === 0; )
                k /= 10;
              inf = k !== 1;
            }
          }
          external = false;
          sd = pr + guard2;
          num = naturalLogarithm(arg, sd);
          denominator = isBase10 ? getLn10(Ctor, sd + 10) : naturalLogarithm(base, sd);
          r = divide(num, denominator, sd, 1);
          if (checkRoundingDigits(r.d, k = pr, rm)) {
            do {
              sd += 10;
              num = naturalLogarithm(arg, sd);
              denominator = isBase10 ? getLn10(Ctor, sd + 10) : naturalLogarithm(base, sd);
              r = divide(num, denominator, sd, 1);
              if (!inf) {
                if (+digitsToString(r.d).slice(k + 1, k + 15) + 1 == 1e14) {
                  r = finalise(r, pr + 1, 0);
                }
                break;
              }
            } while (checkRoundingDigits(r.d, k += 10, rm));
          }
          external = true;
          return finalise(r, pr, rm);
        };
        P.minus = P.sub = function(y) {
          var d, e2, i, j, k, len, pr, rm, xd, xe, xLTy, yd, x = this, Ctor = x.constructor;
          y = new Ctor(y);
          if (!x.d || !y.d) {
            if (!x.s || !y.s)
              y = new Ctor(NaN);
            else if (x.d)
              y.s = -y.s;
            else
              y = new Ctor(y.d || x.s !== y.s ? x : NaN);
            return y;
          }
          if (x.s != y.s) {
            y.s = -y.s;
            return x.plus(y);
          }
          xd = x.d;
          yd = y.d;
          pr = Ctor.precision;
          rm = Ctor.rounding;
          if (!xd[0] || !yd[0]) {
            if (yd[0])
              y.s = -y.s;
            else if (xd[0])
              y = new Ctor(x);
            else
              return new Ctor(rm === 3 ? -0 : 0);
            return external ? finalise(y, pr, rm) : y;
          }
          e2 = mathfloor(y.e / LOG_BASE);
          xe = mathfloor(x.e / LOG_BASE);
          xd = xd.slice();
          k = xe - e2;
          if (k) {
            xLTy = k < 0;
            if (xLTy) {
              d = xd;
              k = -k;
              len = yd.length;
            } else {
              d = yd;
              e2 = xe;
              len = xd.length;
            }
            i = Math.max(Math.ceil(pr / LOG_BASE), len) + 2;
            if (k > i) {
              k = i;
              d.length = 1;
            }
            d.reverse();
            for (i = k; i--; )
              d.push(0);
            d.reverse();
          } else {
            i = xd.length;
            len = yd.length;
            xLTy = i < len;
            if (xLTy)
              len = i;
            for (i = 0; i < len; i++) {
              if (xd[i] != yd[i]) {
                xLTy = xd[i] < yd[i];
                break;
              }
            }
            k = 0;
          }
          if (xLTy) {
            d = xd;
            xd = yd;
            yd = d;
            y.s = -y.s;
          }
          len = xd.length;
          for (i = yd.length - len; i > 0; --i)
            xd[len++] = 0;
          for (i = yd.length; i > k; ) {
            if (xd[--i] < yd[i]) {
              for (j = i; j && xd[--j] === 0; )
                xd[j] = BASE - 1;
              --xd[j];
              xd[i] += BASE;
            }
            xd[i] -= yd[i];
          }
          for (; xd[--len] === 0; )
            xd.pop();
          for (; xd[0] === 0; xd.shift())
            --e2;
          if (!xd[0])
            return new Ctor(rm === 3 ? -0 : 0);
          y.d = xd;
          y.e = getBase10Exponent(xd, e2);
          return external ? finalise(y, pr, rm) : y;
        };
        P.modulo = P.mod = function(y) {
          var q, x = this, Ctor = x.constructor;
          y = new Ctor(y);
          if (!x.d || !y.s || y.d && !y.d[0])
            return new Ctor(NaN);
          if (!y.d || x.d && !x.d[0]) {
            return finalise(new Ctor(x), Ctor.precision, Ctor.rounding);
          }
          external = false;
          if (Ctor.modulo == 9) {
            q = divide(x, y.abs(), 0, 3, 1);
            q.s *= y.s;
          } else {
            q = divide(x, y, 0, Ctor.modulo, 1);
          }
          q = q.times(y);
          external = true;
          return x.minus(q);
        };
        P.naturalExponential = P.exp = function() {
          return naturalExponential(this);
        };
        P.naturalLogarithm = P.ln = function() {
          return naturalLogarithm(this);
        };
        P.negated = P.neg = function() {
          var x = new this.constructor(this);
          x.s = -x.s;
          return finalise(x);
        };
        P.plus = P.add = function(y) {
          var carry, d, e2, i, k, len, pr, rm, xd, yd, x = this, Ctor = x.constructor;
          y = new Ctor(y);
          if (!x.d || !y.d) {
            if (!x.s || !y.s)
              y = new Ctor(NaN);
            else if (!x.d)
              y = new Ctor(y.d || x.s === y.s ? x : NaN);
            return y;
          }
          if (x.s != y.s) {
            y.s = -y.s;
            return x.minus(y);
          }
          xd = x.d;
          yd = y.d;
          pr = Ctor.precision;
          rm = Ctor.rounding;
          if (!xd[0] || !yd[0]) {
            if (!yd[0])
              y = new Ctor(x);
            return external ? finalise(y, pr, rm) : y;
          }
          k = mathfloor(x.e / LOG_BASE);
          e2 = mathfloor(y.e / LOG_BASE);
          xd = xd.slice();
          i = k - e2;
          if (i) {
            if (i < 0) {
              d = xd;
              i = -i;
              len = yd.length;
            } else {
              d = yd;
              e2 = k;
              len = xd.length;
            }
            k = Math.ceil(pr / LOG_BASE);
            len = k > len ? k + 1 : len + 1;
            if (i > len) {
              i = len;
              d.length = 1;
            }
            d.reverse();
            for (; i--; )
              d.push(0);
            d.reverse();
          }
          len = xd.length;
          i = yd.length;
          if (len - i < 0) {
            i = len;
            d = yd;
            yd = xd;
            xd = d;
          }
          for (carry = 0; i; ) {
            carry = (xd[--i] = xd[i] + yd[i] + carry) / BASE | 0;
            xd[i] %= BASE;
          }
          if (carry) {
            xd.unshift(carry);
            ++e2;
          }
          for (len = xd.length; xd[--len] == 0; )
            xd.pop();
          y.d = xd;
          y.e = getBase10Exponent(xd, e2);
          return external ? finalise(y, pr, rm) : y;
        };
        P.precision = P.sd = function(z) {
          var k, x = this;
          if (z !== void 0 && z !== !!z && z !== 1 && z !== 0)
            throw Error(invalidArgument + z);
          if (x.d) {
            k = getPrecision(x.d);
            if (z && x.e + 1 > k)
              k = x.e + 1;
          } else {
            k = NaN;
          }
          return k;
        };
        P.round = function() {
          var x = this, Ctor = x.constructor;
          return finalise(new Ctor(x), x.e + 1, Ctor.rounding);
        };
        P.sine = P.sin = function() {
          var pr, rm, x = this, Ctor = x.constructor;
          if (!x.isFinite())
            return new Ctor(NaN);
          if (x.isZero())
            return new Ctor(x);
          pr = Ctor.precision;
          rm = Ctor.rounding;
          Ctor.precision = pr + Math.max(x.e, x.sd()) + LOG_BASE;
          Ctor.rounding = 1;
          x = sine(Ctor, toLessThanHalfPi(Ctor, x));
          Ctor.precision = pr;
          Ctor.rounding = rm;
          return finalise(quadrant > 2 ? x.neg() : x, pr, rm, true);
        };
        P.squareRoot = P.sqrt = function() {
          var m, n, sd, r, rep, t, x = this, d = x.d, e2 = x.e, s = x.s, Ctor = x.constructor;
          if (s !== 1 || !d || !d[0]) {
            return new Ctor(!s || s < 0 && (!d || d[0]) ? NaN : d ? x : 1 / 0);
          }
          external = false;
          s = Math.sqrt(+x);
          if (s == 0 || s == 1 / 0) {
            n = digitsToString(d);
            if ((n.length + e2) % 2 == 0)
              n += "0";
            s = Math.sqrt(n);
            e2 = mathfloor((e2 + 1) / 2) - (e2 < 0 || e2 % 2);
            if (s == 1 / 0) {
              n = "5e" + e2;
            } else {
              n = s.toExponential();
              n = n.slice(0, n.indexOf("e") + 1) + e2;
            }
            r = new Ctor(n);
          } else {
            r = new Ctor(s.toString());
          }
          sd = (e2 = Ctor.precision) + 3;
          for (; ; ) {
            t = r;
            r = t.plus(divide(x, t, sd + 2, 1)).times(0.5);
            if (digitsToString(t.d).slice(0, sd) === (n = digitsToString(r.d)).slice(0, sd)) {
              n = n.slice(sd - 3, sd + 1);
              if (n == "9999" || !rep && n == "4999") {
                if (!rep) {
                  finalise(t, e2 + 1, 0);
                  if (t.times(t).eq(x)) {
                    r = t;
                    break;
                  }
                }
                sd += 4;
                rep = 1;
              } else {
                if (!+n || !+n.slice(1) && n.charAt(0) == "5") {
                  finalise(r, e2 + 1, 1);
                  m = !r.times(r).eq(x);
                }
                break;
              }
            }
          }
          external = true;
          return finalise(r, e2, Ctor.rounding, m);
        };
        P.tangent = P.tan = function() {
          var pr, rm, x = this, Ctor = x.constructor;
          if (!x.isFinite())
            return new Ctor(NaN);
          if (x.isZero())
            return new Ctor(x);
          pr = Ctor.precision;
          rm = Ctor.rounding;
          Ctor.precision = pr + 10;
          Ctor.rounding = 1;
          x = x.sin();
          x.s = 1;
          x = divide(x, new Ctor(1).minus(x.times(x)).sqrt(), pr + 10, 0);
          Ctor.precision = pr;
          Ctor.rounding = rm;
          return finalise(quadrant == 2 || quadrant == 4 ? x.neg() : x, pr, rm, true);
        };
        P.times = P.mul = function(y) {
          var carry, e2, i, k, r, rL, t, xdL, ydL, x = this, Ctor = x.constructor, xd = x.d, yd = (y = new Ctor(y)).d;
          y.s *= x.s;
          if (!xd || !xd[0] || !yd || !yd[0]) {
            return new Ctor(!y.s || xd && !xd[0] && !yd || yd && !yd[0] && !xd ? NaN : !xd || !yd ? y.s / 0 : y.s * 0);
          }
          e2 = mathfloor(x.e / LOG_BASE) + mathfloor(y.e / LOG_BASE);
          xdL = xd.length;
          ydL = yd.length;
          if (xdL < ydL) {
            r = xd;
            xd = yd;
            yd = r;
            rL = xdL;
            xdL = ydL;
            ydL = rL;
          }
          r = [];
          rL = xdL + ydL;
          for (i = rL; i--; )
            r.push(0);
          for (i = ydL; --i >= 0; ) {
            carry = 0;
            for (k = xdL + i; k > i; ) {
              t = r[k] + yd[i] * xd[k - i - 1] + carry;
              r[k--] = t % BASE | 0;
              carry = t / BASE | 0;
            }
            r[k] = (r[k] + carry) % BASE | 0;
          }
          for (; !r[--rL]; )
            r.pop();
          if (carry)
            ++e2;
          else
            r.shift();
          y.d = r;
          y.e = getBase10Exponent(r, e2);
          return external ? finalise(y, Ctor.precision, Ctor.rounding) : y;
        };
        P.toBinary = function(sd, rm) {
          return toStringBinary(this, 2, sd, rm);
        };
        P.toDecimalPlaces = P.toDP = function(dp, rm) {
          var x = this, Ctor = x.constructor;
          x = new Ctor(x);
          if (dp === void 0)
            return x;
          checkInt32(dp, 0, MAX_DIGITS);
          if (rm === void 0)
            rm = Ctor.rounding;
          else
            checkInt32(rm, 0, 8);
          return finalise(x, dp + x.e + 1, rm);
        };
        P.toExponential = function(dp, rm) {
          var str, x = this, Ctor = x.constructor;
          if (dp === void 0) {
            str = finiteToString(x, true);
          } else {
            checkInt32(dp, 0, MAX_DIGITS);
            if (rm === void 0)
              rm = Ctor.rounding;
            else
              checkInt32(rm, 0, 8);
            x = finalise(new Ctor(x), dp + 1, rm);
            str = finiteToString(x, true, dp + 1);
          }
          return x.isNeg() && !x.isZero() ? "-" + str : str;
        };
        P.toFixed = function(dp, rm) {
          var str, y, x = this, Ctor = x.constructor;
          if (dp === void 0) {
            str = finiteToString(x);
          } else {
            checkInt32(dp, 0, MAX_DIGITS);
            if (rm === void 0)
              rm = Ctor.rounding;
            else
              checkInt32(rm, 0, 8);
            y = finalise(new Ctor(x), dp + x.e + 1, rm);
            str = finiteToString(y, false, dp + y.e + 1);
          }
          return x.isNeg() && !x.isZero() ? "-" + str : str;
        };
        P.toFraction = function(maxD) {
          var d, d0, d1, d2, e2, k, n, n0, n1, pr, q, r, x = this, xd = x.d, Ctor = x.constructor;
          if (!xd)
            return new Ctor(x);
          n1 = d0 = new Ctor(1);
          d1 = n0 = new Ctor(0);
          d = new Ctor(d1);
          e2 = d.e = getPrecision(xd) - x.e - 1;
          k = e2 % LOG_BASE;
          d.d[0] = mathpow(10, k < 0 ? LOG_BASE + k : k);
          if (maxD == null) {
            maxD = e2 > 0 ? d : n1;
          } else {
            n = new Ctor(maxD);
            if (!n.isInt() || n.lt(n1))
              throw Error(invalidArgument + n);
            maxD = n.gt(d) ? e2 > 0 ? d : n1 : n;
          }
          external = false;
          n = new Ctor(digitsToString(xd));
          pr = Ctor.precision;
          Ctor.precision = e2 = xd.length * LOG_BASE * 2;
          for (; ; ) {
            q = divide(n, d, 0, 1, 1);
            d2 = d0.plus(q.times(d1));
            if (d2.cmp(maxD) == 1)
              break;
            d0 = d1;
            d1 = d2;
            d2 = n1;
            n1 = n0.plus(q.times(d2));
            n0 = d2;
            d2 = d;
            d = n.minus(q.times(d2));
            n = d2;
          }
          d2 = divide(maxD.minus(d0), d1, 0, 1, 1);
          n0 = n0.plus(d2.times(n1));
          d0 = d0.plus(d2.times(d1));
          n0.s = n1.s = x.s;
          r = divide(n1, d1, e2, 1).minus(x).abs().cmp(divide(n0, d0, e2, 1).minus(x).abs()) < 1 ? [n1, d1] : [n0, d0];
          Ctor.precision = pr;
          external = true;
          return r;
        };
        P.toHexadecimal = P.toHex = function(sd, rm) {
          return toStringBinary(this, 16, sd, rm);
        };
        P.toNearest = function(y, rm) {
          var x = this, Ctor = x.constructor;
          x = new Ctor(x);
          if (y == null) {
            if (!x.d)
              return x;
            y = new Ctor(1);
            rm = Ctor.rounding;
          } else {
            y = new Ctor(y);
            if (rm === void 0) {
              rm = Ctor.rounding;
            } else {
              checkInt32(rm, 0, 8);
            }
            if (!x.d)
              return y.s ? x : y;
            if (!y.d) {
              if (y.s)
                y.s = x.s;
              return y;
            }
          }
          if (y.d[0]) {
            external = false;
            x = divide(x, y, 0, rm, 1).times(y);
            external = true;
            finalise(x);
          } else {
            y.s = x.s;
            x = y;
          }
          return x;
        };
        P.toNumber = function() {
          return +this;
        };
        P.toOctal = function(sd, rm) {
          return toStringBinary(this, 8, sd, rm);
        };
        P.toPower = P.pow = function(y) {
          var e2, k, pr, r, rm, s, x = this, Ctor = x.constructor, yn = +(y = new Ctor(y));
          if (!x.d || !y.d || !x.d[0] || !y.d[0])
            return new Ctor(mathpow(+x, yn));
          x = new Ctor(x);
          if (x.eq(1))
            return x;
          pr = Ctor.precision;
          rm = Ctor.rounding;
          if (y.eq(1))
            return finalise(x, pr, rm);
          e2 = mathfloor(y.e / LOG_BASE);
          if (e2 >= y.d.length - 1 && (k = yn < 0 ? -yn : yn) <= MAX_SAFE_INTEGER) {
            r = intPow(Ctor, x, k, pr);
            return y.s < 0 ? new Ctor(1).div(r) : finalise(r, pr, rm);
          }
          s = x.s;
          if (s < 0) {
            if (e2 < y.d.length - 1)
              return new Ctor(NaN);
            if ((y.d[e2] & 1) == 0)
              s = 1;
            if (x.e == 0 && x.d[0] == 1 && x.d.length == 1) {
              x.s = s;
              return x;
            }
          }
          k = mathpow(+x, yn);
          e2 = k == 0 || !isFinite(k) ? mathfloor(yn * (Math.log("0." + digitsToString(x.d)) / Math.LN10 + x.e + 1)) : new Ctor(k + "").e;
          if (e2 > Ctor.maxE + 1 || e2 < Ctor.minE - 1)
            return new Ctor(e2 > 0 ? s / 0 : 0);
          external = false;
          Ctor.rounding = x.s = 1;
          k = Math.min(12, (e2 + "").length);
          r = naturalExponential(y.times(naturalLogarithm(x, pr + k)), pr);
          if (r.d) {
            r = finalise(r, pr + 5, 1);
            if (checkRoundingDigits(r.d, pr, rm)) {
              e2 = pr + 10;
              r = finalise(naturalExponential(y.times(naturalLogarithm(x, e2 + k)), e2), e2 + 5, 1);
              if (+digitsToString(r.d).slice(pr + 1, pr + 15) + 1 == 1e14) {
                r = finalise(r, pr + 1, 0);
              }
            }
          }
          r.s = s;
          external = true;
          Ctor.rounding = rm;
          return finalise(r, pr, rm);
        };
        P.toPrecision = function(sd, rm) {
          var str, x = this, Ctor = x.constructor;
          if (sd === void 0) {
            str = finiteToString(x, x.e <= Ctor.toExpNeg || x.e >= Ctor.toExpPos);
          } else {
            checkInt32(sd, 1, MAX_DIGITS);
            if (rm === void 0)
              rm = Ctor.rounding;
            else
              checkInt32(rm, 0, 8);
            x = finalise(new Ctor(x), sd, rm);
            str = finiteToString(x, sd <= x.e || x.e <= Ctor.toExpNeg, sd);
          }
          return x.isNeg() && !x.isZero() ? "-" + str : str;
        };
        P.toSignificantDigits = P.toSD = function(sd, rm) {
          var x = this, Ctor = x.constructor;
          if (sd === void 0) {
            sd = Ctor.precision;
            rm = Ctor.rounding;
          } else {
            checkInt32(sd, 1, MAX_DIGITS);
            if (rm === void 0)
              rm = Ctor.rounding;
            else
              checkInt32(rm, 0, 8);
          }
          return finalise(new Ctor(x), sd, rm);
        };
        P.toString = function() {
          var x = this, Ctor = x.constructor, str = finiteToString(x, x.e <= Ctor.toExpNeg || x.e >= Ctor.toExpPos);
          return x.isNeg() && !x.isZero() ? "-" + str : str;
        };
        P.truncated = P.trunc = function() {
          return finalise(new this.constructor(this), this.e + 1, 1);
        };
        P.valueOf = P.toJSON = function() {
          var x = this, Ctor = x.constructor, str = finiteToString(x, x.e <= Ctor.toExpNeg || x.e >= Ctor.toExpPos);
          return x.isNeg() ? "-" + str : str;
        };
        function digitsToString(d) {
          var i, k, ws, indexOfLastWord = d.length - 1, str = "", w = d[0];
          if (indexOfLastWord > 0) {
            str += w;
            for (i = 1; i < indexOfLastWord; i++) {
              ws = d[i] + "";
              k = LOG_BASE - ws.length;
              if (k)
                str += getZeroString(k);
              str += ws;
            }
            w = d[i];
            ws = w + "";
            k = LOG_BASE - ws.length;
            if (k)
              str += getZeroString(k);
          } else if (w === 0) {
            return "0";
          }
          for (; w % 10 === 0; )
            w /= 10;
          return str + w;
        }
        function checkInt32(i, min5, max5) {
          if (i !== ~~i || i < min5 || i > max5) {
            throw Error(invalidArgument + i);
          }
        }
        function checkRoundingDigits(d, i, rm, repeating) {
          var di, k, r, rd;
          for (k = d[0]; k >= 10; k /= 10)
            --i;
          if (--i < 0) {
            i += LOG_BASE;
            di = 0;
          } else {
            di = Math.ceil((i + 1) / LOG_BASE);
            i %= LOG_BASE;
          }
          k = mathpow(10, LOG_BASE - i);
          rd = d[di] % k | 0;
          if (repeating == null) {
            if (i < 3) {
              if (i == 0)
                rd = rd / 100 | 0;
              else if (i == 1)
                rd = rd / 10 | 0;
              r = rm < 4 && rd == 99999 || rm > 3 && rd == 49999 || rd == 5e4 || rd == 0;
            } else {
              r = (rm < 4 && rd + 1 == k || rm > 3 && rd + 1 == k / 2) && (d[di + 1] / k / 100 | 0) == mathpow(10, i - 2) - 1 || (rd == k / 2 || rd == 0) && (d[di + 1] / k / 100 | 0) == 0;
            }
          } else {
            if (i < 4) {
              if (i == 0)
                rd = rd / 1e3 | 0;
              else if (i == 1)
                rd = rd / 100 | 0;
              else if (i == 2)
                rd = rd / 10 | 0;
              r = (repeating || rm < 4) && rd == 9999 || !repeating && rm > 3 && rd == 4999;
            } else {
              r = ((repeating || rm < 4) && rd + 1 == k || !repeating && rm > 3 && rd + 1 == k / 2) && (d[di + 1] / k / 1e3 | 0) == mathpow(10, i - 3) - 1;
            }
          }
          return r;
        }
        function convertBase(str, baseIn, baseOut) {
          var j, arr = [0], arrL, i = 0, strL = str.length;
          for (; i < strL; ) {
            for (arrL = arr.length; arrL--; )
              arr[arrL] *= baseIn;
            arr[0] += NUMERALS.indexOf(str.charAt(i++));
            for (j = 0; j < arr.length; j++) {
              if (arr[j] > baseOut - 1) {
                if (arr[j + 1] === void 0)
                  arr[j + 1] = 0;
                arr[j + 1] += arr[j] / baseOut | 0;
                arr[j] %= baseOut;
              }
            }
          }
          return arr.reverse();
        }
        function cosine(Ctor, x) {
          var k, len, y;
          if (x.isZero())
            return x;
          len = x.d.length;
          if (len < 32) {
            k = Math.ceil(len / 3);
            y = (1 / tinyPow(4, k)).toString();
          } else {
            k = 16;
            y = "2.3283064365386962890625e-10";
          }
          Ctor.precision += k;
          x = taylorSeries(Ctor, 1, x.times(y), new Ctor(1));
          for (var i = k; i--; ) {
            var cos2x = x.times(x);
            x = cos2x.times(cos2x).minus(cos2x).times(8).plus(1);
          }
          Ctor.precision -= k;
          return x;
        }
        var divide = function() {
          function multiplyInteger(x, k, base) {
            var temp, carry = 0, i = x.length;
            for (x = x.slice(); i--; ) {
              temp = x[i] * k + carry;
              x[i] = temp % base | 0;
              carry = temp / base | 0;
            }
            if (carry)
              x.unshift(carry);
            return x;
          }
          function compare2(a, b, aL, bL) {
            var i, r;
            if (aL != bL) {
              r = aL > bL ? 1 : -1;
            } else {
              for (i = r = 0; i < aL; i++) {
                if (a[i] != b[i]) {
                  r = a[i] > b[i] ? 1 : -1;
                  break;
                }
              }
            }
            return r;
          }
          function subtract(a, b, aL, base) {
            var i = 0;
            for (; aL--; ) {
              a[aL] -= i;
              i = a[aL] < b[aL] ? 1 : 0;
              a[aL] = i * base + a[aL] - b[aL];
            }
            for (; !a[0] && a.length > 1; )
              a.shift();
          }
          return function(x, y, pr, rm, dp, base) {
            var cmp, e2, i, k, logBase, more, prod, prodL, q, qd, rem2, remL, rem0, sd, t, xi, xL, yd0, yL, yz, Ctor = x.constructor, sign3 = x.s == y.s ? 1 : -1, xd = x.d, yd = y.d;
            if (!xd || !xd[0] || !yd || !yd[0]) {
              return new Ctor(!x.s || !y.s || (xd ? yd && xd[0] == yd[0] : !yd) ? NaN : xd && xd[0] == 0 || !yd ? sign3 * 0 : sign3 / 0);
            }
            if (base) {
              logBase = 1;
              e2 = x.e - y.e;
            } else {
              base = BASE;
              logBase = LOG_BASE;
              e2 = mathfloor(x.e / logBase) - mathfloor(y.e / logBase);
            }
            yL = yd.length;
            xL = xd.length;
            q = new Ctor(sign3);
            qd = q.d = [];
            for (i = 0; yd[i] == (xd[i] || 0); i++)
              ;
            if (yd[i] > (xd[i] || 0))
              e2--;
            if (pr == null) {
              sd = pr = Ctor.precision;
              rm = Ctor.rounding;
            } else if (dp) {
              sd = pr + (x.e - y.e) + 1;
            } else {
              sd = pr;
            }
            if (sd < 0) {
              qd.push(1);
              more = true;
            } else {
              sd = sd / logBase + 2 | 0;
              i = 0;
              if (yL == 1) {
                k = 0;
                yd = yd[0];
                sd++;
                for (; (i < xL || k) && sd--; i++) {
                  t = k * base + (xd[i] || 0);
                  qd[i] = t / yd | 0;
                  k = t % yd | 0;
                }
                more = k || i < xL;
              } else {
                k = base / (yd[0] + 1) | 0;
                if (k > 1) {
                  yd = multiplyInteger(yd, k, base);
                  xd = multiplyInteger(xd, k, base);
                  yL = yd.length;
                  xL = xd.length;
                }
                xi = yL;
                rem2 = xd.slice(0, yL);
                remL = rem2.length;
                for (; remL < yL; )
                  rem2[remL++] = 0;
                yz = yd.slice();
                yz.unshift(0);
                yd0 = yd[0];
                if (yd[1] >= base / 2)
                  ++yd0;
                do {
                  k = 0;
                  cmp = compare2(yd, rem2, yL, remL);
                  if (cmp < 0) {
                    rem0 = rem2[0];
                    if (yL != remL)
                      rem0 = rem0 * base + (rem2[1] || 0);
                    k = rem0 / yd0 | 0;
                    if (k > 1) {
                      if (k >= base)
                        k = base - 1;
                      prod = multiplyInteger(yd, k, base);
                      prodL = prod.length;
                      remL = rem2.length;
                      cmp = compare2(prod, rem2, prodL, remL);
                      if (cmp == 1) {
                        k--;
                        subtract(prod, yL < prodL ? yz : yd, prodL, base);
                      }
                    } else {
                      if (k == 0)
                        cmp = k = 1;
                      prod = yd.slice();
                    }
                    prodL = prod.length;
                    if (prodL < remL)
                      prod.unshift(0);
                    subtract(rem2, prod, remL, base);
                    if (cmp == -1) {
                      remL = rem2.length;
                      cmp = compare2(yd, rem2, yL, remL);
                      if (cmp < 1) {
                        k++;
                        subtract(rem2, yL < remL ? yz : yd, remL, base);
                      }
                    }
                    remL = rem2.length;
                  } else if (cmp === 0) {
                    k++;
                    rem2 = [0];
                  }
                  qd[i++] = k;
                  if (cmp && rem2[0]) {
                    rem2[remL++] = xd[xi] || 0;
                  } else {
                    rem2 = [xd[xi]];
                    remL = 1;
                  }
                } while ((xi++ < xL || rem2[0] !== void 0) && sd--);
                more = rem2[0] !== void 0;
              }
              if (!qd[0])
                qd.shift();
            }
            if (logBase == 1) {
              q.e = e2;
              inexact = more;
            } else {
              for (i = 1, k = qd[0]; k >= 10; k /= 10)
                i++;
              q.e = i + e2 * logBase - 1;
              finalise(q, dp ? pr + q.e + 1 : pr, rm, more);
            }
            return q;
          };
        }();
        function finalise(x, sd, rm, isTruncated) {
          var digits, i, j, k, rd, roundUp, w, xd, xdi, Ctor = x.constructor;
          out:
            if (sd != null) {
              xd = x.d;
              if (!xd)
                return x;
              for (digits = 1, k = xd[0]; k >= 10; k /= 10)
                digits++;
              i = sd - digits;
              if (i < 0) {
                i += LOG_BASE;
                j = sd;
                w = xd[xdi = 0];
                rd = w / mathpow(10, digits - j - 1) % 10 | 0;
              } else {
                xdi = Math.ceil((i + 1) / LOG_BASE);
                k = xd.length;
                if (xdi >= k) {
                  if (isTruncated) {
                    for (; k++ <= xdi; )
                      xd.push(0);
                    w = rd = 0;
                    digits = 1;
                    i %= LOG_BASE;
                    j = i - LOG_BASE + 1;
                  } else {
                    break out;
                  }
                } else {
                  w = k = xd[xdi];
                  for (digits = 1; k >= 10; k /= 10)
                    digits++;
                  i %= LOG_BASE;
                  j = i - LOG_BASE + digits;
                  rd = j < 0 ? 0 : w / mathpow(10, digits - j - 1) % 10 | 0;
                }
              }
              isTruncated = isTruncated || sd < 0 || xd[xdi + 1] !== void 0 || (j < 0 ? w : w % mathpow(10, digits - j - 1));
              roundUp = rm < 4 ? (rd || isTruncated) && (rm == 0 || rm == (x.s < 0 ? 3 : 2)) : rd > 5 || rd == 5 && (rm == 4 || isTruncated || rm == 6 && (i > 0 ? j > 0 ? w / mathpow(10, digits - j) : 0 : xd[xdi - 1]) % 10 & 1 || rm == (x.s < 0 ? 8 : 7));
              if (sd < 1 || !xd[0]) {
                xd.length = 0;
                if (roundUp) {
                  sd -= x.e + 1;
                  xd[0] = mathpow(10, (LOG_BASE - sd % LOG_BASE) % LOG_BASE);
                  x.e = -sd || 0;
                } else {
                  xd[0] = x.e = 0;
                }
                return x;
              }
              if (i == 0) {
                xd.length = xdi;
                k = 1;
                xdi--;
              } else {
                xd.length = xdi + 1;
                k = mathpow(10, LOG_BASE - i);
                xd[xdi] = j > 0 ? (w / mathpow(10, digits - j) % mathpow(10, j) | 0) * k : 0;
              }
              if (roundUp) {
                for (; ; ) {
                  if (xdi == 0) {
                    for (i = 1, j = xd[0]; j >= 10; j /= 10)
                      i++;
                    j = xd[0] += k;
                    for (k = 1; j >= 10; j /= 10)
                      k++;
                    if (i != k) {
                      x.e++;
                      if (xd[0] == BASE)
                        xd[0] = 1;
                    }
                    break;
                  } else {
                    xd[xdi] += k;
                    if (xd[xdi] != BASE)
                      break;
                    xd[xdi--] = 0;
                    k = 1;
                  }
                }
              }
              for (i = xd.length; xd[--i] === 0; )
                xd.pop();
            }
          if (external) {
            if (x.e > Ctor.maxE) {
              x.d = null;
              x.e = NaN;
            } else if (x.e < Ctor.minE) {
              x.e = 0;
              x.d = [0];
            }
          }
          return x;
        }
        function finiteToString(x, isExp, sd) {
          if (!x.isFinite())
            return nonFiniteToString(x);
          var k, e2 = x.e, str = digitsToString(x.d), len = str.length;
          if (isExp) {
            if (sd && (k = sd - len) > 0) {
              str = str.charAt(0) + "." + str.slice(1) + getZeroString(k);
            } else if (len > 1) {
              str = str.charAt(0) + "." + str.slice(1);
            }
            str = str + (x.e < 0 ? "e" : "e+") + x.e;
          } else if (e2 < 0) {
            str = "0." + getZeroString(-e2 - 1) + str;
            if (sd && (k = sd - len) > 0)
              str += getZeroString(k);
          } else if (e2 >= len) {
            str += getZeroString(e2 + 1 - len);
            if (sd && (k = sd - e2 - 1) > 0)
              str = str + "." + getZeroString(k);
          } else {
            if ((k = e2 + 1) < len)
              str = str.slice(0, k) + "." + str.slice(k);
            if (sd && (k = sd - len) > 0) {
              if (e2 + 1 === len)
                str += ".";
              str += getZeroString(k);
            }
          }
          return str;
        }
        function getBase10Exponent(digits, e2) {
          var w = digits[0];
          for (e2 *= LOG_BASE; w >= 10; w /= 10)
            e2++;
          return e2;
        }
        function getLn10(Ctor, sd, pr) {
          if (sd > LN10_PRECISION) {
            external = true;
            if (pr)
              Ctor.precision = pr;
            throw Error(precisionLimitExceeded);
          }
          return finalise(new Ctor(LN10), sd, 1, true);
        }
        function getPi(Ctor, sd, rm) {
          if (sd > PI_PRECISION)
            throw Error(precisionLimitExceeded);
          return finalise(new Ctor(PI), sd, rm, true);
        }
        function getPrecision(digits) {
          var w = digits.length - 1, len = w * LOG_BASE + 1;
          w = digits[w];
          if (w) {
            for (; w % 10 == 0; w /= 10)
              len--;
            for (w = digits[0]; w >= 10; w /= 10)
              len++;
          }
          return len;
        }
        function getZeroString(k) {
          var zs = "";
          for (; k--; )
            zs += "0";
          return zs;
        }
        function intPow(Ctor, x, n, pr) {
          var isTruncated, r = new Ctor(1), k = Math.ceil(pr / LOG_BASE + 4);
          external = false;
          for (; ; ) {
            if (n % 2) {
              r = r.times(x);
              if (truncate(r.d, k))
                isTruncated = true;
            }
            n = mathfloor(n / 2);
            if (n === 0) {
              n = r.d.length - 1;
              if (isTruncated && r.d[n] === 0)
                ++r.d[n];
              break;
            }
            x = x.times(x);
            truncate(x.d, k);
          }
          external = true;
          return r;
        }
        function isOdd(n) {
          return n.d[n.d.length - 1] & 1;
        }
        function maxOrMin(Ctor, args, ltgt) {
          var y, x = new Ctor(args[0]), i = 0;
          for (; ++i < args.length; ) {
            y = new Ctor(args[i]);
            if (!y.s) {
              x = y;
              break;
            } else if (x[ltgt](y)) {
              x = y;
            }
          }
          return x;
        }
        function naturalExponential(x, sd) {
          var denominator, guard2, j, pow5, sum3, t, wpr, rep = 0, i = 0, k = 0, Ctor = x.constructor, rm = Ctor.rounding, pr = Ctor.precision;
          if (!x.d || !x.d[0] || x.e > 17) {
            return new Ctor(x.d ? !x.d[0] ? 1 : x.s < 0 ? 0 : 1 / 0 : x.s ? x.s < 0 ? 0 : x : 0 / 0);
          }
          if (sd == null) {
            external = false;
            wpr = pr;
          } else {
            wpr = sd;
          }
          t = new Ctor(0.03125);
          while (x.e > -2) {
            x = x.times(t);
            k += 5;
          }
          guard2 = Math.log(mathpow(2, k)) / Math.LN10 * 2 + 5 | 0;
          wpr += guard2;
          denominator = pow5 = sum3 = new Ctor(1);
          Ctor.precision = wpr;
          for (; ; ) {
            pow5 = finalise(pow5.times(x), wpr, 1);
            denominator = denominator.times(++i);
            t = sum3.plus(divide(pow5, denominator, wpr, 1));
            if (digitsToString(t.d).slice(0, wpr) === digitsToString(sum3.d).slice(0, wpr)) {
              j = k;
              while (j--)
                sum3 = finalise(sum3.times(sum3), wpr, 1);
              if (sd == null) {
                if (rep < 3 && checkRoundingDigits(sum3.d, wpr - guard2, rm, rep)) {
                  Ctor.precision = wpr += 10;
                  denominator = pow5 = t = new Ctor(1);
                  i = 0;
                  rep++;
                } else {
                  return finalise(sum3, Ctor.precision = pr, rm, external = true);
                }
              } else {
                Ctor.precision = pr;
                return sum3;
              }
            }
            sum3 = t;
          }
        }
        function naturalLogarithm(y, sd) {
          var c, c0, denominator, e2, numerator, rep, sum3, t, wpr, x1, x2, n = 1, guard2 = 10, x = y, xd = x.d, Ctor = x.constructor, rm = Ctor.rounding, pr = Ctor.precision;
          if (x.s < 0 || !xd || !xd[0] || !x.e && xd[0] == 1 && xd.length == 1) {
            return new Ctor(xd && !xd[0] ? -1 / 0 : x.s != 1 ? NaN : xd ? 0 : x);
          }
          if (sd == null) {
            external = false;
            wpr = pr;
          } else {
            wpr = sd;
          }
          Ctor.precision = wpr += guard2;
          c = digitsToString(xd);
          c0 = c.charAt(0);
          if (Math.abs(e2 = x.e) < 15e14) {
            while (c0 < 7 && c0 != 1 || c0 == 1 && c.charAt(1) > 3) {
              x = x.times(y);
              c = digitsToString(x.d);
              c0 = c.charAt(0);
              n++;
            }
            e2 = x.e;
            if (c0 > 1) {
              x = new Ctor("0." + c);
              e2++;
            } else {
              x = new Ctor(c0 + "." + c.slice(1));
            }
          } else {
            t = getLn10(Ctor, wpr + 2, pr).times(e2 + "");
            x = naturalLogarithm(new Ctor(c0 + "." + c.slice(1)), wpr - guard2).plus(t);
            Ctor.precision = pr;
            return sd == null ? finalise(x, pr, rm, external = true) : x;
          }
          x1 = x;
          sum3 = numerator = x = divide(x.minus(1), x.plus(1), wpr, 1);
          x2 = finalise(x.times(x), wpr, 1);
          denominator = 3;
          for (; ; ) {
            numerator = finalise(numerator.times(x2), wpr, 1);
            t = sum3.plus(divide(numerator, new Ctor(denominator), wpr, 1));
            if (digitsToString(t.d).slice(0, wpr) === digitsToString(sum3.d).slice(0, wpr)) {
              sum3 = sum3.times(2);
              if (e2 !== 0)
                sum3 = sum3.plus(getLn10(Ctor, wpr + 2, pr).times(e2 + ""));
              sum3 = divide(sum3, new Ctor(n), wpr, 1);
              if (sd == null) {
                if (checkRoundingDigits(sum3.d, wpr - guard2, rm, rep)) {
                  Ctor.precision = wpr += guard2;
                  t = numerator = x = divide(x1.minus(1), x1.plus(1), wpr, 1);
                  x2 = finalise(x.times(x), wpr, 1);
                  denominator = rep = 1;
                } else {
                  return finalise(sum3, Ctor.precision = pr, rm, external = true);
                }
              } else {
                Ctor.precision = pr;
                return sum3;
              }
            }
            sum3 = t;
            denominator += 2;
          }
        }
        function nonFiniteToString(x) {
          return String(x.s * x.s / 0);
        }
        function parseDecimal(x, str) {
          var e2, i, len;
          if ((e2 = str.indexOf(".")) > -1)
            str = str.replace(".", "");
          if ((i = str.search(/e/i)) > 0) {
            if (e2 < 0)
              e2 = i;
            e2 += +str.slice(i + 1);
            str = str.substring(0, i);
          } else if (e2 < 0) {
            e2 = str.length;
          }
          for (i = 0; str.charCodeAt(i) === 48; i++)
            ;
          for (len = str.length; str.charCodeAt(len - 1) === 48; --len)
            ;
          str = str.slice(i, len);
          if (str) {
            len -= i;
            x.e = e2 = e2 - i - 1;
            x.d = [];
            i = (e2 + 1) % LOG_BASE;
            if (e2 < 0)
              i += LOG_BASE;
            if (i < len) {
              if (i)
                x.d.push(+str.slice(0, i));
              for (len -= LOG_BASE; i < len; )
                x.d.push(+str.slice(i, i += LOG_BASE));
              str = str.slice(i);
              i = LOG_BASE - str.length;
            } else {
              i -= len;
            }
            for (; i--; )
              str += "0";
            x.d.push(+str);
            if (external) {
              if (x.e > x.constructor.maxE) {
                x.d = null;
                x.e = NaN;
              } else if (x.e < x.constructor.minE) {
                x.e = 0;
                x.d = [0];
              }
            }
          } else {
            x.e = 0;
            x.d = [0];
          }
          return x;
        }
        function parseOther(x, str) {
          var base, Ctor, divisor, i, isFloat, len, p, xd, xe;
          if (str.indexOf("_") > -1) {
            str = str.replace(/(\d)_(?=\d)/g, "$1");
            if (isDecimal.test(str))
              return parseDecimal(x, str);
          } else if (str === "Infinity" || str === "NaN") {
            if (!+str)
              x.s = NaN;
            x.e = NaN;
            x.d = null;
            return x;
          }
          if (isHex.test(str)) {
            base = 16;
            str = str.toLowerCase();
          } else if (isBinary.test(str)) {
            base = 2;
          } else if (isOctal.test(str)) {
            base = 8;
          } else {
            throw Error(invalidArgument + str);
          }
          i = str.search(/p/i);
          if (i > 0) {
            p = +str.slice(i + 1);
            str = str.substring(2, i);
          } else {
            str = str.slice(2);
          }
          i = str.indexOf(".");
          isFloat = i >= 0;
          Ctor = x.constructor;
          if (isFloat) {
            str = str.replace(".", "");
            len = str.length;
            i = len - i;
            divisor = intPow(Ctor, new Ctor(base), i, i * 2);
          }
          xd = convertBase(str, base, BASE);
          xe = xd.length - 1;
          for (i = xe; xd[i] === 0; --i)
            xd.pop();
          if (i < 0)
            return new Ctor(x.s * 0);
          x.e = getBase10Exponent(xd, xe);
          x.d = xd;
          external = false;
          if (isFloat)
            x = divide(x, divisor, len * 4);
          if (p)
            x = x.times(Math.abs(p) < 54 ? mathpow(2, p) : Decimal3.pow(2, p));
          external = true;
          return x;
        }
        function sine(Ctor, x) {
          var k, len = x.d.length;
          if (len < 3) {
            return x.isZero() ? x : taylorSeries(Ctor, 2, x, x);
          }
          k = 1.4 * Math.sqrt(len);
          k = k > 16 ? 16 : k | 0;
          x = x.times(1 / tinyPow(5, k));
          x = taylorSeries(Ctor, 2, x, x);
          var sin2_x, d5 = new Ctor(5), d16 = new Ctor(16), d20 = new Ctor(20);
          for (; k--; ) {
            sin2_x = x.times(x);
            x = x.times(d5.plus(sin2_x.times(d16.times(sin2_x).minus(d20))));
          }
          return x;
        }
        function taylorSeries(Ctor, n, x, y, isHyperbolic) {
          var j, t, u, x2, i = 1, pr = Ctor.precision, k = Math.ceil(pr / LOG_BASE);
          external = false;
          x2 = x.times(x);
          u = new Ctor(y);
          for (; ; ) {
            t = divide(u.times(x2), new Ctor(n++ * n++), pr, 1);
            u = isHyperbolic ? y.plus(t) : y.minus(t);
            y = divide(t.times(x2), new Ctor(n++ * n++), pr, 1);
            t = u.plus(y);
            if (t.d[k] !== void 0) {
              for (j = k; t.d[j] === u.d[j] && j--; )
                ;
              if (j == -1)
                break;
            }
            j = u;
            u = y;
            y = t;
            t = j;
            i++;
          }
          external = true;
          t.d.length = k + 1;
          return t;
        }
        function tinyPow(b, e2) {
          var n = b;
          while (--e2)
            n *= b;
          return n;
        }
        function toLessThanHalfPi(Ctor, x) {
          var t, isNeg = x.s < 0, pi2 = getPi(Ctor, Ctor.precision, 1), halfPi = pi2.times(0.5);
          x = x.abs();
          if (x.lte(halfPi)) {
            quadrant = isNeg ? 4 : 1;
            return x;
          }
          t = x.divToInt(pi2);
          if (t.isZero()) {
            quadrant = isNeg ? 3 : 2;
          } else {
            x = x.minus(t.times(pi2));
            if (x.lte(halfPi)) {
              quadrant = isOdd(t) ? isNeg ? 2 : 3 : isNeg ? 4 : 1;
              return x;
            }
            quadrant = isOdd(t) ? isNeg ? 1 : 4 : isNeg ? 3 : 2;
          }
          return x.minus(pi2).abs();
        }
        function toStringBinary(x, baseOut, sd, rm) {
          var base, e2, i, k, len, roundUp, str, xd, y, Ctor = x.constructor, isExp = sd !== void 0;
          if (isExp) {
            checkInt32(sd, 1, MAX_DIGITS);
            if (rm === void 0)
              rm = Ctor.rounding;
            else
              checkInt32(rm, 0, 8);
          } else {
            sd = Ctor.precision;
            rm = Ctor.rounding;
          }
          if (!x.isFinite()) {
            str = nonFiniteToString(x);
          } else {
            str = finiteToString(x);
            i = str.indexOf(".");
            if (isExp) {
              base = 2;
              if (baseOut == 16) {
                sd = sd * 4 - 3;
              } else if (baseOut == 8) {
                sd = sd * 3 - 2;
              }
            } else {
              base = baseOut;
            }
            if (i >= 0) {
              str = str.replace(".", "");
              y = new Ctor(1);
              y.e = str.length - i;
              y.d = convertBase(finiteToString(y), 10, base);
              y.e = y.d.length;
            }
            xd = convertBase(str, 10, base);
            e2 = len = xd.length;
            for (; xd[--len] == 0; )
              xd.pop();
            if (!xd[0]) {
              str = isExp ? "0p+0" : "0";
            } else {
              if (i < 0) {
                e2--;
              } else {
                x = new Ctor(x);
                x.d = xd;
                x.e = e2;
                x = divide(x, y, sd, rm, 0, base);
                xd = x.d;
                e2 = x.e;
                roundUp = inexact;
              }
              i = xd[sd];
              k = base / 2;
              roundUp = roundUp || xd[sd + 1] !== void 0;
              roundUp = rm < 4 ? (i !== void 0 || roundUp) && (rm === 0 || rm === (x.s < 0 ? 3 : 2)) : i > k || i === k && (rm === 4 || roundUp || rm === 6 && xd[sd - 1] & 1 || rm === (x.s < 0 ? 8 : 7));
              xd.length = sd;
              if (roundUp) {
                for (; ++xd[--sd] > base - 1; ) {
                  xd[sd] = 0;
                  if (!sd) {
                    ++e2;
                    xd.unshift(1);
                  }
                }
              }
              for (len = xd.length; !xd[len - 1]; --len)
                ;
              for (i = 0, str = ""; i < len; i++)
                str += NUMERALS.charAt(xd[i]);
              if (isExp) {
                if (len > 1) {
                  if (baseOut == 16 || baseOut == 8) {
                    i = baseOut == 16 ? 4 : 3;
                    for (--len; len % i; len++)
                      str += "0";
                    xd = convertBase(str, base, baseOut);
                    for (len = xd.length; !xd[len - 1]; --len)
                      ;
                    for (i = 1, str = "1."; i < len; i++)
                      str += NUMERALS.charAt(xd[i]);
                  } else {
                    str = str.charAt(0) + "." + str.slice(1);
                  }
                }
                str = str + (e2 < 0 ? "p" : "p+") + e2;
              } else if (e2 < 0) {
                for (; ++e2; )
                  str = "0" + str;
                str = "0." + str;
              } else {
                if (++e2 > len)
                  for (e2 -= len; e2--; )
                    str += "0";
                else if (e2 < len)
                  str = str.slice(0, e2) + "." + str.slice(e2);
              }
            }
            str = (baseOut == 16 ? "0x" : baseOut == 2 ? "0b" : baseOut == 8 ? "0o" : "") + str;
          }
          return x.s < 0 ? "-" + str : str;
        }
        function truncate(arr, len) {
          if (arr.length > len) {
            arr.length = len;
            return true;
          }
        }
        function abs3(x) {
          return new this(x).abs();
        }
        function acos3(x) {
          return new this(x).acos();
        }
        function acosh2(x) {
          return new this(x).acosh();
        }
        function add2(x, y) {
          return new this(x).plus(y);
        }
        function asin3(x) {
          return new this(x).asin();
        }
        function asinh2(x) {
          return new this(x).asinh();
        }
        function atan4(x) {
          return new this(x).atan();
        }
        function atanh2(x) {
          return new this(x).atanh();
        }
        function atan23(y, x) {
          y = new this(y);
          x = new this(x);
          var r, pr = this.precision, rm = this.rounding, wpr = pr + 4;
          if (!y.s || !x.s) {
            r = new this(NaN);
          } else if (!y.d && !x.d) {
            r = getPi(this, wpr, 1).times(x.s > 0 ? 0.25 : 0.75);
            r.s = y.s;
          } else if (!x.d || y.isZero()) {
            r = x.s < 0 ? getPi(this, pr, rm) : new this(0);
            r.s = y.s;
          } else if (!y.d || x.isZero()) {
            r = getPi(this, wpr, 1).times(0.5);
            r.s = y.s;
          } else if (x.s < 0) {
            this.precision = wpr;
            this.rounding = 1;
            r = this.atan(divide(y, x, wpr, 1));
            x = getPi(this, wpr, 1);
            this.precision = pr;
            this.rounding = rm;
            r = y.s < 0 ? r.minus(x) : r.plus(x);
          } else {
            r = this.atan(divide(y, x, wpr, 1));
          }
          return r;
        }
        function cbrt(x) {
          return new this(x).cbrt();
        }
        function ceil3(x) {
          return finalise(x = new this(x), x.e + 1, 2);
        }
        function clamp2(x, min5, max5) {
          return new this(x).clamp(min5, max5);
        }
        function config(obj) {
          if (!obj || typeof obj !== "object")
            throw Error(decimalError + "Object expected");
          var i, p, v, useDefaults = obj.defaults === true, ps = [
            "precision",
            1,
            MAX_DIGITS,
            "rounding",
            0,
            8,
            "toExpNeg",
            -EXP_LIMIT,
            0,
            "toExpPos",
            0,
            EXP_LIMIT,
            "maxE",
            0,
            EXP_LIMIT,
            "minE",
            -EXP_LIMIT,
            0,
            "modulo",
            0,
            9
          ];
          for (i = 0; i < ps.length; i += 3) {
            if (p = ps[i], useDefaults)
              this[p] = DEFAULTS[p];
            if ((v = obj[p]) !== void 0) {
              if (mathfloor(v) === v && v >= ps[i + 1] && v <= ps[i + 2])
                this[p] = v;
              else
                throw Error(invalidArgument + p + ": " + v);
            }
          }
          if (p = "crypto", useDefaults)
            this[p] = DEFAULTS[p];
          if ((v = obj[p]) !== void 0) {
            if (v === true || v === false || v === 0 || v === 1) {
              if (v) {
                if (typeof crypto != "undefined" && crypto && (crypto.getRandomValues || crypto.randomBytes)) {
                  this[p] = true;
                } else {
                  throw Error(cryptoUnavailable);
                }
              } else {
                this[p] = false;
              }
            } else {
              throw Error(invalidArgument + p + ": " + v);
            }
          }
          return this;
        }
        function cos3(x) {
          return new this(x).cos();
        }
        function cosh2(x) {
          return new this(x).cosh();
        }
        function clone(obj) {
          var i, p, ps;
          function Decimal4(v) {
            var e2, i2, t, x = this;
            if (!(x instanceof Decimal4))
              return new Decimal4(v);
            x.constructor = Decimal4;
            if (isDecimalInstance(v)) {
              x.s = v.s;
              if (external) {
                if (!v.d || v.e > Decimal4.maxE) {
                  x.e = NaN;
                  x.d = null;
                } else if (v.e < Decimal4.minE) {
                  x.e = 0;
                  x.d = [0];
                } else {
                  x.e = v.e;
                  x.d = v.d.slice();
                }
              } else {
                x.e = v.e;
                x.d = v.d ? v.d.slice() : v.d;
              }
              return;
            }
            t = typeof v;
            if (t === "number") {
              if (v === 0) {
                x.s = 1 / v < 0 ? -1 : 1;
                x.e = 0;
                x.d = [0];
                return;
              }
              if (v < 0) {
                v = -v;
                x.s = -1;
              } else {
                x.s = 1;
              }
              if (v === ~~v && v < 1e7) {
                for (e2 = 0, i2 = v; i2 >= 10; i2 /= 10)
                  e2++;
                if (external) {
                  if (e2 > Decimal4.maxE) {
                    x.e = NaN;
                    x.d = null;
                  } else if (e2 < Decimal4.minE) {
                    x.e = 0;
                    x.d = [0];
                  } else {
                    x.e = e2;
                    x.d = [v];
                  }
                } else {
                  x.e = e2;
                  x.d = [v];
                }
                return;
              } else if (v * 0 !== 0) {
                if (!v)
                  x.s = NaN;
                x.e = NaN;
                x.d = null;
                return;
              }
              return parseDecimal(x, v.toString());
            } else if (t !== "string") {
              throw Error(invalidArgument + v);
            }
            if ((i2 = v.charCodeAt(0)) === 45) {
              v = v.slice(1);
              x.s = -1;
            } else {
              if (i2 === 43)
                v = v.slice(1);
              x.s = 1;
            }
            return isDecimal.test(v) ? parseDecimal(x, v) : parseOther(x, v);
          }
          Decimal4.prototype = P;
          Decimal4.ROUND_UP = 0;
          Decimal4.ROUND_DOWN = 1;
          Decimal4.ROUND_CEIL = 2;
          Decimal4.ROUND_FLOOR = 3;
          Decimal4.ROUND_HALF_UP = 4;
          Decimal4.ROUND_HALF_DOWN = 5;
          Decimal4.ROUND_HALF_EVEN = 6;
          Decimal4.ROUND_HALF_CEIL = 7;
          Decimal4.ROUND_HALF_FLOOR = 8;
          Decimal4.EUCLID = 9;
          Decimal4.config = Decimal4.set = config;
          Decimal4.clone = clone;
          Decimal4.isDecimal = isDecimalInstance;
          Decimal4.abs = abs3;
          Decimal4.acos = acos3;
          Decimal4.acosh = acosh2;
          Decimal4.add = add2;
          Decimal4.asin = asin3;
          Decimal4.asinh = asinh2;
          Decimal4.atan = atan4;
          Decimal4.atanh = atanh2;
          Decimal4.atan2 = atan23;
          Decimal4.cbrt = cbrt;
          Decimal4.ceil = ceil3;
          Decimal4.clamp = clamp2;
          Decimal4.cos = cos3;
          Decimal4.cosh = cosh2;
          Decimal4.div = div2;
          Decimal4.exp = exp3;
          Decimal4.floor = floor4;
          Decimal4.hypot = hypot;
          Decimal4.ln = ln2;
          Decimal4.log = log4;
          Decimal4.log10 = log102;
          Decimal4.log2 = log22;
          Decimal4.max = max4;
          Decimal4.min = min4;
          Decimal4.mod = mod2;
          Decimal4.mul = mul2;
          Decimal4.pow = pow4;
          Decimal4.random = random;
          Decimal4.round = round3;
          Decimal4.sign = sign2;
          Decimal4.sin = sin3;
          Decimal4.sinh = sinh2;
          Decimal4.sqrt = sqrt3;
          Decimal4.sub = sub2;
          Decimal4.sum = sum2;
          Decimal4.tan = tan3;
          Decimal4.tanh = tanh2;
          Decimal4.trunc = trunc2;
          if (obj === void 0)
            obj = {};
          if (obj) {
            if (obj.defaults !== true) {
              ps = ["precision", "rounding", "toExpNeg", "toExpPos", "maxE", "minE", "modulo", "crypto"];
              for (i = 0; i < ps.length; )
                if (!obj.hasOwnProperty(p = ps[i++]))
                  obj[p] = this[p];
            }
          }
          Decimal4.config(obj);
          return Decimal4;
        }
        function div2(x, y) {
          return new this(x).div(y);
        }
        function exp3(x) {
          return new this(x).exp();
        }
        function floor4(x) {
          return finalise(x = new this(x), x.e + 1, 3);
        }
        function hypot() {
          var i, n, t = new this(0);
          external = false;
          for (i = 0; i < arguments.length; ) {
            n = new this(arguments[i++]);
            if (!n.d) {
              if (n.s) {
                external = true;
                return new this(1 / 0);
              }
              t = n;
            } else if (t.d) {
              t = t.plus(n.times(n));
            }
          }
          external = true;
          return t.sqrt();
        }
        function isDecimalInstance(obj) {
          return obj instanceof Decimal3 || obj && obj.toStringTag === tag || false;
        }
        function ln2(x) {
          return new this(x).ln();
        }
        function log4(x, y) {
          return new this(x).log(y);
        }
        function log22(x) {
          return new this(x).log(2);
        }
        function log102(x) {
          return new this(x).log(10);
        }
        function max4() {
          return maxOrMin(this, arguments, "lt");
        }
        function min4() {
          return maxOrMin(this, arguments, "gt");
        }
        function mod2(x, y) {
          return new this(x).mod(y);
        }
        function mul2(x, y) {
          return new this(x).mul(y);
        }
        function pow4(x, y) {
          return new this(x).pow(y);
        }
        function random(sd) {
          var d, e2, k, n, i = 0, r = new this(1), rd = [];
          if (sd === void 0)
            sd = this.precision;
          else
            checkInt32(sd, 1, MAX_DIGITS);
          k = Math.ceil(sd / LOG_BASE);
          if (!this.crypto) {
            for (; i < k; )
              rd[i++] = Math.random() * 1e7 | 0;
          } else if (crypto.getRandomValues) {
            d = crypto.getRandomValues(new Uint32Array(k));
            for (; i < k; ) {
              n = d[i];
              if (n >= 429e7) {
                d[i] = crypto.getRandomValues(new Uint32Array(1))[0];
              } else {
                rd[i++] = n % 1e7;
              }
            }
          } else if (crypto.randomBytes) {
            d = crypto.randomBytes(k *= 4);
            for (; i < k; ) {
              n = d[i] + (d[i + 1] << 8) + (d[i + 2] << 16) + ((d[i + 3] & 127) << 24);
              if (n >= 214e7) {
                crypto.randomBytes(4).copy(d, i);
              } else {
                rd.push(n % 1e7);
                i += 4;
              }
            }
            i = k / 4;
          } else {
            throw Error(cryptoUnavailable);
          }
          k = rd[--i];
          sd %= LOG_BASE;
          if (k && sd) {
            n = mathpow(10, LOG_BASE - sd);
            rd[i] = (k / n | 0) * n;
          }
          for (; rd[i] === 0; i--)
            rd.pop();
          if (i < 0) {
            e2 = 0;
            rd = [0];
          } else {
            e2 = -1;
            for (; rd[0] === 0; e2 -= LOG_BASE)
              rd.shift();
            for (k = 1, n = rd[0]; n >= 10; n /= 10)
              k++;
            if (k < LOG_BASE)
              e2 -= LOG_BASE - k;
          }
          r.e = e2;
          r.d = rd;
          return r;
        }
        function round3(x) {
          return finalise(x = new this(x), x.e + 1, this.rounding);
        }
        function sign2(x) {
          x = new this(x);
          return x.d ? x.d[0] ? x.s : 0 * x.s : x.s || NaN;
        }
        function sin3(x) {
          return new this(x).sin();
        }
        function sinh2(x) {
          return new this(x).sinh();
        }
        function sqrt3(x) {
          return new this(x).sqrt();
        }
        function sub2(x, y) {
          return new this(x).sub(y);
        }
        function sum2() {
          var i = 0, args = arguments, x = new this(args[i]);
          external = false;
          for (; x.s && ++i < args.length; )
            x = x.plus(args[i]);
          external = true;
          return finalise(x, this.precision, this.rounding);
        }
        function tan3(x) {
          return new this(x).tan();
        }
        function tanh2(x) {
          return new this(x).tanh();
        }
        function trunc2(x) {
          return finalise(x = new this(x), x.e + 1, 1);
        }
        Decimal3 = clone(DEFAULTS);
        Decimal3.prototype.constructor = Decimal3;
        Decimal3["default"] = Decimal3.Decimal = Decimal3;
        LN10 = new Decimal3(LN10);
        PI = new Decimal3(PI);
        if (typeof define == "function" && define.amd) {
          define(function() {
            return Decimal3;
          });
        } else if (typeof module != "undefined" && module.exports) {
          if (typeof Symbol == "function" && typeof Symbol.iterator == "symbol") {
            P[Symbol["for"]("nodejs.util.inspect.custom")] = P.toString;
            P[Symbol.toStringTag] = "Decimal";
          }
          module.exports = Decimal3;
        } else {
          if (!globalScope) {
            globalScope = typeof self != "undefined" && self && self.self == self ? self : window;
          }
          noConflict = globalScope.Decimal;
          Decimal3.noConflict = function() {
            globalScope.Decimal = noConflict;
            return Decimal3;
          };
          globalScope.Decimal = Decimal3;
        }
      })(exports);
    }
  });

  // output/Data.Decimal/foreign.js
  var import_decimal = __toESM(require_decimal(), 1);
  import_decimal.default.set({ precision: 30 });
  import_decimal.default.set({ modulo: import_decimal.default.EUCLID });
  function fromInt(x) {
    return new import_decimal.default(x);
  }
  function fromStringImpl(nothing) {
    return function(just) {
      return function(str) {
        try {
          return just(new import_decimal.default(str));
        } catch (e2) {
          return nothing;
        }
      };
    };
  }
  function toNumber(x) {
    return x.toNumber();
  }
  function toString(x) {
    return x.toString();
  }
  function isFinite2(x) {
    return x.isFinite();
  }
  function dAdd(x) {
    return function(y) {
      return x.add(y);
    };
  }
  function modulo(x) {
    return function(y) {
      return x.mod(y);
    };
  }
  function dMul(x) {
    return function(y) {
      return x.mul(y);
    };
  }
  function dSub(x) {
    return function(y) {
      return x.minus(y);
    };
  }
  function dDiv(x) {
    return function(y) {
      return x.div(y);
    };
  }
  function dEquals(x) {
    return function(y) {
      return x.equals(y);
    };
  }
  function dCompare(x) {
    return function(y) {
      return x.cmp(y);
    };
  }
  function abs(x) {
    return x.abs();
  }
  function floor(x) {
    return x.floor();
  }
  var e = import_decimal.default.exp(1);
  var pi = new import_decimal.default("3.14159265358979323846264338327950288419716939937510582097494459230781640628620899");

  // output/Data.Boolean/index.js
  var otherwise = true;

  // output/Data.EuclideanRing/foreign.js
  var intDegree = function(x) {
    return Math.min(Math.abs(x), 2147483647);
  };
  var intDiv = function(x) {
    return function(y) {
      if (y === 0)
        return 0;
      return y > 0 ? Math.floor(x / y) : -Math.floor(x / -y);
    };
  };
  var intMod = function(x) {
    return function(y) {
      if (y === 0)
        return 0;
      var yy = Math.abs(y);
      return (x % yy + yy) % yy;
    };
  };

  // output/Data.Ring/foreign.js
  var intSub = function(x) {
    return function(y) {
      return x - y | 0;
    };
  };

  // output/Data.Semiring/foreign.js
  var intAdd = function(x) {
    return function(y) {
      return x + y | 0;
    };
  };
  var intMul = function(x) {
    return function(y) {
      return x * y | 0;
    };
  };

  // output/Data.Semiring/index.js
  var zero = function(dict) {
    return dict.zero;
  };
  var semiringInt = {
    add: intAdd,
    zero: 0,
    mul: intMul,
    one: 1
  };
  var mul = function(dict) {
    return dict.mul;
  };

  // output/Data.Ring/index.js
  var sub = function(dict) {
    return dict.sub;
  };
  var ringInt = {
    sub: intSub,
    Semiring0: function() {
      return semiringInt;
    }
  };

  // output/Data.CommutativeRing/index.js
  var commutativeRingInt = {
    Ring0: function() {
      return ringInt;
    }
  };

  // output/Data.Eq/foreign.js
  var refEq = function(r1) {
    return function(r2) {
      return r1 === r2;
    };
  };
  var eqBooleanImpl = refEq;
  var eqIntImpl = refEq;
  var eqCharImpl = refEq;

  // output/Data.Eq/index.js
  var eqInt = {
    eq: eqIntImpl
  };
  var eqChar = {
    eq: eqCharImpl
  };
  var eqBoolean = {
    eq: eqBooleanImpl
  };
  var eq = function(dict) {
    return dict.eq;
  };
  var notEq = function(dictEq) {
    return function(x) {
      return function(y) {
        return eq(eqBoolean)(eq(dictEq)(x)(y))(false);
      };
    };
  };

  // output/Data.EuclideanRing/index.js
  var mod = function(dict) {
    return dict.mod;
  };
  var euclideanRingInt = {
    degree: intDegree,
    div: intDiv,
    mod: intMod,
    CommutativeRing0: function() {
      return commutativeRingInt;
    }
  };
  var div = function(dict) {
    return dict.div;
  };

  // output/Data.Functor/foreign.js
  var arrayMap = function(f) {
    return function(arr) {
      var l = arr.length;
      var result = new Array(l);
      for (var i = 0; i < l; i++) {
        result[i] = f(arr[i]);
      }
      return result;
    };
  };

  // output/Control.Semigroupoid/index.js
  var semigroupoidFn = {
    compose: function(f) {
      return function(g) {
        return function(x) {
          return f(g(x));
        };
      };
    }
  };

  // output/Control.Category/index.js
  var identity = function(dict) {
    return dict.identity;
  };
  var categoryFn = {
    identity: function(x) {
      return x;
    },
    Semigroupoid0: function() {
      return semigroupoidFn;
    }
  };

  // output/Data.Function/index.js
  var flip = function(f) {
    return function(b) {
      return function(a) {
        return f(a)(b);
      };
    };
  };
  var $$const = function(a) {
    return function(v) {
      return a;
    };
  };

  // output/Data.Functor/index.js
  var map = function(dict) {
    return dict.map;
  };
  var functorArray = {
    map: arrayMap
  };

  // output/Data.Semigroup/foreign.js
  var concatArray = function(xs) {
    return function(ys) {
      if (xs.length === 0)
        return ys;
      if (ys.length === 0)
        return xs;
      return xs.concat(ys);
    };
  };

  // output/Data.Semigroup/index.js
  var semigroupArray = {
    append: concatArray
  };
  var append = function(dict) {
    return dict.append;
  };

  // output/Control.Apply/foreign.js
  var arrayApply = function(fs) {
    return function(xs) {
      var l = fs.length;
      var k = xs.length;
      var result = new Array(l * k);
      var n = 0;
      for (var i = 0; i < l; i++) {
        var f = fs[i];
        for (var j = 0; j < k; j++) {
          result[n++] = f(xs[j]);
        }
      }
      return result;
    };
  };

  // output/Control.Apply/index.js
  var applyArray = {
    apply: arrayApply,
    Functor0: function() {
      return functorArray;
    }
  };
  var apply = function(dict) {
    return dict.apply;
  };

  // output/Control.Applicative/index.js
  var pure = function(dict) {
    return dict.pure;
  };

  // output/Data.Bounded/foreign.js
  var topInt = 2147483647;
  var bottomInt = -2147483648;
  var topChar = String.fromCharCode(65535);
  var bottomChar = String.fromCharCode(0);
  var topNumber = Number.POSITIVE_INFINITY;
  var bottomNumber = Number.NEGATIVE_INFINITY;

  // output/Data.Ord/foreign.js
  var unsafeCompareImpl = function(lt) {
    return function(eq2) {
      return function(gt) {
        return function(x) {
          return function(y) {
            return x < y ? lt : x === y ? eq2 : gt;
          };
        };
      };
    };
  };
  var ordIntImpl = unsafeCompareImpl;
  var ordCharImpl = unsafeCompareImpl;

  // output/Data.Ordering/index.js
  var LT = /* @__PURE__ */ function() {
    function LT2() {
    }
    ;
    LT2.value = new LT2();
    return LT2;
  }();
  var GT = /* @__PURE__ */ function() {
    function GT2() {
    }
    ;
    GT2.value = new GT2();
    return GT2;
  }();
  var EQ = /* @__PURE__ */ function() {
    function EQ2() {
    }
    ;
    EQ2.value = new EQ2();
    return EQ2;
  }();

  // output/Data.Ord/index.js
  var ordInt = /* @__PURE__ */ function() {
    return {
      compare: ordIntImpl(LT.value)(EQ.value)(GT.value),
      Eq0: function() {
        return eqInt;
      }
    };
  }();
  var ordChar = /* @__PURE__ */ function() {
    return {
      compare: ordCharImpl(LT.value)(EQ.value)(GT.value),
      Eq0: function() {
        return eqChar;
      }
    };
  }();
  var compare = function(dict) {
    return dict.compare;
  };
  var greaterThan = function(dictOrd) {
    return function(a1) {
      return function(a2) {
        var v = compare(dictOrd)(a1)(a2);
        if (v instanceof GT) {
          return true;
        }
        ;
        return false;
      };
    };
  };
  var greaterThanOrEq = function(dictOrd) {
    return function(a1) {
      return function(a2) {
        var v = compare(dictOrd)(a1)(a2);
        if (v instanceof LT) {
          return false;
        }
        ;
        return true;
      };
    };
  };
  var lessThan = function(dictOrd) {
    return function(a1) {
      return function(a2) {
        var v = compare(dictOrd)(a1)(a2);
        if (v instanceof LT) {
          return true;
        }
        ;
        return false;
      };
    };
  };

  // output/Data.Bounded/index.js
  var top = function(dict) {
    return dict.top;
  };
  var boundedInt = {
    top: topInt,
    bottom: bottomInt,
    Ord0: function() {
      return ordInt;
    }
  };
  var boundedChar = {
    top: topChar,
    bottom: bottomChar,
    Ord0: function() {
      return ordChar;
    }
  };
  var bottom = function(dict) {
    return dict.bottom;
  };

  // output/Data.Show/foreign.js
  var showIntImpl = function(n) {
    return n.toString();
  };
  var showStringImpl = function(s) {
    var l = s.length;
    return '"' + s.replace(/[\0-\x1F\x7F"\\]/g, function(c, i) {
      switch (c) {
        case '"':
        case "\\":
          return "\\" + c;
        case "\x07":
          return "\\a";
        case "\b":
          return "\\b";
        case "\f":
          return "\\f";
        case "\n":
          return "\\n";
        case "\r":
          return "\\r";
        case "	":
          return "\\t";
        case "\v":
          return "\\v";
      }
      var k = i + 1;
      var empty2 = k < l && s[k] >= "0" && s[k] <= "9" ? "\\&" : "";
      return "\\" + c.charCodeAt(0).toString(10) + empty2;
    }) + '"';
  };
  var showArrayImpl = function(f) {
    return function(xs) {
      var ss = [];
      for (var i = 0, l = xs.length; i < l; i++) {
        ss[i] = f(xs[i]);
      }
      return "[" + ss.join(",") + "]";
    };
  };

  // output/Data.Show/index.js
  var showString = {
    show: showStringImpl
  };
  var showInt = {
    show: showIntImpl
  };
  var showBoolean = {
    show: function(v) {
      if (v) {
        return "true";
      }
      ;
      if (!v) {
        return "false";
      }
      ;
      throw new Error("Failed pattern match at Data.Show (line 23, column 1 - line 25, column 23): " + [v.constructor.name]);
    }
  };
  var show = function(dict) {
    return dict.show;
  };
  var showArray = function(dictShow) {
    return {
      show: showArrayImpl(show(dictShow))
    };
  };

  // output/Data.Maybe/index.js
  var Nothing = /* @__PURE__ */ function() {
    function Nothing2() {
    }
    ;
    Nothing2.value = new Nothing2();
    return Nothing2;
  }();
  var Just = /* @__PURE__ */ function() {
    function Just2(value0) {
      this.value0 = value0;
    }
    ;
    Just2.create = function(value0) {
      return new Just2(value0);
    };
    return Just2;
  }();
  var maybe = function(v) {
    return function(v1) {
      return function(v2) {
        if (v2 instanceof Nothing) {
          return v;
        }
        ;
        if (v2 instanceof Just) {
          return v1(v2.value0);
        }
        ;
        throw new Error("Failed pattern match at Data.Maybe (line 237, column 1 - line 237, column 51): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
      };
    };
  };
  var isNothing = /* @__PURE__ */ maybe(true)(/* @__PURE__ */ $$const(false));
  var functorMaybe = {
    map: function(v) {
      return function(v1) {
        if (v1 instanceof Just) {
          return new Just(v(v1.value0));
        }
        ;
        return Nothing.value;
      };
    }
  };
  var fromMaybe = function(a) {
    return maybe(a)(identity(categoryFn));
  };
  var fromJust = function() {
    return function(v) {
      if (v instanceof Just) {
        return v.value0;
      }
      ;
      throw new Error("Failed pattern match at Data.Maybe (line 288, column 1 - line 288, column 46): " + [v.constructor.name]);
    };
  };

  // output/Data.Decimal/index.js
  var showDecimal = {
    show: function(x) {
      return '(fromString "' + (toString(x) + '")');
    }
  };
  var semiringDecimal = {
    add: dAdd,
    zero: /* @__PURE__ */ fromInt(0),
    mul: dMul,
    one: /* @__PURE__ */ fromInt(1)
  };
  var ringDecimal = {
    sub: dSub,
    Semiring0: function() {
      return semiringDecimal;
    }
  };
  var eqDecimal = {
    eq: dEquals
  };
  var ordDecimal = {
    compare: function(x) {
      return function(y) {
        var v = dCompare(x)(y);
        if (v === 1) {
          return GT.value;
        }
        ;
        if (v === 0) {
          return EQ.value;
        }
        ;
        return LT.value;
      };
    },
    Eq0: function() {
      return eqDecimal;
    }
  };
  var commutativeRingDecimal = {
    Ring0: function() {
      return ringDecimal;
    }
  };
  var euclideanRingDecimal = {
    div: dDiv,
    mod: function(v) {
      return function(v1) {
        return zero(semiringDecimal);
      };
    },
    degree: function(v) {
      return 1;
    },
    CommutativeRing0: function() {
      return commutativeRingDecimal;
    }
  };
  var fromString = /* @__PURE__ */ function() {
    return fromStringImpl(Nothing.value)(Just.create);
  }();

  // output/Effect.Console/foreign.js
  var log = function(s) {
    return function() {
      console.log(s);
    };
  };

  // output/NumberSystems/foreign.js
  var import_decimal2 = __toESM(require_decimal(), 1);
  function initArgam() {
    import_decimal2.default.set({ precision: 1e3 });
  }

  // output/Control.Bind/foreign.js
  var arrayBind = function(arr) {
    return function(f) {
      var result = [];
      for (var i = 0, l = arr.length; i < l; i++) {
        Array.prototype.push.apply(result, f(arr[i]));
      }
      return result;
    };
  };

  // output/Control.Bind/index.js
  var bindArray = {
    bind: arrayBind,
    Apply0: function() {
      return applyArray;
    }
  };
  var bind = function(dict) {
    return dict.bind;
  };

  // output/Control.Monad.Reader.Class/index.js
  var ask = function(dict) {
    return dict.ask;
  };

  // output/Data.Monoid/index.js
  var mempty = function(dict) {
    return dict.mempty;
  };

  // output/Data.Identity/index.js
  var Identity = function(x) {
    return x;
  };
  var functorIdentity = {
    map: function(f) {
      return function(m) {
        return f(m);
      };
    }
  };
  var applyIdentity = {
    apply: function(v) {
      return function(v1) {
        return v(v1);
      };
    },
    Functor0: function() {
      return functorIdentity;
    }
  };
  var bindIdentity = {
    bind: function(v) {
      return function(f) {
        return f(v);
      };
    },
    Apply0: function() {
      return applyIdentity;
    }
  };
  var applicativeIdentity = {
    pure: Identity,
    Apply0: function() {
      return applyIdentity;
    }
  };
  var monadIdentity = {
    Applicative0: function() {
      return applicativeIdentity;
    },
    Bind1: function() {
      return bindIdentity;
    }
  };

  // output/Data.Tuple/index.js
  var Tuple = /* @__PURE__ */ function() {
    function Tuple2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Tuple2.create = function(value0) {
      return function(value1) {
        return new Tuple2(value0, value1);
      };
    };
    return Tuple2;
  }();
  var snd = function(v) {
    return v.value1;
  };
  var fst = function(v) {
    return v.value0;
  };

  // output/Unsafe.Coerce/foreign.js
  var unsafeCoerce2 = function(x) {
    return x;
  };

  // output/Safe.Coerce/index.js
  var coerce = function() {
    return unsafeCoerce2;
  };

  // output/Data.Newtype/index.js
  var unwrap = coerce;

  // output/Control.Monad.Reader.Trans/index.js
  var ReaderT = function(x) {
    return x;
  };
  var mapReaderT = function(f) {
    return function(v) {
      return function($64) {
        return f(v($64));
      };
    };
  };
  var functorReaderT = function(dictFunctor) {
    return {
      map: function() {
        var $65 = map(dictFunctor);
        return function($66) {
          return mapReaderT($65($66));
        };
      }()
    };
  };
  var applyReaderT = function(dictApply) {
    return {
      apply: function(v) {
        return function(v1) {
          return function(r) {
            return apply(dictApply)(v(r))(v1(r));
          };
        };
      },
      Functor0: function() {
        return functorReaderT(dictApply.Functor0());
      }
    };
  };
  var bindReaderT = function(dictBind) {
    return {
      bind: function(v) {
        return function(k) {
          return function(r) {
            return bind(dictBind)(v(r))(function(a) {
              var v1 = k(a);
              return v1(r);
            });
          };
        };
      },
      Apply0: function() {
        return applyReaderT(dictBind.Apply0());
      }
    };
  };
  var applicativeReaderT = function(dictApplicative) {
    return {
      pure: function() {
        var $70 = pure(dictApplicative);
        return function($71) {
          return ReaderT($$const($70($71)));
        };
      }(),
      Apply0: function() {
        return applyReaderT(dictApplicative.Apply0());
      }
    };
  };
  var monadReaderT = function(dictMonad) {
    return {
      Applicative0: function() {
        return applicativeReaderT(dictMonad.Applicative0());
      },
      Bind1: function() {
        return bindReaderT(dictMonad.Bind1());
      }
    };
  };
  var monadAskReaderT = function(dictMonad) {
    return {
      ask: pure(dictMonad.Applicative0()),
      Monad0: function() {
        return monadReaderT(dictMonad);
      }
    };
  };

  // output/Control.Monad.Reader/index.js
  var runReader = function(v) {
    var $2 = unwrap();
    return function($3) {
      return $2(v($3));
    };
  };

  // output/Data.Array/foreign.js
  var range = function(start) {
    return function(end) {
      var step = start > end ? -1 : 1;
      var result = new Array(step * (end - start) + 1);
      var i = start, n = 0;
      while (i !== end) {
        result[n++] = i;
        i += step;
      }
      result[n] = i;
      return result;
    };
  };
  var replicateFill = function(count) {
    return function(value) {
      if (count < 1) {
        return [];
      }
      var result = new Array(count);
      return result.fill(value);
    };
  };
  var replicatePolyfill = function(count) {
    return function(value) {
      var result = [];
      var n = 0;
      for (var i = 0; i < count; i++) {
        result[n++] = value;
      }
      return result;
    };
  };
  var replicate = typeof Array.prototype.fill === "function" ? replicateFill : replicatePolyfill;
  var fromFoldableImpl = function() {
    function Cons(head2, tail2) {
      this.head = head2;
      this.tail = tail2;
    }
    var emptyList = {};
    function curryCons(head2) {
      return function(tail2) {
        return new Cons(head2, tail2);
      };
    }
    function listToArray(list) {
      var result = [];
      var count = 0;
      var xs = list;
      while (xs !== emptyList) {
        result[count++] = xs.head;
        xs = xs.tail;
      }
      return result;
    }
    return function(foldr2) {
      return function(xs) {
        return listToArray(foldr2(curryCons)(emptyList)(xs));
      };
    };
  }();
  var length = function(xs) {
    return xs.length;
  };
  var unconsImpl = function(empty2) {
    return function(next) {
      return function(xs) {
        return xs.length === 0 ? empty2({}) : next(xs[0])(xs.slice(1));
      };
    };
  };
  var indexImpl = function(just) {
    return function(nothing) {
      return function(xs) {
        return function(i) {
          return i < 0 || i >= xs.length ? nothing : just(xs[i]);
        };
      };
    };
  };
  var reverse = function(l) {
    return l.slice().reverse();
  };
  var concat = function(xss) {
    if (xss.length <= 1e4) {
      return Array.prototype.concat.apply([], xss);
    }
    var result = [];
    for (var i = 0, l = xss.length; i < l; i++) {
      var xs = xss[i];
      for (var j = 0, m = xs.length; j < m; j++) {
        result.push(xs[j]);
      }
    }
    return result;
  };
  var sortByImpl = function() {
    function mergeFromTo(compare2, fromOrdering, xs1, xs2, from2, to) {
      var mid;
      var i;
      var j;
      var k;
      var x;
      var y;
      var c;
      mid = from2 + (to - from2 >> 1);
      if (mid - from2 > 1)
        mergeFromTo(compare2, fromOrdering, xs2, xs1, from2, mid);
      if (to - mid > 1)
        mergeFromTo(compare2, fromOrdering, xs2, xs1, mid, to);
      i = from2;
      j = mid;
      k = from2;
      while (i < mid && j < to) {
        x = xs2[i];
        y = xs2[j];
        c = fromOrdering(compare2(x)(y));
        if (c > 0) {
          xs1[k++] = y;
          ++j;
        } else {
          xs1[k++] = x;
          ++i;
        }
      }
      while (i < mid) {
        xs1[k++] = xs2[i++];
      }
      while (j < to) {
        xs1[k++] = xs2[j++];
      }
    }
    return function(compare2) {
      return function(fromOrdering) {
        return function(xs) {
          var out;
          if (xs.length < 2)
            return xs;
          out = xs.slice(0);
          mergeFromTo(compare2, fromOrdering, out, xs.slice(0), 0, xs.length);
          return out;
        };
      };
    };
  }();
  var slice = function(s) {
    return function(e2) {
      return function(l) {
        return l.slice(s, e2);
      };
    };
  };
  var zipWith = function(f) {
    return function(xs) {
      return function(ys) {
        var l = xs.length < ys.length ? xs.length : ys.length;
        var result = new Array(l);
        for (var i = 0; i < l; i++) {
          result[i] = f(xs[i])(ys[i]);
        }
        return result;
      };
    };
  };

  // output/Data.Array.ST/foreign.js
  var sortByImpl2 = function() {
    function mergeFromTo(compare2, fromOrdering, xs1, xs2, from2, to) {
      var mid;
      var i;
      var j;
      var k;
      var x;
      var y;
      var c;
      mid = from2 + (to - from2 >> 1);
      if (mid - from2 > 1)
        mergeFromTo(compare2, fromOrdering, xs2, xs1, from2, mid);
      if (to - mid > 1)
        mergeFromTo(compare2, fromOrdering, xs2, xs1, mid, to);
      i = from2;
      j = mid;
      k = from2;
      while (i < mid && j < to) {
        x = xs2[i];
        y = xs2[j];
        c = fromOrdering(compare2(x)(y));
        if (c > 0) {
          xs1[k++] = y;
          ++j;
        } else {
          xs1[k++] = x;
          ++i;
        }
      }
      while (i < mid) {
        xs1[k++] = xs2[i++];
      }
      while (j < to) {
        xs1[k++] = xs2[j++];
      }
    }
    return function(compare2) {
      return function(fromOrdering) {
        return function(xs) {
          return function() {
            if (xs.length < 2)
              return xs;
            mergeFromTo(compare2, fromOrdering, xs, xs.slice(0), 0, xs.length);
            return xs;
          };
        };
      };
    };
  }();

  // output/Data.Foldable/foreign.js
  var foldrArray = function(f) {
    return function(init) {
      return function(xs) {
        var acc = init;
        var len = xs.length;
        for (var i = len - 1; i >= 0; i--) {
          acc = f(xs[i])(acc);
        }
        return acc;
      };
    };
  };
  var foldlArray = function(f) {
    return function(init) {
      return function(xs) {
        var acc = init;
        var len = xs.length;
        for (var i = 0; i < len; i++) {
          acc = f(acc)(xs[i]);
        }
        return acc;
      };
    };
  };

  // output/Data.Foldable/index.js
  var foldr = function(dict) {
    return dict.foldr;
  };
  var foldMapDefaultR = function(dictFoldable) {
    return function(dictMonoid) {
      return function(f) {
        return foldr(dictFoldable)(function(x) {
          return function(acc) {
            return append(dictMonoid.Semigroup0())(f(x))(acc);
          };
        })(mempty(dictMonoid));
      };
    };
  };
  var foldableArray = {
    foldr: foldrArray,
    foldl: foldlArray,
    foldMap: function(dictMonoid) {
      return foldMapDefaultR(foldableArray)(dictMonoid);
    }
  };

  // output/Data.Traversable/foreign.js
  var traverseArrayImpl = function() {
    function array1(a) {
      return [a];
    }
    function array2(a) {
      return function(b) {
        return [a, b];
      };
    }
    function array3(a) {
      return function(b) {
        return function(c) {
          return [a, b, c];
        };
      };
    }
    function concat2(xs) {
      return function(ys) {
        return xs.concat(ys);
      };
    }
    return function(apply2) {
      return function(map2) {
        return function(pure2) {
          return function(f) {
            return function(array) {
              function go(bot, top2) {
                switch (top2 - bot) {
                  case 0:
                    return pure2([]);
                  case 1:
                    return map2(array1)(f(array[bot]));
                  case 2:
                    return apply2(map2(array2)(f(array[bot])))(f(array[bot + 1]));
                  case 3:
                    return apply2(apply2(map2(array3)(f(array[bot])))(f(array[bot + 1])))(f(array[bot + 2]));
                  default:
                    var pivot = bot + Math.floor((top2 - bot) / 4) * 2;
                    return apply2(map2(concat2)(go(bot, pivot)))(go(pivot, top2));
                }
              }
              return go(0, array.length);
            };
          };
        };
      };
    };
  }();

  // output/Data.Traversable/index.js
  var traverse = function(dict) {
    return dict.traverse;
  };
  var sequenceDefault = function(dictTraversable) {
    return function(dictApplicative) {
      return traverse(dictTraversable)(dictApplicative)(identity(categoryFn));
    };
  };
  var traversableArray = {
    traverse: function(dictApplicative) {
      return traverseArrayImpl(apply(dictApplicative.Apply0()))(map(dictApplicative.Apply0().Functor0()))(pure(dictApplicative));
    },
    sequence: function(dictApplicative) {
      return sequenceDefault(traversableArray)(dictApplicative);
    },
    Functor0: function() {
      return functorArray;
    },
    Foldable1: function() {
      return foldableArray;
    }
  };
  var sequence = function(dict) {
    return dict.sequence;
  };

  // output/Data.Unfoldable/foreign.js
  var unfoldrArrayImpl = function(isNothing2) {
    return function(fromJust2) {
      return function(fst2) {
        return function(snd2) {
          return function(f) {
            return function(b) {
              var result = [];
              var value = b;
              while (true) {
                var maybe2 = f(value);
                if (isNothing2(maybe2))
                  return result;
                var tuple = fromJust2(maybe2);
                result.push(fst2(tuple));
                value = snd2(tuple);
              }
            };
          };
        };
      };
    };
  };

  // output/Data.Unfoldable1/foreign.js
  var unfoldr1ArrayImpl = function(isNothing2) {
    return function(fromJust2) {
      return function(fst2) {
        return function(snd2) {
          return function(f) {
            return function(b) {
              var result = [];
              var value = b;
              while (true) {
                var tuple = f(value);
                result.push(fst2(tuple));
                var maybe2 = snd2(tuple);
                if (isNothing2(maybe2))
                  return result;
                value = fromJust2(maybe2);
              }
            };
          };
        };
      };
    };
  };

  // output/Data.Unfoldable1/index.js
  var unfoldable1Array = {
    unfoldr1: /* @__PURE__ */ unfoldr1ArrayImpl(isNothing)(/* @__PURE__ */ fromJust())(fst)(snd)
  };

  // output/Data.Unfoldable/index.js
  var unfoldr = function(dict) {
    return dict.unfoldr;
  };
  var unfoldableArray = {
    unfoldr: /* @__PURE__ */ unfoldrArrayImpl(isNothing)(/* @__PURE__ */ fromJust())(fst)(snd),
    Unfoldable10: function() {
      return unfoldable1Array;
    }
  };

  // output/Data.Array/index.js
  var tail = /* @__PURE__ */ function() {
    return unconsImpl($$const(Nothing.value))(function(v) {
      return function(xs) {
        return new Just(xs);
      };
    });
  }();
  var singleton2 = function(a) {
    return [a];
  };
  var $$null = function(xs) {
    return length(xs) === 0;
  };
  var index = /* @__PURE__ */ function() {
    return indexImpl(Just.create)(Nothing.value);
  }();
  var span = function(p) {
    return function(arr) {
      var go = function($copy_i) {
        var $tco_done = false;
        var $tco_result;
        function $tco_loop(i) {
          var v = index(arr)(i);
          if (v instanceof Just) {
            var $64 = p(v.value0);
            if ($64) {
              $copy_i = i + 1 | 0;
              return;
            }
            ;
            $tco_done = true;
            return new Just(i);
          }
          ;
          if (v instanceof Nothing) {
            $tco_done = true;
            return Nothing.value;
          }
          ;
          throw new Error("Failed pattern match at Data.Array (line 964, column 5 - line 966, column 25): " + [v.constructor.name]);
        }
        ;
        while (!$tco_done) {
          $tco_result = $tco_loop($copy_i);
        }
        ;
        return $tco_result;
      };
      var breakIndex = go(0);
      if (breakIndex instanceof Just && breakIndex.value0 === 0) {
        return {
          init: [],
          rest: arr
        };
      }
      ;
      if (breakIndex instanceof Just) {
        return {
          init: slice(0)(breakIndex.value0)(arr),
          rest: slice(breakIndex.value0)(length(arr))(arr)
        };
      }
      ;
      if (breakIndex instanceof Nothing) {
        return {
          init: arr,
          rest: []
        };
      }
      ;
      throw new Error("Failed pattern match at Data.Array (line 951, column 3 - line 957, column 30): " + [breakIndex.constructor.name]);
    };
  };
  var head = function(xs) {
    return index(xs)(0);
  };
  var dropWhile = function(p) {
    return function(xs) {
      return span(p)(xs).rest;
    };
  };
  var cons2 = function(x) {
    return function(xs) {
      return append(semigroupArray)([x])(xs);
    };
  };
  var concatMap = /* @__PURE__ */ flip(/* @__PURE__ */ bind(bindArray));
  var mapMaybe = function(f) {
    return concatMap(function() {
      var $99 = maybe([])(singleton2);
      return function($100) {
        return $99(f($100));
      };
    }());
  };
  var catMaybes = /* @__PURE__ */ mapMaybe(/* @__PURE__ */ identity(categoryFn));

  // output/Data.Int/foreign.js
  var fromNumberImpl = function(just) {
    return function(nothing) {
      return function(n) {
        return (n | 0) === n ? just(n) : nothing;
      };
    };
  };
  var toNumber2 = function(n) {
    return n;
  };

  // output/Data.Number/foreign.js
  var isFiniteImpl = isFinite;
  var floor2 = Math.floor;

  // output/Data.Int/index.js
  var fromNumber2 = /* @__PURE__ */ function() {
    return fromNumberImpl(Just.create)(Nothing.value);
  }();
  var unsafeClamp = function(x) {
    if (!isFiniteImpl(x)) {
      return 0;
    }
    ;
    if (x >= toNumber2(top(boundedInt))) {
      return top(boundedInt);
    }
    ;
    if (x <= toNumber2(bottom(boundedInt))) {
      return bottom(boundedInt);
    }
    ;
    if (otherwise) {
      return fromMaybe(0)(fromNumber2(x));
    }
    ;
    throw new Error("Failed pattern match at Data.Int (line 72, column 1 - line 72, column 29): " + [x.constructor.name]);
  };
  var floor3 = function($25) {
    return unsafeClamp(floor2($25));
  };

  // output/Data.String.Utils/foreign.js
  function fromCharArrayImpl(array) {
    return array.join("");
  }
  function wordsImpl(s) {
    return s.split(/[\u000a-\u000d\u0085\u2028\u2029\u0009\u0020\u00a0\u1680\u2000-\u200a\u202f\u205f\u3000]+/);
  }

  // output/Data.String.CodePoints/foreign.js
  var hasArrayFrom = typeof Array.from === "function";
  var hasStringIterator = typeof Symbol !== "undefined" && Symbol != null && typeof Symbol.iterator !== "undefined" && typeof String.prototype[Symbol.iterator] === "function";
  var hasFromCodePoint = typeof String.prototype.fromCodePoint === "function";
  var hasCodePointAt = typeof String.prototype.codePointAt === "function";
  var _unsafeCodePointAt0 = function(fallback) {
    return hasCodePointAt ? function(str) {
      return str.codePointAt(0);
    } : fallback;
  };
  var _fromCodePointArray = function(singleton4) {
    return hasFromCodePoint ? function(cps) {
      if (cps.length < 1e4) {
        return String.fromCodePoint.apply(String, cps);
      }
      return cps.map(singleton4).join("");
    } : function(cps) {
      return cps.map(singleton4).join("");
    };
  };
  var _toCodePointArray = function(fallback) {
    return function(unsafeCodePointAt02) {
      if (hasArrayFrom) {
        return function(str) {
          return Array.from(str, unsafeCodePointAt02);
        };
      }
      return fallback;
    };
  };

  // output/Data.Enum/foreign.js
  function toCharCode(c) {
    return c.charCodeAt(0);
  }
  function fromCharCode(c) {
    return String.fromCharCode(c);
  }

  // output/Data.Enum/index.js
  var toEnum = function(dict) {
    return dict.toEnum;
  };
  var fromEnum = function(dict) {
    return dict.fromEnum;
  };
  var toEnumWithDefaults = function(dictBoundedEnum) {
    return function(low) {
      return function(high) {
        return function(x) {
          var v = toEnum(dictBoundedEnum)(x);
          if (v instanceof Just) {
            return v.value0;
          }
          ;
          if (v instanceof Nothing) {
            var $54 = x < fromEnum(dictBoundedEnum)(bottom(dictBoundedEnum.Bounded0()));
            if ($54) {
              return low;
            }
            ;
            return high;
          }
          ;
          throw new Error("Failed pattern match at Data.Enum (line 158, column 33 - line 160, column 62): " + [v.constructor.name]);
        };
      };
    };
  };
  var defaultSucc = function(toEnum$prime) {
    return function(fromEnum$prime) {
      return function(a) {
        return toEnum$prime(fromEnum$prime(a) + 1 | 0);
      };
    };
  };
  var defaultPred = function(toEnum$prime) {
    return function(fromEnum$prime) {
      return function(a) {
        return toEnum$prime(fromEnum$prime(a) - 1 | 0);
      };
    };
  };
  var charToEnum = function(v) {
    if (v >= bottom(boundedInt) && v <= top(boundedInt)) {
      return new Just(fromCharCode(v));
    }
    ;
    return Nothing.value;
  };
  var enumChar = {
    succ: /* @__PURE__ */ defaultSucc(charToEnum)(toCharCode),
    pred: /* @__PURE__ */ defaultPred(charToEnum)(toCharCode),
    Ord0: function() {
      return ordChar;
    }
  };
  var boundedEnumChar = /* @__PURE__ */ function() {
    return {
      cardinality: toCharCode(top(boundedChar)) - toCharCode(bottom(boundedChar)) | 0,
      toEnum: charToEnum,
      fromEnum: toCharCode,
      Bounded0: function() {
        return boundedChar;
      },
      Enum1: function() {
        return enumChar;
      }
    };
  }();

  // output/Data.String.CodeUnits/foreign.js
  var singleton3 = function(c) {
    return c;
  };
  var length2 = function(s) {
    return s.length;
  };
  var drop = function(n) {
    return function(s) {
      return s.substring(n);
    };
  };

  // output/Data.String.Unsafe/foreign.js
  var charAt = function(i) {
    return function(s) {
      if (i >= 0 && i < s.length)
        return s.charAt(i);
      throw new Error("Data.String.Unsafe.charAt: Invalid index.");
    };
  };

  // output/Data.String.Common/foreign.js
  var toUpper = function(s) {
    return s.toUpperCase();
  };
  var joinWith = function(s) {
    return function(xs) {
      return xs.join(s);
    };
  };

  // output/Data.String.CodePoints/index.js
  var CodePoint = function(x) {
    return x;
  };
  var unsurrogate = function(lead) {
    return function(trail) {
      return (((lead - 55296 | 0) * 1024 | 0) + (trail - 56320 | 0) | 0) + 65536 | 0;
    };
  };
  var isTrail = function(cu) {
    return 56320 <= cu && cu <= 57343;
  };
  var isLead = function(cu) {
    return 55296 <= cu && cu <= 56319;
  };
  var uncons = function(s) {
    var v = length2(s);
    if (v === 0) {
      return Nothing.value;
    }
    ;
    if (v === 1) {
      return new Just({
        head: fromEnum(boundedEnumChar)(charAt(0)(s)),
        tail: ""
      });
    }
    ;
    var cu1 = fromEnum(boundedEnumChar)(charAt(1)(s));
    var cu0 = fromEnum(boundedEnumChar)(charAt(0)(s));
    var $21 = isLead(cu0) && isTrail(cu1);
    if ($21) {
      return new Just({
        head: unsurrogate(cu0)(cu1),
        tail: drop(2)(s)
      });
    }
    ;
    return new Just({
      head: cu0,
      tail: drop(1)(s)
    });
  };
  var unconsButWithTuple = function(s) {
    return map(functorMaybe)(function(v) {
      return new Tuple(v.head, v.tail);
    })(uncons(s));
  };
  var toCodePointArrayFallback = function(s) {
    return unfoldr(unfoldableArray)(unconsButWithTuple)(s);
  };
  var unsafeCodePointAt0Fallback = function(s) {
    var cu0 = fromEnum(boundedEnumChar)(charAt(0)(s));
    var $25 = isLead(cu0) && length2(s) > 1;
    if ($25) {
      var cu1 = fromEnum(boundedEnumChar)(charAt(1)(s));
      var $26 = isTrail(cu1);
      if ($26) {
        return unsurrogate(cu0)(cu1);
      }
      ;
      return cu0;
    }
    ;
    return cu0;
  };
  var unsafeCodePointAt0 = /* @__PURE__ */ _unsafeCodePointAt0(unsafeCodePointAt0Fallback);
  var toCodePointArray = /* @__PURE__ */ _toCodePointArray(toCodePointArrayFallback)(unsafeCodePointAt0);
  var fromCharCode2 = /* @__PURE__ */ function() {
    var $53 = toEnumWithDefaults(boundedEnumChar)(bottom(boundedChar))(top(boundedChar));
    return function($54) {
      return singleton3($53($54));
    };
  }();
  var singletonFallback = function(v) {
    if (v <= 65535) {
      return fromCharCode2(v);
    }
    ;
    var lead = div(euclideanRingInt)(v - 65536 | 0)(1024) + 55296 | 0;
    var trail = mod(euclideanRingInt)(v - 65536 | 0)(1024) + 56320 | 0;
    return fromCharCode2(lead) + fromCharCode2(trail);
  };
  var fromCodePointArray = /* @__PURE__ */ _fromCodePointArray(singletonFallback);
  var eqCodePoint = {
    eq: function(x) {
      return function(y) {
        return x === y;
      };
    }
  };
  var codePointFromChar = /* @__PURE__ */ function() {
    var $55 = fromEnum(boundedEnumChar);
    return function($56) {
      return CodePoint($55($56));
    };
  }();

  // output/Data.String.Utils/index.js
  var words = function(s) {
    return wordsImpl(s);
  };
  var fromCharArray2 = function(arr) {
    return fromCharArrayImpl(arr);
  };

  // output/Data.Char/index.js
  var fromCharCode3 = /* @__PURE__ */ toEnum(boundedEnumChar);

  // output/NumberSystems.NumberSystem/index.js
  var MkNumberSystem = /* @__PURE__ */ function() {
    function MkNumberSystem2(value0) {
      this.value0 = value0;
    }
    ;
    MkNumberSystem2.create = function(value0) {
      return new MkNumberSystem2(value0);
    };
    return MkNumberSystem2;
  }();
  var digitSuffixes = function(v) {
    return v.value0.digitSuffixes;
  };
  var digitNames = function(v) {
    return v.value0.digitNames;
  };
  var alphabet = function(v) {
    return v.value0.alphabet;
  };

  // output/NumberSystems.Names/index.js
  var toArgamCharacter = function(alphabet2) {
    return function(n) {
      var v = index(alphabet2)(n);
      if (v instanceof Nothing) {
        return "?";
      }
      ;
      if (v instanceof Just) {
        return v.value0;
      }
      ;
      throw new Error("Failed pattern match at NumberSystems.Names (line 42, column 31 - line 44, column 14): " + [v.constructor.name]);
    };
  };
  var makePUAAlphabet = function(b) {
    var f = function($6) {
      return fromCharCode3(function(x) {
        return x + 57344 | 0;
      }($6));
    };
    return map(functorArray)(singleton3)(catMaybes(map(functorArray)(f)(range(0)(b))));
  };
  var combineSuffix = function(prefix) {
    return function(v) {
      if (v === "") {
        return prefix;
      }
      ;
      var suffix$prime = toCodePointArray(v);
      var rprefix = reverse(toCodePointArray(prefix));
      var trimletter = fromMaybe(codePointFromChar("?"))(head(rprefix));
      var trimmedSuffix = fromCodePointArray(cons2(trimletter)(dropWhile(function(x) {
        return eq(eqCodePoint)(x)(trimletter);
      })(suffix$prime)));
      var trimmedPrefix = fromCodePointArray(reverse(dropWhile(function(x) {
        return eq(eqCodePoint)(x)(trimletter);
      })(rprefix)));
      return trimmedPrefix + trimmedSuffix;
    };
  };
  var makeSuffixesFromDigits = function(digits) {
    return function(suffix) {
      return map(functorArray)(flip(combineSuffix)(suffix))(fromMaybe([])(tail(digits)));
    };
  };
  var nameSingleDigit = function(base) {
    return function(value) {
      return function(suffixIndex) {
        return bind(bindReaderT(bindIdentity))(ask(monadAskReaderT(monadIdentity)))(function(ns) {
          var suffix = fromMaybe("unnamed")(index(digitSuffixes(ns))(suffixIndex));
          var digitName = fromMaybe("unnamed")(index(digitNames(ns))(value));
          return pure(applicativeReaderT(applicativeIdentity))(combineSuffix(digitName)(suffix));
        });
      };
    };
  };

  // output/Utils.String/index.js
  var unwords = /* @__PURE__ */ joinWith(" ");
  var capitalize = function(str) {
    var v = uncons(str);
    if (v instanceof Just) {
      return toUpper(fromCodePointArray([v.value0.head])) + v.value0.tail;
    }
    ;
    return str;
  };
  var titleJoin = /* @__PURE__ */ function() {
    var $3 = map(functorArray)(capitalize);
    return function($4) {
      return unwords($3($4));
    };
  }();

  // output/NumberSystems/index.js
  var BaseRepresentation = /* @__PURE__ */ function() {
    function BaseRepresentation2(value0, value1, value2, value3) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value2;
      this.value3 = value3;
    }
    ;
    BaseRepresentation2.create = function(value0) {
      return function(value1) {
        return function(value2) {
          return function(value3) {
            return new BaseRepresentation2(value0, value1, value2, value3);
          };
        };
      };
    };
    return BaseRepresentation2;
  }();
  var toInteger = function($38) {
    return floor3(toNumber($38));
  };
  var showBaseRepresentation = {
    show: function(v) {
      return show(showInt)(v.value0) + (" " + (show(showBoolean)(v.value1) + (" " + (show(showArray(showInt))(v.value2) + (" " + show(showArray(showInt))(v.value3))))));
    }
  };
  var maxDecimalPlaces = 20;
  var toBase = function(base) {
    return function(n) {
      var n$prime = abs(n);
      var i = floor(n$prime);
      var f = sub(ringDecimal)(n$prime)(i);
      var base$prime = fromInt(base);
      var handleFractionalPart$prime = function(v) {
        return function(v1) {
          if (v1 === 0) {
            return [];
          }
          ;
          var x$prime = mul(semiringDecimal)(v)(base$prime);
          var d = floor(x$prime);
          var m = sub(ringDecimal)(x$prime)(d);
          return cons2(toInteger(d))(handleFractionalPart$prime(m)(v1 - 1 | 0));
        };
      };
      var handleFractionalPart = function(x) {
        return function(dp) {
          return reverse(dropWhile(function(y) {
            return y === 0;
          })(reverse(handleFractionalPart$prime(x)(dp))));
        };
      };
      var handleIntegerPart$prime = function(x) {
        if (lessThan(ordDecimal)(x)(fromInt(1))) {
          return [];
        }
        ;
        if (otherwise) {
          var m = floor(div(euclideanRingDecimal)(x)(base$prime));
          var d = modulo(x)(base$prime);
          return cons2(toInteger(d))(handleIntegerPart$prime(m));
        }
        ;
        throw new Error("Failed pattern match at NumberSystems (line 53, column 3 - line 59, column 32): " + [x.constructor.name]);
      };
      var handleIntegerPart = function(x) {
        var $13 = eq(eqDecimal)(x)(fromInt(0));
        if ($13) {
          return [0];
        }
        ;
        return reverse(handleIntegerPart$prime(x));
      };
      return new BaseRepresentation(base, greaterThanOrEq(ordDecimal)(n)(fromInt(0)), handleIntegerPart(i), handleFractionalPart(f)(maxDecimalPlaces));
    };
  };
  var baseRepToString = function(v) {
    return bind(bindReaderT(bindIdentity))(map(functorReaderT(functorIdentity))(alphabet)(ask(monadAskReaderT(monadIdentity))))(function(digits) {
      var sign2 = function() {
        if (v.value1) {
          return [];
        }
        ;
        return ["-"];
      }();
      var idigits = map(functorArray)(toArgamCharacter(digits))(v.value2);
      var fdigits = map(functorArray)(toArgamCharacter(digits))(v.value3);
      var dp = function() {
        var $18 = $$null(fdigits);
        if ($18) {
          return [];
        }
        ;
        return ["."];
      }();
      var biglist = concat([sign2, idigits, dp, fdigits]);
      return pure(applicativeReaderT(applicativeIdentity))(fromCharArray2(biglist));
    });
  };
  var convertToNumberSystem = function(ns) {
    return function(base) {
      return function(x) {
        if (notEq(eqDecimal)(x)(x)) {
          return "NaN";
        }
        ;
        if (!isFinite2(x)) {
          var $26 = greaterThan(ordDecimal)(x)(fromInt(0));
          if ($26) {
            return "\u221E";
          }
          ;
          return "-\u221E";
        }
        ;
        if (otherwise) {
          return runReader(baseRepToString(toBase(base)(x)))(ns);
        }
        ;
        throw new Error("Failed pattern match at NumberSystems (line 88, column 1 - line 88, column 66): " + [ns.constructor.name, base.constructor.name, x.constructor.name]);
      };
    };
  };
  var baseRepToName = function(v) {
    return bind(bindReaderT(bindIdentity))(sequence(traversableArray)(applicativeReaderT(applicativeIdentity))(reverse(zipWith(nameSingleDigit(v.value0))(reverse(v.value2))(range(0)(length(v.value2))))))(function(inames) {
      return bind(bindReaderT(bindIdentity))(sequence(traversableArray)(applicativeReaderT(applicativeIdentity))(map(functorArray)(function(x) {
        return nameSingleDigit(v.value0)(x)(0);
      })(v.value3)))(function(fnames) {
        var minus = function() {
          if (v.value1) {
            return [];
          }
          ;
          return ["negative"];
        }();
        var dp = function() {
          var $29 = $$null(v.value3);
          if ($29) {
            return [];
          }
          ;
          return ["point"];
        }();
        var biglist = concat([minus, inames, dp, fnames]);
        return pure(applicativeReaderT(applicativeIdentity))(titleJoin(biglist));
      });
    });
  };
  var nameInNumberSystem = function(ns) {
    return function(base) {
      return function(x) {
        if (notEq(eqDecimal)(x)(x)) {
          return "Not a Number";
        }
        ;
        if (!isFinite2(x)) {
          var $37 = greaterThan(ordDecimal)(x)(fromInt(0));
          if ($37) {
            return "Infinity";
          }
          ;
          return "Negative Infinity";
        }
        ;
        if (otherwise) {
          return runReader(baseRepToName(toBase(base)(x)))(ns);
        }
        ;
        throw new Error("Failed pattern match at NumberSystems (line 106, column 1 - line 106, column 63): " + [ns.constructor.name, base.constructor.name, x.constructor.name]);
      };
    };
  };

  // output/NumberSystems.Systems/index.js
  var computerese = /* @__PURE__ */ function() {
    var n = words("0 1 2 3 4 5 6 7 8 9 A B C D E F G H I J K L M N O P Q R S T U V W X Y Z");
    return new MkNumberSystem({
      name: "Computerese",
      digitNames: n,
      digitSuffixes: [""],
      maxBase: 36,
      alphabet: n
    });
  }();
  var argam = /* @__PURE__ */ function() {
    var n = words("zero one two three four five six seven eight nine dess ell zen thise zeff trick tess zote dine ax score tress dell flore cadex quint dithe trine caven neve kinex sode twive trell dote kineff exent mack dax trithe kinoct lume exeff sill cadell kinove diore foss exoct effent kiness trote cadithe sull exove kinell sevoct trax deve clore shock ark disode senove twex kinithe exell kale cazote triore sevess calse octove scand dimack kinchick catax sevell exithe tite kintess novent dilume van sezzen kinote dill treve octell crome novess sevithe cadore trisode doss kinax ozzen mang seneff novell kent ferr exote cobe octithe setrick disull nick catrine cupe desell trimack setess zinn exax kinore caneve novithe diclore sevote hund ellent diark trilume casode kincue disenove gall tweven trisill desithe gerr ellzen sevax dikale kintrine octote arsen exore selene dezeff tross dalse ellithe zenent kineve discand sentress camack brome exquint krypt octax novote ellzeff kinsode zenithe rube dite trisull kintwive seflore extrine stron calume trikinell divan yttr zenzeff thisent dessote novax casill zirc exeve sequint elltess triclore dicrome niobe zenchick molyb thizeff triark offlore kinmack exsode ellote cafoss setrine dessax technes zentess ruthe dimang trickithe zeffent rhode elldine pallade descore trikale diferr seneve zenote kinlume dicobe noveflore thitess ellax kinexeff argene cadsull trialse dinick kinsill excue sesode dicupe triscand cadkinell thiote exmack cadme setwive trickent dinn inde zenax stann desore trisevell octeve stibbe thidine kinoss caclore trite zeffote tellure trikintess iode elldell novetrine cadark effinkin exume thiax octsode trivan desquint xeen exineff ellore digall trickote tweight caese exill semack cadkinithe noneve digerr bare cadexell kinsull zeffax tricrome cakale lanthe destrine cere tessote trisevithe diarsen ellquint zenore prase diselene novesode kinsevoct neo exfoss prome cacalse trikinax thidell selume novetwive zotent desneve trimang cascand samare effinex kinclore octmack elltrine dibrome thiore zenquint sesill dikrypt triferr tessax kinark dinovote europ cadsevell tricobe desode gadole cadexithe terbe dirube kinsenove catite dyss exsull ellneve kintwex trinick zefflore zotax dinent thiquint distron tricupe octlume sefoss kinexell holme cadvan novemack ditt kinkale testress erbe thidithe trinn cadkinote ellsode dinovax effcue octsill trikinore dirc thume zeneve ytterb kinsevess thitrine elltwive lute exclore kincalse cacrome trisevote diobe hafne kinoctove axent dimolyb elltrell cadsevithe kinscand exark tante tessore novelume desmack sesull zensode wolfre dellote chickquint octfoss thineve zeftrine rhene cadkinax trigall ditechnes osme tritweven kinsevell diruthe novesill camang iride kinexithe zotore effinoct trigerr dirhode kintite exinell platt dipallade trisevax scorent aure exkale thisode caferr novinkin zeffneve ellmack cadexote hyde deslume triarsen cacobe seclore dinoveflore kinvan thitwive triselene axdell thule kinsezzen plumb diargene novefoss octsull zotquint exalse sevark canick thitrell dessill biss testrine polone zeffsode trikineve cacupe axore exscand aste kinoctell tressent thidote nite zenmack kincrome dicadme tribrome setwex fran kinovess ellume cazinn trikrypt dyinde kinsevithe cadexax rade distann zotrine cadkinore acte exsevell thor tesseve trikinsode distibbe prote exinithe sekale desfoss trirube octclore ellsill extite axquint cadsevote novesull ditellure urane kinozzen thimack dyiode triseflore dellent kinmang dinovetrine nept octark tristron");
    return new MkNumberSystem({
      name: "Argam",
      digitNames: n,
      digitSuffixes: append(semigroupArray)(["", "ta", "un", "zand", ""])(map(functorArray)(function(x) {
        return "-" + x;
      })(makeSuffixesFromDigits(n)("lion"))),
      maxBase: 480,
      alphabet: makePUAAlphabet(480)
    });
  }();

  // output/TestPurescript/index.js
  var main = function __do() {
    initArgam();
    var d = fromJust()(fromString("-123456789.2347823470000000000000001"));
    log(show(showDecimal)(d))();
    log(show(showBaseRepresentation)(toBase(10)(d)))();
    log(show(showBaseRepresentation)(toBase(60)(d)))();
    log(show(showString)(convertToNumberSystem(argam)(10)(d)))();
    log(show(showString)(convertToNumberSystem(argam)(60)(d)))();
    log(show(showString)(convertToNumberSystem(argam)(120)(d)))();
    log(show(showString)(convertToNumberSystem(computerese)(10)(d)))();
    return log(show(showString)(nameInNumberSystem(argam)(10)(d)))();
  };

  // <stdin>
  main();
})();
