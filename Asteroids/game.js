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

  var Game = Asteroids.Game = function () {
    this.dim_x = DIM_X;
    this.dim_y = DIM_Y;
    this.ship = new Asteroids.Ship ({pos: [DIM_X / 2, DIM_Y / 2], game: this});
    this.bullets = [];
    this.level = 1;
    this.lives = 3;
    this.gameOver = false;
    this.score = 0;

    this.asteroids = [];
    for (var i = 0; i < NUM_ASTEROIDS; i++) {
      this.asteroids.push(this.addAsteroids());
    }
  };

  Asteroids.Game.prototype.randPosition = function () {
    var xPos = Math.random() * DIM_X;
    var yPos = Math.random() * DIM_Y;
    return [xPos, yPos];
  };

  Asteroids.Game.prototype.addAsteroids = function () {

    return new Asteroids.Asteroid({pos: this.randPosition(), game: this});
  };

  Game.prototype.allObjects = function () {
    return this.asteroids.concat(this.ship, this.bullets);
  };

  Game.prototype.draw = function (ctx) {
    //this will empty the canvas
    ctx.clearRect(0, 0, DIM_X, DIM_Y);

    this.allObjects().forEach(function (object) {
      object.draw(ctx);
    });
  };

  Game.prototype.moveObjects = function (delta) {
    this.allObjects().forEach(function (object) {
      object.move(delta);
    });

  };

  Game.prototype.wrap = function (pos) {
    var origX = pos[0];
    var origY = pos[1];

    while (origX > DIM_X) { origX -= DIM_X; }
    while (origX < 0) { origX += DIM_X; }
    while (origY > DIM_Y) { origY -= DIM_Y; }
    while (origY < 0) { origY += DIM_Y; }


    return [origX, origY];
  };

  Game.prototype.checkCollisions = function () {

    for (var i = 0; i < this.allObjects().length - 1; i++) {
      for (var j = i + 1; j < this.allObjects().length; j++) {
        var firstObject = this.allObjects()[i];
        var secondObject = this.allObjects()[j];
        if (firstObject.isCollidedWith(secondObject)) {
          firstObject.collideWith(secondObject);
        }
      }
    }
  };

  Game.prototype.isOutOfBounds = function (pos) {
    return (pos[0] < 0) || (pos[1] < 0) ||
      (pos[0] > DIM_X) || (pos[1] > DIM_Y);
  };

  Game.prototype.add = function (object) {

    if (object instanceof Asteroids.Asteroid) {
      this.asteroids.push(object);
    } else if (object instanceof Asteroids.Bullet) {
      this.bullets.push(object);
    } else if (object instanceof Asteroids.Ship) {
      this.ships.push(object);
    }


  };

  Game.prototype.step = function () {
    this.moveObjects();
    this.checkCollisions();
  };

  Game.prototype.remove = function (object) {
    var i;
    if (object.asteroid) {
      i = this.asteroids.indexOf(object);
      if (i !== -1) {
        this.asteroids.splice(i, 1);
        this.score += 100;
      }
    }
    if (object.bullet) {
      i = this.bullets.indexOf(object);
      if (i !== -1) {
        this.bullets.splice(i, 1);
      }
    }

    if (object === this.ship) {
      this.lives -= 1;
    }
  };


  Game.prototype.draw = function (ctx) {
    ctx.save();
    ctx.clearRect(0,0, ctx.canvas.width,ctx.canvas.height);
      ctx.fillStyle = "#fff";
      ctx.font="20px Arial";
      ctx.fillText("Level: " + this.level,(ctx.canvas.width / 2) - 50,20);
      ctx.fillText("Asteroids remaining: " + this.asteroids.length,30,20);
      ctx.fillText("Score: " + this.score,ctx.canvas.width - 200,20);
      ctx.fillText("Lives:  " + this.lives, ctx.canvas.width - 200,50);
    ctx.restore();
    this.allObjects().forEach(function(obj){
      obj.draw(ctx);
    });
  };


})();
