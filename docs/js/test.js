(() => {
  // output/Data.Show/foreign.js
  var showIntImpl = function(n) {
    return n.toString();
  };

  // output/Data.Show/index.js
  var showInt = {
    show: showIntImpl
  };
  var show = function(dict) {
    return dict.show;
  };

  // output/Effect.Console/foreign.js
  var log = function(s) {
    return function() {
      console.log(s);
    };
  };

  // output/TestLib/index.js
  var plusone = function(c) {
    return c + 4 | 0;
  };

  // output/TestPurescript/index.js
  var main = /* @__PURE__ */ function() {
    return log("\u{1F35D}" + show(showInt)(plusone(0)));
  }();

  // <stdin>
  main();
})();
