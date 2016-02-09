// Base class for anything that moves
(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var MovingObject = Asteroids.MovingObject = function (attrs) {
    this.pos = attrs.pos; //Expect pos to be array of 2 elements
    this.vel = attrs.vel;
    this.radius = attrs.radius;
    this.color = attrs.color;
    this.game = attrs.game;
  };

  MovingObject.prototype.draw = function (ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();

    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      2 * Math.PI,
      false
    );

    ctx.fill();
  };

  MovingObject.prototype.isWrappable = true;

  MovingObject.prototype.move = function () {
    var origX = this.pos[0];
    var origY = this.pos[1];

    var dx = this.vel[0];
    var dy = this.vel[1];

    var posX = origX + dx;
    var posY = origY + dy;

    this.pos = [posX, posY];
    if (this.game.isOutOfBounds(this.pos)) {
      if (!this.isWrappable) {
        return this.game.remove(this);
      }
    }

    this.pos = this.game.wrap(this.pos);
  };

  MovingObject.prototype.isCollidedWith = function (otherObject) {
    var distObjs = Asteroids.Util.dist(this.pos, otherObject.pos);

    return distObjs < (this.radius + otherObject.radius);
  };

  MovingObject.prototype.collideWith = function (otherObject) {
    this.game.remove(this);
    this.game.remove(otherObject);
    var idxOther = this.game.bullets.indexOf(otherObject);
    var idxThis = this.game.bullets.indexOf(this);
    if (this === this.game.ship && idxOther === -1 || otherObject === this.game.ship && idxThis === -1 ) {
      return this.game.ship.relocate();
    }

  };



})();
