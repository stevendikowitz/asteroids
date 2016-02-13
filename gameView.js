(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }




  var GameView = Asteroids.GameView = function (game, ctx) {
    this.game = game;
    this.ctx = ctx;
    this.ship = this.game.ship;
    this.dims = this.game.dims;
    this.startAnimate = false;
  };

  GameView.prototype.bindKeyHandlers = function () {
    var ship = this.ship,
        that = this,
        game = this.game;


    key('space', function () {
      ship.fireBullet();
      Asteroids.Sound.fire.play();
    });


    $(document).on('keydown', this, function (e) {
      var char = String.fromCharCode(e.keyCode);

      if (char.toLowerCase() === "a" || char === "%" ) {
        ship.leftTurn = true;
      } else if ( char.toLowerCase() === "d" || char === "'" ) {
        ship.rightTurn = true;
      }

      if ( char.toLowerCase() === "w" || char === "&") {
        ship.thrust = true;
      }

      if ( e.keyCode === 13 ) {
        Asteroids.Sound.theme.stop();
        Asteroids.Sound.lightsaber.play();
        game.stop = false;
        $(".new-game").removeClass("is-active");
        $(".game-over").removeClass("is-active");
        if (!that.startAnimate) {
          Asteroids.Sound.empire._loop = true;
          Asteroids.Sound.empire.play();
          that.animate();
          that.startAnimate = true;
          ship.setInvulnerable();

        }
      }
    }.bind(this));

    $(document).on('keyup', this, function (e) {
      var char = String.fromCharCode(e.keyCode);

      if ( char.toLowerCase() === "a" || char === "%" ) {
        ship.leftTurn = false;
      } else if ( char.toLowerCase() === "d" || char === "'" ) {
        ship.rightTurn = false;
      }

      if ( char.toLowerCase() === "w" || char === "&" ) {
        ship.thrust = false;
      }

    }.bind(this));
  };




  GameView.prototype.start = function () {
     this.bindKeyHandlers();
     this.lastTime = 0;
     //start the animation
     requestAnimationFrame(this.animate.bind(this));
     Asteroids.Sound.theme.play();
   };

   GameView.prototype.animate = function(time){
     if ( this.game.gameOver ) {
       this.gameOver();
     }

     var timeDelta = time - this.lastTime;
     if ( !this.game.stop ) {
       this.game.step(timeDelta);
       this.game.draw(this.ctx);
       this.lastTime = time;
       requestAnimationFrame(this.animate.bind(this));
     }
   };

   GameView.prototype.gameOver = function(){
     Asteroids.Sound.empire._loop = false;
     Asteroids.Sound.empire.stop();
     Asteroids.Sound.failed.play();
     this.game.stop = true;
     $(".game-over").addClass("is-active");
     var newGame = new Asteroids.Game(this.dims);
     newGame.stop = true;
     newGame.gameOver = false;
     new GameView(newGame, this.ctx).start();
   };

})();
