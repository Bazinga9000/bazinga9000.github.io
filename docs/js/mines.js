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
    var map19 = map(dictFunctor);
    return function(fa) {
      return function(f) {
        return map19(f)(fa);
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
    var map19 = map(dictApply.Functor0());
    return function(a) {
      return function(b) {
        return apply1(map19($$const)(a))(b);
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
  var fromFoldableImpl = function() {
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
    return function(foldr5) {
      return function(xs) {
        return listToArray(foldr5(curryCons)(emptyList)(xs));
      };
    };
  }();
  var length = function(xs) {
    return xs.length;
  };
  var unconsImpl = function(empty3) {
    return function(next) {
      return function(xs) {
        return xs.length === 0 ? empty3({}) : next(xs[0])(xs.slice(1));
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
            if (f(xs[i]))
              return just(i);
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
  var sortByImpl = function() {
    function mergeFromTo(compare4, fromOrdering, xs1, xs2, from2, to) {
      var mid;
      var i;
      var j;
      var k;
      var x;
      var y;
      var c;
      mid = from2 + (to - from2 >> 1);
      if (mid - from2 > 1)
        mergeFromTo(compare4, fromOrdering, xs2, xs1, from2, mid);
      if (to - mid > 1)
        mergeFromTo(compare4, fromOrdering, xs2, xs1, mid, to);
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
          if (xs.length < 2)
            return xs;
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
        if (p(xs[i]))
          return true;
      }
      return false;
    };
  };
  var all = function(p) {
    return function(xs) {
      var len = xs.length;
      for (var i = 0; i < len; i++) {
        if (!p(xs[i]))
          return false;
      }
      return true;
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
      if (xs.length === 0)
        return ys;
      if (ys.length === 0)
        return xs;
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

  // output/Control.Lazy/index.js
  var defer = function(dict) {
    return dict.defer;
  };

  // output/Control.Monad/index.js
  var ap = function(dictMonad) {
    var bind6 = bind(dictMonad.Bind1());
    var pure7 = pure(dictMonad.Applicative0());
    return function(f) {
      return function(a) {
        return bind6(f)(function(f$prime) {
          return bind6(a)(function(a$prime) {
            return pure7(f$prime(a$prime));
          });
        });
      };
    };
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
  var ordCharImpl = unsafeCompareImpl;

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

  // output/Data.Eq/index.js
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
    var eq33 = eq(dictEq);
    return function(x) {
      return function(y) {
        return eq2(eq33(x)(y))(false);
      };
    };
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
    var str = n.toString();
    return isNaN(str + ".0") ? str : str + ".0";
  };
  var showStringImpl = function(s) {
    var l = s.length;
    return '"' + s.replace(
      /[\0-\x1F\x7F"\\]/g,
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
        var empty3 = k < l && s[k] >= "0" && s[k] <= "9" ? "\\&" : "";
        return "\\" + c.charCodeAt(0).toString(10) + empty3;
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
      if (state3 === 2)
        return val;
      if (state3 === 1)
        throw new ReferenceError(name15 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
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

  // output/Control.Monad.ST.Internal/index.js
  var $runtime_lazy2 = function(name15, moduleName, init3) {
    var state3 = 0;
    var val;
    return function(lineNumber) {
      if (state3 === 2)
        return val;
      if (state3 === 1)
        throw new ReferenceError(name15 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
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
  var sortByImpl2 = function() {
    function mergeFromTo(compare4, fromOrdering, xs1, xs2, from2, to) {
      var mid;
      var i;
      var j;
      var k;
      var x;
      var y;
      var c;
      mid = from2 + (to - from2 >> 1);
      if (mid - from2 > 1)
        mergeFromTo(compare4, fromOrdering, xs2, xs1, from2, mid);
      if (to - mid > 1)
        mergeFromTo(compare4, fromOrdering, xs2, xs1, mid, to);
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
          return function() {
            if (xs.length < 2)
              return xs;
            mergeFromTo(compare4, fromOrdering, xs, xs.slice(0), 0, xs.length);
            return xs;
          };
        };
      };
    };
  }();

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
      return function(map19) {
        return function(pure7) {
          return function(f) {
            return function(array) {
              function go2(bot, top4) {
                switch (top4 - bot) {
                  case 0:
                    return pure7([]);
                  case 1:
                    return map19(array1)(f(array[bot]));
                  case 2:
                    return apply2(map19(array2)(f(array[bot])))(f(array[bot + 1]));
                  case 3:
                    return apply2(apply2(map19(array3)(f(array[bot])))(f(array[bot + 1])))(f(array[bot + 2]));
                  default:
                    var pivot = bot + Math.floor((top4 - bot) / 4) * 2;
                    return apply2(map19(concat2)(go2(bot, pivot)))(go2(pivot, top4));
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
      var pure7 = pure(dictApplicative);
      var map19 = map(dictApplicative.Apply0().Functor0());
      return function(v) {
        return function(v1) {
          if (v1 instanceof Nothing) {
            return pure7(Nothing.value);
          }
          ;
          if (v1 instanceof Just) {
            return map19(Just.create)(v(v1.value0));
          }
          ;
          throw new Error("Failed pattern match at Data.Traversable (line 115, column 1 - line 119, column 33): " + [v.constructor.name, v1.constructor.name]);
        };
      };
    },
    sequence: function(dictApplicative) {
      var pure7 = pure(dictApplicative);
      var map19 = map(dictApplicative.Apply0().Functor0());
      return function(v) {
        if (v instanceof Nothing) {
          return pure7(Nothing.value);
        }
        ;
        if (v instanceof Just) {
          return map19(Just.create)(v.value0);
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
  var unfoldrArrayImpl = function(isNothing2) {
    return function(fromJust6) {
      return function(fst2) {
        return function(snd2) {
          return function(f) {
            return function(b) {
              var result = [];
              var value12 = b;
              while (true) {
                var maybe2 = f(value12);
                if (isNothing2(maybe2))
                  return result;
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
  var unfoldr1ArrayImpl = function(isNothing2) {
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
                if (isNothing2(maybe2))
                  return result;
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
  var map3 = /* @__PURE__ */ map(functorST);
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
              var lst = map3(function() {
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

  // output/Data.Lazy/foreign.js
  var defer2 = function(thunk) {
    var v = null;
    return function() {
      if (thunk === void 0)
        return v;
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
    var map19 = map(Monad0.Bind1().Apply0().Functor0());
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
              return map19(Loop.create)(v1.value0);
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
    var map19 = map(dictMonadRec.Monad0().Bind1().Apply0().Functor0());
    var runParserT$prime1 = runParserT$prime(dictMonadRec);
    return function(s) {
      return function(p) {
        var initialState = new ParseState(s, initialPos, false);
        return map19(fst)(runParserT$prime1(initialState)(p));
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

  // output/Data.List/index.js
  var map4 = /* @__PURE__ */ map(functorMaybe);
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
  var toUnfoldable = function(dictUnfoldable) {
    return unfoldr(dictUnfoldable)(function(xs) {
      return map4(function(rec) {
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
  var map5 = /* @__PURE__ */ map(functorLazy);
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
    var $344 = map5(go2);
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

  // output/Parsing.Combinators/index.js
  var alt2 = /* @__PURE__ */ alt(altParserT);
  var pure2 = /* @__PURE__ */ pure(applicativeParserT);
  var map6 = /* @__PURE__ */ map(functorParserT);
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
    return option(Nothing.value)(map6(Just.create)(p));
  };

  // output/Data.Array.NonEmpty.Internal/foreign.js
  var traverse1Impl = function() {
    function Cont(fn) {
      this.fn = fn;
    }
    var emptyList = {};
    var ConsCell = function(head4, tail2) {
      this.head = head4;
      this.tail = tail2;
    };
    function finalCell(head4) {
      return new ConsCell(head4, emptyList);
    }
    function consList(x) {
      return function(xs) {
        return new ConsCell(x, xs);
      };
    }
    function listToArray(list) {
      var arr = [];
      var xs = list;
      while (xs !== emptyList) {
        arr.push(xs.head);
        xs = xs.tail;
      }
      return arr;
    }
    return function(apply2) {
      return function(map19) {
        return function(f) {
          var buildFrom = function(x, ys) {
            return apply2(map19(consList)(f(x)))(ys);
          };
          var go2 = function(acc, currentLen, xs) {
            if (currentLen === 0) {
              return acc;
            } else {
              var last3 = xs[currentLen - 1];
              return new Cont(function() {
                var built = go2(buildFrom(last3, acc), currentLen - 1, xs);
                return built;
              });
            }
          };
          return function(array) {
            var acc = map19(finalCell)(f(array[array.length - 1]));
            var result = go2(acc, array.length - 1, array);
            while (result instanceof Cont) {
              result = result.fn();
            }
            return map19(listToArray)(result);
          };
        };
      };
    };
  }();

  // output/Data.Function.Uncurried/foreign.js
  var mkFn5 = function(fn) {
    return function(a, b, c, d, e) {
      return fn(a)(b)(c)(d)(e);
    };
  };

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
  var _codePointAt = function(fallback) {
    return function(Just2) {
      return function(Nothing2) {
        return function(unsafeCodePointAt02) {
          return function(index5) {
            return function(str) {
              var length9 = str.length;
              if (index5 < 0 || index5 >= length9)
                return Nothing2;
              if (hasStringIterator) {
                var iter = str[Symbol.iterator]();
                for (var i = index5; ; --i) {
                  var o = iter.next();
                  if (o.done)
                    return Nothing2;
                  if (i === 0)
                    return Just2(unsafeCodePointAt02(o.value));
                }
              }
              return fallback(index5)(str);
            };
          };
        };
      };
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
      if (i >= 0 && i < s.length)
        return s.charAt(i);
      throw new Error("Data.String.Unsafe.charAt: Invalid index.");
    };
  };

  // output/Data.String.CodeUnits/index.js
  var stripPrefix = function(v) {
    return function(str) {
      var v1 = splitAt2(length4(v))(str);
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
      if (state3 === 2)
        return val;
      if (state3 === 1)
        throw new ReferenceError(name15 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state3 = 1;
      val = init3();
      state3 = 2;
      return val;
    };
  };
  var fromEnum2 = /* @__PURE__ */ fromEnum(boundedEnumChar);
  var map7 = /* @__PURE__ */ map(functorMaybe);
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
    return map7(function(v) {
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
  var show1 = /* @__PURE__ */ show(showString);
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
              throw new Error("Failed pattern match at Parsing.String (line 165, column 7 - line 167, column 52): " + []);
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
  var string = function(str) {
    return consumeWith(function(input) {
      var v = stripPrefix(str)(input);
      if (v instanceof Just) {
        return new Right({
          value: str,
          consumed: str,
          remainder: v.value0
        });
      }
      ;
      return new Left("Expected " + show1(str));
    });
  };

  // output/Data.Formatter.Parser.Utils/index.js
  var show2 = /* @__PURE__ */ show(showInt);
  var lmap2 = /* @__PURE__ */ lmap(bifunctorEither);
  var applyFirst2 = /* @__PURE__ */ applyFirst(applyParserT);
  var printPosition = function(v) {
    return "(line " + (show2(v.line) + (", col " + (show2(v.column) + ")")));
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
  var show3 = /* @__PURE__ */ show(showInt);
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
        throw new Error("Failed pattern match at Data.Formatter.Number (line 100, column 5 - line 102, column 22): " + []);
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
            return "10e+" + show3(thousands * 3 | 0);
          }
          ;
          throw new Error("Failed pattern match at Data.Formatter.Number (line 107, column 7 - line 117, column 53): " + []);
        }();
        return format({
          comma: v.comma,
          before: v.before,
          after: v.after,
          abbreviations: false,
          sign: v.sign
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
  var size = function(v) {
    if (v instanceof Leaf) {
      return 0;
    }
    ;
    if (v instanceof Two) {
      return (1 + size(v.value0) | 0) + size(v.value3) | 0;
    }
    ;
    if (v instanceof Three) {
      return ((2 + size(v.value0) | 0) + size(v.value3) | 0) + size(v.value6) | 0;
    }
    ;
    throw new Error("Failed pattern match at Data.Map.Internal (line 705, column 1 - line 705, column 35): " + [v.constructor.name]);
  };
  var singleton7 = function(k) {
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
              $copy_v = new Cons(v.value0.value0, new Cons(singleton7(v.value0.value1)(v.value0.value2), new Cons(v.value0.value3, v.value1)));
              return;
            }
            ;
            if (v.value0 instanceof Three) {
              $copy_v = new Cons(v.value0.value0, new Cons(singleton7(v.value0.value1)(v.value0.value2), new Cons(v.value0.value3, new Cons(singleton7(v.value0.value4)(v.value0.value5), new Cons(v.value0.value6, v.value1)))));
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
  var lookup = function(dictOrd) {
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
    var lookup1 = lookup(dictOrd);
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
  var fromFoldable3 = function(dictOrd) {
    var insert1 = insert2(dictOrd);
    return function(dictFoldable) {
      return foldl(dictFoldable)(function(m) {
        return function(v) {
          return insert1(v.value0)(v.value1)(m);
        };
      })(empty2);
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
    var lookup1 = lookup(dictOrd);
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
  var foldr3 = /* @__PURE__ */ foldr(foldableList);
  var $$Set = function(x) {
    return x;
  };
  var toList2 = function(v) {
    return keys(v);
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
        var $133 = foldr3(f)(x);
        return function($134) {
          return $133(toList2($134));
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

  // output/Effect.Console/foreign.js
  var log2 = function(s) {
    return function() {
      console.log(s);
    };
  };

  // output/Effect.Console/index.js
  var logShow = function(dictShow) {
    var show7 = show(dictShow);
    return function(a) {
      return log2(show7(a));
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
  function clearIntervalImpl(id2) {
    return function() {
      clearInterval(id2);
    };
  }

  // output/Effect.Timer/index.js
  var setInterval2 = setIntervalImpl;
  var clearInterval2 = clearIntervalImpl;

  // output/Graphics.Canvas/foreign.js
  function getCanvasElementByIdImpl(id2, Just2, Nothing2) {
    return function() {
      var el = document.getElementById(id2);
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
  function beginPath(ctx) {
    return function() {
      ctx.beginPath();
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
  var setTextBaseline = function(ctx) {
    return function(textbaseline) {
      var toString = function(v) {
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
      return setTextBaselineImpl(ctx)(toString(textbaseline));
    };
  };
  var setTextAlign = function(ctx) {
    return function(textalign) {
      var toString = function(v) {
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
      return setTextAlignImpl(ctx)(toString(textalign));
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

  // output/Mines.Charge/index.js
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
        throw new Error("Failed pattern match at Mines.Charge (line 13, column 1 - line 16, column 102): " + [v.constructor.name, v1.constructor.name]);
      };
    }
  };
  var redCharge = function(n) {
    return new Charge(0, n, 0, 0);
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
    throw new Error("Failed pattern match at Mines.Charge (line 21, column 1 - line 21, column 41): " + [v.constructor.name]);
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
    throw new Error("Failed pattern match at Mines.Charge (line 44, column 1 - line 44, column 34): " + [v.constructor.name]);
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
    throw new Error("Failed pattern match at Mines.Charge (line 40, column 1 - line 40, column 38): " + [v.constructor.name]);
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
  var blueCharge = function(n) {
    return new Charge(0, 0, 0, n);
  };

  // output/Color/index.js
  var clamp2 = /* @__PURE__ */ clamp(ordInt);
  var max4 = /* @__PURE__ */ max(ordInt);
  var min3 = /* @__PURE__ */ min(ordInt);
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
          var minChroma = min3(min3(red)(green))(blue);
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
            throw new Error("Failed pattern match at Color (line 160, column 3 - line 162, column 64): " + []);
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
      throw new Error("Failed pattern match at Color (line 356, column 3 - line 362, column 43): " + []);
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
      throw new Error("Failed pattern match at Color (line 429, column 3 - line 431, column 46): " + []);
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
    var map19 = map(dictFunctor);
    return {
      map: function(f) {
        return function(v) {
          return function(s) {
            return map19(function(v1) {
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
    var bind6 = bind(dictMonad.Bind1());
    return {
      bind: function(v) {
        return function(f) {
          return function(s) {
            return bind6(v(s))(function(v1) {
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
    var pure7 = pure(dictMonad.Applicative0());
    return {
      pure: function(a) {
        return function(s) {
          return pure7(new Tuple(a, s));
        };
      },
      Apply0: function() {
        return applyStateT(dictMonad);
      }
    };
  };
  var monadRecStateT = function(dictMonadRec) {
    var Monad0 = dictMonadRec.Monad0();
    var bind6 = bind(Monad0.Bind1());
    var pure7 = pure(Monad0.Applicative0());
    var tailRecM3 = tailRecM(dictMonadRec);
    var monadStateT1 = monadStateT(Monad0);
    return {
      tailRecM: function(f) {
        return function(a) {
          var f$prime = function(v) {
            var v1 = f(v.value0);
            return bind6(v1(v.value1))(function(v2) {
              return pure7(function() {
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
    var pure7 = pure(dictMonad.Applicative0());
    var monadStateT1 = monadStateT(dictMonad);
    return {
      state: function(f) {
        return function($200) {
          return pure7(f($200));
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
    var ensureBetween = function(min8) {
      return function(max10) {
        return function(n) {
          var rangeSize = max10 - min8 | 0;
          var n$prime = mod3(n)(rangeSize);
          var $25 = n$prime < min8;
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
  var map8 = /* @__PURE__ */ map(functorTuple);
  var toUnfoldable4 = /* @__PURE__ */ toUnfoldable(unfoldableArray);
  var add2 = /* @__PURE__ */ add(semiringNumber);
  var mul2 = /* @__PURE__ */ mul(semiringNumber);
  var top3 = /* @__PURE__ */ top(boundedInt);
  var map12 = /* @__PURE__ */ map(functorArray);
  var comparing2 = /* @__PURE__ */ comparing(ordInt);
  var min4 = /* @__PURE__ */ min(ordNumber);
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
    var map24 = map(dictMonad.Bind1().Apply0().Functor0());
    return function(sz) {
      return function(g) {
        return function(v) {
          return map24(map8(function(v1) {
            return {
              size: v.size,
              newSeed: v1.newSeed
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
    var pure7 = pure(Monad0.Applicative0());
    var mapFlipped3 = mapFlipped(Monad0.Bind1().Apply0().Functor0());
    var tailRecM3 = tailRecM(dictMonadRec);
    return function(v) {
      return function(v1) {
        if (v <= 0) {
          return pure7(Nil.value);
        }
        ;
        var go2 = function(v2) {
          if (v2.value1 === 0) {
            return pure7(new Done(v2.value0));
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
    var map24 = map(functorGenT(dictMonadRec.Monad0().Bind1().Apply0().Functor0()));
    var listOf1 = listOf(dictMonadRec);
    return function(k) {
      return function(g) {
        return map24(toUnfoldable4)(listOf1(k)(g));
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
    var map24 = map(functorGenT(dictMonad.Bind1().Apply0().Functor0()));
    var lcgStep1 = lcgStep(dictMonad);
    var apply2 = apply(applyGenT(dictMonad));
    return function(a) {
      return function(b) {
        var numB = toNumber(b);
        var numA = toNumber(a);
        var clamp3 = function(x) {
          return numA + remainder(x)(numB - numA + 1);
        };
        var choose31BitPosNumber = map24(toNumber)(lcgStep1);
        var choose32BitPosNumber = apply2(map24(add2)(choose31BitPosNumber))(map24(mul2(2))(choose31BitPosNumber));
        return map24(function($320) {
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
    var bind6 = bind(bindGenT(Monad0));
    var vectorOf1 = vectorOf(dictMonadRec);
    var chooseInt1 = chooseInt(Monad0);
    var pure7 = pure(applicativeGenT(Monad0));
    return function(xs) {
      return bind6(vectorOf1(length(xs))(chooseInt1(0)(top3)))(function(ns) {
        return pure7(map12(snd)(sortBy(comparing2(fst))(zip(ns)(xs))));
      });
    };
  };
  var choose = function(dictMonad) {
    var map24 = map(functorGenT(dictMonad.Bind1().Apply0().Functor0()));
    var uniform1 = uniform(dictMonad);
    return function(a) {
      return function(b) {
        var unscale = function(v) {
          return v * 2;
        };
        var scale2 = function(v) {
          return v * 0.5;
        };
        var min$prime = scale2(min4(a)(b));
        var max$prime = scale2(max5(a)(b));
        return map24(function() {
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
  var show4 = /* @__PURE__ */ show(showInt);
  var bind3 = /* @__PURE__ */ bind(/* @__PURE__ */ bindGenT(monadIdentity));
  var chooseInt2 = /* @__PURE__ */ chooseInt(monadIdentity);
  var pure4 = /* @__PURE__ */ pure(/* @__PURE__ */ applicativeGenT(monadIdentity));
  var chooseFloat2 = /* @__PURE__ */ chooseFloat(/* @__PURE__ */ monadGenGenT(monadIdentity));
  var map9 = /* @__PURE__ */ map(/* @__PURE__ */ functorGenT(functorIdentity));
  var colorChargeMagnitude = function(r) {
    return function(g) {
      return function(b) {
        var rp = r - b | 0;
        var op = g - b | 0;
        var sqmag = ((rp * rp | 0) - (rp * op | 0) | 0) + (op * op | 0) | 0;
        var isq = floor2(sqrt(toNumber(sqmag)));
        var $22 = (isq * isq | 0) === sqmag;
        if ($22) {
          return show4(isq);
        }
        ;
        return "\u221A" + show4(sqmag);
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
        return toHexString(hsv(angle)(1)(0.7));
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
          return bind3(map9(sign)(chooseFloat2(-1)(1)))(function(brightnessSign) {
            return bind3(chooseFloat2(-20)(20))(function(hueFactor) {
              var c$prime = lighten(brightnessSign * brightnessFactor)(c);
              return pure4(rotateHue(hueFactor)(c$prime));
            });
          });
        });
      });
    }();
    return runOnceWithSeed(map9(toHexString)(colorGen))(mkSeed(v));
  };

  // output/Utils.IPoint/index.js
  var show5 = /* @__PURE__ */ show(showInt);
  var map10 = /* @__PURE__ */ map(functorArray);
  var compare3 = /* @__PURE__ */ compare(ordInt);
  var showIPoint = {
    show: function(v) {
      return "(" + (show5(v.x) + ("," + (show5(v.y) + ")")));
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
  var append12 = /* @__PURE__ */ append(semigroupIPoint);
  var sub2 = function(v) {
    return function(v1) {
      return mkIPoint(v.x - v1.x | 0)(v.y - v1.y | 0);
    };
  };
  var lattice = function(width8) {
    return function(height8) {
      return concatMap(function(i) {
        return map10(function(j) {
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
      return append12(p)(q);
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
  var showMine = {
    show: function(v) {
      return v.value0;
    }
  };
  var pointCharge = function(v) {
    return function(p) {
      return foldr2(function(v1) {
        return function(c) {
          var $28 = eq3(p)(v1.value0);
          if ($28) {
            return append3(c)(v1.value1);
          }
          ;
          return c;
        };
      })(NoMines.value)(v.value1);
    };
  };
  var constMooreMine = function(s) {
    return function(c) {
      return new Mine(s, [new MineValuation(mkIPoint(1)(1), c), new MineValuation(mkIPoint(1)(0), c), new MineValuation(mkIPoint(1)(-1 | 0), c), new MineValuation(mkIPoint(0)(1), c), new MineValuation(mkIPoint(0)(-1 | 0), c), new MineValuation(mkIPoint(-1 | 0)(1), c), new MineValuation(mkIPoint(-1 | 0)(0), c), new MineValuation(mkIPoint(-1 | 0)(-1 | 0), c)]);
    };
  };
  var greenMine = /* @__PURE__ */ constMooreMine("G")(/* @__PURE__ */ greenCharge(1));
  var redMine = /* @__PURE__ */ constMooreMine("R")(/* @__PURE__ */ redCharge(1));
  var blueMine = /* @__PURE__ */ constMooreMine("B")(/* @__PURE__ */ blueCharge(1));

  // output/Mines.Minefield/index.js
  var map11 = /* @__PURE__ */ map(functorArray);
  var nub3 = /* @__PURE__ */ nub(ordIPoint);
  var lookup2 = /* @__PURE__ */ lookup(ordIPoint);
  var bind4 = /* @__PURE__ */ bind(bindMaybe);
  var pure5 = /* @__PURE__ */ pure(applicativeMaybe);
  var update2 = /* @__PURE__ */ update(ordIPoint);
  var foldr4 = /* @__PURE__ */ foldr(foldableArray);
  var append4 = /* @__PURE__ */ append(semigroupMineCharge);
  var map13 = /* @__PURE__ */ map(functorMap);
  var insert3 = /* @__PURE__ */ insert2(ordIPoint);
  var elem3 = /* @__PURE__ */ elem2(eqIPoint);
  var filter5 = /* @__PURE__ */ filter4(ordIPoint);
  var sum2 = /* @__PURE__ */ sum(foldableArray)(semiringInt);
  var eq13 = /* @__PURE__ */ eq(/* @__PURE__ */ eqMaybe(eqMineCharge));
  var fromFoldable4 = /* @__PURE__ */ fromFoldable(foldableSet);
  var bind1 = /* @__PURE__ */ bind(/* @__PURE__ */ bindGenT(monadIdentity));
  var shuffle2 = /* @__PURE__ */ shuffle(monadRecIdentity);
  var eq22 = /* @__PURE__ */ eq(eqIPoint);
  var pure1 = /* @__PURE__ */ pure(/* @__PURE__ */ applicativeGenT(monadIdentity));
  var append13 = /* @__PURE__ */ append(semigroupArray);
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
        return map11(function(v1) {
          return sub2(p)(v1.value0);
        })(v.value1);
      };
      return nub3(concatMap(visibleSquares)(mines));
    };
  };
  var updateFlagCharge = function(p) {
    return function(m) {
      var v = lookup2(p)(m.map);
      if (v instanceof Nothing) {
        return m;
      }
      ;
      if (v instanceof Just) {
        var visibilities = unionVisibilities(p)(m.presentMines);
        var flagPointCharge = function(p$prime) {
          return bind4(lookup2(p$prime)(m.map))(function(clue) {
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
              throw new Error("Failed pattern match at Mines.Minefield (line 185, column 13 - line 189, column 44): " + [flag.constructor.name]);
            });
          });
        };
        var pointCharges = map11(function(p$prime) {
          return fromMaybe(NoMines.value)(flagPointCharge(p$prime));
        })(visibilities);
        return {
          map: update2(function(c) {
            return new Just({
              flagCharge: new Just(foldr4(append4)(NoMines.value)(pointCharges)),
              charge: c.charge,
              flagState: c.flagState,
              mine: c.mine,
              revealed: c.revealed
            });
          })(p)(m.map),
          gameState: m.gameState,
          bounds: m.bounds,
          maximalExtent: m.maximalExtent,
          mineDistribution: m.mineDistribution,
          presentMines: m.presentMines,
          displayMode: m.displayMode
        };
      }
      ;
      throw new Error("Failed pattern match at Mines.Minefield (line 177, column 24 - line 189, column 44): " + [v.constructor.name]);
    };
  };
  var revealAllMines = function(m) {
    var updatedMap = map13(function(c) {
      var $80 = isJust(c.mine);
      if ($80) {
        return {
          revealed: true,
          mine: c.mine,
          charge: c.charge,
          flagCharge: c.flagCharge,
          flagState: c.flagState
        };
      }
      ;
      return c;
    })(m.map);
    return {
      map: updatedMap,
      gameState: m.gameState,
      bounds: m.bounds,
      maximalExtent: m.maximalExtent,
      mineDistribution: m.mineDistribution,
      presentMines: m.presentMines,
      displayMode: m.displayMode
    };
  };
  var placeMines = function(mines) {
    return function(points) {
      var v = head(mines);
      if (v instanceof Nothing) {
        return empty2;
      }
      ;
      if (v instanceof Just) {
        var points$prime = drop(v.value0.value1)(points);
        var map$prime = placeMines(fromMaybe([])(tail(mines)))(points$prime);
        return foldr4(function(k) {
          return function(m) {
            return insert3(k)(v.value0.value0)(m);
          };
        })(map$prime)(take(v.value0.value1)(points));
      }
      ;
      throw new Error("Failed pattern match at Mines.Minefield (line 117, column 27 - line 121, column 62): " + [v.constructor.name]);
    };
  };
  var mineOf = function(v) {
    return v.value0;
  };
  var intersectVisibilities = function(p) {
    return function(mines) {
      var visibleSquares = function(v) {
        return map11(function(v1) {
          return sub2(p)(v1.value0);
        })(v.value1);
      };
      var visibilities = map11(visibleSquares)(mines);
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
        var $96 = notEq3(m.gameState)(Generated.value);
        if ($96) {
          return m;
        }
        ;
        var v = lookup2(p)(m.map);
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
              var $99 = v1.value0.value0 === (length(m.mineDistribution) - 1 | 0);
              if ($99) {
                var $100 = length(m.mineDistribution) === 1 || !qflags;
                if ($100) {
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
            throw new Error("Failed pattern match at Mines.Minefield (line 169, column 9 - line 169, column 51): " + [v1.constructor.name]);
          };
          var m$prime = {
            map: update2(function(c) {
              return new Just({
                flagState: incrementFlagState(c.flagState),
                charge: c.charge,
                flagCharge: c.flagCharge,
                mine: c.mine,
                revealed: c.revealed
              });
            })(p)(m.map),
            bounds: m.bounds,
            displayMode: m.displayMode,
            gameState: m.gameState,
            maximalExtent: m.maximalExtent,
            mineDistribution: m.mineDistribution,
            presentMines: m.presentMines
          };
          if (v.value0.revealed) {
            return m;
          }
          ;
          return foldr4(updateFlagCharge)(m$prime)(toUpdate);
        }
        ;
        throw new Error("Failed pattern match at Mines.Minefield (line 164, column 65 - line 172, column 56): " + [v.constructor.name]);
      };
    };
  };
  var revealSquare = function(p) {
    return function(m) {
      var $106 = notEq3(m.gameState)(Generated.value);
      if ($106) {
        return m;
      }
      ;
      var v = lookup2(p)(m.map);
      if (v instanceof Nothing) {
        return m;
      }
      ;
      if (v instanceof Just) {
        var $108 = v.value0.revealed || isJust(v.value0.flagState);
        if ($108) {
          return m;
        }
        ;
        if (v.value0.mine instanceof Just) {
          return revealAllMines({
            map: m.map,
            gameState: Dead.value,
            bounds: m.bounds,
            maximalExtent: m.maximalExtent,
            mineDistribution: m.mineDistribution,
            presentMines: m.presentMines,
            displayMode: m.displayMode
          });
        }
        ;
        if (v.value0.mine instanceof Nothing) {
          var m$prime = {
            map: update2(function(c) {
              return new Just({
                revealed: true,
                charge: c.charge,
                flagCharge: c.flagCharge,
                flagState: c.flagState,
                mine: c.mine
              });
            })(p)(m.map),
            bounds: m.bounds,
            displayMode: m.displayMode,
            gameState: m.gameState,
            maximalExtent: m.maximalExtent,
            mineDistribution: m.mineDistribution,
            presentMines: m.presentMines
          };
          if (v.value0.charge instanceof Nothing) {
            return m$prime;
          }
          ;
          if (v.value0.charge instanceof Just && v.value0.charge.value0 instanceof Charge) {
            return m$prime;
          }
          ;
          if (v.value0.charge instanceof Just && v.value0.charge.value0 instanceof NoMines) {
            return foldr4(revealSquare)(m$prime)(intersectVisibilities(p)(m.presentMines));
          }
          ;
          throw new Error("Failed pattern match at Mines.Minefield (line 148, column 92 - line 153, column 93): " + [v.value0.charge.constructor.name]);
        }
        ;
        throw new Error("Failed pattern match at Mines.Minefield (line 146, column 74 - line 153, column 93): " + [v.value0.mine.constructor.name]);
      }
      ;
      throw new Error("Failed pattern match at Mines.Minefield (line 144, column 60 - line 153, column 93): " + [v.constructor.name]);
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
  var eq32 = /* @__PURE__ */ eq(/* @__PURE__ */ eqMaybe(eqFlag));
  var getFlagCount = function(m) {
    return function(fc) {
      if (fc instanceof Flag) {
        return bind4(index(m.mineDistribution)(fc.value0))(function(v) {
          var current = size(filter5(function(c) {
            return eq32(c.flagState)(new Just(fc));
          })(m.map));
          return pure5({
            mine: v.value0.value0,
            current,
            total: v.value1
          });
        });
      }
      ;
      if (fc instanceof UnknownMine) {
        return pure5({
          mine: "?",
          current: size(filter5(function(c) {
            return eq32(c.flagState)(new Just(fc));
          })(m.map)),
          total: 0
        });
      }
      ;
      throw new Error("Failed pattern match at Mines.Minefield (line 204, column 21 - line 217, column 10): " + [fc.constructor.name]);
    };
  };
  var defaultClue = /* @__PURE__ */ function() {
    return {
      revealed: false,
      flagState: Nothing.value,
      mine: Nothing.value,
      charge: Nothing.value,
      flagCharge: Nothing.value
    };
  }();
  var countRevealedSquares = function(m) {
    return size(filter5(function(c) {
      return c.revealed && isNothing(c.mine);
    })(m.map));
  };
  var countOf = function(v) {
    return v.value1;
  };
  var countSafeSquares = function(m) {
    return size(m.map) - sum2(map11(countOf)(m.mineDistribution)) | 0;
  };
  var setWinningBoard = function(m) {
    var $133 = countSafeSquares(m) === countRevealedSquares(m);
    if ($133) {
      return {
        map: m.map,
        gameState: Won.value,
        bounds: m.bounds,
        maximalExtent: m.maximalExtent,
        mineDistribution: m.mineDistribution,
        presentMines: m.presentMines,
        displayMode: m.displayMode
      };
    }
    ;
    return m;
  };
  var chordSquare = function(p) {
    return function(m) {
      var $134 = notEq3(m.gameState)(Generated.value);
      if ($134) {
        return m;
      }
      ;
      var v = lookup2(p)(m.map);
      if (v instanceof Nothing) {
        return m;
      }
      ;
      if (v instanceof Just) {
        var $136 = eq13(v.value0.flagCharge)(v.value0.charge);
        if ($136) {
          return foldr4(revealSquare)(m)(unionVisibilities(p)(m.presentMines));
        }
        ;
        return m;
      }
      ;
      throw new Error("Failed pattern match at Mines.Minefield (line 192, column 59 - line 195, column 73): " + [v.constructor.name]);
    };
  };
  var chargeSingleMine = function(mines) {
    return function(p) {
      return function(charges) {
        var v = lookup2(p)(mines);
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
          return foldr4(function(v1) {
            return function(charges$prime) {
              return addCharge(charges$prime)(v1.value0)(v1.value1);
            };
          })(charges)(v.value0.value1);
        }
        ;
        throw new Error("Failed pattern match at Mines.Minefield (line 125, column 36 - line 128, column 122): " + [v.constructor.name]);
      };
    };
  };
  var minefieldGenerator = function(blank) {
    return function(initial) {
      var squares = fromFoldable4(keys2(blank.map));
      return bind1(shuffle2(squares))(function(pairs) {
        var safeSquares = unionVisibilities(initial)(blank.presentMines);
        var unsafePairs = filter(function(p) {
          return !(eq22(p)(initial) || elem3(p)(safeSquares));
        })(pairs);
        var mineMap = placeMines(blank.mineDistribution)(unsafePairs);
        var emptyCharges = foldr4(function(k) {
          return function(m) {
            return insert3(k)(NoMines.value)(m);
          };
        })(empty2)(pairs);
        var chargeMap = foldr4(chargeSingleMine(mineMap))(emptyCharges)(squares);
        var filledGrid = foldr4(function(p) {
          return function(m) {
            return insert3(p)({
              revealed: false,
              flagState: Nothing.value,
              flagCharge: Nothing.value,
              mine: lookup2(p)(mineMap),
              charge: lookup2(p)(chargeMap)
            })(m);
          };
        })(empty2)(squares);
        var m$prime = {
          map: filledGrid,
          gameState: Generated.value,
          bounds: blank.bounds,
          displayMode: blank.displayMode,
          maximalExtent: blank.maximalExtent,
          mineDistribution: blank.mineDistribution,
          presentMines: blank.presentMines
        };
        return pure1(foldr4(revealSquare)(m$prime)(append13(safeSquares)([initial])));
      });
    };
  };
  var blankMinefield = function(width8) {
    return function(height8) {
      return function(mineDistribution) {
        var mines = map11(mineOf)(mineDistribution);
        var grid = foldr4(function(k) {
          return function(m) {
            return insert3(k)(defaultClue)(m);
          };
        })(empty2)(lattice(width8)(height8));
        var maxX = 1 + fromMaybe(0)(maximum2(map11(function(v) {
          return v.x;
        })(fromFoldable4(keys2(grid))))) | 0;
        var maxY = 1 + fromMaybe(0)(maximum2(map11(function(v) {
          return v.y;
        })(fromFoldable4(keys2(grid))))) | 0;
        var displayMode = function() {
          var $147 = any(usesColor)(mines);
          if ($147) {
            var $148 = any(usesClassical)(mines);
            if ($148) {
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
          presentMines: map11(mineOf)(mineDistribution),
          displayMode
        };
      };
    };
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
  function _getElementById(id2) {
    return function(node) {
      return function() {
        return node.getElementById(id2);
      };
    };
  }

  // output/Web.DOM.NonElementParentNode/index.js
  var map14 = /* @__PURE__ */ map(functorEffect);
  var getElementById = function(eid) {
    var $2 = map14(toMaybe);
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

  // output/Web.HTML.Window/foreign.js
  function document2(window2) {
    return function() {
      return window2.document;
    };
  }

  // output/Mines.Settings/index.js
  var map15 = /* @__PURE__ */ map(functorEffect);
  var bindFlipped3 = /* @__PURE__ */ bindFlipped(bindEffect);
  var getCheckboxValue = function(s) {
    return function __do3() {
      var npn = map15(function($14) {
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
  function removeChild(node) {
    return function(parent2) {
      return function() {
        parent2.removeChild(node);
      };
    };
  }

  // output/Web.DOM.Node/index.js
  var map16 = /* @__PURE__ */ map(functorEffect);
  var firstChild = /* @__PURE__ */ function() {
    var $25 = map16(toMaybe);
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
  function addEventListener(type) {
    return function(listener) {
      return function(useCapture) {
        return function(target5) {
          return function() {
            return target5.addEventListener(type, listener, useCapture);
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
  var show6 = /* @__PURE__ */ show(showInt);
  var bind5 = /* @__PURE__ */ bind(bindEffect);
  var diff2 = /* @__PURE__ */ diff(durationMilliseconds);
  var fromDuration2 = /* @__PURE__ */ fromDuration(durationMilliseconds);
  var mod4 = /* @__PURE__ */ mod(euclideanRingInt);
  var div2 = /* @__PURE__ */ div(euclideanRingInt);
  var map17 = /* @__PURE__ */ map(functorEffect);
  var bindFlipped4 = /* @__PURE__ */ bindFlipped(bindEffect);
  var pure6 = /* @__PURE__ */ pure(applicativeEffect);
  var min7 = /* @__PURE__ */ min(ordNumber);
  var append14 = /* @__PURE__ */ append(semigroupMineCharge);
  var bind12 = /* @__PURE__ */ bind(bindMaybe);
  var show12 = /* @__PURE__ */ show(showMine);
  var lookup3 = /* @__PURE__ */ lookup(ordIPoint);
  var eq4 = /* @__PURE__ */ eq(eqGameState);
  var $$void3 = /* @__PURE__ */ $$void(functorEffect);
  var fromFoldable5 = /* @__PURE__ */ fromFoldable(foldableSet);
  var sequence2 = /* @__PURE__ */ sequence(traversableArray)(applicativeEffect);
  var map18 = /* @__PURE__ */ map(functorArray);
  var map23 = /* @__PURE__ */ map(functorMap);
  var notEq1 = /* @__PURE__ */ notEq(/* @__PURE__ */ eqMaybe(eqFlag));
  var logShow2 = /* @__PURE__ */ logShow(showString);
  var show22 = /* @__PURE__ */ show(showNumber);
  var logShow1 = /* @__PURE__ */ logShow(showIPoint);
  var member2 = /* @__PURE__ */ member(ordIPoint);
  var notEq22 = /* @__PURE__ */ notEq(eqGameState);
  var makeFractionalString = function(a) {
    return function(b) {
      return show6(a) + ("/" + show6(b));
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
            var minutesString = show6(floor2(minutes));
            var npn = map17(function($149) {
              return toNonElementParentNode(toDocument($149));
            })(bindFlipped4(document2)(windowImpl))();
            var v4 = getElementById("timer")(npn)();
            if (v4 instanceof Just) {
              setTextContent(minutesString + (":" + (v3.value0 + ("." + v2.value0))))(toNode3(v4.value0))();
              return unit;
            }
            ;
            throw new Error("Failed pattern match at Mines (line 294, column 5 - line 294, column 44): " + [v4.constructor.name]);
          }
          ;
          throw new Error("Failed pattern match at Mines (line 289, column 9 - line 289, column 58): " + [v3.constructor.name]);
        }
        ;
        throw new Error("Failed pattern match at Mines (line 288, column 9 - line 288, column 56): " + [v2.constructor.name]);
      };
    };
  };
  var getSquareSize = function(s) {
    return function(m) {
      return function __do3() {
        var dims = getCanvasDimensions(s.mfCanvas)();
        var canvasLength = min7(dims.width)(dims.height);
        return canvasLength / toNumber(m.maximalExtent);
      };
    };
  };
  var getDisplayCharge = function(v) {
    return function(v1) {
      if (v1) {
        return append14(fromMaybe(NoMines.value)(v.charge))(negateCharge(fromMaybe(NoMines.value)(v.flagCharge)));
      }
      ;
      if (!v1) {
        return fromMaybe(NoMines.value)(v.charge);
      }
      ;
      throw new Error("Failed pattern match at Mines (line 145, column 1 - line 145, column 50): " + [v.constructor.name, v1.constructor.name]);
    };
  };
  var drawFlag = function(s) {
    return function(x) {
      return function(y) {
        return function(squareSize) {
          return function(clue) {
            return function(mineDistribution) {
              var flagText = function() {
                if (clue.flagState instanceof Nothing) {
                  return "";
                }
                ;
                if (clue.flagState instanceof Just && clue.flagState.value0 instanceof Flag) {
                  return fromMaybe("x")(bind12(index(mineDistribution)(clue.flagState.value0.value0))(function($150) {
                    return Just.create(show12(mineOf($150)));
                  }));
                }
                ;
                if (clue.flagState instanceof Just && clue.flagState.value0 instanceof UnknownMine) {
                  return "?";
                }
                ;
                throw new Error("Failed pattern match at Mines (line 175, column 20 - line 178, column 38): " + [clue.flagState.constructor.name]);
              }();
              var halfSize = squareSize / 2;
              return function __do3() {
                setFillStyle(s.mfCtx)("#600")();
                setTextAlign(s.mfCtx)(AlignCenter.value)();
                setFont(s.mfCtx)("30px gothica")();
                return fillText(s.mfCtx)(flagText)(x + halfSize)(y + halfSize)();
              };
            };
          };
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
                return pure6(unit);
              }
              ;
              if (clue.mine instanceof Nothing) {
                var v = getDisplayCharge(clue)(s.autoDecrement);
                if (v instanceof NoMines) {
                  return pure6(unit);
                }
                ;
                if (v instanceof Charge) {
                  var halfSize = squareSize / 2;
                  return function __do3() {
                    setTextAlign(s.mfCtx)(AlignCenter.value)();
                    setTextBaseline(s.mfCtx)(BaselineMiddle.value)();
                    setFont(s.mfCtx)(show6(floor2(halfSize)) + "px gothica")();
                    if (dm instanceof ClassicalOnly) {
                      setFillStyle(s.mfCtx)(classicalColor(v.value0))();
                      return fillText(s.mfCtx)(show6(v.value0))(x + halfSize)(y + halfSize)();
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
                      return unit;
                    }
                    ;
                    throw new Error("Failed pattern match at Mines (line 160, column 13 - line 169, column 44): " + [dm.constructor.name]);
                  };
                }
                ;
                throw new Error("Failed pattern match at Mines (line 151, column 16 - line 169, column 44): " + [v.constructor.name]);
              }
              ;
              throw new Error("Failed pattern match at Mines (line 149, column 39 - line 169, column 44): " + [clue.mine.constructor.name]);
            };
          };
        };
      };
    };
  };
  var drawBackground = function(s) {
    return function(x) {
      return function(y) {
        return function(squareSize) {
          return function(clue) {
            var color = function() {
              if (clue.mine instanceof Nothing) {
                return "#FFF";
              }
              ;
              if (clue.mine instanceof Just) {
                return "#F88";
              }
              ;
              throw new Error("Failed pattern match at Mines (line 132, column 17 - line 134, column 31): " + [clue.mine.constructor.name]);
            }();
            return function __do3() {
              setFillStyle(s.mfCtx)(color)();
              return fillPath(s.mfCtx)(rect(s.mfCtx)({
                x,
                y,
                width: squareSize,
                height: squareSize
              }))();
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
          var v1 = lookup3(v)(m.map);
          if (v1 instanceof Nothing) {
            return pure6(unit);
          }
          ;
          if (v1 instanceof Just) {
            var x = toNumber(v.x) * squareSize;
            var y = toNumber(v.y) * squareSize;
            return function __do3() {
              (function() {
                if (v1.value0.revealed) {
                  drawBackground(s)(x)(y)(squareSize)(v1.value0)();
                  return drawCharge(s)(x)(y)(squareSize)(v1.value0)(m.displayMode)();
                }
                ;
                var color = function() {
                  var $105 = eq4(m.gameState)(Won.value);
                  if ($105) {
                    return "#0c7";
                  }
                  ;
                  return "#999";
                }();
                setFillStyle(s.mfCtx)(color)();
                return fillPath(s.mfCtx)(rect(s.mfCtx)({
                  x,
                  y,
                  width: squareSize,
                  height: squareSize
                }))();
              })();
              return drawFlag(s)(x)(y)(squareSize)(v1.value0)(m.mineDistribution)();
            };
          }
          ;
          throw new Error("Failed pattern match at Mines (line 107, column 43 - line 125, column 58): " + [v1.constructor.name]);
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
        var points = fromFoldable5(keys2(m.map));
        var squareSize = getSquareSize(s)(m)();
        return sequence2(map18(drawSquare(s)(m)(squareSize))(points))();
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
        throw new Error("Failed pattern match at Mines (line 190, column 17 - line 194, column 26): " + [m.gameState.constructor.name]);
      }();
      var npn = map17(function($151) {
        return toNonElementParentNode(toDocument($151));
      })(bindFlipped4(document2)(windowImpl))();
      var v = getElementById("timer")(npn)();
      if (v instanceof Just) {
        return setAttribute("style")("font-family: gothica; color: " + color)(v.value0)();
      }
      ;
      throw new Error("Failed pattern match at Mines (line 197, column 5 - line 197, column 44): " + [v.constructor.name]);
    };
  };
  var addCellWithText = function(tr) {
    return function(s) {
      return $$void3(function __do3() {
        var v = map17(fromHTMLElement)(insertCell(tr))();
        if (v instanceof Just) {
          return setTextContent(s)(toNode(v.value0))();
        }
        ;
        throw new Error("Failed pattern match at Mines (line 308, column 5 - line 308, column 60): " + [v.constructor.name]);
      });
    };
  };
  var makeFlagTableRow = function(v) {
    return function(v1) {
      if (v1 instanceof Nothing) {
        return pure6(unit);
      }
      ;
      if (v1 instanceof Just) {
        return $$void3(function __do3() {
          var v2 = map17(fromHTMLElement2)(insertRow(v))();
          if (v2 instanceof Just) {
            addCellWithText(v2.value0)(v1.value0.mine)();
            return addCellWithText(v2.value0)(makeFractionalString(v1.value0.current)(v1.value0.total))();
          }
          ;
          throw new Error("Failed pattern match at Mines (line 314, column 5 - line 314, column 53): " + [v2.constructor.name]);
        });
      }
      ;
      throw new Error("Failed pattern match at Mines (line 311, column 1 - line 311, column 73): " + [v.constructor.name, v1.constructor.name]);
    };
  };
  var renderTable = function(sr) {
    return function(mr) {
      return $$void3(function __do3() {
        var d = map17(toDocument)(bindFlipped4(document2)(windowImpl))();
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
              throw new Error("Failed pattern match at Mines (line 328, column 3 - line 330, column 55): " + [tbody$prime.constructor.name]);
            })();
            var m = read(mr)();
            var s = read(sr)();
            var totalCount = countSafeSquares(m);
            var revealedCount = countRevealedSquares(m);
            var v2 = map17(fromHTMLElement2)(insertRow(v1.value0))();
            if (v2 instanceof Just) {
              addCellWithText(v2.value0)("\u25A3")();
              addCellWithText(v2.value0)(makeFractionalString(revealedCount)(totalCount))();
              var flagArray = map18(Flag.create)(range(0)(length(m.presentMines) - 1 | 0));
              $$void3(sequence2(map18(function(k) {
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
            throw new Error("Failed pattern match at Mines (line 339, column 3 - line 339, column 63): " + [v2.constructor.name]);
          }
          ;
          throw new Error("Failed pattern match at Mines (line 324, column 7 - line 324, column 42): " + [v1.constructor.name]);
        }
        ;
        throw new Error("Failed pattern match at Mines (line 323, column 3 - line 323, column 50): " + [v.constructor.name]);
      });
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
  var autoDecHandler = /* @__PURE__ */ onCheckboxClick("autodecrement")(function(a) {
    return function(s) {
      return {
        autoDecrement: a,
        allowQuestionFlags: s.allowQuestionFlags,
        mfCanvas: s.mfCanvas,
        mfCtx: s.mfCtx,
        timerId: s.timerId
      };
    };
  })(function(v) {
    return function(m) {
      return m;
    };
  });
  var questionFlagHandler = /* @__PURE__ */ function() {
    var g = function(v) {
      return function(v1) {
        if (v) {
          return v1;
        }
        ;
        if (!v) {
          return {
            map: map23(function(c) {
              return {
                flagState: function() {
                  var $128 = notEq1(c.flagState)(new Just(UnknownMine.value));
                  if ($128) {
                    return c.flagState;
                  }
                  ;
                  return Nothing.value;
                }(),
                charge: c.charge,
                flagCharge: c.flagCharge,
                mine: c.mine,
                revealed: c.revealed
              };
            })(v1.map),
            bounds: v1.bounds,
            displayMode: v1.displayMode,
            gameState: v1.gameState,
            maximalExtent: v1.maximalExtent,
            mineDistribution: v1.mineDistribution,
            presentMines: v1.presentMines
          };
        }
        ;
        throw new Error("Failed pattern match at Mines (line 274, column 5 - line 274, column 17): " + [v.constructor.name, v1.constructor.name]);
      };
    };
    return onCheckboxClick("questionflags")(function(a) {
      return function(s) {
        return {
          autoDecrement: s.autoDecrement,
          allowQuestionFlags: a,
          mfCanvas: s.mfCanvas,
          mfCtx: s.mfCtx,
          timerId: s.timerId
        };
      };
    })(g);
  }();
  var onMinefieldClick = function(sr) {
    return function(mr) {
      return function(e) {
        return $$void3(function __do3() {
          var npn = map17(function($152) {
            return toNonElementParentNode(toDocument($152));
          })(bindFlipped4(document2)(windowImpl))();
          var v = getElementById("minefield")(npn)();
          if (v instanceof Just) {
            var cbr = getBoundingClientRect(v.value0)();
            var v1 = fromEvent(e);
            if (v1 instanceof Just) {
              var x = toNumber(clientX(v1.value0)) - cbr.left;
              var y = toNumber(clientY(v1.value0)) - cbr.top;
              logShow2(show22(x) + (" " + show22(y)))();
              var m = read(mr)();
              var s = read(sr)();
              var squareSize = getSquareSize(s)(m)();
              var mx = floor2(x / squareSize);
              var my = floor2(y / squareSize);
              var minefieldCoords = mkIPoint(mx)(my);
              logShow1(minefieldCoords)();
              var pressedButtons = button(v1.value0);
              (function() {
                var $131 = !member2(minefieldCoords)(m.map);
                if ($131) {
                  return unit;
                }
                ;
                if (m.gameState instanceof Ungenerated) {
                  var $133 = pressedButtons !== 0;
                  if ($133) {
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
                      timerId: new Just(iid),
                      allowQuestionFlags: st.allowQuestionFlags,
                      autoDecrement: st.autoDecrement,
                      mfCanvas: st.mfCanvas,
                      mfCtx: st.mfCtx
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
                      var v2 = lookup3(p)(m.map);
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
                      throw new Error("Failed pattern match at Mines (line 244, column 34 - line 246, column 91): " + [v2.constructor.name]);
                    };
                    return $$void3(modify(handleReveal(minefieldCoords))(mr))();
                  }
                  ;
                  throw new Error("Failed pattern match at Mines (line 241, column 22 - line 246, column 91): " + [pressedButtons.constructor.name]);
                }
                ;
                return unit;
              })();
              var m$prime = modify(setWinningBoard)(mr)();
              (function() {
                var $138 = notEq22(m$prime.gameState)(Generated.value) && eq4(m.gameState)(Generated.value);
                if ($138) {
                  if (s.timerId instanceof Nothing) {
                    return unit;
                  }
                  ;
                  if (s.timerId instanceof Just) {
                    return clearInterval2(s.timerId.value0)();
                  }
                  ;
                  throw new Error("Failed pattern match at Mines (line 254, column 9 - line 256, column 44): " + [s.timerId.constructor.name]);
                }
                ;
                return unit;
              })();
              return draw(sr)(mr)();
            }
            ;
            throw new Error("Failed pattern match at Mines (line 212, column 9 - line 212, column 32): " + [v1.constructor.name]);
          }
          ;
          throw new Error("Failed pattern match at Mines (line 209, column 5 - line 209, column 48): " + [v.constructor.name]);
        });
      };
    };
  };
  var setupEvents = function(settingsRef) {
    return function(minefieldRef) {
      return $$void3(function __do3() {
        var npn = map17(function($153) {
          return toNonElementParentNode(toDocument($153));
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
              return addEventListener("click")(qfEvent)(true)(toEventTarget(v2.value0))();
            }
            ;
            throw new Error("Failed pattern match at Mines (line 67, column 3 - line 67, column 52): " + [v2.constructor.name]);
          }
          ;
          throw new Error("Failed pattern match at Mines (line 63, column 3 - line 63, column 57): " + [v1.constructor.name]);
        }
        ;
        throw new Error("Failed pattern match at Mines (line 59, column 3 - line 59, column 55): " + [v.constructor.name]);
      });
    };
  };
  var main = function __do2() {
    var minefieldRef = $$new(blankMinefield(15)(15)([new MineCount(redMine, 15), new MineCount(greenMine, 15), new MineCount(blueMine, 15)]))();
    var settingsRef = bind5(defaultSettings)($$new)();
    draw(settingsRef)(minefieldRef)();
    return setupEvents(settingsRef)(minefieldRef)();
  };

  // <stdin>
  main();
})();
