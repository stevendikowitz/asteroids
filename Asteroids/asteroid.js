// asteroid
(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Asteroid = Asteroids.Asteroid = function (attr) {
    this.pos = attr.pos;
    this.vel = Asteroids.Util.randomVec(2);
    this.radius = 30;
    this.color = "#808080";
    this.game = attr.game;
    this.asteroid = true;
  };

  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);


})();
