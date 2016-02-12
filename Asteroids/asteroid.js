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

  Asteroid.sprite = new Image();

  Asteroid.prototype.draw = function(ctx){
    ctx.save();
      ctx.translate(this.pos[0], this.pos[1]);
      ctx.rotate((this.angle + 90) * Math.PI/180);
      Asteroid.sprite.src = './assets/deathstar.png';

    // ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
      if (this.radius === 30){
        ctx.drawImage(Asteroid.sprite, 0, 0, 60, 60);
      }

    ctx.restore();

  };


})();
