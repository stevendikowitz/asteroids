// Utility code, vector math
(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Util = Asteroids.Util = {};

  Util.inherits = function (childClass, parentClass) {
    var Surrogate = function () {};

    Surrogate.prototype = parentClass.prototype;
    childClass.prototype = new Surrogate();
    childClass.prototype.constructor = childClass;
  };

  Util.randomVec = function (length) {
    var randX = (Math.random() * 2) - 1;
    var randY = (Math.random() * 2) - 1;

    return [(randX * length), (randY * length)];
  };

  Util.dist = function (objOnePos, objTwoPos) {
    var diffX = objOnePos[0] - objTwoPos[0];
    var diffY = objOnePos[1] - objTwoPos[1];

    return Math.sqrt((diffX * diffX) + (diffY * diffY));
  };
})();
