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
    this.lastFire = Date.now();
    this.angle = -90;
  };

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.prototype.relocate = function () {
    this.pos = this.game.randPosition();
    this.vel = [0, 0];
  };

  Ship.prototype.power = function (impulse) {
      this.vel[0] += impulse[0];
      this.vel[1] += impulse[1];
  };


    Ship.prototype.fireBullet = function () {
      var norm = Asteroids.Util.norm(this.vel);

      if (norm === 0) {
        // Can't fire unless moving.
        return;
      }

      var relVel = Asteroids.Util.scale(
        Asteroids.Util.dir(this.vel),
        Asteroids.Bullet.SPEED
      );

      var bulletVel = [
        relVel[0] + this.vel[0], relVel[1] + this.vel[1]
      ];

      var bullet = new Asteroids.Bullet({
        pos: this.pos,
        vel: bulletVel,
        color: this.color,
        game: this.game
      });

      if (Date.now() - this.lastFire > 500 || this.game.bullets.length === 1 ) {
        this.game.add(bullet);
        this.lastFire = Date.now();
      }

    };

    Ship.sprite = new Image();


    Ship.prototype.draw = function(ctx){


      ctx.save();
      ctx.translate(this.pos[0], this.pos[1]);

      ctx.rotate((this.angle + 90) * Math.PI/180);

      Ship.sprite.src = './assets/falcon.png';

      // ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
      ctx.drawImage(Ship.sprite, 0, 0, 40, 40, 60, 60, 400, 400);


      ctx.restore();


    };


  })();
