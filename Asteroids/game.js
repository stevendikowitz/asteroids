/* Game (lib/game.js)
Holds collections of the asteroids, bullets, and your ship.
#step method calls #move on all the objects, and #checkCollisions checks for colliding objects.
#draw(ctx) draws the game.
Keeps track of dimensions of the space; wraps objects around when they drift off the screen.
*/

(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var DIM_X = 800;
  var DIM_Y = 600;
  var NUM_ASTEROIDS = 4;


  Asteroids.Game.prototype.randPosition = function () {
    var xPos = Math.random() * DIM_X;
    var yPos = Math.random() * DIM_Y;
    return [xPos, yPos];
  };

  Asteroids.Game.prototype.addAsteroids = function () {
    // var Asteroid = Asteroids.Asteroid = function (attr) {
    //   this.pos = attr.pos;
    //   this.vel = Asteroids.Util.randomVec(1);
    //   this.radius = 30;
    //   this.color = "#808080";
    // };
    var newAsteroid = new Asteroid({pos: randPosition()});
  };

  var Game = Asteroids.Game = function () {
    this.asteroids = [];
    for (var i = 0; i < NUM_ASTEROIDS; i++) {
      asteroids.push(addAsteroids);
    }
  };

  Game.prototype.draw = function (ctx) {
    //this will empty the canvas
    ctx.clearRect(0, 0, DIM_X, DIM_Y);

    this.asteroids.forEach(function (asteroid) {
      asteroid.draw(ctx);
    });
  };

  Game.prototype.moveObjects = function () {
    this.asteroids.forEach(function(asteroid) {
      asteroid.move();
    });

  };
})();
