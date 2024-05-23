(() => {
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

  // output/Data.Unit/foreign.js
  var unit = void 0;

  // output/Data.Functor/index.js
  var map = function(dict) {
    return dict.map;
  };
  var mapFlipped = function(dictFunctor) {
    var map111 = map(dictFunctor);
    return function(fa) {
      return function(f) {
        return map111(f)(fa);
      };
    };
  };
  var $$void = function(dictFunctor) {
    return map(dictFunctor)($$const(unit));
  };
  var functorArray = {
    map: arrayMap
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
  var applyFirst = function(dictApply) {
    var apply1 = apply(dictApply);
    var map20 = map(dictApply.Functor0());
    return function(a) {
      return function(b) {
        return apply1(map20($$const)(a))(b);
      };
    };
  };

  // output/Control.Applicative/index.js
  var pure = function(dict) {
    return dict.pure;
  };
  var when = function(dictApplicative) {
    var pure12 = pure(dictApplicative);
    return function(v) {
      return function(v1) {
        if (v) {
          return v1;
        }
        ;
        if (!v) {
          return pure12(unit);
        }
        ;
        throw new Error("Failed pattern match at Control.Applicative (line 63, column 1 - line 63, column 63): " + [v.constructor.name, v1.constructor.name]);
      };
    };
  };
  var liftA1 = function(dictApplicative) {
    var apply2 = apply(dictApplicative.Apply0());
    var pure12 = pure(dictApplicative);
    return function(f) {
      return function(a) {
        return apply2(pure12(f))(a);
      };
    };
  };

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
  var bindFlipped = function(dictBind) {
    return flip(bind(dictBind));
  };
  var composeKleisliFlipped = function(dictBind) {
    var bindFlipped1 = bindFlipped(dictBind);
    return function(f) {
      return function(g) {
        return function(a) {
          return bindFlipped1(f)(g(a));
        };
      };
    };
  };

  // output/Data.Argonaut.Core/foreign.js
  function stringify(j) {
    return JSON.stringify(j);
  }
  function _caseJson(isNull4, isBool, isNum, isStr, isArr, isObj, j) {
    if (j == null) return isNull4();
    else if (typeof j === "boolean") return isBool(j);
    else if (typeof j === "number") return isNum(j);
    else if (typeof j === "string") return isStr(j);
    else if (Object.prototype.toString.call(j) === "[object Array]")
      return isArr(j);
    else return isObj(j);
  }

  // output/Data.Eq/foreign.js
  var refEq = function(r1) {
    return function(r2) {
      return r1 === r2;
    };
  };
  var eqBooleanImpl = refEq;
  var eqIntImpl = refEq;
  var eqNumberImpl = refEq;
  var eqCharImpl = refEq;
  var eqStringImpl = refEq;

  // output/Data.Eq/index.js
  var eqString = {
    eq: eqStringImpl
  };
  var eqNumber = {
    eq: eqNumberImpl
  };
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
  var eq2 = /* @__PURE__ */ eq(eqBoolean);
  var notEq = function(dictEq) {
    var eq32 = eq(dictEq);
    return function(x) {
      return function(y) {
        return eq2(eq32(x)(y))(false);
      };
    };
  };

  // output/Data.Semigroup/foreign.js
  var concatString = function(s1) {
    return function(s2) {
      return s1 + s2;
    };
  };
  var concatArray = function(xs) {
    return function(ys) {
      if (xs.length === 0) return ys;
      if (ys.length === 0) return xs;
      return xs.concat(ys);
    };
  };

  // output/Data.Semigroup/index.js
  var semigroupString = {
    append: concatString
  };
  var semigroupArray = {
    append: concatArray
  };
  var append = function(dict) {
    return dict.append;
  };

  // output/Control.Alt/index.js
  var alt = function(dict) {
    return dict.alt;
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
    return function(eq5) {
      return function(gt) {
        return function(x) {
          return function(y) {
            return x < y ? lt : x === y ? eq5 : gt;
          };
        };
      };
    };
  };
  var ordIntImpl = unsafeCompareImpl;
  var ordNumberImpl = unsafeCompareImpl;
  var ordStringImpl = unsafeCompareImpl;
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
  var eqOrdering = {
    eq: function(v) {
      return function(v1) {
        if (v instanceof LT && v1 instanceof LT) {
          return true;
        }
        ;
        if (v instanceof GT && v1 instanceof GT) {
          return true;
        }
        ;
        if (v instanceof EQ && v1 instanceof EQ) {
          return true;
        }
        ;
        return false;
      };
    }
  };

  // output/Data.Ring/foreign.js
  var intSub = function(x) {
    return function(y) {
      return x - y | 0;
    };
  };
  var numSub = function(n1) {
    return function(n2) {
      return n1 - n2;
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
  var numAdd = function(n1) {
    return function(n2) {
      return n1 + n2;
    };
  };
  var numMul = function(n1) {
    return function(n2) {
      return n1 * n2;
    };
  };

  // output/Data.Semiring/index.js
  var zero = function(dict) {
    return dict.zero;
  };
  var semiringNumber = {
    add: numAdd,
    zero: 0,
    mul: numMul,
    one: 1
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
  var add = function(dict) {
    return dict.add;
  };

  // output/Data.Ring/index.js
  var sub = function(dict) {
    return dict.sub;
  };
  var ringNumber = {
    sub: numSub,
    Semiring0: function() {
      return semiringNumber;
    }
  };
  var ringInt = {
    sub: intSub,
    Semiring0: function() {
      return semiringInt;
    }
  };
  var negate = function(dictRing) {
    var sub1 = sub(dictRing);
    var zero2 = zero(dictRing.Semiring0());
    return function(a) {
      return sub1(zero2)(a);
    };
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
  var ordNumber = /* @__PURE__ */ function() {
    return {
      compare: ordNumberImpl(LT.value)(EQ.value)(GT.value),
      Eq0: function() {
        return eqNumber;
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
  var comparing = function(dictOrd) {
    var compare32 = compare(dictOrd);
    return function(f) {
      return function(x) {
        return function(y) {
          return compare32(f(x))(f(y));
        };
      };
    };
  };
  var max = function(dictOrd) {
    var compare32 = compare(dictOrd);
    return function(x) {
      return function(y) {
        var v = compare32(x)(y);
        if (v instanceof LT) {
          return y;
        }
        ;
        if (v instanceof EQ) {
          return x;
        }
        ;
        if (v instanceof GT) {
          return x;
        }
        ;
        throw new Error("Failed pattern match at Data.Ord (line 181, column 3 - line 184, column 12): " + [v.constructor.name]);
      };
    };
  };
  var min = function(dictOrd) {
    var compare32 = compare(dictOrd);
    return function(x) {
      return function(y) {
        var v = compare32(x)(y);
        if (v instanceof LT) {
          return x;
        }
        ;
        if (v instanceof EQ) {
          return x;
        }
        ;
        if (v instanceof GT) {
          return y;
        }
        ;
        throw new Error("Failed pattern match at Data.Ord (line 172, column 3 - line 175, column 12): " + [v.constructor.name]);
      };
    };
  };
  var clamp = function(dictOrd) {
    var min1 = min(dictOrd);
    var max1 = max(dictOrd);
    return function(low2) {
      return function(hi) {
        return function(x) {
          return min1(hi)(max1(low2)(x));
        };
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
  var showNumberImpl = function(n) {
    var str2 = n.toString();
    return isNaN(str2 + ".0") ? str2 : str2 + ".0";
  };
  var showStringImpl = function(s) {
    var l = s.length;
    return '"' + s.replace(
      /[\0-\x1F\x7F"\\]/g,
      // eslint-disable-line no-control-regex
      function(c, i) {
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
        var empty4 = k < l && s[k] >= "0" && s[k] <= "9" ? "\\&" : "";
        return "\\" + c.charCodeAt(0).toString(10) + empty4;
      }
    ) + '"';
  };

  // output/Data.Show/index.js
  var showString = {
    show: showStringImpl
  };
  var showNumber = {
    show: showNumberImpl
  };
  var showInt = {
    show: showIntImpl
  };
  var show = function(dict) {
    return dict.show;
  };

  // output/Data.Maybe/index.js
  var identity2 = /* @__PURE__ */ identity(categoryFn);
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
  var fromMaybe = function(a) {
    return maybe(a)(identity2);
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
  var eqMaybe = function(dictEq) {
    var eq5 = eq(dictEq);
    return {
      eq: function(x) {
        return function(y) {
          if (x instanceof Nothing && y instanceof Nothing) {
            return true;
          }
          ;
          if (x instanceof Just && y instanceof Just) {
            return eq5(x.value0)(y.value0);
          }
          ;
          return false;
        };
      }
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
  var applicativeMaybe = /* @__PURE__ */ function() {
    return {
      pure: Just.create,
      Apply0: function() {
        return applyMaybe;
      }
    };
  }();

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
  var keys = Object.keys || toArrayWithKey(function(k) {
    return function() {
      return k;
    };
  });

  // output/Control.Monad.ST.Internal/foreign.js
  var map_ = function(f) {
    return function(a) {
      return function() {
        return f(a());
      };
    };
  };
  var pure_ = function(a) {
    return function() {
      return a;
    };
  };
  var bind_ = function(a) {
    return function(f) {
      return function() {
        return f(a())();
      };
    };
  };
  var foreach = function(as) {
    return function(f) {
      return function() {
        for (var i = 0, l = as.length; i < l; i++) {
          f(as[i])();
        }
      };
    };
  };

  // output/Control.Monad/index.js
  var ap = function(dictMonad) {
    var bind8 = bind(dictMonad.Bind1());
    var pure9 = pure(dictMonad.Applicative0());
    return function(f) {
      return function(a) {
        return bind8(f)(function(f$prime) {
          return bind8(a)(function(a$prime) {
            return pure9(f$prime(a$prime));
          });
        });
      };
    };
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
  var showEither = function(dictShow) {
    var show8 = show(dictShow);
    return function(dictShow1) {
      var show14 = show(dictShow1);
      return {
        show: function(v) {
          if (v instanceof Left) {
            return "(Left " + (show8(v.value0) + ")");
          }
          ;
          if (v instanceof Right) {
            return "(Right " + (show14(v.value0) + ")");
          }
          ;
          throw new Error("Failed pattern match at Data.Either (line 173, column 1 - line 175, column 46): " + [v.constructor.name]);
        }
      };
    };
  };
  var note = function(a) {
    return maybe(new Left(a))(Right.create);
  };
  var functorEither = {
    map: function(f) {
      return function(m) {
        if (m instanceof Left) {
          return new Left(m.value0);
        }
        ;
        if (m instanceof Right) {
          return new Right(f(m.value0));
        }
        ;
        throw new Error("Failed pattern match at Data.Either (line 0, column 0 - line 0, column 0): " + [m.constructor.name]);
      };
    }
  };
  var map3 = /* @__PURE__ */ map(functorEither);
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
  var applyEither = {
    apply: function(v) {
      return function(v1) {
        if (v instanceof Left) {
          return new Left(v.value0);
        }
        ;
        if (v instanceof Right) {
          return map3(v.value0)(v1);
        }
        ;
        throw new Error("Failed pattern match at Data.Either (line 70, column 1 - line 72, column 30): " + [v.constructor.name, v1.constructor.name]);
      };
    },
    Functor0: function() {
      return functorEither;
    }
  };
  var bindEither = {
    bind: /* @__PURE__ */ either(function(e) {
      return function(v) {
        return new Left(e);
      };
    })(function(a) {
      return function(f) {
        return f(a);
      };
    }),
    Apply0: function() {
      return applyEither;
    }
  };
  var applicativeEither = /* @__PURE__ */ function() {
    return {
      pure: Right.create,
      Apply0: function() {
        return applyEither;
      }
    };
  }();

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

  // output/Data.EuclideanRing/foreign.js
  var intDegree = function(x) {
    return Math.min(Math.abs(x), 2147483647);
  };
  var intDiv = function(x) {
    return function(y) {
      if (y === 0) return 0;
      return y > 0 ? Math.floor(x / y) : -Math.floor(x / -y);
    };
  };
  var intMod = function(x) {
    return function(y) {
      if (y === 0) return 0;
      var yy = Math.abs(y);
      return (x % yy + yy) % yy;
    };
  };

  // output/Data.CommutativeRing/index.js
  var commutativeRingInt = {
    Ring0: function() {
      return ringInt;
    }
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

  // output/Data.Monoid/index.js
  var monoidString = {
    mempty: "",
    Semigroup0: function() {
      return semigroupString;
    }
  };
  var mempty = function(dict) {
    return dict.mempty;
  };

  // output/Effect/foreign.js
  var pureE = function(a) {
    return function() {
      return a;
    };
  };
  var bindE = function(a) {
    return function(f) {
      return function() {
        return f(a())();
      };
    };
  };

  // output/Effect/index.js
  var $runtime_lazy = function(name15, moduleName, init3) {
    var state3 = 0;
    var val;
    return function(lineNumber) {
      if (state3 === 2) return val;
      if (state3 === 1) throw new ReferenceError(name15 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state3 = 1;
      val = init3();
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
  var read = function(ref) {
    return function() {
      return ref.value;
    };
  };
  var modifyImpl = function(f) {
    return function(ref) {
      return function() {
        var t = f(ref.value);
        ref.value = t.state;
        return t.value;
      };
    };
  };

  // output/Effect.Ref/index.js
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

  // output/Control.Monad.Rec.Class/index.js
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
  var tailRec = function(f) {
    var go2 = function($copy_v) {
      var $tco_done = false;
      var $tco_result;
      function $tco_loop(v) {
        if (v instanceof Loop) {
          $copy_v = f(v.value0);
          return;
        }
        ;
        if (v instanceof Done) {
          $tco_done = true;
          return v.value0;
        }
        ;
        throw new Error("Failed pattern match at Control.Monad.Rec.Class (line 103, column 3 - line 103, column 25): " + [v.constructor.name]);
      }
      ;
      while (!$tco_done) {
        $tco_result = $tco_loop($copy_v);
      }
      ;
      return $tco_result;
    };
    return function($85) {
      return go2(f($85));
    };
  };
  var monadRecIdentity = {
    tailRecM: function(f) {
      var runIdentity = function(v) {
        return v;
      };
      var $86 = tailRec(function($88) {
        return runIdentity(f($88));
      });
      return function($87) {
        return Identity($86($87));
      };
    },
    Monad0: function() {
      return monadIdentity;
    }
  };

  // output/Control.Monad.ST.Internal/index.js
  var $runtime_lazy2 = function(name15, moduleName, init3) {
    var state3 = 0;
    var val;
    return function(lineNumber) {
      if (state3 === 2) return val;
      if (state3 === 1) throw new ReferenceError(name15 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state3 = 1;
      val = init3();
      state3 = 2;
      return val;
    };
  };
  var functorST = {
    map: map_
  };
  var monadST = {
    Applicative0: function() {
      return applicativeST;
    },
    Bind1: function() {
      return bindST;
    }
  };
  var bindST = {
    bind: bind_,
    Apply0: function() {
      return $lazy_applyST(0);
    }
  };
  var applicativeST = {
    pure: pure_,
    Apply0: function() {
      return $lazy_applyST(0);
    }
  };
  var $lazy_applyST = /* @__PURE__ */ $runtime_lazy2("applyST", "Control.Monad.ST.Internal", function() {
    return {
      apply: ap(monadST),
      Functor0: function() {
        return functorST;
      }
    };
  });

  // output/Data.Array/foreign.js
  var range = function(start2) {
    return function(end) {
      var step3 = start2 > end ? -1 : 1;
      var result = new Array(step3 * (end - start2) + 1);
      var i = start2, n = 0;
      while (i !== end) {
        result[n++] = i;
        i += step3;
      }
      result[n] = i;
      return result;
    };
  };
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
      for (var i = 0; i < count; i++) {
        result[n++] = value12;
      }
      return result;
    };
  };
  var replicate = typeof Array.prototype.fill === "function" ? replicateFill : replicatePolyfill;
  var fromFoldableImpl = /* @__PURE__ */ function() {
    function Cons3(head4, tail2) {
      this.head = head4;
      this.tail = tail2;
    }
    var emptyList = {};
    function curryCons(head4) {
      return function(tail2) {
        return new Cons3(head4, tail2);
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
  var length = function(xs) {
    return xs.length;
  };
  var unconsImpl = function(empty4) {
    return function(next) {
      return function(xs) {
        return xs.length === 0 ? empty4({}) : next(xs[0])(xs.slice(1));
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
  var findIndexImpl = function(just) {
    return function(nothing) {
      return function(f) {
        return function(xs) {
          for (var i = 0, l = xs.length; i < l; i++) {
            if (f(xs[i])) return just(i);
          }
          return nothing;
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
  var filter = function(f) {
    return function(xs) {
      return xs.filter(f);
    };
  };
  var sortByImpl = /* @__PURE__ */ function() {
    function mergeFromTo(compare4, fromOrdering, xs1, xs2, from2, to) {
      var mid;
      var i;
      var j;
      var k;
      var x;
      var y;
      var c;
      mid = from2 + (to - from2 >> 1);
      if (mid - from2 > 1) mergeFromTo(compare4, fromOrdering, xs2, xs1, from2, mid);
      if (to - mid > 1) mergeFromTo(compare4, fromOrdering, xs2, xs1, mid, to);
      i = from2;
      j = mid;
      k = from2;
      while (i < mid && j < to) {
        x = xs2[i];
        y = xs2[j];
        c = fromOrdering(compare4(x)(y));
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
    return function(compare4) {
      return function(fromOrdering) {
        return function(xs) {
          var out;
          if (xs.length < 2) return xs;
          out = xs.slice(0);
          mergeFromTo(compare4, fromOrdering, out, xs.slice(0), 0, xs.length);
          return out;
        };
      };
    };
  }();
  var slice = function(s) {
    return function(e) {
      return function(l) {
        return l.slice(s, e);
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
  var any = function(p) {
    return function(xs) {
      var len = xs.length;
      for (var i = 0; i < len; i++) {
        if (p(xs[i])) return true;
      }
      return false;
    };
  };
  var all = function(p) {
    return function(xs) {
      var len = xs.length;
      for (var i = 0; i < len; i++) {
        if (!p(xs[i])) return false;
      }
      return true;
    };
  };

  // output/Control.Lazy/index.js
  var defer = function(dict) {
    return dict.defer;
  };

  // output/Data.Array.ST/foreign.js
  var pushAll = function(as) {
    return function(xs) {
      return function() {
        return xs.push.apply(xs, as);
      };
    };
  };
  var unsafeFreeze = function(xs) {
    return function() {
      return xs;
    };
  };
  var unsafeThaw = function(xs) {
    return function() {
      return xs;
    };
  };

  // output/Data.Array.ST/index.js
  var push = function(a) {
    return pushAll([a]);
  };

  // output/Data.Foldable/foreign.js
  var foldrArray = function(f) {
    return function(init3) {
      return function(xs) {
        var acc = init3;
        var len = xs.length;
        for (var i = len - 1; i >= 0; i--) {
          acc = f(xs[i])(acc);
        }
        return acc;
      };
    };
  };
  var foldlArray = function(f) {
    return function(init3) {
      return function(xs) {
        var acc = init3;
        var len = xs.length;
        for (var i = 0; i < len; i++) {
          acc = f(acc)(xs[i]);
        }
        return acc;
      };
    };
  };

  // output/Control.Plus/index.js
  var empty = function(dict) {
    return dict.empty;
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
  var uncurry = function(f) {
    return function(v) {
      return f(v.value0)(v.value1);
    };
  };
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

  // output/Data.Bifunctor/index.js
  var identity3 = /* @__PURE__ */ identity(categoryFn);
  var bimap = function(dict) {
    return dict.bimap;
  };
  var lmap = function(dictBifunctor) {
    var bimap1 = bimap(dictBifunctor);
    return function(f) {
      return bimap1(f)(identity3);
    };
  };
  var bifunctorEither = {
    bimap: function(v) {
      return function(v1) {
        return function(v2) {
          if (v2 instanceof Left) {
            return new Left(v(v2.value0));
          }
          ;
          if (v2 instanceof Right) {
            return new Right(v1(v2.value0));
          }
          ;
          throw new Error("Failed pattern match at Data.Bifunctor (line 32, column 1 - line 34, column 36): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
        };
      };
    }
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
  var over = function() {
    return function() {
      return function(v) {
        return coerce2;
      };
    };
  };

  // output/Data.Foldable/index.js
  var eq12 = /* @__PURE__ */ eq(eqOrdering);
  var foldr = function(dict) {
    return dict.foldr;
  };
  var foldl = function(dict) {
    return dict.foldl;
  };
  var maximumBy = function(dictFoldable) {
    var foldl22 = foldl(dictFoldable);
    return function(cmp) {
      var max$prime = function(v) {
        return function(v1) {
          if (v instanceof Nothing) {
            return new Just(v1);
          }
          ;
          if (v instanceof Just) {
            return new Just(function() {
              var $303 = eq12(cmp(v.value0)(v1))(GT.value);
              if ($303) {
                return v.value0;
              }
              ;
              return v1;
            }());
          }
          ;
          throw new Error("Failed pattern match at Data.Foldable (line 441, column 3 - line 441, column 27): " + [v.constructor.name, v1.constructor.name]);
        };
      };
      return foldl22(max$prime)(Nothing.value);
    };
  };
  var maximum = function(dictOrd) {
    var compare4 = compare(dictOrd);
    return function(dictFoldable) {
      return maximumBy(dictFoldable)(compare4);
    };
  };
  var sum = function(dictFoldable) {
    var foldl22 = foldl(dictFoldable);
    return function(dictSemiring) {
      return foldl22(add(dictSemiring))(zero(dictSemiring));
    };
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
    var foldr22 = foldr(dictFoldable);
    return function(dictMonoid) {
      var append5 = append(dictMonoid.Semigroup0());
      var mempty2 = mempty(dictMonoid);
      return function(f) {
        return foldr22(function(x) {
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

  // output/Data.FunctorWithIndex/foreign.js
  var mapWithIndexArray = function(f) {
    return function(xs) {
      var l = xs.length;
      var result = Array(l);
      for (var i = 0; i < l; i++) {
        result[i] = f(i)(xs[i]);
      }
      return result;
    };
  };

  // output/Data.FunctorWithIndex/index.js
  var mapWithIndex = function(dict) {
    return dict.mapWithIndex;
  };
  var functorWithIndexArray = {
    mapWithIndex: mapWithIndexArray,
    Functor0: function() {
      return functorArray;
    }
  };

  // output/Data.Traversable/foreign.js
  var traverseArrayImpl = /* @__PURE__ */ function() {
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
      return function(map20) {
        return function(pure9) {
          return function(f) {
            return function(array) {
              function go2(bot, top4) {
                switch (top4 - bot) {
                  case 0:
                    return pure9([]);
                  case 1:
                    return map20(array1)(f(array[bot]));
                  case 2:
                    return apply2(map20(array2)(f(array[bot])))(f(array[bot + 1]));
                  case 3:
                    return apply2(apply2(map20(array3)(f(array[bot])))(f(array[bot + 1])))(f(array[bot + 2]));
                  default:
                    var pivot = bot + Math.floor((top4 - bot) / 4) * 2;
                    return apply2(map20(concat2)(go2(bot, pivot)))(go2(pivot, top4));
                }
              }
              return go2(0, array.length);
            };
          };
        };
      };
    };
  }();

  // output/Data.Traversable/index.js
  var identity4 = /* @__PURE__ */ identity(categoryFn);
  var traverse = function(dict) {
    return dict.traverse;
  };
  var traversableMaybe = {
    traverse: function(dictApplicative) {
      var pure9 = pure(dictApplicative);
      var map20 = map(dictApplicative.Apply0().Functor0());
      return function(v) {
        return function(v1) {
          if (v1 instanceof Nothing) {
            return pure9(Nothing.value);
          }
          ;
          if (v1 instanceof Just) {
            return map20(Just.create)(v(v1.value0));
          }
          ;
          throw new Error("Failed pattern match at Data.Traversable (line 115, column 1 - line 119, column 33): " + [v.constructor.name, v1.constructor.name]);
        };
      };
    },
    sequence: function(dictApplicative) {
      var pure9 = pure(dictApplicative);
      var map20 = map(dictApplicative.Apply0().Functor0());
      return function(v) {
        if (v instanceof Nothing) {
          return pure9(Nothing.value);
        }
        ;
        if (v instanceof Just) {
          return map20(Just.create)(v.value0);
        }
        ;
        throw new Error("Failed pattern match at Data.Traversable (line 115, column 1 - line 119, column 33): " + [v.constructor.name]);
      };
    },
    Functor0: function() {
      return functorMaybe;
    },
    Foldable1: function() {
      return foldableMaybe;
    }
  };
  var sequenceDefault = function(dictTraversable) {
    var traverse2 = traverse(dictTraversable);
    return function(dictApplicative) {
      return traverse2(dictApplicative)(identity4);
    };
  };
  var traversableArray = {
    traverse: function(dictApplicative) {
      var Apply0 = dictApplicative.Apply0();
      return traverseArrayImpl(apply(Apply0))(map(Apply0.Functor0()))(pure(dictApplicative));
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
  var $$for = function(dictApplicative) {
    return function(dictTraversable) {
      var traverse2 = traverse(dictTraversable)(dictApplicative);
      return function(x) {
        return function(f) {
          return traverse2(f)(x);
        };
      };
    };
  };

  // output/Data.Unfoldable/foreign.js
  var unfoldrArrayImpl = function(isNothing3) {
    return function(fromJust6) {
      return function(fst2) {
        return function(snd2) {
          return function(f) {
            return function(b) {
              var result = [];
              var value12 = b;
              while (true) {
                var maybe2 = f(value12);
                if (isNothing3(maybe2)) return result;
                var tuple = fromJust6(maybe2);
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
  var unfoldr1ArrayImpl = function(isNothing3) {
    return function(fromJust6) {
      return function(fst2) {
        return function(snd2) {
          return function(f) {
            return function(b) {
              var result = [];
              var value12 = b;
              while (true) {
                var tuple = f(value12);
                result.push(fst2(tuple));
                var maybe2 = snd2(tuple);
                if (isNothing3(maybe2)) return result;
                value12 = fromJust6(maybe2);
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

  // output/Data.Array/index.js
  var map4 = /* @__PURE__ */ map(functorST);
  var when2 = /* @__PURE__ */ when(applicativeST);
  var $$void2 = /* @__PURE__ */ $$void(functorST);
  var map22 = /* @__PURE__ */ map(functorArray);
  var fromJust4 = /* @__PURE__ */ fromJust();
  var notEq2 = /* @__PURE__ */ notEq(eqOrdering);
  var append2 = /* @__PURE__ */ append(semigroupArray);
  var zip = /* @__PURE__ */ function() {
    return zipWith(Tuple.create);
  }();
  var uncons = /* @__PURE__ */ function() {
    return unconsImpl($$const(Nothing.value))(function(x) {
      return function(xs) {
        return new Just({
          head: x,
          tail: xs
        });
      };
    });
  }();
  var take = function(n) {
    return function(xs) {
      var $149 = n < 1;
      if ($149) {
        return [];
      }
      ;
      return slice(0)(n)(xs);
    };
  };
  var tail = /* @__PURE__ */ function() {
    return unconsImpl($$const(Nothing.value))(function(v) {
      return function(xs) {
        return new Just(xs);
      };
    });
  }();
  var sortBy = function(comp) {
    return sortByImpl(comp)(function(v) {
      if (v instanceof GT) {
        return 1;
      }
      ;
      if (v instanceof EQ) {
        return 0;
      }
      ;
      if (v instanceof LT) {
        return -1 | 0;
      }
      ;
      throw new Error("Failed pattern match at Data.Array (line 870, column 31 - line 873, column 11): " + [v.constructor.name]);
    });
  };
  var sortWith = function(dictOrd) {
    var comparing3 = comparing(dictOrd);
    return function(f) {
      return sortBy(comparing3(f));
    };
  };
  var sortWith1 = /* @__PURE__ */ sortWith(ordInt);
  var singleton2 = function(a) {
    return [a];
  };
  var mapWithIndex2 = /* @__PURE__ */ mapWithIndex(functorWithIndexArray);
  var index = /* @__PURE__ */ function() {
    return indexImpl(Just.create)(Nothing.value);
  }();
  var last = function(xs) {
    return index(xs)(length(xs) - 1 | 0);
  };
  var head = function(xs) {
    return index(xs)(0);
  };
  var nubBy = function(comp) {
    return function(xs) {
      var indexedAndSorted = sortBy(function(x) {
        return function(y) {
          return comp(snd(x))(snd(y));
        };
      })(mapWithIndex2(Tuple.create)(xs));
      var v = head(indexedAndSorted);
      if (v instanceof Nothing) {
        return [];
      }
      ;
      if (v instanceof Just) {
        return map22(snd)(sortWith1(fst)(function __do3() {
          var result = unsafeThaw(singleton2(v.value0))();
          foreach(indexedAndSorted)(function(v1) {
            return function __do4() {
              var lst = map4(/* @__PURE__ */ function() {
                var $185 = function($187) {
                  return fromJust4(last($187));
                };
                return function($186) {
                  return snd($185($186));
                };
              }())(unsafeFreeze(result))();
              return when2(notEq2(comp(lst)(v1.value1))(EQ.value))($$void2(push(v1)(result)))();
            };
          })();
          return unsafeFreeze(result)();
        }()));
      }
      ;
      throw new Error("Failed pattern match at Data.Array (line 1085, column 17 - line 1093, column 29): " + [v.constructor.name]);
    };
  };
  var nub = function(dictOrd) {
    return nubBy(compare(dictOrd));
  };
  var fromFoldable = function(dictFoldable) {
    return fromFoldableImpl(foldr(dictFoldable));
  };
  var foldr2 = /* @__PURE__ */ foldr(foldableArray);
  var findIndex = /* @__PURE__ */ function() {
    return findIndexImpl(Just.create)(Nothing.value);
  }();
  var elemIndex = function(dictEq) {
    var eq23 = eq(dictEq);
    return function(x) {
      return findIndex(function(v) {
        return eq23(v)(x);
      });
    };
  };
  var elem2 = function(dictEq) {
    var elemIndex1 = elemIndex(dictEq);
    return function(a) {
      return function(arr) {
        return isJust(elemIndex1(a)(arr));
      };
    };
  };
  var drop = function(n) {
    return function(xs) {
      var $173 = n < 1;
      if ($173) {
        return xs;
      }
      ;
      return slice(n)(length(xs))(xs);
    };
  };
  var cons = function(x) {
    return function(xs) {
      return append2([x])(xs);
    };
  };
  var some = function(dictAlternative) {
    var apply1 = apply(dictAlternative.Applicative0().Apply0());
    var map32 = map(dictAlternative.Plus1().Alt0().Functor0());
    return function(dictLazy) {
      var defer5 = defer(dictLazy);
      return function(v) {
        return apply1(map32(cons)(v))(defer5(function(v1) {
          return many(dictAlternative)(dictLazy)(v);
        }));
      };
    };
  };
  var many = function(dictAlternative) {
    var alt6 = alt(dictAlternative.Plus1().Alt0());
    var pure12 = pure(dictAlternative.Applicative0());
    return function(dictLazy) {
      return function(v) {
        return alt6(some(dictAlternative)(dictLazy)(v))(pure12([]));
      };
    };
  };
  var concatMap = /* @__PURE__ */ flip(/* @__PURE__ */ bind(bindArray));

  // output/Data.FoldableWithIndex/index.js
  var foldr8 = /* @__PURE__ */ foldr(foldableArray);
  var mapWithIndex3 = /* @__PURE__ */ mapWithIndex(functorWithIndexArray);
  var foldl8 = /* @__PURE__ */ foldl(foldableArray);
  var foldrWithIndex = function(dict) {
    return dict.foldrWithIndex;
  };
  var foldlWithIndex = function(dict) {
    return dict.foldlWithIndex;
  };
  var foldMapWithIndexDefaultR = function(dictFoldableWithIndex) {
    var foldrWithIndex1 = foldrWithIndex(dictFoldableWithIndex);
    return function(dictMonoid) {
      var append5 = append(dictMonoid.Semigroup0());
      var mempty2 = mempty(dictMonoid);
      return function(f) {
        return foldrWithIndex1(function(i) {
          return function(x) {
            return function(acc) {
              return append5(f(i)(x))(acc);
            };
          };
        })(mempty2);
      };
    };
  };
  var foldableWithIndexArray = {
    foldrWithIndex: function(f) {
      return function(z) {
        var $291 = foldr8(function(v) {
          return function(y) {
            return f(v.value0)(v.value1)(y);
          };
        })(z);
        var $292 = mapWithIndex3(Tuple.create);
        return function($293) {
          return $291($292($293));
        };
      };
    },
    foldlWithIndex: function(f) {
      return function(z) {
        var $294 = foldl8(function(y) {
          return function(v) {
            return f(v.value0)(y)(v.value1);
          };
        })(z);
        var $295 = mapWithIndex3(Tuple.create);
        return function($296) {
          return $294($295($296));
        };
      };
    },
    foldMapWithIndex: function(dictMonoid) {
      return foldMapWithIndexDefaultR(foldableWithIndexArray)(dictMonoid);
    },
    Foldable0: function() {
      return foldableArray;
    }
  };
  var foldMapWithIndex = function(dict) {
    return dict.foldMapWithIndex;
  };

  // output/Data.Function.Uncurried/foreign.js
  var mkFn5 = function(fn) {
    return function(a, b, c, d, e) {
      return fn(a)(b)(c)(d)(e);
    };
  };
  var runFn3 = function(fn) {
    return function(a) {
      return function(b) {
        return function(c) {
          return fn(a, b, c);
        };
      };
    };
  };
  var runFn4 = function(fn) {
    return function(a) {
      return function(b) {
        return function(c) {
          return function(d) {
            return fn(a, b, c, d);
          };
        };
      };
    };
  };

  // output/Data.TraversableWithIndex/index.js
  var traverseWithIndexDefault = function(dictTraversableWithIndex) {
    var sequence3 = sequence(dictTraversableWithIndex.Traversable2());
    var mapWithIndex4 = mapWithIndex(dictTraversableWithIndex.FunctorWithIndex0());
    return function(dictApplicative) {
      var sequence12 = sequence3(dictApplicative);
      return function(f) {
        var $174 = mapWithIndex4(f);
        return function($175) {
          return sequence12($174($175));
        };
      };
    };
  };
  var traverseWithIndex = function(dict) {
    return dict.traverseWithIndex;
  };
  var traversableWithIndexArray = {
    traverseWithIndex: function(dictApplicative) {
      return traverseWithIndexDefault(traversableWithIndexArray)(dictApplicative);
    },
    FunctorWithIndex0: function() {
      return functorWithIndexArray;
    },
    FoldableWithIndex1: function() {
      return foldableWithIndexArray;
    },
    Traversable2: function() {
      return traversableArray;
    }
  };

  // output/Foreign.Object/index.js
  var lookup = /* @__PURE__ */ function() {
    return runFn4(_lookup)(Nothing.value)(Just.create);
  }();

  // output/Data.Argonaut.Core/index.js
  var verbJsonType = function(def) {
    return function(f) {
      return function(g) {
        return g(def)(f);
      };
    };
  };
  var toJsonType = /* @__PURE__ */ function() {
    return verbJsonType(Nothing.value)(Just.create);
  }();
  var caseJsonString = function(d) {
    return function(f) {
      return function(j) {
        return _caseJson($$const(d), $$const(d), $$const(d), f, $$const(d), $$const(d), j);
      };
    };
  };
  var caseJsonObject = function(d) {
    return function(f) {
      return function(j) {
        return _caseJson($$const(d), $$const(d), $$const(d), $$const(d), $$const(d), f, j);
      };
    };
  };
  var toObject = /* @__PURE__ */ toJsonType(caseJsonObject);
  var caseJsonNumber = function(d) {
    return function(f) {
      return function(j) {
        return _caseJson($$const(d), $$const(d), f, $$const(d), $$const(d), $$const(d), j);
      };
    };
  };
  var caseJsonArray = function(d) {
    return function(f) {
      return function(j) {
        return _caseJson($$const(d), $$const(d), $$const(d), $$const(d), f, $$const(d), j);
      };
    };
  };
  var toArray = /* @__PURE__ */ toJsonType(caseJsonArray);

  // output/Data.Argonaut.Decode.Error/index.js
  var show2 = /* @__PURE__ */ show(showString);
  var show1 = /* @__PURE__ */ show(showInt);
  var TypeMismatch = /* @__PURE__ */ function() {
    function TypeMismatch2(value0) {
      this.value0 = value0;
    }
    ;
    TypeMismatch2.create = function(value0) {
      return new TypeMismatch2(value0);
    };
    return TypeMismatch2;
  }();
  var UnexpectedValue = /* @__PURE__ */ function() {
    function UnexpectedValue2(value0) {
      this.value0 = value0;
    }
    ;
    UnexpectedValue2.create = function(value0) {
      return new UnexpectedValue2(value0);
    };
    return UnexpectedValue2;
  }();
  var AtIndex = /* @__PURE__ */ function() {
    function AtIndex2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    AtIndex2.create = function(value0) {
      return function(value1) {
        return new AtIndex2(value0, value1);
      };
    };
    return AtIndex2;
  }();
  var AtKey = /* @__PURE__ */ function() {
    function AtKey2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    AtKey2.create = function(value0) {
      return function(value1) {
        return new AtKey2(value0, value1);
      };
    };
    return AtKey2;
  }();
  var Named = /* @__PURE__ */ function() {
    function Named2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Named2.create = function(value0) {
      return function(value1) {
        return new Named2(value0, value1);
      };
    };
    return Named2;
  }();
  var MissingValue = /* @__PURE__ */ function() {
    function MissingValue2() {
    }
    ;
    MissingValue2.value = new MissingValue2();
    return MissingValue2;
  }();
  var showJsonDecodeError = {
    show: function(v) {
      if (v instanceof TypeMismatch) {
        return "(TypeMismatch " + (show2(v.value0) + ")");
      }
      ;
      if (v instanceof UnexpectedValue) {
        return "(UnexpectedValue " + (stringify(v.value0) + ")");
      }
      ;
      if (v instanceof AtIndex) {
        return "(AtIndex " + (show1(v.value0) + (" " + (show(showJsonDecodeError)(v.value1) + ")")));
      }
      ;
      if (v instanceof AtKey) {
        return "(AtKey " + (show2(v.value0) + (" " + (show(showJsonDecodeError)(v.value1) + ")")));
      }
      ;
      if (v instanceof Named) {
        return "(Named " + (show2(v.value0) + (" " + (show(showJsonDecodeError)(v.value1) + ")")));
      }
      ;
      if (v instanceof MissingValue) {
        return "MissingValue";
      }
      ;
      throw new Error("Failed pattern match at Data.Argonaut.Decode.Error (line 24, column 10 - line 30, column 35): " + [v.constructor.name]);
    }
  };

  // output/Data.Enum/foreign.js
  function toCharCode(c) {
    return c.charCodeAt(0);
  }
  function fromCharCode(c) {
    return String.fromCharCode(c);
  }

  // output/Data.Enum/index.js
  var bottom1 = /* @__PURE__ */ bottom(boundedChar);
  var top1 = /* @__PURE__ */ top(boundedChar);
  var toEnum = function(dict) {
    return dict.toEnum;
  };
  var fromEnum = function(dict) {
    return dict.fromEnum;
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
    if (v >= toCharCode(bottom1) && v <= toCharCode(top1)) {
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
      cardinality: toCharCode(top1) - toCharCode(bottom1) | 0,
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

  // output/Data.Int/foreign.js
  var fromNumberImpl = function(just) {
    return function(nothing) {
      return function(n) {
        return (n | 0) === n ? just(n) : nothing;
      };
    };
  };
  var toNumber = function(n) {
    return n;
  };
  var toStringAs = function(radix) {
    return function(i) {
      return i.toString(radix);
    };
  };

  // output/Data.Number/foreign.js
  var isFiniteImpl = isFinite;
  var abs = Math.abs;
  var atan2 = function(y) {
    return function(x) {
      return Math.atan2(y, x);
    };
  };
  var floor = Math.floor;
  var log = Math.log;
  var pow = function(n) {
    return function(p) {
      return Math.pow(n, p);
    };
  };
  var remainder = function(n) {
    return function(m) {
      return n % m;
    };
  };
  var round = Math.round;
  var sign = Math.sign ? Math.sign : function(x) {
    return x === 0 || x !== x ? x : x < 0 ? -1 : 1;
  };
  var sqrt = Math.sqrt;

  // output/Data.Number/index.js
  var pi = 3.141592653589793;
  var ln10 = 2.302585092994046;

  // output/Data.Int/index.js
  var top2 = /* @__PURE__ */ top(boundedInt);
  var bottom2 = /* @__PURE__ */ bottom(boundedInt);
  var hexadecimal = 16;
  var fromNumber = /* @__PURE__ */ function() {
    return fromNumberImpl(Just.create)(Nothing.value);
  }();
  var unsafeClamp = function(x) {
    if (!isFiniteImpl(x)) {
      return 0;
    }
    ;
    if (x >= toNumber(top2)) {
      return top2;
    }
    ;
    if (x <= toNumber(bottom2)) {
      return bottom2;
    }
    ;
    if (otherwise) {
      return fromMaybe(0)(fromNumber(x));
    }
    ;
    throw new Error("Failed pattern match at Data.Int (line 72, column 1 - line 72, column 29): " + [x.constructor.name]);
  };
  var round2 = function($37) {
    return unsafeClamp(round($37));
  };
  var floor2 = function($39) {
    return unsafeClamp(floor($39));
  };

  // output/Data.Time.Duration/index.js
  var over2 = /* @__PURE__ */ over()();
  var negate2 = /* @__PURE__ */ negate(ringNumber);
  var identity5 = /* @__PURE__ */ identity(categoryFn);
  var Milliseconds = function(x) {
    return x;
  };
  var toDuration = function(dict) {
    return dict.toDuration;
  };
  var semigroupMilliseconds = {
    append: function(v) {
      return function(v1) {
        return v + v1;
      };
    }
  };
  var fromDuration = function(dict) {
    return dict.fromDuration;
  };
  var negateDuration = function(dictDuration) {
    var $57 = toDuration(dictDuration);
    var $58 = over2(Milliseconds)(negate2);
    var $59 = fromDuration(dictDuration);
    return function($60) {
      return $57($58($59($60)));
    };
  };
  var durationMilliseconds = {
    fromDuration: identity5,
    toDuration: identity5
  };

  // output/Data.DateTime.Instant/index.js
  var append1 = /* @__PURE__ */ append(semigroupMilliseconds);
  var negateDuration2 = /* @__PURE__ */ negateDuration(durationMilliseconds);
  var unInstant = function(v) {
    return v;
  };
  var diff = function(dictDuration) {
    var toDuration2 = toDuration(dictDuration);
    return function(dt1) {
      return function(dt2) {
        return toDuration2(append1(unInstant(dt1))(negateDuration2(unInstant(dt2))));
      };
    };
  };

  // output/Data.Formatter.Number/foreign.js
  function showNumberAsInt(n) {
    return Math.round(n).toString();
  }

  // output/Data.Formatter.Internal/index.js
  var repeat = function(dictMonoid) {
    var append5 = append(dictMonoid.Semigroup0());
    var repeat$prime = function($copy_v) {
      return function($copy_v1) {
        return function($copy_v2) {
          var $tco_var_v = $copy_v;
          var $tco_var_v1 = $copy_v1;
          var $tco_done = false;
          var $tco_result;
          function $tco_loop(v, v1, v2) {
            if (v2 < 1) {
              $tco_done = true;
              return v;
            }
            ;
            $tco_var_v = append5(v)(v1);
            $tco_var_v1 = v1;
            $copy_v2 = v2 - 1 | 0;
            return;
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
    return repeat$prime(mempty(dictMonoid));
  };

  // output/Control.Monad.Error.Class/index.js
  var throwError = function(dict) {
    return dict.throwError;
  };

  // output/Control.Monad.State.Class/index.js
  var state = function(dict) {
    return dict.state;
  };

  // output/Control.Monad.Except.Trans/index.js
  var map5 = /* @__PURE__ */ map(functorEither);
  var ExceptT = function(x) {
    return x;
  };
  var runExceptT = function(v) {
    return v;
  };
  var mapExceptT = function(f) {
    return function(v) {
      return f(v);
    };
  };
  var functorExceptT = function(dictFunctor) {
    var map111 = map(dictFunctor);
    return {
      map: function(f) {
        return mapExceptT(map111(map5(f)));
      }
    };
  };
  var monadExceptT = function(dictMonad) {
    return {
      Applicative0: function() {
        return applicativeExceptT(dictMonad);
      },
      Bind1: function() {
        return bindExceptT(dictMonad);
      }
    };
  };
  var bindExceptT = function(dictMonad) {
    var bind8 = bind(dictMonad.Bind1());
    var pure9 = pure(dictMonad.Applicative0());
    return {
      bind: function(v) {
        return function(k) {
          return bind8(v)(either(function($187) {
            return pure9(Left.create($187));
          })(function(a) {
            var v1 = k(a);
            return v1;
          }));
        };
      },
      Apply0: function() {
        return applyExceptT(dictMonad);
      }
    };
  };
  var applyExceptT = function(dictMonad) {
    var functorExceptT1 = functorExceptT(dictMonad.Bind1().Apply0().Functor0());
    return {
      apply: ap(monadExceptT(dictMonad)),
      Functor0: function() {
        return functorExceptT1;
      }
    };
  };
  var applicativeExceptT = function(dictMonad) {
    return {
      pure: function() {
        var $188 = pure(dictMonad.Applicative0());
        return function($189) {
          return ExceptT($188(Right.create($189)));
        };
      }(),
      Apply0: function() {
        return applyExceptT(dictMonad);
      }
    };
  };
  var monadThrowExceptT = function(dictMonad) {
    var monadExceptT1 = monadExceptT(dictMonad);
    return {
      throwError: function() {
        var $198 = pure(dictMonad.Applicative0());
        return function($199) {
          return ExceptT($198(Left.create($199)));
        };
      }(),
      Monad0: function() {
        return monadExceptT1;
      }
    };
  };

  // output/Data.Lazy/foreign.js
  var defer2 = function(thunk) {
    var v = null;
    return function() {
      if (thunk === void 0) return v;
      v = thunk();
      thunk = void 0;
      return v;
    };
  };
  var force = function(l) {
    return l();
  };

  // output/Data.Lazy/index.js
  var functorLazy = {
    map: function(f) {
      return function(l) {
        return defer2(function(v) {
          return f(force(l));
        });
      };
    }
  };

  // output/Parsing/index.js
  var unwrap2 = /* @__PURE__ */ unwrap();
  var ParseState = /* @__PURE__ */ function() {
    function ParseState2(value0, value1, value22) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
    }
    ;
    ParseState2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return new ParseState2(value0, value1, value22);
        };
      };
    };
    return ParseState2;
  }();
  var ParseError = /* @__PURE__ */ function() {
    function ParseError2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    ParseError2.create = function(value0) {
      return function(value1) {
        return new ParseError2(value0, value1);
      };
    };
    return ParseError2;
  }();
  var More = /* @__PURE__ */ function() {
    function More2(value0) {
      this.value0 = value0;
    }
    ;
    More2.create = function(value0) {
      return new More2(value0);
    };
    return More2;
  }();
  var Lift = /* @__PURE__ */ function() {
    function Lift2(value0) {
      this.value0 = value0;
    }
    ;
    Lift2.create = function(value0) {
      return new Lift2(value0);
    };
    return Lift2;
  }();
  var Stop = /* @__PURE__ */ function() {
    function Stop2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Stop2.create = function(value0) {
      return function(value1) {
        return new Stop2(value0, value1);
      };
    };
    return Stop2;
  }();
  var lazyParserT = {
    defer: function(f) {
      var m = defer2(f);
      return function(state1, more, lift1, $$throw, done) {
        var v = force(m);
        return v(state1, more, lift1, $$throw, done);
      };
    }
  };
  var functorParserT = {
    map: function(f) {
      return function(v) {
        return function(state1, more, lift1, $$throw, done) {
          return more(function(v1) {
            return v(state1, more, lift1, $$throw, function(state22, a) {
              return more(function(v2) {
                return done(state22, f(a));
              });
            });
          });
        };
      };
    }
  };
  var applyParserT = {
    apply: function(v) {
      return function(v1) {
        return function(state1, more, lift1, $$throw, done) {
          return more(function(v2) {
            return v(state1, more, lift1, $$throw, function(state22, f) {
              return more(function(v3) {
                return v1(state22, more, lift1, $$throw, function(state3, a) {
                  return more(function(v4) {
                    return done(state3, f(a));
                  });
                });
              });
            });
          });
        };
      };
    },
    Functor0: function() {
      return functorParserT;
    }
  };
  var bindParserT = {
    bind: function(v) {
      return function(next) {
        return function(state1, more, lift1, $$throw, done) {
          return more(function(v1) {
            return v(state1, more, lift1, $$throw, function(state22, a) {
              return more(function(v2) {
                var v3 = next(a);
                return v3(state22, more, lift1, $$throw, done);
              });
            });
          });
        };
      };
    },
    Apply0: function() {
      return applyParserT;
    }
  };
  var bindFlipped2 = /* @__PURE__ */ bindFlipped(bindParserT);
  var applicativeParserT = {
    pure: function(a) {
      return function(state1, v, v1, v2, done) {
        return done(state1, a);
      };
    },
    Apply0: function() {
      return applyParserT;
    }
  };
  var monadParserT = {
    Applicative0: function() {
      return applicativeParserT;
    },
    Bind1: function() {
      return bindParserT;
    }
  };
  var monadThrowParseErrorParse = {
    throwError: function(err) {
      return function(state1, v, v1, $$throw, v2) {
        return $$throw(state1, err);
      };
    },
    Monad0: function() {
      return monadParserT;
    }
  };
  var throwError2 = /* @__PURE__ */ throwError(monadThrowParseErrorParse);
  var altParserT = {
    alt: function(v) {
      return function(v1) {
        return function(v2, more, lift1, $$throw, done) {
          return more(function(v3) {
            return v(new ParseState(v2.value0, v2.value1, false), more, lift1, function(v4, err) {
              return more(function(v5) {
                if (v4.value2) {
                  return $$throw(v4, err);
                }
                ;
                return v1(v2, more, lift1, $$throw, done);
              });
            }, done);
          });
        };
      };
    },
    Functor0: function() {
      return functorParserT;
    }
  };
  var stateParserT = function(k) {
    return function(state1, v, v1, v2, done) {
      var v3 = k(state1);
      return done(v3.value1, v3.value0);
    };
  };
  var runParserT$prime = function(dictMonadRec) {
    var Monad0 = dictMonadRec.Monad0();
    var map20 = map(Monad0.Bind1().Apply0().Functor0());
    var pure12 = pure(Monad0.Applicative0());
    var tailRecM3 = tailRecM(dictMonadRec);
    return function(state1) {
      return function(v) {
        var go2 = function($copy_step) {
          var $tco_done = false;
          var $tco_result;
          function $tco_loop(step3) {
            var v1 = step3(unit);
            if (v1 instanceof More) {
              $copy_step = v1.value0;
              return;
            }
            ;
            if (v1 instanceof Lift) {
              $tco_done = true;
              return map20(Loop.create)(v1.value0);
            }
            ;
            if (v1 instanceof Stop) {
              $tco_done = true;
              return pure12(new Done(new Tuple(v1.value1, v1.value0)));
            }
            ;
            throw new Error("Failed pattern match at Parsing (line 152, column 13 - line 158, column 32): " + [v1.constructor.name]);
          }
          ;
          while (!$tco_done) {
            $tco_result = $tco_loop($copy_step);
          }
          ;
          return $tco_result;
        };
        return tailRecM3(go2)(function(v1) {
          return v(state1, More.create, Lift.create, function(state22, err) {
            return new Stop(state22, new Left(err));
          }, function(state22, res) {
            return new Stop(state22, new Right(res));
          });
        });
      };
    };
  };
  var position = /* @__PURE__ */ stateParserT(function(v) {
    return new Tuple(v.value1, v);
  });
  var parseErrorPosition = function(v) {
    return v.value1;
  };
  var parseErrorMessage = function(v) {
    return v.value0;
  };
  var initialPos = {
    index: 0,
    line: 1,
    column: 1
  };
  var runParserT = function(dictMonadRec) {
    var map20 = map(dictMonadRec.Monad0().Bind1().Apply0().Functor0());
    var runParserT$prime1 = runParserT$prime(dictMonadRec);
    return function(s) {
      return function(p) {
        var initialState = new ParseState(s, initialPos, false);
        return map20(fst)(runParserT$prime1(initialState)(p));
      };
    };
  };
  var runParserT1 = /* @__PURE__ */ runParserT(monadRecIdentity);
  var runParser = function(s) {
    var $281 = runParserT1(s);
    return function($282) {
      return unwrap2($281($282));
    };
  };
  var failWithPosition = function(message2) {
    return function(pos) {
      return throwError2(new ParseError(message2, pos));
    };
  };
  var fail = function(message2) {
    return bindFlipped2(failWithPosition(message2))(position);
  };
  var plusParserT = {
    empty: /* @__PURE__ */ fail("No alternative"),
    Alt0: function() {
      return altParserT;
    }
  };
  var alternativeParserT = {
    Applicative0: function() {
      return applicativeParserT;
    },
    Plus1: function() {
      return plusParserT;
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
  var singleton4 = function(dictPlus) {
    var empty4 = empty(dictPlus);
    return function(a) {
      return new NonEmpty(a, empty4);
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
      return function(b) {
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
        var $284 = foldl(foldableList)(flip(f))(b);
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
          function $tco_loop(b, v) {
            if (v instanceof Nil) {
              $tco_done1 = true;
              return b;
            }
            ;
            if (v instanceof Cons) {
              $tco_var_b = f(b)(v.value0);
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
  var foldr3 = /* @__PURE__ */ foldr(foldableList);
  var semigroupList = {
    append: function(xs) {
      return function(ys) {
        return foldr3(Cons.create)(ys)(xs);
      };
    }
  };
  var append12 = /* @__PURE__ */ append(semigroupList);
  var altList = {
    alt: append12,
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
  var map6 = /* @__PURE__ */ map(functorMaybe);
  var uncons2 = function(v) {
    if (v instanceof Nil) {
      return Nothing.value;
    }
    ;
    if (v instanceof Cons) {
      return new Just({
        head: v.value0,
        tail: v.value1
      });
    }
    ;
    throw new Error("Failed pattern match at Data.List (line 259, column 1 - line 259, column 66): " + [v.constructor.name]);
  };
  var toUnfoldable2 = function(dictUnfoldable) {
    return unfoldr(dictUnfoldable)(function(xs) {
      return map6(function(rec) {
        return new Tuple(rec.head, rec.tail);
      })(uncons2(xs));
    });
  };

  // output/Data.List.Lazy.Types/index.js
  var unwrap3 = /* @__PURE__ */ unwrap();
  var List = function(x) {
    return x;
  };
  var Nil2 = /* @__PURE__ */ function() {
    function Nil3() {
    }
    ;
    Nil3.value = new Nil3();
    return Nil3;
  }();
  var Cons2 = /* @__PURE__ */ function() {
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
  var nil = /* @__PURE__ */ defer2(function(v) {
    return Nil2.value;
  });
  var step = function($319) {
    return force(unwrap3($319));
  };
  var lazyList = {
    defer: function(f) {
      return defer2(function($320) {
        return step(f($320));
      });
    }
  };
  var defer3 = /* @__PURE__ */ defer(lazyList);
  var cons2 = function(x) {
    return function(xs) {
      return defer2(function(v) {
        return new Cons2(x, xs);
      });
    };
  };
  var foldableList2 = {
    foldr: function(op) {
      return function(z) {
        return function(xs) {
          var rev3 = foldl(foldableList2)(flip(cons2))(nil);
          return foldl(foldableList2)(flip(op))(z)(rev3(xs));
        };
      };
    },
    foldl: function(op) {
      var go2 = function($copy_b) {
        return function($copy_xs) {
          var $tco_var_b = $copy_b;
          var $tco_done = false;
          var $tco_result;
          function $tco_loop(b, xs) {
            var v = step(xs);
            if (v instanceof Nil2) {
              $tco_done = true;
              return b;
            }
            ;
            if (v instanceof Cons2) {
              $tco_var_b = op(b)(v.value0);
              $copy_xs = v.value1;
              return;
            }
            ;
            throw new Error("Failed pattern match at Data.List.Lazy.Types (line 127, column 7 - line 129, column 40): " + [v.constructor.name]);
          }
          ;
          while (!$tco_done) {
            $tco_result = $tco_loop($tco_var_b, $copy_xs);
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
        return foldl(foldableList2)(function(b) {
          return function(a) {
            return append22(b)(f(a));
          };
        })(mempty2);
      };
    }
  };
  var unfoldable1List = {
    unfoldr1: /* @__PURE__ */ function() {
      var go2 = function(f) {
        return function(b) {
          return defer3(function(v) {
            var v1 = f(b);
            if (v1.value1 instanceof Just) {
              return cons2(v1.value0)(go2(f)(v1.value1.value0));
            }
            ;
            if (v1.value1 instanceof Nothing) {
              return cons2(v1.value0)(nil);
            }
            ;
            throw new Error("Failed pattern match at Data.List.Lazy.Types (line 151, column 28 - line 153, column 33): " + [v1.constructor.name]);
          });
        };
      };
      return go2;
    }()
  };
  var unfoldableList = {
    unfoldr: /* @__PURE__ */ function() {
      var go2 = function(f) {
        return function(b) {
          return defer3(function(v) {
            var v1 = f(b);
            if (v1 instanceof Nothing) {
              return nil;
            }
            ;
            if (v1 instanceof Just) {
              return cons2(v1.value0.value0)(go2(f)(v1.value0.value1));
            }
            ;
            throw new Error("Failed pattern match at Data.List.Lazy.Types (line 157, column 28 - line 159, column 39): " + [v1.constructor.name]);
          });
        };
      };
      return go2;
    }(),
    Unfoldable10: function() {
      return unfoldable1List;
    }
  };

  // output/Data.List.Lazy/index.js
  var map7 = /* @__PURE__ */ map(functorLazy);
  var unwrap4 = /* @__PURE__ */ unwrap();
  var filter2 = function(p) {
    var go2 = function($copy_v) {
      var $tco_done = false;
      var $tco_result;
      function $tco_loop(v) {
        if (v instanceof Nil2) {
          $tco_done = true;
          return Nil2.value;
        }
        ;
        if (v instanceof Cons2) {
          if (p(v.value0)) {
            $tco_done = true;
            return new Cons2(v.value0, filter2(p)(v.value1));
          }
          ;
          if (otherwise) {
            $copy_v = step(v.value1);
            return;
          }
          ;
        }
        ;
        throw new Error("Failed pattern match at Data.List.Lazy (line 416, column 3 - line 416, column 15): " + [v.constructor.name]);
      }
      ;
      while (!$tco_done) {
        $tco_result = $tco_loop($copy_v);
      }
      ;
      return $tco_result;
    };
    var $344 = map7(go2);
    return function($345) {
      return List($344(unwrap4($345)));
    };
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

  // output/Data.List.NonEmpty/index.js
  var singleton5 = /* @__PURE__ */ function() {
    var $200 = singleton4(plusList);
    return function($201) {
      return NonEmptyList($200($201));
    };
  }();

  // output/Parsing.Combinators/index.js
  var alt2 = /* @__PURE__ */ alt(altParserT);
  var pure2 = /* @__PURE__ */ pure(applicativeParserT);
  var map8 = /* @__PURE__ */ map(functorParserT);
  var $$try = function(v) {
    return function(v1, more, lift3, $$throw, done) {
      return v(v1, more, lift3, function(v2, err) {
        return $$throw(new ParseState(v2.value0, v2.value1, v1.value2), err);
      }, done);
    };
  };
  var option = function(a) {
    return function(p) {
      return alt2(p)(pure2(a));
    };
  };
  var optionMaybe = function(p) {
    return option(Nothing.value)(map8(Just.create)(p));
  };

  // output/Data.String.CodePoints/foreign.js
  var hasArrayFrom = typeof Array.from === "function";
  var hasStringIterator = typeof Symbol !== "undefined" && Symbol != null && typeof Symbol.iterator !== "undefined" && typeof String.prototype[Symbol.iterator] === "function";
  var hasFromCodePoint = typeof String.prototype.fromCodePoint === "function";
  var hasCodePointAt = typeof String.prototype.codePointAt === "function";
  var _unsafeCodePointAt0 = function(fallback) {
    return hasCodePointAt ? function(str2) {
      return str2.codePointAt(0);
    } : fallback;
  };
  var _codePointAt = function(fallback) {
    return function(Just2) {
      return function(Nothing2) {
        return function(unsafeCodePointAt02) {
          return function(index5) {
            return function(str2) {
              var length9 = str2.length;
              if (index5 < 0 || index5 >= length9) return Nothing2;
              if (hasStringIterator) {
                var iter = str2[Symbol.iterator]();
                for (var i = index5; ; --i) {
                  var o = iter.next();
                  if (o.done) return Nothing2;
                  if (i === 0) return Just2(unsafeCodePointAt02(o.value));
                }
              }
              return fallback(index5)(str2);
            };
          };
        };
      };
    };
  };
  var _toCodePointArray = function(fallback) {
    return function(unsafeCodePointAt02) {
      if (hasArrayFrom) {
        return function(str2) {
          return Array.from(str2, unsafeCodePointAt02);
        };
      }
      return fallback;
    };
  };

  // output/Data.String.CodeUnits/foreign.js
  var fromCharArray = function(a) {
    return a.join("");
  };
  var toCharArray = function(s) {
    return s.split("");
  };
  var length4 = function(s) {
    return s.length;
  };
  var drop3 = function(n) {
    return function(s) {
      return s.substring(n);
    };
  };
  var splitAt2 = function(i) {
    return function(s) {
      return { before: s.substring(0, i), after: s.substring(i) };
    };
  };

  // output/Data.String.Unsafe/foreign.js
  var charAt = function(i) {
    return function(s) {
      if (i >= 0 && i < s.length) return s.charAt(i);
      throw new Error("Data.String.Unsafe.charAt: Invalid index.");
    };
  };

  // output/Data.String.CodeUnits/index.js
  var stripPrefix = function(v) {
    return function(str2) {
      var v1 = splitAt2(length4(v))(str2);
      var $20 = v1.before === v;
      if ($20) {
        return new Just(v1.after);
      }
      ;
      return Nothing.value;
    };
  };

  // output/Data.String.Common/index.js
  var $$null = function(s) {
    return s === "";
  };

  // output/Data.String.CodePoints/index.js
  var $runtime_lazy3 = function(name15, moduleName, init3) {
    var state3 = 0;
    var val;
    return function(lineNumber) {
      if (state3 === 2) return val;
      if (state3 === 1) throw new ReferenceError(name15 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state3 = 1;
      val = init3();
      state3 = 2;
      return val;
    };
  };
  var fromEnum2 = /* @__PURE__ */ fromEnum(boundedEnumChar);
  var map9 = /* @__PURE__ */ map(functorMaybe);
  var unfoldr2 = /* @__PURE__ */ unfoldr(unfoldableArray);
  var compare2 = /* @__PURE__ */ compare(ordInt);
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
  var uncons3 = function(s) {
    var v = length4(s);
    if (v === 0) {
      return Nothing.value;
    }
    ;
    if (v === 1) {
      return new Just({
        head: fromEnum2(charAt(0)(s)),
        tail: ""
      });
    }
    ;
    var cu1 = fromEnum2(charAt(1)(s));
    var cu0 = fromEnum2(charAt(0)(s));
    var $43 = isLead(cu0) && isTrail(cu1);
    if ($43) {
      return new Just({
        head: unsurrogate(cu0)(cu1),
        tail: drop3(2)(s)
      });
    }
    ;
    return new Just({
      head: cu0,
      tail: drop3(1)(s)
    });
  };
  var unconsButWithTuple = function(s) {
    return map9(function(v) {
      return new Tuple(v.head, v.tail);
    })(uncons3(s));
  };
  var toCodePointArrayFallback = function(s) {
    return unfoldr2(unconsButWithTuple)(s);
  };
  var unsafeCodePointAt0Fallback = function(s) {
    var cu0 = fromEnum2(charAt(0)(s));
    var $47 = isLead(cu0) && length4(s) > 1;
    if ($47) {
      var cu1 = fromEnum2(charAt(1)(s));
      var $48 = isTrail(cu1);
      if ($48) {
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
  var length5 = function($74) {
    return length(toCodePointArray($74));
  };
  var eqCodePoint = {
    eq: function(x) {
      return function(y) {
        return x === y;
      };
    }
  };
  var ordCodePoint = {
    compare: function(x) {
      return function(y) {
        return compare2(x)(y);
      };
    },
    Eq0: function() {
      return eqCodePoint;
    }
  };
  var codePointAtFallback = function($copy_n) {
    return function($copy_s) {
      var $tco_var_n = $copy_n;
      var $tco_done = false;
      var $tco_result;
      function $tco_loop(n, s) {
        var v = uncons3(s);
        if (v instanceof Just) {
          var $66 = n === 0;
          if ($66) {
            $tco_done = true;
            return new Just(v.value0.head);
          }
          ;
          $tco_var_n = n - 1 | 0;
          $copy_s = v.value0.tail;
          return;
        }
        ;
        $tco_done = true;
        return Nothing.value;
      }
      ;
      while (!$tco_done) {
        $tco_result = $tco_loop($tco_var_n, $copy_s);
      }
      ;
      return $tco_result;
    };
  };
  var codePointAt = function(v) {
    return function(v1) {
      if (v < 0) {
        return Nothing.value;
      }
      ;
      if (v === 0 && v1 === "") {
        return Nothing.value;
      }
      ;
      if (v === 0) {
        return new Just(unsafeCodePointAt0(v1));
      }
      ;
      return _codePointAt(codePointAtFallback)(Just.create)(Nothing.value)(unsafeCodePointAt0)(v)(v1);
    };
  };
  var boundedCodePoint = {
    bottom: 0,
    top: 1114111,
    Ord0: function() {
      return ordCodePoint;
    }
  };
  var boundedEnumCodePoint = /* @__PURE__ */ function() {
    return {
      cardinality: 1114111 + 1 | 0,
      fromEnum: function(v) {
        return v;
      },
      toEnum: function(n) {
        if (n >= 0 && n <= 1114111) {
          return new Just(n);
        }
        ;
        if (otherwise) {
          return Nothing.value;
        }
        ;
        throw new Error("Failed pattern match at Data.String.CodePoints (line 63, column 1 - line 68, column 26): " + [n.constructor.name]);
      },
      Bounded0: function() {
        return boundedCodePoint;
      },
      Enum1: function() {
        return $lazy_enumCodePoint(0);
      }
    };
  }();
  var $lazy_enumCodePoint = /* @__PURE__ */ $runtime_lazy3("enumCodePoint", "Data.String.CodePoints", function() {
    return {
      succ: defaultSucc(toEnum(boundedEnumCodePoint))(fromEnum(boundedEnumCodePoint)),
      pred: defaultPred(toEnum(boundedEnumCodePoint))(fromEnum(boundedEnumCodePoint)),
      Ord0: function() {
        return ordCodePoint;
      }
    };
  });

  // output/Parsing.String/index.js
  var fromEnum3 = /* @__PURE__ */ fromEnum(boundedEnumCodePoint);
  var mod2 = /* @__PURE__ */ mod(euclideanRingInt);
  var show12 = /* @__PURE__ */ show(showString);
  var updatePosSingle = function(v) {
    return function(cp) {
      return function(after) {
        var v1 = fromEnum3(cp);
        if (v1 === 10) {
          return {
            index: v.index + 1 | 0,
            line: v.line + 1 | 0,
            column: 1
          };
        }
        ;
        if (v1 === 13) {
          var v2 = codePointAt(0)(after);
          if (v2 instanceof Just && fromEnum3(v2.value0) === 10) {
            return {
              index: v.index + 1 | 0,
              line: v.line,
              column: v.column
            };
          }
          ;
          return {
            index: v.index + 1 | 0,
            line: v.line + 1 | 0,
            column: 1
          };
        }
        ;
        if (v1 === 9) {
          return {
            index: v.index + 1 | 0,
            line: v.line,
            column: (v.column + 8 | 0) - mod2(v.column - 1 | 0)(8) | 0
          };
        }
        ;
        return {
          index: v.index + 1 | 0,
          line: v.line,
          column: v.column + 1 | 0
        };
      };
    };
  };
  var updatePosString = function($copy_pos) {
    return function($copy_before) {
      return function($copy_after) {
        var $tco_var_pos = $copy_pos;
        var $tco_var_before = $copy_before;
        var $tco_done = false;
        var $tco_result;
        function $tco_loop(pos, before, after) {
          var v = uncons3(before);
          if (v instanceof Nothing) {
            $tco_done = true;
            return pos;
          }
          ;
          if (v instanceof Just) {
            var newPos = function() {
              if ($$null(v.value0.tail)) {
                return updatePosSingle(pos)(v.value0.head)(after);
              }
              ;
              if (otherwise) {
                return updatePosSingle(pos)(v.value0.head)(v.value0.tail);
              }
              ;
              throw new Error("Failed pattern match at Parsing.String (line 165, column 7 - line 167, column 52): ");
            }();
            $tco_var_pos = newPos;
            $tco_var_before = v.value0.tail;
            $copy_after = after;
            return;
          }
          ;
          throw new Error("Failed pattern match at Parsing.String (line 161, column 36 - line 168, column 38): " + [v.constructor.name]);
        }
        ;
        while (!$tco_done) {
          $tco_result = $tco_loop($tco_var_pos, $tco_var_before, $copy_after);
        }
        ;
        return $tco_result;
      };
    };
  };
  var eof = /* @__PURE__ */ mkFn5(function(v) {
    return function(v1) {
      return function(v2) {
        return function($$throw) {
          return function(done) {
            var $133 = $$null(v.value0);
            if ($133) {
              return done(new ParseState(v.value0, v.value1, true), unit);
            }
            ;
            return $$throw(v, new ParseError("Expected EOF", v.value1));
          };
        };
      };
    };
  });
  var consumeWith = function(f) {
    return mkFn5(function(v) {
      return function(v1) {
        return function(v2) {
          return function($$throw) {
            return function(done) {
              var v3 = f(v.value0);
              if (v3 instanceof Left) {
                return $$throw(v, new ParseError(v3.value0, v.value1));
              }
              ;
              if (v3 instanceof Right) {
                return done(new ParseState(v3.value0.remainder, updatePosString(v.value1)(v3.value0.consumed)(v3.value0.remainder), !$$null(v3.value0.consumed)), v3.value0.value);
              }
              ;
              throw new Error("Failed pattern match at Parsing.String (line 286, column 7 - line 290, column 121): " + [v3.constructor.name]);
            };
          };
        };
      };
    });
  };
  var string = function(str2) {
    return consumeWith(function(input) {
      var v = stripPrefix(str2)(input);
      if (v instanceof Just) {
        return new Right({
          value: str2,
          consumed: str2,
          remainder: v.value0
        });
      }
      ;
      return new Left("Expected " + show12(str2));
    });
  };

  // output/Data.Formatter.Parser.Utils/index.js
  var show3 = /* @__PURE__ */ show(showInt);
  var lmap2 = /* @__PURE__ */ lmap(bifunctorEither);
  var applyFirst2 = /* @__PURE__ */ applyFirst(applyParserT);
  var printPosition = function(v) {
    return "(line " + (show3(v.line) + (", col " + (show3(v.column) + ")")));
  };
  var printError = function(err) {
    return parseErrorMessage(err) + (" " + printPosition(parseErrorPosition(err)));
  };
  var runP = function(p) {
    return function(s) {
      return lmap2(printError)(runParser(s)(applyFirst2(p)(eof)));
    };
  };

  // output/Data.Formatter.Number/index.js
  var bind2 = /* @__PURE__ */ bind(bindParserT);
  var pure3 = /* @__PURE__ */ pure(applicativeParserT);
  var some2 = /* @__PURE__ */ some(alternativeParserT)(lazyParserT);
  var many2 = /* @__PURE__ */ many(alternativeParserT)(lazyParserT);
  var repeat2 = /* @__PURE__ */ repeat(monoidString);
  var $$for2 = /* @__PURE__ */ $$for(applicativeParserT)(traversableMaybe);
  var map1 = /* @__PURE__ */ map(functorMaybe);
  var max3 = /* @__PURE__ */ max(ordInt);
  var div1 = /* @__PURE__ */ div(euclideanRingInt);
  var show4 = /* @__PURE__ */ show(showInt);
  var mapFlipped2 = /* @__PURE__ */ mapFlipped(functorEither);
  var formatParser = /* @__PURE__ */ bind2(/* @__PURE__ */ optionMaybe(/* @__PURE__ */ $$try(/* @__PURE__ */ string("+"))))(function(sign2) {
    return bind2(some2(string("0")))(function(before) {
      return bind2(optionMaybe($$try(string(",0"))))(function(comma) {
        return bind2(optionMaybe($$try(string("."))))(function(dot) {
          return bind2($$for2(dot)(function(v) {
            return $$try(many2(string("0")));
          }))(function(after) {
            return bind2(optionMaybe($$try(string("a"))))(function(abbreviations) {
              return pure3({
                sign: isJust(sign2),
                before: length(before),
                comma: isJust(comma),
                after: fromMaybe(0)(map1(length)(after)),
                abbreviations: isJust(abbreviations)
              });
            });
          });
        });
      });
    });
  });
  var parseFormatString = /* @__PURE__ */ runP(formatParser);
  var format = function(v) {
    return function(num) {
      var absed = abs(num);
      var tens = function() {
        if (absed > 0) {
          return max3(floor2(log(absed) / ln10))(0);
        }
        ;
        if (otherwise) {
          return 0;
        }
        ;
        throw new Error("Failed pattern match at Data.Formatter.Number (line 100, column 5 - line 102, column 22): ");
      }();
      if (v.abbreviations) {
        var thousands = div1(tens)(3);
        var newNum = function() {
          var $118 = thousands < 1;
          if ($118) {
            return num;
          }
          ;
          return num / pow(1e3)(toNumber(thousands));
        }();
        var abbr2 = function() {
          if (thousands === 0) {
            return "";
          }
          ;
          if (thousands === 1) {
            return "K";
          }
          ;
          if (thousands === 2) {
            return "M";
          }
          ;
          if (thousands === 3) {
            return "G";
          }
          ;
          if (thousands === 4) {
            return "T";
          }
          ;
          if (thousands === 5) {
            return "P";
          }
          ;
          if (thousands === 6) {
            return "E";
          }
          ;
          if (thousands === 7) {
            return "Z";
          }
          ;
          if (thousands === 8) {
            return "Y";
          }
          ;
          if (otherwise) {
            return "10e+" + show4(thousands * 3 | 0);
          }
          ;
          throw new Error("Failed pattern match at Data.Formatter.Number (line 107, column 7 - line 117, column 53): ");
        }();
        return format({
          comma: v.comma,
          before: v.before,
          after: v.after,
          sign: v.sign,
          abbreviations: false
        })(newNum) + abbr2;
      }
      ;
      var zeros = (v.before - tens | 0) - 1 | 0;
      var factor = pow(10)(toNumber(max3(0)(v.after)));
      var rounded = round(absed * factor) / factor;
      var integer = floor(rounded);
      var leftoverDecimal = rounded - integer;
      var leftover = round(leftoverDecimal * factor);
      var leftoverWithZeros = function() {
        var leftoverString = showNumberAsInt(leftover);
        var leftoverLength = length5(leftoverString);
        var zeros$prime = repeat2("0")(v.after - leftoverLength | 0);
        return zeros$prime + leftoverString;
      }();
      var leftovers = function() {
        var $119 = v.after < 1;
        if ($119) {
          return "";
        }
        ;
        return "." + (function() {
          var $120 = leftover === 0;
          if ($120) {
            return repeat2("0")(v.after);
          }
          ;
          return "";
        }() + function() {
          var $121 = leftover > 0;
          if ($121) {
            return leftoverWithZeros;
          }
          ;
          return "";
        }());
      }();
      var addCommas = function($copy_acc) {
        return function($copy_counter) {
          return function($copy_input) {
            var $tco_var_acc = $copy_acc;
            var $tco_var_counter = $copy_counter;
            var $tco_done = false;
            var $tco_result;
            function $tco_loop(acc, counter, input) {
              var v1 = uncons(input);
              if (v1 instanceof Nothing) {
                $tco_done = true;
                return fromCharArray(acc);
              }
              ;
              if (v1 instanceof Just && counter < 3) {
                $tco_var_acc = cons(v1.value0.head)(acc);
                $tco_var_counter = counter + 1 | 0;
                $copy_input = v1.value0.tail;
                return;
              }
              ;
              $tco_var_acc = cons(",")(acc);
              $tco_var_counter = 0;
              $copy_input = input;
              return;
            }
            ;
            while (!$tco_done) {
              $tco_result = $tco_loop($tco_var_acc, $tco_var_counter, $copy_input);
            }
            ;
            return $tco_result;
          };
        };
      };
      var shownInt = function() {
        if (v.comma) {
          return addCommas([])(0)(reverse(toCharArray(repeat2("0")(zeros) + showNumberAsInt(integer))));
        }
        ;
        return repeat2("0")(zeros) + showNumberAsInt(integer);
      }();
      return function() {
        var $127 = num < 0;
        if ($127) {
          return "-";
        }
        ;
        var $128 = num > 0 && v.sign;
        if ($128) {
          return "+";
        }
        ;
        return "";
      }() + (shownInt + leftovers);
    };
  };
  var formatNumber = function(pattern2) {
    return function(number) {
      return mapFlipped2(parseFormatString(pattern2))(flip(format)(number));
    };
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
  var size2 = function(v) {
    if (v instanceof Leaf) {
      return 0;
    }
    ;
    if (v instanceof Two) {
      return (1 + size2(v.value0) | 0) + size2(v.value3) | 0;
    }
    ;
    if (v instanceof Three) {
      return ((2 + size2(v.value0) | 0) + size2(v.value3) | 0) + size2(v.value6) | 0;
    }
    ;
    throw new Error("Failed pattern match at Data.Map.Internal (line 705, column 1 - line 705, column 35): " + [v.constructor.name]);
  };
  var singleton8 = function(k) {
    return function(v) {
      return new Two(Leaf.value, k, v, Leaf.value);
    };
  };
  var toUnfoldable3 = function(dictUnfoldable) {
    var unfoldr3 = unfoldr(dictUnfoldable);
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
              $copy_v = new Cons(v.value0.value0, new Cons(singleton8(v.value0.value1)(v.value0.value2), new Cons(v.value0.value3, v.value1)));
              return;
            }
            ;
            if (v.value0 instanceof Three) {
              $copy_v = new Cons(v.value0.value0, new Cons(singleton8(v.value0.value1)(v.value0.value2), new Cons(v.value0.value3, new Cons(singleton8(v.value0.value4)(v.value0.value5), new Cons(v.value0.value6, v.value1)))));
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
      return unfoldr3(go2)(new Cons(m, Nil.value));
    };
  };
  var toUnfoldable1 = /* @__PURE__ */ toUnfoldable3(unfoldableList);
  var lookup2 = function(dictOrd) {
    var compare4 = compare(dictOrd);
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
            var v2 = compare4(k)(v.value1);
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
            var v3 = compare4(k)(v.value1);
            if (v3 instanceof EQ) {
              $tco_done = true;
              return new Just(v.value2);
            }
            ;
            var v4 = compare4(k)(v.value4);
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
  var member = function(dictOrd) {
    var lookup1 = lookup2(dictOrd);
    return function(k) {
      return function(m) {
        return isJust(lookup1(k)(m));
      };
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
  var insert2 = function(dictOrd) {
    var fromZipper1 = fromZipper(dictOrd);
    var compare4 = compare(dictOrd);
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
                var v3 = compare4(k)(v2.value1);
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
                var v3 = compare4(k)(v2.value1);
                if (v3 instanceof EQ) {
                  $tco_done1 = true;
                  return fromZipper1(v1)(new Three(v2.value0, k, v, v2.value3, v2.value4, v2.value5, v2.value6));
                }
                ;
                var v4 = compare4(k)(v2.value4);
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
    var compare4 = compare(dictOrd);
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
              var v = compare4(k)(m.value1);
              if (m.value3 instanceof Leaf && v instanceof EQ) {
                $tco_done3 = true;
                return new Just(new Tuple(m.value2, up(ctx)(Leaf.value)));
              }
              ;
              if (v instanceof EQ) {
                var max10 = maxNode(m.value0);
                $tco_done3 = true;
                return new Just(new Tuple(m.value2, removeMaxNode(new Cons(new TwoLeft(max10.key, max10.value, m.value3), ctx))(m.value0)));
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
              var v = compare4(k)(m.value4);
              var v3 = compare4(k)(m.value1);
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
                var max10 = maxNode(m.value0);
                $tco_done3 = true;
                return new Just(new Tuple(m.value2, removeMaxNode(new Cons(new ThreeLeft(max10.key, max10.value, m.value3, m.value4, m.value5, m.value6), ctx))(m.value0)));
              }
              ;
              if (v instanceof EQ) {
                var max10 = maxNode(m.value3);
                $tco_done3 = true;
                return new Just(new Tuple(m.value5, removeMaxNode(new Cons(new ThreeMiddle(m.value0, m.value1, m.value2, max10.key, max10.value, m.value6), ctx))(m.value3)));
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
  var keys2 = /* @__PURE__ */ function() {
    return foldrWithIndex2(function(k) {
      return function(v) {
        return function(acc) {
          return new Cons(k, acc);
        };
      };
    })(Nil.value);
  }();
  var empty3 = /* @__PURE__ */ function() {
    return Leaf.value;
  }();
  var fromFoldable3 = function(dictOrd) {
    var insert1 = insert2(dictOrd);
    return function(dictFoldable) {
      return foldl(dictFoldable)(function(m) {
        return function(v) {
          return insert1(v.value0)(v.value1)(m);
        };
      })(empty3);
    };
  };
  var filterWithKey = function(dictOrd) {
    var fromFoldable1 = fromFoldable3(dictOrd)(foldableList2);
    return function(predicate) {
      var $927 = filter2(uncurry(predicate));
      return function($928) {
        return fromFoldable1($927(toUnfoldable1($928)));
      };
    };
  };
  var filter4 = function(dictOrd) {
    var filterWithKey1 = filterWithKey(dictOrd);
    return function(predicate) {
      return filterWithKey1($$const(predicate));
    };
  };
  var $$delete2 = function(dictOrd) {
    var pop1 = pop(dictOrd);
    return function(k) {
      return function(m) {
        return maybe(m)(snd)(pop1(k)(m));
      };
    };
  };
  var alter = function(dictOrd) {
    var lookup1 = lookup2(dictOrd);
    var delete1 = $$delete2(dictOrd);
    var insert1 = insert2(dictOrd);
    return function(f) {
      return function(k) {
        return function(m) {
          var v = f(lookup1(k)(m));
          if (v instanceof Nothing) {
            return delete1(k)(m);
          }
          ;
          if (v instanceof Just) {
            return insert1(k)(v.value0)(m);
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

  // output/Data.Set/index.js
  var foldMap2 = /* @__PURE__ */ foldMap(foldableList);
  var foldl2 = /* @__PURE__ */ foldl(foldableList);
  var foldr4 = /* @__PURE__ */ foldr(foldableList);
  var $$Set = function(x) {
    return x;
  };
  var toList2 = function(v) {
    return keys2(v);
  };
  var fromMap = $$Set;
  var foldableSet = {
    foldMap: function(dictMonoid) {
      var foldMap12 = foldMap2(dictMonoid);
      return function(f) {
        var $129 = foldMap12(f);
        return function($130) {
          return $129(toList2($130));
        };
      };
    },
    foldl: function(f) {
      return function(x) {
        var $131 = foldl2(f)(x);
        return function($132) {
          return $131(toList2($132));
        };
      };
    },
    foldr: function(f) {
      return function(x) {
        var $133 = foldr4(f)(x);
        return function($134) {
          return $133(toList2($134));
        };
      };
    }
  };

  // output/Data.Map/index.js
  var keys3 = /* @__PURE__ */ function() {
    var $38 = $$void(functorMap);
    return function($39) {
      return fromMap($38($39));
    };
  }();

  // output/Effect.Console/foreign.js
  var log2 = function(s) {
    return function() {
      console.log(s);
    };
  };

  // output/Effect.Console/index.js
  var logShow = function(dictShow) {
    var show8 = show(dictShow);
    return function(a) {
      return log2(show8(a));
    };
  };

  // output/Effect.Now/foreign.js
  function now() {
    return Date.now();
  }

  // output/Effect.Timer/foreign.js
  function setIntervalImpl(ms) {
    return function(fn) {
      return function() {
        return setInterval(fn, ms);
      };
    };
  }
  function clearIntervalImpl(id3) {
    return function() {
      clearInterval(id3);
    };
  }

  // output/Effect.Timer/index.js
  var setInterval2 = setIntervalImpl;
  var clearInterval2 = clearIntervalImpl;

  // output/Graphics.Canvas/foreign.js
  function getCanvasElementByIdImpl(id3, Just2, Nothing2) {
    return function() {
      var el = document.getElementById(id3);
      if (el && el instanceof HTMLCanvasElement) {
        return Just2(el);
      } else {
        return Nothing2;
      }
    };
  }
  function getContext2D(c) {
    return function() {
      return c.getContext("2d");
    };
  }
  function getCanvasWidth(canvas) {
    return function() {
      return canvas.width;
    };
  }
  function getCanvasHeight(canvas) {
    return function() {
      return canvas.height;
    };
  }
  function setFillStyle(ctx) {
    return function(style) {
      return function() {
        ctx.fillStyle = style;
      };
    };
  }
  function setStrokeStyle(ctx) {
    return function(style) {
      return function() {
        ctx.strokeStyle = style;
      };
    };
  }
  function beginPath(ctx) {
    return function() {
      ctx.beginPath();
    };
  }
  function stroke(ctx) {
    return function() {
      ctx.stroke();
    };
  }
  function fill(ctx) {
    return function() {
      ctx.fill();
    };
  }
  function rect(ctx) {
    return function(r) {
      return function() {
        ctx.rect(r.x, r.y, r.width, r.height);
      };
    };
  }
  function clearRect(ctx) {
    return function(r) {
      return function() {
        ctx.clearRect(r.x, r.y, r.width, r.height);
      };
    };
  }
  function setTextAlignImpl(ctx) {
    return function(textAlign) {
      return function() {
        ctx.textAlign = textAlign;
      };
    };
  }
  function setTextBaselineImpl(ctx) {
    return function(textBaseline) {
      return function() {
        ctx.textBaseline = textBaseline;
      };
    };
  }
  function setFont(ctx) {
    return function(fontspec) {
      return function() {
        ctx.font = fontspec;
      };
    };
  }
  function fillText(ctx) {
    return function(text5) {
      return function(x) {
        return function(y) {
          return function() {
            ctx.fillText(text5, x, y);
          };
        };
      };
    };
  }

  // output/Graphics.Canvas/index.js
  var BaselineTop = /* @__PURE__ */ function() {
    function BaselineTop2() {
    }
    ;
    BaselineTop2.value = new BaselineTop2();
    return BaselineTop2;
  }();
  var BaselineHanging = /* @__PURE__ */ function() {
    function BaselineHanging2() {
    }
    ;
    BaselineHanging2.value = new BaselineHanging2();
    return BaselineHanging2;
  }();
  var BaselineMiddle = /* @__PURE__ */ function() {
    function BaselineMiddle2() {
    }
    ;
    BaselineMiddle2.value = new BaselineMiddle2();
    return BaselineMiddle2;
  }();
  var BaselineAlphabetic = /* @__PURE__ */ function() {
    function BaselineAlphabetic2() {
    }
    ;
    BaselineAlphabetic2.value = new BaselineAlphabetic2();
    return BaselineAlphabetic2;
  }();
  var BaselineIdeographic = /* @__PURE__ */ function() {
    function BaselineIdeographic2() {
    }
    ;
    BaselineIdeographic2.value = new BaselineIdeographic2();
    return BaselineIdeographic2;
  }();
  var BaselineBottom = /* @__PURE__ */ function() {
    function BaselineBottom2() {
    }
    ;
    BaselineBottom2.value = new BaselineBottom2();
    return BaselineBottom2;
  }();
  var AlignLeft = /* @__PURE__ */ function() {
    function AlignLeft2() {
    }
    ;
    AlignLeft2.value = new AlignLeft2();
    return AlignLeft2;
  }();
  var AlignRight = /* @__PURE__ */ function() {
    function AlignRight2() {
    }
    ;
    AlignRight2.value = new AlignRight2();
    return AlignRight2;
  }();
  var AlignCenter = /* @__PURE__ */ function() {
    function AlignCenter2() {
    }
    ;
    AlignCenter2.value = new AlignCenter2();
    return AlignCenter2;
  }();
  var AlignStart = /* @__PURE__ */ function() {
    function AlignStart2() {
    }
    ;
    AlignStart2.value = new AlignStart2();
    return AlignStart2;
  }();
  var AlignEnd = /* @__PURE__ */ function() {
    function AlignEnd2() {
    }
    ;
    AlignEnd2.value = new AlignEnd2();
    return AlignEnd2;
  }();
  var strokePath = function(ctx) {
    return function(path) {
      return function __do3() {
        beginPath(ctx)();
        var a = path();
        stroke(ctx)();
        return a;
      };
    };
  };
  var setTextBaseline = function(ctx) {
    return function(textbaseline) {
      var toString3 = function(v) {
        if (v instanceof BaselineTop) {
          return "top";
        }
        ;
        if (v instanceof BaselineHanging) {
          return "hanging";
        }
        ;
        if (v instanceof BaselineMiddle) {
          return "middle";
        }
        ;
        if (v instanceof BaselineAlphabetic) {
          return "alphabetic";
        }
        ;
        if (v instanceof BaselineIdeographic) {
          return "ideographic";
        }
        ;
        if (v instanceof BaselineBottom) {
          return "bottom";
        }
        ;
        throw new Error("Failed pattern match at Graphics.Canvas (line 577, column 5 - line 577, column 33): " + [v.constructor.name]);
      };
      return setTextBaselineImpl(ctx)(toString3(textbaseline));
    };
  };
  var setTextAlign = function(ctx) {
    return function(textalign) {
      var toString3 = function(v) {
        if (v instanceof AlignLeft) {
          return "left";
        }
        ;
        if (v instanceof AlignRight) {
          return "right";
        }
        ;
        if (v instanceof AlignCenter) {
          return "center";
        }
        ;
        if (v instanceof AlignStart) {
          return "start";
        }
        ;
        if (v instanceof AlignEnd) {
          return "end";
        }
        ;
        throw new Error("Failed pattern match at Graphics.Canvas (line 531, column 5 - line 531, column 32): " + [v.constructor.name]);
      };
      return setTextAlignImpl(ctx)(toString3(textalign));
    };
  };
  var getCanvasElementById = function(elId) {
    return getCanvasElementByIdImpl(elId, Just.create, Nothing.value);
  };
  var getCanvasDimensions = function(ce) {
    return function __do3() {
      var w = getCanvasWidth(ce)();
      var h = getCanvasHeight(ce)();
      return {
        width: w,
        height: h
      };
    };
  };
  var fillPath = function(ctx) {
    return function(path) {
      return function __do3() {
        beginPath(ctx)();
        var a = path();
        fill(ctx)();
        return a;
      };
    };
  };

  // output/Graphics.Canvas.Utils/foreign.js
  function toCanvasElementImpl(el, Just2, Nothing2) {
    if (el && el instanceof HTMLCanvasElement) {
      return Just2(el);
    } else {
      return Nothing2;
    }
  }

  // output/Graphics.Canvas.Utils/index.js
  var toCanvasElement = function(e) {
    return toCanvasElementImpl(e, Just.create, Nothing.value);
  };

  // output/Graphics.Path2D/foreign.js
  function fromPathString(s) {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", "0");
    svg.setAttribute("height", "0");
    svg.style.position = "absolute";
    svg.style.visibility = "hidden";
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", s);
    svg.appendChild(path);
    document.body.appendChild(svg);
    const bbox = path.getBBox();
    document.body.removeChild(svg);
    return {
      path: new Path2D(s),
      data: s,
      bbox
    };
  }
  function _fillPath2D(ctx, p, rect2) {
    return function() {
      const scaleWidth = rect2.width / p.bbox.width;
      const scaleHeight = rect2.height / p.bbox.height;
      const scale2 = Math.min(scaleWidth, scaleHeight);
      const translateX = rect2.x + (rect2.width - p.bbox.width * scale2) / 2 - p.bbox.x * scale2;
      const translateY = rect2.y + (rect2.height - p.bbox.height * scale2) / 2 - p.bbox.y * scale2;
      ctx.save();
      ctx.translate(translateX, translateY);
      ctx.scale(scale2, scale2);
      ctx.fill(p.path);
      ctx.restore();
    };
  }

  // output/Graphics.Path2D/index.js
  var fillPath2D = /* @__PURE__ */ runFn3(_fillPath2D);

  // output/Mines.Charge/index.js
  var min3 = /* @__PURE__ */ min(ordInt);
  var NoMines = /* @__PURE__ */ function() {
    function NoMines2() {
    }
    ;
    NoMines2.value = new NoMines2();
    return NoMines2;
  }();
  var Charge = /* @__PURE__ */ function() {
    function Charge2(value0, value1, value22, value32) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
      this.value3 = value32;
    }
    ;
    Charge2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return function(value32) {
            return new Charge2(value0, value1, value22, value32);
          };
        };
      };
    };
    return Charge2;
  }();
  var semigroupMineCharge = {
    append: function(v) {
      return function(v1) {
        if (v instanceof NoMines) {
          return v1;
        }
        ;
        if (v1 instanceof NoMines) {
          return v;
        }
        ;
        if (v instanceof Charge && v1 instanceof Charge) {
          return new Charge(v.value0 + v1.value0 | 0, v.value1 + v1.value1 | 0, v.value2 + v1.value2 | 0, v.value3 + v1.value3 | 0);
        }
        ;
        throw new Error("Failed pattern match at Mines.Charge (line 12, column 1 - line 15, column 102): " + [v.constructor.name, v1.constructor.name]);
      };
    }
  };
  var redCharge = function(n) {
    return new Charge(0, n, 0, 0);
  };
  var normalizeCharge = function(v) {
    if (v instanceof NoMines) {
      return NoMines.value;
    }
    ;
    if (v instanceof Charge) {
      var m = min3(min3(v.value1)(v.value2))(v.value3);
      var r$prime = v.value1 - m | 0;
      var g$prime = v.value2 - m | 0;
      var b$prime = v.value3 - m | 0;
      return new Charge(v.value0, r$prime, g$prime, b$prime);
    }
    ;
    throw new Error("Failed pattern match at Mines.Charge (line 48, column 1 - line 48, column 44): " + [v.constructor.name]);
  };
  var negateCharge = function(v) {
    if (v instanceof NoMines) {
      return NoMines.value;
    }
    ;
    if (v instanceof Charge) {
      return new Charge(-v.value0 | 0, -v.value1 | 0, -v.value2 | 0, -v.value3 | 0);
    }
    ;
    throw new Error("Failed pattern match at Mines.Charge (line 20, column 1 - line 20, column 41): " + [v.constructor.name]);
  };
  var hasColor = function(v) {
    if (v instanceof NoMines) {
      return false;
    }
    ;
    if (v instanceof Charge) {
      return v.value1 !== 0 || (v.value2 !== 0 || v.value3 !== 0);
    }
    ;
    throw new Error("Failed pattern match at Mines.Charge (line 43, column 1 - line 43, column 34): " + [v.constructor.name]);
  };
  var hasClassical = function(v) {
    if (v instanceof NoMines) {
      return false;
    }
    ;
    if (v instanceof Charge) {
      return v.value0 !== 0;
    }
    ;
    throw new Error("Failed pattern match at Mines.Charge (line 39, column 1 - line 39, column 38): " + [v.constructor.name]);
  };
  var greenCharge = function(n) {
    return new Charge(0, 0, n, 0);
  };
  var eqMineCharge = {
    eq: function(x) {
      return function(y) {
        if (x instanceof NoMines && y instanceof NoMines) {
          return true;
        }
        ;
        if (x instanceof Charge && y instanceof Charge) {
          return x.value0 === y.value0 && x.value1 === y.value1 && x.value2 === y.value2 && x.value3 === y.value3;
        }
        ;
        return false;
      };
    }
  };
  var eq13 = /* @__PURE__ */ eq(eqMineCharge);
  var equalModCancellation = function(v) {
    return function(v1) {
      if (v instanceof NoMines && v1 instanceof NoMines) {
        return true;
      }
      ;
      if (v instanceof NoMines) {
        return false;
      }
      ;
      if (v1 instanceof NoMines) {
        return false;
      }
      ;
      return eq13(normalizeCharge(v))(normalizeCharge(v1));
    };
  };
  var classicalCharge = function(n) {
    return new Charge(n, 0, 0, 0);
  };
  var blueCharge = function(n) {
    return new Charge(0, 0, 0, n);
  };

  // output/Color/index.js
  var clamp2 = /* @__PURE__ */ clamp(ordInt);
  var max4 = /* @__PURE__ */ max(ordInt);
  var min4 = /* @__PURE__ */ min(ordInt);
  var clamp1 = /* @__PURE__ */ clamp(ordNumber);
  var HSLA = /* @__PURE__ */ function() {
    function HSLA2(value0, value1, value22, value32) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
      this.value3 = value32;
    }
    ;
    HSLA2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return function(value32) {
            return new HSLA2(value0, value1, value22, value32);
          };
        };
      };
    };
    return HSLA2;
  }();
  var modPos = function(x) {
    return function(y) {
      return remainder(remainder(x)(y) + y)(y);
    };
  };
  var rgba = function(red$prime) {
    return function(green$prime) {
      return function(blue$prime) {
        return function(alpha) {
          var red = clamp2(0)(255)(red$prime);
          var r = toNumber(red) / 255;
          var green = clamp2(0)(255)(green$prime);
          var g = toNumber(green) / 255;
          var blue = clamp2(0)(255)(blue$prime);
          var maxChroma = max4(max4(red)(green))(blue);
          var minChroma = min4(min4(red)(green))(blue);
          var chroma = maxChroma - minChroma | 0;
          var chroma$prime = toNumber(chroma) / 255;
          var lightness = toNumber(maxChroma + minChroma | 0) / (255 * 2);
          var saturation = function() {
            if (chroma === 0) {
              return 0;
            }
            ;
            if (otherwise) {
              return chroma$prime / (1 - abs(2 * lightness - 1));
            }
            ;
            throw new Error("Failed pattern match at Color (line 160, column 3 - line 162, column 64): ");
          }();
          var b = toNumber(blue) / 255;
          var hue$prime = function(v) {
            if (v === 0) {
              return 0;
            }
            ;
            if (maxChroma === red) {
              return modPos((g - b) / chroma$prime)(6);
            }
            ;
            if (maxChroma === green) {
              return (b - r) / chroma$prime + 2;
            }
            ;
            if (otherwise) {
              return (r - g) / chroma$prime + 4;
            }
            ;
            throw new Error("Failed pattern match at Color (line 150, column 3 - line 150, column 15): " + [v.constructor.name]);
          };
          var hue = 60 * hue$prime(chroma);
          return new HSLA(hue, saturation, lightness, alpha);
        };
      };
    };
  };
  var rgb = function(r) {
    return function(g) {
      return function(b) {
        return rgba(r)(g)(b)(1);
      };
    };
  };
  var hsla = function(h) {
    return function(s) {
      return function(l) {
        return function(a) {
          var s$prime = clamp1(0)(1)(s);
          var l$prime = clamp1(0)(1)(l);
          var a$prime = clamp1(0)(1)(a);
          return new HSLA(h, s$prime, l$prime, a$prime);
        };
      };
    };
  };
  var hsva = function(v) {
    return function(v1) {
      return function(v2) {
        return function(v3) {
          var s = v1;
          if (v2 === 0) {
            return hsla(v)(s / (2 - s))(0)(v3);
          }
          ;
          if (v1 === 0 && v2 === 1) {
            return hsla(v)(0)(1)(v3);
          }
          ;
          var tmp = (2 - v1) * v2;
          var s = v1 * v2 / function() {
            var $94 = tmp < 1;
            if ($94) {
              return tmp;
            }
            ;
            return 2 - tmp;
          }();
          var l = tmp / 2;
          return hsla(v)(s)(l)(v3);
        };
      };
    };
  };
  var hsv = function(h) {
    return function(s) {
      return function(v) {
        return hsva(h)(s)(v)(1);
      };
    };
  };
  var lighten = function(f) {
    return function(v) {
      return hsla(v.value0)(v.value1)(v.value2 + f)(v.value3);
    };
  };
  var rotateHue = function(angle) {
    return function(v) {
      return hsla(v.value0 + angle)(v.value1)(v.value2)(v.value3);
    };
  };
  var clipHue = function(v) {
    var $124 = 360 === v;
    if ($124) {
      return v;
    }
    ;
    return modPos(v)(360);
  };
  var toRGBA$prime = function(v) {
    var h$prime = clipHue(v.value0) / 60;
    var chr = (1 - abs(2 * v.value2 - 1)) * v.value1;
    var m = v.value2 - chr / 2;
    var x = chr * (1 - abs(remainder(h$prime)(2) - 1));
    var col = function() {
      if (h$prime < 1) {
        return {
          r: chr,
          g: x,
          b: 0
        };
      }
      ;
      if (1 <= h$prime && h$prime < 2) {
        return {
          r: x,
          g: chr,
          b: 0
        };
      }
      ;
      if (2 <= h$prime && h$prime < 3) {
        return {
          r: 0,
          g: chr,
          b: x
        };
      }
      ;
      if (3 <= h$prime && h$prime < 4) {
        return {
          r: 0,
          g: x,
          b: chr
        };
      }
      ;
      if (4 <= h$prime && h$prime < 5) {
        return {
          r: x,
          g: 0,
          b: chr
        };
      }
      ;
      if (otherwise) {
        return {
          r: chr,
          g: 0,
          b: x
        };
      }
      ;
      throw new Error("Failed pattern match at Color (line 356, column 3 - line 362, column 43): ");
    }();
    return {
      r: col.r + m,
      g: col.g + m,
      b: col.b + m,
      a: v.value3
    };
  };
  var toRGBA = function(col) {
    var c = toRGBA$prime(col);
    var g = round2(255 * c.g);
    var r = round2(255 * c.r);
    var b = round2(255 * c.b);
    return {
      r,
      g,
      b,
      a: c.a
    };
  };
  var toHexString = function(color) {
    var toHex = function(num) {
      var repr = toStringAs(hexadecimal)(num);
      var $152 = length5(repr) === 1;
      if ($152) {
        return "0" + repr;
      }
      ;
      return repr;
    };
    var c = toRGBA(color);
    var alpha = function() {
      if (c.a === 1) {
        return "";
      }
      ;
      if (otherwise) {
        return toHex(round2(255 * c.a));
      }
      ;
      throw new Error("Failed pattern match at Color (line 429, column 3 - line 431, column 46): ");
    }();
    return "#" + (toHex(c.r) + (toHex(c.g) + (toHex(c.b) + alpha)));
  };

  // output/Control.Monad.Gen.Class/index.js
  var chooseFloat = function(dict) {
    return dict.chooseFloat;
  };

  // output/Control.Monad.State.Trans/index.js
  var runStateT = function(v) {
    return v;
  };
  var functorStateT = function(dictFunctor) {
    var map20 = map(dictFunctor);
    return {
      map: function(f) {
        return function(v) {
          return function(s) {
            return map20(function(v1) {
              return new Tuple(f(v1.value0), v1.value1);
            })(v(s));
          };
        };
      }
    };
  };
  var monadStateT = function(dictMonad) {
    return {
      Applicative0: function() {
        return applicativeStateT(dictMonad);
      },
      Bind1: function() {
        return bindStateT(dictMonad);
      }
    };
  };
  var bindStateT = function(dictMonad) {
    var bind8 = bind(dictMonad.Bind1());
    return {
      bind: function(v) {
        return function(f) {
          return function(s) {
            return bind8(v(s))(function(v1) {
              var v3 = f(v1.value0);
              return v3(v1.value1);
            });
          };
        };
      },
      Apply0: function() {
        return applyStateT(dictMonad);
      }
    };
  };
  var applyStateT = function(dictMonad) {
    var functorStateT1 = functorStateT(dictMonad.Bind1().Apply0().Functor0());
    return {
      apply: ap(monadStateT(dictMonad)),
      Functor0: function() {
        return functorStateT1;
      }
    };
  };
  var applicativeStateT = function(dictMonad) {
    var pure9 = pure(dictMonad.Applicative0());
    return {
      pure: function(a) {
        return function(s) {
          return pure9(new Tuple(a, s));
        };
      },
      Apply0: function() {
        return applyStateT(dictMonad);
      }
    };
  };
  var monadRecStateT = function(dictMonadRec) {
    var Monad0 = dictMonadRec.Monad0();
    var bind8 = bind(Monad0.Bind1());
    var pure9 = pure(Monad0.Applicative0());
    var tailRecM3 = tailRecM(dictMonadRec);
    var monadStateT1 = monadStateT(Monad0);
    return {
      tailRecM: function(f) {
        return function(a) {
          var f$prime = function(v) {
            var v1 = f(v.value0);
            return bind8(v1(v.value1))(function(v2) {
              return pure9(function() {
                if (v2.value0 instanceof Loop) {
                  return new Loop(new Tuple(v2.value0.value0, v2.value1));
                }
                ;
                if (v2.value0 instanceof Done) {
                  return new Done(new Tuple(v2.value0.value0, v2.value1));
                }
                ;
                throw new Error("Failed pattern match at Control.Monad.State.Trans (line 87, column 16 - line 89, column 40): " + [v2.value0.constructor.name]);
              }());
            });
          };
          return function(s) {
            return tailRecM3(f$prime)(new Tuple(a, s));
          };
        };
      },
      Monad0: function() {
        return monadStateT1;
      }
    };
  };
  var monadStateStateT = function(dictMonad) {
    var pure9 = pure(dictMonad.Applicative0());
    var monadStateT1 = monadStateT(dictMonad);
    return {
      state: function(f) {
        return function($200) {
          return pure9(f($200));
        };
      },
      Monad0: function() {
        return monadStateT1;
      }
    };
  };

  // output/Control.Monad.State/index.js
  var unwrap5 = /* @__PURE__ */ unwrap();
  var runState = function(v) {
    return function($18) {
      return unwrap5(v($18));
    };
  };

  // output/Effect.Random/foreign.js
  var random = Math.random;

  // output/Effect.Random/index.js
  var randomInt = function(low2) {
    return function(high2) {
      return function __do3() {
        var n = random();
        var asNumber = (toNumber(high2) - toNumber(low2) + 1) * n + toNumber(low2);
        return floor2(asNumber);
      };
    };
  };

  // output/Random.LCG/index.js
  var mod3 = /* @__PURE__ */ mod(euclideanRingInt);
  var fromJust5 = /* @__PURE__ */ fromJust();
  var unSeed = function(v) {
    return v;
  };
  var seedMin = 1;
  var lcgM = 2147483647;
  var seedMax = /* @__PURE__ */ function() {
    return lcgM - 1 | 0;
  }();
  var mkSeed = function(x) {
    var ensureBetween = function(min9) {
      return function(max10) {
        return function(n) {
          var rangeSize = max10 - min9 | 0;
          var n$prime = mod3(n)(rangeSize);
          var $25 = n$prime < min9;
          if ($25) {
            return n$prime + max10 | 0;
          }
          ;
          return n$prime;
        };
      };
    };
    return ensureBetween(seedMin)(seedMax)(x);
  };
  var randomSeed = /* @__PURE__ */ map(functorEffect)(mkSeed)(/* @__PURE__ */ randomInt(seedMin)(seedMax));
  var lcgC = 0;
  var lcgA = 48271;
  var lcgPerturb = function(d) {
    return function(v) {
      return fromJust5(fromNumber(remainder(toNumber(lcgA) * toNumber(v) + toNumber(d))(toNumber(lcgM))));
    };
  };
  var lcgNext = /* @__PURE__ */ lcgPerturb(lcgC);

  // output/Control.Monad.Gen.Trans/index.js
  var map10 = /* @__PURE__ */ map(functorTuple);
  var toUnfoldable4 = /* @__PURE__ */ toUnfoldable2(unfoldableArray);
  var add2 = /* @__PURE__ */ add(semiringNumber);
  var mul2 = /* @__PURE__ */ mul(semiringNumber);
  var top3 = /* @__PURE__ */ top(boundedInt);
  var map12 = /* @__PURE__ */ map(functorArray);
  var comparing2 = /* @__PURE__ */ comparing(ordInt);
  var min5 = /* @__PURE__ */ min(ordNumber);
  var max5 = /* @__PURE__ */ max(ordNumber);
  var monadRecGenT = function(dictMonadRec) {
    return monadRecStateT(dictMonadRec);
  };
  var monadGenT = function(dictMonad) {
    return monadStateT(dictMonad);
  };
  var functorGenT = function(dictFunctor) {
    return functorStateT(dictFunctor);
  };
  var bindGenT = function(dictMonad) {
    return bindStateT(dictMonad);
  };
  var applyGenT = function(dictMonad) {
    return applyStateT(dictMonad);
  };
  var applicativeGenT = function(dictMonad) {
    return applicativeStateT(dictMonad);
  };
  var runGenT$prime = function(v) {
    return v;
  };
  var runGenT = function(gen) {
    return function(s) {
      return runStateT(runGenT$prime(gen))(s);
    };
  };
  var stateful = function(f) {
    return function(s) {
      return runGenT(f(s))(s);
    };
  };
  var sized = function(f) {
    return stateful(function(s) {
      return f(s.size);
    });
  };
  var runGen = function($309) {
    return runState(runGenT$prime($309));
  };
  var resizeGenT = function(dictMonad) {
    var map25 = map(dictMonad.Bind1().Apply0().Functor0());
    return function(sz) {
      return function(g) {
        return function(v) {
          return map25(map10(function(v1) {
            return {
              newSeed: v1.newSeed,
              size: v.size
            };
          }))(runGenT(g)({
            newSeed: v.newSeed,
            size: sz
          }));
        };
      };
    };
  };
  var replicateMRec = function(dictMonadRec) {
    var Monad0 = dictMonadRec.Monad0();
    var pure9 = pure(Monad0.Applicative0());
    var mapFlipped3 = mapFlipped(Monad0.Bind1().Apply0().Functor0());
    var tailRecM3 = tailRecM(dictMonadRec);
    return function(v) {
      return function(v1) {
        if (v <= 0) {
          return pure9(Nil.value);
        }
        ;
        var go2 = function(v2) {
          if (v2.value1 === 0) {
            return pure9(new Done(v2.value0));
          }
          ;
          return mapFlipped3(v1)(function(x) {
            return new Loop(new Tuple(new Cons(x, v2.value0), v2.value1 - 1 | 0));
          });
        };
        return tailRecM3(go2)(new Tuple(Nil.value, v));
      };
    };
  };
  var listOf = function(dictMonadRec) {
    return replicateMRec(monadRecGenT(dictMonadRec));
  };
  var vectorOf = function(dictMonadRec) {
    var map25 = map(functorGenT(dictMonadRec.Monad0().Bind1().Apply0().Functor0()));
    var listOf1 = listOf(dictMonadRec);
    return function(k) {
      return function(g) {
        return map25(toUnfoldable4)(listOf1(k)(g));
      };
    };
  };
  var lcgStep = function(dictMonad) {
    var f = function(s) {
      return new Tuple(unSeed(s.newSeed), function() {
        var $297 = {};
        for (var $298 in s) {
          if ({}.hasOwnProperty.call(s, $298)) {
            $297[$298] = s[$298];
          }
          ;
        }
        ;
        $297.newSeed = lcgNext(s.newSeed);
        return $297;
      }());
    };
    return state(monadStateStateT(dictMonad))(f);
  };
  var uniform = function(dictMonad) {
    return map(functorGenT(dictMonad.Bind1().Apply0().Functor0()))(function(n) {
      return toNumber(n) / toNumber(lcgM);
    })(lcgStep(dictMonad));
  };
  var chooseInt$prime = function(dictMonad) {
    var map25 = map(functorGenT(dictMonad.Bind1().Apply0().Functor0()));
    var lcgStep1 = lcgStep(dictMonad);
    var apply2 = apply(applyGenT(dictMonad));
    return function(a) {
      return function(b) {
        var numB = toNumber(b);
        var numA = toNumber(a);
        var clamp3 = function(x) {
          return numA + remainder(x)(numB - numA + 1);
        };
        var choose31BitPosNumber = map25(toNumber)(lcgStep1);
        var choose32BitPosNumber = apply2(map25(add2)(choose31BitPosNumber))(map25(mul2(2))(choose31BitPosNumber));
        return map25(function($320) {
          return floor2(clamp3($320));
        })(choose32BitPosNumber);
      };
    };
  };
  var chooseInt = function(dictMonad) {
    var chooseInt$prime1 = chooseInt$prime(dictMonad);
    return function(a) {
      return function(b) {
        var $300 = a <= b;
        if ($300) {
          return chooseInt$prime1(a)(b);
        }
        ;
        return chooseInt$prime1(b)(a);
      };
    };
  };
  var shuffle = function(dictMonadRec) {
    var Monad0 = dictMonadRec.Monad0();
    var bind8 = bind(bindGenT(Monad0));
    var vectorOf1 = vectorOf(dictMonadRec);
    var chooseInt1 = chooseInt(Monad0);
    var pure9 = pure(applicativeGenT(Monad0));
    return function(xs) {
      return bind8(vectorOf1(length(xs))(chooseInt1(0)(top3)))(function(ns) {
        return pure9(map12(snd)(sortBy(comparing2(fst))(zip(ns)(xs))));
      });
    };
  };
  var choose = function(dictMonad) {
    var map25 = map(functorGenT(dictMonad.Bind1().Apply0().Functor0()));
    var uniform1 = uniform(dictMonad);
    return function(a) {
      return function(b) {
        var unscale = function(v) {
          return v * 2;
        };
        var scale2 = function(v) {
          return v * 0.5;
        };
        var min$prime = scale2(min5(a)(b));
        var max$prime = scale2(max5(a)(b));
        return map25(function() {
          var $321 = add2(min$prime);
          var $322 = mul2(max$prime - min$prime);
          return function($323) {
            return unscale($321($322($323)));
          };
        }())(uniform1);
      };
    };
  };
  var monadGenGenT = function(dictMonad) {
    var resizeGenT1 = resizeGenT(dictMonad);
    var monadGenT1 = monadGenT(dictMonad);
    return {
      chooseInt: chooseInt(dictMonad),
      chooseFloat: choose(dictMonad),
      chooseBool: map(functorGenT(dictMonad.Bind1().Apply0().Functor0()))(function(v) {
        return v < 0.5;
      })(uniform(dictMonad)),
      resize: function(f) {
        return function(g) {
          return sized(function(s) {
            return resizeGenT1(f(s))(g);
          });
        };
      },
      sized,
      Monad0: function() {
        return monadGenT1;
      }
    };
  };

  // output/Utils.Generators/index.js
  var runGenWithSeed = function(gen) {
    return function(seed) {
      return runGen(gen)({
        newSeed: seed,
        size: 0
      });
    };
  };
  var runOnceWithSeed = function(gen) {
    return function(seed) {
      return fst(runGenWithSeed(gen)(seed));
    };
  };

  // output/Mines.ChargeDisplay/index.js
  var show5 = /* @__PURE__ */ show(showInt);
  var bind3 = /* @__PURE__ */ bind(/* @__PURE__ */ bindGenT(monadIdentity));
  var chooseInt2 = /* @__PURE__ */ chooseInt(monadIdentity);
  var pure4 = /* @__PURE__ */ pure(/* @__PURE__ */ applicativeGenT(monadIdentity));
  var chooseFloat2 = /* @__PURE__ */ chooseFloat(/* @__PURE__ */ monadGenGenT(monadIdentity));
  var map11 = /* @__PURE__ */ map(/* @__PURE__ */ functorGenT(functorIdentity));
  var colorChargeMagnitude = function(r) {
    return function(g) {
      return function(b) {
        var rp = r - b | 0;
        var op = g - b | 0;
        var sqmag = ((rp * rp | 0) - (rp * op | 0) | 0) + (op * op | 0) | 0;
        var isq = floor2(sqrt(toNumber(sqmag)));
        var $22 = (isq * isq | 0) === sqmag;
        if ($22) {
          return show5(isq);
        }
        ;
        return "\u221A" + show5(sqmag);
      };
    };
  };
  var colorChargeColor = function(r) {
    return function(g) {
      return function(b) {
        var rp = r - b | 0;
        var r3o2 = sqrt(3) / 2;
        var op = g - b | 0;
        var x = toNumber(rp) - toNumber(op) / 2;
        var y = toNumber(op) * r3o2;
        var angle = atan2(y)(x) * (180 / pi);
        var $23 = r === g && g === b;
        if ($23) {
          return "#000000";
        }
        ;
        return toHexString(hsv(angle)(1)(0.75));
      };
    };
  };
  var classicalColorGenerator = /* @__PURE__ */ bind3(/* @__PURE__ */ chooseInt2(0)(150))(function(r) {
    return bind3(chooseInt2(0)(150))(function(g) {
      return bind3(chooseInt2(0)(150))(function(b) {
        return pure4(rgb(r)(g)(b));
      });
    });
  });
  var classicalColor = function(v) {
    if (v === -9) {
      return "#CBBCA6";
    }
    ;
    if (v === -8) {
      return "#2A2A2A";
    }
    ;
    if (v === -7) {
      return "#9B9B9B";
    }
    ;
    if (v === -6) {
      return "#253A7A";
    }
    ;
    if (v === -5) {
      return "#A94400";
    }
    ;
    if (v === -4) {
      return "#BE40BA";
    }
    ;
    if (v === -3) {
      return "#FF34A4";
    }
    ;
    if (v === -2) {
      return "#80DF1D";
    }
    ;
    if (v === -1) {
      return "#22D7F1";
    }
    ;
    if (v === 0) {
      return "#000000";
    }
    ;
    if (v === 1) {
      return "#0000FA";
    }
    ;
    if (v === 2) {
      return "#4B802D";
    }
    ;
    if (v === 3) {
      return "#DB1300";
    }
    ;
    if (v === 4) {
      return "#202081";
    }
    ;
    if (v === 5) {
      return "#690400";
    }
    ;
    if (v === 6) {
      return "#457A7A";
    }
    ;
    if (v === 7) {
      return "#1B1B1B";
    }
    ;
    if (v === 8) {
      return "#7A7A7A";
    }
    ;
    if (v === 9) {
      return "#CBBC16";
    }
    ;
    var colorGen = function() {
      var $25 = v > 0;
      if ($25) {
        return classicalColorGenerator;
      }
      ;
      return bind3(classicalColorGenerator)(function(c) {
        return bind3(chooseFloat2(0.2)(0.4))(function(brightnessFactor) {
          return bind3(map11(sign)(chooseFloat2(-1)(1)))(function(brightnessSign) {
            return bind3(chooseFloat2(-20)(20))(function(hueFactor) {
              var c$prime = lighten(brightnessSign * brightnessFactor)(c);
              return pure4(rotateHue(hueFactor)(c$prime));
            });
          });
        });
      });
    }();
    return runOnceWithSeed(map11(toHexString)(colorGen))(mkSeed(v));
  };

  // output/Mines.Graphics/index.js
  var MineSymbol = /* @__PURE__ */ function() {
    function MineSymbol2(value0) {
      this.value0 = value0;
    }
    ;
    MineSymbol2.create = function(value0) {
      return new MineSymbol2(value0);
    };
    return MineSymbol2;
  }();
  var MinePath = /* @__PURE__ */ function() {
    function MinePath2(value0) {
      this.value0 = value0;
    }
    ;
    MinePath2.create = function(value0) {
      return new MinePath2(value0);
    };
    return MinePath2;
  }();
  var misflagX = /* @__PURE__ */ fromPathString("m626.44 600 310.69-310.69c7.3125-7.3125 7.3125-19.125 0-26.438s-19.125-7.3125-26.438 0l-310.69 310.69-310.69-310.69c-7.3125-7.3125-19.125-7.3125-26.438 0s-7.3125 19.125 0 26.438l310.69 310.69-310.69 310.69c-7.3125 7.3125-7.3125 19.125 0 26.438 3.75 3.75 8.4375 5.4375 13.312 5.4375s9.5625-1.875 13.312-5.4375l310.5-310.69 310.69 310.69c3.75 3.75 8.4375 5.4375 13.312 5.4375s9.5625-1.875 13.312-5.4375c7.3125-7.3125 7.3125-19.125 0-26.438z");
  var magnetGraphic = /* @__PURE__ */ function() {
    return new MinePath(fromPathString("m1141.5 590.95-145.22-145.22c-28.031-27.984-73.406-27.984-101.44 0l-48.422 48.375-290.39 290.44v0.046875c-38.906 38.344-101.48 38.156-140.16-0.46875-38.625-38.672-38.812-101.25-0.42188-140.16l338.81-338.81c27.984-28.031 27.984-73.406 0-101.44l-145.22-145.22c-28.078-27.891-73.406-27.891-101.44 0l-338.81 338.86c-112.97 113.25-156.98 278.16-115.5 432.66 41.484 154.55 162.14 275.21 316.69 316.69 154.5 41.484 319.4-2.5312 432.66-115.5l338.81-338.81h0.046875c27.938-28.031 27.938-73.406 0-101.44zm-583.18-477.1 140.58 140.63-118.69 118.64-140.58-140.58zm191.29 864.32c-94.266 94.266-231.71 131.11-360.52 96.609-128.76-34.5-229.4-135.14-263.9-263.9-34.5-128.81 2.3438-266.26 96.609-360.52l164.81-164.81 140.58 140.63-164.81 164.76c-43.969 44.062-61.125 108.23-45 168.37 16.172 60.141 63.141 107.11 123.28 123.28 60.141 16.125 124.31-1.0312 168.37-45l164.81-164.81 140.58 140.58zm217.82-217.82-140.58-140.58 118.69-118.69 140.58 140.58z"));
  }();
  var magnetMineGraphics = {
    mineGraphic: magnetGraphic,
    mineColor: "#000000",
    flagGraphic: magnetGraphic,
    flagColor: "#660000"
  };
  var genericMineGraphic = /* @__PURE__ */ function() {
    return new MinePath(fromPathString("m1164.5 564.54h-159.15c-6.9531-83.52-39.664-162.82-93.617-226.95l36.027-35.887c6.832-6.6172 10.719-15.703 10.789-25.215 0.066406-9.5117-3.6875-18.652-10.422-25.367s-15.887-10.445-25.398-10.348c-9.5078 0.09375-18.582 4.0078-25.18 10.859l-35.887 35.887c-64.133-53.953-143.43-86.668-226.95-93.617v-158.44c0-12.668-6.7578-24.375-17.73-30.711-10.969-6.332-24.488-6.332-35.461 0-10.969 6.3359-17.73 18.043-17.73 30.711v159.01c-83.25 7.1094-162.25 39.867-226.1 93.758l-35.887-35.887c-8.9961-8.7109-21.918-12.035-34-8.7422-12.082 3.293-21.531 12.715-24.859 24.789s-0.039063 25.004 8.6484 34.023l36.027 36.027v0.003906c-53.637 63.938-86.141 142.93-93.051 226.1h-159.15c-12.668 0-24.375 6.7578-30.711 17.73-6.332 10.973-6.332 24.488 0 35.461 6.3359 10.973 18.043 17.73 30.711 17.73h159.15c7.2617 83.188 39.945 162.13 93.617 226.1l-35.887 35.887c-6.6016 6.6914-10.301 15.711-10.301 25.109 0 9.3945 3.6992 18.414 10.301 25.105 6.6719 6.6328 15.699 10.359 25.105 10.359 9.4102 0 18.438-3.7266 25.109-10.359l35.887-35.887c63.969 53.672 142.91 86.355 226.1 93.617v159.15c0 12.668 6.7578 24.375 17.73 30.711 10.973 6.332 24.488 6.332 35.461 0 10.973-6.3359 17.73-18.043 17.73-30.711v-159.15c83.25-7.1094 162.25-39.867 226.1-93.758l36.027 36.027h0.003906c6.6523 6.6602 15.691 10.387 25.105 10.355 9.3789 0.058594 18.379-3.6758 24.965-10.355 6.668-6.6523 10.418-15.688 10.418-25.105 0-9.4219-3.75-18.457-10.418-25.109l-35.887-35.887c53.891-63.852 86.648-142.85 93.758-226.1h159.01c12.668 0 24.375-6.7578 30.711-17.73 6.332-10.973 6.332-24.488 0-35.461-6.3359-10.973-18.043-17.73-30.711-17.73zm-606.38-56.738c-8.7227 23.215-27.258 41.387-50.637 49.645-9.0742 3.4062-18.68 5.1836-28.371 5.25-22.57 0-44.219-8.9688-60.18-24.926-15.961-15.961-24.926-37.609-24.926-60.18 0.074219-9.6914 1.8516-19.293 5.2461-28.371 7.6406-23.695 25.414-42.766 48.512-52.055 9.7461-3.8867 20.148-5.8633 30.641-5.8164 22.57 0 44.219 8.9648 60.176 24.926 15.961 15.961 24.93 37.609 24.93 60.18 0.29297 10.75-1.5391 21.449-5.3906 31.488z"));
  }();
  var fromSymbol = function(s) {
    return {
      mineGraphic: new MineSymbol(s),
      mineColor: "#000000",
      flagGraphic: new MineSymbol(s),
      flagColor: "#600000"
    };
  };
  var flagGraphic = /* @__PURE__ */ function() {
    return new MinePath(fromPathString("m970.13 169.03c-6.6562-11.812-19.125-19.031-32.625-19.031h-487.5v-37.5c0-20.719-16.781-37.5-37.5-37.5s-37.5 16.781-37.5 37.5v937.5h-112.5c-20.719 0-37.5 16.781-37.5 37.5s16.781 37.5 37.5 37.5h300c20.719 0 37.5-16.781 37.5-37.5s-16.781-37.5-37.5-37.5h-112.5v-450h487.5c13.5 0 25.969-7.2188 32.625-19.031 6.6562-11.766 6.4688-26.203-0.46875-37.781l-100.92-168.19 100.92-168.19c6.9375-11.578 7.125-26.016 0.46875-37.781z"));
  }();
  var greenMineGraphics = {
    mineGraphic: genericMineGraphic,
    mineColor: "#00cc00",
    flagGraphic,
    flagColor: "#00b200"
  };
  var redMineGraphics = {
    mineGraphic: genericMineGraphic,
    mineColor: "#cc0000",
    flagGraphic,
    flagColor: "#b20000"
  };
  var standardMineGraphics = {
    mineGraphic: genericMineGraphic,
    mineColor: "#000000",
    flagGraphic,
    flagColor: "#000000"
  };
  var blueMineGraphics = {
    mineGraphic: genericMineGraphic,
    mineColor: "#0000cc",
    flagGraphic,
    flagColor: "#0000b2"
  };
  var antiFlagGraphic = /* @__PURE__ */ function() {
    return new MinePath(fromPathString("m366.91 871.41c4.1914 7.4375 12.043 11.984 20.547 11.984h307.01v23.617c0 13.047 10.566 23.617 23.617 23.617 13.047 0 23.617-10.566 23.617-23.617v-590.4h70.848c13.047 0 23.617-10.566 23.617-23.617 0-13.047-10.566-23.617-23.617-23.617h-188.93c-13.047 0-23.617 10.566-23.617 23.617 0 13.047 10.566 23.617 23.617 23.617h70.848v283.39h-307.01c-8.5 0-16.355 4.5469-20.547 11.984-4.1914 7.4102-4.0742 16.5 0.29688 23.793l63.559 105.92-63.559 105.92c-4.3672 7.293-4.4883 16.383-0.29688 23.793z"));
  }();
  var antiGreenMineGraphics = {
    mineGraphic: genericMineGraphic,
    mineColor: "#cc00cc",
    flagGraphic: antiFlagGraphic,
    flagColor: "#b200b2"
  };
  var antiMineGraphics = {
    mineGraphic: genericMineGraphic,
    mineColor: "#ffffff",
    flagGraphic: antiFlagGraphic,
    flagColor: "#ffffff"
  };
  var antiRedMineGraphics = {
    mineGraphic: genericMineGraphic,
    mineColor: "#00cccc",
    flagGraphic: antiFlagGraphic,
    flagColor: "#00b2b2"
  };
  var antiBlueMineGraphics = {
    mineGraphic: genericMineGraphic,
    mineColor: "#cccc00",
    flagGraphic: antiFlagGraphic,
    flagColor: "#b2b200"
  };

  // output/Utils.IPoint/index.js
  var show6 = /* @__PURE__ */ show(showInt);
  var map13 = /* @__PURE__ */ map(functorArray);
  var compare3 = /* @__PURE__ */ compare(ordInt);
  var showIPoint = {
    show: function(v) {
      return "(" + (show6(v.x) + ("," + (show6(v.y) + ")")));
    }
  };
  var mkIPoint = function(x) {
    return function(y) {
      return {
        x,
        y
      };
    };
  };
  var semigroupIPoint = {
    append: function(v) {
      return function(v1) {
        return mkIPoint(v.x + v1.x | 0)(v.y + v1.y | 0);
      };
    }
  };
  var append13 = /* @__PURE__ */ append(semigroupIPoint);
  var sub2 = function(v) {
    return function(v1) {
      return mkIPoint(v.x - v1.x | 0)(v.y - v1.y | 0);
    };
  };
  var lattice = function(width8) {
    return function(height8) {
      return concatMap(function(i) {
        return map13(function(j) {
          return mkIPoint(i)(j);
        })(range(0)(width8 - 1 | 0));
      })(range(0)(height8 - 1 | 0));
    };
  };
  var eqIPoint = {
    eq: function(x) {
      return function(y) {
        return x.x === y.x && x.y === y.y;
      };
    }
  };
  var ordIPoint = {
    compare: function(x) {
      return function(y) {
        var v = compare3(x.x)(y.x);
        if (v instanceof LT) {
          return LT.value;
        }
        ;
        if (v instanceof GT) {
          return GT.value;
        }
        ;
        return compare3(x.y)(y.y);
      };
    },
    Eq0: function() {
      return eqIPoint;
    }
  };
  var add3 = function(p) {
    return function(q) {
      return append13(p)(q);
    };
  };

  // output/Mines.Mine/index.js
  var eq3 = /* @__PURE__ */ eq(eqIPoint);
  var append3 = /* @__PURE__ */ append(semigroupMineCharge);
  var MineValuation = /* @__PURE__ */ function() {
    function MineValuation2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    MineValuation2.create = function(value0) {
      return function(value1) {
        return new MineValuation2(value0, value1);
      };
    };
    return MineValuation2;
  }();
  var Mine = /* @__PURE__ */ function() {
    function Mine2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Mine2.create = function(value0) {
      return function(value1) {
        return new Mine2(value0, value1);
      };
    };
    return Mine2;
  }();
  var usesColor = function(v) {
    return any(function(v1) {
      return hasColor(v1.value1);
    })(v.value1);
  };
  var usesClassical = function(v) {
    return any(function(v1) {
      return hasClassical(v1.value1);
    })(v.value1);
  };
  var pointCharge = function(v) {
    return function(p) {
      return foldr2(function(v1) {
        return function(c) {
          var $25 = eq3(p)(v1.value0);
          if ($25) {
            return append3(c)(v1.value1);
          }
          ;
          return c;
        };
      })(NoMines.value)(v.value1);
    };
  };
  var mineGraphicsOf = function(v) {
    return v.value0;
  };
  var magnetMine = /* @__PURE__ */ function() {
    return new Mine(magnetMineGraphics, [new MineValuation(mkIPoint(1)(1), blueCharge(1)), new MineValuation(mkIPoint(0)(1), blueCharge(1)), new MineValuation(mkIPoint(-1 | 0)(1), blueCharge(1)), new MineValuation(mkIPoint(1)(2), blueCharge(1)), new MineValuation(mkIPoint(0)(2), blueCharge(1)), new MineValuation(mkIPoint(-1 | 0)(2), blueCharge(1)), new MineValuation(mkIPoint(1)(-1 | 0), redCharge(1)), new MineValuation(mkIPoint(0)(-1 | 0), redCharge(1)), new MineValuation(mkIPoint(-1 | 0)(-1 | 0), redCharge(1)), new MineValuation(mkIPoint(1)(-2 | 0), redCharge(1)), new MineValuation(mkIPoint(0)(-2 | 0), redCharge(1)), new MineValuation(mkIPoint(-1 | 0)(-2 | 0), redCharge(1))]);
  }();
  var constMooreMine = function(g) {
    return function(c) {
      return new Mine(g, [new MineValuation(mkIPoint(1)(1), c), new MineValuation(mkIPoint(1)(0), c), new MineValuation(mkIPoint(1)(-1 | 0), c), new MineValuation(mkIPoint(0)(1), c), new MineValuation(mkIPoint(0)(-1 | 0), c), new MineValuation(mkIPoint(-1 | 0)(1), c), new MineValuation(mkIPoint(-1 | 0)(0), c), new MineValuation(mkIPoint(-1 | 0)(-1 | 0), c)]);
    };
  };
  var doubleMine = /* @__PURE__ */ constMooreMine(/* @__PURE__ */ fromSymbol("XX"))(/* @__PURE__ */ classicalCharge(2));
  var greenMine = /* @__PURE__ */ constMooreMine(greenMineGraphics)(/* @__PURE__ */ greenCharge(1));
  var redMine = /* @__PURE__ */ constMooreMine(redMineGraphics)(/* @__PURE__ */ redCharge(1));
  var standardMine = /* @__PURE__ */ constMooreMine(standardMineGraphics)(/* @__PURE__ */ classicalCharge(1));
  var blueMine = /* @__PURE__ */ constMooreMine(blueMineGraphics)(/* @__PURE__ */ blueCharge(1));
  var antiRedMine = /* @__PURE__ */ function() {
    return constMooreMine(antiRedMineGraphics)(redCharge(-1 | 0));
  }();
  var antiMine = /* @__PURE__ */ function() {
    return constMooreMine(antiMineGraphics)(classicalCharge(-1 | 0));
  }();
  var antiGreenMine = /* @__PURE__ */ function() {
    return constMooreMine(antiGreenMineGraphics)(greenCharge(-1 | 0));
  }();
  var antiBlueMine = /* @__PURE__ */ function() {
    return constMooreMine(antiBlueMineGraphics)(blueCharge(-1 | 0));
  }();

  // output/Mines.Minefield/index.js
  var map14 = /* @__PURE__ */ map(functorArray);
  var nub3 = /* @__PURE__ */ nub(ordIPoint);
  var lookup3 = /* @__PURE__ */ lookup2(ordIPoint);
  var bind4 = /* @__PURE__ */ bind(bindMaybe);
  var pure5 = /* @__PURE__ */ pure(applicativeMaybe);
  var update2 = /* @__PURE__ */ update(ordIPoint);
  var foldr5 = /* @__PURE__ */ foldr(foldableArray);
  var append4 = /* @__PURE__ */ append(semigroupMineCharge);
  var insert3 = /* @__PURE__ */ insert2(ordIPoint);
  var elem3 = /* @__PURE__ */ elem2(eqIPoint);
  var filter5 = /* @__PURE__ */ filter4(ordIPoint);
  var sum2 = /* @__PURE__ */ sum(foldableArray)(semiringInt);
  var fromFoldable4 = /* @__PURE__ */ fromFoldable(foldableSet);
  var bind1 = /* @__PURE__ */ bind(/* @__PURE__ */ bindGenT(monadIdentity));
  var shuffle2 = /* @__PURE__ */ shuffle(monadRecIdentity);
  var eq14 = /* @__PURE__ */ eq(eqIPoint);
  var map23 = /* @__PURE__ */ map(functorMaybe);
  var pure1 = /* @__PURE__ */ pure(/* @__PURE__ */ applicativeGenT(monadIdentity));
  var append14 = /* @__PURE__ */ append(semigroupArray);
  var maximum2 = /* @__PURE__ */ maximum(ordInt)(foldableArray);
  var max6 = /* @__PURE__ */ max(ordInt);
  var MineCount = /* @__PURE__ */ function() {
    function MineCount2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    MineCount2.create = function(value0) {
      return function(value1) {
        return new MineCount2(value0, value1);
      };
    };
    return MineCount2;
  }();
  var Ungenerated = /* @__PURE__ */ function() {
    function Ungenerated2() {
    }
    ;
    Ungenerated2.value = new Ungenerated2();
    return Ungenerated2;
  }();
  var Generated = /* @__PURE__ */ function() {
    function Generated2() {
    }
    ;
    Generated2.value = new Generated2();
    return Generated2;
  }();
  var Dead = /* @__PURE__ */ function() {
    function Dead2() {
    }
    ;
    Dead2.value = new Dead2();
    return Dead2;
  }();
  var Won = /* @__PURE__ */ function() {
    function Won2() {
    }
    ;
    Won2.value = new Won2();
    return Won2;
  }();
  var Flag = /* @__PURE__ */ function() {
    function Flag2(value0) {
      this.value0 = value0;
    }
    ;
    Flag2.create = function(value0) {
      return new Flag2(value0);
    };
    return Flag2;
  }();
  var UnknownMine = /* @__PURE__ */ function() {
    function UnknownMine2() {
    }
    ;
    UnknownMine2.value = new UnknownMine2();
    return UnknownMine2;
  }();
  var ClassicalOnly = /* @__PURE__ */ function() {
    function ClassicalOnly2() {
    }
    ;
    ClassicalOnly2.value = new ClassicalOnly2();
    return ClassicalOnly2;
  }();
  var ColorOnly = /* @__PURE__ */ function() {
    function ColorOnly2() {
    }
    ;
    ColorOnly2.value = new ColorOnly2();
    return ColorOnly2;
  }();
  var ComplexCharges = /* @__PURE__ */ function() {
    function ComplexCharges2() {
    }
    ;
    ComplexCharges2.value = new ComplexCharges2();
    return ComplexCharges2;
  }();
  var unionVisibilities = function(p) {
    return function(mines) {
      var visibleSquares = function(v) {
        return map14(function(v1) {
          return sub2(p)(v1.value0);
        })(v.value1);
      };
      return nub3(concatMap(visibleSquares)(mines));
    };
  };
  var updateFlagCharge = function(p) {
    return function(m) {
      var v = lookup3(p)(m.map);
      if (v instanceof Nothing) {
        return m;
      }
      ;
      if (v instanceof Just) {
        var visibilities = unionVisibilities(p)(m.presentMines);
        var flagPointCharge = function(p$prime) {
          return bind4(lookup3(p$prime)(m.map))(function(clue) {
            return bind4(clue.flagState)(function(flag) {
              if (flag instanceof Flag) {
                return bind4(index(m.presentMines)(flag.value0))(function(flagMine) {
                  return pure5(pointCharge(flagMine)(sub2(p)(p$prime)));
                });
              }
              ;
              if (flag instanceof UnknownMine) {
                return pure5(NoMines.value);
              }
              ;
              throw new Error("Failed pattern match at Mines.Minefield (line 192, column 13 - line 196, column 44): " + [flag.constructor.name]);
            });
          });
        };
        var pointCharges = map14(function(p$prime) {
          return fromMaybe(NoMines.value)(flagPointCharge(p$prime));
        })(visibilities);
        return {
          gameState: m.gameState,
          bounds: m.bounds,
          maximalExtent: m.maximalExtent,
          mineDistribution: m.mineDistribution,
          presentMines: m.presentMines,
          displayMode: m.displayMode,
          map: update2(function(c) {
            return new Just({
              charge: c.charge,
              flagState: c.flagState,
              mine: c.mine,
              mineIndex: c.mineIndex,
              revealed: c.revealed,
              flagCharge: new Just(foldr5(append4)(NoMines.value)(pointCharges))
            });
          })(p)(m.map)
        };
      }
      ;
      throw new Error("Failed pattern match at Mines.Minefield (line 184, column 24 - line 196, column 44): " + [v.constructor.name]);
    };
  };
  var placeMines = function(mines) {
    return function(points) {
      return function(n) {
        var v = head(mines);
        if (v instanceof Nothing) {
          return empty3;
        }
        ;
        if (v instanceof Just) {
          var points$prime = drop(v.value0.value1)(points);
          var map$prime = placeMines(fromMaybe([])(tail(mines)))(points$prime)(n + 1 | 0);
          return foldr5(function(k) {
            return function(m) {
              return insert3(k)(new Tuple(v.value0.value0, n))(m);
            };
          })(map$prime)(take(v.value0.value1)(points));
        }
        ;
        throw new Error("Failed pattern match at Mines.Minefield (line 123, column 29 - line 127, column 68): " + [v.constructor.name]);
      };
    };
  };
  var mineOf = function(v) {
    return v.value0;
  };
  var isLegalChord = function(v) {
    return function(v1) {
      if (v instanceof Just && v1 instanceof Just) {
        return equalModCancellation(v.value0)(v1.value0);
      }
      ;
      return false;
    };
  };
  var intersectVisibilities = function(p) {
    return function(mines) {
      var visibleSquares = function(v) {
        return map14(function(v1) {
          return sub2(p)(v1.value0);
        })(v.value1);
      };
      var visibilities = map14(visibleSquares)(mines);
      return nub3(filter(function(x) {
        return all(elem3(x))(visibilities);
      })(concat(visibilities)));
    };
  };
  var eqGameState = {
    eq: function(x) {
      return function(y) {
        if (x instanceof Ungenerated && y instanceof Ungenerated) {
          return true;
        }
        ;
        if (x instanceof Generated && y instanceof Generated) {
          return true;
        }
        ;
        if (x instanceof Dead && y instanceof Dead) {
          return true;
        }
        ;
        if (x instanceof Won && y instanceof Won) {
          return true;
        }
        ;
        return false;
      };
    }
  };
  var notEq3 = /* @__PURE__ */ notEq(eqGameState);
  var flagSquare = function(qflags) {
    return function(p) {
      return function(m) {
        var $103 = notEq3(m.gameState)(Generated.value);
        if ($103) {
          return m;
        }
        ;
        var v = lookup3(p)(m.map);
        if (v instanceof Nothing) {
          return m;
        }
        ;
        if (v instanceof Just) {
          var toUpdate = unionVisibilities(p)(m.presentMines);
          var incrementFlagState = function(v1) {
            if (v1 instanceof Nothing) {
              return new Just(new Flag(0));
            }
            ;
            if (v1 instanceof Just && v1.value0 instanceof Flag) {
              var $106 = v1.value0.value0 === (length(m.mineDistribution) - 1 | 0);
              if ($106) {
                var $107 = length(m.mineDistribution) === 1 || !qflags;
                if ($107) {
                  return Nothing.value;
                }
                ;
                return new Just(UnknownMine.value);
              }
              ;
              return new Just(new Flag(v1.value0.value0 + 1 | 0));
            }
            ;
            if (v1 instanceof Just && v1.value0 instanceof UnknownMine) {
              return Nothing.value;
            }
            ;
            throw new Error("Failed pattern match at Mines.Minefield (line 176, column 9 - line 176, column 51): " + [v1.constructor.name]);
          };
          var m$prime = {
            bounds: m.bounds,
            displayMode: m.displayMode,
            gameState: m.gameState,
            maximalExtent: m.maximalExtent,
            mineDistribution: m.mineDistribution,
            presentMines: m.presentMines,
            map: update2(function(c) {
              return new Just({
                charge: c.charge,
                flagCharge: c.flagCharge,
                mine: c.mine,
                mineIndex: c.mineIndex,
                revealed: c.revealed,
                flagState: incrementFlagState(c.flagState)
              });
            })(p)(m.map)
          };
          if (v.value0.revealed) {
            return m;
          }
          ;
          return foldr5(updateFlagCharge)(m$prime)(toUpdate);
        }
        ;
        throw new Error("Failed pattern match at Mines.Minefield (line 171, column 65 - line 179, column 56): " + [v.constructor.name]);
      };
    };
  };
  var revealSquare = function(p) {
    return function(m) {
      var $113 = notEq3(m.gameState)(Generated.value);
      if ($113) {
        return m;
      }
      ;
      var v = lookup3(p)(m.map);
      if (v instanceof Nothing) {
        return m;
      }
      ;
      if (v instanceof Just) {
        var $115 = v.value0.revealed || isJust(v.value0.flagState);
        if ($115) {
          return m;
        }
        ;
        var m$prime = {
          bounds: m.bounds,
          displayMode: m.displayMode,
          gameState: m.gameState,
          maximalExtent: m.maximalExtent,
          mineDistribution: m.mineDistribution,
          presentMines: m.presentMines,
          map: update2(function(c) {
            return new Just({
              charge: c.charge,
              flagCharge: c.flagCharge,
              flagState: c.flagState,
              mine: c.mine,
              mineIndex: c.mineIndex,
              revealed: true
            });
          })(p)(m.map)
        };
        if (v.value0.mine instanceof Just) {
          return {
            map: m$prime.map,
            bounds: m$prime.bounds,
            maximalExtent: m$prime.maximalExtent,
            mineDistribution: m$prime.mineDistribution,
            presentMines: m$prime.presentMines,
            displayMode: m$prime.displayMode,
            gameState: Dead.value
          };
        }
        ;
        if (v.value0.mine instanceof Nothing) {
          if (v.value0.charge instanceof Nothing) {
            return m$prime;
          }
          ;
          if (v.value0.charge instanceof Just && v.value0.charge.value0 instanceof Charge) {
            return m$prime;
          }
          ;
          if (v.value0.charge instanceof Just && v.value0.charge.value0 instanceof NoMines) {
            return foldr5(revealSquare)(m$prime)(intersectVisibilities(p)(m.presentMines));
          }
          ;
          throw new Error("Failed pattern match at Mines.Minefield (line 155, column 24 - line 160, column 97): " + [v.value0.charge.constructor.name]);
        }
        ;
        throw new Error("Failed pattern match at Mines.Minefield (line 153, column 81 - line 160, column 97): " + [v.value0.mine.constructor.name]);
      }
      ;
      throw new Error("Failed pattern match at Mines.Minefield (line 150, column 60 - line 160, column 97): " + [v.constructor.name]);
    };
  };
  var eqFlag = {
    eq: function(x) {
      return function(y) {
        if (x instanceof Flag && y instanceof Flag) {
          return x.value0 === y.value0;
        }
        ;
        if (x instanceof UnknownMine && y instanceof UnknownMine) {
          return true;
        }
        ;
        return false;
      };
    }
  };
  var eq22 = /* @__PURE__ */ eq(/* @__PURE__ */ eqMaybe(eqFlag));
  var getFlagCount = function(m) {
    return function(fc) {
      if (fc instanceof Flag) {
        return bind4(index(m.mineDistribution)(fc.value0))(function(v) {
          var current = size2(filter5(function(c) {
            return eq22(c.flagState)(new Just(fc));
          })(m.map));
          var mineData = fromMaybe(fromSymbol("ERR"))(bind4(index(m.presentMines)(fc.value0))(function($156) {
            return Just.create(mineGraphicsOf($156));
          }));
          return pure5({
            mine: mineData,
            current,
            total: v.value1
          });
        });
      }
      ;
      if (fc instanceof UnknownMine) {
        return pure5({
          mine: function() {
            var v = fromSymbol("?");
            return {
              flagGraphic: v.flagGraphic,
              mineColor: v.mineColor,
              mineGraphic: v.mineGraphic,
              flagColor: "#ffffff"
            };
          }(),
          current: size2(filter5(function(c) {
            return eq22(c.flagState)(new Just(fc));
          })(m.map)),
          total: 0
        });
      }
      ;
      throw new Error("Failed pattern match at Mines.Minefield (line 217, column 21 - line 231, column 10): " + [fc.constructor.name]);
    };
  };
  var defaultClue = /* @__PURE__ */ function() {
    return {
      revealed: false,
      flagState: Nothing.value,
      mine: Nothing.value,
      charge: Nothing.value,
      flagCharge: Nothing.value,
      mineIndex: Nothing.value
    };
  }();
  var countRevealedSquares = function(m) {
    return size2(filter5(function(c) {
      return c.revealed && isNothing(c.mine);
    })(m.map));
  };
  var countOf = function(v) {
    return v.value1;
  };
  var countSafeSquares = function(m) {
    return size2(m.map) - sum2(map14(countOf)(m.mineDistribution)) | 0;
  };
  var setWinningBoard = function(m) {
    var $138 = countSafeSquares(m) === countRevealedSquares(m);
    if ($138) {
      return {
        map: m.map,
        bounds: m.bounds,
        maximalExtent: m.maximalExtent,
        mineDistribution: m.mineDistribution,
        presentMines: m.presentMines,
        displayMode: m.displayMode,
        gameState: Won.value
      };
    }
    ;
    return m;
  };
  var chordSquare = function(p) {
    return function(m) {
      var $139 = notEq3(m.gameState)(Generated.value);
      if ($139) {
        return m;
      }
      ;
      var v = lookup3(p)(m.map);
      if (v instanceof Nothing) {
        return m;
      }
      ;
      if (v instanceof Just) {
        var $141 = isLegalChord(v.value0.flagCharge)(v.value0.charge);
        if ($141) {
          return foldr5(revealSquare)(m)(unionVisibilities(p)(m.presentMines));
        }
        ;
        return m;
      }
      ;
      throw new Error("Failed pattern match at Mines.Minefield (line 205, column 59 - line 208, column 73): " + [v.constructor.name]);
    };
  };
  var chargeSingleMine = function(mines) {
    return function(p) {
      return function(charges) {
        var v = lookup3(p)(mines);
        if (v instanceof Nothing) {
          return charges;
        }
        ;
        if (v instanceof Just) {
          var addCharge = function(charges$prime) {
            return function(point) {
              return function(charge) {
                return update2(function(currentCharge) {
                  return new Just(append4(currentCharge)(charge));
                })(add3(point)(p))(charges$prime);
              };
            };
          };
          return foldr5(function(v1) {
            return function(charges$prime) {
              return addCharge(charges$prime)(v1.value0)(v1.value1);
            };
          })(charges)(v.value0.value0.value1);
        }
        ;
        throw new Error("Failed pattern match at Mines.Minefield (line 131, column 36 - line 134, column 122): " + [v.constructor.name]);
      };
    };
  };
  var minefieldGenerator = function(blank) {
    return function(initial) {
      var squares = fromFoldable4(keys3(blank.map));
      return bind1(shuffle2(squares))(function(pairs2) {
        var safeSquares = unionVisibilities(initial)(blank.presentMines);
        var unsafePairs = filter(function(p) {
          return !(eq14(p)(initial) || elem3(p)(safeSquares));
        })(pairs2);
        var mineMap = placeMines(blank.mineDistribution)(unsafePairs)(0);
        var emptyCharges = foldr5(function(k) {
          return function(m) {
            return insert3(k)(NoMines.value)(m);
          };
        })(empty3)(pairs2);
        var chargeMap = foldr5(chargeSingleMine(mineMap))(emptyCharges)(squares);
        var filledGrid = foldr5(function(p) {
          return function(m) {
            return insert3(p)({
              revealed: false,
              flagState: Nothing.value,
              flagCharge: Nothing.value,
              mine: map23(fst)(lookup3(p)(mineMap)),
              charge: lookup3(p)(chargeMap),
              mineIndex: map23(snd)(lookup3(p)(mineMap))
            })(m);
          };
        })(empty3)(squares);
        var m$prime = {
          bounds: blank.bounds,
          displayMode: blank.displayMode,
          maximalExtent: blank.maximalExtent,
          mineDistribution: blank.mineDistribution,
          presentMines: blank.presentMines,
          map: filledGrid,
          gameState: Generated.value
        };
        return pure1(foldr5(revealSquare)(m$prime)(append14(safeSquares)([initial])));
      });
    };
  };
  var blankMinefield = function(width8) {
    return function(height8) {
      return function(mineDistribution) {
        var mines = map14(mineOf)(mineDistribution);
        var grid = foldr5(function(k) {
          return function(m) {
            return insert3(k)(defaultClue)(m);
          };
        })(empty3)(lattice(width8)(height8));
        var maxX = 1 + fromMaybe(0)(maximum2(map14(function(v) {
          return v.x;
        })(fromFoldable4(keys3(grid))))) | 0;
        var maxY = 1 + fromMaybe(0)(maximum2(map14(function(v) {
          return v.y;
        })(fromFoldable4(keys3(grid))))) | 0;
        var displayMode = function() {
          var $154 = any(usesColor)(mines);
          if ($154) {
            var $155 = any(usesClassical)(mines);
            if ($155) {
              return ComplexCharges.value;
            }
            ;
            return ColorOnly.value;
          }
          ;
          return ClassicalOnly.value;
        }();
        return {
          map: grid,
          gameState: Ungenerated.value,
          bounds: mkIPoint(maxX)(maxY),
          maximalExtent: max6(maxX)(maxY),
          mineDistribution,
          presentMines: map14(mineOf)(mineDistribution),
          displayMode
        };
      };
    };
  };

  // output/Control.Monad.Except/index.js
  var unwrap6 = /* @__PURE__ */ unwrap();
  var runExcept = function($3) {
    return unwrap6(runExceptT($3));
  };

  // output/Data.Argonaut.Decode.Decoders/index.js
  var lmap3 = /* @__PURE__ */ lmap(bifunctorEither);
  var composeKleisliFlipped2 = /* @__PURE__ */ composeKleisliFlipped(bindEither);
  var traverseWithIndex2 = /* @__PURE__ */ traverseWithIndex(traversableWithIndexArray)(applicativeEither);
  var getField = function(decoder) {
    return function(obj) {
      return function(str2) {
        return maybe(new Left(new AtKey(str2, MissingValue.value)))(function() {
          var $48 = lmap3(AtKey.create(str2));
          return function($49) {
            return $48(decoder($49));
          };
        }())(lookup(str2)(obj));
      };
    };
  };
  var decodeString = /* @__PURE__ */ function() {
    return caseJsonString(new Left(new TypeMismatch("String")))(Right.create);
  }();
  var decodeNumber = /* @__PURE__ */ function() {
    return caseJsonNumber(new Left(new TypeMismatch("Number")))(Right.create);
  }();
  var decodeJObject = /* @__PURE__ */ function() {
    var $50 = note(new TypeMismatch("Object"));
    return function($51) {
      return $50(toObject($51));
    };
  }();
  var decodeJArray = /* @__PURE__ */ function() {
    var $52 = note(new TypeMismatch("Array"));
    return function($53) {
      return $52(toArray($53));
    };
  }();
  var decodeInt = /* @__PURE__ */ composeKleisliFlipped2(/* @__PURE__ */ function() {
    var $84 = note(new TypeMismatch("Integer"));
    return function($85) {
      return $84(fromNumber($85));
    };
  }())(decodeNumber);
  var decodeArray = function(decoder) {
    return composeKleisliFlipped2(function() {
      var $89 = lmap3(Named.create("Array"));
      var $90 = traverseWithIndex2(function(i) {
        var $92 = lmap3(AtIndex.create(i));
        return function($93) {
          return $92(decoder($93));
        };
      });
      return function($91) {
        return $89($90($91));
      };
    }())(decodeJArray);
  };

  // ../node_modules/js-yaml/dist/js-yaml.mjs
  function isNothing2(subject) {
    return typeof subject === "undefined" || subject === null;
  }
  function isObject(subject) {
    return typeof subject === "object" && subject !== null;
  }
  function toArray2(sequence3) {
    if (Array.isArray(sequence3)) return sequence3;
    else if (isNothing2(sequence3)) return [];
    return [sequence3];
  }
  function extend2(target5, source2) {
    var index5, length9, key, sourceKeys;
    if (source2) {
      sourceKeys = Object.keys(source2);
      for (index5 = 0, length9 = sourceKeys.length; index5 < length9; index5 += 1) {
        key = sourceKeys[index5];
        target5[key] = source2[key];
      }
    }
    return target5;
  }
  function repeat3(string2, count) {
    var result = "", cycle;
    for (cycle = 0; cycle < count; cycle += 1) {
      result += string2;
    }
    return result;
  }
  function isNegativeZero(number) {
    return number === 0 && Number.NEGATIVE_INFINITY === 1 / number;
  }
  var isNothing_1 = isNothing2;
  var isObject_1 = isObject;
  var toArray_1 = toArray2;
  var repeat_1 = repeat3;
  var isNegativeZero_1 = isNegativeZero;
  var extend_1 = extend2;
  var common = {
    isNothing: isNothing_1,
    isObject: isObject_1,
    toArray: toArray_1,
    repeat: repeat_1,
    isNegativeZero: isNegativeZero_1,
    extend: extend_1
  };
  function formatError(exception2, compact) {
    var where = "", message2 = exception2.reason || "(unknown reason)";
    if (!exception2.mark) return message2;
    if (exception2.mark.name) {
      where += 'in "' + exception2.mark.name + '" ';
    }
    where += "(" + (exception2.mark.line + 1) + ":" + (exception2.mark.column + 1) + ")";
    if (!compact && exception2.mark.snippet) {
      where += "\n\n" + exception2.mark.snippet;
    }
    return message2 + " " + where;
  }
  function YAMLException$1(reason, mark) {
    Error.call(this);
    this.name = "YAMLException";
    this.reason = reason;
    this.mark = mark;
    this.message = formatError(this, false);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = new Error().stack || "";
    }
  }
  YAMLException$1.prototype = Object.create(Error.prototype);
  YAMLException$1.prototype.constructor = YAMLException$1;
  YAMLException$1.prototype.toString = function toString2(compact) {
    return this.name + ": " + formatError(this, compact);
  };
  var exception = YAMLException$1;
  function getLine(buffer, lineStart, lineEnd, position3, maxLineLength) {
    var head4 = "";
    var tail2 = "";
    var maxHalfLength = Math.floor(maxLineLength / 2) - 1;
    if (position3 - lineStart > maxHalfLength) {
      head4 = " ... ";
      lineStart = position3 - maxHalfLength + head4.length;
    }
    if (lineEnd - position3 > maxHalfLength) {
      tail2 = " ...";
      lineEnd = position3 + maxHalfLength - tail2.length;
    }
    return {
      str: head4 + buffer.slice(lineStart, lineEnd).replace(/\t/g, "\u2192") + tail2,
      pos: position3 - lineStart + head4.length
      // relative position
    };
  }
  function padStart(string2, max10) {
    return common.repeat(" ", max10 - string2.length) + string2;
  }
  function makeSnippet(mark, options2) {
    options2 = Object.create(options2 || null);
    if (!mark.buffer) return null;
    if (!options2.maxLength) options2.maxLength = 79;
    if (typeof options2.indent !== "number") options2.indent = 1;
    if (typeof options2.linesBefore !== "number") options2.linesBefore = 3;
    if (typeof options2.linesAfter !== "number") options2.linesAfter = 2;
    var re = /\r?\n|\r|\0/g;
    var lineStarts = [0];
    var lineEnds = [];
    var match2;
    var foundLineNo = -1;
    while (match2 = re.exec(mark.buffer)) {
      lineEnds.push(match2.index);
      lineStarts.push(match2.index + match2[0].length);
      if (mark.position <= match2.index && foundLineNo < 0) {
        foundLineNo = lineStarts.length - 2;
      }
    }
    if (foundLineNo < 0) foundLineNo = lineStarts.length - 1;
    var result = "", i, line;
    var lineNoLength = Math.min(mark.line + options2.linesAfter, lineEnds.length).toString().length;
    var maxLineLength = options2.maxLength - (options2.indent + lineNoLength + 3);
    for (i = 1; i <= options2.linesBefore; i++) {
      if (foundLineNo - i < 0) break;
      line = getLine(
        mark.buffer,
        lineStarts[foundLineNo - i],
        lineEnds[foundLineNo - i],
        mark.position - (lineStarts[foundLineNo] - lineStarts[foundLineNo - i]),
        maxLineLength
      );
      result = common.repeat(" ", options2.indent) + padStart((mark.line - i + 1).toString(), lineNoLength) + " | " + line.str + "\n" + result;
    }
    line = getLine(mark.buffer, lineStarts[foundLineNo], lineEnds[foundLineNo], mark.position, maxLineLength);
    result += common.repeat(" ", options2.indent) + padStart((mark.line + 1).toString(), lineNoLength) + " | " + line.str + "\n";
    result += common.repeat("-", options2.indent + lineNoLength + 3 + line.pos) + "^\n";
    for (i = 1; i <= options2.linesAfter; i++) {
      if (foundLineNo + i >= lineEnds.length) break;
      line = getLine(
        mark.buffer,
        lineStarts[foundLineNo + i],
        lineEnds[foundLineNo + i],
        mark.position - (lineStarts[foundLineNo] - lineStarts[foundLineNo + i]),
        maxLineLength
      );
      result += common.repeat(" ", options2.indent) + padStart((mark.line + i + 1).toString(), lineNoLength) + " | " + line.str + "\n";
    }
    return result.replace(/\n$/, "");
  }
  var snippet = makeSnippet;
  var TYPE_CONSTRUCTOR_OPTIONS = [
    "kind",
    "multi",
    "resolve",
    "construct",
    "instanceOf",
    "predicate",
    "represent",
    "representName",
    "defaultStyle",
    "styleAliases"
  ];
  var YAML_NODE_KINDS = [
    "scalar",
    "sequence",
    "mapping"
  ];
  function compileStyleAliases(map20) {
    var result = {};
    if (map20 !== null) {
      Object.keys(map20).forEach(function(style) {
        map20[style].forEach(function(alias) {
          result[String(alias)] = style;
        });
      });
    }
    return result;
  }
  function Type$1(tag, options2) {
    options2 = options2 || {};
    Object.keys(options2).forEach(function(name15) {
      if (TYPE_CONSTRUCTOR_OPTIONS.indexOf(name15) === -1) {
        throw new exception('Unknown option "' + name15 + '" is met in definition of "' + tag + '" YAML type.');
      }
    });
    this.options = options2;
    this.tag = tag;
    this.kind = options2["kind"] || null;
    this.resolve = options2["resolve"] || function() {
      return true;
    };
    this.construct = options2["construct"] || function(data) {
      return data;
    };
    this.instanceOf = options2["instanceOf"] || null;
    this.predicate = options2["predicate"] || null;
    this.represent = options2["represent"] || null;
    this.representName = options2["representName"] || null;
    this.defaultStyle = options2["defaultStyle"] || null;
    this.multi = options2["multi"] || false;
    this.styleAliases = compileStyleAliases(options2["styleAliases"] || null);
    if (YAML_NODE_KINDS.indexOf(this.kind) === -1) {
      throw new exception('Unknown kind "' + this.kind + '" is specified for "' + tag + '" YAML type.');
    }
  }
  var type = Type$1;
  function compileList(schema2, name15) {
    var result = [];
    schema2[name15].forEach(function(currentType) {
      var newIndex = result.length;
      result.forEach(function(previousType, previousIndex) {
        if (previousType.tag === currentType.tag && previousType.kind === currentType.kind && previousType.multi === currentType.multi) {
          newIndex = previousIndex;
        }
      });
      result[newIndex] = currentType;
    });
    return result;
  }
  function compileMap() {
    var result = {
      scalar: {},
      sequence: {},
      mapping: {},
      fallback: {},
      multi: {
        scalar: [],
        sequence: [],
        mapping: [],
        fallback: []
      }
    }, index5, length9;
    function collectType(type2) {
      if (type2.multi) {
        result.multi[type2.kind].push(type2);
        result.multi["fallback"].push(type2);
      } else {
        result[type2.kind][type2.tag] = result["fallback"][type2.tag] = type2;
      }
    }
    for (index5 = 0, length9 = arguments.length; index5 < length9; index5 += 1) {
      arguments[index5].forEach(collectType);
    }
    return result;
  }
  function Schema$1(definition) {
    return this.extend(definition);
  }
  Schema$1.prototype.extend = function extend3(definition) {
    var implicit = [];
    var explicit = [];
    if (definition instanceof type) {
      explicit.push(definition);
    } else if (Array.isArray(definition)) {
      explicit = explicit.concat(definition);
    } else if (definition && (Array.isArray(definition.implicit) || Array.isArray(definition.explicit))) {
      if (definition.implicit) implicit = implicit.concat(definition.implicit);
      if (definition.explicit) explicit = explicit.concat(definition.explicit);
    } else {
      throw new exception("Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })");
    }
    implicit.forEach(function(type$1) {
      if (!(type$1 instanceof type)) {
        throw new exception("Specified list of YAML types (or a single Type object) contains a non-Type object.");
      }
      if (type$1.loadKind && type$1.loadKind !== "scalar") {
        throw new exception("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");
      }
      if (type$1.multi) {
        throw new exception("There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.");
      }
    });
    explicit.forEach(function(type$1) {
      if (!(type$1 instanceof type)) {
        throw new exception("Specified list of YAML types (or a single Type object) contains a non-Type object.");
      }
    });
    var result = Object.create(Schema$1.prototype);
    result.implicit = (this.implicit || []).concat(implicit);
    result.explicit = (this.explicit || []).concat(explicit);
    result.compiledImplicit = compileList(result, "implicit");
    result.compiledExplicit = compileList(result, "explicit");
    result.compiledTypeMap = compileMap(result.compiledImplicit, result.compiledExplicit);
    return result;
  };
  var schema = Schema$1;
  var str = new type("tag:yaml.org,2002:str", {
    kind: "scalar",
    construct: function(data) {
      return data !== null ? data : "";
    }
  });
  var seq = new type("tag:yaml.org,2002:seq", {
    kind: "sequence",
    construct: function(data) {
      return data !== null ? data : [];
    }
  });
  var map15 = new type("tag:yaml.org,2002:map", {
    kind: "mapping",
    construct: function(data) {
      return data !== null ? data : {};
    }
  });
  var failsafe = new schema({
    explicit: [
      str,
      seq,
      map15
    ]
  });
  function resolveYamlNull(data) {
    if (data === null) return true;
    var max10 = data.length;
    return max10 === 1 && data === "~" || max10 === 4 && (data === "null" || data === "Null" || data === "NULL");
  }
  function constructYamlNull() {
    return null;
  }
  function isNull2(object) {
    return object === null;
  }
  var _null = new type("tag:yaml.org,2002:null", {
    kind: "scalar",
    resolve: resolveYamlNull,
    construct: constructYamlNull,
    predicate: isNull2,
    represent: {
      canonical: function() {
        return "~";
      },
      lowercase: function() {
        return "null";
      },
      uppercase: function() {
        return "NULL";
      },
      camelcase: function() {
        return "Null";
      },
      empty: function() {
        return "";
      }
    },
    defaultStyle: "lowercase"
  });
  function resolveYamlBoolean(data) {
    if (data === null) return false;
    var max10 = data.length;
    return max10 === 4 && (data === "true" || data === "True" || data === "TRUE") || max10 === 5 && (data === "false" || data === "False" || data === "FALSE");
  }
  function constructYamlBoolean(data) {
    return data === "true" || data === "True" || data === "TRUE";
  }
  function isBoolean(object) {
    return Object.prototype.toString.call(object) === "[object Boolean]";
  }
  var bool = new type("tag:yaml.org,2002:bool", {
    kind: "scalar",
    resolve: resolveYamlBoolean,
    construct: constructYamlBoolean,
    predicate: isBoolean,
    represent: {
      lowercase: function(object) {
        return object ? "true" : "false";
      },
      uppercase: function(object) {
        return object ? "TRUE" : "FALSE";
      },
      camelcase: function(object) {
        return object ? "True" : "False";
      }
    },
    defaultStyle: "lowercase"
  });
  function isHexCode(c) {
    return 48 <= c && c <= 57 || 65 <= c && c <= 70 || 97 <= c && c <= 102;
  }
  function isOctCode(c) {
    return 48 <= c && c <= 55;
  }
  function isDecCode(c) {
    return 48 <= c && c <= 57;
  }
  function resolveYamlInteger(data) {
    if (data === null) return false;
    var max10 = data.length, index5 = 0, hasDigits = false, ch;
    if (!max10) return false;
    ch = data[index5];
    if (ch === "-" || ch === "+") {
      ch = data[++index5];
    }
    if (ch === "0") {
      if (index5 + 1 === max10) return true;
      ch = data[++index5];
      if (ch === "b") {
        index5++;
        for (; index5 < max10; index5++) {
          ch = data[index5];
          if (ch === "_") continue;
          if (ch !== "0" && ch !== "1") return false;
          hasDigits = true;
        }
        return hasDigits && ch !== "_";
      }
      if (ch === "x") {
        index5++;
        for (; index5 < max10; index5++) {
          ch = data[index5];
          if (ch === "_") continue;
          if (!isHexCode(data.charCodeAt(index5))) return false;
          hasDigits = true;
        }
        return hasDigits && ch !== "_";
      }
      if (ch === "o") {
        index5++;
        for (; index5 < max10; index5++) {
          ch = data[index5];
          if (ch === "_") continue;
          if (!isOctCode(data.charCodeAt(index5))) return false;
          hasDigits = true;
        }
        return hasDigits && ch !== "_";
      }
    }
    if (ch === "_") return false;
    for (; index5 < max10; index5++) {
      ch = data[index5];
      if (ch === "_") continue;
      if (!isDecCode(data.charCodeAt(index5))) {
        return false;
      }
      hasDigits = true;
    }
    if (!hasDigits || ch === "_") return false;
    return true;
  }
  function constructYamlInteger(data) {
    var value12 = data, sign2 = 1, ch;
    if (value12.indexOf("_") !== -1) {
      value12 = value12.replace(/_/g, "");
    }
    ch = value12[0];
    if (ch === "-" || ch === "+") {
      if (ch === "-") sign2 = -1;
      value12 = value12.slice(1);
      ch = value12[0];
    }
    if (value12 === "0") return 0;
    if (ch === "0") {
      if (value12[1] === "b") return sign2 * parseInt(value12.slice(2), 2);
      if (value12[1] === "x") return sign2 * parseInt(value12.slice(2), 16);
      if (value12[1] === "o") return sign2 * parseInt(value12.slice(2), 8);
    }
    return sign2 * parseInt(value12, 10);
  }
  function isInteger(object) {
    return Object.prototype.toString.call(object) === "[object Number]" && (object % 1 === 0 && !common.isNegativeZero(object));
  }
  var int = new type("tag:yaml.org,2002:int", {
    kind: "scalar",
    resolve: resolveYamlInteger,
    construct: constructYamlInteger,
    predicate: isInteger,
    represent: {
      binary: function(obj) {
        return obj >= 0 ? "0b" + obj.toString(2) : "-0b" + obj.toString(2).slice(1);
      },
      octal: function(obj) {
        return obj >= 0 ? "0o" + obj.toString(8) : "-0o" + obj.toString(8).slice(1);
      },
      decimal: function(obj) {
        return obj.toString(10);
      },
      /* eslint-disable max-len */
      hexadecimal: function(obj) {
        return obj >= 0 ? "0x" + obj.toString(16).toUpperCase() : "-0x" + obj.toString(16).toUpperCase().slice(1);
      }
    },
    defaultStyle: "decimal",
    styleAliases: {
      binary: [2, "bin"],
      octal: [8, "oct"],
      decimal: [10, "dec"],
      hexadecimal: [16, "hex"]
    }
  });
  var YAML_FLOAT_PATTERN = new RegExp(
    // 2.5e4, 2.5 and integers
    "^(?:[-+]?(?:[0-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"
  );
  function resolveYamlFloat(data) {
    if (data === null) return false;
    if (!YAML_FLOAT_PATTERN.test(data) || // Quick hack to not allow integers end with `_`
    // Probably should update regexp & check speed
    data[data.length - 1] === "_") {
      return false;
    }
    return true;
  }
  function constructYamlFloat(data) {
    var value12, sign2;
    value12 = data.replace(/_/g, "").toLowerCase();
    sign2 = value12[0] === "-" ? -1 : 1;
    if ("+-".indexOf(value12[0]) >= 0) {
      value12 = value12.slice(1);
    }
    if (value12 === ".inf") {
      return sign2 === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY;
    } else if (value12 === ".nan") {
      return NaN;
    }
    return sign2 * parseFloat(value12, 10);
  }
  var SCIENTIFIC_WITHOUT_DOT = /^[-+]?[0-9]+e/;
  function representYamlFloat(object, style) {
    var res;
    if (isNaN(object)) {
      switch (style) {
        case "lowercase":
          return ".nan";
        case "uppercase":
          return ".NAN";
        case "camelcase":
          return ".NaN";
      }
    } else if (Number.POSITIVE_INFINITY === object) {
      switch (style) {
        case "lowercase":
          return ".inf";
        case "uppercase":
          return ".INF";
        case "camelcase":
          return ".Inf";
      }
    } else if (Number.NEGATIVE_INFINITY === object) {
      switch (style) {
        case "lowercase":
          return "-.inf";
        case "uppercase":
          return "-.INF";
        case "camelcase":
          return "-.Inf";
      }
    } else if (common.isNegativeZero(object)) {
      return "-0.0";
    }
    res = object.toString(10);
    return SCIENTIFIC_WITHOUT_DOT.test(res) ? res.replace("e", ".e") : res;
  }
  function isFloat(object) {
    return Object.prototype.toString.call(object) === "[object Number]" && (object % 1 !== 0 || common.isNegativeZero(object));
  }
  var float = new type("tag:yaml.org,2002:float", {
    kind: "scalar",
    resolve: resolveYamlFloat,
    construct: constructYamlFloat,
    predicate: isFloat,
    represent: representYamlFloat,
    defaultStyle: "lowercase"
  });
  var json = failsafe.extend({
    implicit: [
      _null,
      bool,
      int,
      float
    ]
  });
  var core = json;
  var YAML_DATE_REGEXP = new RegExp(
    "^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"
  );
  var YAML_TIMESTAMP_REGEXP = new RegExp(
    "^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$"
  );
  function resolveYamlTimestamp(data) {
    if (data === null) return false;
    if (YAML_DATE_REGEXP.exec(data) !== null) return true;
    if (YAML_TIMESTAMP_REGEXP.exec(data) !== null) return true;
    return false;
  }
  function constructYamlTimestamp(data) {
    var match2, year2, month2, day2, hour2, minute2, second2, fraction = 0, delta = null, tz_hour, tz_minute, date2;
    match2 = YAML_DATE_REGEXP.exec(data);
    if (match2 === null) match2 = YAML_TIMESTAMP_REGEXP.exec(data);
    if (match2 === null) throw new Error("Date resolve error");
    year2 = +match2[1];
    month2 = +match2[2] - 1;
    day2 = +match2[3];
    if (!match2[4]) {
      return new Date(Date.UTC(year2, month2, day2));
    }
    hour2 = +match2[4];
    minute2 = +match2[5];
    second2 = +match2[6];
    if (match2[7]) {
      fraction = match2[7].slice(0, 3);
      while (fraction.length < 3) {
        fraction += "0";
      }
      fraction = +fraction;
    }
    if (match2[9]) {
      tz_hour = +match2[10];
      tz_minute = +(match2[11] || 0);
      delta = (tz_hour * 60 + tz_minute) * 6e4;
      if (match2[9] === "-") delta = -delta;
    }
    date2 = new Date(Date.UTC(year2, month2, day2, hour2, minute2, second2, fraction));
    if (delta) date2.setTime(date2.getTime() - delta);
    return date2;
  }
  function representYamlTimestamp(object) {
    return object.toISOString();
  }
  var timestamp = new type("tag:yaml.org,2002:timestamp", {
    kind: "scalar",
    resolve: resolveYamlTimestamp,
    construct: constructYamlTimestamp,
    instanceOf: Date,
    represent: representYamlTimestamp
  });
  function resolveYamlMerge(data) {
    return data === "<<" || data === null;
  }
  var merge = new type("tag:yaml.org,2002:merge", {
    kind: "scalar",
    resolve: resolveYamlMerge
  });
  var BASE64_MAP = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=\n\r";
  function resolveYamlBinary(data) {
    if (data === null) return false;
    var code, idx, bitlen = 0, max10 = data.length, map20 = BASE64_MAP;
    for (idx = 0; idx < max10; idx++) {
      code = map20.indexOf(data.charAt(idx));
      if (code > 64) continue;
      if (code < 0) return false;
      bitlen += 6;
    }
    return bitlen % 8 === 0;
  }
  function constructYamlBinary(data) {
    var idx, tailbits, input = data.replace(/[\r\n=]/g, ""), max10 = input.length, map20 = BASE64_MAP, bits = 0, result = [];
    for (idx = 0; idx < max10; idx++) {
      if (idx % 4 === 0 && idx) {
        result.push(bits >> 16 & 255);
        result.push(bits >> 8 & 255);
        result.push(bits & 255);
      }
      bits = bits << 6 | map20.indexOf(input.charAt(idx));
    }
    tailbits = max10 % 4 * 6;
    if (tailbits === 0) {
      result.push(bits >> 16 & 255);
      result.push(bits >> 8 & 255);
      result.push(bits & 255);
    } else if (tailbits === 18) {
      result.push(bits >> 10 & 255);
      result.push(bits >> 2 & 255);
    } else if (tailbits === 12) {
      result.push(bits >> 4 & 255);
    }
    return new Uint8Array(result);
  }
  function representYamlBinary(object) {
    var result = "", bits = 0, idx, tail2, max10 = object.length, map20 = BASE64_MAP;
    for (idx = 0; idx < max10; idx++) {
      if (idx % 3 === 0 && idx) {
        result += map20[bits >> 18 & 63];
        result += map20[bits >> 12 & 63];
        result += map20[bits >> 6 & 63];
        result += map20[bits & 63];
      }
      bits = (bits << 8) + object[idx];
    }
    tail2 = max10 % 3;
    if (tail2 === 0) {
      result += map20[bits >> 18 & 63];
      result += map20[bits >> 12 & 63];
      result += map20[bits >> 6 & 63];
      result += map20[bits & 63];
    } else if (tail2 === 2) {
      result += map20[bits >> 10 & 63];
      result += map20[bits >> 4 & 63];
      result += map20[bits << 2 & 63];
      result += map20[64];
    } else if (tail2 === 1) {
      result += map20[bits >> 2 & 63];
      result += map20[bits << 4 & 63];
      result += map20[64];
      result += map20[64];
    }
    return result;
  }
  function isBinary(obj) {
    return Object.prototype.toString.call(obj) === "[object Uint8Array]";
  }
  var binary = new type("tag:yaml.org,2002:binary", {
    kind: "scalar",
    resolve: resolveYamlBinary,
    construct: constructYamlBinary,
    predicate: isBinary,
    represent: representYamlBinary
  });
  var _hasOwnProperty$3 = Object.prototype.hasOwnProperty;
  var _toString$2 = Object.prototype.toString;
  function resolveYamlOmap(data) {
    if (data === null) return true;
    var objectKeys = [], index5, length9, pair, pairKey, pairHasKey, object = data;
    for (index5 = 0, length9 = object.length; index5 < length9; index5 += 1) {
      pair = object[index5];
      pairHasKey = false;
      if (_toString$2.call(pair) !== "[object Object]") return false;
      for (pairKey in pair) {
        if (_hasOwnProperty$3.call(pair, pairKey)) {
          if (!pairHasKey) pairHasKey = true;
          else return false;
        }
      }
      if (!pairHasKey) return false;
      if (objectKeys.indexOf(pairKey) === -1) objectKeys.push(pairKey);
      else return false;
    }
    return true;
  }
  function constructYamlOmap(data) {
    return data !== null ? data : [];
  }
  var omap = new type("tag:yaml.org,2002:omap", {
    kind: "sequence",
    resolve: resolveYamlOmap,
    construct: constructYamlOmap
  });
  var _toString$1 = Object.prototype.toString;
  function resolveYamlPairs(data) {
    if (data === null) return true;
    var index5, length9, pair, keys4, result, object = data;
    result = new Array(object.length);
    for (index5 = 0, length9 = object.length; index5 < length9; index5 += 1) {
      pair = object[index5];
      if (_toString$1.call(pair) !== "[object Object]") return false;
      keys4 = Object.keys(pair);
      if (keys4.length !== 1) return false;
      result[index5] = [keys4[0], pair[keys4[0]]];
    }
    return true;
  }
  function constructYamlPairs(data) {
    if (data === null) return [];
    var index5, length9, pair, keys4, result, object = data;
    result = new Array(object.length);
    for (index5 = 0, length9 = object.length; index5 < length9; index5 += 1) {
      pair = object[index5];
      keys4 = Object.keys(pair);
      result[index5] = [keys4[0], pair[keys4[0]]];
    }
    return result;
  }
  var pairs = new type("tag:yaml.org,2002:pairs", {
    kind: "sequence",
    resolve: resolveYamlPairs,
    construct: constructYamlPairs
  });
  var _hasOwnProperty$2 = Object.prototype.hasOwnProperty;
  function resolveYamlSet(data) {
    if (data === null) return true;
    var key, object = data;
    for (key in object) {
      if (_hasOwnProperty$2.call(object, key)) {
        if (object[key] !== null) return false;
      }
    }
    return true;
  }
  function constructYamlSet(data) {
    return data !== null ? data : {};
  }
  var set = new type("tag:yaml.org,2002:set", {
    kind: "mapping",
    resolve: resolveYamlSet,
    construct: constructYamlSet
  });
  var _default = core.extend({
    implicit: [
      timestamp,
      merge
    ],
    explicit: [
      binary,
      omap,
      pairs,
      set
    ]
  });
  var _hasOwnProperty$1 = Object.prototype.hasOwnProperty;
  var CONTEXT_FLOW_IN = 1;
  var CONTEXT_FLOW_OUT = 2;
  var CONTEXT_BLOCK_IN = 3;
  var CONTEXT_BLOCK_OUT = 4;
  var CHOMPING_CLIP = 1;
  var CHOMPING_STRIP = 2;
  var CHOMPING_KEEP = 3;
  var PATTERN_NON_PRINTABLE = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;
  var PATTERN_NON_ASCII_LINE_BREAKS = /[\x85\u2028\u2029]/;
  var PATTERN_FLOW_INDICATORS = /[,\[\]\{\}]/;
  var PATTERN_TAG_HANDLE = /^(?:!|!!|![a-z\-]+!)$/i;
  var PATTERN_TAG_URI = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;
  function _class(obj) {
    return Object.prototype.toString.call(obj);
  }
  function is_EOL(c) {
    return c === 10 || c === 13;
  }
  function is_WHITE_SPACE(c) {
    return c === 9 || c === 32;
  }
  function is_WS_OR_EOL(c) {
    return c === 9 || c === 32 || c === 10 || c === 13;
  }
  function is_FLOW_INDICATOR(c) {
    return c === 44 || c === 91 || c === 93 || c === 123 || c === 125;
  }
  function fromHexCode(c) {
    var lc;
    if (48 <= c && c <= 57) {
      return c - 48;
    }
    lc = c | 32;
    if (97 <= lc && lc <= 102) {
      return lc - 97 + 10;
    }
    return -1;
  }
  function escapedHexLen(c) {
    if (c === 120) {
      return 2;
    }
    if (c === 117) {
      return 4;
    }
    if (c === 85) {
      return 8;
    }
    return 0;
  }
  function fromDecimalCode(c) {
    if (48 <= c && c <= 57) {
      return c - 48;
    }
    return -1;
  }
  function simpleEscapeSequence(c) {
    return c === 48 ? "\0" : c === 97 ? "\x07" : c === 98 ? "\b" : c === 116 ? "	" : c === 9 ? "	" : c === 110 ? "\n" : c === 118 ? "\v" : c === 102 ? "\f" : c === 114 ? "\r" : c === 101 ? "\x1B" : c === 32 ? " " : c === 34 ? '"' : c === 47 ? "/" : c === 92 ? "\\" : c === 78 ? "\x85" : c === 95 ? "\xA0" : c === 76 ? "\u2028" : c === 80 ? "\u2029" : "";
  }
  function charFromCodepoint(c) {
    if (c <= 65535) {
      return String.fromCharCode(c);
    }
    return String.fromCharCode(
      (c - 65536 >> 10) + 55296,
      (c - 65536 & 1023) + 56320
    );
  }
  var simpleEscapeCheck = new Array(256);
  var simpleEscapeMap = new Array(256);
  for (i = 0; i < 256; i++) {
    simpleEscapeCheck[i] = simpleEscapeSequence(i) ? 1 : 0;
    simpleEscapeMap[i] = simpleEscapeSequence(i);
  }
  var i;
  function State$1(input, options2) {
    this.input = input;
    this.filename = options2["filename"] || null;
    this.schema = options2["schema"] || _default;
    this.onWarning = options2["onWarning"] || null;
    this.legacy = options2["legacy"] || false;
    this.json = options2["json"] || false;
    this.listener = options2["listener"] || null;
    this.implicitTypes = this.schema.compiledImplicit;
    this.typeMap = this.schema.compiledTypeMap;
    this.length = input.length;
    this.position = 0;
    this.line = 0;
    this.lineStart = 0;
    this.lineIndent = 0;
    this.firstTabInLine = -1;
    this.documents = [];
  }
  function generateError(state3, message2) {
    var mark = {
      name: state3.filename,
      buffer: state3.input.slice(0, -1),
      // omit trailing \0
      position: state3.position,
      line: state3.line,
      column: state3.position - state3.lineStart
    };
    mark.snippet = snippet(mark);
    return new exception(message2, mark);
  }
  function throwError3(state3, message2) {
    throw generateError(state3, message2);
  }
  function throwWarning(state3, message2) {
    if (state3.onWarning) {
      state3.onWarning.call(null, generateError(state3, message2));
    }
  }
  var directiveHandlers = {
    YAML: function handleYamlDirective(state3, name15, args) {
      var match2, major, minor;
      if (state3.version !== null) {
        throwError3(state3, "duplication of %YAML directive");
      }
      if (args.length !== 1) {
        throwError3(state3, "YAML directive accepts exactly one argument");
      }
      match2 = /^([0-9]+)\.([0-9]+)$/.exec(args[0]);
      if (match2 === null) {
        throwError3(state3, "ill-formed argument of the YAML directive");
      }
      major = parseInt(match2[1], 10);
      minor = parseInt(match2[2], 10);
      if (major !== 1) {
        throwError3(state3, "unacceptable YAML version of the document");
      }
      state3.version = args[0];
      state3.checkLineBreaks = minor < 2;
      if (minor !== 1 && minor !== 2) {
        throwWarning(state3, "unsupported YAML version of the document");
      }
    },
    TAG: function handleTagDirective(state3, name15, args) {
      var handle, prefix;
      if (args.length !== 2) {
        throwError3(state3, "TAG directive accepts exactly two arguments");
      }
      handle = args[0];
      prefix = args[1];
      if (!PATTERN_TAG_HANDLE.test(handle)) {
        throwError3(state3, "ill-formed tag handle (first argument) of the TAG directive");
      }
      if (_hasOwnProperty$1.call(state3.tagMap, handle)) {
        throwError3(state3, 'there is a previously declared suffix for "' + handle + '" tag handle');
      }
      if (!PATTERN_TAG_URI.test(prefix)) {
        throwError3(state3, "ill-formed tag prefix (second argument) of the TAG directive");
      }
      try {
        prefix = decodeURIComponent(prefix);
      } catch (err) {
        throwError3(state3, "tag prefix is malformed: " + prefix);
      }
      state3.tagMap[handle] = prefix;
    }
  };
  function captureSegment(state3, start2, end, checkJson) {
    var _position, _length, _character, _result;
    if (start2 < end) {
      _result = state3.input.slice(start2, end);
      if (checkJson) {
        for (_position = 0, _length = _result.length; _position < _length; _position += 1) {
          _character = _result.charCodeAt(_position);
          if (!(_character === 9 || 32 <= _character && _character <= 1114111)) {
            throwError3(state3, "expected valid JSON character");
          }
        }
      } else if (PATTERN_NON_PRINTABLE.test(_result)) {
        throwError3(state3, "the stream contains non-printable characters");
      }
      state3.result += _result;
    }
  }
  function mergeMappings(state3, destination, source2, overridableKeys) {
    var sourceKeys, key, index5, quantity;
    if (!common.isObject(source2)) {
      throwError3(state3, "cannot merge mappings; the provided source object is unacceptable");
    }
    sourceKeys = Object.keys(source2);
    for (index5 = 0, quantity = sourceKeys.length; index5 < quantity; index5 += 1) {
      key = sourceKeys[index5];
      if (!_hasOwnProperty$1.call(destination, key)) {
        destination[key] = source2[key];
        overridableKeys[key] = true;
      }
    }
  }
  function storeMappingPair(state3, _result, overridableKeys, keyTag, keyNode, valueNode, startLine, startLineStart, startPos) {
    var index5, quantity;
    if (Array.isArray(keyNode)) {
      keyNode = Array.prototype.slice.call(keyNode);
      for (index5 = 0, quantity = keyNode.length; index5 < quantity; index5 += 1) {
        if (Array.isArray(keyNode[index5])) {
          throwError3(state3, "nested arrays are not supported inside keys");
        }
        if (typeof keyNode === "object" && _class(keyNode[index5]) === "[object Object]") {
          keyNode[index5] = "[object Object]";
        }
      }
    }
    if (typeof keyNode === "object" && _class(keyNode) === "[object Object]") {
      keyNode = "[object Object]";
    }
    keyNode = String(keyNode);
    if (_result === null) {
      _result = {};
    }
    if (keyTag === "tag:yaml.org,2002:merge") {
      if (Array.isArray(valueNode)) {
        for (index5 = 0, quantity = valueNode.length; index5 < quantity; index5 += 1) {
          mergeMappings(state3, _result, valueNode[index5], overridableKeys);
        }
      } else {
        mergeMappings(state3, _result, valueNode, overridableKeys);
      }
    } else {
      if (!state3.json && !_hasOwnProperty$1.call(overridableKeys, keyNode) && _hasOwnProperty$1.call(_result, keyNode)) {
        state3.line = startLine || state3.line;
        state3.lineStart = startLineStart || state3.lineStart;
        state3.position = startPos || state3.position;
        throwError3(state3, "duplicated mapping key");
      }
      if (keyNode === "__proto__") {
        Object.defineProperty(_result, keyNode, {
          configurable: true,
          enumerable: true,
          writable: true,
          value: valueNode
        });
      } else {
        _result[keyNode] = valueNode;
      }
      delete overridableKeys[keyNode];
    }
    return _result;
  }
  function readLineBreak(state3) {
    var ch;
    ch = state3.input.charCodeAt(state3.position);
    if (ch === 10) {
      state3.position++;
    } else if (ch === 13) {
      state3.position++;
      if (state3.input.charCodeAt(state3.position) === 10) {
        state3.position++;
      }
    } else {
      throwError3(state3, "a line break is expected");
    }
    state3.line += 1;
    state3.lineStart = state3.position;
    state3.firstTabInLine = -1;
  }
  function skipSeparationSpace(state3, allowComments, checkIndent) {
    var lineBreaks = 0, ch = state3.input.charCodeAt(state3.position);
    while (ch !== 0) {
      while (is_WHITE_SPACE(ch)) {
        if (ch === 9 && state3.firstTabInLine === -1) {
          state3.firstTabInLine = state3.position;
        }
        ch = state3.input.charCodeAt(++state3.position);
      }
      if (allowComments && ch === 35) {
        do {
          ch = state3.input.charCodeAt(++state3.position);
        } while (ch !== 10 && ch !== 13 && ch !== 0);
      }
      if (is_EOL(ch)) {
        readLineBreak(state3);
        ch = state3.input.charCodeAt(state3.position);
        lineBreaks++;
        state3.lineIndent = 0;
        while (ch === 32) {
          state3.lineIndent++;
          ch = state3.input.charCodeAt(++state3.position);
        }
      } else {
        break;
      }
    }
    if (checkIndent !== -1 && lineBreaks !== 0 && state3.lineIndent < checkIndent) {
      throwWarning(state3, "deficient indentation");
    }
    return lineBreaks;
  }
  function testDocumentSeparator(state3) {
    var _position = state3.position, ch;
    ch = state3.input.charCodeAt(_position);
    if ((ch === 45 || ch === 46) && ch === state3.input.charCodeAt(_position + 1) && ch === state3.input.charCodeAt(_position + 2)) {
      _position += 3;
      ch = state3.input.charCodeAt(_position);
      if (ch === 0 || is_WS_OR_EOL(ch)) {
        return true;
      }
    }
    return false;
  }
  function writeFoldedLines(state3, count) {
    if (count === 1) {
      state3.result += " ";
    } else if (count > 1) {
      state3.result += common.repeat("\n", count - 1);
    }
  }
  function readPlainScalar(state3, nodeIndent, withinFlowCollection) {
    var preceding, following, captureStart, captureEnd, hasPendingContent, _line, _lineStart, _lineIndent, _kind = state3.kind, _result = state3.result, ch;
    ch = state3.input.charCodeAt(state3.position);
    if (is_WS_OR_EOL(ch) || is_FLOW_INDICATOR(ch) || ch === 35 || ch === 38 || ch === 42 || ch === 33 || ch === 124 || ch === 62 || ch === 39 || ch === 34 || ch === 37 || ch === 64 || ch === 96) {
      return false;
    }
    if (ch === 63 || ch === 45) {
      following = state3.input.charCodeAt(state3.position + 1);
      if (is_WS_OR_EOL(following) || withinFlowCollection && is_FLOW_INDICATOR(following)) {
        return false;
      }
    }
    state3.kind = "scalar";
    state3.result = "";
    captureStart = captureEnd = state3.position;
    hasPendingContent = false;
    while (ch !== 0) {
      if (ch === 58) {
        following = state3.input.charCodeAt(state3.position + 1);
        if (is_WS_OR_EOL(following) || withinFlowCollection && is_FLOW_INDICATOR(following)) {
          break;
        }
      } else if (ch === 35) {
        preceding = state3.input.charCodeAt(state3.position - 1);
        if (is_WS_OR_EOL(preceding)) {
          break;
        }
      } else if (state3.position === state3.lineStart && testDocumentSeparator(state3) || withinFlowCollection && is_FLOW_INDICATOR(ch)) {
        break;
      } else if (is_EOL(ch)) {
        _line = state3.line;
        _lineStart = state3.lineStart;
        _lineIndent = state3.lineIndent;
        skipSeparationSpace(state3, false, -1);
        if (state3.lineIndent >= nodeIndent) {
          hasPendingContent = true;
          ch = state3.input.charCodeAt(state3.position);
          continue;
        } else {
          state3.position = captureEnd;
          state3.line = _line;
          state3.lineStart = _lineStart;
          state3.lineIndent = _lineIndent;
          break;
        }
      }
      if (hasPendingContent) {
        captureSegment(state3, captureStart, captureEnd, false);
        writeFoldedLines(state3, state3.line - _line);
        captureStart = captureEnd = state3.position;
        hasPendingContent = false;
      }
      if (!is_WHITE_SPACE(ch)) {
        captureEnd = state3.position + 1;
      }
      ch = state3.input.charCodeAt(++state3.position);
    }
    captureSegment(state3, captureStart, captureEnd, false);
    if (state3.result) {
      return true;
    }
    state3.kind = _kind;
    state3.result = _result;
    return false;
  }
  function readSingleQuotedScalar(state3, nodeIndent) {
    var ch, captureStart, captureEnd;
    ch = state3.input.charCodeAt(state3.position);
    if (ch !== 39) {
      return false;
    }
    state3.kind = "scalar";
    state3.result = "";
    state3.position++;
    captureStart = captureEnd = state3.position;
    while ((ch = state3.input.charCodeAt(state3.position)) !== 0) {
      if (ch === 39) {
        captureSegment(state3, captureStart, state3.position, true);
        ch = state3.input.charCodeAt(++state3.position);
        if (ch === 39) {
          captureStart = state3.position;
          state3.position++;
          captureEnd = state3.position;
        } else {
          return true;
        }
      } else if (is_EOL(ch)) {
        captureSegment(state3, captureStart, captureEnd, true);
        writeFoldedLines(state3, skipSeparationSpace(state3, false, nodeIndent));
        captureStart = captureEnd = state3.position;
      } else if (state3.position === state3.lineStart && testDocumentSeparator(state3)) {
        throwError3(state3, "unexpected end of the document within a single quoted scalar");
      } else {
        state3.position++;
        captureEnd = state3.position;
      }
    }
    throwError3(state3, "unexpected end of the stream within a single quoted scalar");
  }
  function readDoubleQuotedScalar(state3, nodeIndent) {
    var captureStart, captureEnd, hexLength, hexResult, tmp, ch;
    ch = state3.input.charCodeAt(state3.position);
    if (ch !== 34) {
      return false;
    }
    state3.kind = "scalar";
    state3.result = "";
    state3.position++;
    captureStart = captureEnd = state3.position;
    while ((ch = state3.input.charCodeAt(state3.position)) !== 0) {
      if (ch === 34) {
        captureSegment(state3, captureStart, state3.position, true);
        state3.position++;
        return true;
      } else if (ch === 92) {
        captureSegment(state3, captureStart, state3.position, true);
        ch = state3.input.charCodeAt(++state3.position);
        if (is_EOL(ch)) {
          skipSeparationSpace(state3, false, nodeIndent);
        } else if (ch < 256 && simpleEscapeCheck[ch]) {
          state3.result += simpleEscapeMap[ch];
          state3.position++;
        } else if ((tmp = escapedHexLen(ch)) > 0) {
          hexLength = tmp;
          hexResult = 0;
          for (; hexLength > 0; hexLength--) {
            ch = state3.input.charCodeAt(++state3.position);
            if ((tmp = fromHexCode(ch)) >= 0) {
              hexResult = (hexResult << 4) + tmp;
            } else {
              throwError3(state3, "expected hexadecimal character");
            }
          }
          state3.result += charFromCodepoint(hexResult);
          state3.position++;
        } else {
          throwError3(state3, "unknown escape sequence");
        }
        captureStart = captureEnd = state3.position;
      } else if (is_EOL(ch)) {
        captureSegment(state3, captureStart, captureEnd, true);
        writeFoldedLines(state3, skipSeparationSpace(state3, false, nodeIndent));
        captureStart = captureEnd = state3.position;
      } else if (state3.position === state3.lineStart && testDocumentSeparator(state3)) {
        throwError3(state3, "unexpected end of the document within a double quoted scalar");
      } else {
        state3.position++;
        captureEnd = state3.position;
      }
    }
    throwError3(state3, "unexpected end of the stream within a double quoted scalar");
  }
  function readFlowCollection(state3, nodeIndent) {
    var readNext = true, _line, _lineStart, _pos, _tag = state3.tag, _result, _anchor = state3.anchor, following, terminator, isPair, isExplicitPair, isMapping, overridableKeys = /* @__PURE__ */ Object.create(null), keyNode, keyTag, valueNode, ch;
    ch = state3.input.charCodeAt(state3.position);
    if (ch === 91) {
      terminator = 93;
      isMapping = false;
      _result = [];
    } else if (ch === 123) {
      terminator = 125;
      isMapping = true;
      _result = {};
    } else {
      return false;
    }
    if (state3.anchor !== null) {
      state3.anchorMap[state3.anchor] = _result;
    }
    ch = state3.input.charCodeAt(++state3.position);
    while (ch !== 0) {
      skipSeparationSpace(state3, true, nodeIndent);
      ch = state3.input.charCodeAt(state3.position);
      if (ch === terminator) {
        state3.position++;
        state3.tag = _tag;
        state3.anchor = _anchor;
        state3.kind = isMapping ? "mapping" : "sequence";
        state3.result = _result;
        return true;
      } else if (!readNext) {
        throwError3(state3, "missed comma between flow collection entries");
      } else if (ch === 44) {
        throwError3(state3, "expected the node content, but found ','");
      }
      keyTag = keyNode = valueNode = null;
      isPair = isExplicitPair = false;
      if (ch === 63) {
        following = state3.input.charCodeAt(state3.position + 1);
        if (is_WS_OR_EOL(following)) {
          isPair = isExplicitPair = true;
          state3.position++;
          skipSeparationSpace(state3, true, nodeIndent);
        }
      }
      _line = state3.line;
      _lineStart = state3.lineStart;
      _pos = state3.position;
      composeNode(state3, nodeIndent, CONTEXT_FLOW_IN, false, true);
      keyTag = state3.tag;
      keyNode = state3.result;
      skipSeparationSpace(state3, true, nodeIndent);
      ch = state3.input.charCodeAt(state3.position);
      if ((isExplicitPair || state3.line === _line) && ch === 58) {
        isPair = true;
        ch = state3.input.charCodeAt(++state3.position);
        skipSeparationSpace(state3, true, nodeIndent);
        composeNode(state3, nodeIndent, CONTEXT_FLOW_IN, false, true);
        valueNode = state3.result;
      }
      if (isMapping) {
        storeMappingPair(state3, _result, overridableKeys, keyTag, keyNode, valueNode, _line, _lineStart, _pos);
      } else if (isPair) {
        _result.push(storeMappingPair(state3, null, overridableKeys, keyTag, keyNode, valueNode, _line, _lineStart, _pos));
      } else {
        _result.push(keyNode);
      }
      skipSeparationSpace(state3, true, nodeIndent);
      ch = state3.input.charCodeAt(state3.position);
      if (ch === 44) {
        readNext = true;
        ch = state3.input.charCodeAt(++state3.position);
      } else {
        readNext = false;
      }
    }
    throwError3(state3, "unexpected end of the stream within a flow collection");
  }
  function readBlockScalar(state3, nodeIndent) {
    var captureStart, folding, chomping = CHOMPING_CLIP, didReadContent = false, detectedIndent = false, textIndent = nodeIndent, emptyLines = 0, atMoreIndented = false, tmp, ch;
    ch = state3.input.charCodeAt(state3.position);
    if (ch === 124) {
      folding = false;
    } else if (ch === 62) {
      folding = true;
    } else {
      return false;
    }
    state3.kind = "scalar";
    state3.result = "";
    while (ch !== 0) {
      ch = state3.input.charCodeAt(++state3.position);
      if (ch === 43 || ch === 45) {
        if (CHOMPING_CLIP === chomping) {
          chomping = ch === 43 ? CHOMPING_KEEP : CHOMPING_STRIP;
        } else {
          throwError3(state3, "repeat of a chomping mode identifier");
        }
      } else if ((tmp = fromDecimalCode(ch)) >= 0) {
        if (tmp === 0) {
          throwError3(state3, "bad explicit indentation width of a block scalar; it cannot be less than one");
        } else if (!detectedIndent) {
          textIndent = nodeIndent + tmp - 1;
          detectedIndent = true;
        } else {
          throwError3(state3, "repeat of an indentation width identifier");
        }
      } else {
        break;
      }
    }
    if (is_WHITE_SPACE(ch)) {
      do {
        ch = state3.input.charCodeAt(++state3.position);
      } while (is_WHITE_SPACE(ch));
      if (ch === 35) {
        do {
          ch = state3.input.charCodeAt(++state3.position);
        } while (!is_EOL(ch) && ch !== 0);
      }
    }
    while (ch !== 0) {
      readLineBreak(state3);
      state3.lineIndent = 0;
      ch = state3.input.charCodeAt(state3.position);
      while ((!detectedIndent || state3.lineIndent < textIndent) && ch === 32) {
        state3.lineIndent++;
        ch = state3.input.charCodeAt(++state3.position);
      }
      if (!detectedIndent && state3.lineIndent > textIndent) {
        textIndent = state3.lineIndent;
      }
      if (is_EOL(ch)) {
        emptyLines++;
        continue;
      }
      if (state3.lineIndent < textIndent) {
        if (chomping === CHOMPING_KEEP) {
          state3.result += common.repeat("\n", didReadContent ? 1 + emptyLines : emptyLines);
        } else if (chomping === CHOMPING_CLIP) {
          if (didReadContent) {
            state3.result += "\n";
          }
        }
        break;
      }
      if (folding) {
        if (is_WHITE_SPACE(ch)) {
          atMoreIndented = true;
          state3.result += common.repeat("\n", didReadContent ? 1 + emptyLines : emptyLines);
        } else if (atMoreIndented) {
          atMoreIndented = false;
          state3.result += common.repeat("\n", emptyLines + 1);
        } else if (emptyLines === 0) {
          if (didReadContent) {
            state3.result += " ";
          }
        } else {
          state3.result += common.repeat("\n", emptyLines);
        }
      } else {
        state3.result += common.repeat("\n", didReadContent ? 1 + emptyLines : emptyLines);
      }
      didReadContent = true;
      detectedIndent = true;
      emptyLines = 0;
      captureStart = state3.position;
      while (!is_EOL(ch) && ch !== 0) {
        ch = state3.input.charCodeAt(++state3.position);
      }
      captureSegment(state3, captureStart, state3.position, false);
    }
    return true;
  }
  function readBlockSequence(state3, nodeIndent) {
    var _line, _tag = state3.tag, _anchor = state3.anchor, _result = [], following, detected = false, ch;
    if (state3.firstTabInLine !== -1) return false;
    if (state3.anchor !== null) {
      state3.anchorMap[state3.anchor] = _result;
    }
    ch = state3.input.charCodeAt(state3.position);
    while (ch !== 0) {
      if (state3.firstTabInLine !== -1) {
        state3.position = state3.firstTabInLine;
        throwError3(state3, "tab characters must not be used in indentation");
      }
      if (ch !== 45) {
        break;
      }
      following = state3.input.charCodeAt(state3.position + 1);
      if (!is_WS_OR_EOL(following)) {
        break;
      }
      detected = true;
      state3.position++;
      if (skipSeparationSpace(state3, true, -1)) {
        if (state3.lineIndent <= nodeIndent) {
          _result.push(null);
          ch = state3.input.charCodeAt(state3.position);
          continue;
        }
      }
      _line = state3.line;
      composeNode(state3, nodeIndent, CONTEXT_BLOCK_IN, false, true);
      _result.push(state3.result);
      skipSeparationSpace(state3, true, -1);
      ch = state3.input.charCodeAt(state3.position);
      if ((state3.line === _line || state3.lineIndent > nodeIndent) && ch !== 0) {
        throwError3(state3, "bad indentation of a sequence entry");
      } else if (state3.lineIndent < nodeIndent) {
        break;
      }
    }
    if (detected) {
      state3.tag = _tag;
      state3.anchor = _anchor;
      state3.kind = "sequence";
      state3.result = _result;
      return true;
    }
    return false;
  }
  function readBlockMapping(state3, nodeIndent, flowIndent) {
    var following, allowCompact, _line, _keyLine, _keyLineStart, _keyPos, _tag = state3.tag, _anchor = state3.anchor, _result = {}, overridableKeys = /* @__PURE__ */ Object.create(null), keyTag = null, keyNode = null, valueNode = null, atExplicitKey = false, detected = false, ch;
    if (state3.firstTabInLine !== -1) return false;
    if (state3.anchor !== null) {
      state3.anchorMap[state3.anchor] = _result;
    }
    ch = state3.input.charCodeAt(state3.position);
    while (ch !== 0) {
      if (!atExplicitKey && state3.firstTabInLine !== -1) {
        state3.position = state3.firstTabInLine;
        throwError3(state3, "tab characters must not be used in indentation");
      }
      following = state3.input.charCodeAt(state3.position + 1);
      _line = state3.line;
      if ((ch === 63 || ch === 58) && is_WS_OR_EOL(following)) {
        if (ch === 63) {
          if (atExplicitKey) {
            storeMappingPair(state3, _result, overridableKeys, keyTag, keyNode, null, _keyLine, _keyLineStart, _keyPos);
            keyTag = keyNode = valueNode = null;
          }
          detected = true;
          atExplicitKey = true;
          allowCompact = true;
        } else if (atExplicitKey) {
          atExplicitKey = false;
          allowCompact = true;
        } else {
          throwError3(state3, "incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line");
        }
        state3.position += 1;
        ch = following;
      } else {
        _keyLine = state3.line;
        _keyLineStart = state3.lineStart;
        _keyPos = state3.position;
        if (!composeNode(state3, flowIndent, CONTEXT_FLOW_OUT, false, true)) {
          break;
        }
        if (state3.line === _line) {
          ch = state3.input.charCodeAt(state3.position);
          while (is_WHITE_SPACE(ch)) {
            ch = state3.input.charCodeAt(++state3.position);
          }
          if (ch === 58) {
            ch = state3.input.charCodeAt(++state3.position);
            if (!is_WS_OR_EOL(ch)) {
              throwError3(state3, "a whitespace character is expected after the key-value separator within a block mapping");
            }
            if (atExplicitKey) {
              storeMappingPair(state3, _result, overridableKeys, keyTag, keyNode, null, _keyLine, _keyLineStart, _keyPos);
              keyTag = keyNode = valueNode = null;
            }
            detected = true;
            atExplicitKey = false;
            allowCompact = false;
            keyTag = state3.tag;
            keyNode = state3.result;
          } else if (detected) {
            throwError3(state3, "can not read an implicit mapping pair; a colon is missed");
          } else {
            state3.tag = _tag;
            state3.anchor = _anchor;
            return true;
          }
        } else if (detected) {
          throwError3(state3, "can not read a block mapping entry; a multiline key may not be an implicit key");
        } else {
          state3.tag = _tag;
          state3.anchor = _anchor;
          return true;
        }
      }
      if (state3.line === _line || state3.lineIndent > nodeIndent) {
        if (atExplicitKey) {
          _keyLine = state3.line;
          _keyLineStart = state3.lineStart;
          _keyPos = state3.position;
        }
        if (composeNode(state3, nodeIndent, CONTEXT_BLOCK_OUT, true, allowCompact)) {
          if (atExplicitKey) {
            keyNode = state3.result;
          } else {
            valueNode = state3.result;
          }
        }
        if (!atExplicitKey) {
          storeMappingPair(state3, _result, overridableKeys, keyTag, keyNode, valueNode, _keyLine, _keyLineStart, _keyPos);
          keyTag = keyNode = valueNode = null;
        }
        skipSeparationSpace(state3, true, -1);
        ch = state3.input.charCodeAt(state3.position);
      }
      if ((state3.line === _line || state3.lineIndent > nodeIndent) && ch !== 0) {
        throwError3(state3, "bad indentation of a mapping entry");
      } else if (state3.lineIndent < nodeIndent) {
        break;
      }
    }
    if (atExplicitKey) {
      storeMappingPair(state3, _result, overridableKeys, keyTag, keyNode, null, _keyLine, _keyLineStart, _keyPos);
    }
    if (detected) {
      state3.tag = _tag;
      state3.anchor = _anchor;
      state3.kind = "mapping";
      state3.result = _result;
    }
    return detected;
  }
  function readTagProperty(state3) {
    var _position, isVerbatim = false, isNamed = false, tagHandle, tagName2, ch;
    ch = state3.input.charCodeAt(state3.position);
    if (ch !== 33) return false;
    if (state3.tag !== null) {
      throwError3(state3, "duplication of a tag property");
    }
    ch = state3.input.charCodeAt(++state3.position);
    if (ch === 60) {
      isVerbatim = true;
      ch = state3.input.charCodeAt(++state3.position);
    } else if (ch === 33) {
      isNamed = true;
      tagHandle = "!!";
      ch = state3.input.charCodeAt(++state3.position);
    } else {
      tagHandle = "!";
    }
    _position = state3.position;
    if (isVerbatim) {
      do {
        ch = state3.input.charCodeAt(++state3.position);
      } while (ch !== 0 && ch !== 62);
      if (state3.position < state3.length) {
        tagName2 = state3.input.slice(_position, state3.position);
        ch = state3.input.charCodeAt(++state3.position);
      } else {
        throwError3(state3, "unexpected end of the stream within a verbatim tag");
      }
    } else {
      while (ch !== 0 && !is_WS_OR_EOL(ch)) {
        if (ch === 33) {
          if (!isNamed) {
            tagHandle = state3.input.slice(_position - 1, state3.position + 1);
            if (!PATTERN_TAG_HANDLE.test(tagHandle)) {
              throwError3(state3, "named tag handle cannot contain such characters");
            }
            isNamed = true;
            _position = state3.position + 1;
          } else {
            throwError3(state3, "tag suffix cannot contain exclamation marks");
          }
        }
        ch = state3.input.charCodeAt(++state3.position);
      }
      tagName2 = state3.input.slice(_position, state3.position);
      if (PATTERN_FLOW_INDICATORS.test(tagName2)) {
        throwError3(state3, "tag suffix cannot contain flow indicator characters");
      }
    }
    if (tagName2 && !PATTERN_TAG_URI.test(tagName2)) {
      throwError3(state3, "tag name cannot contain such characters: " + tagName2);
    }
    try {
      tagName2 = decodeURIComponent(tagName2);
    } catch (err) {
      throwError3(state3, "tag name is malformed: " + tagName2);
    }
    if (isVerbatim) {
      state3.tag = tagName2;
    } else if (_hasOwnProperty$1.call(state3.tagMap, tagHandle)) {
      state3.tag = state3.tagMap[tagHandle] + tagName2;
    } else if (tagHandle === "!") {
      state3.tag = "!" + tagName2;
    } else if (tagHandle === "!!") {
      state3.tag = "tag:yaml.org,2002:" + tagName2;
    } else {
      throwError3(state3, 'undeclared tag handle "' + tagHandle + '"');
    }
    return true;
  }
  function readAnchorProperty(state3) {
    var _position, ch;
    ch = state3.input.charCodeAt(state3.position);
    if (ch !== 38) return false;
    if (state3.anchor !== null) {
      throwError3(state3, "duplication of an anchor property");
    }
    ch = state3.input.charCodeAt(++state3.position);
    _position = state3.position;
    while (ch !== 0 && !is_WS_OR_EOL(ch) && !is_FLOW_INDICATOR(ch)) {
      ch = state3.input.charCodeAt(++state3.position);
    }
    if (state3.position === _position) {
      throwError3(state3, "name of an anchor node must contain at least one character");
    }
    state3.anchor = state3.input.slice(_position, state3.position);
    return true;
  }
  function readAlias(state3) {
    var _position, alias, ch;
    ch = state3.input.charCodeAt(state3.position);
    if (ch !== 42) return false;
    ch = state3.input.charCodeAt(++state3.position);
    _position = state3.position;
    while (ch !== 0 && !is_WS_OR_EOL(ch) && !is_FLOW_INDICATOR(ch)) {
      ch = state3.input.charCodeAt(++state3.position);
    }
    if (state3.position === _position) {
      throwError3(state3, "name of an alias node must contain at least one character");
    }
    alias = state3.input.slice(_position, state3.position);
    if (!_hasOwnProperty$1.call(state3.anchorMap, alias)) {
      throwError3(state3, 'unidentified alias "' + alias + '"');
    }
    state3.result = state3.anchorMap[alias];
    skipSeparationSpace(state3, true, -1);
    return true;
  }
  function composeNode(state3, parentIndent, nodeContext, allowToSeek, allowCompact) {
    var allowBlockStyles, allowBlockScalars, allowBlockCollections, indentStatus = 1, atNewLine = false, hasContent = false, typeIndex, typeQuantity, typeList, type2, flowIndent, blockIndent;
    if (state3.listener !== null) {
      state3.listener("open", state3);
    }
    state3.tag = null;
    state3.anchor = null;
    state3.kind = null;
    state3.result = null;
    allowBlockStyles = allowBlockScalars = allowBlockCollections = CONTEXT_BLOCK_OUT === nodeContext || CONTEXT_BLOCK_IN === nodeContext;
    if (allowToSeek) {
      if (skipSeparationSpace(state3, true, -1)) {
        atNewLine = true;
        if (state3.lineIndent > parentIndent) {
          indentStatus = 1;
        } else if (state3.lineIndent === parentIndent) {
          indentStatus = 0;
        } else if (state3.lineIndent < parentIndent) {
          indentStatus = -1;
        }
      }
    }
    if (indentStatus === 1) {
      while (readTagProperty(state3) || readAnchorProperty(state3)) {
        if (skipSeparationSpace(state3, true, -1)) {
          atNewLine = true;
          allowBlockCollections = allowBlockStyles;
          if (state3.lineIndent > parentIndent) {
            indentStatus = 1;
          } else if (state3.lineIndent === parentIndent) {
            indentStatus = 0;
          } else if (state3.lineIndent < parentIndent) {
            indentStatus = -1;
          }
        } else {
          allowBlockCollections = false;
        }
      }
    }
    if (allowBlockCollections) {
      allowBlockCollections = atNewLine || allowCompact;
    }
    if (indentStatus === 1 || CONTEXT_BLOCK_OUT === nodeContext) {
      if (CONTEXT_FLOW_IN === nodeContext || CONTEXT_FLOW_OUT === nodeContext) {
        flowIndent = parentIndent;
      } else {
        flowIndent = parentIndent + 1;
      }
      blockIndent = state3.position - state3.lineStart;
      if (indentStatus === 1) {
        if (allowBlockCollections && (readBlockSequence(state3, blockIndent) || readBlockMapping(state3, blockIndent, flowIndent)) || readFlowCollection(state3, flowIndent)) {
          hasContent = true;
        } else {
          if (allowBlockScalars && readBlockScalar(state3, flowIndent) || readSingleQuotedScalar(state3, flowIndent) || readDoubleQuotedScalar(state3, flowIndent)) {
            hasContent = true;
          } else if (readAlias(state3)) {
            hasContent = true;
            if (state3.tag !== null || state3.anchor !== null) {
              throwError3(state3, "alias node should not have any properties");
            }
          } else if (readPlainScalar(state3, flowIndent, CONTEXT_FLOW_IN === nodeContext)) {
            hasContent = true;
            if (state3.tag === null) {
              state3.tag = "?";
            }
          }
          if (state3.anchor !== null) {
            state3.anchorMap[state3.anchor] = state3.result;
          }
        }
      } else if (indentStatus === 0) {
        hasContent = allowBlockCollections && readBlockSequence(state3, blockIndent);
      }
    }
    if (state3.tag === null) {
      if (state3.anchor !== null) {
        state3.anchorMap[state3.anchor] = state3.result;
      }
    } else if (state3.tag === "?") {
      if (state3.result !== null && state3.kind !== "scalar") {
        throwError3(state3, 'unacceptable node kind for !<?> tag; it should be "scalar", not "' + state3.kind + '"');
      }
      for (typeIndex = 0, typeQuantity = state3.implicitTypes.length; typeIndex < typeQuantity; typeIndex += 1) {
        type2 = state3.implicitTypes[typeIndex];
        if (type2.resolve(state3.result)) {
          state3.result = type2.construct(state3.result);
          state3.tag = type2.tag;
          if (state3.anchor !== null) {
            state3.anchorMap[state3.anchor] = state3.result;
          }
          break;
        }
      }
    } else if (state3.tag !== "!") {
      if (_hasOwnProperty$1.call(state3.typeMap[state3.kind || "fallback"], state3.tag)) {
        type2 = state3.typeMap[state3.kind || "fallback"][state3.tag];
      } else {
        type2 = null;
        typeList = state3.typeMap.multi[state3.kind || "fallback"];
        for (typeIndex = 0, typeQuantity = typeList.length; typeIndex < typeQuantity; typeIndex += 1) {
          if (state3.tag.slice(0, typeList[typeIndex].tag.length) === typeList[typeIndex].tag) {
            type2 = typeList[typeIndex];
            break;
          }
        }
      }
      if (!type2) {
        throwError3(state3, "unknown tag !<" + state3.tag + ">");
      }
      if (state3.result !== null && type2.kind !== state3.kind) {
        throwError3(state3, "unacceptable node kind for !<" + state3.tag + '> tag; it should be "' + type2.kind + '", not "' + state3.kind + '"');
      }
      if (!type2.resolve(state3.result, state3.tag)) {
        throwError3(state3, "cannot resolve a node with !<" + state3.tag + "> explicit tag");
      } else {
        state3.result = type2.construct(state3.result, state3.tag);
        if (state3.anchor !== null) {
          state3.anchorMap[state3.anchor] = state3.result;
        }
      }
    }
    if (state3.listener !== null) {
      state3.listener("close", state3);
    }
    return state3.tag !== null || state3.anchor !== null || hasContent;
  }
  function readDocument(state3) {
    var documentStart = state3.position, _position, directiveName, directiveArgs, hasDirectives = false, ch;
    state3.version = null;
    state3.checkLineBreaks = state3.legacy;
    state3.tagMap = /* @__PURE__ */ Object.create(null);
    state3.anchorMap = /* @__PURE__ */ Object.create(null);
    while ((ch = state3.input.charCodeAt(state3.position)) !== 0) {
      skipSeparationSpace(state3, true, -1);
      ch = state3.input.charCodeAt(state3.position);
      if (state3.lineIndent > 0 || ch !== 37) {
        break;
      }
      hasDirectives = true;
      ch = state3.input.charCodeAt(++state3.position);
      _position = state3.position;
      while (ch !== 0 && !is_WS_OR_EOL(ch)) {
        ch = state3.input.charCodeAt(++state3.position);
      }
      directiveName = state3.input.slice(_position, state3.position);
      directiveArgs = [];
      if (directiveName.length < 1) {
        throwError3(state3, "directive name must not be less than one character in length");
      }
      while (ch !== 0) {
        while (is_WHITE_SPACE(ch)) {
          ch = state3.input.charCodeAt(++state3.position);
        }
        if (ch === 35) {
          do {
            ch = state3.input.charCodeAt(++state3.position);
          } while (ch !== 0 && !is_EOL(ch));
          break;
        }
        if (is_EOL(ch)) break;
        _position = state3.position;
        while (ch !== 0 && !is_WS_OR_EOL(ch)) {
          ch = state3.input.charCodeAt(++state3.position);
        }
        directiveArgs.push(state3.input.slice(_position, state3.position));
      }
      if (ch !== 0) readLineBreak(state3);
      if (_hasOwnProperty$1.call(directiveHandlers, directiveName)) {
        directiveHandlers[directiveName](state3, directiveName, directiveArgs);
      } else {
        throwWarning(state3, 'unknown document directive "' + directiveName + '"');
      }
    }
    skipSeparationSpace(state3, true, -1);
    if (state3.lineIndent === 0 && state3.input.charCodeAt(state3.position) === 45 && state3.input.charCodeAt(state3.position + 1) === 45 && state3.input.charCodeAt(state3.position + 2) === 45) {
      state3.position += 3;
      skipSeparationSpace(state3, true, -1);
    } else if (hasDirectives) {
      throwError3(state3, "directives end mark is expected");
    }
    composeNode(state3, state3.lineIndent - 1, CONTEXT_BLOCK_OUT, false, true);
    skipSeparationSpace(state3, true, -1);
    if (state3.checkLineBreaks && PATTERN_NON_ASCII_LINE_BREAKS.test(state3.input.slice(documentStart, state3.position))) {
      throwWarning(state3, "non-ASCII line breaks are interpreted as content");
    }
    state3.documents.push(state3.result);
    if (state3.position === state3.lineStart && testDocumentSeparator(state3)) {
      if (state3.input.charCodeAt(state3.position) === 46) {
        state3.position += 3;
        skipSeparationSpace(state3, true, -1);
      }
      return;
    }
    if (state3.position < state3.length - 1) {
      throwError3(state3, "end of the stream or a document separator is expected");
    } else {
      return;
    }
  }
  function loadDocuments(input, options2) {
    input = String(input);
    options2 = options2 || {};
    if (input.length !== 0) {
      if (input.charCodeAt(input.length - 1) !== 10 && input.charCodeAt(input.length - 1) !== 13) {
        input += "\n";
      }
      if (input.charCodeAt(0) === 65279) {
        input = input.slice(1);
      }
    }
    var state3 = new State$1(input, options2);
    var nullpos = input.indexOf("\0");
    if (nullpos !== -1) {
      state3.position = nullpos;
      throwError3(state3, "null byte is not allowed in input");
    }
    state3.input += "\0";
    while (state3.input.charCodeAt(state3.position) === 32) {
      state3.lineIndent += 1;
      state3.position += 1;
    }
    while (state3.position < state3.length - 1) {
      readDocument(state3);
    }
    return state3.documents;
  }
  function loadAll$1(input, iterator2, options2) {
    if (iterator2 !== null && typeof iterator2 === "object" && typeof options2 === "undefined") {
      options2 = iterator2;
      iterator2 = null;
    }
    var documents = loadDocuments(input, options2);
    if (typeof iterator2 !== "function") {
      return documents;
    }
    for (var index5 = 0, length9 = documents.length; index5 < length9; index5 += 1) {
      iterator2(documents[index5]);
    }
  }
  function load$1(input, options2) {
    var documents = loadDocuments(input, options2);
    if (documents.length === 0) {
      return void 0;
    } else if (documents.length === 1) {
      return documents[0];
    }
    throw new exception("expected a single document in the stream, but found more");
  }
  var loadAll_1 = loadAll$1;
  var load_1 = load$1;
  var loader = {
    loadAll: loadAll_1,
    load: load_1
  };
  var _toString = Object.prototype.toString;
  var _hasOwnProperty = Object.prototype.hasOwnProperty;
  var CHAR_BOM = 65279;
  var CHAR_TAB = 9;
  var CHAR_LINE_FEED = 10;
  var CHAR_CARRIAGE_RETURN = 13;
  var CHAR_SPACE = 32;
  var CHAR_EXCLAMATION = 33;
  var CHAR_DOUBLE_QUOTE = 34;
  var CHAR_SHARP = 35;
  var CHAR_PERCENT = 37;
  var CHAR_AMPERSAND = 38;
  var CHAR_SINGLE_QUOTE = 39;
  var CHAR_ASTERISK = 42;
  var CHAR_COMMA = 44;
  var CHAR_MINUS = 45;
  var CHAR_COLON = 58;
  var CHAR_EQUALS = 61;
  var CHAR_GREATER_THAN = 62;
  var CHAR_QUESTION = 63;
  var CHAR_COMMERCIAL_AT = 64;
  var CHAR_LEFT_SQUARE_BRACKET = 91;
  var CHAR_RIGHT_SQUARE_BRACKET = 93;
  var CHAR_GRAVE_ACCENT = 96;
  var CHAR_LEFT_CURLY_BRACKET = 123;
  var CHAR_VERTICAL_LINE = 124;
  var CHAR_RIGHT_CURLY_BRACKET = 125;
  var ESCAPE_SEQUENCES = {};
  ESCAPE_SEQUENCES[0] = "\\0";
  ESCAPE_SEQUENCES[7] = "\\a";
  ESCAPE_SEQUENCES[8] = "\\b";
  ESCAPE_SEQUENCES[9] = "\\t";
  ESCAPE_SEQUENCES[10] = "\\n";
  ESCAPE_SEQUENCES[11] = "\\v";
  ESCAPE_SEQUENCES[12] = "\\f";
  ESCAPE_SEQUENCES[13] = "\\r";
  ESCAPE_SEQUENCES[27] = "\\e";
  ESCAPE_SEQUENCES[34] = '\\"';
  ESCAPE_SEQUENCES[92] = "\\\\";
  ESCAPE_SEQUENCES[133] = "\\N";
  ESCAPE_SEQUENCES[160] = "\\_";
  ESCAPE_SEQUENCES[8232] = "\\L";
  ESCAPE_SEQUENCES[8233] = "\\P";
  var DEPRECATED_BOOLEANS_SYNTAX = [
    "y",
    "Y",
    "yes",
    "Yes",
    "YES",
    "on",
    "On",
    "ON",
    "n",
    "N",
    "no",
    "No",
    "NO",
    "off",
    "Off",
    "OFF"
  ];
  var DEPRECATED_BASE60_SYNTAX = /^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;
  function compileStyleMap(schema2, map20) {
    var result, keys4, index5, length9, tag, style, type2;
    if (map20 === null) return {};
    result = {};
    keys4 = Object.keys(map20);
    for (index5 = 0, length9 = keys4.length; index5 < length9; index5 += 1) {
      tag = keys4[index5];
      style = String(map20[tag]);
      if (tag.slice(0, 2) === "!!") {
        tag = "tag:yaml.org,2002:" + tag.slice(2);
      }
      type2 = schema2.compiledTypeMap["fallback"][tag];
      if (type2 && _hasOwnProperty.call(type2.styleAliases, style)) {
        style = type2.styleAliases[style];
      }
      result[tag] = style;
    }
    return result;
  }
  function encodeHex(character) {
    var string2, handle, length9;
    string2 = character.toString(16).toUpperCase();
    if (character <= 255) {
      handle = "x";
      length9 = 2;
    } else if (character <= 65535) {
      handle = "u";
      length9 = 4;
    } else if (character <= 4294967295) {
      handle = "U";
      length9 = 8;
    } else {
      throw new exception("code point within a string may not be greater than 0xFFFFFFFF");
    }
    return "\\" + handle + common.repeat("0", length9 - string2.length) + string2;
  }
  var QUOTING_TYPE_SINGLE = 1;
  var QUOTING_TYPE_DOUBLE = 2;
  function State(options2) {
    this.schema = options2["schema"] || _default;
    this.indent = Math.max(1, options2["indent"] || 2);
    this.noArrayIndent = options2["noArrayIndent"] || false;
    this.skipInvalid = options2["skipInvalid"] || false;
    this.flowLevel = common.isNothing(options2["flowLevel"]) ? -1 : options2["flowLevel"];
    this.styleMap = compileStyleMap(this.schema, options2["styles"] || null);
    this.sortKeys = options2["sortKeys"] || false;
    this.lineWidth = options2["lineWidth"] || 80;
    this.noRefs = options2["noRefs"] || false;
    this.noCompatMode = options2["noCompatMode"] || false;
    this.condenseFlow = options2["condenseFlow"] || false;
    this.quotingType = options2["quotingType"] === '"' ? QUOTING_TYPE_DOUBLE : QUOTING_TYPE_SINGLE;
    this.forceQuotes = options2["forceQuotes"] || false;
    this.replacer = typeof options2["replacer"] === "function" ? options2["replacer"] : null;
    this.implicitTypes = this.schema.compiledImplicit;
    this.explicitTypes = this.schema.compiledExplicit;
    this.tag = null;
    this.result = "";
    this.duplicates = [];
    this.usedDuplicates = null;
  }
  function indentString(string2, spaces) {
    var ind = common.repeat(" ", spaces), position3 = 0, next = -1, result = "", line, length9 = string2.length;
    while (position3 < length9) {
      next = string2.indexOf("\n", position3);
      if (next === -1) {
        line = string2.slice(position3);
        position3 = length9;
      } else {
        line = string2.slice(position3, next + 1);
        position3 = next + 1;
      }
      if (line.length && line !== "\n") result += ind;
      result += line;
    }
    return result;
  }
  function generateNextLine(state3, level) {
    return "\n" + common.repeat(" ", state3.indent * level);
  }
  function testImplicitResolving(state3, str2) {
    var index5, length9, type2;
    for (index5 = 0, length9 = state3.implicitTypes.length; index5 < length9; index5 += 1) {
      type2 = state3.implicitTypes[index5];
      if (type2.resolve(str2)) {
        return true;
      }
    }
    return false;
  }
  function isWhitespace(c) {
    return c === CHAR_SPACE || c === CHAR_TAB;
  }
  function isPrintable(c) {
    return 32 <= c && c <= 126 || 161 <= c && c <= 55295 && c !== 8232 && c !== 8233 || 57344 <= c && c <= 65533 && c !== CHAR_BOM || 65536 <= c && c <= 1114111;
  }
  function isNsCharOrWhitespace(c) {
    return isPrintable(c) && c !== CHAR_BOM && c !== CHAR_CARRIAGE_RETURN && c !== CHAR_LINE_FEED;
  }
  function isPlainSafe(c, prev, inblock) {
    var cIsNsCharOrWhitespace = isNsCharOrWhitespace(c);
    var cIsNsChar = cIsNsCharOrWhitespace && !isWhitespace(c);
    return (
      // ns-plain-safe
      (inblock ? (
        // c = flow-in
        cIsNsCharOrWhitespace
      ) : cIsNsCharOrWhitespace && c !== CHAR_COMMA && c !== CHAR_LEFT_SQUARE_BRACKET && c !== CHAR_RIGHT_SQUARE_BRACKET && c !== CHAR_LEFT_CURLY_BRACKET && c !== CHAR_RIGHT_CURLY_BRACKET) && c !== CHAR_SHARP && !(prev === CHAR_COLON && !cIsNsChar) || isNsCharOrWhitespace(prev) && !isWhitespace(prev) && c === CHAR_SHARP || prev === CHAR_COLON && cIsNsChar
    );
  }
  function isPlainSafeFirst(c) {
    return isPrintable(c) && c !== CHAR_BOM && !isWhitespace(c) && c !== CHAR_MINUS && c !== CHAR_QUESTION && c !== CHAR_COLON && c !== CHAR_COMMA && c !== CHAR_LEFT_SQUARE_BRACKET && c !== CHAR_RIGHT_SQUARE_BRACKET && c !== CHAR_LEFT_CURLY_BRACKET && c !== CHAR_RIGHT_CURLY_BRACKET && c !== CHAR_SHARP && c !== CHAR_AMPERSAND && c !== CHAR_ASTERISK && c !== CHAR_EXCLAMATION && c !== CHAR_VERTICAL_LINE && c !== CHAR_EQUALS && c !== CHAR_GREATER_THAN && c !== CHAR_SINGLE_QUOTE && c !== CHAR_DOUBLE_QUOTE && c !== CHAR_PERCENT && c !== CHAR_COMMERCIAL_AT && c !== CHAR_GRAVE_ACCENT;
  }
  function isPlainSafeLast(c) {
    return !isWhitespace(c) && c !== CHAR_COLON;
  }
  function codePointAt2(string2, pos) {
    var first = string2.charCodeAt(pos), second2;
    if (first >= 55296 && first <= 56319 && pos + 1 < string2.length) {
      second2 = string2.charCodeAt(pos + 1);
      if (second2 >= 56320 && second2 <= 57343) {
        return (first - 55296) * 1024 + second2 - 56320 + 65536;
      }
    }
    return first;
  }
  function needIndentIndicator(string2) {
    var leadingSpaceRe = /^\n* /;
    return leadingSpaceRe.test(string2);
  }
  var STYLE_PLAIN = 1;
  var STYLE_SINGLE = 2;
  var STYLE_LITERAL = 3;
  var STYLE_FOLDED = 4;
  var STYLE_DOUBLE = 5;
  function chooseScalarStyle(string2, singleLineOnly, indentPerLevel, lineWidth, testAmbiguousType, quotingType, forceQuotes, inblock) {
    var i;
    var char2 = 0;
    var prevChar = null;
    var hasLineBreak = false;
    var hasFoldableLine = false;
    var shouldTrackWidth = lineWidth !== -1;
    var previousLineBreak = -1;
    var plain = isPlainSafeFirst(codePointAt2(string2, 0)) && isPlainSafeLast(codePointAt2(string2, string2.length - 1));
    if (singleLineOnly || forceQuotes) {
      for (i = 0; i < string2.length; char2 >= 65536 ? i += 2 : i++) {
        char2 = codePointAt2(string2, i);
        if (!isPrintable(char2)) {
          return STYLE_DOUBLE;
        }
        plain = plain && isPlainSafe(char2, prevChar, inblock);
        prevChar = char2;
      }
    } else {
      for (i = 0; i < string2.length; char2 >= 65536 ? i += 2 : i++) {
        char2 = codePointAt2(string2, i);
        if (char2 === CHAR_LINE_FEED) {
          hasLineBreak = true;
          if (shouldTrackWidth) {
            hasFoldableLine = hasFoldableLine || // Foldable line = too long, and not more-indented.
            i - previousLineBreak - 1 > lineWidth && string2[previousLineBreak + 1] !== " ";
            previousLineBreak = i;
          }
        } else if (!isPrintable(char2)) {
          return STYLE_DOUBLE;
        }
        plain = plain && isPlainSafe(char2, prevChar, inblock);
        prevChar = char2;
      }
      hasFoldableLine = hasFoldableLine || shouldTrackWidth && (i - previousLineBreak - 1 > lineWidth && string2[previousLineBreak + 1] !== " ");
    }
    if (!hasLineBreak && !hasFoldableLine) {
      if (plain && !forceQuotes && !testAmbiguousType(string2)) {
        return STYLE_PLAIN;
      }
      return quotingType === QUOTING_TYPE_DOUBLE ? STYLE_DOUBLE : STYLE_SINGLE;
    }
    if (indentPerLevel > 9 && needIndentIndicator(string2)) {
      return STYLE_DOUBLE;
    }
    if (!forceQuotes) {
      return hasFoldableLine ? STYLE_FOLDED : STYLE_LITERAL;
    }
    return quotingType === QUOTING_TYPE_DOUBLE ? STYLE_DOUBLE : STYLE_SINGLE;
  }
  function writeScalar(state3, string2, level, iskey, inblock) {
    state3.dump = function() {
      if (string2.length === 0) {
        return state3.quotingType === QUOTING_TYPE_DOUBLE ? '""' : "''";
      }
      if (!state3.noCompatMode) {
        if (DEPRECATED_BOOLEANS_SYNTAX.indexOf(string2) !== -1 || DEPRECATED_BASE60_SYNTAX.test(string2)) {
          return state3.quotingType === QUOTING_TYPE_DOUBLE ? '"' + string2 + '"' : "'" + string2 + "'";
        }
      }
      var indent = state3.indent * Math.max(1, level);
      var lineWidth = state3.lineWidth === -1 ? -1 : Math.max(Math.min(state3.lineWidth, 40), state3.lineWidth - indent);
      var singleLineOnly = iskey || state3.flowLevel > -1 && level >= state3.flowLevel;
      function testAmbiguity(string3) {
        return testImplicitResolving(state3, string3);
      }
      switch (chooseScalarStyle(
        string2,
        singleLineOnly,
        state3.indent,
        lineWidth,
        testAmbiguity,
        state3.quotingType,
        state3.forceQuotes && !iskey,
        inblock
      )) {
        case STYLE_PLAIN:
          return string2;
        case STYLE_SINGLE:
          return "'" + string2.replace(/'/g, "''") + "'";
        case STYLE_LITERAL:
          return "|" + blockHeader(string2, state3.indent) + dropEndingNewline(indentString(string2, indent));
        case STYLE_FOLDED:
          return ">" + blockHeader(string2, state3.indent) + dropEndingNewline(indentString(foldString(string2, lineWidth), indent));
        case STYLE_DOUBLE:
          return '"' + escapeString(string2) + '"';
        default:
          throw new exception("impossible error: invalid scalar style");
      }
    }();
  }
  function blockHeader(string2, indentPerLevel) {
    var indentIndicator = needIndentIndicator(string2) ? String(indentPerLevel) : "";
    var clip2 = string2[string2.length - 1] === "\n";
    var keep = clip2 && (string2[string2.length - 2] === "\n" || string2 === "\n");
    var chomp = keep ? "+" : clip2 ? "" : "-";
    return indentIndicator + chomp + "\n";
  }
  function dropEndingNewline(string2) {
    return string2[string2.length - 1] === "\n" ? string2.slice(0, -1) : string2;
  }
  function foldString(string2, width8) {
    var lineRe = /(\n+)([^\n]*)/g;
    var result = function() {
      var nextLF = string2.indexOf("\n");
      nextLF = nextLF !== -1 ? nextLF : string2.length;
      lineRe.lastIndex = nextLF;
      return foldLine(string2.slice(0, nextLF), width8);
    }();
    var prevMoreIndented = string2[0] === "\n" || string2[0] === " ";
    var moreIndented;
    var match2;
    while (match2 = lineRe.exec(string2)) {
      var prefix = match2[1], line = match2[2];
      moreIndented = line[0] === " ";
      result += prefix + (!prevMoreIndented && !moreIndented && line !== "" ? "\n" : "") + foldLine(line, width8);
      prevMoreIndented = moreIndented;
    }
    return result;
  }
  function foldLine(line, width8) {
    if (line === "" || line[0] === " ") return line;
    var breakRe = / [^ ]/g;
    var match2;
    var start2 = 0, end, curr = 0, next = 0;
    var result = "";
    while (match2 = breakRe.exec(line)) {
      next = match2.index;
      if (next - start2 > width8) {
        end = curr > start2 ? curr : next;
        result += "\n" + line.slice(start2, end);
        start2 = end + 1;
      }
      curr = next;
    }
    result += "\n";
    if (line.length - start2 > width8 && curr > start2) {
      result += line.slice(start2, curr) + "\n" + line.slice(curr + 1);
    } else {
      result += line.slice(start2);
    }
    return result.slice(1);
  }
  function escapeString(string2) {
    var result = "";
    var char2 = 0;
    var escapeSeq;
    for (var i = 0; i < string2.length; char2 >= 65536 ? i += 2 : i++) {
      char2 = codePointAt2(string2, i);
      escapeSeq = ESCAPE_SEQUENCES[char2];
      if (!escapeSeq && isPrintable(char2)) {
        result += string2[i];
        if (char2 >= 65536) result += string2[i + 1];
      } else {
        result += escapeSeq || encodeHex(char2);
      }
    }
    return result;
  }
  function writeFlowSequence(state3, level, object) {
    var _result = "", _tag = state3.tag, index5, length9, value12;
    for (index5 = 0, length9 = object.length; index5 < length9; index5 += 1) {
      value12 = object[index5];
      if (state3.replacer) {
        value12 = state3.replacer.call(object, String(index5), value12);
      }
      if (writeNode(state3, level, value12, false, false) || typeof value12 === "undefined" && writeNode(state3, level, null, false, false)) {
        if (_result !== "") _result += "," + (!state3.condenseFlow ? " " : "");
        _result += state3.dump;
      }
    }
    state3.tag = _tag;
    state3.dump = "[" + _result + "]";
  }
  function writeBlockSequence(state3, level, object, compact) {
    var _result = "", _tag = state3.tag, index5, length9, value12;
    for (index5 = 0, length9 = object.length; index5 < length9; index5 += 1) {
      value12 = object[index5];
      if (state3.replacer) {
        value12 = state3.replacer.call(object, String(index5), value12);
      }
      if (writeNode(state3, level + 1, value12, true, true, false, true) || typeof value12 === "undefined" && writeNode(state3, level + 1, null, true, true, false, true)) {
        if (!compact || _result !== "") {
          _result += generateNextLine(state3, level);
        }
        if (state3.dump && CHAR_LINE_FEED === state3.dump.charCodeAt(0)) {
          _result += "-";
        } else {
          _result += "- ";
        }
        _result += state3.dump;
      }
    }
    state3.tag = _tag;
    state3.dump = _result || "[]";
  }
  function writeFlowMapping(state3, level, object) {
    var _result = "", _tag = state3.tag, objectKeyList = Object.keys(object), index5, length9, objectKey, objectValue, pairBuffer;
    for (index5 = 0, length9 = objectKeyList.length; index5 < length9; index5 += 1) {
      pairBuffer = "";
      if (_result !== "") pairBuffer += ", ";
      if (state3.condenseFlow) pairBuffer += '"';
      objectKey = objectKeyList[index5];
      objectValue = object[objectKey];
      if (state3.replacer) {
        objectValue = state3.replacer.call(object, objectKey, objectValue);
      }
      if (!writeNode(state3, level, objectKey, false, false)) {
        continue;
      }
      if (state3.dump.length > 1024) pairBuffer += "? ";
      pairBuffer += state3.dump + (state3.condenseFlow ? '"' : "") + ":" + (state3.condenseFlow ? "" : " ");
      if (!writeNode(state3, level, objectValue, false, false)) {
        continue;
      }
      pairBuffer += state3.dump;
      _result += pairBuffer;
    }
    state3.tag = _tag;
    state3.dump = "{" + _result + "}";
  }
  function writeBlockMapping(state3, level, object, compact) {
    var _result = "", _tag = state3.tag, objectKeyList = Object.keys(object), index5, length9, objectKey, objectValue, explicitPair, pairBuffer;
    if (state3.sortKeys === true) {
      objectKeyList.sort();
    } else if (typeof state3.sortKeys === "function") {
      objectKeyList.sort(state3.sortKeys);
    } else if (state3.sortKeys) {
      throw new exception("sortKeys must be a boolean or a function");
    }
    for (index5 = 0, length9 = objectKeyList.length; index5 < length9; index5 += 1) {
      pairBuffer = "";
      if (!compact || _result !== "") {
        pairBuffer += generateNextLine(state3, level);
      }
      objectKey = objectKeyList[index5];
      objectValue = object[objectKey];
      if (state3.replacer) {
        objectValue = state3.replacer.call(object, objectKey, objectValue);
      }
      if (!writeNode(state3, level + 1, objectKey, true, true, true)) {
        continue;
      }
      explicitPair = state3.tag !== null && state3.tag !== "?" || state3.dump && state3.dump.length > 1024;
      if (explicitPair) {
        if (state3.dump && CHAR_LINE_FEED === state3.dump.charCodeAt(0)) {
          pairBuffer += "?";
        } else {
          pairBuffer += "? ";
        }
      }
      pairBuffer += state3.dump;
      if (explicitPair) {
        pairBuffer += generateNextLine(state3, level);
      }
      if (!writeNode(state3, level + 1, objectValue, true, explicitPair)) {
        continue;
      }
      if (state3.dump && CHAR_LINE_FEED === state3.dump.charCodeAt(0)) {
        pairBuffer += ":";
      } else {
        pairBuffer += ": ";
      }
      pairBuffer += state3.dump;
      _result += pairBuffer;
    }
    state3.tag = _tag;
    state3.dump = _result || "{}";
  }
  function detectType(state3, object, explicit) {
    var _result, typeList, index5, length9, type2, style;
    typeList = explicit ? state3.explicitTypes : state3.implicitTypes;
    for (index5 = 0, length9 = typeList.length; index5 < length9; index5 += 1) {
      type2 = typeList[index5];
      if ((type2.instanceOf || type2.predicate) && (!type2.instanceOf || typeof object === "object" && object instanceof type2.instanceOf) && (!type2.predicate || type2.predicate(object))) {
        if (explicit) {
          if (type2.multi && type2.representName) {
            state3.tag = type2.representName(object);
          } else {
            state3.tag = type2.tag;
          }
        } else {
          state3.tag = "?";
        }
        if (type2.represent) {
          style = state3.styleMap[type2.tag] || type2.defaultStyle;
          if (_toString.call(type2.represent) === "[object Function]") {
            _result = type2.represent(object, style);
          } else if (_hasOwnProperty.call(type2.represent, style)) {
            _result = type2.represent[style](object, style);
          } else {
            throw new exception("!<" + type2.tag + '> tag resolver accepts not "' + style + '" style');
          }
          state3.dump = _result;
        }
        return true;
      }
    }
    return false;
  }
  function writeNode(state3, level, object, block, compact, iskey, isblockseq) {
    state3.tag = null;
    state3.dump = object;
    if (!detectType(state3, object, false)) {
      detectType(state3, object, true);
    }
    var type2 = _toString.call(state3.dump);
    var inblock = block;
    var tagStr;
    if (block) {
      block = state3.flowLevel < 0 || state3.flowLevel > level;
    }
    var objectOrArray = type2 === "[object Object]" || type2 === "[object Array]", duplicateIndex, duplicate2;
    if (objectOrArray) {
      duplicateIndex = state3.duplicates.indexOf(object);
      duplicate2 = duplicateIndex !== -1;
    }
    if (state3.tag !== null && state3.tag !== "?" || duplicate2 || state3.indent !== 2 && level > 0) {
      compact = false;
    }
    if (duplicate2 && state3.usedDuplicates[duplicateIndex]) {
      state3.dump = "*ref_" + duplicateIndex;
    } else {
      if (objectOrArray && duplicate2 && !state3.usedDuplicates[duplicateIndex]) {
        state3.usedDuplicates[duplicateIndex] = true;
      }
      if (type2 === "[object Object]") {
        if (block && Object.keys(state3.dump).length !== 0) {
          writeBlockMapping(state3, level, state3.dump, compact);
          if (duplicate2) {
            state3.dump = "&ref_" + duplicateIndex + state3.dump;
          }
        } else {
          writeFlowMapping(state3, level, state3.dump);
          if (duplicate2) {
            state3.dump = "&ref_" + duplicateIndex + " " + state3.dump;
          }
        }
      } else if (type2 === "[object Array]") {
        if (block && state3.dump.length !== 0) {
          if (state3.noArrayIndent && !isblockseq && level > 0) {
            writeBlockSequence(state3, level - 1, state3.dump, compact);
          } else {
            writeBlockSequence(state3, level, state3.dump, compact);
          }
          if (duplicate2) {
            state3.dump = "&ref_" + duplicateIndex + state3.dump;
          }
        } else {
          writeFlowSequence(state3, level, state3.dump);
          if (duplicate2) {
            state3.dump = "&ref_" + duplicateIndex + " " + state3.dump;
          }
        }
      } else if (type2 === "[object String]") {
        if (state3.tag !== "?") {
          writeScalar(state3, state3.dump, level, iskey, inblock);
        }
      } else if (type2 === "[object Undefined]") {
        return false;
      } else {
        if (state3.skipInvalid) return false;
        throw new exception("unacceptable kind of an object to dump " + type2);
      }
      if (state3.tag !== null && state3.tag !== "?") {
        tagStr = encodeURI(
          state3.tag[0] === "!" ? state3.tag.slice(1) : state3.tag
        ).replace(/!/g, "%21");
        if (state3.tag[0] === "!") {
          tagStr = "!" + tagStr;
        } else if (tagStr.slice(0, 18) === "tag:yaml.org,2002:") {
          tagStr = "!!" + tagStr.slice(18);
        } else {
          tagStr = "!<" + tagStr + ">";
        }
        state3.dump = tagStr + " " + state3.dump;
      }
    }
    return true;
  }
  function getDuplicateReferences(object, state3) {
    var objects = [], duplicatesIndexes = [], index5, length9;
    inspectNode(object, objects, duplicatesIndexes);
    for (index5 = 0, length9 = duplicatesIndexes.length; index5 < length9; index5 += 1) {
      state3.duplicates.push(objects[duplicatesIndexes[index5]]);
    }
    state3.usedDuplicates = new Array(length9);
  }
  function inspectNode(object, objects, duplicatesIndexes) {
    var objectKeyList, index5, length9;
    if (object !== null && typeof object === "object") {
      index5 = objects.indexOf(object);
      if (index5 !== -1) {
        if (duplicatesIndexes.indexOf(index5) === -1) {
          duplicatesIndexes.push(index5);
        }
      } else {
        objects.push(object);
        if (Array.isArray(object)) {
          for (index5 = 0, length9 = object.length; index5 < length9; index5 += 1) {
            inspectNode(object[index5], objects, duplicatesIndexes);
          }
        } else {
          objectKeyList = Object.keys(object);
          for (index5 = 0, length9 = objectKeyList.length; index5 < length9; index5 += 1) {
            inspectNode(object[objectKeyList[index5]], objects, duplicatesIndexes);
          }
        }
      }
    }
  }
  function dump$1(input, options2) {
    options2 = options2 || {};
    var state3 = new State(options2);
    if (!state3.noRefs) getDuplicateReferences(input, state3);
    var value12 = input;
    if (state3.replacer) {
      value12 = state3.replacer.call({ "": value12 }, "", value12);
    }
    if (writeNode(state3, 0, value12, true, true)) return state3.dump + "\n";
    return "";
  }
  var dump_1 = dump$1;
  var dumper = {
    dump: dump_1
  };
  function renamed(from2, to) {
    return function() {
      throw new Error("Function yaml." + from2 + " is removed in js-yaml 4. Use yaml." + to + " instead, which is now safe by default.");
    };
  }
  var Type = type;
  var Schema = schema;
  var FAILSAFE_SCHEMA = failsafe;
  var JSON_SCHEMA = json;
  var CORE_SCHEMA = core;
  var DEFAULT_SCHEMA = _default;
  var load = loader.load;
  var loadAll = loader.loadAll;
  var dump = dumper.dump;
  var YAMLException = exception;
  var types = {
    binary,
    float,
    map: map15,
    null: _null,
    pairs,
    set,
    timestamp,
    bool,
    int,
    merge,
    omap,
    seq,
    str
  };
  var safeLoad = renamed("safeLoad", "load");
  var safeLoadAll = renamed("safeLoadAll", "loadAll");
  var safeDump = renamed("safeDump", "dump");
  var jsYaml = {
    Type,
    Schema,
    FAILSAFE_SCHEMA,
    JSON_SCHEMA,
    CORE_SCHEMA,
    DEFAULT_SCHEMA,
    load,
    loadAll,
    dump,
    YAMLException,
    types,
    safeLoad,
    safeLoadAll,
    safeDump
  };
  var js_yaml_default = jsYaml;

  // output/Data.YAML.Foreign.Decode/foreign.js
  function parseYAMLImpl(left, right, str2) {
    try {
      return right(js_yaml_default.load(str2));
    } catch (e) {
      return left(e.toString());
    }
  }

  // output/Foreign/foreign.js
  var isArray = Array.isArray || function(value12) {
    return Object.prototype.toString.call(value12) === "[object Array]";
  };

  // output/Foreign/index.js
  var ForeignError = /* @__PURE__ */ function() {
    function ForeignError2(value0) {
      this.value0 = value0;
    }
    ;
    ForeignError2.create = function(value0) {
      return new ForeignError2(value0);
    };
    return ForeignError2;
  }();
  var fail2 = function(dictMonad) {
    var $153 = throwError(monadThrowExceptT(dictMonad));
    return function($154) {
      return $153(singleton5($154));
    };
  };

  // output/Data.YAML.Foreign.Decode/index.js
  var fail3 = /* @__PURE__ */ fail2(monadIdentity);
  var pure6 = /* @__PURE__ */ pure(/* @__PURE__ */ applicativeExceptT(monadIdentity));
  var bind5 = /* @__PURE__ */ bind(/* @__PURE__ */ bindExceptT(monadIdentity));
  var parseYAML = function(yaml) {
    return parseYAMLImpl(function($6) {
      return fail3(ForeignError.create($6));
    }, pure6, yaml);
  };
  var parseYAMLToJson = function(yaml) {
    return bind5(parseYAML(yaml))(function($7) {
      return pure6($7);
    });
  };

  // output/Mines.Parsing/index.js
  var bind6 = /* @__PURE__ */ bind(bindEither);
  var pure7 = /* @__PURE__ */ pure(applicativeEither);
  var lookup4 = /* @__PURE__ */ lookup2(ordString);
  var BoardData = /* @__PURE__ */ function() {
    function BoardData2(value0, value1, value22) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
    }
    ;
    BoardData2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return new BoardData2(value0, value1, value22);
        };
      };
    };
    return BoardData2;
  }();
  var defaultMines = /* @__PURE__ */ function() {
    return fromFoldable3(ordString)(foldableArray)([new Tuple("standardMine", standardMine), new Tuple("doubleMine", doubleMine), new Tuple("antiMine", antiMine), new Tuple("redMine", redMine), new Tuple("blueMine", blueMine), new Tuple("greenMine", greenMine), new Tuple("magnetMine", magnetMine), new Tuple("antiRedMine", antiRedMine), new Tuple("antiGreenMine", antiGreenMine), new Tuple("antiBlueMine", antiBlueMine)]);
  }();
  var decodeMine = function(j) {
    var v = decodeString(j);
    if (v instanceof Right) {
      var v1 = lookup4(v.value0)(defaultMines);
      if (v1 instanceof Nothing) {
        return new Left(new UnexpectedValue(j));
      }
      ;
      if (v1 instanceof Just) {
        return pure7(v1.value0);
      }
      ;
      throw new Error("Failed pattern match at Mines.Parsing (line 47, column 13 - line 49, column 41): " + [v1.constructor.name]);
    }
    ;
    if (v instanceof Left) {
      return new Left(new UnexpectedValue(j));
    }
    ;
    throw new Error("Failed pattern match at Mines.Parsing (line 45, column 5 - line 50, column 43): " + [v.constructor.name]);
  };
  var decodeMineCount = function(j) {
    return bind6(decodeJObject(j))(function(obj) {
      return bind6(getField(decodeMine)(obj)("mine"))(function(mine) {
        return bind6(getField(decodeInt)(obj)("count"))(function(count) {
          return pure7(new MineCount(mine, count));
        });
      });
    });
  };
  var decodeBoardData = function(j) {
    return bind6(decodeJObject(j))(function(obj) {
      return bind6(getField(decodeInt)(obj)("width"))(function(width8) {
        return bind6(getField(decodeInt)(obj)("height"))(function(height8) {
          return pure7(new BoardData(width8, height8, []));
        });
      });
    });
  };
  var decodeMinefield = function(j) {
    return bind6(decodeJObject(j))(function(obj) {
      return bind6(getField(decodeBoardData)(obj)("board"))(function(v) {
        return bind6(getField(decodeArray(decodeMineCount))(obj)("distribution"))(function(mineDistribution) {
          return pure7(blankMinefield(v.value1)(v.value0)(mineDistribution));
        });
      });
    });
  };
  var parseScenarioToMinefield = function(y) {
    var v = runExcept(parseYAMLToJson(y));
    if (v instanceof Left) {
      return new Left(new Left("Could not parse YAML"));
    }
    ;
    if (v instanceof Right) {
      var v1 = decodeMinefield(v.value0);
      if (v1 instanceof Left) {
        return new Left(new Right(v1.value0));
      }
      ;
      if (v1 instanceof Right) {
        return new Right(v1.value0);
      }
      ;
      throw new Error("Failed pattern match at Mines.Parsing (line 77, column 16 - line 79, column 27): " + [v1.constructor.name]);
    }
    ;
    throw new Error("Failed pattern match at Mines.Parsing (line 75, column 30 - line 79, column 27): " + [v.constructor.name]);
  };

  // output/Web.DOM.Document/foreign.js
  var getEffProp = function(name15) {
    return function(doc) {
      return function() {
        return doc[name15];
      };
    };
  };
  var url = getEffProp("URL");
  var documentURI = getEffProp("documentURI");
  var origin = getEffProp("origin");
  var compatMode = getEffProp("compatMode");
  var characterSet = getEffProp("characterSet");
  var contentType = getEffProp("contentType");
  var _documentElement = getEffProp("documentElement");
  function createElement(localName2) {
    return function(doc) {
      return function() {
        return doc.createElement(localName2);
      };
    };
  }

  // output/Data.Nullable/foreign.js
  function nullable(a, r, f) {
    return a == null ? r : f(a);
  }

  // output/Data.Nullable/index.js
  var toMaybe = function(n) {
    return nullable(n, Nothing.value, Just.create);
  };

  // output/Web.Internal.FFI/foreign.js
  function _unsafeReadProtoTagged(nothing, just, name15, value12) {
    if (typeof window !== "undefined") {
      var ty = window[name15];
      if (ty != null && value12 instanceof ty) {
        return just(value12);
      }
    }
    var obj = value12;
    while (obj != null) {
      var proto = Object.getPrototypeOf(obj);
      var constructorName = proto.constructor.name;
      if (constructorName === name15) {
        return just(value12);
      } else if (constructorName === "Object") {
        return nothing;
      }
      obj = proto;
    }
    return nothing;
  }

  // output/Web.Internal.FFI/index.js
  var unsafeReadProtoTagged = function(name15) {
    return function(value12) {
      return _unsafeReadProtoTagged(Nothing.value, Just.create, name15, value12);
    };
  };

  // output/Web.DOM.Document/index.js
  var toNonElementParentNode = unsafeCoerce2;

  // output/Web.DOM.NonElementParentNode/foreign.js
  function _getElementById(id3) {
    return function(node) {
      return function() {
        return node.getElementById(id3);
      };
    };
  }

  // output/Web.DOM.NonElementParentNode/index.js
  var map16 = /* @__PURE__ */ map(functorEffect);
  var getElementById = function(eid) {
    var $2 = map16(toMaybe);
    var $3 = _getElementById(eid);
    return function($4) {
      return $2($3($4));
    };
  };

  // output/Web.HTML/foreign.js
  var windowImpl = function() {
    return window;
  };

  // output/Web.HTML.HTMLDocument/index.js
  var toDocument = unsafeCoerce2;

  // output/Web.HTML.HTMLInputElement/foreign.js
  function checked(input) {
    return function() {
      return input.checked;
    };
  }

  // output/Web.HTML.HTMLInputElement/index.js
  var fromElement = /* @__PURE__ */ unsafeReadProtoTagged("HTMLInputElement");

  // output/Web.HTML.HTMLTableCellElement/index.js
  var toNode = unsafeCoerce2;
  var toElement = unsafeCoerce2;
  var fromHTMLElement = /* @__PURE__ */ unsafeReadProtoTagged("HTMLTableCellElement");

  // output/Web.HTML.HTMLTableElement/foreign.js
  function insertRowAt(index5) {
    return function(table) {
      return function() {
        return table.insertRow(index5);
      };
    };
  }

  // output/Web.HTML.HTMLTableElement/index.js
  var toNode2 = unsafeCoerce2;
  var insertRow$prime = insertRowAt;
  var insertRow = /* @__PURE__ */ function() {
    return insertRow$prime(-1 | 0);
  }();
  var fromElement2 = /* @__PURE__ */ unsafeReadProtoTagged("HTMLTableElement");

  // output/Web.HTML.HTMLTableRowElement/foreign.js
  function insertCellAt(index5) {
    return function(row) {
      return function() {
        return row.insertCell(index5);
      };
    };
  }

  // output/Web.HTML.HTMLTableRowElement/index.js
  var insertCell$prime = insertCellAt;
  var insertCell = /* @__PURE__ */ function() {
    return insertCell$prime(-1 | 0);
  }();
  var fromHTMLElement2 = /* @__PURE__ */ unsafeReadProtoTagged("HTMLTableRowElement");

  // output/Web.HTML.HTMLTextAreaElement/foreign.js
  function value11(textarea) {
    return function() {
      return textarea.value;
    };
  }
  function setValue11(value12) {
    return function(textarea) {
      return function() {
        textarea.value = value12;
      };
    };
  }

  // output/Web.HTML.HTMLTextAreaElement/index.js
  var fromElement3 = /* @__PURE__ */ unsafeReadProtoTagged("HTMLTextAreaElement");

  // output/Web.HTML.Window/foreign.js
  function document2(window2) {
    return function() {
      return window2.document;
    };
  }

  // output/Mines.Settings/index.js
  var map17 = /* @__PURE__ */ map(functorEffect);
  var bindFlipped3 = /* @__PURE__ */ bindFlipped(bindEffect);
  var getCheckboxValue = function(s) {
    return function __do3() {
      var npn = map17(function($14) {
        return toNonElementParentNode(toDocument($14));
      })(bindFlipped3(document2)(windowImpl))();
      var v = getElementById(s)(npn)();
      if (v instanceof Just) {
        var v1 = fromElement(v.value0);
        if (v1 instanceof Just) {
          return checked(v1.value0)();
        }
        ;
        throw new Error("Failed pattern match at Mines.Settings (line 35, column 9 - line 35, column 52): " + [v1.constructor.name]);
      }
      ;
      throw new Error("Failed pattern match at Mines.Settings (line 34, column 5 - line 34, column 47): " + [v.constructor.name]);
    };
  };
  var defaultSettings = function __do() {
    var v = getCanvasElementById("minefield")();
    if (v instanceof Just) {
      var ctx = getContext2D(v.value0)();
      var ad = getCheckboxValue("autodecrement")();
      var aqf = getCheckboxValue("questionflags")();
      return {
        autoDecrement: ad,
        allowQuestionFlags: aqf,
        mfCanvas: v.value0,
        mfCtx: ctx,
        timerId: Nothing.value
      };
    }
    ;
    throw new Error("Failed pattern match at Mines.Settings (line 41, column 5 - line 41, column 52): " + [v.constructor.name]);
  };

  // output/Mines.Templates/index.js
  var threeColorScenario = "board:\n    width: 15\n    height: 15\ndistribution:\n    - mine: redMine \n      count: 15\n    - mine: greenMine \n      count: 15\n    - mine: blueMine\n      count: 15\n";
  var sixColorScenario = "board:\n    width: 15\n    height: 15\ndistribution:\n    - mine: redMine \n      count: 10\n    - mine: greenMine \n      count: 10\n    - mine: blueMine\n      count: 10\n    - mine: antiRedMine \n      count: 10\n    - mine: antiGreenMine \n      count: 10\n    - mine: antiBlueMine\n      count: 10\n";
  var magnetScenario = "board:\n    width: 15\n    height: 15\ndistribution:\n    - mine: magnetMine \n      count: 30\n";
  var classicScenario = "board:\n    width: 15\n    height: 15\ndistribution:\n    - mine: standardMine \n      count: 30\n";
  var antiMineScenario = "board:\n    width: 15\n    height: 15\ndistribution:\n    - mine: standardMine \n      count: 15\n    - mine: antiMine \n      count: 15\n";

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
  function setAttribute(name15) {
    return function(value12) {
      return function(element) {
        return function() {
          element.setAttribute(name15, value12);
        };
      };
    };
  }
  function getBoundingClientRect(el) {
    return function() {
      var rect2 = el.getBoundingClientRect();
      return {
        top: rect2.top,
        right: rect2.right,
        bottom: rect2.bottom,
        left: rect2.left,
        width: rect2.width,
        height: rect2.height,
        x: rect2.x,
        y: rect2.y
      };
    };
  }

  // output/Web.DOM.ParentNode/foreign.js
  var getEffProp2 = function(name15) {
    return function(node) {
      return function() {
        return node[name15];
      };
    };
  };
  var children = getEffProp2("children");
  var _firstElementChild = getEffProp2("firstElementChild");
  var _lastElementChild = getEffProp2("lastElementChild");
  var childElementCount = getEffProp2("childElementCount");

  // output/Web.DOM.Element/index.js
  var toNode3 = unsafeCoerce2;
  var toEventTarget = unsafeCoerce2;

  // output/Web.DOM.Node/foreign.js
  var getEffProp3 = function(name15) {
    return function(node) {
      return function() {
        return node[name15];
      };
    };
  };
  var baseURI = getEffProp3("baseURI");
  var _ownerDocument = getEffProp3("ownerDocument");
  var _parentNode = getEffProp3("parentNode");
  var _parentElement = getEffProp3("parentElement");
  var childNodes = getEffProp3("childNodes");
  var _firstChild = getEffProp3("firstChild");
  var _lastChild = getEffProp3("lastChild");
  var _previousSibling = getEffProp3("previousSibling");
  var _nextSibling = getEffProp3("nextSibling");
  var _nodeValue = getEffProp3("nodeValue");
  var textContent = getEffProp3("textContent");
  function setTextContent(value12) {
    return function(node) {
      return function() {
        node.textContent = value12;
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
  function removeChild(node) {
    return function(parent2) {
      return function() {
        parent2.removeChild(node);
      };
    };
  }

  // output/Web.DOM.Node/index.js
  var map18 = /* @__PURE__ */ map(functorEffect);
  var firstChild = /* @__PURE__ */ function() {
    var $25 = map18(toMaybe);
    return function($26) {
      return $25(_firstChild($26));
    };
  }();

  // output/Web.Event.EventTarget/foreign.js
  function eventListener(fn) {
    return function() {
      return function(event) {
        return fn(event)();
      };
    };
  }
  function addEventListener(type2) {
    return function(listener) {
      return function(useCapture) {
        return function(target5) {
          return function() {
            return target5.addEventListener(type2, listener, useCapture);
          };
        };
      };
    };
  }

  // output/Web.UIEvent.MouseEvent/foreign.js
  function clientX(e) {
    return e.clientX;
  }
  function clientY(e) {
    return e.clientY;
  }
  function button(e) {
    return e.button;
  }

  // output/Web.UIEvent.MouseEvent/index.js
  var fromEvent = /* @__PURE__ */ unsafeReadProtoTagged("MouseEvent");

  // output/Mines/index.js
  var show7 = /* @__PURE__ */ show(showInt);
  var pure8 = /* @__PURE__ */ pure(applicativeEffect);
  var $$void3 = /* @__PURE__ */ $$void(functorEffect);
  var bind7 = /* @__PURE__ */ bind(bindEffect);
  var map19 = /* @__PURE__ */ map(functorEffect);
  var bindFlipped4 = /* @__PURE__ */ bindFlipped(bindEffect);
  var map110 = /* @__PURE__ */ map(functorArray);
  var sequence2 = /* @__PURE__ */ sequence(traversableArray)(applicativeEffect);
  var diff2 = /* @__PURE__ */ diff(durationMilliseconds);
  var fromDuration2 = /* @__PURE__ */ fromDuration(durationMilliseconds);
  var mod4 = /* @__PURE__ */ mod(euclideanRingInt);
  var div2 = /* @__PURE__ */ div(euclideanRingInt);
  var min8 = /* @__PURE__ */ min(ordNumber);
  var append15 = /* @__PURE__ */ append(semigroupMineCharge);
  var bind12 = /* @__PURE__ */ bind(bindMaybe);
  var lookup5 = /* @__PURE__ */ lookup2(ordIPoint);
  var eq4 = /* @__PURE__ */ eq(eqGameState);
  var eqMaybe2 = /* @__PURE__ */ eqMaybe(eqFlag);
  var eq15 = /* @__PURE__ */ eq(eqMaybe2);
  var logShow2 = /* @__PURE__ */ logShow(showInt);
  var fromFoldable6 = /* @__PURE__ */ fromFoldable(foldableSet);
  var map24 = /* @__PURE__ */ map(functorMap);
  var notEq1 = /* @__PURE__ */ notEq(eqMaybe2);
  var logShow1 = /* @__PURE__ */ logShow(showString);
  var show13 = /* @__PURE__ */ show(showNumber);
  var logShow22 = /* @__PURE__ */ logShow(showIPoint);
  var member2 = /* @__PURE__ */ member(ordIPoint);
  var notEq22 = /* @__PURE__ */ notEq(eqGameState);
  var logShow3 = /* @__PURE__ */ logShow(/* @__PURE__ */ showEither(showString)(showJsonDecodeError));
  var makeFractionalString = function(a) {
    return function(b) {
      return show7(a) + ("/" + show7(b));
    };
  };
  var makeFlagTableRow = function(v) {
    return function(v1) {
      if (v1 instanceof Nothing) {
        return pure8(unit);
      }
      ;
      if (v1 instanceof Just) {
        return $$void3(function __do3() {
          var v2 = map19(fromHTMLElement2)(insertRow(v))();
          if (v2 instanceof Just) {
            (function() {
              if (v1.value0.mine.flagGraphic instanceof MineSymbol) {
                var v32 = map19(fromHTMLElement)(insertCell(v2.value0))();
                if (v32 instanceof Just) {
                  setTextContent(v1.value0.mine.flagGraphic.value0)(toNode(v32.value0))();
                  var style = "font-size: 50px; font-family: gothica; vertical-align: center; text-align: center; color: " + v1.value0.mine.flagColor;
                  return setAttribute("style")(style)(toElement(v32.value0))();
                }
                ;
                throw new Error("Failed pattern match at Mines (line 408, column 13 - line 408, column 69): " + [v32.constructor.name]);
              }
              ;
              if (v1.value0.mine.flagGraphic instanceof MinePath) {
                var v32 = map19(fromHTMLElement)(insertCell(v2.value0))();
                if (v32 instanceof Just) {
                  var ce = bindFlipped4(function() {
                    var $227 = createElement("canvas");
                    return function($228) {
                      return $227(toDocument($228));
                    };
                  }())(bindFlipped4(document2)(windowImpl))();
                  setAttribute("width")("50px")(ce)();
                  setAttribute("height")("50px")(ce)();
                  var v4 = toCanvasElement(ce);
                  if (v4 instanceof Just) {
                    var ctx = getContext2D(v4.value0)();
                    setFillStyle(ctx)(v1.value0.mine.flagColor)();
                    fillPath2D(ctx)(v1.value0.mine.flagGraphic.value0)({
                      x: 0,
                      y: 0,
                      width: 50,
                      height: 50
                    })();
                    return appendChild(toNode3(ce))(toNode3(toElement(v32.value0)))();
                  }
                  ;
                  throw new Error("Failed pattern match at Mines (line 418, column 17 - line 418, column 51): " + [v4.constructor.name]);
                }
                ;
                throw new Error("Failed pattern match at Mines (line 414, column 13 - line 414, column 69): " + [v32.constructor.name]);
              }
              ;
              throw new Error("Failed pattern match at Mines (line 406, column 5 - line 422, column 68): " + [v1.value0.mine.flagGraphic.constructor.name]);
            })();
            var v3 = map19(fromHTMLElement)(insertCell(v2.value0))();
            if (v3 instanceof Just) {
              setTextContent(makeFractionalString(v1.value0.current)(v1.value0.total))(toNode(v3.value0))();
              return setAttribute("style")("font-family: gothica; vertical-align: center; text-align: center")(toElement(v3.value0))();
            }
            ;
            throw new Error("Failed pattern match at Mines (line 424, column 5 - line 424, column 63): " + [v3.constructor.name]);
          }
          ;
          throw new Error("Failed pattern match at Mines (line 405, column 5 - line 405, column 53): " + [v2.constructor.name]);
        });
      }
      ;
      throw new Error("Failed pattern match at Mines (line 402, column 1 - line 402, column 73): " + [v.constructor.name, v1.constructor.name]);
    };
  };
  var renderTable = function(sr) {
    return function(mr) {
      return $$void3(function __do3() {
        var d = map19(toDocument)(bindFlipped4(document2)(windowImpl))();
        var npn = toNonElementParentNode(d);
        var v = getElementById("minecount")(npn)();
        if (v instanceof Just) {
          var v1 = fromElement2(v.value0);
          if (v1 instanceof Just) {
            var tbody$prime = firstChild(toNode2(v1.value0))();
            (function() {
              if (tbody$prime instanceof Nothing) {
                return unit;
              }
              ;
              if (tbody$prime instanceof Just) {
                return removeChild(tbody$prime.value0)(toNode2(v1.value0))();
              }
              ;
              throw new Error("Failed pattern match at Mines (line 438, column 3 - line 440, column 55): " + [tbody$prime.constructor.name]);
            })();
            var m = read(mr)();
            var s = read(sr)();
            var totalCount = countSafeSquares(m);
            var revealedCount = countRevealedSquares(m);
            var v2 = map19(fromHTMLElement2)(insertRow(v1.value0))();
            if (v2 instanceof Just) {
              var v3 = map19(fromHTMLElement)(insertCell(v2.value0))();
              if (v3 instanceof Just) {
                setTextContent("\u25A3")(toNode(v3.value0))();
                setAttribute("style")("font-size: 50px; vertical-align: center; text-align: center")(toElement(v3.value0))();
                var v4 = map19(fromHTMLElement)(insertCell(v2.value0))();
                if (v4 instanceof Just) {
                  setTextContent(makeFractionalString(revealedCount)(totalCount))(toNode(v4.value0))();
                  setAttribute("style")("font-family: gothica; vertical-align: center; text-align: center")(toElement(v4.value0))();
                  var flagArray = map110(Flag.create)(range(0)(length(m.presentMines) - 1 | 0));
                  $$void3(sequence2(map110(function(k) {
                    return makeFlagTableRow(v1.value0)(getFlagCount(m)(k));
                  })(flagArray)))();
                  var $122 = length(flagArray) !== 1 && s.allowQuestionFlags;
                  if ($122) {
                    return makeFlagTableRow(v1.value0)(getFlagCount(m)(UnknownMine.value))();
                  }
                  ;
                  return unit;
                }
                ;
                throw new Error("Failed pattern match at Mines (line 454, column 3 - line 454, column 77): " + [v4.constructor.name]);
              }
              ;
              throw new Error("Failed pattern match at Mines (line 450, column 3 - line 450, column 77): " + [v3.constructor.name]);
            }
            ;
            throw new Error("Failed pattern match at Mines (line 449, column 3 - line 449, column 63): " + [v2.constructor.name]);
          }
          ;
          throw new Error("Failed pattern match at Mines (line 434, column 7 - line 434, column 42): " + [v1.constructor.name]);
        }
        ;
        throw new Error("Failed pattern match at Mines (line 433, column 3 - line 433, column 50): " + [v.constructor.name]);
      });
    };
  };
  var handleTimer = function(mr) {
    return function(t) {
      return function __do3() {
        var t$prime = now();
        var v = diff2(t$prime)(t);
        var v1 = fromDuration2(v);
        var centis = toNumber(mod4(div2(floor2(v1))(10))(100));
        var seconds = toNumber(mod4(div2(floor2(v1))(1e3))(60));
        var minutes = v1 / 6e4;
        var v2 = formatNumber("00")(centis);
        if (v2 instanceof Right) {
          var v3 = formatNumber("00")(seconds);
          if (v3 instanceof Right) {
            var minutesString = show7(floor2(minutes));
            var npn = map19(function($229) {
              return toNonElementParentNode(toDocument($229));
            })(bindFlipped4(document2)(windowImpl))();
            var v4 = getElementById("timer")(npn)();
            if (v4 instanceof Just) {
              setTextContent(minutesString + (":" + (v3.value0 + ("." + v2.value0))))(toNode3(v4.value0))();
              return unit;
            }
            ;
            throw new Error("Failed pattern match at Mines (line 353, column 5 - line 353, column 44): " + [v4.constructor.name]);
          }
          ;
          throw new Error("Failed pattern match at Mines (line 348, column 9 - line 348, column 58): " + [v3.constructor.name]);
        }
        ;
        throw new Error("Failed pattern match at Mines (line 347, column 9 - line 347, column 56): " + [v2.constructor.name]);
      };
    };
  };
  var getSquareSize = function(s) {
    return function(m) {
      return function __do3() {
        var dims = getCanvasDimensions(s.mfCanvas)();
        var canvasLength = min8(dims.width)(dims.height);
        return canvasLength / toNumber(m.maximalExtent);
      };
    };
  };
  var getDisplayCharge = function(v) {
    return function(v1) {
      if (v1) {
        return append15(fromMaybe(NoMines.value)(v.charge))(negateCharge(fromMaybe(NoMines.value)(v.flagCharge)));
      }
      ;
      if (!v1) {
        return fromMaybe(NoMines.value)(v.charge);
      }
      ;
      throw new Error("Failed pattern match at Mines (line 185, column 1 - line 185, column 50): " + [v.constructor.name, v1.constructor.name]);
    };
  };
  var drawMineGraphic = function(ctx) {
    return function(rect2) {
      return function(g) {
        return function(color) {
          if (g instanceof MineSymbol) {
            var halfSize = rect2.width / 2;
            return function __do3() {
              setFillStyle(ctx)(color)();
              setTextAlign(ctx)(AlignCenter.value)();
              setFont(ctx)(show7(floor2(1.2 * halfSize)) + "px gothica")();
              return fillText(ctx)(g.value0)(rect2.x + halfSize)(rect2.y + halfSize)();
            };
          }
          ;
          if (g instanceof MinePath) {
            return function __do3() {
              setFillStyle(ctx)(color)();
              var offset = rect2.width / 6;
              var dim = rect2.width - 2 * offset;
              var r = {
                x: rect2.x + offset,
                y: rect2.y + offset,
                width: dim,
                height: dim
              };
              return fillPath2D(ctx)(g.value0)(r)();
            };
          }
          ;
          throw new Error("Failed pattern match at Mines (line 224, column 36 - line 236, column 27): " + [g.constructor.name]);
        };
      };
    };
  };
  var drawFlag = function(s) {
    return function(rect2) {
      return function(clue) {
        return function(mineDistribution) {
          if (clue.flagState instanceof Nothing) {
            return pure8(unit);
          }
          ;
          if (clue.flagState instanceof Just && clue.flagState.value0 instanceof Flag) {
            var v = bind12(index(mineDistribution)(clue.flagState.value0.value0))(function($230) {
              return Just.create(mineGraphicsOf(mineOf($230)));
            });
            if (v instanceof Nothing) {
              return pure8(unit);
            }
            ;
            if (v instanceof Just) {
              return drawMineGraphic(s.mfCtx)(rect2)(v.value0.flagGraphic)(v.value0.flagColor);
            }
            ;
            throw new Error("Failed pattern match at Mines (line 241, column 24 - line 243, column 71): " + [v.constructor.name]);
          }
          ;
          if (clue.flagState instanceof Just && clue.flagState.value0 instanceof UnknownMine) {
            return drawMineGraphic(s.mfCtx)(rect2)(new MineSymbol("?"))("#FFFFFF");
          }
          ;
          throw new Error("Failed pattern match at Mines (line 239, column 62 - line 244, column 78): " + [clue.flagState.constructor.name]);
        };
      };
    };
  };
  var drawCharge = function(s) {
    return function(x) {
      return function(y) {
        return function(squareSize) {
          return function(clue) {
            return function(dm) {
              if (clue.mine instanceof Just) {
                return pure8(unit);
              }
              ;
              if (clue.mine instanceof Nothing) {
                var v = getDisplayCharge(clue)(s.autoDecrement);
                if (v instanceof NoMines) {
                  return pure8(unit);
                }
                ;
                if (v instanceof Charge) {
                  var halfSize = squareSize / 2;
                  return function __do3() {
                    setTextAlign(s.mfCtx)(AlignCenter.value)();
                    setTextBaseline(s.mfCtx)(BaselineMiddle.value)();
                    setFont(s.mfCtx)(show7(floor2(halfSize)) + "px gothica")();
                    if (dm instanceof ClassicalOnly) {
                      setFillStyle(s.mfCtx)(classicalColor(v.value0))();
                      return fillText(s.mfCtx)(show7(v.value0))(x + halfSize)(y + halfSize)();
                    }
                    ;
                    if (dm instanceof ColorOnly) {
                      var cm = colorChargeMagnitude(v.value1)(v.value2)(v.value3);
                      var cc = colorChargeColor(v.value1)(v.value2)(v.value3);
                      setFillStyle(s.mfCtx)(cc)();
                      return fillText(s.mfCtx)(cm)(x + halfSize)(y + halfSize)();
                    }
                    ;
                    if (dm instanceof ComplexCharges) {
                      setFont(s.mfCtx)(show7(floor2(halfSize)) + "px gothica")();
                      var quarterSize = squareSize / 4;
                      var offset = halfSize * 0.15;
                      setFillStyle(s.mfCtx)(classicalColor(v.value0))();
                      fillText(s.mfCtx)(show7(v.value0))(x + halfSize - offset)(y + quarterSize)();
                      var cm = colorChargeMagnitude(v.value1)(v.value2)(v.value3);
                      var cc = colorChargeColor(v.value1)(v.value2)(v.value3);
                      setFillStyle(s.mfCtx)(cc)();
                      return fillText(s.mfCtx)(cm)(x + halfSize + offset)(y + halfSize + quarterSize)();
                    }
                    ;
                    throw new Error("Failed pattern match at Mines (line 200, column 13 - line 220, column 89): " + [dm.constructor.name]);
                  };
                }
                ;
                throw new Error("Failed pattern match at Mines (line 191, column 16 - line 220, column 89): " + [v.constructor.name]);
              }
              ;
              throw new Error("Failed pattern match at Mines (line 189, column 39 - line 220, column 89): " + [clue.mine.constructor.name]);
            };
          };
        };
      };
    };
  };
  var drawSquare = function(s) {
    return function(m) {
      return function(squareSize) {
        return function(v) {
          var v1 = lookup5(v)(m.map);
          if (v1 instanceof Nothing) {
            return pure8(unit);
          }
          ;
          if (v1 instanceof Just) {
            var x = toNumber(v.x) * squareSize;
            var y = toNumber(v.y) * squareSize;
            var boundRect = {
              x,
              y,
              width: squareSize,
              height: squareSize
            };
            var backgroundColor = function() {
              if (v1.value0.revealed) {
                if (v1.value0.mine instanceof Nothing) {
                  return "#FFF";
                }
                ;
                if (v1.value0.mine instanceof Just) {
                  return "#F88";
                }
                ;
                throw new Error("Failed pattern match at Mines (line 138, column 53 - line 140, column 35): " + [v1.value0.mine.constructor.name]);
              }
              ;
              var $163 = eq4(m.gameState)(Won.value);
              if ($163) {
                return "#0c7";
              }
              ;
              return "#999";
            }();
            return function __do3() {
              setFillStyle(s.mfCtx)(backgroundColor)();
              fillPath(s.mfCtx)(rect(s.mfCtx)(boundRect))();
              setStrokeStyle(s.mfCtx)("#000000")();
              strokePath(s.mfCtx)(rect(s.mfCtx)(boundRect))();
              var $164 = eq4(m.gameState)(Ungenerated.value) || eq4(m.gameState)(Generated.value);
              if ($164) {
                if (v1.value0.revealed) {
                  return drawCharge(s)(x)(y)(squareSize)(v1.value0)(m.displayMode)();
                }
                ;
                return drawFlag(s)(boundRect)(v1.value0)(m.mineDistribution)();
              }
              ;
              if (v1.value0.mine instanceof Nothing) {
                if (v1.value0.revealed) {
                  return drawCharge(s)(x)(y)(squareSize)(v1.value0)(m.displayMode)();
                }
                ;
                drawFlag(s)(boundRect)(v1.value0)(m.mineDistribution)();
                var $168 = eq15(v1.value0.flagState)(Nothing.value);
                if ($168) {
                  return unit;
                }
                ;
                return drawMineGraphic(s.mfCtx)(boundRect)(new MinePath(misflagX))("#FFFFFF")();
              }
              ;
              if (v1.value0.mine instanceof Just) {
                if (v1.value0.flagState instanceof Nothing) {
                  return drawMineGraphic(s.mfCtx)(boundRect)(v1.value0.mine.value0.value0.mineGraphic)(v1.value0.mine.value0.value0.mineColor)();
                }
                ;
                if (v1.value0.flagState instanceof Just && v1.value0.flagState.value0 instanceof UnknownMine) {
                  return drawMineGraphic(s.mfCtx)(boundRect)(v1.value0.mine.value0.value0.mineGraphic)(v1.value0.mine.value0.value0.mineColor)();
                }
                ;
                if (v1.value0.flagState instanceof Just && v1.value0.flagState.value0 instanceof Flag) {
                  var k$prime = fromMaybe(v1.value0.flagState.value0.value0)(v1.value0.mineIndex);
                  logShow2(v1.value0.flagState.value0.value0)();
                  logShow2(k$prime)();
                  var $171 = v1.value0.flagState.value0.value0 === k$prime;
                  if ($171) {
                    return drawFlag(s)(boundRect)(v1.value0)(m.mineDistribution)();
                  }
                  ;
                  var offset = squareSize * 0.4;
                  var dim = squareSize * 0.6;
                  var mineRect = {
                    x,
                    y: y + offset,
                    width: dim,
                    height: dim
                  };
                  var flagRect = {
                    x: x + offset,
                    y,
                    width: dim,
                    height: dim
                  };
                  drawMineGraphic(s.mfCtx)(mineRect)(v1.value0.mine.value0.value0.mineGraphic)(v1.value0.mine.value0.value0.mineColor)();
                  var v2 = index(m.presentMines)(v1.value0.flagState.value0.value0);
                  if (v2 instanceof Just) {
                    drawMineGraphic(s.mfCtx)(flagRect)(v2.value0.value0.flagGraphic)(v2.value0.value0.flagColor)();
                    return drawMineGraphic(s.mfCtx)(flagRect)(new MinePath(misflagX))("#FFFFFF")();
                  }
                  ;
                  throw new Error("Failed pattern match at Mines (line 181, column 33 - line 181, column 73): " + [v2.constructor.name]);
                }
                ;
                throw new Error("Failed pattern match at Mines (line 166, column 38 - line 183, column 87): " + [v1.value0.flagState.constructor.name]);
              }
              ;
              throw new Error("Failed pattern match at Mines (line 158, column 13 - line 183, column 87): " + [v1.value0.mine.constructor.name]);
            };
          }
          ;
          throw new Error("Failed pattern match at Mines (line 124, column 43 - line 183, column 87): " + [v1.constructor.name]);
        };
      };
    };
  };
  var drawMinefield = function(sr) {
    return function(mr) {
      return $$void3(function __do3() {
        var m = read(mr)();
        var s = read(sr)();
        var dims = getCanvasDimensions(s.mfCanvas)();
        clearRect(s.mfCtx)({
          x: 0,
          y: 0,
          width: dims.width,
          height: dims.height
        })();
        var points = fromFoldable6(keys3(m.map));
        var squareSize = getSquareSize(s)(m)();
        return sequence2(map110(drawSquare(s)(m)(squareSize))(points))();
      });
    };
  };
  var colorizeTimer = function(mr) {
    return function __do3() {
      var m = read(mr)();
      var color = function() {
        if (m.gameState instanceof Ungenerated) {
          return "#CCC";
        }
        ;
        if (m.gameState instanceof Generated) {
          return "#FFF";
        }
        ;
        if (m.gameState instanceof Dead) {
          return "#F00";
        }
        ;
        if (m.gameState instanceof Won) {
          return "#0F0";
        }
        ;
        throw new Error("Failed pattern match at Mines (line 249, column 17 - line 253, column 26): " + [m.gameState.constructor.name]);
      }();
      var npn = map19(function($231) {
        return toNonElementParentNode(toDocument($231));
      })(bindFlipped4(document2)(windowImpl))();
      var v = getElementById("timer")(npn)();
      if (v instanceof Just) {
        return setAttribute("style")("font-family: gothica; color: " + color)(v.value0)();
      }
      ;
      throw new Error("Failed pattern match at Mines (line 256, column 5 - line 256, column 44): " + [v.constructor.name]);
    };
  };
  var draw = function(sr) {
    return function(mr) {
      return function __do3() {
        drawMinefield(sr)(mr)();
        renderTable(sr)(mr)();
        return colorizeTimer(mr)();
      };
    };
  };
  var onCheckboxClick = function(s) {
    return function(f) {
      return function(g) {
        return function(sr) {
          return function(mr) {
            return function(v) {
              return function __do3() {
                var v1 = getCheckboxValue(s)();
                modify(f(v1))(sr)();
                modify(g(v1))(mr)();
                return draw(sr)(mr)();
              };
            };
          };
        };
      };
    };
  };
  var questionFlagHandler = /* @__PURE__ */ function() {
    var g = function(v) {
      return function(v1) {
        if (v) {
          return v1;
        }
        ;
        if (!v) {
          return {
            bounds: v1.bounds,
            displayMode: v1.displayMode,
            gameState: v1.gameState,
            maximalExtent: v1.maximalExtent,
            mineDistribution: v1.mineDistribution,
            presentMines: v1.presentMines,
            map: map24(function(c) {
              return {
                charge: c.charge,
                flagCharge: c.flagCharge,
                mine: c.mine,
                mineIndex: c.mineIndex,
                revealed: c.revealed,
                flagState: function() {
                  var $187 = notEq1(c.flagState)(new Just(UnknownMine.value));
                  if ($187) {
                    return c.flagState;
                  }
                  ;
                  return Nothing.value;
                }()
              };
            })(v1.map)
          };
        }
        ;
        throw new Error("Failed pattern match at Mines (line 333, column 5 - line 333, column 17): " + [v.constructor.name, v1.constructor.name]);
      };
    };
    return onCheckboxClick("questionflags")(function(a) {
      return function(s) {
        return {
          autoDecrement: s.autoDecrement,
          mfCanvas: s.mfCanvas,
          mfCtx: s.mfCtx,
          timerId: s.timerId,
          allowQuestionFlags: a
        };
      };
    })(g);
  }();
  var onMinefieldClick = function(sr) {
    return function(mr) {
      return function(e) {
        return $$void3(function __do3() {
          var npn = map19(function($232) {
            return toNonElementParentNode(toDocument($232));
          })(bindFlipped4(document2)(windowImpl))();
          var v = getElementById("minefield")(npn)();
          if (v instanceof Just) {
            var cbr = getBoundingClientRect(v.value0)();
            var v1 = fromEvent(e);
            if (v1 instanceof Just) {
              var x = toNumber(clientX(v1.value0)) - cbr.left;
              var y = toNumber(clientY(v1.value0)) - cbr.top;
              logShow1(show13(x) + (" " + show13(y)))();
              var m = read(mr)();
              var s = read(sr)();
              var squareSize = getSquareSize(s)(m)();
              var mx = floor2(x / squareSize);
              var my = floor2(y / squareSize);
              var minefieldCoords = mkIPoint(mx)(my);
              logShow22(minefieldCoords)();
              var pressedButtons = button(v1.value0);
              (function() {
                var $190 = !member2(minefieldCoords)(m.map);
                if ($190) {
                  return unit;
                }
                ;
                if (m.gameState instanceof Ungenerated) {
                  var $192 = pressedButtons !== 0;
                  if ($192) {
                    return unit;
                  }
                  ;
                  var seed = randomSeed();
                  var field = runOnceWithSeed(minefieldGenerator(m)(minefieldCoords))(seed);
                  $$void3(modify(function(v2) {
                    return field;
                  })(mr))();
                  var t = now();
                  var iid = setInterval2(4)(handleTimer(mr)(t))();
                  $$void3(modify(function(st) {
                    return {
                      allowQuestionFlags: st.allowQuestionFlags,
                      autoDecrement: st.autoDecrement,
                      mfCanvas: st.mfCanvas,
                      mfCtx: st.mfCtx,
                      timerId: new Just(iid)
                    };
                  })(sr))();
                  return unit;
                }
                ;
                if (m.gameState instanceof Generated) {
                  if (pressedButtons === 2) {
                    return $$void3(modify(flagSquare(s.allowQuestionFlags)(minefieldCoords))(mr))();
                  }
                  ;
                  if (pressedButtons === 0) {
                    var handleReveal = function(p) {
                      var v2 = lookup5(p)(m.map);
                      if (v2 instanceof Nothing) {
                        return function(mf) {
                          return mf;
                        };
                      }
                      ;
                      if (v2 instanceof Just) {
                        if (v2.value0.revealed) {
                          return chordSquare(p);
                        }
                        ;
                        return revealSquare(p);
                      }
                      ;
                      throw new Error("Failed pattern match at Mines (line 303, column 34 - line 305, column 91): " + [v2.constructor.name]);
                    };
                    return $$void3(modify(handleReveal(minefieldCoords))(mr))();
                  }
                  ;
                  throw new Error("Failed pattern match at Mines (line 300, column 22 - line 305, column 91): " + [pressedButtons.constructor.name]);
                }
                ;
                return unit;
              })();
              var m$prime = modify(setWinningBoard)(mr)();
              (function() {
                var $197 = notEq22(m$prime.gameState)(Generated.value) && eq4(m.gameState)(Generated.value);
                if ($197) {
                  if (s.timerId instanceof Nothing) {
                    return unit;
                  }
                  ;
                  if (s.timerId instanceof Just) {
                    return clearInterval2(s.timerId.value0)();
                  }
                  ;
                  throw new Error("Failed pattern match at Mines (line 313, column 9 - line 315, column 44): " + [s.timerId.constructor.name]);
                }
                ;
                return unit;
              })();
              return draw(sr)(mr)();
            }
            ;
            throw new Error("Failed pattern match at Mines (line 271, column 9 - line 271, column 32): " + [v1.constructor.name]);
          }
          ;
          throw new Error("Failed pattern match at Mines (line 268, column 5 - line 268, column 48): " + [v.constructor.name]);
        });
      };
    };
  };
  var scenarioLoad = function(sr) {
    return function(mr) {
      return function __do3() {
        var npn = map19(function($233) {
          return toNonElementParentNode(toDocument($233));
        })(bindFlipped4(document2)(windowImpl))();
        var v = getElementById("scenarioinput")(npn)();
        if (v instanceof Just) {
          var v1 = fromElement3(v.value0);
          if (v1 instanceof Just) {
            var scenario = value11(v1.value0)();
            (function() {
              var v2 = parseScenarioToMinefield(scenario);
              if (v2 instanceof Left) {
                return logShow3(v2.value0)();
              }
              ;
              if (v2 instanceof Right) {
                return $$void3(modify(function(v3) {
                  return v2.value0;
                })(mr))();
              }
              ;
              throw new Error("Failed pattern match at Mines (line 365, column 5 - line 367, column 50): " + [v2.constructor.name]);
            })();
            var s = read(sr)();
            (function() {
              if (s.timerId instanceof Nothing) {
                return unit;
              }
              ;
              if (s.timerId instanceof Just) {
                clearInterval2(s.timerId.value0)();
                var v2 = getElementById("timer")(npn)();
                if (v2 instanceof Just) {
                  return setTextContent("0:00.00")(toNode3(v2.value0))();
                }
                ;
                throw new Error("Failed pattern match at Mines (line 375, column 17 - line 375, column 57): " + [v2.constructor.name]);
              }
              ;
              throw new Error("Failed pattern match at Mines (line 371, column 5 - line 376, column 56): " + [s.timerId.constructor.name]);
            })();
            return draw(sr)(mr)();
          }
          ;
          throw new Error("Failed pattern match at Mines (line 362, column 9 - line 362, column 43): " + [v1.constructor.name]);
        }
        ;
        throw new Error("Failed pattern match at Mines (line 361, column 5 - line 361, column 52): " + [v.constructor.name]);
      };
    };
  };
  var setScenario = function(scenario) {
    return function(sr) {
      return function(mr) {
        return function __do3() {
          var npn = map19(function($234) {
            return toNonElementParentNode(toDocument($234));
          })(bindFlipped4(document2)(windowImpl))();
          var v = getElementById("scenarioinput")(npn)();
          if (v instanceof Just) {
            var v1 = fromElement3(v.value0);
            if (v1 instanceof Just) {
              setValue11(scenario)(v1.value0)();
              return scenarioLoad(sr)(mr)();
            }
            ;
            throw new Error("Failed pattern match at Mines (line 384, column 9 - line 384, column 43): " + [v1.constructor.name]);
          }
          ;
          throw new Error("Failed pattern match at Mines (line 383, column 5 - line 383, column 52): " + [v.constructor.name]);
        };
      };
    };
  };
  var setupPresetScenarioEvent = function(sr) {
    return function(mr) {
      return function(id3) {
        return function(scenario) {
          return function __do3() {
            var npn = map19(function($235) {
              return toNonElementParentNode(toDocument($235));
            })(bindFlipped4(document2)(windowImpl))();
            var v = getElementById(id3)(npn)();
            if (v instanceof Just) {
              var scenarioChangeEvent = eventListener(function(v1) {
                return setScenario(scenario)(sr)(mr);
              })();
              return addEventListener("click")(scenarioChangeEvent)(true)(toEventTarget(v.value0))();
            }
            ;
            throw new Error("Failed pattern match at Mines (line 391, column 5 - line 391, column 53): " + [v.constructor.name]);
          };
        };
      };
    };
  };
  var autoDecHandler = /* @__PURE__ */ onCheckboxClick("autodecrement")(function(a) {
    return function(s) {
      return {
        allowQuestionFlags: s.allowQuestionFlags,
        mfCanvas: s.mfCanvas,
        mfCtx: s.mfCtx,
        timerId: s.timerId,
        autoDecrement: a
      };
    };
  })(function(v) {
    return function(m) {
      return m;
    };
  });
  var setupEvents = function(settingsRef) {
    return function(minefieldRef) {
      return $$void3(function __do3() {
        var npn = map19(function($236) {
          return toNonElementParentNode(toDocument($236));
        })(bindFlipped4(document2)(windowImpl))();
        var v = getElementById("minefield")(npn)();
        if (v instanceof Just) {
          var minefieldEvent = eventListener(onMinefieldClick(settingsRef)(minefieldRef))();
          addEventListener("mousedown")(minefieldEvent)(true)(toEventTarget(v.value0))();
          var v1 = getElementById("autodecrement")(npn)();
          if (v1 instanceof Just) {
            var autoDecrementEvent = eventListener(autoDecHandler(settingsRef)(minefieldRef))();
            addEventListener("click")(autoDecrementEvent)(true)(toEventTarget(v1.value0))();
            var v2 = getElementById("questionflags")(npn)();
            if (v2 instanceof Just) {
              var qfEvent = eventListener(questionFlagHandler(settingsRef)(minefieldRef))();
              addEventListener("click")(qfEvent)(true)(toEventTarget(v2.value0))();
              var v3 = getElementById("loadscenario")(npn)();
              if (v3 instanceof Just) {
                var scenarioLoadEvent = eventListener(function(v4) {
                  return scenarioLoad(settingsRef)(minefieldRef);
                })();
                addEventListener("click")(scenarioLoadEvent)(true)(toEventTarget(v3.value0))();
                var presetScenario = setupPresetScenarioEvent(settingsRef)(minefieldRef);
                presetScenario("classicscenario")(classicScenario)();
                presetScenario("antiminescenario")(antiMineScenario)();
                presetScenario("threecolorscenario")(threeColorScenario)();
                presetScenario("sixcolorscenario")(sixColorScenario)();
                return presetScenario("magnetscenario")(magnetScenario)();
              }
              ;
              throw new Error("Failed pattern match at Mines (line 77, column 3 - line 77, column 63): " + [v3.constructor.name]);
            }
            ;
            throw new Error("Failed pattern match at Mines (line 73, column 3 - line 73, column 52): " + [v2.constructor.name]);
          }
          ;
          throw new Error("Failed pattern match at Mines (line 69, column 3 - line 69, column 57): " + [v1.constructor.name]);
        }
        ;
        throw new Error("Failed pattern match at Mines (line 65, column 3 - line 65, column 55): " + [v.constructor.name]);
      });
    };
  };
  var main = function __do2() {
    var minefieldRef = $$new(blankMinefield(15)(15)([]))();
    var settingsRef = bind7(defaultSettings)($$new)();
    scenarioLoad(settingsRef)(minefieldRef)();
    draw(settingsRef)(minefieldRef)();
    return setupEvents(settingsRef)(minefieldRef)();
  };

  // <stdin>
  main();
})();
/*! Bundled license information:

js-yaml/dist/js-yaml.mjs:
  (*! js-yaml 4.1.0 https://github.com/nodeca/js-yaml @license MIT *)
*/
