(() => {
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

  // output/Data.Boolean/index.js
  var otherwise = true;

  // output/Data.Function/index.js
  var flip = function(f) {
    return function(b2) {
      return function(a2) {
        return f(a2)(b2);
      };
    };
  };
  var $$const = function(a2) {
    return function(v) {
      return a2;
    };
  };

  // output/Data.Functor/foreign.js
  var arrayMap = function(f) {
    return function(arr) {
      var l = arr.length;
      var result = new Array(l);
      for (var i2 = 0; i2 < l; i2++) {
        result[i2] = f(arr[i2]);
      }
      return result;
    };
  };

  // output/Data.Unit/foreign.js
  var unit = void 0;

  // output/Data.Functor/index.js
  var map = function(dict) {
    return dict.map;
  };
  var $$void = function(dictFunctor) {
    return map(dictFunctor)($$const(unit));
  };
  var voidLeft = function(dictFunctor) {
    var map18 = map(dictFunctor);
    return function(f) {
      return function(x) {
        return map18($$const(x))(f);
      };
    };
  };
  var voidRight = function(dictFunctor) {
    var map18 = map(dictFunctor);
    return function(x) {
      return map18($$const(x));
    };
  };
  var functorArray = {
    map: arrayMap
  };

  // output/Control.Apply/index.js
  var identity2 = /* @__PURE__ */ identity(categoryFn);
  var apply = function(dict) {
    return dict.apply;
  };
  var applySecond = function(dictApply) {
    var apply1 = apply(dictApply);
    var map18 = map(dictApply.Functor0());
    return function(a2) {
      return function(b2) {
        return apply1(map18($$const(identity2))(a2))(b2);
      };
    };
  };

  // output/Control.Applicative/index.js
  var pure = function(dict) {
    return dict.pure;
  };
  var unless = function(dictApplicative) {
    var pure13 = pure(dictApplicative);
    return function(v) {
      return function(v1) {
        if (!v) {
          return v1;
        }
        ;
        if (v) {
          return pure13(unit);
        }
        ;
        throw new Error("Failed pattern match at Control.Applicative (line 68, column 1 - line 68, column 65): " + [v.constructor.name, v1.constructor.name]);
      };
    };
  };
  var when = function(dictApplicative) {
    var pure13 = pure(dictApplicative);
    return function(v) {
      return function(v1) {
        if (v) {
          return v1;
        }
        ;
        if (!v) {
          return pure13(unit);
        }
        ;
        throw new Error("Failed pattern match at Control.Applicative (line 63, column 1 - line 63, column 63): " + [v.constructor.name, v1.constructor.name]);
      };
    };
  };
  var liftA1 = function(dictApplicative) {
    var apply2 = apply(dictApplicative.Apply0());
    var pure13 = pure(dictApplicative);
    return function(f) {
      return function(a2) {
        return apply2(pure13(f))(a2);
      };
    };
  };

  // output/Control.Bind/index.js
  var discard = function(dict) {
    return dict.discard;
  };
  var bind = function(dict) {
    return dict.bind;
  };
  var bindFlipped = function(dictBind) {
    return flip(bind(dictBind));
  };
  var composeKleisliFlipped = function(dictBind) {
    var bindFlipped12 = bindFlipped(dictBind);
    return function(f) {
      return function(g) {
        return function(a2) {
          return bindFlipped12(f)(g(a2));
        };
      };
    };
  };
  var discardUnit = {
    discard: function(dictBind) {
      return bind(dictBind);
    }
  };

  // output/Control.Monad/index.js
  var unlessM = function(dictMonad) {
    var bind7 = bind(dictMonad.Bind1());
    var unless2 = unless(dictMonad.Applicative0());
    return function(mb) {
      return function(m) {
        return bind7(mb)(function(b2) {
          return unless2(b2)(m);
        });
      };
    };
  };
  var ap = function(dictMonad) {
    var bind7 = bind(dictMonad.Bind1());
    var pure10 = pure(dictMonad.Applicative0());
    return function(f) {
      return function(a2) {
        return bind7(f)(function(f$prime) {
          return bind7(a2)(function(a$prime) {
            return pure10(f$prime(a$prime));
          });
        });
      };
    };
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

  // output/Data.Bounded/foreign.js
  var topChar = String.fromCharCode(65535);
  var bottomChar = String.fromCharCode(0);
  var topNumber = Number.POSITIVE_INFINITY;
  var bottomNumber = Number.NEGATIVE_INFINITY;

  // output/Data.Ord/foreign.js
  var unsafeCompareImpl = function(lt) {
    return function(eq4) {
      return function(gt) {
        return function(x) {
          return function(y) {
            return x < y ? lt : x === y ? eq4 : gt;
          };
        };
      };
    };
  };
  var ordIntImpl = unsafeCompareImpl;
  var ordStringImpl = unsafeCompareImpl;

  // output/Data.Eq/foreign.js
  var refEq = function(r1) {
    return function(r2) {
      return r1 === r2;
    };
  };
  var eqIntImpl = refEq;
  var eqStringImpl = refEq;

  // output/Data.Eq/index.js
  var eqString = {
    eq: eqStringImpl
  };
  var eqInt = {
    eq: eqIntImpl
  };
  var eq = function(dict) {
    return dict.eq;
  };

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

  // output/Data.Semiring/index.js
  var mul = function(dict) {
    return dict.mul;
  };
  var add = function(dict) {
    return dict.add;
  };

  // output/Data.Ring/index.js
  var sub = function(dict) {
    return dict.sub;
  };

  // output/Data.Ord/index.js
  var ordString = /* @__PURE__ */ function() {
    return {
      compare: ordStringImpl(LT.value)(EQ.value)(GT.value),
      Eq0: function() {
        return eqString;
      }
    };
  }();
  var ordInt = /* @__PURE__ */ function() {
    return {
      compare: ordIntImpl(LT.value)(EQ.value)(GT.value),
      Eq0: function() {
        return eqInt;
      }
    };
  }();
  var compare = function(dict) {
    return dict.compare;
  };
  var greaterThanOrEq = function(dictOrd) {
    var compare3 = compare(dictOrd);
    return function(a1) {
      return function(a2) {
        var v = compare3(a1)(a2);
        if (v instanceof LT) {
          return false;
        }
        ;
        return true;
      };
    };
  };
  var lessThan = function(dictOrd) {
    var compare3 = compare(dictOrd);
    return function(a1) {
      return function(a2) {
        var v = compare3(a1)(a2);
        if (v instanceof LT) {
          return true;
        }
        ;
        return false;
      };
    };
  };

  // output/Data.Show/foreign.js
  var showStringImpl = function(s) {
    var l = s.length;
    return '"' + s.replace(
      /[\0-\x1F\x7F"\\]/g,
      function(c, i2) {
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
        var k = i2 + 1;
        var empty7 = k < l && s[k] >= "0" && s[k] <= "9" ? "\\&" : "";
        return "\\" + c.charCodeAt(0).toString(10) + empty7;
      }
    ) + '"';
  };

  // output/Data.Show/index.js
  var showString = {
    show: showStringImpl
  };
  var show = function(dict) {
    return dict.show;
  };

  // output/Data.Maybe/index.js
  var identity3 = /* @__PURE__ */ identity(categoryFn);
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
  var isJust = /* @__PURE__ */ maybe(false)(/* @__PURE__ */ $$const(true));
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
  var map2 = /* @__PURE__ */ map(functorMaybe);
  var fromMaybe = function(a2) {
    return maybe(a2)(identity3);
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
  var applyMaybe = {
    apply: function(v) {
      return function(v1) {
        if (v instanceof Just) {
          return map2(v.value0)(v1);
        }
        ;
        if (v instanceof Nothing) {
          return Nothing.value;
        }
        ;
        throw new Error("Failed pattern match at Data.Maybe (line 67, column 1 - line 69, column 30): " + [v.constructor.name, v1.constructor.name]);
      };
    },
    Functor0: function() {
      return functorMaybe;
    }
  };
  var bindMaybe = {
    bind: function(v) {
      return function(v1) {
        if (v instanceof Just) {
          return v1(v.value0);
        }
        ;
        if (v instanceof Nothing) {
          return Nothing.value;
        }
        ;
        throw new Error("Failed pattern match at Data.Maybe (line 125, column 1 - line 127, column 28): " + [v.constructor.name, v1.constructor.name]);
      };
    },
    Apply0: function() {
      return applyMaybe;
    }
  };

  // output/Data.Either/index.js
  var Left = /* @__PURE__ */ function() {
    function Left2(value0) {
      this.value0 = value0;
    }
    ;
    Left2.create = function(value0) {
      return new Left2(value0);
    };
    return Left2;
  }();
  var Right = /* @__PURE__ */ function() {
    function Right2(value0) {
      this.value0 = value0;
    }
    ;
    Right2.create = function(value0) {
      return new Right2(value0);
    };
    return Right2;
  }();
  var either = function(v) {
    return function(v1) {
      return function(v2) {
        if (v2 instanceof Left) {
          return v(v2.value0);
        }
        ;
        if (v2 instanceof Right) {
          return v1(v2.value0);
        }
        ;
        throw new Error("Failed pattern match at Data.Either (line 208, column 1 - line 208, column 64): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
      };
    };
  };

  // output/Data.Monoid/index.js
  var mempty = function(dict) {
    return dict.mempty;
  };

  // output/Effect/foreign.js
  var pureE = function(a2) {
    return function() {
      return a2;
    };
  };
  var bindE = function(a2) {
    return function(f) {
      return function() {
        return f(a2())();
      };
    };
  };

  // output/Effect/index.js
  var $runtime_lazy = function(name15, moduleName, init2) {
    var state3 = 0;
    var val;
    return function(lineNumber) {
      if (state3 === 2)
        return val;
      if (state3 === 1)
        throw new ReferenceError(name15 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state3 = 1;
      val = init2();
      state3 = 2;
      return val;
    };
  };
  var monadEffect = {
    Applicative0: function() {
      return applicativeEffect;
    },
    Bind1: function() {
      return bindEffect;
    }
  };
  var bindEffect = {
    bind: bindE,
    Apply0: function() {
      return $lazy_applyEffect(0);
    }
  };
  var applicativeEffect = {
    pure: pureE,
    Apply0: function() {
      return $lazy_applyEffect(0);
    }
  };
  var $lazy_functorEffect = /* @__PURE__ */ $runtime_lazy("functorEffect", "Effect", function() {
    return {
      map: liftA1(applicativeEffect)
    };
  });
  var $lazy_applyEffect = /* @__PURE__ */ $runtime_lazy("applyEffect", "Effect", function() {
    return {
      apply: ap(monadEffect),
      Functor0: function() {
        return $lazy_functorEffect(0);
      }
    };
  });
  var functorEffect = /* @__PURE__ */ $lazy_functorEffect(20);

  // output/Effect.Ref/foreign.js
  var _new = function(val) {
    return function() {
      return { value: val };
    };
  };
  var read = function(ref2) {
    return function() {
      return ref2.value;
    };
  };
  var modifyImpl = function(f) {
    return function(ref2) {
      return function() {
        var t = f(ref2.value);
        ref2.value = t.state;
        return t.value;
      };
    };
  };
  var write = function(val) {
    return function(ref2) {
      return function() {
        ref2.value = val;
      };
    };
  };

  // output/Effect.Ref/index.js
  var $$void2 = /* @__PURE__ */ $$void(functorEffect);
  var $$new = _new;
  var modify$prime = modifyImpl;
  var modify = function(f) {
    return modify$prime(function(s) {
      var s$prime = f(s);
      return {
        state: s$prime,
        value: s$prime
      };
    });
  };
  var modify_ = function(f) {
    return function(s) {
      return $$void2(modify(f)(s));
    };
  };

  // output/Control.Monad.Rec.Class/index.js
  var bindFlipped2 = /* @__PURE__ */ bindFlipped(bindEffect);
  var map3 = /* @__PURE__ */ map(functorEffect);
  var Loop = /* @__PURE__ */ function() {
    function Loop2(value0) {
      this.value0 = value0;
    }
    ;
    Loop2.create = function(value0) {
      return new Loop2(value0);
    };
    return Loop2;
  }();
  var Done = /* @__PURE__ */ function() {
    function Done2(value0) {
      this.value0 = value0;
    }
    ;
    Done2.create = function(value0) {
      return new Done2(value0);
    };
    return Done2;
  }();
  var tailRecM = function(dict) {
    return dict.tailRecM;
  };
  var monadRecEffect = {
    tailRecM: function(f) {
      return function(a2) {
        var fromDone = function(v) {
          if (v instanceof Done) {
            return v.value0;
          }
          ;
          throw new Error("Failed pattern match at Control.Monad.Rec.Class (line 137, column 30 - line 137, column 44): " + [v.constructor.name]);
        };
        return function __do4() {
          var r = bindFlipped2($$new)(f(a2))();
          (function() {
            while (!function __do5() {
              var v = read(r)();
              if (v instanceof Loop) {
                var e = f(v.value0)();
                write(e)(r)();
                return false;
              }
              ;
              if (v instanceof Done) {
                return true;
              }
              ;
              throw new Error("Failed pattern match at Control.Monad.Rec.Class (line 128, column 22 - line 133, column 28): " + [v.constructor.name]);
            }()) {
            }
            ;
            return {};
          })();
          return map3(fromDone)(read(r))();
        };
      };
    },
    Monad0: function() {
      return monadEffect;
    }
  };
  var forever = function(dictMonadRec) {
    var tailRecM1 = tailRecM(dictMonadRec);
    var voidRight2 = voidRight(dictMonadRec.Monad0().Bind1().Apply0().Functor0());
    return function(ma) {
      return tailRecM1(function(u2) {
        return voidRight2(new Loop(u2))(ma);
      })(unit);
    };
  };

  // output/Data.HeytingAlgebra/foreign.js
  var boolConj = function(b1) {
    return function(b2) {
      return b1 && b2;
    };
  };
  var boolDisj = function(b1) {
    return function(b2) {
      return b1 || b2;
    };
  };
  var boolNot = function(b2) {
    return !b2;
  };

  // output/Data.HeytingAlgebra/index.js
  var tt = function(dict) {
    return dict.tt;
  };
  var not = function(dict) {
    return dict.not;
  };
  var implies = function(dict) {
    return dict.implies;
  };
  var ff = function(dict) {
    return dict.ff;
  };
  var disj = function(dict) {
    return dict.disj;
  };
  var heytingAlgebraBoolean = {
    ff: false,
    tt: true,
    implies: function(a2) {
      return function(b2) {
        return disj(heytingAlgebraBoolean)(not(heytingAlgebraBoolean)(a2))(b2);
      };
    },
    conj: boolConj,
    disj: boolDisj,
    not: boolNot
  };
  var conj = function(dict) {
    return dict.conj;
  };
  var heytingAlgebraFunction = function(dictHeytingAlgebra) {
    var ff1 = ff(dictHeytingAlgebra);
    var tt1 = tt(dictHeytingAlgebra);
    var implies1 = implies(dictHeytingAlgebra);
    var conj1 = conj(dictHeytingAlgebra);
    var disj1 = disj(dictHeytingAlgebra);
    var not1 = not(dictHeytingAlgebra);
    return {
      ff: function(v) {
        return ff1;
      },
      tt: function(v) {
        return tt1;
      },
      implies: function(f) {
        return function(g) {
          return function(a2) {
            return implies1(f(a2))(g(a2));
          };
        };
      },
      conj: function(f) {
        return function(g) {
          return function(a2) {
            return conj1(f(a2))(g(a2));
          };
        };
      },
      disj: function(f) {
        return function(g) {
          return function(a2) {
            return disj1(f(a2))(g(a2));
          };
        };
      },
      not: function(f) {
        return function(a2) {
          return not1(f(a2));
        };
      }
    };
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
  var functorTuple = {
    map: function(f) {
      return function(m) {
        return new Tuple(m.value0, f(m.value1));
      };
    }
  };
  var fst = function(v) {
    return v.value0;
  };

  // output/Control.Monad.State.Class/index.js
  var state = function(dict) {
    return dict.state;
  };
  var modify_2 = function(dictMonadState) {
    var state1 = state(dictMonadState);
    return function(f) {
      return state1(function(s) {
        return new Tuple(unit, f(s));
      });
    };
  };
  var get = function(dictMonadState) {
    return state(dictMonadState)(function(s) {
      return new Tuple(s, s);
    });
  };

  // output/ExpantaNum/foreign.js
  (function(globalScope) {
    "use strict";
    var ExpantaNum2 = {
      maxOps: 1e3,
      serializeMode: 0,
      debug: 0
    }, external = true, expantaNumError = "[ExpantaNumError] ", invalidArgument = expantaNumError + "Invalid argument: ", isExpantaNum = /^[-\+]*(Infinity|NaN|(J+|J\^\d+ )?(10(\^+|\{[1-9]\d*\})|\(10(\^+|\{[1-9]\d*\})\)\^[1-9]\d* )*((\d+(\.\d*)?|\d*\.\d+)?([Ee][-\+]*))*(0|\d+(\.\d*)?|\d*\.\d+))$/, MAX_SAFE_INTEGER = 9007199254740991, MAX_E = Math.log10(MAX_SAFE_INTEGER), P = {}, Q = {}, R = {};
    R.ZERO = 0;
    R.ONE = 1;
    R.E = Math.E;
    R.LN2 = Math.LN2;
    R.LN10 = Math.LN10;
    R.LOG2E = Math.LOG2E;
    R.LOG10E = Math.LOG10E;
    R.PI = Math.PI;
    R.SQRT1_2 = Math.SQRT1_2;
    R.SQRT2 = Math.SQRT2;
    R.MAX_SAFE_INTEGER = MAX_SAFE_INTEGER;
    R.MIN_SAFE_INTEGER = Number.MIN_SAFE_INTEGER;
    R.NaN = Number.NaN;
    R.NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY;
    R.POSITIVE_INFINITY = Number.POSITIVE_INFINITY;
    R.E_MAX_SAFE_INTEGER = "e" + MAX_SAFE_INTEGER;
    R.EE_MAX_SAFE_INTEGER = "ee" + MAX_SAFE_INTEGER;
    R.TETRATED_MAX_SAFE_INTEGER = "10^^" + MAX_SAFE_INTEGER;
    R.GRAHAMS_NUMBER = "J^63 10^^^(10^)^7625597484984 3638334640023.7783";
    P.absoluteValue = P.abs = function() {
      var x = this.clone();
      x.sign = 1;
      return x;
    };
    Q.absoluteValue = Q.abs = function(x) {
      return new ExpantaNum2(x).abs();
    };
    P.negate = P.neg = function() {
      var x = this.clone();
      x.sign = x.sign * -1;
      return x;
    };
    Q.negate = Q.neg = function(x) {
      return new ExpantaNum2(x).neg();
    };
    P.compareTo = P.cmp = function(other2) {
      if (!(other2 instanceof ExpantaNum2))
        other2 = new ExpantaNum2(other2);
      if (isNaN(this.array[0][1]) || isNaN(other2.array[0][1]))
        return NaN;
      if (this.array[0][1] == Infinity && other2.array[0][1] != Infinity)
        return this.sign;
      if (this.array[0][1] != Infinity && other2.array[0][1] == Infinity)
        return -other2.sign;
      if (this.array.length == 1 && this.array[0][1] === 0 && other2.array.length == 1 && other2.array[0][1] === 0)
        return 0;
      if (this.sign != other2.sign)
        return this.sign;
      var m = this.sign;
      var r;
      if (this.layer > other2.layer)
        r = 1;
      else if (this.layer < other2.layer)
        r = -1;
      else {
        var e, f;
        for (var i2 = 0, l = Math.min(this.array.length, other2.array.length); i2 < l; ++i2) {
          e = this.array[this.array.length - 1 - i2];
          f = other2.array[other2.array.length - 1 - i2];
          if (e[0] > f[0] || e[0] == f[0] && e[1] > f[1]) {
            r = 1;
            break;
          } else if (e[0] < f[0] || e[0] == f[0] && e[1] < f[1]) {
            r = -1;
            break;
          }
        }
        if (r === void 0) {
          if (this.array.length == other2.array.length) {
            r = 0;
          } else if (this.array.length > other2.array.length) {
            e = this.array[this.array.length - l];
            if (e[0] >= 1 || e[1] > 10) {
              r = 1;
            } else {
              r = -1;
            }
          } else {
            e = other2.array[other2.array.length - l];
            if (e[0] >= 1 || e[1] > 10) {
              r = -1;
            } else {
              r = 1;
            }
          }
        }
      }
      return r * m;
    };
    Q.compare = Q.cmp = function(x, y) {
      return new ExpantaNum2(x).cmp(y);
    };
    P.greaterThan = P.gt = function(other2) {
      return this.cmp(other2) > 0;
    };
    Q.greaterThan = Q.gt = function(x, y) {
      return new ExpantaNum2(x).gt(y);
    };
    P.greaterThanOrEqualTo = P.gte = function(other2) {
      return this.cmp(other2) >= 0;
    };
    Q.greaterThanOrEqualTo = Q.gte = function(x, y) {
      return new ExpantaNum2(x).gte(y);
    };
    P.lessThan = P.lt = function(other2) {
      return this.cmp(other2) < 0;
    };
    Q.lessThan = Q.lt = function(x, y) {
      return new ExpantaNum2(x).lt(y);
    };
    P.lessThanOrEqualTo = P.lte = function(other2) {
      return this.cmp(other2) <= 0;
    };
    Q.lessThanOrEqualTo = Q.lte = function(x, y) {
      return new ExpantaNum2(x).lte(y);
    };
    P.equalsTo = P.equal = P.eq = function(other2) {
      return this.cmp(other2) === 0;
    };
    Q.equalsTo = Q.equal = Q.eq = function(x, y) {
      return new ExpantaNum2(x).eq(y);
    };
    P.notEqualsTo = P.notEqual = P.neq = function(other2) {
      return this.cmp(other2) !== 0;
    };
    Q.notEqualsTo = Q.notEqual = Q.neq = function(x, y) {
      return new ExpantaNum2(x).neq(y);
    };
    P.minimum = P.min = function(other2) {
      return this.lt(other2) ? this.clone() : new ExpantaNum2(other2);
    };
    Q.minimum = Q.min = function(x, y) {
      return new ExpantaNum2(x).min(y);
    };
    P.maximum = P.max = function(other2) {
      return this.gt(other2) ? this.clone() : new ExpantaNum2(other2);
    };
    Q.maximum = Q.max = function(x, y) {
      return new ExpantaNum2(x).max(y);
    };
    P.isPositive = P.ispos = function() {
      return this.gt(ExpantaNum2.ZERO);
    };
    Q.isPositive = Q.ispos = function(x) {
      return new ExpantaNum2(x).ispos();
    };
    P.isNegative = P.isneg = function() {
      return this.lt(ExpantaNum2.ZERO);
    };
    Q.isNegative = Q.isneg = function(x) {
      return new ExpantaNum2(x).isneg();
    };
    P.isNaN = function() {
      return isNaN(this.array[0][1]);
    };
    Q.isNaN = function(x) {
      return new ExpantaNum2(x).isNaN();
    };
    P.isFinite = function() {
      return isFinite(this.array[0][1]);
    };
    Q.isFinite = function(x) {
      return new ExpantaNum2(x).isFinite();
    };
    P.isInfinite = function() {
      return this.array[0][1] == Infinity;
    };
    Q.isInfinite = function(x) {
      return new ExpantaNum2(x).isInfinite();
    };
    P.isInteger = P.isint = function() {
      if (this.sign == -1)
        return this.abs().isint();
      if (this.gt(ExpantaNum2.MAX_SAFE_INTEGER))
        return true;
      return Number.isInteger(this.toNumber());
    };
    Q.isInteger = Q.isint = function(x) {
      return new ExpantaNum2(x).isint();
    };
    P.floor = function() {
      if (this.isInteger())
        return this.clone();
      return new ExpantaNum2(Math.floor(this.toNumber()));
    };
    Q.floor = function(x) {
      return new ExpantaNum2(x).floor();
    };
    P.ceiling = P.ceil = function() {
      if (this.isInteger())
        return this.clone();
      return new ExpantaNum2(Math.ceil(this.toNumber()));
    };
    Q.ceiling = Q.ceil = function(x) {
      return new ExpantaNum2(x).ceil();
    };
    P.round = function() {
      if (this.isInteger())
        return this.clone();
      return new ExpantaNum2(Math.round(this.toNumber()));
    };
    Q.round = function(x) {
      return new ExpantaNum2(x).round();
    };
    P.plus = P.add = function(other2) {
      var x = this.clone();
      other2 = new ExpantaNum2(other2);
      if (ExpantaNum2.debug >= ExpantaNum2.NORMAL)
        console.log(this + "+" + other2);
      if (x.sign == -1)
        return x.neg().add(other2.neg()).neg();
      if (other2.sign == -1)
        return x.sub(other2.neg());
      if (x.eq(ExpantaNum2.ZERO))
        return other2;
      if (other2.eq(ExpantaNum2.ZERO))
        return x;
      if (x.isNaN() || other2.isNaN() || x.isInfinite() && other2.isInfinite() && x.eq(other2.neg()))
        return ExpantaNum2.NaN.clone();
      if (x.isInfinite())
        return x;
      if (other2.isInfinite())
        return other2;
      var p2 = x.min(other2);
      var q2 = x.max(other2);
      var op0 = q2.operator(0);
      var op1 = q2.operator(1);
      var t;
      if (q2.gt(ExpantaNum2.E_MAX_SAFE_INTEGER) || q2.div(p2).gt(ExpantaNum2.MAX_SAFE_INTEGER)) {
        t = q2;
      } else if (!op1) {
        t = new ExpantaNum2(x.toNumber() + other2.toNumber());
      } else if (op1 == 1) {
        var a2 = p2.operator(1) ? p2.operator(0) : Math.log10(p2.operator(0));
        t = new ExpantaNum2([a2 + Math.log10(Math.pow(10, op0 - a2) + 1), 1]);
      }
      p2 = q2 = null;
      return t;
    };
    Q.plus = Q.add = function(x, y) {
      return new ExpantaNum2(x).add(y);
    };
    P.minus = P.sub = function(other2) {
      var x = this.clone();
      other2 = new ExpantaNum2(other2);
      if (ExpantaNum2.debug >= ExpantaNum2.NORMAL)
        console.log(x + "-" + other2);
      if (x.sign == -1)
        return x.neg().sub(other2.neg()).neg();
      if (other2.sign == -1)
        return x.add(other2.neg());
      if (x.eq(other2))
        return ExpantaNum2.ZERO.clone();
      if (other2.eq(ExpantaNum2.ZERO))
        return x;
      if (x.isNaN() || other2.isNaN() || x.isInfinite() && other2.isInfinite())
        return ExpantaNum2.NaN.clone();
      if (x.isInfinite())
        return x;
      if (other2.isInfinite())
        return other2.neg();
      var p2 = x.min(other2);
      var q2 = x.max(other2);
      var n = other2.gt(x);
      var op0 = q2.operator(0);
      var op1 = q2.operator(1);
      var t;
      if (q2.gt(ExpantaNum2.E_MAX_SAFE_INTEGER) || q2.div(p2).gt(ExpantaNum2.MAX_SAFE_INTEGER)) {
        t = q2;
        t = n ? t.neg() : t;
      } else if (!op1) {
        t = new ExpantaNum2(x.toNumber() - other2.toNumber());
      } else if (op1 == 1) {
        var a2 = p2.operator(1) ? p2.operator(0) : Math.log10(p2.operator(0));
        t = new ExpantaNum2([a2 + Math.log10(Math.pow(10, op0 - a2) - 1), 1]);
        t = n ? t.neg() : t;
      }
      p2 = q2 = null;
      return t;
    };
    Q.minus = Q.sub = function(x, y) {
      return new ExpantaNum2(x).sub(y);
    };
    P.times = P.mul = function(other2) {
      var x = this.clone();
      other2 = new ExpantaNum2(other2);
      if (ExpantaNum2.debug >= ExpantaNum2.NORMAL)
        console.log(x + "*" + other2);
      if (x.sign * other2.sign == -1)
        return x.abs().mul(other2.abs()).neg();
      if (x.sign == -1)
        return x.abs().mul(other2.abs());
      if (x.isNaN() || other2.isNaN() || x.eq(ExpantaNum2.ZERO) && other2.isInfinite() || x.isInfinite() && other2.abs().eq(ExpantaNum2.ZERO))
        return ExpantaNum2.NaN.clone();
      if (other2.eq(ExpantaNum2.ZERO))
        return ExpantaNum2.ZERO.clone();
      if (other2.eq(ExpantaNum2.ONE))
        return x.clone();
      if (x.isInfinite())
        return x;
      if (other2.isInfinite())
        return other2;
      if (x.max(other2).gt(ExpantaNum2.EE_MAX_SAFE_INTEGER))
        return x.max(other2);
      var n = x.toNumber() * other2.toNumber();
      if (n <= MAX_SAFE_INTEGER)
        return new ExpantaNum2(n);
      return ExpantaNum2.pow(10, x.log10().add(other2.log10()));
    };
    Q.times = Q.mul = function(x, y) {
      return new ExpantaNum2(x).mul(y);
    };
    P.divide = P.div = function(other2) {
      var x = this.clone();
      other2 = new ExpantaNum2(other2);
      if (ExpantaNum2.debug >= ExpantaNum2.NORMAL)
        console.log(x + "/" + other2);
      if (x.sign * other2.sign == -1)
        return x.abs().div(other2.abs()).neg();
      if (x.sign == -1)
        return x.abs().div(other2.abs());
      if (x.isNaN() || other2.isNaN() || x.isInfinite() && other2.isInfinite() || x.eq(ExpantaNum2.ZERO) && other2.eq(ExpantaNum2.ZERO))
        return ExpantaNum2.NaN.clone();
      if (other2.eq(ExpantaNum2.ZERO))
        return ExpantaNum2.POSITIVE_INFINITY.clone();
      if (other2.eq(ExpantaNum2.ONE))
        return x.clone();
      if (x.eq(other2))
        return ExpantaNum2.ONE.clone();
      if (x.isInfinite())
        return x;
      if (other2.isInfinite())
        return ExpantaNum2.ZERO.clone();
      if (x.max(other2).gt(ExpantaNum2.EE_MAX_SAFE_INTEGER))
        return x.gt(other2) ? x.clone() : ExpantaNum2.ZERO.clone();
      var n = x.toNumber() / other2.toNumber();
      if (n <= MAX_SAFE_INTEGER)
        return new ExpantaNum2(n);
      var pw = ExpantaNum2.pow(10, x.log10().sub(other2.log10()));
      var fp = pw.floor();
      if (pw.sub(fp).lt(new ExpantaNum2(1e-9)))
        return fp;
      return pw;
    };
    Q.divide = Q.div = function(x, y) {
      return new ExpantaNum2(x).div(y);
    };
    P.reciprocate = P.rec = function() {
      if (ExpantaNum2.debug >= ExpantaNum2.NORMAL)
        console.log(this + "^-1");
      if (this.isNaN() || this.eq(ExpantaNum2.ZERO))
        return ExpantaNum2.NaN.clone();
      if (this.abs().gt("2e323"))
        return ExpantaNum2.ZERO.clone();
      return new ExpantaNum2(1 / this);
    };
    Q.reciprocate = Q.rec = function(x) {
      return new ExpantaNum2(x).rec();
    };
    P.modular = P.mod = function(other2) {
      other2 = new ExpantaNum2(other2);
      if (other2.eq(ExpantaNum2.ZERO))
        return ExpantaNum2.ZERO.clone();
      if (this.sign * other2.sign == -1)
        return this.abs().mod(other2.abs()).neg();
      if (this.sign == -1)
        return this.abs().mod(other2.abs());
      return this.sub(this.div(other2).floor().mul(other2));
    };
    Q.modular = Q.mod = function(x, y) {
      return new ExpantaNum2(x).mod(y);
    };
    var f_gamma = function(n) {
      if (!isFinite(n))
        return n;
      if (n < -50) {
        if (n == Math.trunc(n))
          return Number.NEGATIVE_INFINITY;
        return 0;
      }
      var scal1 = 1;
      while (n < 10) {
        scal1 = scal1 * n;
        ++n;
      }
      n -= 1;
      var l = 0.9189385332046727;
      l += (n + 0.5) * Math.log(n);
      l -= n;
      var n2 = n * n;
      var np = n;
      l += 1 / (12 * np);
      np *= n2;
      l += 1 / (360 * np);
      np *= np * n2;
      l += 1 / (1260 * np);
      np *= n2;
      l += 1 / (1680 * np);
      np *= n2;
      l += 1 / (1188 * np);
      np *= n2;
      l += 691 / (360360 * np);
      np *= n2;
      l += 7 / (1092 * np);
      np *= n2;
      l += 3617 / (122400 * np);
      return Math.exp(l) / scal1;
    };
    P.gamma = function() {
      var x = this.clone();
      if (x.gt(ExpantaNum2.TETRATED_MAX_SAFE_INTEGER))
        return x;
      if (x.gt(ExpantaNum2.E_MAX_SAFE_INTEGER))
        return ExpantaNum2.exp(x);
      if (x.gt(ExpantaNum2.MAX_SAFE_INTEGER))
        return ExpantaNum2.exp(ExpantaNum2.mul(x, ExpantaNum2.ln(x).sub(1)));
      var n = x.operator(0);
      if (n > 1) {
        if (n < 24)
          return new ExpantaNum2(f_gamma(x.sign * n));
        var t = n - 1;
        var l = 0.9189385332046727;
        l += (t + 0.5) * Math.log(t);
        l -= t;
        var n2 = t * t;
        var np = t;
        var lm = 12 * np;
        var adj = 1 / lm;
        var l2 = l + adj;
        if (l2 == l)
          return ExpantaNum2.exp(l);
        l = l2;
        np *= n2;
        lm = 360 * np;
        adj = 1 / lm;
        l2 = l - adj;
        if (l2 == l)
          return ExpantaNum2.exp(l);
        l = l2;
        np *= n2;
        lm = 1260 * np;
        var lt = 1 / lm;
        l += lt;
        np *= n2;
        lm = 1680 * np;
        lt = 1 / lm;
        l -= lt;
        return ExpantaNum2.exp(l);
      } else
        return this.rec();
    };
    Q.gamma = function(x) {
      return new ExpantaNum2(x).gamma();
    };
    Q.factorials = [1, 1, 2, 6, 24, 120, 720, 5040, 40320, 362880, 3628800, 39916800, 479001600, 6227020800, 87178291200, 1307674368e3, 20922789888e3, 355687428096e3, 6402373705728e3, 121645100408832e3, 243290200817664e4, 5109094217170944e4, 11240007277776077e5, 2585201673888498e7, 6204484017332394e8, 15511210043330986e9, 40329146112660565e10, 10888869450418352e12, 30488834461171387e13, 8841761993739702e15, 26525285981219107e16, 8222838654177922e18, 2631308369336935e20, 8683317618811886e21, 29523279903960416e22, 10333147966386145e24, 37199332678990125e25, 13763753091226346e27, 5230226174666011e29, 20397882081197444e30, 8159152832478977e32, 3345252661316381e34, 140500611775288e37, 6041526306337383e37, 2658271574788449e39, 11962222086548019e40, 5502622159812089e42, 25862324151116818e43, 12413915592536073e45, 6082818640342675e47, 30414093201713376e48, 15511187532873822e50, 8065817517094388e52, 42748832840600255e53, 2308436973392414e56, 12696403353658276e57, 7109985878048635e59, 40526919504877214e60, 23505613312828785e62, 13868311854568984e64, 832098711274139e67, 5075802138772248e68, 3146997326038794e70, 198260831540444e73, 12688693218588417e73, 8247650592082472e75, 5443449390774431e77, 3647111091818868e79, 24800355424368305e80, 1711224524281413e83, 11978571669969892e84, 8504785885678623e86, 61234458376886085e87, 44701154615126844e89, 3307885441519386e92, 248091408113954e95, 18854947016660504e95, 14518309202828587e97, 11324281178206297e99, 8946182130782976e101, 7156945704626381e103, 5797126020747368e105, 4753643337012842e107, 3945523969720659e109, 3314240134565353e111, 281710411438055e114, 24227095383672734e114, 2107757298379528e117, 18548264225739844e118, 1650795516090846e121, 14857159644817615e122, 1352001527678403e125, 12438414054641308e126, 11567725070816416e128, 1087366156656743e131, 1032997848823906e133, 9916779348709496e134, 9619275968248212e136, 9426890448883248e138, 9332621544394415e140, 9332621544394415e142, 942594775983836e145, 9614466715035127e146, 990290071648618e149, 10299016745145628e150, 1081396758240291e153, 11462805637347084e154, 1226520203196138e157, 1324641819451829e159, 14438595832024937e160, 1588245541522743e163, 17629525510902446e164, 1974506857221074e167, 22311927486598138e168, 25435597334721877e170, 2925093693493016e173, 3393108684451898e175, 3969937160808721e177, 4684525849754291e179, 5574585761207606e181, 6689502913449127e183, 8094298525273444e185, 9875044200833601e187, 1214630436702533e190, 1506141741511141e192, 1882677176888926e194, 2372173242880047e196, 30126600184576594e197, 3856204823625804e200, 4974504222477287e202, 6466855489220474e204, 847158069087882e207, 11182486511960043e208, 14872707060906857e210, 19929427461615188e212, 26904727073180504e214, 3659042881952549e217, 5012888748274992e219, 6917786472619489e221, 9615723196941089e223, 13462012475717526e225, 1898143759076171e228, 2695364137888163e230, 3854370717180073e232, 55502938327393044e233, 8047926057471992e236, 11749972043909107e238, 1727245890454639e241, 25563239178728654e242, 380892263763057e246, 5713383956445855e247, 862720977423324e250, 13113358856834524e251, 20063439050956823e253, 30897696138473508e255, 4789142901463394e258, 7471062926282894e260, 11729568794264145e262, 1853271869493735e265, 29467022724950384e266, 47147236359920616e268, 7590705053947219e271, 12296942187394494e273, 20044015765453026e275, 3287218585534296e278, 5423910666131589e280, 9003691705778438e282, 1503616514864999e285, 25260757449731984e286, 4269068009004705e289, 7257415615307999e291];
    P.factorial = P.fact = function() {
      var x = this.clone();
      var f = ExpantaNum2.factorials;
      if (x.lt(ExpantaNum2.ZERO) || !x.isint())
        return x.add(1).gamma();
      if (x.lte(170))
        return new ExpantaNum2(f[+x]);
      var errorFixer = 1;
      var e = +x;
      if (e < 500)
        e += 163879 / 209018880 * Math.pow(e, 5);
      if (e < 1e3)
        e += -571 / 2488320 * Math.pow(e, 4);
      if (e < 5e4)
        e += -139 / 51840 * Math.pow(e, 3);
      if (e < 1e7)
        e += 1 / 288 * Math.pow(e, 2);
      if (e < 1e20)
        e += 1 / 12 * e;
      return x.div(ExpantaNum2.E).pow(x).mul(x.mul(ExpantaNum2.PI).mul(2).sqrt()).times(errorFixer);
    };
    Q.factorial = Q.fact = function(x) {
      return new ExpantaNum2(x).fact();
    };
    P.toPower = P.pow = function(other2) {
      other2 = new ExpantaNum2(other2);
      if (ExpantaNum2.debug >= ExpantaNum2.NORMAL)
        console.log(this + "^" + other2);
      if (other2.eq(ExpantaNum2.ZERO))
        return ExpantaNum2.ONE.clone();
      if (other2.eq(ExpantaNum2.ONE))
        return this.clone();
      if (other2.lt(ExpantaNum2.ZERO))
        return this.pow(other2.neg()).rec();
      if (this.lt(ExpantaNum2.ZERO) && other2.isint()) {
        if (other2.mod(2).lt(ExpantaNum2.ONE))
          return this.abs().pow(other2);
        return this.abs().pow(other2).neg();
      }
      if (this.lt(ExpantaNum2.ZERO))
        return ExpantaNum2.NaN.clone();
      if (this.eq(ExpantaNum2.ONE))
        return ExpantaNum2.ONE.clone();
      if (this.eq(ExpantaNum2.ZERO))
        return ExpantaNum2.ZERO.clone();
      if (this.max(other2).gt(ExpantaNum2.TETRATED_MAX_SAFE_INTEGER))
        return this.max(other2);
      if (this.eq(10)) {
        if (other2.gt(ExpantaNum2.ZERO)) {
          other2.operator(1, other2.operator(1) + 1 || 1);
          other2.standardize();
          return other2;
        } else {
          return new ExpantaNum2(Math.pow(10, other2.toNumber()));
        }
      }
      if (other2.lt(ExpantaNum2.ONE))
        return this.root(other2.rec());
      var n = Math.pow(this.toNumber(), other2.toNumber());
      if (n <= MAX_SAFE_INTEGER)
        return new ExpantaNum2(n);
      return ExpantaNum2.pow(10, this.log10().mul(other2));
    };
    Q.toPower = Q.pow = function(x, y) {
      return new ExpantaNum2(x).pow(y);
    };
    P.exponential = P.exp = function() {
      return ExpantaNum2.pow(Math.E, this);
    };
    Q.exponential = Q.exp = function(x) {
      return ExpantaNum2.pow(Math.E, x);
    };
    P.squareRoot = P.sqrt = function() {
      return this.root(2);
    };
    Q.squareRoot = Q.sqrt = function(x) {
      return new ExpantaNum2(x).root(2);
    };
    P.cubeRoot = P.cbrt = function() {
      return this.root(3);
    };
    Q.cubeRoot = Q.cbrt = function(x) {
      return new ExpantaNum2(x).root(3);
    };
    P.root = function(other2) {
      other2 = new ExpantaNum2(other2);
      if (ExpantaNum2.debug >= ExpantaNum2.NORMAL)
        console.log(this + "root" + other2);
      if (other2.eq(ExpantaNum2.ONE))
        return this.clone();
      if (other2.lt(ExpantaNum2.ZERO))
        return this.root(other2.neg()).rec();
      if (other2.lt(ExpantaNum2.ONE))
        return this.pow(other2.rec());
      if (this.lt(ExpantaNum2.ZERO) && other2.isint() && other2.mod(2).eq(ExpantaNum2.ONE))
        return this.neg().root(other2).neg();
      if (this.lt(ExpantaNum2.ZERO))
        return ExpantaNum2.NaN.clone();
      if (this.eq(ExpantaNum2.ONE))
        return ExpantaNum2.ONE.clone();
      if (this.eq(ExpantaNum2.ZERO))
        return ExpantaNum2.ZERO.clone();
      if (this.max(other2).gt(ExpantaNum2.TETRATED_MAX_SAFE_INTEGER))
        return this.gt(other2) ? this.clone() : ExpantaNum2.ZERO.clone();
      return ExpantaNum2.pow(10, this.log10().div(other2));
    };
    Q.root = function(x, y) {
      return new ExpantaNum2(x).root(y);
    };
    P.generalLogarithm = P.log10 = function() {
      var x = this.clone();
      if (ExpantaNum2.debug >= ExpantaNum2.NORMAL)
        console.log("log" + this);
      if (x.lt(ExpantaNum2.ZERO))
        return ExpantaNum2.NaN.clone();
      if (x.eq(ExpantaNum2.ZERO))
        return ExpantaNum2.NEGATIVE_INFINITY.clone();
      if (x.lte(ExpantaNum2.MAX_SAFE_INTEGER))
        return new ExpantaNum2(Math.log10(x.toNumber()));
      if (!x.isFinite())
        return x;
      if (x.gt(ExpantaNum2.TETRATED_MAX_SAFE_INTEGER))
        return x;
      x.operator(1, x.operator(1) - 1);
      return x.standardize();
    };
    Q.generalLogarithm = Q.log10 = function(x) {
      return new ExpantaNum2(x).log10();
    };
    P.logarithm = P.logBase = function(base2) {
      if (base2 === void 0)
        base2 = Math.E;
      return this.log10().div(ExpantaNum2.log10(base2));
    };
    Q.logarithm = Q.logBase = function(x, base2) {
      return new ExpantaNum2(x).logBase(base2);
    };
    P.naturalLogarithm = P.log = P.ln = function() {
      return this.logBase(Math.E);
    };
    Q.naturalLogarithm = Q.log = Q.ln = function(x) {
      return new ExpantaNum2(x).ln();
    };
    var OMEGA = 0.5671432904097838;
    var f_lambertw = function(z, tol) {
      if (tol === void 0)
        tol = 1e-10;
      var w;
      var wn;
      if (!Number.isFinite(z))
        return z;
      if (z === 0)
        return z;
      if (z === 1)
        return OMEGA;
      if (z < 10)
        w = 0;
      else
        w = Math.log(z) - Math.log(Math.log(z));
      for (var i2 = 0; i2 < 100; ++i2) {
        wn = (z * Math.exp(-w) + w * w) / (w + 1);
        if (Math.abs(wn - w) < tol * Math.abs(wn))
          return wn;
        w = wn;
      }
      throw Error("Iteration failed to converge: " + z);
    };
    var d_lambertw = function(z, tol) {
      if (tol === void 0)
        tol = 1e-10;
      z = new ExpantaNum2(z);
      var w;
      var ew, wewz, wn;
      if (!z.isFinite())
        return z;
      if (z === 0)
        return z;
      if (z === 1) {
        return OMEGA;
      }
      w = ExpantaNum2.ln(z);
      for (var i2 = 0; i2 < 100; ++i2) {
        ew = ExpantaNum2.exp(-w);
        wewz = w.sub(z.mul(ew));
        wn = w.sub(wewz.div(w.add(ExpantaNum2.ONE).sub(w.add(2).mul(wewz).div(ExpantaNum2.mul(2, w).add(2)))));
        if (ExpantaNum2.abs(wn.sub(w)).lt(ExpantaNum2.abs(wn).mul(tol)))
          return wn;
        w = wn;
      }
      throw Error("Iteration failed to converge: " + z);
    };
    P.lambertw = function() {
      var x = this.clone();
      if (x.isNaN())
        return x;
      if (x.lt(-0.3678794411710499))
        throw Error("lambertw is unimplemented for results less than -1, sorry!");
      if (x.gt(ExpantaNum2.TETRATED_MAX_SAFE_INTEGER))
        return x;
      if (x.gt(ExpantaNum2.EE_MAX_SAFE_INTEGER)) {
        x.operator(1, x.operator(1) - 1);
        return x;
      }
      if (x.gt(ExpantaNum2.MAX_SAFE_INTEGER))
        return d_lambertw(x);
      else
        return new ExpantaNum2(f_lambertw(x.sign * x.operator(0)));
    };
    Q.lambertw = function(x) {
      return new ExpantaNum2(x).lambertw();
    };
    P.tetrate = P.tetr = function(other2, payload) {
      if (payload === void 0)
        payload = ExpantaNum2.ONE;
      var t = this.clone();
      other2 = new ExpantaNum2(other2);
      payload = new ExpantaNum2(payload);
      if (payload.neq(ExpantaNum2.ONE))
        other2 = other2.add(payload.slog(t));
      if (ExpantaNum2.debug >= ExpantaNum2.NORMAL)
        console.log(t + "^^" + other2);
      var negln;
      if (t.isNaN() || other2.isNaN() || payload.isNaN())
        return ExpantaNum2.NaN.clone();
      if (other2.isInfinite() && other2.sign > 0) {
        if (t.gte(Math.exp(1 / Math.E)))
          return ExpantaNum2.POSITIVE_INFINITY.clone();
        negln = t.ln().neg();
        return negln.lambertw().div(negln);
      }
      if (other2.lte(-2))
        return ExpantaNum2.NaN.clone();
      if (t.eq(ExpantaNum2.ZERO)) {
        if (other2.eq(ExpantaNum2.ZERO))
          return ExpantaNum2.NaN.clone();
        if (other2.mod(2).eq(ExpantaNum2.ZERO))
          return ExpantaNum2.ZERO.clone();
        return ExpantaNum2.ONE.clone();
      }
      if (t.eq(ExpantaNum2.ONE)) {
        if (other2.eq(ExpantaNum2.ONE.neg()))
          return ExpantaNum2.NaN.clone();
        return ExpantaNum2.ONE.clone();
      }
      if (other2.eq(ExpantaNum2.ONE.neg()))
        return ExpantaNum2.ZERO.clone();
      if (other2.eq(ExpantaNum2.ZERO))
        return ExpantaNum2.ONE.clone();
      if (other2.eq(ExpantaNum2.ONE))
        return t;
      if (other2.eq(2))
        return t.pow(t);
      if (t.eq(2)) {
        if (other2.eq(3))
          return new ExpantaNum2(16);
        if (other2.eq(4))
          return new ExpantaNum2(65536);
      }
      var m = t.max(other2);
      if (m.gt("10^^^" + MAX_SAFE_INTEGER))
        return m;
      if (m.gt(ExpantaNum2.TETRATED_MAX_SAFE_INTEGER) || other2.gt(ExpantaNum2.MAX_SAFE_INTEGER)) {
        if (this.lt(Math.exp(1 / Math.E))) {
          negln = t.ln().neg();
          return negln.lambertw().div(negln);
        }
        var j = t.slog(10).add(other2);
        j.operator(2, (j.operator(2) || 0) + 1);
        j.standardize();
        return j;
      }
      var y = other2.toNumber();
      var f = Math.floor(y);
      var r = t.pow(y - f);
      var l = ExpantaNum2.NaN;
      for (var i2 = 0, w = new ExpantaNum2(ExpantaNum2.E_MAX_SAFE_INTEGER); f !== 0 && r.lt(w) && i2 < 100; ++i2) {
        if (f > 0) {
          r = t.pow(r);
          if (l.eq(r)) {
            f = 0;
            break;
          }
          l = r;
          --f;
        } else {
          r = r.logBase(t);
          if (l.eq(r)) {
            f = 0;
            break;
          }
          l = r;
          ++f;
        }
      }
      if (i2 == 100 || this.lt(Math.exp(1 / Math.E)))
        f = 0;
      r.operator(1, r.operator(1) + f || f);
      r.standardize();
      return r;
    };
    Q.tetrate = Q.tetr = function(x, y, payload) {
      return new ExpantaNum2(x).tetr(y, payload);
    };
    P.iteratedexp = function(other2, payload) {
      return this.tetr(other2, payload);
    };
    Q.iteratedexp = function(x, y, payload) {
      return new ExpantaNum2(x).iteratedexp(other, payload);
    };
    P.iteratedlog = function(base2, other2) {
      if (base2 === void 0)
        base2 = 10;
      if (other2 === void 0)
        other2 = ExpantaNum2.ONE.clone();
      var t = this.clone();
      if (other2.eq(ExpantaNum2.ZERO))
        return t;
      if (other2.eq(ExpantaNum2.ONE))
        return t.logBase(base2);
      base2 = new ExpantaNum2(base2);
      other2 = new ExpantaNum2(other2);
      return base2.tetr(t.slog(base2).sub(other2));
    };
    Q.iteratedlog = function(x, y, z) {
      return new ExpantaNum2(x).iteratedlog(y, z);
    };
    P.layeradd = function(other2, base2) {
      if (base2 === void 0)
        base2 = 10;
      if (other2 === void 0)
        other2 = ExpantaNum2.ONE.clone();
      var t = this.clone();
      base2 = new ExpantaNum2(base2);
      other2 = new ExpantaNum2(other2);
      return base2.tetr(t.slog(base2).add(other2));
    };
    Q.layeradd = function(x, y, z) {
      return new ExpantaNum2(x).layeradd(y, z);
    };
    P.layeradd10 = function(other2) {
      return this.layeradd(other2);
    };
    Q.layeradd10 = function(x, y) {
      return new ExpantaNum2(x).layeradd10(y);
    };
    P.ssqrt = P.ssrt = function() {
      var x = this.clone();
      if (x.lt(Math.exp(-1 / Math.E)))
        return ExpantaNum2.NaN.clone();
      if (!x.isFinite())
        return x;
      if (x.gt(ExpantaNum2.TETRATED_MAX_SAFE_INTEGER))
        return x;
      if (x.gt(ExpantaNum2.EE_MAX_SAFE_INTEGER)) {
        x.operator(1, x.operator(1) - 1);
        return x;
      }
      var l = x.ln();
      return l.div(l.lambertw());
    };
    Q.ssqrt = Q.ssrt = function(x) {
      return new ExpantaNum2(x).ssqrt();
    };
    P.slog = function(base2) {
      if (base2 === void 0)
        base2 = 10;
      var x = new ExpantaNum2(this);
      base2 = new ExpantaNum2(base2);
      if (x.isNaN() || base2.isNaN() || x.isInfinite() && base2.isInfinite())
        return ExpantaNum2.NaN.clone();
      if (x.isInfinite())
        return x;
      if (base2.isInfinite())
        return ExpantaNum2.ZERO.clone();
      if (x.lt(ExpantaNum2.ZERO))
        return ExpantaNum2.ONE.neg();
      if (x.eq(ExpantaNum2.ONE))
        return ExpantaNum2.ZERO.clone();
      if (x.eq(base2))
        return ExpantaNum2.ONE.clone();
      if (base2.lt(Math.exp(1 / Math.E))) {
        var a2 = ExpantaNum2.tetr(base2, Infinity);
        if (x.eq(a2))
          return ExpantaNum2.POSITIVE_INFINITY.clone();
        if (x.gt(a2))
          return ExpantaNum2.NaN.clone();
      }
      if (x.max(base2).gt("10^^^" + MAX_SAFE_INTEGER)) {
        if (x.gt(base2))
          return x;
        return ExpantaNum2.ZERO.clone();
      }
      if (x.max(base2).gt(ExpantaNum2.TETRATED_MAX_SAFE_INTEGER)) {
        if (x.gt(base2)) {
          x.operator(2, x.operator(2) - 1);
          x.standardize();
          return x.sub(x.operator(1));
        }
        return ExpantaNum2.ZERO.clone();
      }
      var r = 0;
      var t = (x.operator(1) || 0) - (base2.operator(1) || 0);
      if (t > 3) {
        var l = t - 3;
        r += l;
        x.operator(1, x.operator(1) - l);
      }
      for (var i2 = 0; i2 < 100; ++i2) {
        if (x.lt(ExpantaNum2.ZERO)) {
          x = ExpantaNum2.pow(base2, x);
          --r;
        } else if (x.lte(1)) {
          return new ExpantaNum2(r + x.toNumber() - 1);
        } else {
          ++r;
          x = ExpantaNum2.logBase(x, base2);
        }
      }
      if (x.gt(10))
        return new ExpantaNum2(r);
    };
    Q.slog = function(x, y) {
      return new ExpantaNum2(x).slog(y);
    };
    P.pentate = P.pent = function(other2) {
      return this.arrow(3)(other2);
    };
    Q.pentate = Q.pent = function(x, y) {
      return ExpantaNum2.arrow(x, 3, y);
    };
    P.arrow = function(arrows) {
      var t = this.clone();
      arrows = new ExpantaNum2(arrows);
      if (!arrows.isint() || arrows.lt(ExpantaNum2.ZERO))
        return function(other2) {
          return ExpantaNum2.NaN.clone();
        };
      if (arrows.eq(ExpantaNum2.ZERO))
        return function(other2) {
          return t.mul(other2);
        };
      if (arrows.eq(ExpantaNum2.ONE))
        return function(other2) {
          return t.pow(other2);
        };
      if (arrows.eq(2))
        return function(other2) {
          return t.tetr(other2);
        };
      return function(other2) {
        var depth;
        if (arguments.length == 2)
          depth = arguments[1];
        else
          depth = 0;
        other2 = new ExpantaNum2(other2);
        var r;
        if (ExpantaNum2.debug >= ExpantaNum2.NORMAL)
          console.log(t + "{" + arrows + "}" + other2);
        if (t.isNaN() || other2.isNaN())
          return ExpantaNum2.NaN.clone();
        if (other2.lt(ExpantaNum2.ZERO))
          return ExpantaNum2.NaN.clone();
        if (t.eq(ExpantaNum2.ZERO)) {
          if (other2.eq(ExpantaNum2.ONE))
            return ExpantaNum2.ZERO.clone();
          return ExpantaNum2.NaN.clone();
        }
        if (t.eq(ExpantaNum2.ONE))
          return ExpantaNum2.ONE.clone();
        if (other2.eq(ExpantaNum2.ZERO))
          return ExpantaNum2.ONE.clone();
        if (other2.eq(ExpantaNum2.ONE))
          return t.clone();
        if (arrows.gt(ExpantaNum2.MAX_SAFE_INTEGER)) {
          r = arrows.clone();
          r.layer++;
          return r;
        }
        var arrowsNum = arrows.toNumber();
        if (other2.eq(2))
          return t.arrow(arrowsNum - 1)(t, depth + 1);
        if (t.max(other2).gt("10{" + (arrowsNum + 1) + "}" + MAX_SAFE_INTEGER))
          return t.max(other2);
        if (t.gt("10{" + arrowsNum + "}" + MAX_SAFE_INTEGER) || other2.gt(ExpantaNum2.MAX_SAFE_INTEGER)) {
          if (t.gt("10{" + arrowsNum + "}" + MAX_SAFE_INTEGER)) {
            r = t.clone();
            r.operator(arrowsNum, r.operator(arrowsNum) - 1);
            r.standardize();
          } else if (t.gt("10{" + (arrowsNum - 1) + "}" + MAX_SAFE_INTEGER)) {
            r = new ExpantaNum2(t.operator(arrowsNum - 1));
          } else {
            r = ExpantaNum2.ZERO;
          }
          var j = r.add(other2);
          j.operator(arrowsNum, (j.operator(arrowsNum) || 0) + 1);
          j.standardize();
          return j;
        }
        if (depth >= ExpantaNum2.maxOps + 10) {
          return new ExpantaNum2([[0, 10], [arrowsNum, 1]]);
        }
        var y = other2.toNumber();
        var f = Math.floor(y);
        var arrows_m1 = arrows.sub(ExpantaNum2.ONE);
        r = t.arrow(arrows_m1)(y - f, depth + 1);
        for (var i2 = 0, m = new ExpantaNum2("10{" + (arrowsNum - 1) + "}" + MAX_SAFE_INTEGER); f !== 0 && r.lt(m) && i2 < 100; ++i2) {
          if (f > 0) {
            r = t.arrow(arrows_m1)(r, depth + 1);
            --f;
          }
        }
        if (i2 == 100)
          f = 0;
        r.operator(arrowsNum - 1, r.operator(arrowsNum - 1) + f || f);
        r.standardize();
        return r;
      };
    };
    P.chain = function(other2, arrows) {
      return this.arrow(arrows)(other2);
    };
    Q.arrow = function(x, z, y) {
      return new ExpantaNum2(x).arrow(z)(y);
    };
    Q.chain = function(x, y, z) {
      return new ExpantaNum2(x).arrow(z)(y);
    };
    Q.hyper = function(z) {
      z = new ExpantaNum2(z);
      if (z.eq(ExpantaNum2.ZERO))
        return function(x, y) {
          return new ExpantaNum2(y).eq(ExpantaNum2.ZERO) ? new ExpantaNum2(x) : new ExpantaNum2(x).add(ExpantaNum2.ONE);
        };
      if (z.eq(ExpantaNum2.ONE))
        return function(x, y) {
          return ExpantaNum2.add(x, y);
        };
      return function(x, y) {
        return new ExpantaNum2(x).arrow(z.sub(2))(y);
      };
    };
    P.expansion = function(other2) {
      var t = this.clone();
      other2 = new ExpantaNum2(other2);
      var r;
      if (ExpantaNum2.debug >= ExpantaNum2.NORMAL)
        console.log("{" + t + "," + other2 + ",1,2}");
      if (other2.lte(ExpantaNum2.ZERO) || !other2.isint())
        return ExpantaNum2.NaN.clone();
      if (other2.eq(ExpantaNum2.ONE))
        return t.clone();
      if (!t.isint())
        return ExpantaNum2.NaN.clone();
      if (t.eq(2))
        return new ExpantaNum2(4);
      if (other2.gt(ExpantaNum2.MAX_SAFE_INTEGER))
        return ExpantaNum2.POSITIVE_INFINITY.clone();
      var f = other2.toNumber() - 1;
      r = t;
      for (var i2 = 0; f !== 0 && r.lt(ExpantaNum2.MAX_SAFE_INTEGER) && i2 < 100; ++i2) {
        if (f > 0) {
          r = t.arrow(r)(t);
          --f;
        }
      }
      if (i2 == 100)
        f = 0;
      r.layer += f;
      r.standardize();
      return r;
    };
    Q.expansion = function(x, y) {
      return new ExpantaNum2(x).expansion(y);
    };
    Q.affordGeometricSeries = function(resourcesAvailable, priceStart, priceRatio, currentOwned) {
      resourcesAvailable = new ExpantaNum2(resourcesAvailable);
      priceStart = new ExpantaNum2(priceStart);
      priceRatio = new ExpantaNum2(priceRatio);
      var actualStart = priceStart.mul(priceRatio.pow(currentOwned));
      return ExpantaNum2.floor(resourcesAvailable.div(actualStart).mul(priceRatio.sub(ExpantaNum2.ONE)).add(ExpantaNum2.ONE).log10().div(priceRatio.log10()));
    };
    Q.affordArithmeticSeries = function(resourcesAvailable, priceStart, priceAdd, currentOwned) {
      resourcesAvailable = new ExpantaNum2(resourcesAvailable);
      priceStart = new ExpantaNum2(priceStart);
      priceAdd = new ExpantaNum2(priceAdd);
      currentOwned = new ExpantaNum2(currentOwned);
      var actualStart = priceStart.add(currentOwned.mul(priceAdd));
      var b2 = actualStart.sub(priceAdd.div(2));
      var b22 = b2.pow(2);
      return b2.neg().add(b22.add(priceAdd.mul(resourcesAvailable).mul(2)).sqrt()).div(priceAdd).floor();
    };
    Q.sumGeometricSeries = function(numItems, priceStart, priceRatio, currentOwned) {
      priceStart = new ExpantaNum2(priceStart);
      priceRatio = new ExpantaNum2(priceRatio);
      return priceStart.mul(priceRatio.pow(currentOwned)).mul(ExpantaNum2.sub(ExpantaNum2.ONE, priceRatio.pow(numItems))).div(ExpantaNum2.sub(ExpantaNum2.ONE, priceRatio));
    };
    Q.sumArithmeticSeries = function(numItems, priceStart, priceAdd, currentOwned) {
      numItems = new ExpantaNum2(numItems);
      priceStart = new ExpantaNum2(priceStart);
      currentOwned = new ExpantaNum2(currentOwned);
      var actualStart = priceStart.add(currentOwned.mul(priceAdd));
      return numItems.div(2).mul(actualStart.mul(2).plus(numItems.sub(ExpantaNum2.ONE).mul(priceAdd)));
    };
    Q.choose = function(n, k) {
      return new ExpantaNum2(n).factorial().div(new ExpantaNum2(k).factorial().mul(new ExpantaNum2(n).sub(new ExpantaNum2(k)).factorial()));
    };
    P.choose = function(other2) {
      return ExpantaNum2.choose(this, other2);
    };
    P.standardize = function() {
      var b2;
      var x = this;
      if (ExpantaNum2.debug >= ExpantaNum2.ALL)
        console.log(x.toString());
      if (!x.array || !x.array.length)
        x.array = [[0, 0]];
      if (x.sign != 1 && x.sign != -1) {
        if (typeof x.sign != "number")
          x.sign = Number(x.sign);
        x.sign = x.sign < 0 ? -1 : 1;
      }
      if (x.layer > MAX_SAFE_INTEGER) {
        x.array = [[0, Infinity]];
        x.layer = 0;
        return x;
      }
      if (Number.isInteger(x.layer))
        x.layer = Math.floor(x.layer);
      for (var i2 = 0; i2 < x.array.length; ++i2) {
        var e = x.array[i2];
        if (e[0] === null || e[0] === void 0) {
          e[0] = 0;
        }
        if (e[0] !== 0 && (e[1] === 0 || e[1] === null || e[1] === void 0)) {
          x.array.splice(i2, 1);
          --i2;
          continue;
        }
        if (isNaN(e[0]) || isNaN(e[1])) {
          x.array = [[0, NaN]];
          return x;
        }
        if (!isFinite(e[0]) || !isFinite(e[1])) {
          x.array = [[0, Infinity]];
          return x;
        }
        if (!Number.isInteger(e[0]))
          e[0] = Math.floor(e[0]);
        if (e[0] !== 0 && !Number.isInteger(e[1]))
          e[1] = Math.floor(e[1]);
      }
      do {
        if (ExpantaNum2.debug >= ExpantaNum2.ALL)
          console.log(x.toString());
        b2 = false;
        x.array.sort(function(a2, b3) {
          return a2[0] > b3[0] ? 1 : a2[0] < b3[0] ? -1 : 0;
        });
        if (x.array.length > ExpantaNum2.maxOps)
          x.array.splice(0, x.array.length - ExpantaNum2.maxOps);
        if (!x.array.length)
          x.array = [[0, 0]];
        if (x.array[x.array.length - 1][0] > MAX_SAFE_INTEGER) {
          x.layer++;
          x.array = [[0, x.array[x.array.length - 1][0]]];
          b2 = true;
        } else if (x.layer && x.array.length == 1 && x.array[0][0] === 0) {
          x.layer--;
          if (x.array[0][1] === 0)
            x.array = [[0, 10]];
          else
            x.array = [[0, 10], [Math.round(x.array[0][1]), 1]];
          b2 = true;
        }
        if (x.array.length < ExpantaNum2.maxOps && x.array[0][0] !== 0)
          x.array.unshift([0, 10]);
        for (i2 = 0; i2 < x.array.length - 1; ++i2) {
          if (x.array[i2][0] == x.array[i2 + 1][0]) {
            x.array[i2][1] += x.array[i2 + 1][1];
            x.array.splice(i2 + 1, 1);
            --i2;
            b2 = true;
          }
        }
        if (x.array[0][0] === 0 && x.array[0][1] > MAX_SAFE_INTEGER) {
          if (x.array.length >= 2 && x.array[1][0] == 1) {
            x.array[1][1]++;
          } else {
            x.array.splice(1, 0, [1, 1]);
          }
          x.array[0][1] = Math.log10(x.array[0][1]);
          b2 = true;
        }
        while (x.array.length >= 2 && x.array[0][0] === 0 && x.array[0][1] < MAX_E && x.array[1][0] == 1 && x.array[1][1]) {
          x.array[0][1] = Math.pow(10, x.array[0][1]);
          if (x.array[1][1] > 1) {
            x.array[1][1]--;
          } else {
            x.array.splice(1, 1);
          }
          b2 = true;
        }
        while (x.array.length >= 2 && x.array[0][0] === 0 && x.array[0][1] == 1 && x.array[1][1]) {
          if (x.array[1][1] > 1) {
            x.array[1][1]--;
          } else {
            x.array.splice(1, 1);
          }
          x.array[0][1] = 10;
        }
        if (x.array.length >= 2 && x.array[0][0] === 0 && x.array[1][0] != 1) {
          if (x.array[0][1])
            x.array.splice(1, 0, [x.array[1][0] - 1, x.array[0][1]]);
          x.array[0][1] = 1;
          if (x.array[2][1] > 1) {
            x.array[2][1]--;
          } else {
            x.array.splice(2, 1);
          }
          b2 = true;
        }
        for (i2 = 1; i2 < x.array.length; ++i2) {
          if (x.array[i2][1] > MAX_SAFE_INTEGER) {
            if (i2 != x.array.length - 1 && x.array[i2 + 1][0] == x.array[i2][0] + 1) {
              x.array[i2 + 1][1]++;
            } else {
              x.array.splice(i2 + 1, 0, [x.array[i2][0] + 1, 1]);
            }
            if (x.array[0][0] === 0) {
              x.array[0][1] = x.array[i2][1] + 1;
            } else {
              x.array.splice(0, 0, [0, x.array[i2][1] + 1]);
            }
            x.array.splice(1, i2);
            b2 = true;
          }
        }
      } while (b2);
      if (!x.array.length)
        x.array = [[0, 0]];
      return x;
    };
    P.toNumber = function() {
      if (this.sign == -1)
        return -1 * this.abs();
      if (this.array.length >= 2 && (this.array[1][0] >= 2 || this.array[1][1] >= 2 || this.array[1][1] == 1 && this.array[0][1] > Math.log10(Number.MAX_VALUE)))
        return Infinity;
      if (this.array.length >= 2 && this.array[1][1] == 1)
        return Math.pow(10, this.array[0][1]);
      return this.array[0][1];
    };
    P.toString = function() {
      if (this.sign == -1)
        return "-" + this.abs();
      if (isNaN(this.array[0][1]))
        return "NaN";
      if (!isFinite(this.array[0][1]))
        return "Infinity";
      var s = "";
      if (!this.layer)
        s += "";
      else if (this.layer < 3)
        s += "J".repeat(this.layer);
      else
        s += "J^" + this.layer + " ";
      if (this.array.length >= 3 || this.array.length == 2 && this.array[1][0] >= 2) {
        for (var i2 = this.array.length - 1; i2 >= 2; --i2) {
          var e = this.array[i2];
          var q2 = e[0] >= 5 ? "{" + e[0] + "}" : "^".repeat(e[0]);
          if (e[1] > 1)
            s += "(10" + q2 + ")^" + e[1] + " ";
          else if (e[1] == 1)
            s += "10" + q2;
        }
      }
      var op0 = this.operator(0);
      var op1 = this.operator(1);
      if (!op1)
        s += String(op0);
      else if (op1 < 3)
        s += "e".repeat(op1 - 1) + Math.pow(10, op0 - Math.floor(op0)) + "e" + Math.floor(op0);
      else if (op1 < 8)
        s += "e".repeat(op1) + op0;
      else
        s += "(10^)^" + op1 + " " + op0;
      return s;
    };
    var decimalPlaces = function decimalPlaces2(value12, places) {
      var len = places + 1;
      var numDigits = Math.ceil(Math.log10(Math.abs(value12)));
      var rounded = Math.round(value12 * Math.pow(10, len - numDigits)) * Math.pow(10, numDigits - len);
      return parseFloat(rounded.toFixed(Math.max(len - numDigits, 0)));
    };
    P.toStringWithDecimalPlaces = function(places, applyToOpNums) {
      if (this.sign == -1)
        return "-" + this.abs();
      if (isNaN(this.array[0][1]))
        return "NaN";
      if (!isFinite(this.array[0][1]))
        return "Infinity";
      var b2 = 0;
      var s = "";
      var m = Math.pow(10, places);
      if (!this.layer)
        s += "";
      else if (this.layer < 3)
        s += "J".repeat(this.layer);
      else
        s += "J^" + this.layer + " ";
      if (this.array.length >= 3 || this.array.length == 2 && this.array[1][0] >= 2) {
        for (var i2 = this.array.length - 1; !b2 && i2 >= 2; --i2) {
          var e = this.array[i2];
          var w = e[0];
          var x = e[1];
          if (applyToOpNums && x >= m) {
            ++w;
            b2 = x;
            x = 1;
          } else if (applyToOpNums && this.array[i2 - 1][0] == w - 1 && this.array[i2 - 1][1] >= m) {
            ++x;
            b2 = this.array[i2 - 1][1];
          }
          var q2 = w >= 5 ? "{" + w + "}" : "^".repeat(w);
          if (x > 1)
            s += "(10" + q2 + ")^" + x + " ";
          else if (x == 1)
            s += "10" + q2;
        }
      }
      var k = this.operator(0);
      var l = this.operator(1);
      if (k > m) {
        k = Math.log10(k);
        ++l;
      }
      if (b2)
        s += decimalPlaces(b2, places);
      else if (!l)
        s += String(decimalPlaces(k, places));
      else if (l < 3)
        s += "e".repeat(l - 1) + decimalPlaces(Math.pow(10, k - Math.floor(k)), places) + "e" + decimalPlaces(Math.floor(k), places);
      else if (l < 8)
        s += "e".repeat(l) + decimalPlaces(k, places);
      else if (applyToOpNums)
        s += "(10^)^" + decimalPlaces(l, places) + " " + decimalPlaces(k, places);
      else
        s += "(10^)^" + l + " " + decimalPlaces(k, places);
      return s;
    };
    P.toExponential = function(places, applyToOpNums) {
      if (this.array.length == 1)
        return (this.sign * this.array[0][1]).toExponential(places);
      return this.toStringWithDecimalPlaces(places, applyToOpNums);
    };
    P.toFixed = function(places, applyToOpNums) {
      if (this.array.length == 1)
        return (this.sign * this.array[0][1]).toFixed(places);
      return this.toStringWithDecimalPlaces(places, applyToOpNums);
    };
    P.toPrecision = function(places, applyToOpNums) {
      if (this.array[0][1] === 0)
        return (this.sign * this.array[0][1]).toFixed(places - 1, applyToOpNums);
      if (this.array.length == 1 && this.array[0][1] < 1e-6)
        return this.toExponential(places - 1, applyToOpNums);
      if (this.array.length == 1 && places > Math.log10(this.array[0][1]))
        return this.toFixed(places - Math.floor(Math.log10(this.array[0][1])) - 1, applyToOpNums);
      return this.toExponential(places - 1, applyToOpNums);
    };
    P.valueOf = function() {
      return this.toString();
    };
    P.toJSON = function() {
      if (ExpantaNum2.serializeMode == ExpantaNum2.JSON) {
        var a2 = [];
        for (var i2 = 0; i2 < this.array.length; ++i2)
          a2.push([this.array[i2][0], this.array[i2][1]]);
        return {
          array: a2,
          layer: this.layer,
          sign: this.sign
        };
      } else if (ExpantaNum2.serializeMode == ExpantaNum2.STRING) {
        return this.toString();
      }
    };
    P.toHyperE = function() {
      if (this.layer)
        throw Error(expantaNumError + "Sorry, but this prototype doesn't support correct Hyper-E notation for numbers larger than 10{MSI}10");
      if (this.sign == -1)
        return "-" + this.abs().toHyperE();
      if (isNaN(this.array[0][1]))
        return "NaN";
      if (!isFinite(this.array[0][1]))
        return "Infinity";
      if (this.lt(ExpantaNum2.MAX_SAFE_INTEGER))
        return String(this.array[0][1]);
      if (this.lt(ExpantaNum2.E_MAX_SAFE_INTEGER))
        return "E" + this.array[0][1];
      var r = "E" + this.operator(0) + "#" + this.operator(1);
      var l = 1;
      for (var i2 = Math.ceil(this.getOperatorIndex(2)); i2 < this.array.length; ++i2) {
        if (l + 1 < this.array[i2][0])
          r += "#1".repeat(this.array[i2][0] - l - 1);
        l = this.array[i2][0];
        r += "#" + (this.array[i2][1] + 1);
      }
      if (!this.layer)
        r = "" + r;
      else if (this.layer < 3)
        r = "J".repeat(this.layer) + r;
      else
        r = "J^" + this.layer + " " + r;
      return r;
    };
    Q.fromNumber = function(input3) {
      if (typeof input3 != "number")
        throw Error(invalidArgument + "Expected Number");
      var x = new ExpantaNum2();
      x.array[0][1] = Math.abs(input3);
      x.sign = input3 < 0 ? -1 : 1;
      x.standardize();
      return x;
    };
    Q.fromString = function(input3) {
      if (typeof input3 != "string")
        throw Error(invalidArgument + "Expected String");
      var isJSON = false;
      if (typeof input3 == "string" && (input3[0] == "[" || input3[0] == "{")) {
        try {
          JSON.parse(input3);
        } finally {
          isJSON = true;
        }
      }
      if (isJSON) {
        return ExpantaNum2.fromJSON(input3);
      }
      var x = new ExpantaNum2();
      x.array = [[0, 0]];
      if (!isExpantaNum.test(input3)) {
        console.warn(expantaNumError + "Malformed input: " + input3);
        x.array = [[0, NaN]];
        return x;
      }
      var negateIt = false;
      if (input3[0] == "-" || input3[0] == "+") {
        var numSigns = input3.search(/[^-\+]/);
        var signs = input3.substring(0, numSigns);
        negateIt = signs.match(/-/g).length % 2 == 1;
        input3 = input3.substring(numSigns);
      }
      if (input3 == "NaN")
        x.array = [[0, NaN]];
      else if (input3 == "Infinity")
        x.array = [[0, Infinity]];
      else {
        var a2, b2, c, d, i2;
        if (input3[0] == "J") {
          if (input3[1] == "^") {
            a2 = input3.substring(2).search(/[^0-9]/) + 2;
            x.layer = Number(input3.substring(2, a2));
            input3 = input3.substring(a2 + 1);
          } else {
            a2 = input3.search(/[^J]/);
            x.layer = a2;
            input3 = input3.substring(a2);
          }
        }
        while (input3) {
          if (/^\(?10[\^\{]/.test(input3)) {
            if (input3[0] == "(") {
              input3 = input3.substring(1);
            }
            var arrows;
            if (input3[2] == "^") {
              a2 = input3.substring(2).search(/[^\^]/);
              arrows = a2;
              b2 = a2 + 2;
            } else {
              a2 = input3.indexOf("}");
              arrows = Number(input3.substring(3, a2));
              b2 = a2 + 1;
            }
            input3 = input3.substring(b2);
            if (input3[0] == ")") {
              a2 = input3.indexOf(" ");
              c = Number(input3.substring(2, a2));
              input3 = input3.substring(a2 + 1);
            } else {
              c = 1;
            }
            if (arrows == 1) {
              if (x.array.length >= 2 && x.array[1][0] == 1) {
                x.array[1][1] += c;
              } else {
                x.array.splice(1, 0, [1, c]);
              }
            } else if (arrows == 2) {
              a2 = x.array.length >= 2 && x.array[1][0] == 1 ? x.array[1][1] : 0;
              b2 = x.array[0][1];
              if (b2 >= 1e10)
                ++a2;
              if (b2 >= 10)
                ++a2;
              x.array[0][1] = a2;
              if (x.array.length >= 2 && x.array[1][0] == 1)
                x.array.splice(1, 1);
              d = x.getOperatorIndex(2);
              if (Number.isInteger(d))
                x.array[d][1] += c;
              else
                x.array.splice(Math.ceil(d), 0, [2, c]);
            } else {
              a2 = x.operator(arrows - 1);
              b2 = x.operator(arrows - 2);
              if (b2 >= 10)
                ++a2;
              d = x.getOperatorIndex(arrows);
              x.array.splice(1, Math.ceil(d) - 1);
              x.array[0][1] = a2;
              if (Number.isInteger(d))
                x.array[1][1] += c;
              else
                x.array.splice(1, 0, [arrows, c]);
            }
          } else {
            break;
          }
        }
        a2 = input3.split(/[Ee]/);
        b2 = [x.array[0][1], 0];
        c = 1;
        for (i2 = a2.length - 1; i2 >= 0; --i2) {
          if (a2[i2])
            d = Number(a2[i2]);
          else
            d = 1;
          if (b2[0] < MAX_E && b2[1] === 0) {
            b2[0] = Math.pow(10, c * b2[0]);
          } else if (c == -1) {
            if (b2[1] === 0) {
              b2[0] = Math.pow(10, c * b2[0]);
            } else if (b2[1] == 1 && b2[0] <= Math.log10(Number.MAX_VALUE)) {
              b2[0] = Math.pow(10, c * Math.pow(10, b2[0]));
            } else {
              b2[0] = 0;
            }
            b2[1] = 0;
          } else {
            b2[1]++;
          }
          if (b2[1] === 0) {
            b2[0] *= Number(d);
          } else if (b2[1] == 1) {
            b2[0] += Math.log10(Number(d));
          } else if (b2[1] == 2 && b2[0] < MAX_E + Math.log10(Math.log10(Number(d)))) {
            b2[0] += Math.log10(1 + Math.pow(10, Math.log10(Math.log10(Number(d))) - b2[0]));
          }
          if (b2[0] < MAX_E && b2[1]) {
            b2[0] = Math.pow(10, b2[0]);
            b2[1]--;
          } else if (b2[0] > MAX_SAFE_INTEGER) {
            b2[0] = Math.log10(b2[0]);
            b2[1]++;
          }
        }
        x.array[0][1] = b2[0];
        if (b2[1]) {
          if (x.array.length >= 2 && x.array[1][0] == 1)
            x.array[1][1] += b2[1];
          else
            x.array.splice(1, 0, [1, b2[1]]);
        }
      }
      if (negateIt)
        x.sign *= -1;
      x.standardize();
      return x;
    };
    Q.fromArray = function(input1, input22, input3) {
      var array, layer, sign2;
      if (input1 instanceof Array && (input22 === void 0 || typeof input22 == "number") && (input3 === void 0 || typeof input3 == "number")) {
        array = input1;
        sign2 = input22;
        layer = input3 || 0;
      } else if (typeof input1 == "number" && input22 instanceof Array && (input3 === void 0 || typeof input3 == "number")) {
        array = input22;
        sign2 = input1;
        layer = input3 || 0;
      } else if (typeof input1 == "number" && typeof input22 == "number" && input3 instanceof Array) {
        array = input3;
        sign2 = input1;
        layer = input22;
      } else {
        throw Error(invalidArgument + "Expected an Array [and 1 or 2 Number]");
      }
      var x = new ExpantaNum2();
      var i2;
      if (!array.length)
        x.array = [[0, 0]];
      else if (typeof array[0] == "number") {
        x.array = [];
        for (i2 = 0; i2 < array.length; i2++) {
          if (typeof array[i2] != "number")
            throw Error(invalidArgument + "Expected Array of Number");
          x.array.push([i2, array[i2]]);
        }
      } else if (array[0] instanceof Array) {
        x.array = [];
        for (i2 = 0; i2 < array.length; i2++) {
          if (!(array[i2] instanceof Array) || typeof array[i2][0] != "number" || typeof array[i2][1] != "number")
            throw Error(invalidArgument + "Expected Array of pair of Number");
          x.array.push([array[i2][0], array[i2][1]]);
        }
      } else
        throw Error(invalidArgument + "Expected Array of Number or Array of pair of Number");
      if (sign2)
        x.sign = Number(sign2);
      else
        x.sign = 1;
      x.standardize();
      return x;
    };
    Q.fromObject = function(input3) {
      if (typeof input3 != "object")
        throw Error(invalidArgument + "Expected Object");
      if (input3 === null)
        return ExpantaNum2.ZERO.clone();
      if (input3 instanceof Array)
        return ExpantaNum2.fromArray(input3);
      if (input3 instanceof ExpantaNum2)
        return new ExpantaNum2(input3);
      if (!(input3.array instanceof Array))
        throw Error(invalidArgument + "Expected that property 'array' exists");
      if (input3.sign !== void 0 && typeof input3.sign != "number")
        throw Error(invalidArgument + "Expected that property 'sign' is Number");
      if (input3.layer !== void 0 && typeof input3.layer != "number")
        throw Error(invalidArgument + "Expected that property 'layer' is Number");
      return ExpantaNum2.fromArray(input3.array, input3.sign, input3.layer);
    };
    Q.fromJSON = function(input3) {
      if (typeof input3 == "object")
        return ExpantaNum2.fromObject(parsedObject);
      if (typeof input3 != "string")
        throw Error(invalidArgument + "Expected String");
      var parsedObject, x;
      try {
        parsedObject = JSON.parse(input3);
      } catch (e) {
        parsedObject = null;
        throw e;
      } finally {
        x = ExpantaNum2.fromObject(parsedObject);
      }
      parsedObject = null;
      return x;
    };
    Q.fromHyperE = function(input3) {
      if (typeof input3 != "string")
        throw Error(invalidArgument + "Expected String");
      var x = new ExpantaNum2();
      x.array = [[0, 0]];
      if (!/^[-\+]*(0|[1-9]\d*(\.\d*)?|Infinity|NaN|E[1-9]\d*(\.\d*)?(#[1-9]\d*)*)$/.test(input3)) {
        console.warn(expantaNumError + "Malformed input: " + input3);
        x.array = [[0, NaN]];
        return x;
      }
      var negateIt = false;
      if (input3[0] == "-" || input3[0] == "+") {
        var numSigns = input3.search(/[^-\+]/);
        var signs = input3.substring(0, numSigns);
        negateIt = signs.match(/-/g).length % 2 === 0;
        input3 = input3.substring(numSigns);
      }
      if (input3 == "NaN")
        x.array = [[0, NaN]];
      else if (input3 == "Infinity")
        x.array = [[0, Infinity]];
      else if (input3[0] != "E") {
        x.array[0][1] = Number(input3);
      } else if (input3.indexOf("#") == -1) {
        x.array[0][1] = Number(input3.substring(1));
        x.array[1] = [1, 1];
      } else {
        var array = input3.substring(1).split("#");
        for (var i2 = 0; i2 < array.length; ++i2) {
          var t = Number(array[i2]);
          if (i2 >= 2) {
            --t;
          }
          x.array[i2] = [i2, t];
        }
      }
      if (negateIt)
        x.sign *= -1;
      x.standardize();
      return x;
    };
    P.getOperatorIndex = function(i2) {
      if (typeof i2 != "number")
        i2 = Number(i2);
      if (!isFinite(i2))
        throw Error(invalidArgument + "Index out of range.");
      var a2 = this.array;
      var min5 = 0, max6 = a2.length - 1;
      if (a2[max6][0] < i2)
        return max6 + 0.5;
      if (a2[min5][0] > i2)
        return -0.5;
      while (min5 != max6) {
        if (a2[min5][0] == i2)
          return min5;
        if (a2[max6][0] == i2)
          return max6;
        var mid = Math.floor((min5 + max6) / 2);
        if (min5 == mid || a2[mid][0] == i2) {
          min5 = mid;
          break;
        }
        if (a2[mid][0] < i2)
          min5 = mid;
        if (a2[mid][0] > i2)
          max6 = mid;
      }
      return a2[min5][0] == i2 ? min5 : min5 + 0.5;
    };
    P.getOperator = function(i2) {
      if (typeof i2 != "number")
        i2 = Number(i2);
      if (!isFinite(i2))
        throw Error(invalidArgument + "Index out of range.");
      var ai = this.getOperatorIndex(i2);
      if (Number.isInteger(ai))
        return this.array[ai][1];
      else
        return i2 === 0 ? 10 : 0;
    };
    P.setOperator = function(i2, value12) {
      if (typeof i2 != "number")
        i2 = Number(i2);
      if (!isFinite(i2))
        throw Error(invalidArgument + "Index out of range.");
      var ai = this.getOperatorIndex(i2);
      if (Number.isInteger(ai))
        this.array[ai][1] = value12;
      else {
        ai = Math.ceil(ai);
        this.array.splice(ai, 0, [i2, value12]);
      }
      this.standardize();
    };
    P.operator = function(i2, value12) {
      if (value12 === void 0)
        return this.getOperator(i2);
      else
        this.setOperator(i2, value12);
    };
    P.clone = function() {
      var temp = new ExpantaNum2();
      var array = [];
      for (var i2 = 0; i2 < this.array.length; ++i2)
        array.push([this.array[i2][0], this.array[i2][1]]);
      temp.array = array;
      temp.sign = this.sign;
      temp.layer = this.layer;
      return temp;
    };
    function clone2(obj) {
      var i2, p2, ps;
      function ExpantaNum3(input3, input22) {
        var x = this;
        if (!(x instanceof ExpantaNum3))
          return new ExpantaNum3(input3, input22);
        x.constructor = ExpantaNum3;
        var parsedObject = null;
        if (typeof input3 == "string" && (input3[0] == "[" || input3[0] == "{")) {
          try {
            parsedObject = JSON.parse(input3);
          } catch (e) {
          }
        }
        var temp, temp2, temp3;
        if (typeof input3 == "number" && !(input22 instanceof Array)) {
          temp = ExpantaNum3.fromNumber(input3);
        } else if (parsedObject) {
          temp = ExpantaNum3.fromObject(parsedObject);
        } else if (typeof input3 == "string" && input3[0] == "E") {
          temp = ExpantaNum3.fromHyperE(input3);
        } else if (typeof input3 == "string") {
          temp = ExpantaNum3.fromString(input3);
        } else if (input3 instanceof Array || input22 instanceof Array) {
          temp = ExpantaNum3.fromArray(input3, input22);
        } else if (input3 instanceof ExpantaNum3) {
          temp = [];
          for (var i3 = 0; i3 < input3.array.length; ++i3)
            temp.push([input3.array[i3][0], input3.array[i3][1]]);
          temp2 = input3.sign;
          temp3 = input3.layer;
        } else if (typeof input3 == "object") {
          temp = ExpantaNum3.fromObject(input3);
        } else {
          temp = [[0, NaN]];
          temp2 = 1;
          temp3 = 0;
        }
        if (typeof temp2 == "undefined") {
          x.array = temp.array;
          x.sign = temp.sign;
          x.layer = temp.layer;
        } else {
          x.array = temp;
          x.sign = temp2;
          x.layer = temp3;
        }
        return x;
      }
      ExpantaNum3.prototype = P;
      ExpantaNum3.JSON = 0;
      ExpantaNum3.STRING = 1;
      ExpantaNum3.NONE = 0;
      ExpantaNum3.NORMAL = 1;
      ExpantaNum3.ALL = 2;
      ExpantaNum3.clone = clone2;
      ExpantaNum3.config = ExpantaNum3.set = config;
      for (var prop3 in Q) {
        if (Q.hasOwnProperty(prop3)) {
          ExpantaNum3[prop3] = Q[prop3];
        }
      }
      if (obj === void 0)
        obj = {};
      if (obj) {
        ps = ["maxOps", "serializeMode", "debug"];
        for (i2 = 0; i2 < ps.length; )
          if (!obj.hasOwnProperty(p2 = ps[i2++]))
            obj[p2] = this[p2];
      }
      ExpantaNum3.config(obj);
      return ExpantaNum3;
    }
    function defineConstants(obj) {
      for (var prop3 in R) {
        if (R.hasOwnProperty(prop3)) {
          if (Object.defineProperty) {
            Object.defineProperty(obj, prop3, {
              configurable: false,
              enumerable: true,
              writable: false,
              value: new ExpantaNum2(R[prop3])
            });
          } else {
            obj[prop3] = new ExpantaNum2(R[prop3]);
          }
        }
      }
      return obj;
    }
    function config(obj) {
      if (!obj || typeof obj !== "object") {
        throw Error(expantaNumError + "Object expected");
      }
      var i2, p2, v, ps = [
        "maxOps",
        1,
        Number.MAX_SAFE_INTEGER,
        "serializeMode",
        0,
        1,
        "debug",
        0,
        2
      ];
      for (i2 = 0; i2 < ps.length; i2 += 3) {
        if ((v = obj[p2 = ps[i2]]) !== void 0) {
          if (Math.floor(v) === v && v >= ps[i2 + 1] && v <= ps[i2 + 2])
            this[p2] = v;
          else
            throw Error(invalidArgument + p2 + ": " + v);
        }
      }
      return this;
    }
    ExpantaNum2 = clone2(ExpantaNum2);
    ExpantaNum2 = defineConstants(ExpantaNum2);
    ExpantaNum2["default"] = ExpantaNum2.ExpantaNum = ExpantaNum2;
    if (typeof define == "function" && define.amd) {
      define(function() {
        return ExpantaNum2;
      });
    } else if (typeof module != "undefined" && module.exports) {
      module.exports = ExpantaNum2;
    } else {
      if (!globalScope) {
        globalScope = typeof self != "undefined" && self && self.self == self ? self : Function("return this")();
      }
      globalScope.ExpantaNum = ExpantaNum2;
    }
  })(void 0);
  var _zero = ExpantaNum.ZERO;
  var _one = ExpantaNum.ONE;
  var _eulers = ExpantaNum.E;
  var _ln2 = ExpantaNum.LN2;
  var _ln10 = ExpantaNum.LN10;
  var _log2Eulers = ExpantaNum.LOG2E;
  var _log10Eulers = ExpantaNum.LOG10E;
  var _pi = ExpantaNum.PI;
  var _sqrtOneHalf = ExpantaNum.SQRT1_2;
  var _sqrt2 = ExpantaNum.SQRT2;
  var _maxSafeInteger = ExpantaNum.MAX_SAFE_INTEGER;
  var _minSafeInteger = ExpantaNum.MIN_SAFE_INTEGER;
  var _NaN = ExpantaNum.NaN;
  var _negativeInfinity = ExpantaNum.NEGATIVE_INFINITY;
  var _infinity = ExpantaNum.POSITIVE_INFINITY;
  var _eMaxSafeInteger = ExpantaNum.E_MAX_SAFE_INTEGER;
  var _eeMaxSafeInteger = ExpantaNum.EE_MAX_SAFE_INTEGER;
  var _tetratedMaxSafeInteger = ExpantaNum.TETRATED_MAX_SAFE_INTEGER;
  var _grahamsNumber = ExpantaNum.GRAHAMS_NUMBER;
  var _absoluteValue = ExpantaNum.absoluteValue;
  var _affordArithmeticSeries = ExpantaNum.affordArithmeticSeries;
  var _affordGeometricSeries = ExpantaNum.affordGeometricSeries;
  var _arrow = ExpantaNum.arrow;
  var _ceiling = ExpantaNum.ceiling;
  var _choose = ExpantaNum.choose;
  var _compare = ExpantaNum.compare;
  var _cubeRoot = ExpantaNum.cubeRoot;
  var _divide = ExpantaNum.divide;
  var _equalsTo = ExpantaNum.equalsTo;
  var _expansion = ExpantaNum.expansion;
  var _factorial = ExpantaNum.factorial;
  var _floor = ExpantaNum.floor;
  var _gamma = ExpantaNum.gamma;
  var _generalLogarithm = ExpantaNum.generalLogarithm;
  var _hyper = ExpantaNum.hyper;
  var _isFinite = ExpantaNum.isFinite;
  var _isInfinite = ExpantaNum.isInfinite;
  var _isInteger = ExpantaNum.isInteger;
  var _isNaN = ExpantaNum.isNaN;
  var _isNegative = ExpantaNum.isNegative;
  var _isPositive = ExpantaNum.isPositive;
  var _iteratedLog = ExpantaNum.iteratedlog;
  var _lambertW = ExpantaNum.lambertw;
  var _layerAdd = ExpantaNum.layeradd;
  var _layerAdd10 = ExpantaNum.layeradd10;
  var _logarithm = ExpantaNum.logarithm;
  var _minus = ExpantaNum.minus;
  var _modular = ExpantaNum.modular;
  var _naturalLogarithm = ExpantaNum.naturalLogarithm;
  var _negate = ExpantaNum.negate;
  var _pentate = ExpantaNum.pentate;
  var _plus = ExpantaNum.plus;
  var _reciprocate = ExpantaNum.reciprocate;
  var _root = ExpantaNum.root;
  var _round = ExpantaNum.round;
  var _slog = ExpantaNum.slog;
  var _squareRoot = ExpantaNum.squareRoot;
  var _ssqrt = ExpantaNum.ssqrt;
  var _sumArithmeticSeries = ExpantaNum.sumArithmeticSeries;
  var _sumGeometricSeries = ExpantaNum.sumGeometricSeries;
  var _times = ExpantaNum.times;
  var _tetrate = ExpantaNum.tetrate;
  var _toPower = ExpantaNum.toPower;
  var _toString = function(x) {
    return x.toString();
  };
  var _toStringWithDecimalPlaces = function(x, places, applyToOpNums) {
    return x.toStringWithDecimalPlaces(places, applyToOpNums);
  };
  var _fromString = ExpantaNum.fromString;
  var _fromNumber = ExpantaNum.fromNumber;

  // output/ExpantaNum/index.js
  var zero2 = _zero;
  var toStringWithDecimalPlaces = function(a2) {
    return function(b2) {
      return function(c) {
        return _toStringWithDecimalPlaces(a2, b2, c);
      };
    };
  };
  var toString = _toString;
  var toPower = function(a2) {
    return function(b2) {
      return _toPower(a2, b2);
    };
  };
  var times = function(a2) {
    return function(b2) {
      return _times(a2, b2);
    };
  };
  var tetrateWithPayload = function(a2) {
    return function(b2) {
      return function(c) {
        return _tetrate(a2, b2, c);
      };
    };
  };
  var sumGeometricSeries = function(a2) {
    return function(b2) {
      return function(c) {
        return function(d) {
          return _sumGeometricSeries(a2, b2, c, d);
        };
      };
    };
  };
  var showEN = {
    show: toString
  };
  var root = function(a2) {
    return function(b2) {
      return _root(a2, b2);
    };
  };
  var reciprocate = _reciprocate;
  var pow = toPower;
  var plus = function(a2) {
    return function(b2) {
      return _plus(a2, b2);
    };
  };
  var one2 = _one;
  var semiringEN = {
    zero: zero2,
    one: one2,
    add: plus,
    mul: times
  };
  var tetrate = function(a2) {
    return function(b2) {
      return tetrateWithPayload(a2)(b2)(one2);
    };
  };
  var tetr = tetrate;
  var minus = function(a2) {
    return function(b2) {
      return _minus(a2, b2);
    };
  };
  var ringEN = {
    sub: minus,
    Semiring0: function() {
      return semiringEN;
    }
  };
  var isPositive = _isPositive;
  var isPos = isPositive;
  var grahamsNumber = _grahamsNumber;
  var fromString = _fromString;
  var mkEN = fromString;
  var fromNumber = _fromNumber;
  var floor = _floor;
  var equalTo = function(a2) {
    return function(b2) {
      return _equalsTo(a2, b2);
    };
  };
  var eqEN = {
    eq: equalTo
  };
  var compareTo = function(a2) {
    return function(b2) {
      return _compare(a2, b2);
    };
  };
  var ordEN = {
    compare: function(x) {
      return function(y) {
        var c = compareTo(x)(y);
        var $3 = c === 0;
        if ($3) {
          return EQ.value;
        }
        ;
        var $4 = c > 0;
        if ($4) {
          return GT.value;
        }
        ;
        return LT.value;
      };
    },
    Eq0: function() {
      return eqEN;
    }
  };
  var affordGeometricSeries = function(a2) {
    return function(b2) {
      return function(c) {
        return function(d) {
          return _affordGeometricSeries(a2, b2, c, d);
        };
      };
    };
  };

  // output/Count.Constants/index.js
  var two = /* @__PURE__ */ mkEN("2");
  var ten = /* @__PURE__ */ mkEN("10");
  var defaultUpdateRate = 30;
  var baseTickSpeedMult = /* @__PURE__ */ mkEN("1.02");
  var baseTickSpeedCostScaling = /* @__PURE__ */ mkEN("5");
  var baseTickSpeedCost = /* @__PURE__ */ mkEN("5");
  var baseIncreaserMult = /* @__PURE__ */ root(two)(ten);
  var baseI3CostScaling = /* @__PURE__ */ root(/* @__PURE__ */ mkEN("1e7"))(ten);
  var baseI3Cost = /* @__PURE__ */ mkEN("1e6");
  var baseI2CostScaling = /* @__PURE__ */ root(/* @__PURE__ */ mkEN("1e4"))(ten);
  var baseI2Cost = /* @__PURE__ */ mkEN("1e3");
  var baseI1CostScaling = /* @__PURE__ */ root(ten)(ten);
  var baseI1Cost = one2;

  // output/Data.Foldable/foreign.js
  var foldrArray = function(f) {
    return function(init2) {
      return function(xs) {
        var acc = init2;
        var len = xs.length;
        for (var i2 = len - 1; i2 >= 0; i2--) {
          acc = f(xs[i2])(acc);
        }
        return acc;
      };
    };
  };
  var foldlArray = function(f) {
    return function(init2) {
      return function(xs) {
        var acc = init2;
        var len = xs.length;
        for (var i2 = 0; i2 < len; i2++) {
          acc = f(acc)(xs[i2]);
        }
        return acc;
      };
    };
  };

  // output/Control.Plus/index.js
  var empty = function(dict) {
    return dict.empty;
  };

  // output/Data.Bifunctor/index.js
  var bimap = function(dict) {
    return dict.bimap;
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
  var coerce2 = /* @__PURE__ */ coerce();
  var unwrap = function() {
    return coerce2;
  };

  // output/Data.Foldable/index.js
  var foldr = function(dict) {
    return dict.foldr;
  };
  var traverse_ = function(dictApplicative) {
    var applySecond2 = applySecond(dictApplicative.Apply0());
    var pure10 = pure(dictApplicative);
    return function(dictFoldable) {
      var foldr23 = foldr(dictFoldable);
      return function(f) {
        return foldr23(function($454) {
          return applySecond2(f($454));
        })(pure10(unit));
      };
    };
  };
  var for_ = function(dictApplicative) {
    var traverse_14 = traverse_(dictApplicative);
    return function(dictFoldable) {
      return flip(traverse_14(dictFoldable));
    };
  };
  var foldl = function(dict) {
    return dict.foldl;
  };
  var foldableMaybe = {
    foldr: function(v) {
      return function(v1) {
        return function(v2) {
          if (v2 instanceof Nothing) {
            return v1;
          }
          ;
          if (v2 instanceof Just) {
            return v(v2.value0)(v1);
          }
          ;
          throw new Error("Failed pattern match at Data.Foldable (line 138, column 1 - line 144, column 27): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
        };
      };
    },
    foldl: function(v) {
      return function(v1) {
        return function(v2) {
          if (v2 instanceof Nothing) {
            return v1;
          }
          ;
          if (v2 instanceof Just) {
            return v(v1)(v2.value0);
          }
          ;
          throw new Error("Failed pattern match at Data.Foldable (line 138, column 1 - line 144, column 27): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
        };
      };
    },
    foldMap: function(dictMonoid) {
      var mempty2 = mempty(dictMonoid);
      return function(v) {
        return function(v1) {
          if (v1 instanceof Nothing) {
            return mempty2;
          }
          ;
          if (v1 instanceof Just) {
            return v(v1.value0);
          }
          ;
          throw new Error("Failed pattern match at Data.Foldable (line 138, column 1 - line 144, column 27): " + [v.constructor.name, v1.constructor.name]);
        };
      };
    }
  };
  var foldMapDefaultR = function(dictFoldable) {
    var foldr23 = foldr(dictFoldable);
    return function(dictMonoid) {
      var append5 = append(dictMonoid.Semigroup0());
      var mempty2 = mempty(dictMonoid);
      return function(f) {
        return foldr23(function(x) {
          return function(acc) {
            return append5(f(x))(acc);
          };
        })(mempty2);
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
  var foldMap = function(dict) {
    return dict.foldMap;
  };

  // output/Data.FoldableWithIndex/index.js
  var foldrWithIndex = function(dict) {
    return dict.foldrWithIndex;
  };
  var foldlWithIndex = function(dict) {
    return dict.foldlWithIndex;
  };
  var foldMapWithIndex = function(dict) {
    return dict.foldMapWithIndex;
  };

  // output/Data.Traversable/foreign.js
  var traverseArrayImpl = function() {
    function array1(a2) {
      return [a2];
    }
    function array2(a2) {
      return function(b2) {
        return [a2, b2];
      };
    }
    function array3(a2) {
      return function(b2) {
        return function(c) {
          return [a2, b2, c];
        };
      };
    }
    function concat2(xs) {
      return function(ys) {
        return xs.concat(ys);
      };
    }
    return function(apply2) {
      return function(map18) {
        return function(pure10) {
          return function(f) {
            return function(array) {
              function go2(bot, top2) {
                switch (top2 - bot) {
                  case 0:
                    return pure10([]);
                  case 1:
                    return map18(array1)(f(array[bot]));
                  case 2:
                    return apply2(map18(array2)(f(array[bot])))(f(array[bot + 1]));
                  case 3:
                    return apply2(apply2(map18(array3)(f(array[bot])))(f(array[bot + 1])))(f(array[bot + 2]));
                  default:
                    var pivot = bot + Math.floor((top2 - bot) / 4) * 2;
                    return apply2(map18(concat2)(go2(bot, pivot)))(go2(pivot, top2));
                }
              }
              return go2(0, array.length);
            };
          };
        };
      };
    };
  }();

  // output/Data.Unfoldable/foreign.js
  var unfoldrArrayImpl = function(isNothing2) {
    return function(fromJust5) {
      return function(fst2) {
        return function(snd2) {
          return function(f) {
            return function(b2) {
              var result = [];
              var value12 = b2;
              while (true) {
                var maybe2 = f(value12);
                if (isNothing2(maybe2))
                  return result;
                var tuple = fromJust5(maybe2);
                result.push(fst2(tuple));
                value12 = snd2(tuple);
              }
            };
          };
        };
      };
    };
  };

  // output/Data.Unfoldable1/foreign.js
  var unfoldr1ArrayImpl = function(isNothing2) {
    return function(fromJust5) {
      return function(fst2) {
        return function(snd2) {
          return function(f) {
            return function(b2) {
              var result = [];
              var value12 = b2;
              while (true) {
                var tuple = f(value12);
                result.push(fst2(tuple));
                var maybe2 = snd2(tuple);
                if (isNothing2(maybe2))
                  return result;
                value12 = fromJust5(maybe2);
              }
            };
          };
        };
      };
    };
  };

  // output/Data.Unfoldable1/index.js
  var fromJust2 = /* @__PURE__ */ fromJust();
  var unfoldable1Array = {
    unfoldr1: /* @__PURE__ */ unfoldr1ArrayImpl(isNothing)(fromJust2)(fst)(snd)
  };

  // output/Data.Unfoldable/index.js
  var fromJust3 = /* @__PURE__ */ fromJust();
  var unfoldr = function(dict) {
    return dict.unfoldr;
  };
  var unfoldableArray = {
    unfoldr: /* @__PURE__ */ unfoldrArrayImpl(isNothing)(fromJust3)(fst)(snd),
    Unfoldable10: function() {
      return unfoldable1Array;
    }
  };

  // output/Data.NonEmpty/index.js
  var NonEmpty = /* @__PURE__ */ function() {
    function NonEmpty2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    NonEmpty2.create = function(value0) {
      return function(value1) {
        return new NonEmpty2(value0, value1);
      };
    };
    return NonEmpty2;
  }();
  var singleton2 = function(dictPlus) {
    var empty7 = empty(dictPlus);
    return function(a2) {
      return new NonEmpty(a2, empty7);
    };
  };

  // output/Data.List.Types/index.js
  var Nil = /* @__PURE__ */ function() {
    function Nil3() {
    }
    ;
    Nil3.value = new Nil3();
    return Nil3;
  }();
  var Cons = /* @__PURE__ */ function() {
    function Cons3(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Cons3.create = function(value0) {
      return function(value1) {
        return new Cons3(value0, value1);
      };
    };
    return Cons3;
  }();
  var NonEmptyList = function(x) {
    return x;
  };
  var listMap = function(f) {
    var chunkedRevMap = function($copy_v) {
      return function($copy_v1) {
        var $tco_var_v = $copy_v;
        var $tco_done = false;
        var $tco_result;
        function $tco_loop(v, v1) {
          if (v1 instanceof Cons && (v1.value1 instanceof Cons && v1.value1.value1 instanceof Cons)) {
            $tco_var_v = new Cons(v1, v);
            $copy_v1 = v1.value1.value1.value1;
            return;
          }
          ;
          var unrolledMap = function(v2) {
            if (v2 instanceof Cons && (v2.value1 instanceof Cons && v2.value1.value1 instanceof Nil)) {
              return new Cons(f(v2.value0), new Cons(f(v2.value1.value0), Nil.value));
            }
            ;
            if (v2 instanceof Cons && v2.value1 instanceof Nil) {
              return new Cons(f(v2.value0), Nil.value);
            }
            ;
            return Nil.value;
          };
          var reverseUnrolledMap = function($copy_v2) {
            return function($copy_v3) {
              var $tco_var_v2 = $copy_v2;
              var $tco_done1 = false;
              var $tco_result2;
              function $tco_loop2(v2, v3) {
                if (v2 instanceof Cons && (v2.value0 instanceof Cons && (v2.value0.value1 instanceof Cons && v2.value0.value1.value1 instanceof Cons))) {
                  $tco_var_v2 = v2.value1;
                  $copy_v3 = new Cons(f(v2.value0.value0), new Cons(f(v2.value0.value1.value0), new Cons(f(v2.value0.value1.value1.value0), v3)));
                  return;
                }
                ;
                $tco_done1 = true;
                return v3;
              }
              ;
              while (!$tco_done1) {
                $tco_result2 = $tco_loop2($tco_var_v2, $copy_v3);
              }
              ;
              return $tco_result2;
            };
          };
          $tco_done = true;
          return reverseUnrolledMap(v)(unrolledMap(v1));
        }
        ;
        while (!$tco_done) {
          $tco_result = $tco_loop($tco_var_v, $copy_v1);
        }
        ;
        return $tco_result;
      };
    };
    return chunkedRevMap(Nil.value);
  };
  var functorList = {
    map: listMap
  };
  var foldableList = {
    foldr: function(f) {
      return function(b2) {
        var rev3 = function() {
          var go2 = function($copy_v) {
            return function($copy_v1) {
              var $tco_var_v = $copy_v;
              var $tco_done = false;
              var $tco_result;
              function $tco_loop(v, v1) {
                if (v1 instanceof Nil) {
                  $tco_done = true;
                  return v;
                }
                ;
                if (v1 instanceof Cons) {
                  $tco_var_v = new Cons(v1.value0, v);
                  $copy_v1 = v1.value1;
                  return;
                }
                ;
                throw new Error("Failed pattern match at Data.List.Types (line 107, column 7 - line 107, column 23): " + [v.constructor.name, v1.constructor.name]);
              }
              ;
              while (!$tco_done) {
                $tco_result = $tco_loop($tco_var_v, $copy_v1);
              }
              ;
              return $tco_result;
            };
          };
          return go2(Nil.value);
        }();
        var $284 = foldl(foldableList)(flip(f))(b2);
        return function($285) {
          return $284(rev3($285));
        };
      };
    },
    foldl: function(f) {
      var go2 = function($copy_b) {
        return function($copy_v) {
          var $tco_var_b = $copy_b;
          var $tco_done1 = false;
          var $tco_result;
          function $tco_loop(b2, v) {
            if (v instanceof Nil) {
              $tco_done1 = true;
              return b2;
            }
            ;
            if (v instanceof Cons) {
              $tco_var_b = f(b2)(v.value0);
              $copy_v = v.value1;
              return;
            }
            ;
            throw new Error("Failed pattern match at Data.List.Types (line 111, column 12 - line 113, column 30): " + [v.constructor.name]);
          }
          ;
          while (!$tco_done1) {
            $tco_result = $tco_loop($tco_var_b, $copy_v);
          }
          ;
          return $tco_result;
        };
      };
      return go2;
    },
    foldMap: function(dictMonoid) {
      var append22 = append(dictMonoid.Semigroup0());
      var mempty2 = mempty(dictMonoid);
      return function(f) {
        return foldl(foldableList)(function(acc) {
          var $286 = append22(acc);
          return function($287) {
            return $286(f($287));
          };
        })(mempty2);
      };
    }
  };
  var foldr2 = /* @__PURE__ */ foldr(foldableList);
  var semigroupList = {
    append: function(xs) {
      return function(ys) {
        return foldr2(Cons.create)(ys)(xs);
      };
    }
  };
  var append1 = /* @__PURE__ */ append(semigroupList);
  var altList = {
    alt: append1,
    Functor0: function() {
      return functorList;
    }
  };
  var plusList = /* @__PURE__ */ function() {
    return {
      empty: Nil.value,
      Alt0: function() {
        return altList;
      }
    };
  }();

  // output/Data.List/index.js
  var reverse = /* @__PURE__ */ function() {
    var go2 = function($copy_v) {
      return function($copy_v1) {
        var $tco_var_v = $copy_v;
        var $tco_done = false;
        var $tco_result;
        function $tco_loop(v, v1) {
          if (v1 instanceof Nil) {
            $tco_done = true;
            return v;
          }
          ;
          if (v1 instanceof Cons) {
            $tco_var_v = new Cons(v1.value0, v);
            $copy_v1 = v1.value1;
            return;
          }
          ;
          throw new Error("Failed pattern match at Data.List (line 368, column 3 - line 368, column 19): " + [v.constructor.name, v1.constructor.name]);
        }
        ;
        while (!$tco_done) {
          $tco_result = $tco_loop($tco_var_v, $copy_v1);
        }
        ;
        return $tco_result;
      };
    };
    return go2(Nil.value);
  }();
  var $$null = function(v) {
    if (v instanceof Nil) {
      return true;
    }
    ;
    return false;
  };

  // output/Partial.Unsafe/foreign.js
  var _unsafePartial = function(f) {
    return f();
  };

  // output/Partial/foreign.js
  var _crashWith = function(msg) {
    throw new Error(msg);
  };

  // output/Partial/index.js
  var crashWith = function() {
    return _crashWith;
  };

  // output/Partial.Unsafe/index.js
  var crashWith2 = /* @__PURE__ */ crashWith();
  var unsafePartial = _unsafePartial;
  var unsafeCrashWith = function(msg) {
    return unsafePartial(function() {
      return crashWith2(msg);
    });
  };

  // output/Data.Map.Internal/index.js
  var Leaf = /* @__PURE__ */ function() {
    function Leaf2() {
    }
    ;
    Leaf2.value = new Leaf2();
    return Leaf2;
  }();
  var Two = /* @__PURE__ */ function() {
    function Two2(value0, value1, value22, value32) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
      this.value3 = value32;
    }
    ;
    Two2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return function(value32) {
            return new Two2(value0, value1, value22, value32);
          };
        };
      };
    };
    return Two2;
  }();
  var Three = /* @__PURE__ */ function() {
    function Three2(value0, value1, value22, value32, value42, value52, value62) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
      this.value3 = value32;
      this.value4 = value42;
      this.value5 = value52;
      this.value6 = value62;
    }
    ;
    Three2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return function(value32) {
            return function(value42) {
              return function(value52) {
                return function(value62) {
                  return new Three2(value0, value1, value22, value32, value42, value52, value62);
                };
              };
            };
          };
        };
      };
    };
    return Three2;
  }();
  var TwoLeft = /* @__PURE__ */ function() {
    function TwoLeft2(value0, value1, value22) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
    }
    ;
    TwoLeft2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return new TwoLeft2(value0, value1, value22);
        };
      };
    };
    return TwoLeft2;
  }();
  var TwoRight = /* @__PURE__ */ function() {
    function TwoRight2(value0, value1, value22) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
    }
    ;
    TwoRight2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return new TwoRight2(value0, value1, value22);
        };
      };
    };
    return TwoRight2;
  }();
  var ThreeLeft = /* @__PURE__ */ function() {
    function ThreeLeft2(value0, value1, value22, value32, value42, value52) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
      this.value3 = value32;
      this.value4 = value42;
      this.value5 = value52;
    }
    ;
    ThreeLeft2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return function(value32) {
            return function(value42) {
              return function(value52) {
                return new ThreeLeft2(value0, value1, value22, value32, value42, value52);
              };
            };
          };
        };
      };
    };
    return ThreeLeft2;
  }();
  var ThreeMiddle = /* @__PURE__ */ function() {
    function ThreeMiddle2(value0, value1, value22, value32, value42, value52) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
      this.value3 = value32;
      this.value4 = value42;
      this.value5 = value52;
    }
    ;
    ThreeMiddle2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return function(value32) {
            return function(value42) {
              return function(value52) {
                return new ThreeMiddle2(value0, value1, value22, value32, value42, value52);
              };
            };
          };
        };
      };
    };
    return ThreeMiddle2;
  }();
  var ThreeRight = /* @__PURE__ */ function() {
    function ThreeRight2(value0, value1, value22, value32, value42, value52) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
      this.value3 = value32;
      this.value4 = value42;
      this.value5 = value52;
    }
    ;
    ThreeRight2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return function(value32) {
            return function(value42) {
              return function(value52) {
                return new ThreeRight2(value0, value1, value22, value32, value42, value52);
              };
            };
          };
        };
      };
    };
    return ThreeRight2;
  }();
  var KickUp = /* @__PURE__ */ function() {
    function KickUp2(value0, value1, value22, value32) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
      this.value3 = value32;
    }
    ;
    KickUp2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return function(value32) {
            return new KickUp2(value0, value1, value22, value32);
          };
        };
      };
    };
    return KickUp2;
  }();
  var singleton3 = function(k) {
    return function(v) {
      return new Two(Leaf.value, k, v, Leaf.value);
    };
  };
  var toUnfoldable = function(dictUnfoldable) {
    var unfoldr2 = unfoldr(dictUnfoldable);
    return function(m) {
      var go2 = function($copy_v) {
        var $tco_done = false;
        var $tco_result;
        function $tco_loop(v) {
          if (v instanceof Nil) {
            $tco_done = true;
            return Nothing.value;
          }
          ;
          if (v instanceof Cons) {
            if (v.value0 instanceof Leaf) {
              $copy_v = v.value1;
              return;
            }
            ;
            if (v.value0 instanceof Two && (v.value0.value0 instanceof Leaf && v.value0.value3 instanceof Leaf)) {
              $tco_done = true;
              return new Just(new Tuple(new Tuple(v.value0.value1, v.value0.value2), v.value1));
            }
            ;
            if (v.value0 instanceof Two && v.value0.value0 instanceof Leaf) {
              $tco_done = true;
              return new Just(new Tuple(new Tuple(v.value0.value1, v.value0.value2), new Cons(v.value0.value3, v.value1)));
            }
            ;
            if (v.value0 instanceof Two) {
              $copy_v = new Cons(v.value0.value0, new Cons(singleton3(v.value0.value1)(v.value0.value2), new Cons(v.value0.value3, v.value1)));
              return;
            }
            ;
            if (v.value0 instanceof Three) {
              $copy_v = new Cons(v.value0.value0, new Cons(singleton3(v.value0.value1)(v.value0.value2), new Cons(v.value0.value3, new Cons(singleton3(v.value0.value4)(v.value0.value5), new Cons(v.value0.value6, v.value1)))));
              return;
            }
            ;
            throw new Error("Failed pattern match at Data.Map.Internal (line 624, column 18 - line 633, column 71): " + [v.value0.constructor.name]);
          }
          ;
          throw new Error("Failed pattern match at Data.Map.Internal (line 623, column 3 - line 623, column 19): " + [v.constructor.name]);
        }
        ;
        while (!$tco_done) {
          $tco_result = $tco_loop($copy_v);
        }
        ;
        return $tco_result;
      };
      return unfoldr2(go2)(new Cons(m, Nil.value));
    };
  };
  var lookup = function(dictOrd) {
    var compare2 = compare(dictOrd);
    return function(k) {
      var go2 = function($copy_v) {
        var $tco_done = false;
        var $tco_result;
        function $tco_loop(v) {
          if (v instanceof Leaf) {
            $tco_done = true;
            return Nothing.value;
          }
          ;
          if (v instanceof Two) {
            var v2 = compare2(k)(v.value1);
            if (v2 instanceof EQ) {
              $tco_done = true;
              return new Just(v.value2);
            }
            ;
            if (v2 instanceof LT) {
              $copy_v = v.value0;
              return;
            }
            ;
            $copy_v = v.value3;
            return;
          }
          ;
          if (v instanceof Three) {
            var v3 = compare2(k)(v.value1);
            if (v3 instanceof EQ) {
              $tco_done = true;
              return new Just(v.value2);
            }
            ;
            var v4 = compare2(k)(v.value4);
            if (v4 instanceof EQ) {
              $tco_done = true;
              return new Just(v.value5);
            }
            ;
            if (v3 instanceof LT) {
              $copy_v = v.value0;
              return;
            }
            ;
            if (v4 instanceof GT) {
              $copy_v = v.value6;
              return;
            }
            ;
            $copy_v = v.value3;
            return;
          }
          ;
          throw new Error("Failed pattern match at Data.Map.Internal (line 241, column 5 - line 241, column 22): " + [v.constructor.name]);
        }
        ;
        while (!$tco_done) {
          $tco_result = $tco_loop($copy_v);
        }
        ;
        return $tco_result;
      };
      return go2;
    };
  };
  var functorMap = {
    map: function(v) {
      return function(v1) {
        if (v1 instanceof Leaf) {
          return Leaf.value;
        }
        ;
        if (v1 instanceof Two) {
          return new Two(map(functorMap)(v)(v1.value0), v1.value1, v(v1.value2), map(functorMap)(v)(v1.value3));
        }
        ;
        if (v1 instanceof Three) {
          return new Three(map(functorMap)(v)(v1.value0), v1.value1, v(v1.value2), map(functorMap)(v)(v1.value3), v1.value4, v(v1.value5), map(functorMap)(v)(v1.value6));
        }
        ;
        throw new Error("Failed pattern match at Data.Map.Internal (line 116, column 1 - line 119, column 110): " + [v.constructor.name, v1.constructor.name]);
      };
    }
  };
  var fromZipper = function($copy_dictOrd) {
    return function($copy_v) {
      return function($copy_v1) {
        var $tco_var_dictOrd = $copy_dictOrd;
        var $tco_var_v = $copy_v;
        var $tco_done = false;
        var $tco_result;
        function $tco_loop(dictOrd, v, v1) {
          if (v instanceof Nil) {
            $tco_done = true;
            return v1;
          }
          ;
          if (v instanceof Cons) {
            if (v.value0 instanceof TwoLeft) {
              $tco_var_dictOrd = dictOrd;
              $tco_var_v = v.value1;
              $copy_v1 = new Two(v1, v.value0.value0, v.value0.value1, v.value0.value2);
              return;
            }
            ;
            if (v.value0 instanceof TwoRight) {
              $tco_var_dictOrd = dictOrd;
              $tco_var_v = v.value1;
              $copy_v1 = new Two(v.value0.value0, v.value0.value1, v.value0.value2, v1);
              return;
            }
            ;
            if (v.value0 instanceof ThreeLeft) {
              $tco_var_dictOrd = dictOrd;
              $tco_var_v = v.value1;
              $copy_v1 = new Three(v1, v.value0.value0, v.value0.value1, v.value0.value2, v.value0.value3, v.value0.value4, v.value0.value5);
              return;
            }
            ;
            if (v.value0 instanceof ThreeMiddle) {
              $tco_var_dictOrd = dictOrd;
              $tco_var_v = v.value1;
              $copy_v1 = new Three(v.value0.value0, v.value0.value1, v.value0.value2, v1, v.value0.value3, v.value0.value4, v.value0.value5);
              return;
            }
            ;
            if (v.value0 instanceof ThreeRight) {
              $tco_var_dictOrd = dictOrd;
              $tco_var_v = v.value1;
              $copy_v1 = new Three(v.value0.value0, v.value0.value1, v.value0.value2, v.value0.value3, v.value0.value4, v.value0.value5, v1);
              return;
            }
            ;
            throw new Error("Failed pattern match at Data.Map.Internal (line 462, column 3 - line 467, column 88): " + [v.value0.constructor.name]);
          }
          ;
          throw new Error("Failed pattern match at Data.Map.Internal (line 459, column 1 - line 459, column 80): " + [v.constructor.name, v1.constructor.name]);
        }
        ;
        while (!$tco_done) {
          $tco_result = $tco_loop($tco_var_dictOrd, $tco_var_v, $copy_v1);
        }
        ;
        return $tco_result;
      };
    };
  };
  var insert = function(dictOrd) {
    var fromZipper1 = fromZipper(dictOrd);
    var compare2 = compare(dictOrd);
    return function(k) {
      return function(v) {
        var up = function($copy_v1) {
          return function($copy_v2) {
            var $tco_var_v1 = $copy_v1;
            var $tco_done = false;
            var $tco_result;
            function $tco_loop(v1, v2) {
              if (v1 instanceof Nil) {
                $tco_done = true;
                return new Two(v2.value0, v2.value1, v2.value2, v2.value3);
              }
              ;
              if (v1 instanceof Cons) {
                if (v1.value0 instanceof TwoLeft) {
                  $tco_done = true;
                  return fromZipper1(v1.value1)(new Three(v2.value0, v2.value1, v2.value2, v2.value3, v1.value0.value0, v1.value0.value1, v1.value0.value2));
                }
                ;
                if (v1.value0 instanceof TwoRight) {
                  $tco_done = true;
                  return fromZipper1(v1.value1)(new Three(v1.value0.value0, v1.value0.value1, v1.value0.value2, v2.value0, v2.value1, v2.value2, v2.value3));
                }
                ;
                if (v1.value0 instanceof ThreeLeft) {
                  $tco_var_v1 = v1.value1;
                  $copy_v2 = new KickUp(new Two(v2.value0, v2.value1, v2.value2, v2.value3), v1.value0.value0, v1.value0.value1, new Two(v1.value0.value2, v1.value0.value3, v1.value0.value4, v1.value0.value5));
                  return;
                }
                ;
                if (v1.value0 instanceof ThreeMiddle) {
                  $tco_var_v1 = v1.value1;
                  $copy_v2 = new KickUp(new Two(v1.value0.value0, v1.value0.value1, v1.value0.value2, v2.value0), v2.value1, v2.value2, new Two(v2.value3, v1.value0.value3, v1.value0.value4, v1.value0.value5));
                  return;
                }
                ;
                if (v1.value0 instanceof ThreeRight) {
                  $tco_var_v1 = v1.value1;
                  $copy_v2 = new KickUp(new Two(v1.value0.value0, v1.value0.value1, v1.value0.value2, v1.value0.value3), v1.value0.value4, v1.value0.value5, new Two(v2.value0, v2.value1, v2.value2, v2.value3));
                  return;
                }
                ;
                throw new Error("Failed pattern match at Data.Map.Internal (line 498, column 5 - line 503, column 108): " + [v1.value0.constructor.name, v2.constructor.name]);
              }
              ;
              throw new Error("Failed pattern match at Data.Map.Internal (line 495, column 3 - line 495, column 56): " + [v1.constructor.name, v2.constructor.name]);
            }
            ;
            while (!$tco_done) {
              $tco_result = $tco_loop($tco_var_v1, $copy_v2);
            }
            ;
            return $tco_result;
          };
        };
        var down = function($copy_v1) {
          return function($copy_v2) {
            var $tco_var_v1 = $copy_v1;
            var $tco_done1 = false;
            var $tco_result;
            function $tco_loop(v1, v2) {
              if (v2 instanceof Leaf) {
                $tco_done1 = true;
                return up(v1)(new KickUp(Leaf.value, k, v, Leaf.value));
              }
              ;
              if (v2 instanceof Two) {
                var v3 = compare2(k)(v2.value1);
                if (v3 instanceof EQ) {
                  $tco_done1 = true;
                  return fromZipper1(v1)(new Two(v2.value0, k, v, v2.value3));
                }
                ;
                if (v3 instanceof LT) {
                  $tco_var_v1 = new Cons(new TwoLeft(v2.value1, v2.value2, v2.value3), v1);
                  $copy_v2 = v2.value0;
                  return;
                }
                ;
                $tco_var_v1 = new Cons(new TwoRight(v2.value0, v2.value1, v2.value2), v1);
                $copy_v2 = v2.value3;
                return;
              }
              ;
              if (v2 instanceof Three) {
                var v3 = compare2(k)(v2.value1);
                if (v3 instanceof EQ) {
                  $tco_done1 = true;
                  return fromZipper1(v1)(new Three(v2.value0, k, v, v2.value3, v2.value4, v2.value5, v2.value6));
                }
                ;
                var v4 = compare2(k)(v2.value4);
                if (v4 instanceof EQ) {
                  $tco_done1 = true;
                  return fromZipper1(v1)(new Three(v2.value0, v2.value1, v2.value2, v2.value3, k, v, v2.value6));
                }
                ;
                if (v3 instanceof LT) {
                  $tco_var_v1 = new Cons(new ThreeLeft(v2.value1, v2.value2, v2.value3, v2.value4, v2.value5, v2.value6), v1);
                  $copy_v2 = v2.value0;
                  return;
                }
                ;
                if (v3 instanceof GT && v4 instanceof LT) {
                  $tco_var_v1 = new Cons(new ThreeMiddle(v2.value0, v2.value1, v2.value2, v2.value4, v2.value5, v2.value6), v1);
                  $copy_v2 = v2.value3;
                  return;
                }
                ;
                $tco_var_v1 = new Cons(new ThreeRight(v2.value0, v2.value1, v2.value2, v2.value3, v2.value4, v2.value5), v1);
                $copy_v2 = v2.value6;
                return;
              }
              ;
              throw new Error("Failed pattern match at Data.Map.Internal (line 478, column 3 - line 478, column 55): " + [v1.constructor.name, v2.constructor.name]);
            }
            ;
            while (!$tco_done1) {
              $tco_result = $tco_loop($tco_var_v1, $copy_v2);
            }
            ;
            return $tco_result;
          };
        };
        return down(Nil.value);
      };
    };
  };
  var pop = function(dictOrd) {
    var fromZipper1 = fromZipper(dictOrd);
    var compare2 = compare(dictOrd);
    return function(k) {
      var up = function($copy_ctxs) {
        return function($copy_tree) {
          var $tco_var_ctxs = $copy_ctxs;
          var $tco_done = false;
          var $tco_result;
          function $tco_loop(ctxs, tree) {
            if (ctxs instanceof Nil) {
              $tco_done = true;
              return tree;
            }
            ;
            if (ctxs instanceof Cons) {
              if (ctxs.value0 instanceof TwoLeft && (ctxs.value0.value2 instanceof Leaf && tree instanceof Leaf)) {
                $tco_done = true;
                return fromZipper1(ctxs.value1)(new Two(Leaf.value, ctxs.value0.value0, ctxs.value0.value1, Leaf.value));
              }
              ;
              if (ctxs.value0 instanceof TwoRight && (ctxs.value0.value0 instanceof Leaf && tree instanceof Leaf)) {
                $tco_done = true;
                return fromZipper1(ctxs.value1)(new Two(Leaf.value, ctxs.value0.value1, ctxs.value0.value2, Leaf.value));
              }
              ;
              if (ctxs.value0 instanceof TwoLeft && ctxs.value0.value2 instanceof Two) {
                $tco_var_ctxs = ctxs.value1;
                $copy_tree = new Three(tree, ctxs.value0.value0, ctxs.value0.value1, ctxs.value0.value2.value0, ctxs.value0.value2.value1, ctxs.value0.value2.value2, ctxs.value0.value2.value3);
                return;
              }
              ;
              if (ctxs.value0 instanceof TwoRight && ctxs.value0.value0 instanceof Two) {
                $tco_var_ctxs = ctxs.value1;
                $copy_tree = new Three(ctxs.value0.value0.value0, ctxs.value0.value0.value1, ctxs.value0.value0.value2, ctxs.value0.value0.value3, ctxs.value0.value1, ctxs.value0.value2, tree);
                return;
              }
              ;
              if (ctxs.value0 instanceof TwoLeft && ctxs.value0.value2 instanceof Three) {
                $tco_done = true;
                return fromZipper1(ctxs.value1)(new Two(new Two(tree, ctxs.value0.value0, ctxs.value0.value1, ctxs.value0.value2.value0), ctxs.value0.value2.value1, ctxs.value0.value2.value2, new Two(ctxs.value0.value2.value3, ctxs.value0.value2.value4, ctxs.value0.value2.value5, ctxs.value0.value2.value6)));
              }
              ;
              if (ctxs.value0 instanceof TwoRight && ctxs.value0.value0 instanceof Three) {
                $tco_done = true;
                return fromZipper1(ctxs.value1)(new Two(new Two(ctxs.value0.value0.value0, ctxs.value0.value0.value1, ctxs.value0.value0.value2, ctxs.value0.value0.value3), ctxs.value0.value0.value4, ctxs.value0.value0.value5, new Two(ctxs.value0.value0.value6, ctxs.value0.value1, ctxs.value0.value2, tree)));
              }
              ;
              if (ctxs.value0 instanceof ThreeLeft && (ctxs.value0.value2 instanceof Leaf && (ctxs.value0.value5 instanceof Leaf && tree instanceof Leaf))) {
                $tco_done = true;
                return fromZipper1(ctxs.value1)(new Three(Leaf.value, ctxs.value0.value0, ctxs.value0.value1, Leaf.value, ctxs.value0.value3, ctxs.value0.value4, Leaf.value));
              }
              ;
              if (ctxs.value0 instanceof ThreeMiddle && (ctxs.value0.value0 instanceof Leaf && (ctxs.value0.value5 instanceof Leaf && tree instanceof Leaf))) {
                $tco_done = true;
                return fromZipper1(ctxs.value1)(new Three(Leaf.value, ctxs.value0.value1, ctxs.value0.value2, Leaf.value, ctxs.value0.value3, ctxs.value0.value4, Leaf.value));
              }
              ;
              if (ctxs.value0 instanceof ThreeRight && (ctxs.value0.value0 instanceof Leaf && (ctxs.value0.value3 instanceof Leaf && tree instanceof Leaf))) {
                $tco_done = true;
                return fromZipper1(ctxs.value1)(new Three(Leaf.value, ctxs.value0.value1, ctxs.value0.value2, Leaf.value, ctxs.value0.value4, ctxs.value0.value5, Leaf.value));
              }
              ;
              if (ctxs.value0 instanceof ThreeLeft && ctxs.value0.value2 instanceof Two) {
                $tco_done = true;
                return fromZipper1(ctxs.value1)(new Two(new Three(tree, ctxs.value0.value0, ctxs.value0.value1, ctxs.value0.value2.value0, ctxs.value0.value2.value1, ctxs.value0.value2.value2, ctxs.value0.value2.value3), ctxs.value0.value3, ctxs.value0.value4, ctxs.value0.value5));
              }
              ;
              if (ctxs.value0 instanceof ThreeMiddle && ctxs.value0.value0 instanceof Two) {
                $tco_done = true;
                return fromZipper1(ctxs.value1)(new Two(new Three(ctxs.value0.value0.value0, ctxs.value0.value0.value1, ctxs.value0.value0.value2, ctxs.value0.value0.value3, ctxs.value0.value1, ctxs.value0.value2, tree), ctxs.value0.value3, ctxs.value0.value4, ctxs.value0.value5));
              }
              ;
              if (ctxs.value0 instanceof ThreeMiddle && ctxs.value0.value5 instanceof Two) {
                $tco_done = true;
                return fromZipper1(ctxs.value1)(new Two(ctxs.value0.value0, ctxs.value0.value1, ctxs.value0.value2, new Three(tree, ctxs.value0.value3, ctxs.value0.value4, ctxs.value0.value5.value0, ctxs.value0.value5.value1, ctxs.value0.value5.value2, ctxs.value0.value5.value3)));
              }
              ;
              if (ctxs.value0 instanceof ThreeRight && ctxs.value0.value3 instanceof Two) {
                $tco_done = true;
                return fromZipper1(ctxs.value1)(new Two(ctxs.value0.value0, ctxs.value0.value1, ctxs.value0.value2, new Three(ctxs.value0.value3.value0, ctxs.value0.value3.value1, ctxs.value0.value3.value2, ctxs.value0.value3.value3, ctxs.value0.value4, ctxs.value0.value5, tree)));
              }
              ;
              if (ctxs.value0 instanceof ThreeLeft && ctxs.value0.value2 instanceof Three) {
                $tco_done = true;
                return fromZipper1(ctxs.value1)(new Three(new Two(tree, ctxs.value0.value0, ctxs.value0.value1, ctxs.value0.value2.value0), ctxs.value0.value2.value1, ctxs.value0.value2.value2, new Two(ctxs.value0.value2.value3, ctxs.value0.value2.value4, ctxs.value0.value2.value5, ctxs.value0.value2.value6), ctxs.value0.value3, ctxs.value0.value4, ctxs.value0.value5));
              }
              ;
              if (ctxs.value0 instanceof ThreeMiddle && ctxs.value0.value0 instanceof Three) {
                $tco_done = true;
                return fromZipper1(ctxs.value1)(new Three(new Two(ctxs.value0.value0.value0, ctxs.value0.value0.value1, ctxs.value0.value0.value2, ctxs.value0.value0.value3), ctxs.value0.value0.value4, ctxs.value0.value0.value5, new Two(ctxs.value0.value0.value6, ctxs.value0.value1, ctxs.value0.value2, tree), ctxs.value0.value3, ctxs.value0.value4, ctxs.value0.value5));
              }
              ;
              if (ctxs.value0 instanceof ThreeMiddle && ctxs.value0.value5 instanceof Three) {
                $tco_done = true;
                return fromZipper1(ctxs.value1)(new Three(ctxs.value0.value0, ctxs.value0.value1, ctxs.value0.value2, new Two(tree, ctxs.value0.value3, ctxs.value0.value4, ctxs.value0.value5.value0), ctxs.value0.value5.value1, ctxs.value0.value5.value2, new Two(ctxs.value0.value5.value3, ctxs.value0.value5.value4, ctxs.value0.value5.value5, ctxs.value0.value5.value6)));
              }
              ;
              if (ctxs.value0 instanceof ThreeRight && ctxs.value0.value3 instanceof Three) {
                $tco_done = true;
                return fromZipper1(ctxs.value1)(new Three(ctxs.value0.value0, ctxs.value0.value1, ctxs.value0.value2, new Two(ctxs.value0.value3.value0, ctxs.value0.value3.value1, ctxs.value0.value3.value2, ctxs.value0.value3.value3), ctxs.value0.value3.value4, ctxs.value0.value3.value5, new Two(ctxs.value0.value3.value6, ctxs.value0.value4, ctxs.value0.value5, tree)));
              }
              ;
              $tco_done = true;
              return unsafeCrashWith("The impossible happened in partial function `up`.");
            }
            ;
            throw new Error("Failed pattern match at Data.Map.Internal (line 552, column 5 - line 573, column 86): " + [ctxs.constructor.name]);
          }
          ;
          while (!$tco_done) {
            $tco_result = $tco_loop($tco_var_ctxs, $copy_tree);
          }
          ;
          return $tco_result;
        };
      };
      var removeMaxNode = function($copy_ctx) {
        return function($copy_m) {
          var $tco_var_ctx = $copy_ctx;
          var $tco_done1 = false;
          var $tco_result;
          function $tco_loop(ctx, m) {
            if (m instanceof Two && (m.value0 instanceof Leaf && m.value3 instanceof Leaf)) {
              $tco_done1 = true;
              return up(ctx)(Leaf.value);
            }
            ;
            if (m instanceof Two) {
              $tco_var_ctx = new Cons(new TwoRight(m.value0, m.value1, m.value2), ctx);
              $copy_m = m.value3;
              return;
            }
            ;
            if (m instanceof Three && (m.value0 instanceof Leaf && (m.value3 instanceof Leaf && m.value6 instanceof Leaf))) {
              $tco_done1 = true;
              return up(new Cons(new TwoRight(Leaf.value, m.value1, m.value2), ctx))(Leaf.value);
            }
            ;
            if (m instanceof Three) {
              $tco_var_ctx = new Cons(new ThreeRight(m.value0, m.value1, m.value2, m.value3, m.value4, m.value5), ctx);
              $copy_m = m.value6;
              return;
            }
            ;
            $tco_done1 = true;
            return unsafeCrashWith("The impossible happened in partial function `removeMaxNode`.");
          }
          ;
          while (!$tco_done1) {
            $tco_result = $tco_loop($tco_var_ctx, $copy_m);
          }
          ;
          return $tco_result;
        };
      };
      var maxNode = function($copy_m) {
        var $tco_done2 = false;
        var $tco_result;
        function $tco_loop(m) {
          if (m instanceof Two && m.value3 instanceof Leaf) {
            $tco_done2 = true;
            return {
              key: m.value1,
              value: m.value2
            };
          }
          ;
          if (m instanceof Two) {
            $copy_m = m.value3;
            return;
          }
          ;
          if (m instanceof Three && m.value6 instanceof Leaf) {
            $tco_done2 = true;
            return {
              key: m.value4,
              value: m.value5
            };
          }
          ;
          if (m instanceof Three) {
            $copy_m = m.value6;
            return;
          }
          ;
          $tco_done2 = true;
          return unsafeCrashWith("The impossible happened in partial function `maxNode`.");
        }
        ;
        while (!$tco_done2) {
          $tco_result = $tco_loop($copy_m);
        }
        ;
        return $tco_result;
      };
      var down = function($copy_ctx) {
        return function($copy_m) {
          var $tco_var_ctx = $copy_ctx;
          var $tco_done3 = false;
          var $tco_result;
          function $tco_loop(ctx, m) {
            if (m instanceof Leaf) {
              $tco_done3 = true;
              return Nothing.value;
            }
            ;
            if (m instanceof Two) {
              var v = compare2(k)(m.value1);
              if (m.value3 instanceof Leaf && v instanceof EQ) {
                $tco_done3 = true;
                return new Just(new Tuple(m.value2, up(ctx)(Leaf.value)));
              }
              ;
              if (v instanceof EQ) {
                var max6 = maxNode(m.value0);
                $tco_done3 = true;
                return new Just(new Tuple(m.value2, removeMaxNode(new Cons(new TwoLeft(max6.key, max6.value, m.value3), ctx))(m.value0)));
              }
              ;
              if (v instanceof LT) {
                $tco_var_ctx = new Cons(new TwoLeft(m.value1, m.value2, m.value3), ctx);
                $copy_m = m.value0;
                return;
              }
              ;
              $tco_var_ctx = new Cons(new TwoRight(m.value0, m.value1, m.value2), ctx);
              $copy_m = m.value3;
              return;
            }
            ;
            if (m instanceof Three) {
              var leaves = function() {
                if (m.value0 instanceof Leaf && (m.value3 instanceof Leaf && m.value6 instanceof Leaf)) {
                  return true;
                }
                ;
                return false;
              }();
              var v = compare2(k)(m.value4);
              var v3 = compare2(k)(m.value1);
              if (leaves && v3 instanceof EQ) {
                $tco_done3 = true;
                return new Just(new Tuple(m.value2, fromZipper1(ctx)(new Two(Leaf.value, m.value4, m.value5, Leaf.value))));
              }
              ;
              if (leaves && v instanceof EQ) {
                $tco_done3 = true;
                return new Just(new Tuple(m.value5, fromZipper1(ctx)(new Two(Leaf.value, m.value1, m.value2, Leaf.value))));
              }
              ;
              if (v3 instanceof EQ) {
                var max6 = maxNode(m.value0);
                $tco_done3 = true;
                return new Just(new Tuple(m.value2, removeMaxNode(new Cons(new ThreeLeft(max6.key, max6.value, m.value3, m.value4, m.value5, m.value6), ctx))(m.value0)));
              }
              ;
              if (v instanceof EQ) {
                var max6 = maxNode(m.value3);
                $tco_done3 = true;
                return new Just(new Tuple(m.value5, removeMaxNode(new Cons(new ThreeMiddle(m.value0, m.value1, m.value2, max6.key, max6.value, m.value6), ctx))(m.value3)));
              }
              ;
              if (v3 instanceof LT) {
                $tco_var_ctx = new Cons(new ThreeLeft(m.value1, m.value2, m.value3, m.value4, m.value5, m.value6), ctx);
                $copy_m = m.value0;
                return;
              }
              ;
              if (v3 instanceof GT && v instanceof LT) {
                $tco_var_ctx = new Cons(new ThreeMiddle(m.value0, m.value1, m.value2, m.value4, m.value5, m.value6), ctx);
                $copy_m = m.value3;
                return;
              }
              ;
              $tco_var_ctx = new Cons(new ThreeRight(m.value0, m.value1, m.value2, m.value3, m.value4, m.value5), ctx);
              $copy_m = m.value6;
              return;
            }
            ;
            throw new Error("Failed pattern match at Data.Map.Internal (line 525, column 16 - line 548, column 80): " + [m.constructor.name]);
          }
          ;
          while (!$tco_done3) {
            $tco_result = $tco_loop($tco_var_ctx, $copy_m);
          }
          ;
          return $tco_result;
        };
      };
      return down(Nil.value);
    };
  };
  var foldableMap = {
    foldr: function(f) {
      return function(z) {
        return function(m) {
          if (m instanceof Leaf) {
            return z;
          }
          ;
          if (m instanceof Two) {
            return foldr(foldableMap)(f)(f(m.value2)(foldr(foldableMap)(f)(z)(m.value3)))(m.value0);
          }
          ;
          if (m instanceof Three) {
            return foldr(foldableMap)(f)(f(m.value2)(foldr(foldableMap)(f)(f(m.value5)(foldr(foldableMap)(f)(z)(m.value6)))(m.value3)))(m.value0);
          }
          ;
          throw new Error("Failed pattern match at Data.Map.Internal (line 133, column 17 - line 136, column 85): " + [m.constructor.name]);
        };
      };
    },
    foldl: function(f) {
      return function(z) {
        return function(m) {
          if (m instanceof Leaf) {
            return z;
          }
          ;
          if (m instanceof Two) {
            return foldl(foldableMap)(f)(f(foldl(foldableMap)(f)(z)(m.value0))(m.value2))(m.value3);
          }
          ;
          if (m instanceof Three) {
            return foldl(foldableMap)(f)(f(foldl(foldableMap)(f)(f(foldl(foldableMap)(f)(z)(m.value0))(m.value2))(m.value3))(m.value5))(m.value6);
          }
          ;
          throw new Error("Failed pattern match at Data.Map.Internal (line 137, column 17 - line 140, column 85): " + [m.constructor.name]);
        };
      };
    },
    foldMap: function(dictMonoid) {
      var mempty2 = mempty(dictMonoid);
      var append22 = append(dictMonoid.Semigroup0());
      return function(f) {
        return function(m) {
          if (m instanceof Leaf) {
            return mempty2;
          }
          ;
          if (m instanceof Two) {
            return append22(foldMap(foldableMap)(dictMonoid)(f)(m.value0))(append22(f(m.value2))(foldMap(foldableMap)(dictMonoid)(f)(m.value3)));
          }
          ;
          if (m instanceof Three) {
            return append22(foldMap(foldableMap)(dictMonoid)(f)(m.value0))(append22(f(m.value2))(append22(foldMap(foldableMap)(dictMonoid)(f)(m.value3))(append22(f(m.value5))(foldMap(foldableMap)(dictMonoid)(f)(m.value6)))));
          }
          ;
          throw new Error("Failed pattern match at Data.Map.Internal (line 141, column 17 - line 144, column 93): " + [m.constructor.name]);
        };
      };
    }
  };
  var foldableWithIndexMap = {
    foldrWithIndex: function(f) {
      return function(z) {
        return function(m) {
          if (m instanceof Leaf) {
            return z;
          }
          ;
          if (m instanceof Two) {
            return foldrWithIndex(foldableWithIndexMap)(f)(f(m.value1)(m.value2)(foldrWithIndex(foldableWithIndexMap)(f)(z)(m.value3)))(m.value0);
          }
          ;
          if (m instanceof Three) {
            return foldrWithIndex(foldableWithIndexMap)(f)(f(m.value1)(m.value2)(foldrWithIndex(foldableWithIndexMap)(f)(f(m.value4)(m.value5)(foldrWithIndex(foldableWithIndexMap)(f)(z)(m.value6)))(m.value3)))(m.value0);
          }
          ;
          throw new Error("Failed pattern match at Data.Map.Internal (line 147, column 26 - line 150, column 120): " + [m.constructor.name]);
        };
      };
    },
    foldlWithIndex: function(f) {
      return function(z) {
        return function(m) {
          if (m instanceof Leaf) {
            return z;
          }
          ;
          if (m instanceof Two) {
            return foldlWithIndex(foldableWithIndexMap)(f)(f(m.value1)(foldlWithIndex(foldableWithIndexMap)(f)(z)(m.value0))(m.value2))(m.value3);
          }
          ;
          if (m instanceof Three) {
            return foldlWithIndex(foldableWithIndexMap)(f)(f(m.value4)(foldlWithIndex(foldableWithIndexMap)(f)(f(m.value1)(foldlWithIndex(foldableWithIndexMap)(f)(z)(m.value0))(m.value2))(m.value3))(m.value5))(m.value6);
          }
          ;
          throw new Error("Failed pattern match at Data.Map.Internal (line 151, column 26 - line 154, column 120): " + [m.constructor.name]);
        };
      };
    },
    foldMapWithIndex: function(dictMonoid) {
      var mempty2 = mempty(dictMonoid);
      var append22 = append(dictMonoid.Semigroup0());
      return function(f) {
        return function(m) {
          if (m instanceof Leaf) {
            return mempty2;
          }
          ;
          if (m instanceof Two) {
            return append22(foldMapWithIndex(foldableWithIndexMap)(dictMonoid)(f)(m.value0))(append22(f(m.value1)(m.value2))(foldMapWithIndex(foldableWithIndexMap)(dictMonoid)(f)(m.value3)));
          }
          ;
          if (m instanceof Three) {
            return append22(foldMapWithIndex(foldableWithIndexMap)(dictMonoid)(f)(m.value0))(append22(f(m.value1)(m.value2))(append22(foldMapWithIndex(foldableWithIndexMap)(dictMonoid)(f)(m.value3))(append22(f(m.value4)(m.value5))(foldMapWithIndex(foldableWithIndexMap)(dictMonoid)(f)(m.value6)))));
          }
          ;
          throw new Error("Failed pattern match at Data.Map.Internal (line 155, column 26 - line 158, column 128): " + [m.constructor.name]);
        };
      };
    },
    Foldable0: function() {
      return foldableMap;
    }
  };
  var foldrWithIndex2 = /* @__PURE__ */ foldrWithIndex(foldableWithIndexMap);
  var keys = /* @__PURE__ */ function() {
    return foldrWithIndex2(function(k) {
      return function(v) {
        return function(acc) {
          return new Cons(k, acc);
        };
      };
    })(Nil.value);
  }();
  var empty2 = /* @__PURE__ */ function() {
    return Leaf.value;
  }();
  var fromFoldable = function(dictOrd) {
    var insert12 = insert(dictOrd);
    return function(dictFoldable) {
      return foldl(dictFoldable)(function(m) {
        return function(v) {
          return insert12(v.value0)(v.value1)(m);
        };
      })(empty2);
    };
  };
  var $$delete = function(dictOrd) {
    var pop1 = pop(dictOrd);
    return function(k) {
      return function(m) {
        return maybe(m)(snd)(pop1(k)(m));
      };
    };
  };
  var alter = function(dictOrd) {
    var lookup12 = lookup(dictOrd);
    var delete1 = $$delete(dictOrd);
    var insert12 = insert(dictOrd);
    return function(f) {
      return function(k) {
        return function(m) {
          var v = f(lookup12(k)(m));
          if (v instanceof Nothing) {
            return delete1(k)(m);
          }
          ;
          if (v instanceof Just) {
            return insert12(k)(v.value0)(m);
          }
          ;
          throw new Error("Failed pattern match at Data.Map.Internal (line 596, column 15 - line 598, column 25): " + [v.constructor.name]);
        };
      };
    };
  };
  var update = function(dictOrd) {
    var alter1 = alter(dictOrd);
    return function(f) {
      return function(k) {
        return function(m) {
          return alter1(maybe(Nothing.value)(f))(k)(m);
        };
      };
    };
  };

  // output/Data.Array/foreign.js
  var replicateFill = function(count) {
    return function(value12) {
      if (count < 1) {
        return [];
      }
      var result = new Array(count);
      return result.fill(value12);
    };
  };
  var replicatePolyfill = function(count) {
    return function(value12) {
      var result = [];
      var n = 0;
      for (var i2 = 0; i2 < count; i2++) {
        result[n++] = value12;
      }
      return result;
    };
  };
  var replicate = typeof Array.prototype.fill === "function" ? replicateFill : replicatePolyfill;
  var fromFoldableImpl = function() {
    function Cons3(head3, tail) {
      this.head = head3;
      this.tail = tail;
    }
    var emptyList = {};
    function curryCons(head3) {
      return function(tail) {
        return new Cons3(head3, tail);
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
    return function(foldr6) {
      return function(xs) {
        return listToArray(foldr6(curryCons)(emptyList)(xs));
      };
    };
  }();
  var length2 = function(xs) {
    return xs.length;
  };
  var findIndexImpl = function(just) {
    return function(nothing) {
      return function(f) {
        return function(xs) {
          for (var i2 = 0, l = xs.length; i2 < l; i2++) {
            if (f(xs[i2]))
              return just(i2);
          }
          return nothing;
        };
      };
    };
  };
  var _deleteAt = function(just) {
    return function(nothing) {
      return function(i2) {
        return function(l) {
          if (i2 < 0 || i2 >= l.length)
            return nothing;
          var l1 = l.slice();
          l1.splice(i2, 1);
          return just(l1);
        };
      };
    };
  };
  var sortByImpl = function() {
    function mergeFromTo(compare2, fromOrdering, xs1, xs2, from2, to) {
      var mid;
      var i2;
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
      i2 = from2;
      j = mid;
      k = from2;
      while (i2 < mid && j < to) {
        x = xs2[i2];
        y = xs2[j];
        c = fromOrdering(compare2(x)(y));
        if (c > 0) {
          xs1[k++] = y;
          ++j;
        } else {
          xs1[k++] = x;
          ++i2;
        }
      }
      while (i2 < mid) {
        xs1[k++] = xs2[i2++];
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

  // output/Data.Array.ST/foreign.js
  var sortByImpl2 = function() {
    function mergeFromTo(compare2, fromOrdering, xs1, xs2, from2, to) {
      var mid;
      var i2;
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
      i2 = from2;
      j = mid;
      k = from2;
      while (i2 < mid && j < to) {
        x = xs2[i2];
        y = xs2[j];
        c = fromOrdering(compare2(x)(y));
        if (c > 0) {
          xs1[k++] = y;
          ++j;
        } else {
          xs1[k++] = x;
          ++i2;
        }
      }
      while (i2 < mid) {
        xs1[k++] = xs2[i2++];
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

  // output/Data.Array/index.js
  var fromJust4 = /* @__PURE__ */ fromJust();
  var findIndex = /* @__PURE__ */ function() {
    return findIndexImpl(Just.create)(Nothing.value);
  }();
  var deleteAt = /* @__PURE__ */ function() {
    return _deleteAt(Just.create)(Nothing.value);
  }();
  var deleteBy = function(v) {
    return function(v1) {
      return function(v2) {
        if (v2.length === 0) {
          return [];
        }
        ;
        return maybe(v2)(function(i2) {
          return fromJust4(deleteAt(i2)(v2));
        })(findIndex(v(v1))(v2));
      };
    };
  };

  // output/Data.Set/index.js
  var foldMap2 = /* @__PURE__ */ foldMap(foldableList);
  var foldl2 = /* @__PURE__ */ foldl(foldableList);
  var foldr3 = /* @__PURE__ */ foldr(foldableList);
  var $$Set = function(x) {
    return x;
  };
  var toList = function(v) {
    return keys(v);
  };
  var fromMap = $$Set;
  var foldableSet = {
    foldMap: function(dictMonoid) {
      var foldMap12 = foldMap2(dictMonoid);
      return function(f) {
        var $129 = foldMap12(f);
        return function($130) {
          return $129(toList($130));
        };
      };
    },
    foldl: function(f) {
      return function(x) {
        var $131 = foldl2(f)(x);
        return function($132) {
          return $131(toList($132));
        };
      };
    },
    foldr: function(f) {
      return function(x) {
        var $133 = foldr3(f)(x);
        return function($134) {
          return $133(toList($134));
        };
      };
    }
  };

  // output/Data.Map/index.js
  var keys2 = /* @__PURE__ */ function() {
    var $38 = $$void(functorMap);
    return function($39) {
      return fromMap($38($39));
    };
  }();

  // output/Count.State/index.js
  var add2 = /* @__PURE__ */ add(semiringEN);
  var mul2 = /* @__PURE__ */ mul(semiringEN);
  var sub2 = /* @__PURE__ */ sub(ringEN);
  var lookup2 = /* @__PURE__ */ lookup(ordString);
  var insert2 = /* @__PURE__ */ insert(ordString);
  var foldr4 = /* @__PURE__ */ foldr(foldableSet);
  var update2 = /* @__PURE__ */ update(ordString);
  var foldr1 = /* @__PURE__ */ foldr(foldableArray);
  var foldr22 = /* @__PURE__ */ foldr(foldableMap);
  var eq2 = /* @__PURE__ */ eq(eqEN);
  var show2 = /* @__PURE__ */ show(showEN);
  var lessThan2 = /* @__PURE__ */ lessThan(ordEN);
  var TCount = /* @__PURE__ */ function() {
    function TCount2() {
    }
    ;
    TCount2.value = new TCount2();
    return TCount2;
  }();
  var TIncreaser = /* @__PURE__ */ function() {
    function TIncreaser2(value0) {
      this.value0 = value0;
    }
    ;
    TIncreaser2.create = function(value0) {
      return new TIncreaser2(value0);
    };
    return TIncreaser2;
  }();
  var updateIncreaser = function(n) {
    return function(inc) {
      return {
        name: inc.name,
        isVisible: inc.isVisible,
        owned: add2(inc.owned)(n),
        bought: add2(inc.bought)(n),
        baseCost: inc.baseCost,
        cost: mul2(inc.cost)(pow(inc.costPerPurch)(n)),
        costPerPurch: inc.costPerPurch,
        multiplier: mul2(inc.multiplier)(pow(inc.multPerPurch)(n)),
        multPerPurch: inc.multPerPurch,
        targets: inc.targets
      };
    };
  };
  var tickSpeedIncreaser = {
    name: "Tickspeed Increaser",
    isVisible: true,
    owned: zero2,
    bought: zero2,
    baseCost: one2,
    cost: baseTickSpeedCost,
    costPerPurch: baseTickSpeedCostScaling,
    multiplier: one2,
    multPerPurch: baseTickSpeedMult,
    targets: []
  };
  var setTickSpeed = function(state3) {
    return {
      count: state3.count,
      manualPower: state3.manualPower,
      tickSpeed: state3.tickSpeedInc.multiplier,
      increasers: state3.increasers,
      settings: state3.settings,
      tickSpeedInc: state3.tickSpeedInc
    };
  };
  var newIncreasers = /* @__PURE__ */ function() {
    return fromFoldable(ordString)(foldableArray)([new Tuple("1", {
      name: "Count Increaser",
      isVisible: true,
      owned: zero2,
      bought: zero2,
      baseCost: baseI1Cost,
      cost: baseI1Cost,
      costPerPurch: baseI1CostScaling,
      multiplier: one2,
      multPerPurch: baseIncreaserMult,
      targets: [TCount.value]
    }), new Tuple("2", {
      name: "Count Increaser Increaser",
      isVisible: true,
      owned: zero2,
      bought: zero2,
      baseCost: baseI2Cost,
      cost: baseI2Cost,
      costPerPurch: baseI2CostScaling,
      multiplier: one2,
      multPerPurch: baseIncreaserMult,
      targets: [new TIncreaser("1")]
    }), new Tuple("3", {
      name: "Count In3ser",
      isVisible: true,
      owned: zero2,
      bought: zero2,
      baseCost: baseI3Cost,
      cost: baseI3Cost,
      costPerPurch: baseI3CostScaling,
      multiplier: one2,
      multPerPurch: baseIncreaserMult,
      targets: [new TIncreaser("2")]
    })]);
  }();
  var maxTickSpeed = function(state3) {
    var amountToBuy = affordGeometricSeries(state3.count)(state3.tickSpeedInc.baseCost)(state3.tickSpeedInc.costPerPurch)(state3.tickSpeedInc.bought);
    var $29 = !isPos(amountToBuy);
    if ($29) {
      return state3;
    }
    ;
    var totalCost = sumGeometricSeries(amountToBuy)(state3.tickSpeedInc.baseCost)(state3.tickSpeedInc.costPerPurch)(state3.tickSpeedInc.bought);
    return {
      count: sub2(state3.count)(totalCost),
      manualPower: state3.manualPower,
      tickSpeed: state3.tickSpeed,
      increasers: state3.increasers,
      settings: state3.settings,
      tickSpeedInc: updateIncreaser(amountToBuy)(state3.tickSpeedInc)
    };
  };
  var maxIncreaser = function(id2) {
    return function(state3) {
      var v = lookup2(id2)(state3.increasers);
      if (v instanceof Nothing) {
        return state3;
      }
      ;
      if (v instanceof Just) {
        var amountToBuy = affordGeometricSeries(state3.count)(v.value0.baseCost)(v.value0.costPerPurch)(v.value0.bought);
        var $31 = !isPos(amountToBuy);
        if ($31) {
          return state3;
        }
        ;
        var totalCost = sumGeometricSeries(amountToBuy)(v.value0.baseCost)(v.value0.costPerPurch)(v.value0.bought);
        return {
          count: sub2(state3.count)(totalCost),
          manualPower: state3.manualPower,
          tickSpeed: state3.tickSpeed,
          increasers: insert2(id2)(updateIncreaser(amountToBuy)(v.value0))(state3.increasers),
          settings: state3.settings,
          tickSpeedInc: state3.tickSpeedInc
        };
      }
      ;
      throw new Error("Failed pattern match at Count.State (line 159, column 25 - line 168, column 4): " + [v.constructor.name]);
    };
  };
  var maxAllIncreasers = function(s) {
    return foldr4(maxIncreaser)(s)(keys2(s.increasers));
  };
  var maxAll = function($42) {
    return maxAllIncreasers(maxTickSpeed($42));
  };
  var manualCount = function(state3) {
    return {
      count: add2(state3.count)(state3.manualPower),
      manualPower: state3.manualPower,
      tickSpeed: state3.tickSpeed,
      increasers: state3.increasers,
      settings: state3.settings,
      tickSpeedInc: state3.tickSpeedInc
    };
  };
  var handleTarget = function(state3) {
    return function(target6) {
      return function(delta) {
        if (target6 instanceof TCount) {
          return {
            count: add2(state3.count)(delta),
            manualPower: state3.manualPower,
            tickSpeed: state3.tickSpeed,
            increasers: state3.increasers,
            settings: state3.settings,
            tickSpeedInc: state3.tickSpeedInc
          };
        }
        ;
        if (target6 instanceof TIncreaser) {
          return {
            count: state3.count,
            manualPower: state3.manualPower,
            tickSpeed: state3.tickSpeed,
            increasers: update2(function(inc) {
              return new Just({
                owned: add2(inc.owned)(delta),
                baseCost: inc.baseCost,
                bought: inc.bought,
                cost: inc.cost,
                costPerPurch: inc.costPerPurch,
                isVisible: inc.isVisible,
                multPerPurch: inc.multPerPurch,
                multiplier: inc.multiplier,
                name: inc.name,
                targets: inc.targets
              });
            })(target6.value0)(state3.increasers),
            settings: state3.settings,
            tickSpeedInc: state3.tickSpeedInc
          };
        }
        ;
        throw new Error("Failed pattern match at Count.State (line 109, column 35 - line 111, column 121): " + [target6.constructor.name]);
      };
    };
  };
  var handleIncreaser = function(speed) {
    return function(inc) {
      return function(state3) {
        var delta = mul2(mul2(inc.owned)(inc.multiplier))(speed);
        return foldr1(function(t) {
          return function(st) {
            return handleTarget(st)(t)(delta);
          };
        })(state3)(inc.targets);
      };
    };
  };
  var tickIncreasers = function(state3) {
    var speed = mul2(state3.tickSpeed)(reciprocate(fromNumber(state3.settings.updateRate)));
    return foldr22(handleIncreaser(speed))(state3)(state3.increasers);
  };
  var tick = function($43) {
    return tickIncreasers(setTickSpeed($43));
  };
  var getCountPerSecond = function(state3) {
    var countIncreaserContrib = function() {
      var v = lookup2("1")(state3.increasers);
      if (v instanceof Nothing) {
        return one2;
      }
      ;
      if (v instanceof Just) {
        return mul2(v.value0.owned)(v.value0.multiplier);
      }
      ;
      throw new Error("Failed pattern match at Count.State (line 189, column 27 - line 191, column 43): " + [v.constructor.name]);
    }();
    return mul2(countIncreaserContrib)(state3.tickSpeed);
  };
  var displayEN = function(n) {
    var $37 = eq2(n)(zero2);
    if ($37) {
      return show2(n);
    }
    ;
    return toStringWithDecimalPlaces(n)(3)(true);
  };
  var defaultSettings = {
    updateRate: defaultUpdateRate
  };
  var newGlobalState = {
    count: zero2,
    manualPower: one2,
    tickSpeed: one2,
    tickSpeedInc: tickSpeedIncreaser,
    increasers: newIncreasers,
    settings: defaultSettings
  };
  var buyTickSpeed = function(state3) {
    var $38 = lessThan2(state3.count)(state3.tickSpeedInc.cost);
    if ($38) {
      return state3;
    }
    ;
    return {
      count: state3.count,
      manualPower: state3.manualPower,
      tickSpeed: state3.tickSpeed,
      increasers: state3.increasers,
      settings: state3.settings,
      tickSpeedInc: updateIncreaser(one2)(state3.tickSpeedInc)
    };
  };
  var buyIncreaser = function(id2) {
    return function(state3) {
      var v = lookup2(id2)(state3.increasers);
      if (v instanceof Nothing) {
        return state3;
      }
      ;
      if (v instanceof Just) {
        var $40 = lessThan2(state3.count)(v.value0.cost);
        if ($40) {
          return state3;
        }
        ;
        return {
          count: sub2(state3.count)(v.value0.cost),
          manualPower: state3.manualPower,
          tickSpeed: state3.tickSpeed,
          increasers: insert2(id2)(updateIncreaser(one2)(v.value0))(state3.increasers),
          settings: state3.settings,
          tickSpeedInc: state3.tickSpeedInc
        };
      }
      ;
      throw new Error("Failed pattern match at Count.State (line 142, column 25 - line 147, column 4): " + [v.constructor.name]);
    };
  };

  // output/Effect.Aff/foreign.js
  var Aff = function() {
    var EMPTY = {};
    var PURE = "Pure";
    var THROW = "Throw";
    var CATCH = "Catch";
    var SYNC = "Sync";
    var ASYNC = "Async";
    var BIND = "Bind";
    var BRACKET = "Bracket";
    var FORK = "Fork";
    var SEQ = "Sequential";
    var MAP = "Map";
    var APPLY = "Apply";
    var ALT = "Alt";
    var CONS = "Cons";
    var RESUME = "Resume";
    var RELEASE = "Release";
    var FINALIZER = "Finalizer";
    var FINALIZED = "Finalized";
    var FORKED = "Forked";
    var FIBER = "Fiber";
    var THUNK = "Thunk";
    function Aff2(tag, _1, _2, _3) {
      this.tag = tag;
      this._1 = _1;
      this._2 = _2;
      this._3 = _3;
    }
    function AffCtr(tag) {
      var fn = function(_1, _2, _3) {
        return new Aff2(tag, _1, _2, _3);
      };
      fn.tag = tag;
      return fn;
    }
    function nonCanceler2(error4) {
      return new Aff2(PURE, void 0);
    }
    function runEff(eff) {
      try {
        eff();
      } catch (error4) {
        setTimeout(function() {
          throw error4;
        }, 0);
      }
    }
    function runSync(left, right, eff) {
      try {
        return right(eff());
      } catch (error4) {
        return left(error4);
      }
    }
    function runAsync(left, eff, k) {
      try {
        return eff(k)();
      } catch (error4) {
        k(left(error4))();
        return nonCanceler2;
      }
    }
    var Scheduler = function() {
      var limit = 1024;
      var size5 = 0;
      var ix = 0;
      var queue = new Array(limit);
      var draining = false;
      function drain() {
        var thunk;
        draining = true;
        while (size5 !== 0) {
          size5--;
          thunk = queue[ix];
          queue[ix] = void 0;
          ix = (ix + 1) % limit;
          thunk();
        }
        draining = false;
      }
      return {
        isDraining: function() {
          return draining;
        },
        enqueue: function(cb) {
          var i2, tmp;
          if (size5 === limit) {
            tmp = draining;
            drain();
            draining = tmp;
          }
          queue[(ix + size5) % limit] = cb;
          size5++;
          if (!draining) {
            drain();
          }
        }
      };
    }();
    function Supervisor(util) {
      var fibers = {};
      var fiberId = 0;
      var count = 0;
      return {
        register: function(fiber) {
          var fid = fiberId++;
          fiber.onComplete({
            rethrow: true,
            handler: function(result) {
              return function() {
                count--;
                delete fibers[fid];
              };
            }
          })();
          fibers[fid] = fiber;
          count++;
        },
        isEmpty: function() {
          return count === 0;
        },
        killAll: function(killError, cb) {
          return function() {
            if (count === 0) {
              return cb();
            }
            var killCount = 0;
            var kills = {};
            function kill2(fid) {
              kills[fid] = fibers[fid].kill(killError, function(result) {
                return function() {
                  delete kills[fid];
                  killCount--;
                  if (util.isLeft(result) && util.fromLeft(result)) {
                    setTimeout(function() {
                      throw util.fromLeft(result);
                    }, 0);
                  }
                  if (killCount === 0) {
                    cb();
                  }
                };
              })();
            }
            for (var k in fibers) {
              if (fibers.hasOwnProperty(k)) {
                killCount++;
                kill2(k);
              }
            }
            fibers = {};
            fiberId = 0;
            count = 0;
            return function(error4) {
              return new Aff2(SYNC, function() {
                for (var k2 in kills) {
                  if (kills.hasOwnProperty(k2)) {
                    kills[k2]();
                  }
                }
              });
            };
          };
        }
      };
    }
    var SUSPENDED = 0;
    var CONTINUE = 1;
    var STEP_BIND = 2;
    var STEP_RESULT = 3;
    var PENDING = 4;
    var RETURN = 5;
    var COMPLETED = 6;
    function Fiber(util, supervisor, aff) {
      var runTick = 0;
      var status = SUSPENDED;
      var step4 = aff;
      var fail2 = null;
      var interrupt = null;
      var bhead = null;
      var btail = null;
      var attempts = null;
      var bracketCount = 0;
      var joinId = 0;
      var joins = null;
      var rethrow = true;
      function run3(localRunTick) {
        var tmp, result, attempt;
        while (true) {
          tmp = null;
          result = null;
          attempt = null;
          switch (status) {
            case STEP_BIND:
              status = CONTINUE;
              try {
                step4 = bhead(step4);
                if (btail === null) {
                  bhead = null;
                } else {
                  bhead = btail._1;
                  btail = btail._2;
                }
              } catch (e) {
                status = RETURN;
                fail2 = util.left(e);
                step4 = null;
              }
              break;
            case STEP_RESULT:
              if (util.isLeft(step4)) {
                status = RETURN;
                fail2 = step4;
                step4 = null;
              } else if (bhead === null) {
                status = RETURN;
              } else {
                status = STEP_BIND;
                step4 = util.fromRight(step4);
              }
              break;
            case CONTINUE:
              switch (step4.tag) {
                case BIND:
                  if (bhead) {
                    btail = new Aff2(CONS, bhead, btail);
                  }
                  bhead = step4._2;
                  status = CONTINUE;
                  step4 = step4._1;
                  break;
                case PURE:
                  if (bhead === null) {
                    status = RETURN;
                    step4 = util.right(step4._1);
                  } else {
                    status = STEP_BIND;
                    step4 = step4._1;
                  }
                  break;
                case SYNC:
                  status = STEP_RESULT;
                  step4 = runSync(util.left, util.right, step4._1);
                  break;
                case ASYNC:
                  status = PENDING;
                  step4 = runAsync(util.left, step4._1, function(result2) {
                    return function() {
                      if (runTick !== localRunTick) {
                        return;
                      }
                      runTick++;
                      Scheduler.enqueue(function() {
                        if (runTick !== localRunTick + 1) {
                          return;
                        }
                        status = STEP_RESULT;
                        step4 = result2;
                        run3(runTick);
                      });
                    };
                  });
                  return;
                case THROW:
                  status = RETURN;
                  fail2 = util.left(step4._1);
                  step4 = null;
                  break;
                case CATCH:
                  if (bhead === null) {
                    attempts = new Aff2(CONS, step4, attempts, interrupt);
                  } else {
                    attempts = new Aff2(CONS, step4, new Aff2(CONS, new Aff2(RESUME, bhead, btail), attempts, interrupt), interrupt);
                  }
                  bhead = null;
                  btail = null;
                  status = CONTINUE;
                  step4 = step4._1;
                  break;
                case BRACKET:
                  bracketCount++;
                  if (bhead === null) {
                    attempts = new Aff2(CONS, step4, attempts, interrupt);
                  } else {
                    attempts = new Aff2(CONS, step4, new Aff2(CONS, new Aff2(RESUME, bhead, btail), attempts, interrupt), interrupt);
                  }
                  bhead = null;
                  btail = null;
                  status = CONTINUE;
                  step4 = step4._1;
                  break;
                case FORK:
                  status = STEP_RESULT;
                  tmp = Fiber(util, supervisor, step4._2);
                  if (supervisor) {
                    supervisor.register(tmp);
                  }
                  if (step4._1) {
                    tmp.run();
                  }
                  step4 = util.right(tmp);
                  break;
                case SEQ:
                  status = CONTINUE;
                  step4 = sequential3(util, supervisor, step4._1);
                  break;
              }
              break;
            case RETURN:
              bhead = null;
              btail = null;
              if (attempts === null) {
                status = COMPLETED;
                step4 = interrupt || fail2 || step4;
              } else {
                tmp = attempts._3;
                attempt = attempts._1;
                attempts = attempts._2;
                switch (attempt.tag) {
                  case CATCH:
                    if (interrupt && interrupt !== tmp && bracketCount === 0) {
                      status = RETURN;
                    } else if (fail2) {
                      status = CONTINUE;
                      step4 = attempt._2(util.fromLeft(fail2));
                      fail2 = null;
                    }
                    break;
                  case RESUME:
                    if (interrupt && interrupt !== tmp && bracketCount === 0 || fail2) {
                      status = RETURN;
                    } else {
                      bhead = attempt._1;
                      btail = attempt._2;
                      status = STEP_BIND;
                      step4 = util.fromRight(step4);
                    }
                    break;
                  case BRACKET:
                    bracketCount--;
                    if (fail2 === null) {
                      result = util.fromRight(step4);
                      attempts = new Aff2(CONS, new Aff2(RELEASE, attempt._2, result), attempts, tmp);
                      if (interrupt === tmp || bracketCount > 0) {
                        status = CONTINUE;
                        step4 = attempt._3(result);
                      }
                    }
                    break;
                  case RELEASE:
                    attempts = new Aff2(CONS, new Aff2(FINALIZED, step4, fail2), attempts, interrupt);
                    status = CONTINUE;
                    if (interrupt && interrupt !== tmp && bracketCount === 0) {
                      step4 = attempt._1.killed(util.fromLeft(interrupt))(attempt._2);
                    } else if (fail2) {
                      step4 = attempt._1.failed(util.fromLeft(fail2))(attempt._2);
                    } else {
                      step4 = attempt._1.completed(util.fromRight(step4))(attempt._2);
                    }
                    fail2 = null;
                    bracketCount++;
                    break;
                  case FINALIZER:
                    bracketCount++;
                    attempts = new Aff2(CONS, new Aff2(FINALIZED, step4, fail2), attempts, interrupt);
                    status = CONTINUE;
                    step4 = attempt._1;
                    break;
                  case FINALIZED:
                    bracketCount--;
                    status = RETURN;
                    step4 = attempt._1;
                    fail2 = attempt._2;
                    break;
                }
              }
              break;
            case COMPLETED:
              for (var k in joins) {
                if (joins.hasOwnProperty(k)) {
                  rethrow = rethrow && joins[k].rethrow;
                  runEff(joins[k].handler(step4));
                }
              }
              joins = null;
              if (interrupt && fail2) {
                setTimeout(function() {
                  throw util.fromLeft(fail2);
                }, 0);
              } else if (util.isLeft(step4) && rethrow) {
                setTimeout(function() {
                  if (rethrow) {
                    throw util.fromLeft(step4);
                  }
                }, 0);
              }
              return;
            case SUSPENDED:
              status = CONTINUE;
              break;
            case PENDING:
              return;
          }
        }
      }
      function onComplete(join4) {
        return function() {
          if (status === COMPLETED) {
            rethrow = rethrow && join4.rethrow;
            join4.handler(step4)();
            return function() {
            };
          }
          var jid = joinId++;
          joins = joins || {};
          joins[jid] = join4;
          return function() {
            if (joins !== null) {
              delete joins[jid];
            }
          };
        };
      }
      function kill2(error4, cb) {
        return function() {
          if (status === COMPLETED) {
            cb(util.right(void 0))();
            return function() {
            };
          }
          var canceler = onComplete({
            rethrow: false,
            handler: function() {
              return cb(util.right(void 0));
            }
          })();
          switch (status) {
            case SUSPENDED:
              interrupt = util.left(error4);
              status = COMPLETED;
              step4 = interrupt;
              run3(runTick);
              break;
            case PENDING:
              if (interrupt === null) {
                interrupt = util.left(error4);
              }
              if (bracketCount === 0) {
                if (status === PENDING) {
                  attempts = new Aff2(CONS, new Aff2(FINALIZER, step4(error4)), attempts, interrupt);
                }
                status = RETURN;
                step4 = null;
                fail2 = null;
                run3(++runTick);
              }
              break;
            default:
              if (interrupt === null) {
                interrupt = util.left(error4);
              }
              if (bracketCount === 0) {
                status = RETURN;
                step4 = null;
                fail2 = null;
              }
          }
          return canceler;
        };
      }
      function join3(cb) {
        return function() {
          var canceler = onComplete({
            rethrow: false,
            handler: cb
          })();
          if (status === SUSPENDED) {
            run3(runTick);
          }
          return canceler;
        };
      }
      return {
        kill: kill2,
        join: join3,
        onComplete,
        isSuspended: function() {
          return status === SUSPENDED;
        },
        run: function() {
          if (status === SUSPENDED) {
            if (!Scheduler.isDraining()) {
              Scheduler.enqueue(function() {
                run3(runTick);
              });
            } else {
              run3(runTick);
            }
          }
        }
      };
    }
    function runPar(util, supervisor, par, cb) {
      var fiberId = 0;
      var fibers = {};
      var killId = 0;
      var kills = {};
      var early = new Error("[ParAff] Early exit");
      var interrupt = null;
      var root2 = EMPTY;
      function kill2(error4, par2, cb2) {
        var step4 = par2;
        var head3 = null;
        var tail = null;
        var count = 0;
        var kills2 = {};
        var tmp, kid;
        loop:
          while (true) {
            tmp = null;
            switch (step4.tag) {
              case FORKED:
                if (step4._3 === EMPTY) {
                  tmp = fibers[step4._1];
                  kills2[count++] = tmp.kill(error4, function(result) {
                    return function() {
                      count--;
                      if (count === 0) {
                        cb2(result)();
                      }
                    };
                  });
                }
                if (head3 === null) {
                  break loop;
                }
                step4 = head3._2;
                if (tail === null) {
                  head3 = null;
                } else {
                  head3 = tail._1;
                  tail = tail._2;
                }
                break;
              case MAP:
                step4 = step4._2;
                break;
              case APPLY:
              case ALT:
                if (head3) {
                  tail = new Aff2(CONS, head3, tail);
                }
                head3 = step4;
                step4 = step4._1;
                break;
            }
          }
        if (count === 0) {
          cb2(util.right(void 0))();
        } else {
          kid = 0;
          tmp = count;
          for (; kid < tmp; kid++) {
            kills2[kid] = kills2[kid]();
          }
        }
        return kills2;
      }
      function join3(result, head3, tail) {
        var fail2, step4, lhs, rhs, tmp, kid;
        if (util.isLeft(result)) {
          fail2 = result;
          step4 = null;
        } else {
          step4 = result;
          fail2 = null;
        }
        loop:
          while (true) {
            lhs = null;
            rhs = null;
            tmp = null;
            kid = null;
            if (interrupt !== null) {
              return;
            }
            if (head3 === null) {
              cb(fail2 || step4)();
              return;
            }
            if (head3._3 !== EMPTY) {
              return;
            }
            switch (head3.tag) {
              case MAP:
                if (fail2 === null) {
                  head3._3 = util.right(head3._1(util.fromRight(step4)));
                  step4 = head3._3;
                } else {
                  head3._3 = fail2;
                }
                break;
              case APPLY:
                lhs = head3._1._3;
                rhs = head3._2._3;
                if (fail2) {
                  head3._3 = fail2;
                  tmp = true;
                  kid = killId++;
                  kills[kid] = kill2(early, fail2 === lhs ? head3._2 : head3._1, function() {
                    return function() {
                      delete kills[kid];
                      if (tmp) {
                        tmp = false;
                      } else if (tail === null) {
                        join3(fail2, null, null);
                      } else {
                        join3(fail2, tail._1, tail._2);
                      }
                    };
                  });
                  if (tmp) {
                    tmp = false;
                    return;
                  }
                } else if (lhs === EMPTY || rhs === EMPTY) {
                  return;
                } else {
                  step4 = util.right(util.fromRight(lhs)(util.fromRight(rhs)));
                  head3._3 = step4;
                }
                break;
              case ALT:
                lhs = head3._1._3;
                rhs = head3._2._3;
                if (lhs === EMPTY && util.isLeft(rhs) || rhs === EMPTY && util.isLeft(lhs)) {
                  return;
                }
                if (lhs !== EMPTY && util.isLeft(lhs) && rhs !== EMPTY && util.isLeft(rhs)) {
                  fail2 = step4 === lhs ? rhs : lhs;
                  step4 = null;
                  head3._3 = fail2;
                } else {
                  head3._3 = step4;
                  tmp = true;
                  kid = killId++;
                  kills[kid] = kill2(early, step4 === lhs ? head3._2 : head3._1, function() {
                    return function() {
                      delete kills[kid];
                      if (tmp) {
                        tmp = false;
                      } else if (tail === null) {
                        join3(step4, null, null);
                      } else {
                        join3(step4, tail._1, tail._2);
                      }
                    };
                  });
                  if (tmp) {
                    tmp = false;
                    return;
                  }
                }
                break;
            }
            if (tail === null) {
              head3 = null;
            } else {
              head3 = tail._1;
              tail = tail._2;
            }
          }
      }
      function resolve(fiber) {
        return function(result) {
          return function() {
            delete fibers[fiber._1];
            fiber._3 = result;
            join3(result, fiber._2._1, fiber._2._2);
          };
        };
      }
      function run3() {
        var status = CONTINUE;
        var step4 = par;
        var head3 = null;
        var tail = null;
        var tmp, fid;
        loop:
          while (true) {
            tmp = null;
            fid = null;
            switch (status) {
              case CONTINUE:
                switch (step4.tag) {
                  case MAP:
                    if (head3) {
                      tail = new Aff2(CONS, head3, tail);
                    }
                    head3 = new Aff2(MAP, step4._1, EMPTY, EMPTY);
                    step4 = step4._2;
                    break;
                  case APPLY:
                    if (head3) {
                      tail = new Aff2(CONS, head3, tail);
                    }
                    head3 = new Aff2(APPLY, EMPTY, step4._2, EMPTY);
                    step4 = step4._1;
                    break;
                  case ALT:
                    if (head3) {
                      tail = new Aff2(CONS, head3, tail);
                    }
                    head3 = new Aff2(ALT, EMPTY, step4._2, EMPTY);
                    step4 = step4._1;
                    break;
                  default:
                    fid = fiberId++;
                    status = RETURN;
                    tmp = step4;
                    step4 = new Aff2(FORKED, fid, new Aff2(CONS, head3, tail), EMPTY);
                    tmp = Fiber(util, supervisor, tmp);
                    tmp.onComplete({
                      rethrow: false,
                      handler: resolve(step4)
                    })();
                    fibers[fid] = tmp;
                    if (supervisor) {
                      supervisor.register(tmp);
                    }
                }
                break;
              case RETURN:
                if (head3 === null) {
                  break loop;
                }
                if (head3._1 === EMPTY) {
                  head3._1 = step4;
                  status = CONTINUE;
                  step4 = head3._2;
                  head3._2 = EMPTY;
                } else {
                  head3._2 = step4;
                  step4 = head3;
                  if (tail === null) {
                    head3 = null;
                  } else {
                    head3 = tail._1;
                    tail = tail._2;
                  }
                }
            }
          }
        root2 = step4;
        for (fid = 0; fid < fiberId; fid++) {
          fibers[fid].run();
        }
      }
      function cancel(error4, cb2) {
        interrupt = util.left(error4);
        var innerKills;
        for (var kid in kills) {
          if (kills.hasOwnProperty(kid)) {
            innerKills = kills[kid];
            for (kid in innerKills) {
              if (innerKills.hasOwnProperty(kid)) {
                innerKills[kid]();
              }
            }
          }
        }
        kills = null;
        var newKills = kill2(error4, root2, cb2);
        return function(killError) {
          return new Aff2(ASYNC, function(killCb) {
            return function() {
              for (var kid2 in newKills) {
                if (newKills.hasOwnProperty(kid2)) {
                  newKills[kid2]();
                }
              }
              return nonCanceler2;
            };
          });
        };
      }
      run3();
      return function(killError) {
        return new Aff2(ASYNC, function(killCb) {
          return function() {
            return cancel(killError, killCb);
          };
        });
      };
    }
    function sequential3(util, supervisor, par) {
      return new Aff2(ASYNC, function(cb) {
        return function() {
          return runPar(util, supervisor, par, cb);
        };
      });
    }
    Aff2.EMPTY = EMPTY;
    Aff2.Pure = AffCtr(PURE);
    Aff2.Throw = AffCtr(THROW);
    Aff2.Catch = AffCtr(CATCH);
    Aff2.Sync = AffCtr(SYNC);
    Aff2.Async = AffCtr(ASYNC);
    Aff2.Bind = AffCtr(BIND);
    Aff2.Bracket = AffCtr(BRACKET);
    Aff2.Fork = AffCtr(FORK);
    Aff2.Seq = AffCtr(SEQ);
    Aff2.ParMap = AffCtr(MAP);
    Aff2.ParApply = AffCtr(APPLY);
    Aff2.ParAlt = AffCtr(ALT);
    Aff2.Fiber = Fiber;
    Aff2.Supervisor = Supervisor;
    Aff2.Scheduler = Scheduler;
    Aff2.nonCanceler = nonCanceler2;
    return Aff2;
  }();
  var _pure = Aff.Pure;
  var _throwError = Aff.Throw;
  function _catchError(aff) {
    return function(k) {
      return Aff.Catch(aff, k);
    };
  }
  function _map(f) {
    return function(aff) {
      if (aff.tag === Aff.Pure.tag) {
        return Aff.Pure(f(aff._1));
      } else {
        return Aff.Bind(aff, function(value12) {
          return Aff.Pure(f(value12));
        });
      }
    };
  }
  function _bind(aff) {
    return function(k) {
      return Aff.Bind(aff, k);
    };
  }
  function _fork(immediate) {
    return function(aff) {
      return Aff.Fork(immediate, aff);
    };
  }
  var _liftEffect = Aff.Sync;
  function _parAffMap(f) {
    return function(aff) {
      return Aff.ParMap(f, aff);
    };
  }
  function _parAffApply(aff1) {
    return function(aff2) {
      return Aff.ParApply(aff1, aff2);
    };
  }
  var makeAff = Aff.Async;
  function generalBracket(acquire) {
    return function(options2) {
      return function(k) {
        return Aff.Bracket(acquire, options2, k);
      };
    };
  }
  function _makeFiber(util, aff) {
    return function() {
      return Aff.Fiber(util, null, aff);
    };
  }
  var _delay = function() {
    function setDelay(n, k) {
      if (n === 0 && typeof setImmediate !== "undefined") {
        return setImmediate(k);
      } else {
        return setTimeout(k, n);
      }
    }
    function clearDelay(n, t) {
      if (n === 0 && typeof clearImmediate !== "undefined") {
        return clearImmediate(t);
      } else {
        return clearTimeout(t);
      }
    }
    return function(right, ms) {
      return Aff.Async(function(cb) {
        return function() {
          var timer2 = setDelay(ms, cb(right()));
          return function() {
            return Aff.Sync(function() {
              return right(clearDelay(ms, timer2));
            });
          };
        };
      });
    };
  }();
  var _sequential = Aff.Seq;

  // output/Effect.Exception/foreign.js
  function error(msg) {
    return new Error(msg);
  }
  function throwException(e) {
    return function() {
      throw e;
    };
  }

  // output/Effect.Exception/index.js
  var $$throw = function($4) {
    return throwException(error($4));
  };

  // output/Control.Monad.Error.Class/index.js
  var throwError = function(dict) {
    return dict.throwError;
  };
  var catchError = function(dict) {
    return dict.catchError;
  };
  var $$try = function(dictMonadError) {
    var catchError1 = catchError(dictMonadError);
    var Monad0 = dictMonadError.MonadThrow0().Monad0();
    var map18 = map(Monad0.Bind1().Apply0().Functor0());
    var pure10 = pure(Monad0.Applicative0());
    return function(a2) {
      return catchError1(map18(Right.create)(a2))(function($52) {
        return pure10(Left.create($52));
      });
    };
  };

  // output/Effect.Class/index.js
  var monadEffectEffect = {
    liftEffect: /* @__PURE__ */ identity(categoryFn),
    Monad0: function() {
      return monadEffect;
    }
  };
  var liftEffect = function(dict) {
    return dict.liftEffect;
  };

  // output/Control.Parallel.Class/index.js
  var sequential = function(dict) {
    return dict.sequential;
  };
  var parallel = function(dict) {
    return dict.parallel;
  };

  // output/Control.Parallel/index.js
  var identity4 = /* @__PURE__ */ identity(categoryFn);
  var parTraverse_ = function(dictParallel) {
    var sequential3 = sequential(dictParallel);
    var traverse_7 = traverse_(dictParallel.Applicative1());
    var parallel3 = parallel(dictParallel);
    return function(dictFoldable) {
      var traverse_14 = traverse_7(dictFoldable);
      return function(f) {
        var $48 = traverse_14(function($50) {
          return parallel3(f($50));
        });
        return function($49) {
          return sequential3($48($49));
        };
      };
    };
  };
  var parSequence_ = function(dictParallel) {
    var parTraverse_1 = parTraverse_(dictParallel);
    return function(dictFoldable) {
      return parTraverse_1(dictFoldable)(identity4);
    };
  };

  // output/Effect.Unsafe/foreign.js
  var unsafePerformEffect = function(f) {
    return f();
  };

  // output/Effect.Aff/index.js
  var $runtime_lazy2 = function(name15, moduleName, init2) {
    var state3 = 0;
    var val;
    return function(lineNumber) {
      if (state3 === 2)
        return val;
      if (state3 === 1)
        throw new ReferenceError(name15 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state3 = 1;
      val = init2();
      state3 = 2;
      return val;
    };
  };
  var pure2 = /* @__PURE__ */ pure(applicativeEffect);
  var $$void3 = /* @__PURE__ */ $$void(functorEffect);
  var map4 = /* @__PURE__ */ map(functorEffect);
  var Canceler = function(x) {
    return x;
  };
  var suspendAff = /* @__PURE__ */ _fork(false);
  var functorParAff = {
    map: _parAffMap
  };
  var functorAff = {
    map: _map
  };
  var map1 = /* @__PURE__ */ map(functorAff);
  var forkAff = /* @__PURE__ */ _fork(true);
  var ffiUtil = /* @__PURE__ */ function() {
    var unsafeFromRight = function(v) {
      if (v instanceof Right) {
        return v.value0;
      }
      ;
      if (v instanceof Left) {
        return unsafeCrashWith("unsafeFromRight: Left");
      }
      ;
      throw new Error("Failed pattern match at Effect.Aff (line 412, column 21 - line 414, column 54): " + [v.constructor.name]);
    };
    var unsafeFromLeft = function(v) {
      if (v instanceof Left) {
        return v.value0;
      }
      ;
      if (v instanceof Right) {
        return unsafeCrashWith("unsafeFromLeft: Right");
      }
      ;
      throw new Error("Failed pattern match at Effect.Aff (line 407, column 20 - line 409, column 55): " + [v.constructor.name]);
    };
    var isLeft = function(v) {
      if (v instanceof Left) {
        return true;
      }
      ;
      if (v instanceof Right) {
        return false;
      }
      ;
      throw new Error("Failed pattern match at Effect.Aff (line 402, column 12 - line 404, column 21): " + [v.constructor.name]);
    };
    return {
      isLeft,
      fromLeft: unsafeFromLeft,
      fromRight: unsafeFromRight,
      left: Left.create,
      right: Right.create
    };
  }();
  var makeFiber = function(aff) {
    return _makeFiber(ffiUtil, aff);
  };
  var launchAff = function(aff) {
    return function __do4() {
      var fiber = makeFiber(aff)();
      fiber.run();
      return fiber;
    };
  };
  var delay = function(v) {
    return _delay(Right.create, v);
  };
  var bracket = function(acquire) {
    return function(completed) {
      return generalBracket(acquire)({
        killed: $$const(completed),
        failed: $$const(completed),
        completed: $$const(completed)
      });
    };
  };
  var applyParAff = {
    apply: _parAffApply,
    Functor0: function() {
      return functorParAff;
    }
  };
  var monadAff = {
    Applicative0: function() {
      return applicativeAff;
    },
    Bind1: function() {
      return bindAff;
    }
  };
  var bindAff = {
    bind: _bind,
    Apply0: function() {
      return $lazy_applyAff(0);
    }
  };
  var applicativeAff = {
    pure: _pure,
    Apply0: function() {
      return $lazy_applyAff(0);
    }
  };
  var $lazy_applyAff = /* @__PURE__ */ $runtime_lazy2("applyAff", "Effect.Aff", function() {
    return {
      apply: ap(monadAff),
      Functor0: function() {
        return functorAff;
      }
    };
  });
  var pure22 = /* @__PURE__ */ pure(applicativeAff);
  var bind1 = /* @__PURE__ */ bind(bindAff);
  var bindFlipped3 = /* @__PURE__ */ bindFlipped(bindAff);
  var $$finally = function(fin) {
    return function(a2) {
      return bracket(pure22(unit))($$const(fin))($$const(a2));
    };
  };
  var monadEffectAff = {
    liftEffect: _liftEffect,
    Monad0: function() {
      return monadAff;
    }
  };
  var liftEffect2 = /* @__PURE__ */ liftEffect(monadEffectAff);
  var effectCanceler = function($75) {
    return Canceler($$const(liftEffect2($75)));
  };
  var joinFiber = function(v) {
    return makeAff(function(k) {
      return map4(effectCanceler)(v.join(k));
    });
  };
  var functorFiber = {
    map: function(f) {
      return function(t) {
        return unsafePerformEffect(makeFiber(map1(f)(joinFiber(t))));
      };
    }
  };
  var killFiber = function(e) {
    return function(v) {
      return bind1(liftEffect2(v.isSuspended))(function(suspended) {
        if (suspended) {
          return liftEffect2($$void3(v.kill(e, $$const(pure2(unit)))));
        }
        ;
        return makeAff(function(k) {
          return map4(effectCanceler)(v.kill(e, k));
        });
      });
    };
  };
  var monadThrowAff = {
    throwError: _throwError,
    Monad0: function() {
      return monadAff;
    }
  };
  var monadErrorAff = {
    catchError: _catchError,
    MonadThrow0: function() {
      return monadThrowAff;
    }
  };
  var $$try2 = /* @__PURE__ */ $$try(monadErrorAff);
  var runAff = function(k) {
    return function(aff) {
      return launchAff(bindFlipped3(function($80) {
        return liftEffect2(k($80));
      })($$try2(aff)));
    };
  };
  var runAff_ = function(k) {
    return function(aff) {
      return $$void3(runAff(k)(aff));
    };
  };
  var parallelAff = {
    parallel: unsafeCoerce2,
    sequential: _sequential,
    Monad0: function() {
      return monadAff;
    },
    Applicative1: function() {
      return $lazy_applicativeParAff(0);
    }
  };
  var $lazy_applicativeParAff = /* @__PURE__ */ $runtime_lazy2("applicativeParAff", "Effect.Aff", function() {
    return {
      pure: function() {
        var $82 = parallel(parallelAff);
        return function($83) {
          return $82(pure22($83));
        };
      }(),
      Apply0: function() {
        return applyParAff;
      }
    };
  });
  var applicativeParAff = /* @__PURE__ */ $lazy_applicativeParAff(136);
  var monadRecAff = {
    tailRecM: function(k) {
      var go2 = function(a2) {
        return bind1(k(a2))(function(res) {
          if (res instanceof Done) {
            return pure22(res.value0);
          }
          ;
          if (res instanceof Loop) {
            return go2(res.value0);
          }
          ;
          throw new Error("Failed pattern match at Effect.Aff (line 104, column 7 - line 106, column 23): " + [res.constructor.name]);
        });
      };
      return go2;
    },
    Monad0: function() {
      return monadAff;
    }
  };
  var nonCanceler = /* @__PURE__ */ $$const(/* @__PURE__ */ pure22(unit));

  // output/Effect.Aff.Class/index.js
  var monadAffAff = {
    liftAff: /* @__PURE__ */ identity(categoryFn),
    MonadEffect0: function() {
      return monadEffectAff;
    }
  };
  var liftAff = function(dict) {
    return dict.liftAff;
  };

  // output/Data.Exists/index.js
  var runExists = unsafeCoerce2;
  var mkExists = unsafeCoerce2;

  // output/Data.Coyoneda/index.js
  var CoyonedaF = /* @__PURE__ */ function() {
    function CoyonedaF2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    CoyonedaF2.create = function(value0) {
      return function(value1) {
        return new CoyonedaF2(value0, value1);
      };
    };
    return CoyonedaF2;
  }();
  var unCoyoneda = function(f) {
    return function(v) {
      return runExists(function(v1) {
        return f(v1.value0)(v1.value1);
      })(v);
    };
  };
  var coyoneda = function(k) {
    return function(fi) {
      return mkExists(new CoyonedaF(k, fi));
    };
  };
  var functorCoyoneda = {
    map: function(f) {
      return function(v) {
        return runExists(function(v1) {
          return coyoneda(function($180) {
            return f(v1.value0($180));
          })(v1.value1);
        })(v);
      };
    }
  };
  var liftCoyoneda = /* @__PURE__ */ coyoneda(/* @__PURE__ */ identity(categoryFn));

  // output/Halogen.Data.Slot/index.js
  var foreachSlot = function(dictApplicative) {
    var traverse_7 = traverse_(dictApplicative)(foldableMap);
    return function(v) {
      return function(k) {
        return traverse_7(function($54) {
          return k($54);
        })(v);
      };
    };
  };
  var empty3 = empty2;

  // output/Halogen.Query.Input/index.js
  var RefUpdate = /* @__PURE__ */ function() {
    function RefUpdate2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    RefUpdate2.create = function(value0) {
      return function(value1) {
        return new RefUpdate2(value0, value1);
      };
    };
    return RefUpdate2;
  }();
  var Action = /* @__PURE__ */ function() {
    function Action3(value0) {
      this.value0 = value0;
    }
    ;
    Action3.create = function(value0) {
      return new Action3(value0);
    };
    return Action3;
  }();

  // output/Data.Nullable/foreign.js
  var nullImpl = null;
  function nullable(a2, r, f) {
    return a2 == null ? r : f(a2);
  }
  function notNull(x) {
    return x;
  }

  // output/Data.Nullable/index.js
  var toNullable = /* @__PURE__ */ maybe(nullImpl)(notNull);
  var toMaybe = function(n) {
    return nullable(n, Nothing.value, Just.create);
  };

  // output/Halogen.VDom.Machine/index.js
  var Step = /* @__PURE__ */ function() {
    function Step3(value0, value1, value22, value32) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
      this.value3 = value32;
    }
    ;
    Step3.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return function(value32) {
            return new Step3(value0, value1, value22, value32);
          };
        };
      };
    };
    return Step3;
  }();
  var unStep = unsafeCoerce2;
  var step2 = function(v, a2) {
    return v.value2(v.value1, a2);
  };
  var mkStep = unsafeCoerce2;
  var halt = function(v) {
    return v.value3(v.value1);
  };
  var extract2 = /* @__PURE__ */ unStep(function(v) {
    return v.value0;
  });

  // output/Halogen.VDom.Types/index.js
  var map5 = /* @__PURE__ */ map(functorArray);
  var map12 = /* @__PURE__ */ map(functorTuple);
  var Text = /* @__PURE__ */ function() {
    function Text2(value0) {
      this.value0 = value0;
    }
    ;
    Text2.create = function(value0) {
      return new Text2(value0);
    };
    return Text2;
  }();
  var Elem = /* @__PURE__ */ function() {
    function Elem2(value0, value1, value22, value32) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
      this.value3 = value32;
    }
    ;
    Elem2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return function(value32) {
            return new Elem2(value0, value1, value22, value32);
          };
        };
      };
    };
    return Elem2;
  }();
  var Keyed = /* @__PURE__ */ function() {
    function Keyed2(value0, value1, value22, value32) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
      this.value3 = value32;
    }
    ;
    Keyed2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return function(value32) {
            return new Keyed2(value0, value1, value22, value32);
          };
        };
      };
    };
    return Keyed2;
  }();
  var Widget = /* @__PURE__ */ function() {
    function Widget2(value0) {
      this.value0 = value0;
    }
    ;
    Widget2.create = function(value0) {
      return new Widget2(value0);
    };
    return Widget2;
  }();
  var Grafted = /* @__PURE__ */ function() {
    function Grafted2(value0) {
      this.value0 = value0;
    }
    ;
    Grafted2.create = function(value0) {
      return new Grafted2(value0);
    };
    return Grafted2;
  }();
  var Graft = /* @__PURE__ */ function() {
    function Graft2(value0, value1, value22) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
    }
    ;
    Graft2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return new Graft2(value0, value1, value22);
        };
      };
    };
    return Graft2;
  }();
  var unGraft = function(f) {
    return function($61) {
      return f($61);
    };
  };
  var graft = unsafeCoerce2;
  var bifunctorGraft = {
    bimap: function(f) {
      return function(g) {
        return unGraft(function(v) {
          return graft(new Graft(function($63) {
            return f(v.value0($63));
          }, function($64) {
            return g(v.value1($64));
          }, v.value2));
        });
      };
    }
  };
  var bimap2 = /* @__PURE__ */ bimap(bifunctorGraft);
  var runGraft = /* @__PURE__ */ unGraft(function(v) {
    var go2 = function(v2) {
      if (v2 instanceof Text) {
        return new Text(v2.value0);
      }
      ;
      if (v2 instanceof Elem) {
        return new Elem(v2.value0, v2.value1, v.value0(v2.value2), map5(go2)(v2.value3));
      }
      ;
      if (v2 instanceof Keyed) {
        return new Keyed(v2.value0, v2.value1, v.value0(v2.value2), map5(map12(go2))(v2.value3));
      }
      ;
      if (v2 instanceof Widget) {
        return new Widget(v.value1(v2.value0));
      }
      ;
      if (v2 instanceof Grafted) {
        return new Grafted(bimap2(v.value0)(v.value1)(v2.value0));
      }
      ;
      throw new Error("Failed pattern match at Halogen.VDom.Types (line 86, column 7 - line 86, column 27): " + [v2.constructor.name]);
    };
    return go2(v.value2);
  });

  // output/Halogen.VDom.Util/foreign.js
  function unsafeGetAny(key, obj) {
    return obj[key];
  }
  function unsafeHasAny(key, obj) {
    return obj.hasOwnProperty(key);
  }
  function unsafeSetAny(key, val, obj) {
    obj[key] = val;
  }
  function forE2(a2, f) {
    var b2 = [];
    for (var i2 = 0; i2 < a2.length; i2++) {
      b2.push(f(i2, a2[i2]));
    }
    return b2;
  }
  function forEachE(a2, f) {
    for (var i2 = 0; i2 < a2.length; i2++) {
      f(a2[i2]);
    }
  }
  function forInE(o, f) {
    var ks = Object.keys(o);
    for (var i2 = 0; i2 < ks.length; i2++) {
      var k = ks[i2];
      f(k, o[k]);
    }
  }
  function diffWithIxE(a1, a2, f1, f2, f3) {
    var a3 = [];
    var l1 = a1.length;
    var l2 = a2.length;
    var i2 = 0;
    while (1) {
      if (i2 < l1) {
        if (i2 < l2) {
          a3.push(f1(i2, a1[i2], a2[i2]));
        } else {
          f2(i2, a1[i2]);
        }
      } else if (i2 < l2) {
        a3.push(f3(i2, a2[i2]));
      } else {
        break;
      }
      i2++;
    }
    return a3;
  }
  function strMapWithIxE(as, fk, f) {
    var o = {};
    for (var i2 = 0; i2 < as.length; i2++) {
      var a2 = as[i2];
      var k = fk(a2);
      o[k] = f(k, i2, a2);
    }
    return o;
  }
  function diffWithKeyAndIxE(o1, as, fk, f1, f2, f3) {
    var o2 = {};
    for (var i2 = 0; i2 < as.length; i2++) {
      var a2 = as[i2];
      var k = fk(a2);
      if (o1.hasOwnProperty(k)) {
        o2[k] = f1(k, i2, o1[k], a2);
      } else {
        o2[k] = f3(k, i2, a2);
      }
    }
    for (var k in o1) {
      if (k in o2) {
        continue;
      }
      f2(k, o1[k]);
    }
    return o2;
  }
  function refEq2(a2, b2) {
    return a2 === b2;
  }
  function createTextNode(s, doc) {
    return doc.createTextNode(s);
  }
  function setTextContent(s, n) {
    n.textContent = s;
  }
  function createElement(ns, name15, doc) {
    if (ns != null) {
      return doc.createElementNS(ns, name15);
    } else {
      return doc.createElement(name15);
    }
  }
  function insertChildIx(i2, a2, b2) {
    var n = b2.childNodes.item(i2) || null;
    if (n !== a2) {
      b2.insertBefore(a2, n);
    }
  }
  function removeChild(a2, b2) {
    if (b2 && a2.parentNode === b2) {
      b2.removeChild(a2);
    }
  }
  function parentNode(a2) {
    return a2.parentNode;
  }
  function setAttribute(ns, attr3, val, el) {
    if (ns != null) {
      el.setAttributeNS(ns, attr3, val);
    } else {
      el.setAttribute(attr3, val);
    }
  }
  function removeAttribute(ns, attr3, el) {
    if (ns != null) {
      el.removeAttributeNS(ns, attr3);
    } else {
      el.removeAttribute(attr3);
    }
  }
  function hasAttribute(ns, attr3, el) {
    if (ns != null) {
      return el.hasAttributeNS(ns, attr3);
    } else {
      return el.hasAttribute(attr3);
    }
  }
  function addEventListener(ev, listener, el) {
    el.addEventListener(ev, listener, false);
  }
  function removeEventListener(ev, listener, el) {
    el.removeEventListener(ev, listener, false);
  }
  var jsUndefined = void 0;

  // output/Foreign.Object.ST/foreign.js
  var newImpl = function() {
    return {};
  };

  // output/Halogen.VDom.Util/index.js
  var unsafeLookup = unsafeGetAny;
  var unsafeFreeze2 = unsafeCoerce2;
  var pokeMutMap = unsafeSetAny;
  var newMutMap = newImpl;

  // output/Web.DOM.Element/foreign.js
  var getProp = function(name15) {
    return function(doctype) {
      return doctype[name15];
    };
  };
  var _namespaceURI = getProp("namespaceURI");
  var _prefix = getProp("prefix");
  var localName = getProp("localName");
  var tagName = getProp("tagName");

  // output/Web.DOM.ParentNode/foreign.js
  var getEffProp = function(name15) {
    return function(node) {
      return function() {
        return node[name15];
      };
    };
  };
  var children = getEffProp("children");
  var _firstElementChild = getEffProp("firstElementChild");
  var _lastElementChild = getEffProp("lastElementChild");
  var childElementCount = getEffProp("childElementCount");
  function _querySelector(selector) {
    return function(node) {
      return function() {
        return node.querySelector(selector);
      };
    };
  }

  // output/Web.DOM.ParentNode/index.js
  var map6 = /* @__PURE__ */ map(functorEffect);
  var querySelector = function(qs) {
    var $2 = map6(toMaybe);
    var $3 = _querySelector(qs);
    return function($4) {
      return $2($3($4));
    };
  };

  // output/Web.DOM.Element/index.js
  var toNode = unsafeCoerce2;

  // output/Halogen.VDom.DOM/index.js
  var $runtime_lazy3 = function(name15, moduleName, init2) {
    var state3 = 0;
    var val;
    return function(lineNumber) {
      if (state3 === 2)
        return val;
      if (state3 === 1)
        throw new ReferenceError(name15 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state3 = 1;
      val = init2();
      state3 = 2;
      return val;
    };
  };
  var haltWidget = function(v) {
    return halt(v.widget);
  };
  var $lazy_patchWidget = /* @__PURE__ */ $runtime_lazy3("patchWidget", "Halogen.VDom.DOM", function() {
    return function(state3, vdom) {
      if (vdom instanceof Grafted) {
        return $lazy_patchWidget(291)(state3, runGraft(vdom.value0));
      }
      ;
      if (vdom instanceof Widget) {
        var res = step2(state3.widget, vdom.value0);
        var res$prime = unStep(function(v) {
          return mkStep(new Step(v.value0, {
            build: state3.build,
            widget: res
          }, $lazy_patchWidget(296), haltWidget));
        })(res);
        return res$prime;
      }
      ;
      haltWidget(state3);
      return state3.build(vdom);
    };
  });
  var patchWidget = /* @__PURE__ */ $lazy_patchWidget(286);
  var haltText = function(v) {
    var parent2 = parentNode(v.node);
    return removeChild(v.node, parent2);
  };
  var $lazy_patchText = /* @__PURE__ */ $runtime_lazy3("patchText", "Halogen.VDom.DOM", function() {
    return function(state3, vdom) {
      if (vdom instanceof Grafted) {
        return $lazy_patchText(82)(state3, runGraft(vdom.value0));
      }
      ;
      if (vdom instanceof Text) {
        if (state3.value === vdom.value0) {
          return mkStep(new Step(state3.node, state3, $lazy_patchText(85), haltText));
        }
        ;
        if (otherwise) {
          var nextState = {
            build: state3.build,
            node: state3.node,
            value: vdom.value0
          };
          setTextContent(vdom.value0, state3.node);
          return mkStep(new Step(state3.node, nextState, $lazy_patchText(89), haltText));
        }
        ;
      }
      ;
      haltText(state3);
      return state3.build(vdom);
    };
  });
  var patchText = /* @__PURE__ */ $lazy_patchText(77);
  var haltKeyed = function(v) {
    var parent2 = parentNode(v.node);
    removeChild(v.node, parent2);
    forInE(v.children, function(v1, s) {
      return halt(s);
    });
    return halt(v.attrs);
  };
  var haltElem = function(v) {
    var parent2 = parentNode(v.node);
    removeChild(v.node, parent2);
    forEachE(v.children, halt);
    return halt(v.attrs);
  };
  var eqElemSpec = function(ns1, v, ns2, v1) {
    var $63 = v === v1;
    if ($63) {
      if (ns1 instanceof Just && (ns2 instanceof Just && ns1.value0 === ns2.value0)) {
        return true;
      }
      ;
      if (ns1 instanceof Nothing && ns2 instanceof Nothing) {
        return true;
      }
      ;
      return false;
    }
    ;
    return false;
  };
  var $lazy_patchElem = /* @__PURE__ */ $runtime_lazy3("patchElem", "Halogen.VDom.DOM", function() {
    return function(state3, vdom) {
      if (vdom instanceof Grafted) {
        return $lazy_patchElem(135)(state3, runGraft(vdom.value0));
      }
      ;
      if (vdom instanceof Elem && eqElemSpec(state3.ns, state3.name, vdom.value0, vdom.value1)) {
        var v = length2(vdom.value3);
        var v1 = length2(state3.children);
        if (v1 === 0 && v === 0) {
          var attrs2 = step2(state3.attrs, vdom.value2);
          var nextState = {
            build: state3.build,
            node: state3.node,
            attrs: attrs2,
            ns: vdom.value0,
            name: vdom.value1,
            children: state3.children
          };
          return mkStep(new Step(state3.node, nextState, $lazy_patchElem(149), haltElem));
        }
        ;
        var onThis = function(v2, s) {
          return halt(s);
        };
        var onThese = function(ix, s, v2) {
          var res = step2(s, v2);
          insertChildIx(ix, extract2(res), state3.node);
          return res;
        };
        var onThat = function(ix, v2) {
          var res = state3.build(v2);
          insertChildIx(ix, extract2(res), state3.node);
          return res;
        };
        var children2 = diffWithIxE(state3.children, vdom.value3, onThese, onThis, onThat);
        var attrs2 = step2(state3.attrs, vdom.value2);
        var nextState = {
          build: state3.build,
          node: state3.node,
          attrs: attrs2,
          ns: vdom.value0,
          name: vdom.value1,
          children: children2
        };
        return mkStep(new Step(state3.node, nextState, $lazy_patchElem(172), haltElem));
      }
      ;
      haltElem(state3);
      return state3.build(vdom);
    };
  });
  var patchElem = /* @__PURE__ */ $lazy_patchElem(130);
  var $lazy_patchKeyed = /* @__PURE__ */ $runtime_lazy3("patchKeyed", "Halogen.VDom.DOM", function() {
    return function(state3, vdom) {
      if (vdom instanceof Grafted) {
        return $lazy_patchKeyed(222)(state3, runGraft(vdom.value0));
      }
      ;
      if (vdom instanceof Keyed && eqElemSpec(state3.ns, state3.name, vdom.value0, vdom.value1)) {
        var v = length2(vdom.value3);
        if (state3.length === 0 && v === 0) {
          var attrs2 = step2(state3.attrs, vdom.value2);
          var nextState = {
            build: state3.build,
            node: state3.node,
            attrs: attrs2,
            ns: vdom.value0,
            name: vdom.value1,
            children: state3.children,
            length: 0
          };
          return mkStep(new Step(state3.node, nextState, $lazy_patchKeyed(237), haltKeyed));
        }
        ;
        var onThis = function(v2, s) {
          return halt(s);
        };
        var onThese = function(v2, ix$prime, s, v3) {
          var res = step2(s, v3.value1);
          insertChildIx(ix$prime, extract2(res), state3.node);
          return res;
        };
        var onThat = function(v2, ix, v3) {
          var res = state3.build(v3.value1);
          insertChildIx(ix, extract2(res), state3.node);
          return res;
        };
        var children2 = diffWithKeyAndIxE(state3.children, vdom.value3, fst, onThese, onThis, onThat);
        var attrs2 = step2(state3.attrs, vdom.value2);
        var nextState = {
          build: state3.build,
          node: state3.node,
          attrs: attrs2,
          ns: vdom.value0,
          name: vdom.value1,
          children: children2,
          length: v
        };
        return mkStep(new Step(state3.node, nextState, $lazy_patchKeyed(261), haltKeyed));
      }
      ;
      haltKeyed(state3);
      return state3.build(vdom);
    };
  });
  var patchKeyed = /* @__PURE__ */ $lazy_patchKeyed(217);
  var buildWidget = function(v, build, w) {
    var res = v.buildWidget(v)(w);
    var res$prime = unStep(function(v1) {
      return mkStep(new Step(v1.value0, {
        build,
        widget: res
      }, patchWidget, haltWidget));
    })(res);
    return res$prime;
  };
  var buildText = function(v, build, s) {
    var node = createTextNode(s, v.document);
    var state3 = {
      build,
      node,
      value: s
    };
    return mkStep(new Step(node, state3, patchText, haltText));
  };
  var buildKeyed = function(v, build, ns1, name1, as1, ch1) {
    var el = createElement(toNullable(ns1), name1, v.document);
    var node = toNode(el);
    var onChild = function(v1, ix, v2) {
      var res = build(v2.value1);
      insertChildIx(ix, extract2(res), node);
      return res;
    };
    var children2 = strMapWithIxE(ch1, fst, onChild);
    var attrs = v.buildAttributes(el)(as1);
    var state3 = {
      build,
      node,
      attrs,
      ns: ns1,
      name: name1,
      children: children2,
      length: length2(ch1)
    };
    return mkStep(new Step(node, state3, patchKeyed, haltKeyed));
  };
  var buildElem = function(v, build, ns1, name1, as1, ch1) {
    var el = createElement(toNullable(ns1), name1, v.document);
    var node = toNode(el);
    var onChild = function(ix, child) {
      var res = build(child);
      insertChildIx(ix, extract2(res), node);
      return res;
    };
    var children2 = forE2(ch1, onChild);
    var attrs = v.buildAttributes(el)(as1);
    var state3 = {
      build,
      node,
      attrs,
      ns: ns1,
      name: name1,
      children: children2
    };
    return mkStep(new Step(node, state3, patchElem, haltElem));
  };
  var buildVDom = function(spec) {
    var $lazy_build = $runtime_lazy3("build", "Halogen.VDom.DOM", function() {
      return function(v) {
        if (v instanceof Text) {
          return buildText(spec, $lazy_build(59), v.value0);
        }
        ;
        if (v instanceof Elem) {
          return buildElem(spec, $lazy_build(60), v.value0, v.value1, v.value2, v.value3);
        }
        ;
        if (v instanceof Keyed) {
          return buildKeyed(spec, $lazy_build(61), v.value0, v.value1, v.value2, v.value3);
        }
        ;
        if (v instanceof Widget) {
          return buildWidget(spec, $lazy_build(62), v.value0);
        }
        ;
        if (v instanceof Grafted) {
          return $lazy_build(63)(runGraft(v.value0));
        }
        ;
        throw new Error("Failed pattern match at Halogen.VDom.DOM (line 58, column 27 - line 63, column 52): " + [v.constructor.name]);
      };
    });
    var build = $lazy_build(58);
    return build;
  };

  // output/Foreign/foreign.js
  function typeOf(value12) {
    return typeof value12;
  }
  var isArray = Array.isArray || function(value12) {
    return Object.prototype.toString.call(value12) === "[object Array]";
  };

  // output/Data.List.NonEmpty/index.js
  var singleton4 = /* @__PURE__ */ function() {
    var $200 = singleton2(plusList);
    return function($201) {
      return NonEmptyList($200($201));
    };
  }();
  var cons2 = function(y) {
    return function(v) {
      return new NonEmpty(y, new Cons(v.value0, v.value1));
    };
  };

  // output/Foreign.Object/foreign.js
  function _lookup(no, yes, k, m) {
    return k in m ? yes(m[k]) : no;
  }
  function toArrayWithKey(f) {
    return function(m) {
      var r = [];
      for (var k in m) {
        if (hasOwnProperty.call(m, k)) {
          r.push(f(k)(m[k]));
        }
      }
      return r;
    };
  }
  var keys3 = Object.keys || toArrayWithKey(function(k) {
    return function() {
      return k;
    };
  });

  // output/Data.Function.Uncurried/foreign.js
  var runFn4 = function(fn) {
    return function(a2) {
      return function(b2) {
        return function(c) {
          return function(d) {
            return fn(a2, b2, c, d);
          };
        };
      };
    };
  };

  // output/Foreign.Object/index.js
  var lookup3 = /* @__PURE__ */ function() {
    return runFn4(_lookup)(Nothing.value)(Just.create);
  }();

  // output/Web.Event.EventTarget/foreign.js
  function eventListener(fn) {
    return function() {
      return function(event) {
        return fn(event)();
      };
    };
  }
  function addEventListener2(type) {
    return function(listener) {
      return function(useCapture) {
        return function(target6) {
          return function() {
            return target6.addEventListener(type, listener, useCapture);
          };
        };
      };
    };
  }
  function removeEventListener2(type) {
    return function(listener) {
      return function(useCapture) {
        return function(target6) {
          return function() {
            return target6.removeEventListener(type, listener, useCapture);
          };
        };
      };
    };
  }

  // output/Halogen.VDom.DOM.Prop/index.js
  var $runtime_lazy4 = function(name15, moduleName, init2) {
    var state3 = 0;
    var val;
    return function(lineNumber) {
      if (state3 === 2)
        return val;
      if (state3 === 1)
        throw new ReferenceError(name15 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state3 = 1;
      val = init2();
      state3 = 2;
      return val;
    };
  };
  var Created = /* @__PURE__ */ function() {
    function Created2(value0) {
      this.value0 = value0;
    }
    ;
    Created2.create = function(value0) {
      return new Created2(value0);
    };
    return Created2;
  }();
  var Removed = /* @__PURE__ */ function() {
    function Removed2(value0) {
      this.value0 = value0;
    }
    ;
    Removed2.create = function(value0) {
      return new Removed2(value0);
    };
    return Removed2;
  }();
  var Attribute = /* @__PURE__ */ function() {
    function Attribute2(value0, value1, value22) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
    }
    ;
    Attribute2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return new Attribute2(value0, value1, value22);
        };
      };
    };
    return Attribute2;
  }();
  var Property = /* @__PURE__ */ function() {
    function Property2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Property2.create = function(value0) {
      return function(value1) {
        return new Property2(value0, value1);
      };
    };
    return Property2;
  }();
  var Handler = /* @__PURE__ */ function() {
    function Handler2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Handler2.create = function(value0) {
      return function(value1) {
        return new Handler2(value0, value1);
      };
    };
    return Handler2;
  }();
  var Ref = /* @__PURE__ */ function() {
    function Ref2(value0) {
      this.value0 = value0;
    }
    ;
    Ref2.create = function(value0) {
      return new Ref2(value0);
    };
    return Ref2;
  }();
  var unsafeGetProperty = unsafeGetAny;
  var setProperty = unsafeSetAny;
  var removeProperty = function(key, el) {
    var v = hasAttribute(nullImpl, key, el);
    if (v) {
      return removeAttribute(nullImpl, key, el);
    }
    ;
    var v1 = typeOf(unsafeGetAny(key, el));
    if (v1 === "string") {
      return unsafeSetAny(key, "", el);
    }
    ;
    if (key === "rowSpan") {
      return unsafeSetAny(key, 1, el);
    }
    ;
    if (key === "colSpan") {
      return unsafeSetAny(key, 1, el);
    }
    ;
    return unsafeSetAny(key, jsUndefined, el);
  };
  var propToStrKey = function(v) {
    if (v instanceof Attribute && v.value0 instanceof Just) {
      return "attr/" + (v.value0.value0 + (":" + v.value1));
    }
    ;
    if (v instanceof Attribute) {
      return "attr/:" + v.value1;
    }
    ;
    if (v instanceof Property) {
      return "prop/" + v.value0;
    }
    ;
    if (v instanceof Handler) {
      return "handler/" + v.value0;
    }
    ;
    if (v instanceof Ref) {
      return "ref";
    }
    ;
    throw new Error("Failed pattern match at Halogen.VDom.DOM.Prop (line 182, column 16 - line 187, column 16): " + [v.constructor.name]);
  };
  var buildProp = function(emit) {
    return function(el) {
      var removeProp = function(prevEvents) {
        return function(v, v1) {
          if (v1 instanceof Attribute) {
            return removeAttribute(toNullable(v1.value0), v1.value1, el);
          }
          ;
          if (v1 instanceof Property) {
            return removeProperty(v1.value0, el);
          }
          ;
          if (v1 instanceof Handler) {
            var handler3 = unsafeLookup(v1.value0, prevEvents);
            return removeEventListener(v1.value0, fst(handler3), el);
          }
          ;
          if (v1 instanceof Ref) {
            return unit;
          }
          ;
          throw new Error("Failed pattern match at Halogen.VDom.DOM.Prop (line 169, column 5 - line 179, column 18): " + [v1.constructor.name]);
        };
      };
      var mbEmit = function(v) {
        if (v instanceof Just) {
          return emit(v.value0)();
        }
        ;
        return unit;
      };
      var haltProp = function(state3) {
        var v = lookup3("ref")(state3.props);
        if (v instanceof Just && v.value0 instanceof Ref) {
          return mbEmit(v.value0.value0(new Removed(el)));
        }
        ;
        return unit;
      };
      var diffProp = function(prevEvents, events) {
        return function(v, v1, v11, v2) {
          if (v11 instanceof Attribute && v2 instanceof Attribute) {
            var $66 = v11.value2 === v2.value2;
            if ($66) {
              return v2;
            }
            ;
            setAttribute(toNullable(v2.value0), v2.value1, v2.value2, el);
            return v2;
          }
          ;
          if (v11 instanceof Property && v2 instanceof Property) {
            var v4 = refEq2(v11.value1, v2.value1);
            if (v4) {
              return v2;
            }
            ;
            if (v2.value0 === "value") {
              var elVal = unsafeGetProperty("value", el);
              var $75 = refEq2(elVal, v2.value1);
              if ($75) {
                return v2;
              }
              ;
              setProperty(v2.value0, v2.value1, el);
              return v2;
            }
            ;
            setProperty(v2.value0, v2.value1, el);
            return v2;
          }
          ;
          if (v11 instanceof Handler && v2 instanceof Handler) {
            var handler3 = unsafeLookup(v2.value0, prevEvents);
            write(v2.value1)(snd(handler3))();
            pokeMutMap(v2.value0, handler3, events);
            return v2;
          }
          ;
          return v2;
        };
      };
      var applyProp = function(events) {
        return function(v, v1, v2) {
          if (v2 instanceof Attribute) {
            setAttribute(toNullable(v2.value0), v2.value1, v2.value2, el);
            return v2;
          }
          ;
          if (v2 instanceof Property) {
            setProperty(v2.value0, v2.value1, el);
            return v2;
          }
          ;
          if (v2 instanceof Handler) {
            var v3 = unsafeGetAny(v2.value0, events);
            if (unsafeHasAny(v2.value0, events)) {
              write(v2.value1)(snd(v3))();
              return v2;
            }
            ;
            var ref2 = $$new(v2.value1)();
            var listener = eventListener(function(ev) {
              return function __do4() {
                var f$prime = read(ref2)();
                return mbEmit(f$prime(ev));
              };
            })();
            pokeMutMap(v2.value0, new Tuple(listener, ref2), events);
            addEventListener(v2.value0, listener, el);
            return v2;
          }
          ;
          if (v2 instanceof Ref) {
            mbEmit(v2.value0(new Created(el)));
            return v2;
          }
          ;
          throw new Error("Failed pattern match at Halogen.VDom.DOM.Prop (line 113, column 5 - line 135, column 15): " + [v2.constructor.name]);
        };
      };
      var $lazy_patchProp = $runtime_lazy4("patchProp", "Halogen.VDom.DOM.Prop", function() {
        return function(state3, ps2) {
          var events = newMutMap();
          var onThis = removeProp(state3.events);
          var onThese = diffProp(state3.events, events);
          var onThat = applyProp(events);
          var props = diffWithKeyAndIxE(state3.props, ps2, propToStrKey, onThese, onThis, onThat);
          var nextState = {
            events: unsafeFreeze2(events),
            props
          };
          return mkStep(new Step(unit, nextState, $lazy_patchProp(100), haltProp));
        };
      });
      var patchProp = $lazy_patchProp(87);
      var renderProp = function(ps1) {
        var events = newMutMap();
        var ps1$prime = strMapWithIxE(ps1, propToStrKey, applyProp(events));
        var state3 = {
          events: unsafeFreeze2(events),
          props: ps1$prime
        };
        return mkStep(new Step(unit, state3, patchProp, haltProp));
      };
      return renderProp;
    };
  };

  // output/Halogen.HTML.Core/index.js
  var HTML = function(x) {
    return x;
  };
  var text = function($29) {
    return HTML(Text.create($29));
  };
  var handler = /* @__PURE__ */ function() {
    return Handler.create;
  }();
  var element = function(ns) {
    return function(name15) {
      return function(props) {
        return function(children2) {
          return new Elem(ns, name15, props, children2);
        };
      };
    };
  };
  var attr = function(ns) {
    return function(v) {
      return Attribute.create(ns)(v);
    };
  };

  // output/Control.Applicative.Free/index.js
  var identity5 = /* @__PURE__ */ identity(categoryFn);
  var Pure = /* @__PURE__ */ function() {
    function Pure2(value0) {
      this.value0 = value0;
    }
    ;
    Pure2.create = function(value0) {
      return new Pure2(value0);
    };
    return Pure2;
  }();
  var Lift = /* @__PURE__ */ function() {
    function Lift3(value0) {
      this.value0 = value0;
    }
    ;
    Lift3.create = function(value0) {
      return new Lift3(value0);
    };
    return Lift3;
  }();
  var Ap = /* @__PURE__ */ function() {
    function Ap2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Ap2.create = function(value0) {
      return function(value1) {
        return new Ap2(value0, value1);
      };
    };
    return Ap2;
  }();
  var mkAp = function(fba) {
    return function(fb) {
      return new Ap(fba, fb);
    };
  };
  var liftFreeAp = /* @__PURE__ */ function() {
    return Lift.create;
  }();
  var goLeft = function(dictApplicative) {
    var pure10 = pure(dictApplicative);
    return function(fStack) {
      return function(valStack) {
        return function(nat) {
          return function(func) {
            return function(count) {
              if (func instanceof Pure) {
                return new Tuple(new Cons({
                  func: pure10(func.value0),
                  count
                }, fStack), valStack);
              }
              ;
              if (func instanceof Lift) {
                return new Tuple(new Cons({
                  func: nat(func.value0),
                  count
                }, fStack), valStack);
              }
              ;
              if (func instanceof Ap) {
                return goLeft(dictApplicative)(fStack)(cons2(func.value1)(valStack))(nat)(func.value0)(count + 1 | 0);
              }
              ;
              throw new Error("Failed pattern match at Control.Applicative.Free (line 102, column 41 - line 105, column 81): " + [func.constructor.name]);
            };
          };
        };
      };
    };
  };
  var goApply = function(dictApplicative) {
    var apply2 = apply(dictApplicative.Apply0());
    return function(fStack) {
      return function(vals) {
        return function(gVal) {
          if (fStack instanceof Nil) {
            return new Left(gVal);
          }
          ;
          if (fStack instanceof Cons) {
            var gRes = apply2(fStack.value0.func)(gVal);
            var $31 = fStack.value0.count === 1;
            if ($31) {
              if (fStack.value1 instanceof Nil) {
                return new Left(gRes);
              }
              ;
              return goApply(dictApplicative)(fStack.value1)(vals)(gRes);
            }
            ;
            if (vals instanceof Nil) {
              return new Left(gRes);
            }
            ;
            if (vals instanceof Cons) {
              return new Right(new Tuple(new Cons({
                func: gRes,
                count: fStack.value0.count - 1 | 0
              }, fStack.value1), new NonEmpty(vals.value0, vals.value1)));
            }
            ;
            throw new Error("Failed pattern match at Control.Applicative.Free (line 83, column 11 - line 88, column 50): " + [vals.constructor.name]);
          }
          ;
          throw new Error("Failed pattern match at Control.Applicative.Free (line 72, column 3 - line 88, column 50): " + [fStack.constructor.name]);
        };
      };
    };
  };
  var functorFreeAp = {
    map: function(f) {
      return function(x) {
        return mkAp(new Pure(f))(x);
      };
    }
  };
  var foldFreeAp = function(dictApplicative) {
    var goApply1 = goApply(dictApplicative);
    var pure10 = pure(dictApplicative);
    var goLeft1 = goLeft(dictApplicative);
    return function(nat) {
      return function(z) {
        var go2 = function($copy_v) {
          var $tco_done = false;
          var $tco_result;
          function $tco_loop(v) {
            if (v.value1.value0 instanceof Pure) {
              var v1 = goApply1(v.value0)(v.value1.value1)(pure10(v.value1.value0.value0));
              if (v1 instanceof Left) {
                $tco_done = true;
                return v1.value0;
              }
              ;
              if (v1 instanceof Right) {
                $copy_v = v1.value0;
                return;
              }
              ;
              throw new Error("Failed pattern match at Control.Applicative.Free (line 54, column 17 - line 56, column 24): " + [v1.constructor.name]);
            }
            ;
            if (v.value1.value0 instanceof Lift) {
              var v1 = goApply1(v.value0)(v.value1.value1)(nat(v.value1.value0.value0));
              if (v1 instanceof Left) {
                $tco_done = true;
                return v1.value0;
              }
              ;
              if (v1 instanceof Right) {
                $copy_v = v1.value0;
                return;
              }
              ;
              throw new Error("Failed pattern match at Control.Applicative.Free (line 57, column 17 - line 59, column 24): " + [v1.constructor.name]);
            }
            ;
            if (v.value1.value0 instanceof Ap) {
              var nextVals = new NonEmpty(v.value1.value0.value1, v.value1.value1);
              $copy_v = goLeft1(v.value0)(nextVals)(nat)(v.value1.value0.value0)(1);
              return;
            }
            ;
            throw new Error("Failed pattern match at Control.Applicative.Free (line 53, column 5 - line 62, column 47): " + [v.value1.value0.constructor.name]);
          }
          ;
          while (!$tco_done) {
            $tco_result = $tco_loop($copy_v);
          }
          ;
          return $tco_result;
        };
        return go2(new Tuple(Nil.value, singleton4(z)));
      };
    };
  };
  var retractFreeAp = function(dictApplicative) {
    return foldFreeAp(dictApplicative)(identity5);
  };
  var applyFreeAp = {
    apply: function(fba) {
      return function(fb) {
        return mkAp(fba)(fb);
      };
    },
    Functor0: function() {
      return functorFreeAp;
    }
  };
  var applicativeFreeAp = /* @__PURE__ */ function() {
    return {
      pure: Pure.create,
      Apply0: function() {
        return applyFreeAp;
      }
    };
  }();
  var foldFreeAp1 = /* @__PURE__ */ foldFreeAp(applicativeFreeAp);
  var hoistFreeAp = function(f) {
    return foldFreeAp1(function($54) {
      return liftFreeAp(f($54));
    });
  };

  // output/Data.CatQueue/index.js
  var CatQueue = /* @__PURE__ */ function() {
    function CatQueue2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    CatQueue2.create = function(value0) {
      return function(value1) {
        return new CatQueue2(value0, value1);
      };
    };
    return CatQueue2;
  }();
  var uncons2 = function($copy_v) {
    var $tco_done = false;
    var $tco_result;
    function $tco_loop(v) {
      if (v.value0 instanceof Nil && v.value1 instanceof Nil) {
        $tco_done = true;
        return Nothing.value;
      }
      ;
      if (v.value0 instanceof Nil) {
        $copy_v = new CatQueue(reverse(v.value1), Nil.value);
        return;
      }
      ;
      if (v.value0 instanceof Cons) {
        $tco_done = true;
        return new Just(new Tuple(v.value0.value0, new CatQueue(v.value0.value1, v.value1)));
      }
      ;
      throw new Error("Failed pattern match at Data.CatQueue (line 82, column 1 - line 82, column 63): " + [v.constructor.name]);
    }
    ;
    while (!$tco_done) {
      $tco_result = $tco_loop($copy_v);
    }
    ;
    return $tco_result;
  };
  var snoc2 = function(v) {
    return function(a2) {
      return new CatQueue(v.value0, new Cons(a2, v.value1));
    };
  };
  var $$null2 = function(v) {
    if (v.value0 instanceof Nil && v.value1 instanceof Nil) {
      return true;
    }
    ;
    return false;
  };
  var empty5 = /* @__PURE__ */ function() {
    return new CatQueue(Nil.value, Nil.value);
  }();

  // output/Data.CatList/index.js
  var CatNil = /* @__PURE__ */ function() {
    function CatNil2() {
    }
    ;
    CatNil2.value = new CatNil2();
    return CatNil2;
  }();
  var CatCons = /* @__PURE__ */ function() {
    function CatCons2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    CatCons2.create = function(value0) {
      return function(value1) {
        return new CatCons2(value0, value1);
      };
    };
    return CatCons2;
  }();
  var link = function(v) {
    return function(v1) {
      if (v instanceof CatNil) {
        return v1;
      }
      ;
      if (v1 instanceof CatNil) {
        return v;
      }
      ;
      if (v instanceof CatCons) {
        return new CatCons(v.value0, snoc2(v.value1)(v1));
      }
      ;
      throw new Error("Failed pattern match at Data.CatList (line 108, column 1 - line 108, column 54): " + [v.constructor.name, v1.constructor.name]);
    };
  };
  var foldr5 = function(k) {
    return function(b2) {
      return function(q2) {
        var foldl3 = function($copy_v) {
          return function($copy_v1) {
            return function($copy_v2) {
              var $tco_var_v = $copy_v;
              var $tco_var_v1 = $copy_v1;
              var $tco_done = false;
              var $tco_result;
              function $tco_loop(v, v1, v2) {
                if (v2 instanceof Nil) {
                  $tco_done = true;
                  return v1;
                }
                ;
                if (v2 instanceof Cons) {
                  $tco_var_v = v;
                  $tco_var_v1 = v(v1)(v2.value0);
                  $copy_v2 = v2.value1;
                  return;
                }
                ;
                throw new Error("Failed pattern match at Data.CatList (line 124, column 3 - line 124, column 59): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
              }
              ;
              while (!$tco_done) {
                $tco_result = $tco_loop($tco_var_v, $tco_var_v1, $copy_v2);
              }
              ;
              return $tco_result;
            };
          };
        };
        var go2 = function($copy_xs) {
          return function($copy_ys) {
            var $tco_var_xs = $copy_xs;
            var $tco_done1 = false;
            var $tco_result;
            function $tco_loop(xs, ys) {
              var v = uncons2(xs);
              if (v instanceof Nothing) {
                $tco_done1 = true;
                return foldl3(function(x) {
                  return function(i2) {
                    return i2(x);
                  };
                })(b2)(ys);
              }
              ;
              if (v instanceof Just) {
                $tco_var_xs = v.value0.value1;
                $copy_ys = new Cons(k(v.value0.value0), ys);
                return;
              }
              ;
              throw new Error("Failed pattern match at Data.CatList (line 120, column 14 - line 122, column 67): " + [v.constructor.name]);
            }
            ;
            while (!$tco_done1) {
              $tco_result = $tco_loop($tco_var_xs, $copy_ys);
            }
            ;
            return $tco_result;
          };
        };
        return go2(q2)(Nil.value);
      };
    };
  };
  var uncons3 = function(v) {
    if (v instanceof CatNil) {
      return Nothing.value;
    }
    ;
    if (v instanceof CatCons) {
      return new Just(new Tuple(v.value0, function() {
        var $66 = $$null2(v.value1);
        if ($66) {
          return CatNil.value;
        }
        ;
        return foldr5(link)(CatNil.value)(v.value1);
      }()));
    }
    ;
    throw new Error("Failed pattern match at Data.CatList (line 99, column 1 - line 99, column 61): " + [v.constructor.name]);
  };
  var empty6 = /* @__PURE__ */ function() {
    return CatNil.value;
  }();
  var append2 = link;
  var semigroupCatList = {
    append: append2
  };
  var snoc3 = function(cat) {
    return function(a2) {
      return append2(cat)(new CatCons(a2, empty5));
    };
  };

  // output/Control.Monad.Free/index.js
  var $runtime_lazy5 = function(name15, moduleName, init2) {
    var state3 = 0;
    var val;
    return function(lineNumber) {
      if (state3 === 2)
        return val;
      if (state3 === 1)
        throw new ReferenceError(name15 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state3 = 1;
      val = init2();
      state3 = 2;
      return val;
    };
  };
  var append3 = /* @__PURE__ */ append(semigroupCatList);
  var Free = /* @__PURE__ */ function() {
    function Free2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Free2.create = function(value0) {
      return function(value1) {
        return new Free2(value0, value1);
      };
    };
    return Free2;
  }();
  var Return = /* @__PURE__ */ function() {
    function Return2(value0) {
      this.value0 = value0;
    }
    ;
    Return2.create = function(value0) {
      return new Return2(value0);
    };
    return Return2;
  }();
  var Bind = /* @__PURE__ */ function() {
    function Bind2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Bind2.create = function(value0) {
      return function(value1) {
        return new Bind2(value0, value1);
      };
    };
    return Bind2;
  }();
  var toView = function($copy_v) {
    var $tco_done = false;
    var $tco_result;
    function $tco_loop(v) {
      var runExpF = function(v22) {
        return v22;
      };
      var concatF = function(v22) {
        return function(r) {
          return new Free(v22.value0, append3(v22.value1)(r));
        };
      };
      if (v.value0 instanceof Return) {
        var v2 = uncons3(v.value1);
        if (v2 instanceof Nothing) {
          $tco_done = true;
          return new Return(v.value0.value0);
        }
        ;
        if (v2 instanceof Just) {
          $copy_v = concatF(runExpF(v2.value0.value0)(v.value0.value0))(v2.value0.value1);
          return;
        }
        ;
        throw new Error("Failed pattern match at Control.Monad.Free (line 227, column 7 - line 231, column 64): " + [v2.constructor.name]);
      }
      ;
      if (v.value0 instanceof Bind) {
        $tco_done = true;
        return new Bind(v.value0.value0, function(a2) {
          return concatF(v.value0.value1(a2))(v.value1);
        });
      }
      ;
      throw new Error("Failed pattern match at Control.Monad.Free (line 225, column 3 - line 233, column 56): " + [v.value0.constructor.name]);
    }
    ;
    while (!$tco_done) {
      $tco_result = $tco_loop($copy_v);
    }
    ;
    return $tco_result;
  };
  var fromView = function(f) {
    return new Free(f, empty6);
  };
  var freeMonad = {
    Applicative0: function() {
      return freeApplicative;
    },
    Bind1: function() {
      return freeBind;
    }
  };
  var freeFunctor = {
    map: function(k) {
      return function(f) {
        return bindFlipped(freeBind)(function() {
          var $189 = pure(freeApplicative);
          return function($190) {
            return $189(k($190));
          };
        }())(f);
      };
    }
  };
  var freeBind = {
    bind: function(v) {
      return function(k) {
        return new Free(v.value0, snoc3(v.value1)(k));
      };
    },
    Apply0: function() {
      return $lazy_freeApply(0);
    }
  };
  var freeApplicative = {
    pure: function($191) {
      return fromView(Return.create($191));
    },
    Apply0: function() {
      return $lazy_freeApply(0);
    }
  };
  var $lazy_freeApply = /* @__PURE__ */ $runtime_lazy5("freeApply", "Control.Monad.Free", function() {
    return {
      apply: ap(freeMonad),
      Functor0: function() {
        return freeFunctor;
      }
    };
  });
  var pure3 = /* @__PURE__ */ pure(freeApplicative);
  var liftF = function(f) {
    return fromView(new Bind(f, function($192) {
      return pure3($192);
    }));
  };
  var foldFree = function(dictMonadRec) {
    var Monad0 = dictMonadRec.Monad0();
    var map18 = map(Monad0.Bind1().Apply0().Functor0());
    var pure13 = pure(Monad0.Applicative0());
    var tailRecM4 = tailRecM(dictMonadRec);
    return function(k) {
      var go2 = function(f) {
        var v = toView(f);
        if (v instanceof Return) {
          return map18(Done.create)(pure13(v.value0));
        }
        ;
        if (v instanceof Bind) {
          return map18(function($199) {
            return Loop.create(v.value1($199));
          })(k(v.value0));
        }
        ;
        throw new Error("Failed pattern match at Control.Monad.Free (line 158, column 10 - line 160, column 37): " + [v.constructor.name]);
      };
      return tailRecM4(go2);
    };
  };

  // output/Halogen.Query.ChildQuery/index.js
  var unChildQueryBox = unsafeCoerce2;

  // output/Unsafe.Reference/foreign.js
  function reallyUnsafeRefEq(a2) {
    return function(b2) {
      return a2 === b2;
    };
  }

  // output/Unsafe.Reference/index.js
  var unsafeRefEq = reallyUnsafeRefEq;

  // output/Halogen.Subscription/index.js
  var $$void4 = /* @__PURE__ */ $$void(functorEffect);
  var bind2 = /* @__PURE__ */ bind(bindEffect);
  var append4 = /* @__PURE__ */ append(semigroupArray);
  var traverse_2 = /* @__PURE__ */ traverse_(applicativeEffect);
  var traverse_1 = /* @__PURE__ */ traverse_2(foldableArray);
  var unsubscribe = function(v) {
    return v;
  };
  var subscribe = function(v) {
    return function(k) {
      return v(function($76) {
        return $$void4(k($76));
      });
    };
  };
  var notify = function(v) {
    return function(a2) {
      return v(a2);
    };
  };
  var create = function __do() {
    var subscribers = $$new([])();
    return {
      emitter: function(k) {
        return function __do4() {
          modify_(function(v) {
            return append4(v)([k]);
          })(subscribers)();
          return modify_(deleteBy(unsafeRefEq)(k))(subscribers);
        };
      },
      listener: function(a2) {
        return bind2(read(subscribers))(traverse_1(function(k) {
          return k(a2);
        }));
      }
    };
  };

  // output/Halogen.Query.HalogenM/index.js
  var identity6 = /* @__PURE__ */ identity(categoryFn);
  var SubscriptionId = function(x) {
    return x;
  };
  var ForkId = function(x) {
    return x;
  };
  var State = /* @__PURE__ */ function() {
    function State2(value0) {
      this.value0 = value0;
    }
    ;
    State2.create = function(value0) {
      return new State2(value0);
    };
    return State2;
  }();
  var Subscribe = /* @__PURE__ */ function() {
    function Subscribe2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Subscribe2.create = function(value0) {
      return function(value1) {
        return new Subscribe2(value0, value1);
      };
    };
    return Subscribe2;
  }();
  var Unsubscribe = /* @__PURE__ */ function() {
    function Unsubscribe2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Unsubscribe2.create = function(value0) {
      return function(value1) {
        return new Unsubscribe2(value0, value1);
      };
    };
    return Unsubscribe2;
  }();
  var Lift2 = /* @__PURE__ */ function() {
    function Lift3(value0) {
      this.value0 = value0;
    }
    ;
    Lift3.create = function(value0) {
      return new Lift3(value0);
    };
    return Lift3;
  }();
  var ChildQuery2 = /* @__PURE__ */ function() {
    function ChildQuery3(value0) {
      this.value0 = value0;
    }
    ;
    ChildQuery3.create = function(value0) {
      return new ChildQuery3(value0);
    };
    return ChildQuery3;
  }();
  var Raise = /* @__PURE__ */ function() {
    function Raise2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Raise2.create = function(value0) {
      return function(value1) {
        return new Raise2(value0, value1);
      };
    };
    return Raise2;
  }();
  var Par = /* @__PURE__ */ function() {
    function Par2(value0) {
      this.value0 = value0;
    }
    ;
    Par2.create = function(value0) {
      return new Par2(value0);
    };
    return Par2;
  }();
  var Fork = /* @__PURE__ */ function() {
    function Fork2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Fork2.create = function(value0) {
      return function(value1) {
        return new Fork2(value0, value1);
      };
    };
    return Fork2;
  }();
  var Join = /* @__PURE__ */ function() {
    function Join2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Join2.create = function(value0) {
      return function(value1) {
        return new Join2(value0, value1);
      };
    };
    return Join2;
  }();
  var Kill = /* @__PURE__ */ function() {
    function Kill2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Kill2.create = function(value0) {
      return function(value1) {
        return new Kill2(value0, value1);
      };
    };
    return Kill2;
  }();
  var GetRef = /* @__PURE__ */ function() {
    function GetRef2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    GetRef2.create = function(value0) {
      return function(value1) {
        return new GetRef2(value0, value1);
      };
    };
    return GetRef2;
  }();
  var HalogenM = function(x) {
    return x;
  };
  var subscribe2 = function(es) {
    return liftF(new Subscribe(function(v) {
      return es;
    }, identity6));
  };
  var ordSubscriptionId = ordInt;
  var ordForkId = ordInt;
  var monadHalogenM = freeMonad;
  var monadStateHalogenM = {
    state: function($181) {
      return HalogenM(liftF(State.create($181)));
    },
    Monad0: function() {
      return monadHalogenM;
    }
  };
  var monadEffectHalogenM = function(dictMonadEffect) {
    return {
      liftEffect: function() {
        var $186 = liftEffect(dictMonadEffect);
        return function($187) {
          return HalogenM(liftF(Lift2.create($186($187))));
        };
      }(),
      Monad0: function() {
        return monadHalogenM;
      }
    };
  };
  var monadAffHalogenM = function(dictMonadAff) {
    var monadEffectHalogenM1 = monadEffectHalogenM(dictMonadAff.MonadEffect0());
    return {
      liftAff: function() {
        var $188 = liftAff(dictMonadAff);
        return function($189) {
          return HalogenM(liftF(Lift2.create($188($189))));
        };
      }(),
      MonadEffect0: function() {
        return monadEffectHalogenM1;
      }
    };
  };
  var functorHalogenM = freeFunctor;
  var bindHalogenM = freeBind;
  var applicativeHalogenM = freeApplicative;

  // output/Halogen.Query.HalogenQ/index.js
  var Initialize = /* @__PURE__ */ function() {
    function Initialize3(value0) {
      this.value0 = value0;
    }
    ;
    Initialize3.create = function(value0) {
      return new Initialize3(value0);
    };
    return Initialize3;
  }();
  var Finalize = /* @__PURE__ */ function() {
    function Finalize2(value0) {
      this.value0 = value0;
    }
    ;
    Finalize2.create = function(value0) {
      return new Finalize2(value0);
    };
    return Finalize2;
  }();
  var Receive = /* @__PURE__ */ function() {
    function Receive2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Receive2.create = function(value0) {
      return function(value1) {
        return new Receive2(value0, value1);
      };
    };
    return Receive2;
  }();
  var Action2 = /* @__PURE__ */ function() {
    function Action3(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Action3.create = function(value0) {
      return function(value1) {
        return new Action3(value0, value1);
      };
    };
    return Action3;
  }();
  var Query = /* @__PURE__ */ function() {
    function Query2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Query2.create = function(value0) {
      return function(value1) {
        return new Query2(value0, value1);
      };
    };
    return Query2;
  }();

  // output/Halogen.VDom.Thunk/index.js
  var $runtime_lazy6 = function(name15, moduleName, init2) {
    var state3 = 0;
    var val;
    return function(lineNumber) {
      if (state3 === 2)
        return val;
      if (state3 === 1)
        throw new ReferenceError(name15 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state3 = 1;
      val = init2();
      state3 = 2;
      return val;
    };
  };
  var unsafeEqThunk = function(v, v1) {
    return refEq2(v.value0, v1.value0) && (refEq2(v.value1, v1.value1) && v.value1(v.value3, v1.value3));
  };
  var runThunk = function(v) {
    return v.value2(v.value3);
  };
  var buildThunk = function(toVDom) {
    var haltThunk = function(state3) {
      return halt(state3.vdom);
    };
    var $lazy_patchThunk = $runtime_lazy6("patchThunk", "Halogen.VDom.Thunk", function() {
      return function(state3, t2) {
        var $48 = unsafeEqThunk(state3.thunk, t2);
        if ($48) {
          return mkStep(new Step(extract2(state3.vdom), state3, $lazy_patchThunk(112), haltThunk));
        }
        ;
        var vdom = step2(state3.vdom, toVDom(runThunk(t2)));
        return mkStep(new Step(extract2(vdom), {
          vdom,
          thunk: t2
        }, $lazy_patchThunk(115), haltThunk));
      };
    });
    var patchThunk = $lazy_patchThunk(108);
    var renderThunk = function(spec) {
      return function(t) {
        var vdom = buildVDom(spec)(toVDom(runThunk(t)));
        return mkStep(new Step(extract2(vdom), {
          thunk: t,
          vdom
        }, patchThunk, haltThunk));
      };
    };
    return renderThunk;
  };

  // output/Halogen.Component/index.js
  var voidLeft2 = /* @__PURE__ */ voidLeft(functorHalogenM);
  var traverse_3 = /* @__PURE__ */ traverse_(applicativeHalogenM)(foldableMaybe);
  var map7 = /* @__PURE__ */ map(functorHalogenM);
  var pure4 = /* @__PURE__ */ pure(applicativeHalogenM);
  var ComponentSlot = /* @__PURE__ */ function() {
    function ComponentSlot2(value0) {
      this.value0 = value0;
    }
    ;
    ComponentSlot2.create = function(value0) {
      return new ComponentSlot2(value0);
    };
    return ComponentSlot2;
  }();
  var ThunkSlot = /* @__PURE__ */ function() {
    function ThunkSlot2(value0) {
      this.value0 = value0;
    }
    ;
    ThunkSlot2.create = function(value0) {
      return new ThunkSlot2(value0);
    };
    return ThunkSlot2;
  }();
  var unComponentSlot = unsafeCoerce2;
  var unComponent = unsafeCoerce2;
  var mkEval = function(args) {
    return function(v) {
      if (v instanceof Initialize) {
        return voidLeft2(traverse_3(args.handleAction)(args.initialize))(v.value0);
      }
      ;
      if (v instanceof Finalize) {
        return voidLeft2(traverse_3(args.handleAction)(args.finalize))(v.value0);
      }
      ;
      if (v instanceof Receive) {
        return voidLeft2(traverse_3(args.handleAction)(args.receive(v.value0)))(v.value1);
      }
      ;
      if (v instanceof Action2) {
        return voidLeft2(args.handleAction(v.value0))(v.value1);
      }
      ;
      if (v instanceof Query) {
        return unCoyoneda(function(g) {
          var $45 = map7(maybe(v.value1(unit))(g));
          return function($46) {
            return $45(args.handleQuery($46));
          };
        })(v.value0);
      }
      ;
      throw new Error("Failed pattern match at Halogen.Component (line 182, column 15 - line 192, column 71): " + [v.constructor.name]);
    };
  };
  var mkComponent = unsafeCoerce2;
  var defaultEval = /* @__PURE__ */ function() {
    return {
      handleAction: $$const(pure4(unit)),
      handleQuery: $$const(pure4(Nothing.value)),
      receive: $$const(Nothing.value),
      initialize: Nothing.value,
      finalize: Nothing.value
    };
  }();

  // output/Halogen.HTML.Elements/index.js
  var element2 = /* @__PURE__ */ function() {
    return element(Nothing.value);
  }();
  var h1 = /* @__PURE__ */ element2("h1");
  var h2 = /* @__PURE__ */ element2("h2");
  var h3 = /* @__PURE__ */ element2("h3");
  var h3_ = /* @__PURE__ */ h3([]);
  var h4 = /* @__PURE__ */ element2("h4");
  var h4_ = /* @__PURE__ */ h4([]);
  var h5 = /* @__PURE__ */ element2("h5");
  var table = /* @__PURE__ */ element2("table");
  var td = /* @__PURE__ */ element2("td");
  var tr = /* @__PURE__ */ element2("tr");
  var tr_ = /* @__PURE__ */ tr([]);
  var div2 = /* @__PURE__ */ element2("div");
  var button = /* @__PURE__ */ element2("button");
  var button_ = /* @__PURE__ */ button([]);
  var br = function(props) {
    return element2("br")(props)([]);
  };
  var br_ = /* @__PURE__ */ br([]);

  // output/Web.HTML.Event.EventTypes/index.js
  var domcontentloaded = "DOMContentLoaded";

  // output/Web.UIEvent.MouseEvent.EventTypes/index.js
  var click = "click";

  // output/Halogen.HTML.Events/index.js
  var mouseHandler = unsafeCoerce2;
  var handler2 = function(et) {
    return function(f) {
      return handler(et)(function(ev) {
        return new Just(new Action(f(ev)));
      });
    };
  };
  var onClick = /* @__PURE__ */ function() {
    var $15 = handler2(click);
    return function($16) {
      return $15(mouseHandler($16));
    };
  }();

  // output/Halogen.HTML.Properties/index.js
  var attr2 = /* @__PURE__ */ function() {
    return attr(Nothing.value);
  }();
  var style = /* @__PURE__ */ attr2("style");

  // output/Count.RootComponent/index.js
  var forever2 = /* @__PURE__ */ forever(monadRecAff);
  var discard2 = /* @__PURE__ */ discard(discardUnit)(bindAff);
  var liftEffect3 = /* @__PURE__ */ liftEffect(monadEffectAff);
  var greaterThanOrEq2 = /* @__PURE__ */ greaterThanOrEq(ordEN);
  var map8 = /* @__PURE__ */ map(functorArray);
  var toUnfoldable4 = /* @__PURE__ */ toUnfoldable(unfoldableArray);
  var eq3 = /* @__PURE__ */ eq(eqEN);
  var bind3 = /* @__PURE__ */ bind(bindHalogenM);
  var get2 = /* @__PURE__ */ get(monadStateHalogenM);
  var bindFlipped4 = /* @__PURE__ */ bindFlipped(bindHalogenM);
  var pure5 = /* @__PURE__ */ pure(applicativeHalogenM);
  var modify_3 = /* @__PURE__ */ modify_2(monadStateHalogenM);
  var Initialize2 = /* @__PURE__ */ function() {
    function Initialize3() {
    }
    ;
    Initialize3.value = new Initialize3();
    return Initialize3;
  }();
  var Increment = /* @__PURE__ */ function() {
    function Increment2() {
    }
    ;
    Increment2.value = new Increment2();
    return Increment2;
  }();
  var BuyIncreaser = /* @__PURE__ */ function() {
    function BuyIncreaser2(value0) {
      this.value0 = value0;
    }
    ;
    BuyIncreaser2.create = function(value0) {
      return new BuyIncreaser2(value0);
    };
    return BuyIncreaser2;
  }();
  var Tick = /* @__PURE__ */ function() {
    function Tick2() {
    }
    ;
    Tick2.value = new Tick2();
    return Tick2;
  }();
  var MaxIncreaser = /* @__PURE__ */ function() {
    function MaxIncreaser2(value0) {
      this.value0 = value0;
    }
    ;
    MaxIncreaser2.create = function(value0) {
      return new MaxIncreaser2(value0);
    };
    return MaxIncreaser2;
  }();
  var BuyTickSpeed = /* @__PURE__ */ function() {
    function BuyTickSpeed2() {
    }
    ;
    BuyTickSpeed2.value = new BuyTickSpeed2();
    return BuyTickSpeed2;
  }();
  var MaxTickSpeed = /* @__PURE__ */ function() {
    function MaxTickSpeed2() {
    }
    ;
    MaxTickSpeed2.value = new MaxTickSpeed2();
    return MaxTickSpeed2;
  }();
  var MaxAll = /* @__PURE__ */ function() {
    function MaxAll2() {
    }
    ;
    MaxAll2.value = new MaxAll2();
    return MaxAll2;
  }();
  var Debug = /* @__PURE__ */ function() {
    function Debug2(value0) {
      this.value0 = value0;
    }
    ;
    Debug2.create = function(value0) {
      return new Debug2(value0);
    };
    return Debug2;
  }();
  var timer = function(dictMonadAff) {
    var MonadEffect0 = dictMonadAff.MonadEffect0();
    var Monad0 = MonadEffect0.Monad0();
    var bind15 = bind(Monad0.Bind1());
    var liftEffect12 = liftEffect(MonadEffect0);
    var liftAff2 = liftAff(dictMonadAff);
    var pure13 = pure(Monad0.Applicative0());
    return function(tickRate) {
      return function(val) {
        return bind15(liftEffect12(create))(function(v) {
          return bind15(liftAff2(forkAff(forever2(discard2(delay(tickRate))(function() {
            return liftEffect3(notify(v.listener)(val));
          })))))(function() {
            return pure13(v.emitter);
          });
        });
      };
    };
  };
  var makeIncreaserRow = function(state3) {
    return function(v) {
      var bm = [style("display: inline-block; width: 15%; align: center")];
      return tr_([td(bm)([h3_([text(v.value1.name)])]), td(bm)([h4_([text("\xD7" + displayEN(v.value1.multiplier))])]), td(bm)([h3_([text(displayEN(floor(v.value1.owned)))])]), function() {
        var $45 = greaterThanOrEq2(state3.count)(v.value1.cost);
        if ($45) {
          return td(bm)([button([onClick(function(v1) {
            return new BuyIncreaser(v.value0);
          })])([text("Buy for " + displayEN(v.value1.cost))])]);
        }
        ;
        return td(bm)([button_([text("Can't Afford " + displayEN(v.value1.cost))])]);
      }(), td(bm)([button([onClick(function(v1) {
        return new MaxIncreaser(v.value0);
      })])([text("Buy Max")])])]);
    };
  };
  var render = function(state3) {
    var increaserRows = map8(makeIncreaserRow(state3))(toUnfoldable4(state3.increasers));
    var blockmargin = [style("display: inline-block; margin-right: 20px")];
    return div2([style("text-align: center;")])([h4(blockmargin)([text("You have")]), h1(blockmargin)([text(displayEN(state3.count))]), h4(blockmargin)([text("Count.")]), br_, h5(blockmargin)([text("You are making")]), h3(blockmargin)([text(displayEN(getCountPerSecond(state3)))]), h5(blockmargin)([text("Count per second.")]), br_, h5(blockmargin)([text("Ticks are ticking")]), h3(blockmargin)([text(displayEN(state3.tickSpeed))]), h5(blockmargin)([text(function() {
      var $48 = eq3(state3.tickSpeed)(one2);
      if ($48) {
        return "time per second.";
      }
      ;
      return "times per second.";
    }())]), br_, button([onClick(function(v) {
      return Increment.value;
    })])([text("Increment Count")]), button([onClick(function(v) {
      return MaxAll.value;
    })])([text("Max All")]), br_, h2(blockmargin)([text("Multiply Tickspeed by " + displayEN(state3.tickSpeedInc.multPerPurch))]), function() {
      var $49 = greaterThanOrEq2(state3.count)(state3.tickSpeedInc.cost);
      if ($49) {
        return button([onClick(function(v) {
          return BuyTickSpeed.value;
        })])([text("Buy for " + displayEN(state3.tickSpeedInc.cost))]);
      }
      ;
      return button_([text("Can't Afford " + displayEN(state3.tickSpeedInc.cost))]);
    }(), button([onClick(function(v) {
      return MaxTickSpeed.value;
    })])([text("Buy Max")]), br_, table([style("table-layout: fixed; width: 75%; margin-left: auto; margin-right: auto")])(increaserRows)]);
  };
  var initialState = function(v) {
    return newGlobalState;
  };
  var handleAction = function(dictMonadAff) {
    var timer1 = timer(monadAffHalogenM(dictMonadAff));
    return function(v) {
      if (v instanceof Initialize2) {
        return bind3(get2)(function(s) {
          return bind3(bindFlipped4(subscribe2)(timer1(s.settings.updateRate)(Tick.value)))(function() {
            return pure5(unit);
          });
        });
      }
      ;
      if (v instanceof Increment) {
        return modify_3(manualCount);
      }
      ;
      if (v instanceof BuyIncreaser) {
        return modify_3(buyIncreaser(v.value0));
      }
      ;
      if (v instanceof Tick) {
        return modify_3(tick);
      }
      ;
      if (v instanceof BuyTickSpeed) {
        return modify_3(buyTickSpeed);
      }
      ;
      if (v instanceof MaxIncreaser) {
        return modify_3(maxIncreaser(v.value0));
      }
      ;
      if (v instanceof MaxTickSpeed) {
        return modify_3(maxTickSpeed);
      }
      ;
      if (v instanceof MaxAll) {
        return modify_3(maxAll);
      }
      ;
      if (v instanceof Debug) {
        return modify_3(function(state3) {
          var $54 = {};
          for (var $55 in state3) {
            if ({}.hasOwnProperty.call(state3, $55)) {
              $54[$55] = state3[$55];
            }
            ;
          }
          ;
          $54.count = grahamsNumber;
          return $54;
        });
      }
      ;
      throw new Error("Failed pattern match at Count.RootComponent (line 96, column 16 - line 116, column 80): " + [v.constructor.name]);
    };
  };
  var rootComponent = function(dictMonadAff) {
    return mkComponent({
      initialState,
      render,
      "eval": mkEval({
        handleAction: handleAction(dictMonadAff),
        handleQuery: defaultEval.handleQuery,
        receive: defaultEval.receive,
        initialize: new Just(Initialize2.value),
        finalize: defaultEval.finalize
      })
    });
  };

  // output/Effect.Console/foreign.js
  var log2 = function(s) {
    return function() {
      console.log(s);
    };
  };
  var warn = function(s) {
    return function() {
      console.warn(s);
    };
  };

  // output/Web.HTML/foreign.js
  var windowImpl = function() {
    return window;
  };

  // output/Web.HTML.HTMLDocument/foreign.js
  function _readyState(doc) {
    return doc.readyState;
  }

  // output/Web.HTML.HTMLDocument.ReadyState/index.js
  var Loading = /* @__PURE__ */ function() {
    function Loading2() {
    }
    ;
    Loading2.value = new Loading2();
    return Loading2;
  }();
  var Interactive = /* @__PURE__ */ function() {
    function Interactive2() {
    }
    ;
    Interactive2.value = new Interactive2();
    return Interactive2;
  }();
  var Complete = /* @__PURE__ */ function() {
    function Complete2() {
    }
    ;
    Complete2.value = new Complete2();
    return Complete2;
  }();
  var parse = function(v) {
    if (v === "loading") {
      return new Just(Loading.value);
    }
    ;
    if (v === "interactive") {
      return new Just(Interactive.value);
    }
    ;
    if (v === "complete") {
      return new Just(Complete.value);
    }
    ;
    return Nothing.value;
  };

  // output/Web.HTML.HTMLDocument/index.js
  var map9 = /* @__PURE__ */ map(functorEffect);
  var toParentNode = unsafeCoerce2;
  var toDocument = unsafeCoerce2;
  var readyState = function(doc) {
    return map9(function() {
      var $4 = fromMaybe(Loading.value);
      return function($5) {
        return $4(parse($5));
      };
    }())(function() {
      return _readyState(doc);
    });
  };

  // output/Web.HTML.HTMLElement/foreign.js
  function _read(nothing, just, value12) {
    var tag = Object.prototype.toString.call(value12);
    if (tag.indexOf("[object HTML") === 0 && tag.indexOf("Element]") === tag.length - 8) {
      return just(value12);
    } else {
      return nothing;
    }
  }

  // output/Web.HTML.HTMLElement/index.js
  var toNode2 = unsafeCoerce2;
  var fromElement = function(x) {
    return _read(Nothing.value, Just.create, x);
  };

  // output/Web.HTML.Window/foreign.js
  function document(window2) {
    return function() {
      return window2.document;
    };
  }

  // output/Web.HTML.Window/index.js
  var toEventTarget = unsafeCoerce2;

  // output/Halogen.Aff.Util/index.js
  var bind4 = /* @__PURE__ */ bind(bindAff);
  var liftEffect4 = /* @__PURE__ */ liftEffect(monadEffectAff);
  var bindFlipped5 = /* @__PURE__ */ bindFlipped(bindEffect);
  var composeKleisliFlipped2 = /* @__PURE__ */ composeKleisliFlipped(bindEffect);
  var pure6 = /* @__PURE__ */ pure(applicativeAff);
  var bindFlipped1 = /* @__PURE__ */ bindFlipped(bindMaybe);
  var pure1 = /* @__PURE__ */ pure(applicativeEffect);
  var map10 = /* @__PURE__ */ map(functorEffect);
  var discard3 = /* @__PURE__ */ discard(discardUnit);
  var throwError2 = /* @__PURE__ */ throwError(monadThrowAff);
  var selectElement = function(query2) {
    return bind4(liftEffect4(bindFlipped5(composeKleisliFlipped2(function() {
      var $16 = querySelector(query2);
      return function($17) {
        return $16(toParentNode($17));
      };
    }())(document))(windowImpl)))(function(mel) {
      return pure6(bindFlipped1(fromElement)(mel));
    });
  };
  var runHalogenAff = /* @__PURE__ */ runAff_(/* @__PURE__ */ either(throwException)(/* @__PURE__ */ $$const(/* @__PURE__ */ pure1(unit))));
  var awaitLoad = /* @__PURE__ */ makeAff(function(callback) {
    return function __do4() {
      var rs = bindFlipped5(readyState)(bindFlipped5(document)(windowImpl))();
      if (rs instanceof Loading) {
        var et = map10(toEventTarget)(windowImpl)();
        var listener = eventListener(function(v) {
          return callback(new Right(unit));
        })();
        addEventListener2(domcontentloaded)(listener)(false)(et)();
        return effectCanceler(removeEventListener2(domcontentloaded)(listener)(false)(et));
      }
      ;
      callback(new Right(unit))();
      return nonCanceler;
    };
  });
  var awaitBody = /* @__PURE__ */ discard3(bindAff)(awaitLoad)(function() {
    return bind4(selectElement("body"))(function(body2) {
      return maybe(throwError2(error("Could not find body")))(pure6)(body2);
    });
  });

  // output/Control.Monad.Fork.Class/index.js
  var monadForkAff = {
    suspend: suspendAff,
    fork: forkAff,
    join: joinFiber,
    Monad0: function() {
      return monadAff;
    },
    Functor1: function() {
      return functorFiber;
    }
  };
  var fork = function(dict) {
    return dict.fork;
  };

  // output/Halogen.Aff.Driver.State/index.js
  var unRenderStateX = unsafeCoerce2;
  var unDriverStateX = unsafeCoerce2;
  var renderStateX_ = function(dictApplicative) {
    var traverse_7 = traverse_(dictApplicative)(foldableMaybe);
    return function(f) {
      return unDriverStateX(function(st) {
        return traverse_7(f)(st.rendering);
      });
    };
  };
  var mkRenderStateX = unsafeCoerce2;
  var renderStateX = function(dictFunctor) {
    return function(f) {
      return unDriverStateX(function(st) {
        return mkRenderStateX(f(st.rendering));
      });
    };
  };
  var mkDriverStateXRef = unsafeCoerce2;
  var mapDriverState = function(f) {
    return function(v) {
      return f(v);
    };
  };
  var initDriverState = function(component) {
    return function(input3) {
      return function(handler3) {
        return function(lchs) {
          return function __do4() {
            var selfRef = $$new({})();
            var childrenIn = $$new(empty3)();
            var childrenOut = $$new(empty3)();
            var handlerRef = $$new(handler3)();
            var pendingQueries = $$new(new Just(Nil.value))();
            var pendingOuts = $$new(new Just(Nil.value))();
            var pendingHandlers = $$new(Nothing.value)();
            var fresh2 = $$new(1)();
            var subscriptions = $$new(new Just(empty2))();
            var forks = $$new(empty2)();
            var ds = {
              component,
              state: component.initialState(input3),
              refs: empty2,
              children: empty3,
              childrenIn,
              childrenOut,
              selfRef,
              handlerRef,
              pendingQueries,
              pendingOuts,
              pendingHandlers,
              rendering: Nothing.value,
              fresh: fresh2,
              subscriptions,
              forks,
              lifecycleHandlers: lchs
            };
            write(ds)(selfRef)();
            return mkDriverStateXRef(selfRef);
          };
        };
      };
    };
  };

  // output/Halogen.Aff.Driver.Eval/index.js
  var traverse_4 = /* @__PURE__ */ traverse_(applicativeEffect)(foldableMaybe);
  var bindFlipped6 = /* @__PURE__ */ bindFlipped(bindMaybe);
  var lookup5 = /* @__PURE__ */ lookup(ordSubscriptionId);
  var bind12 = /* @__PURE__ */ bind(bindAff);
  var liftEffect5 = /* @__PURE__ */ liftEffect(monadEffectAff);
  var discard4 = /* @__PURE__ */ discard(discardUnit);
  var discard1 = /* @__PURE__ */ discard4(bindAff);
  var traverse_12 = /* @__PURE__ */ traverse_(applicativeAff);
  var traverse_22 = /* @__PURE__ */ traverse_12(foldableList);
  var fork3 = /* @__PURE__ */ fork(monadForkAff);
  var parSequence_2 = /* @__PURE__ */ parSequence_(parallelAff)(foldableList);
  var pure7 = /* @__PURE__ */ pure(applicativeAff);
  var map13 = /* @__PURE__ */ map(functorCoyoneda);
  var parallel2 = /* @__PURE__ */ parallel(parallelAff);
  var map14 = /* @__PURE__ */ map(functorAff);
  var sequential2 = /* @__PURE__ */ sequential(parallelAff);
  var map22 = /* @__PURE__ */ map(functorMaybe);
  var insert4 = /* @__PURE__ */ insert(ordSubscriptionId);
  var retractFreeAp2 = /* @__PURE__ */ retractFreeAp(applicativeParAff);
  var $$delete2 = /* @__PURE__ */ $$delete(ordForkId);
  var unlessM2 = /* @__PURE__ */ unlessM(monadEffect);
  var insert1 = /* @__PURE__ */ insert(ordForkId);
  var traverse_32 = /* @__PURE__ */ traverse_12(foldableMaybe);
  var lookup1 = /* @__PURE__ */ lookup(ordForkId);
  var lookup22 = /* @__PURE__ */ lookup(ordString);
  var foldFree2 = /* @__PURE__ */ foldFree(monadRecAff);
  var alter2 = /* @__PURE__ */ alter(ordString);
  var unsubscribe3 = function(sid) {
    return function(ref2) {
      return function __do4() {
        var v = read(ref2)();
        var subs = read(v.subscriptions)();
        return traverse_4(unsubscribe)(bindFlipped6(lookup5(sid))(subs))();
      };
    };
  };
  var queueOrRun = function(ref2) {
    return function(au) {
      return bind12(liftEffect5(read(ref2)))(function(v) {
        if (v instanceof Nothing) {
          return au;
        }
        ;
        if (v instanceof Just) {
          return liftEffect5(write(new Just(new Cons(au, v.value0)))(ref2));
        }
        ;
        throw new Error("Failed pattern match at Halogen.Aff.Driver.Eval (line 188, column 33 - line 190, column 57): " + [v.constructor.name]);
      });
    };
  };
  var handleLifecycle = function(lchs) {
    return function(f) {
      return discard1(liftEffect5(write({
        initializers: Nil.value,
        finalizers: Nil.value
      })(lchs)))(function() {
        return bind12(liftEffect5(f))(function(result) {
          return bind12(liftEffect5(read(lchs)))(function(v) {
            return discard1(traverse_22(fork3)(v.finalizers))(function() {
              return discard1(parSequence_2(v.initializers))(function() {
                return pure7(result);
              });
            });
          });
        });
      });
    };
  };
  var handleAff = /* @__PURE__ */ runAff_(/* @__PURE__ */ either(throwException)(/* @__PURE__ */ $$const(/* @__PURE__ */ pure(applicativeEffect)(unit))));
  var fresh = function(f) {
    return function(ref2) {
      return bind12(liftEffect5(read(ref2)))(function(v) {
        return liftEffect5(modify$prime(function(i2) {
          return {
            state: i2 + 1 | 0,
            value: f(i2)
          };
        })(v.fresh));
      });
    };
  };
  var evalQ = function(render2) {
    return function(ref2) {
      return function(q2) {
        return bind12(liftEffect5(read(ref2)))(function(v) {
          return evalM(render2)(ref2)(v["component"]["eval"](new Query(map13(Just.create)(liftCoyoneda(q2)), $$const(Nothing.value))));
        });
      };
    };
  };
  var evalM = function(render2) {
    return function(initRef) {
      return function(v) {
        var evalChildQuery = function(ref2) {
          return function(cqb) {
            return bind12(liftEffect5(read(ref2)))(function(v1) {
              return unChildQueryBox(function(v2) {
                var evalChild = function(v3) {
                  return parallel2(bind12(liftEffect5(read(v3)))(function(dsx) {
                    return unDriverStateX(function(ds) {
                      return evalQ(render2)(ds.selfRef)(v2.value1);
                    })(dsx);
                  }));
                };
                return map14(v2.value2)(sequential2(v2.value0(applicativeParAff)(evalChild)(v1.children)));
              })(cqb);
            });
          };
        };
        var go2 = function(ref2) {
          return function(v1) {
            if (v1 instanceof State) {
              return bind12(liftEffect5(read(ref2)))(function(v2) {
                var v3 = v1.value0(v2.state);
                if (unsafeRefEq(v2.state)(v3.value1)) {
                  return pure7(v3.value0);
                }
                ;
                if (otherwise) {
                  return discard1(liftEffect5(write({
                    component: v2.component,
                    state: v3.value1,
                    refs: v2.refs,
                    children: v2.children,
                    childrenIn: v2.childrenIn,
                    childrenOut: v2.childrenOut,
                    selfRef: v2.selfRef,
                    handlerRef: v2.handlerRef,
                    pendingQueries: v2.pendingQueries,
                    pendingOuts: v2.pendingOuts,
                    pendingHandlers: v2.pendingHandlers,
                    rendering: v2.rendering,
                    fresh: v2.fresh,
                    subscriptions: v2.subscriptions,
                    forks: v2.forks,
                    lifecycleHandlers: v2.lifecycleHandlers
                  })(ref2)))(function() {
                    return discard1(handleLifecycle(v2.lifecycleHandlers)(render2(v2.lifecycleHandlers)(ref2)))(function() {
                      return pure7(v3.value0);
                    });
                  });
                }
                ;
                throw new Error("Failed pattern match at Halogen.Aff.Driver.Eval (line 86, column 7 - line 92, column 21): " + [v3.constructor.name]);
              });
            }
            ;
            if (v1 instanceof Subscribe) {
              return bind12(fresh(SubscriptionId)(ref2))(function(sid) {
                return bind12(liftEffect5(subscribe(v1.value0(sid))(function(act) {
                  return handleAff(evalF(render2)(ref2)(new Action(act)));
                })))(function(finalize) {
                  return bind12(liftEffect5(read(ref2)))(function(v2) {
                    return discard1(liftEffect5(modify_(map22(insert4(sid)(finalize)))(v2.subscriptions)))(function() {
                      return pure7(v1.value1(sid));
                    });
                  });
                });
              });
            }
            ;
            if (v1 instanceof Unsubscribe) {
              return discard1(liftEffect5(unsubscribe3(v1.value0)(ref2)))(function() {
                return pure7(v1.value1);
              });
            }
            ;
            if (v1 instanceof Lift2) {
              return v1.value0;
            }
            ;
            if (v1 instanceof ChildQuery2) {
              return evalChildQuery(ref2)(v1.value0);
            }
            ;
            if (v1 instanceof Raise) {
              return bind12(liftEffect5(read(ref2)))(function(v2) {
                return bind12(liftEffect5(read(v2.handlerRef)))(function(handler3) {
                  return discard1(queueOrRun(v2.pendingOuts)(handler3(v1.value0)))(function() {
                    return pure7(v1.value1);
                  });
                });
              });
            }
            ;
            if (v1 instanceof Par) {
              return sequential2(retractFreeAp2(hoistFreeAp(function() {
                var $118 = evalM(render2)(ref2);
                return function($119) {
                  return parallel2($118($119));
                };
              }())(v1.value0)));
            }
            ;
            if (v1 instanceof Fork) {
              return bind12(fresh(ForkId)(ref2))(function(fid) {
                return bind12(liftEffect5(read(ref2)))(function(v2) {
                  return bind12(liftEffect5($$new(false)))(function(doneRef) {
                    return bind12(fork3($$finally(liftEffect5(function __do4() {
                      modify_($$delete2(fid))(v2.forks)();
                      return write(true)(doneRef)();
                    }))(evalM(render2)(ref2)(v1.value0))))(function(fiber) {
                      return discard1(liftEffect5(unlessM2(read(doneRef))(modify_(insert1(fid)(fiber))(v2.forks))))(function() {
                        return pure7(v1.value1(fid));
                      });
                    });
                  });
                });
              });
            }
            ;
            if (v1 instanceof Join) {
              return bind12(liftEffect5(read(ref2)))(function(v2) {
                return bind12(liftEffect5(read(v2.forks)))(function(forkMap) {
                  return discard1(traverse_32(joinFiber)(lookup1(v1.value0)(forkMap)))(function() {
                    return pure7(v1.value1);
                  });
                });
              });
            }
            ;
            if (v1 instanceof Kill) {
              return bind12(liftEffect5(read(ref2)))(function(v2) {
                return bind12(liftEffect5(read(v2.forks)))(function(forkMap) {
                  return discard1(traverse_32(killFiber(error("Cancelled")))(lookup1(v1.value0)(forkMap)))(function() {
                    return pure7(v1.value1);
                  });
                });
              });
            }
            ;
            if (v1 instanceof GetRef) {
              return bind12(liftEffect5(read(ref2)))(function(v2) {
                return pure7(v1.value1(lookup22(v1.value0)(v2.refs)));
              });
            }
            ;
            throw new Error("Failed pattern match at Halogen.Aff.Driver.Eval (line 83, column 12 - line 139, column 33): " + [v1.constructor.name]);
          };
        };
        return foldFree2(go2(initRef))(v);
      };
    };
  };
  var evalF = function(render2) {
    return function(ref2) {
      return function(v) {
        if (v instanceof RefUpdate) {
          return liftEffect5(flip(modify_)(ref2)(mapDriverState(function(st) {
            return {
              component: st.component,
              state: st.state,
              refs: alter2($$const(v.value1))(v.value0)(st.refs),
              children: st.children,
              childrenIn: st.childrenIn,
              childrenOut: st.childrenOut,
              selfRef: st.selfRef,
              handlerRef: st.handlerRef,
              pendingQueries: st.pendingQueries,
              pendingOuts: st.pendingOuts,
              pendingHandlers: st.pendingHandlers,
              rendering: st.rendering,
              fresh: st.fresh,
              subscriptions: st.subscriptions,
              forks: st.forks,
              lifecycleHandlers: st.lifecycleHandlers
            };
          })));
        }
        ;
        if (v instanceof Action) {
          return bind12(liftEffect5(read(ref2)))(function(v1) {
            return evalM(render2)(ref2)(v1["component"]["eval"](new Action2(v.value0, unit)));
          });
        }
        ;
        throw new Error("Failed pattern match at Halogen.Aff.Driver.Eval (line 52, column 20 - line 58, column 62): " + [v.constructor.name]);
      };
    };
  };

  // output/Halogen.Aff.Driver/index.js
  var bind5 = /* @__PURE__ */ bind(bindEffect);
  var discard5 = /* @__PURE__ */ discard(discardUnit);
  var for_2 = /* @__PURE__ */ for_(applicativeEffect)(foldableMaybe);
  var traverse_5 = /* @__PURE__ */ traverse_(applicativeAff)(foldableList);
  var fork4 = /* @__PURE__ */ fork(monadForkAff);
  var bindFlipped7 = /* @__PURE__ */ bindFlipped(bindEffect);
  var traverse_13 = /* @__PURE__ */ traverse_(applicativeEffect);
  var traverse_23 = /* @__PURE__ */ traverse_13(foldableMaybe);
  var traverse_33 = /* @__PURE__ */ traverse_13(foldableMap);
  var discard22 = /* @__PURE__ */ discard5(bindAff);
  var parSequence_3 = /* @__PURE__ */ parSequence_(parallelAff)(foldableList);
  var liftEffect6 = /* @__PURE__ */ liftEffect(monadEffectAff);
  var pure8 = /* @__PURE__ */ pure(applicativeEffect);
  var map15 = /* @__PURE__ */ map(functorEffect);
  var pure12 = /* @__PURE__ */ pure(applicativeAff);
  var when2 = /* @__PURE__ */ when(applicativeEffect);
  var renderStateX2 = /* @__PURE__ */ renderStateX(functorEffect);
  var $$void5 = /* @__PURE__ */ $$void(functorAff);
  var foreachSlot2 = /* @__PURE__ */ foreachSlot(applicativeEffect);
  var renderStateX_2 = /* @__PURE__ */ renderStateX_(applicativeEffect);
  var tailRecM3 = /* @__PURE__ */ tailRecM(monadRecEffect);
  var voidLeft3 = /* @__PURE__ */ voidLeft(functorEffect);
  var bind13 = /* @__PURE__ */ bind(bindAff);
  var liftEffect1 = /* @__PURE__ */ liftEffect(monadEffectEffect);
  var newLifecycleHandlers = /* @__PURE__ */ function() {
    return $$new({
      initializers: Nil.value,
      finalizers: Nil.value
    });
  }();
  var handlePending = function(ref2) {
    return function __do4() {
      var queue = read(ref2)();
      write(Nothing.value)(ref2)();
      return for_2(queue)(function() {
        var $58 = traverse_5(fork4);
        return function($59) {
          return handleAff($58(reverse($59)));
        };
      }())();
    };
  };
  var cleanupSubscriptionsAndForks = function(v) {
    return function __do4() {
      bindFlipped7(traverse_23(traverse_33(unsubscribe)))(read(v.subscriptions))();
      write(Nothing.value)(v.subscriptions)();
      bindFlipped7(traverse_33(function() {
        var $60 = killFiber(error("finalized"));
        return function($61) {
          return handleAff($60($61));
        };
      }()))(read(v.forks))();
      return write(empty2)(v.forks)();
    };
  };
  var runUI = function(renderSpec2) {
    return function(component) {
      return function(i2) {
        var squashChildInitializers = function(lchs) {
          return function(preInits) {
            return unDriverStateX(function(st) {
              var parentInitializer = evalM(render2)(st.selfRef)(st["component"]["eval"](new Initialize(unit)));
              return modify_(function(handlers) {
                return {
                  initializers: new Cons(discard22(parSequence_3(reverse(handlers.initializers)))(function() {
                    return discard22(parentInitializer)(function() {
                      return liftEffect6(function __do4() {
                        handlePending(st.pendingQueries)();
                        return handlePending(st.pendingOuts)();
                      });
                    });
                  }), preInits),
                  finalizers: handlers.finalizers
                };
              })(lchs);
            });
          };
        };
        var runComponent = function(lchs) {
          return function(handler3) {
            return function(j) {
              return unComponent(function(c) {
                return function __do4() {
                  var lchs$prime = newLifecycleHandlers();
                  var $$var2 = initDriverState(c)(j)(handler3)(lchs$prime)();
                  var pre2 = read(lchs)();
                  write({
                    initializers: Nil.value,
                    finalizers: pre2.finalizers
                  })(lchs)();
                  bindFlipped7(unDriverStateX(function() {
                    var $62 = render2(lchs);
                    return function($63) {
                      return $62(function(v) {
                        return v.selfRef;
                      }($63));
                    };
                  }()))(read($$var2))();
                  bindFlipped7(squashChildInitializers(lchs)(pre2.initializers))(read($$var2))();
                  return $$var2;
                };
              });
            };
          };
        };
        var renderChild = function(lchs) {
          return function(handler3) {
            return function(childrenInRef) {
              return function(childrenOutRef) {
                return unComponentSlot(function(slot) {
                  return function __do4() {
                    var childrenIn = map15(slot.pop)(read(childrenInRef))();
                    var $$var2 = function() {
                      if (childrenIn instanceof Just) {
                        write(childrenIn.value0.value1)(childrenInRef)();
                        var dsx = read(childrenIn.value0.value0)();
                        unDriverStateX(function(st) {
                          return function __do5() {
                            flip(write)(st.handlerRef)(function() {
                              var $64 = maybe(pure12(unit))(handler3);
                              return function($65) {
                                return $64(slot.output($65));
                              };
                            }())();
                            return handleAff(evalM(render2)(st.selfRef)(st["component"]["eval"](new Receive(slot.input, unit))))();
                          };
                        })(dsx)();
                        return childrenIn.value0.value0;
                      }
                      ;
                      if (childrenIn instanceof Nothing) {
                        return runComponent(lchs)(function() {
                          var $66 = maybe(pure12(unit))(handler3);
                          return function($67) {
                            return $66(slot.output($67));
                          };
                        }())(slot.input)(slot.component)();
                      }
                      ;
                      throw new Error("Failed pattern match at Halogen.Aff.Driver (line 213, column 14 - line 222, column 98): " + [childrenIn.constructor.name]);
                    }();
                    var isDuplicate = map15(function($68) {
                      return isJust(slot.get($68));
                    })(read(childrenOutRef))();
                    when2(isDuplicate)(warn("Halogen: Duplicate slot address was detected during rendering, unexpected results may occur"))();
                    modify_(slot.set($$var2))(childrenOutRef)();
                    return bind5(read($$var2))(renderStateX2(function(v) {
                      if (v instanceof Nothing) {
                        return $$throw("Halogen internal error: child was not initialized in renderChild");
                      }
                      ;
                      if (v instanceof Just) {
                        return pure8(renderSpec2.renderChild(v.value0));
                      }
                      ;
                      throw new Error("Failed pattern match at Halogen.Aff.Driver (line 227, column 37 - line 229, column 50): " + [v.constructor.name]);
                    }))();
                  };
                });
              };
            };
          };
        };
        var render2 = function(lchs) {
          return function($$var2) {
            return function __do4() {
              var v = read($$var2)();
              var shouldProcessHandlers = map15(isNothing)(read(v.pendingHandlers))();
              when2(shouldProcessHandlers)(write(new Just(Nil.value))(v.pendingHandlers))();
              write(empty3)(v.childrenOut)();
              write(v.children)(v.childrenIn)();
              var handler3 = function() {
                var $69 = queueOrRun(v.pendingHandlers);
                var $70 = evalF(render2)(v.selfRef);
                return function($71) {
                  return $69($$void5($70($71)));
                };
              }();
              var childHandler = function() {
                var $72 = queueOrRun(v.pendingQueries);
                return function($73) {
                  return $72(handler3(Action.create($73)));
                };
              }();
              var rendering = renderSpec2.render(function($74) {
                return handleAff(handler3($74));
              })(renderChild(lchs)(childHandler)(v.childrenIn)(v.childrenOut))(v.component.render(v.state))(v.rendering)();
              var children2 = read(v.childrenOut)();
              var childrenIn = read(v.childrenIn)();
              foreachSlot2(childrenIn)(function(v1) {
                return function __do5() {
                  var childDS = read(v1)();
                  renderStateX_2(renderSpec2.removeChild)(childDS)();
                  return finalize(lchs)(childDS)();
                };
              })();
              flip(modify_)(v.selfRef)(mapDriverState(function(ds$prime) {
                return {
                  component: ds$prime.component,
                  state: ds$prime.state,
                  refs: ds$prime.refs,
                  children: children2,
                  childrenIn: ds$prime.childrenIn,
                  childrenOut: ds$prime.childrenOut,
                  selfRef: ds$prime.selfRef,
                  handlerRef: ds$prime.handlerRef,
                  pendingQueries: ds$prime.pendingQueries,
                  pendingOuts: ds$prime.pendingOuts,
                  pendingHandlers: ds$prime.pendingHandlers,
                  rendering: new Just(rendering),
                  fresh: ds$prime.fresh,
                  subscriptions: ds$prime.subscriptions,
                  forks: ds$prime.forks,
                  lifecycleHandlers: ds$prime.lifecycleHandlers
                };
              }))();
              return when2(shouldProcessHandlers)(flip(tailRecM3)(unit)(function(v1) {
                return function __do5() {
                  var handlers = read(v.pendingHandlers)();
                  write(new Just(Nil.value))(v.pendingHandlers)();
                  traverse_23(function() {
                    var $75 = traverse_5(fork4);
                    return function($76) {
                      return handleAff($75(reverse($76)));
                    };
                  }())(handlers)();
                  var mmore = read(v.pendingHandlers)();
                  var $51 = maybe(false)($$null)(mmore);
                  if ($51) {
                    return voidLeft3(write(Nothing.value)(v.pendingHandlers))(new Done(unit))();
                  }
                  ;
                  return new Loop(unit);
                };
              }))();
            };
          };
        };
        var finalize = function(lchs) {
          return unDriverStateX(function(st) {
            return function __do4() {
              cleanupSubscriptionsAndForks(st)();
              var f = evalM(render2)(st.selfRef)(st["component"]["eval"](new Finalize(unit)));
              modify_(function(handlers) {
                return {
                  initializers: handlers.initializers,
                  finalizers: new Cons(f, handlers.finalizers)
                };
              })(lchs)();
              return foreachSlot2(st.children)(function(v) {
                return function __do5() {
                  var dsx = read(v)();
                  return finalize(lchs)(dsx)();
                };
              })();
            };
          });
        };
        var evalDriver = function(disposed) {
          return function(ref2) {
            return function(q2) {
              return bind13(liftEffect6(read(disposed)))(function(v) {
                if (v) {
                  return pure12(Nothing.value);
                }
                ;
                return evalQ(render2)(ref2)(q2);
              });
            };
          };
        };
        var dispose = function(disposed) {
          return function(lchs) {
            return function(dsx) {
              return handleLifecycle(lchs)(function __do4() {
                var v = read(disposed)();
                if (v) {
                  return unit;
                }
                ;
                write(true)(disposed)();
                finalize(lchs)(dsx)();
                return unDriverStateX(function(v1) {
                  return function __do5() {
                    var v2 = liftEffect1(read(v1.selfRef))();
                    return for_2(v2.rendering)(renderSpec2.dispose)();
                  };
                })(dsx)();
              });
            };
          };
        };
        return bind13(liftEffect6(newLifecycleHandlers))(function(lchs) {
          return bind13(liftEffect6($$new(false)))(function(disposed) {
            return handleLifecycle(lchs)(function __do4() {
              var sio = create();
              var dsx = bindFlipped7(read)(runComponent(lchs)(function() {
                var $77 = notify(sio.listener);
                return function($78) {
                  return liftEffect6($77($78));
                };
              }())(i2)(component))();
              return unDriverStateX(function(st) {
                return pure8({
                  query: evalDriver(disposed)(st.selfRef),
                  messages: sio.emitter,
                  dispose: dispose(disposed)(lchs)(dsx)
                });
              })(dsx)();
            });
          });
        });
      };
    };
  };

  // output/Web.DOM.Node/foreign.js
  var getEffProp2 = function(name15) {
    return function(node) {
      return function() {
        return node[name15];
      };
    };
  };
  var baseURI = getEffProp2("baseURI");
  var _ownerDocument = getEffProp2("ownerDocument");
  var _parentNode = getEffProp2("parentNode");
  var _parentElement = getEffProp2("parentElement");
  var childNodes = getEffProp2("childNodes");
  var _firstChild = getEffProp2("firstChild");
  var _lastChild = getEffProp2("lastChild");
  var _previousSibling = getEffProp2("previousSibling");
  var _nextSibling = getEffProp2("nextSibling");
  var _nodeValue = getEffProp2("nodeValue");
  var textContent = getEffProp2("textContent");
  function insertBefore(node1) {
    return function(node2) {
      return function(parent2) {
        return function() {
          parent2.insertBefore(node1, node2);
        };
      };
    };
  }
  function appendChild(node) {
    return function(parent2) {
      return function() {
        parent2.appendChild(node);
      };
    };
  }
  function removeChild2(node) {
    return function(parent2) {
      return function() {
        parent2.removeChild(node);
      };
    };
  }

  // output/Web.DOM.Node/index.js
  var map16 = /* @__PURE__ */ map(functorEffect);
  var parentNode2 = /* @__PURE__ */ function() {
    var $6 = map16(toMaybe);
    return function($7) {
      return $6(_parentNode($7));
    };
  }();
  var nextSibling = /* @__PURE__ */ function() {
    var $15 = map16(toMaybe);
    return function($16) {
      return $15(_nextSibling($16));
    };
  }();

  // output/Halogen.VDom.Driver/index.js
  var $runtime_lazy7 = function(name15, moduleName, init2) {
    var state3 = 0;
    var val;
    return function(lineNumber) {
      if (state3 === 2)
        return val;
      if (state3 === 1)
        throw new ReferenceError(name15 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state3 = 1;
      val = init2();
      state3 = 2;
      return val;
    };
  };
  var $$void6 = /* @__PURE__ */ $$void(functorEffect);
  var pure9 = /* @__PURE__ */ pure(applicativeEffect);
  var traverse_6 = /* @__PURE__ */ traverse_(applicativeEffect)(foldableMaybe);
  var unwrap2 = /* @__PURE__ */ unwrap();
  var when3 = /* @__PURE__ */ when(applicativeEffect);
  var not2 = /* @__PURE__ */ not(/* @__PURE__ */ heytingAlgebraFunction(/* @__PURE__ */ heytingAlgebraFunction(heytingAlgebraBoolean)));
  var identity7 = /* @__PURE__ */ identity(categoryFn);
  var bind14 = /* @__PURE__ */ bind(bindAff);
  var liftEffect7 = /* @__PURE__ */ liftEffect(monadEffectAff);
  var map17 = /* @__PURE__ */ map(functorEffect);
  var bindFlipped8 = /* @__PURE__ */ bindFlipped(bindEffect);
  var substInParent = function(v) {
    return function(v1) {
      return function(v2) {
        if (v1 instanceof Just && v2 instanceof Just) {
          return $$void6(insertBefore(v)(v1.value0)(v2.value0));
        }
        ;
        if (v1 instanceof Nothing && v2 instanceof Just) {
          return $$void6(appendChild(v)(v2.value0));
        }
        ;
        return pure9(unit);
      };
    };
  };
  var removeChild3 = function(v) {
    return function __do4() {
      var npn = parentNode2(v.node)();
      return traverse_6(function(pn) {
        return removeChild2(v.node)(pn);
      })(npn)();
    };
  };
  var mkSpec = function(handler3) {
    return function(renderChildRef) {
      return function(document2) {
        var getNode = unRenderStateX(function(v) {
          return v.node;
        });
        var done = function(st) {
          if (st instanceof Just) {
            return halt(st.value0);
          }
          ;
          return unit;
        };
        var buildWidget2 = function(spec) {
          var buildThunk2 = buildThunk(unwrap2)(spec);
          var $lazy_patch = $runtime_lazy7("patch", "Halogen.VDom.Driver", function() {
            return function(st, slot) {
              if (st instanceof Just) {
                if (slot instanceof ComponentSlot) {
                  halt(st.value0);
                  return $lazy_renderComponentSlot(100)(slot.value0);
                }
                ;
                if (slot instanceof ThunkSlot) {
                  var step$prime = step2(st.value0, slot.value0);
                  return mkStep(new Step(extract2(step$prime), new Just(step$prime), $lazy_patch(103), done));
                }
                ;
                throw new Error("Failed pattern match at Halogen.VDom.Driver (line 97, column 22 - line 103, column 79): " + [slot.constructor.name]);
              }
              ;
              return $lazy_render(104)(slot);
            };
          });
          var $lazy_render = $runtime_lazy7("render", "Halogen.VDom.Driver", function() {
            return function(slot) {
              if (slot instanceof ComponentSlot) {
                return $lazy_renderComponentSlot(86)(slot.value0);
              }
              ;
              if (slot instanceof ThunkSlot) {
                var step4 = buildThunk2(slot.value0);
                return mkStep(new Step(extract2(step4), new Just(step4), $lazy_patch(89), done));
              }
              ;
              throw new Error("Failed pattern match at Halogen.VDom.Driver (line 84, column 7 - line 89, column 75): " + [slot.constructor.name]);
            };
          });
          var $lazy_renderComponentSlot = $runtime_lazy7("renderComponentSlot", "Halogen.VDom.Driver", function() {
            return function(cs) {
              var renderChild = read(renderChildRef)();
              var rsx = renderChild(cs)();
              var node = getNode(rsx);
              return mkStep(new Step(node, Nothing.value, $lazy_patch(117), done));
            };
          });
          var patch = $lazy_patch(91);
          var render2 = $lazy_render(82);
          var renderComponentSlot = $lazy_renderComponentSlot(109);
          return render2;
        };
        var buildAttributes = buildProp(handler3);
        return {
          buildWidget: buildWidget2,
          buildAttributes,
          document: document2
        };
      };
    };
  };
  var renderSpec = function(document2) {
    return function(container) {
      var render2 = function(handler3) {
        return function(child) {
          return function(v) {
            return function(v1) {
              if (v1 instanceof Nothing) {
                return function __do4() {
                  var renderChildRef = $$new(child)();
                  var spec = mkSpec(handler3)(renderChildRef)(document2);
                  var machine = buildVDom(spec)(v);
                  var node = extract2(machine);
                  $$void6(appendChild(node)(toNode2(container)))();
                  return {
                    machine,
                    node,
                    renderChildRef
                  };
                };
              }
              ;
              if (v1 instanceof Just) {
                return function __do4() {
                  write(child)(v1.value0.renderChildRef)();
                  var parent2 = parentNode2(v1.value0.node)();
                  var nextSib = nextSibling(v1.value0.node)();
                  var machine$prime = step2(v1.value0.machine, v);
                  var newNode = extract2(machine$prime);
                  when3(not2(unsafeRefEq)(v1.value0.node)(newNode))(substInParent(newNode)(nextSib)(parent2))();
                  return {
                    machine: machine$prime,
                    node: newNode,
                    renderChildRef: v1.value0.renderChildRef
                  };
                };
              }
              ;
              throw new Error("Failed pattern match at Halogen.VDom.Driver (line 157, column 5 - line 173, column 80): " + [v1.constructor.name]);
            };
          };
        };
      };
      return {
        render: render2,
        renderChild: identity7,
        removeChild: removeChild3,
        dispose: removeChild3
      };
    };
  };
  var runUI2 = function(component) {
    return function(i2) {
      return function(element3) {
        return bind14(liftEffect7(map17(toDocument)(bindFlipped8(document)(windowImpl))))(function(document2) {
          return runUI(renderSpec(document2)(element3))(component)(i2);
        });
      };
    };
  };

  // output/Utils.AppRunner/index.js
  var bind6 = /* @__PURE__ */ bind(bindAff);
  var runApp = function(rootComponent3) {
    return runHalogenAff(bind6(awaitBody)(function(body2) {
      return runUI2(rootComponent3)(unit)(body2);
    }));
  };

  // output/Count/index.js
  var show3 = /* @__PURE__ */ show(showEN);
  var add3 = /* @__PURE__ */ add(semiringEN);
  var show1 = /* @__PURE__ */ show(showString);
  var rootComponent2 = /* @__PURE__ */ rootComponent(monadAffAff);
  var test = function __do2() {
    log2(show3(grahamsNumber))();
    log2(show3(tetr(grahamsNumber)(mkEN("3"))))();
    log2(show3(tetr(mkEN("3"))(mkEN("4"))))();
    log2(show3(add3(mkEN("2"))(mkEN("2"))))();
    return log2(show1(toStringWithDecimalPlaces(mkEN("1283192831293819831928"))(3)(true)))();
  };
  var main2 = function __do3() {
    test();
    return runApp(rootComponent2)();
  };

  // <stdin>
  main2();
})();
