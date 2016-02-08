(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Ship = Asteroids.Ship = function (attrs) {
    this.pos = attrs.pos;
    this.vel = [0, 0];
    this.radius = 20;
    this.color = "#a1e5dd";
    this.game = attrs.game;
  };

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.prototype.relocate = function () {
    this.pos = this.game.randPosition();
    this.vel = [0, 0];
  };


  })();
