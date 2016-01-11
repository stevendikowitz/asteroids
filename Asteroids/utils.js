// Utility code, vector math
(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Util = window.Asteroids.Util = {};

  Util.inherits = function (childClass, parentClass) {
    var Surrogate = function () {};

    Surrogate.prototype = parentClass.prototype;
    childClass.prototype = new Surrogate();
    childClass.prototype.constructor = childClass;
  };

})();
