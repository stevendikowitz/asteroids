// asteroid
(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Asteroid = Asteroids.Asteroid = function (attr) {
    this.pos = attr.pos;
    this.vel = Asteroids.Util.randomVec(1);
    this.radius = 30;
    this.color = "#808080";
  };

  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);


})();
