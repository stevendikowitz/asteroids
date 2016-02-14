(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }




  var GameView = Asteroids.GameView = function (canvasEl, dims, ctx) {
    this.ctx =  canvasEl.getContext("2d");
    this.dims = dims;
    this.game = new Asteroids.Game(this.dims, this);
    // this.startAnimate = false;
    // this.bindKeyHandlers();
  };

  // GameView.prototype.bindKeyHandlers = function () {
  //   var ship = this.game.ship,
  //       that = this,
  //       game = this.game,
  //       ctx = this.ctx;
  //
  //
  //     key('space', function () {
  //       ship.fireBullet();
  //     });
  //
  //
  //   $(this).on('keydown', function (e) {
  //     var char = String.fromCharCode(e.keyCode);
  //
  //     if (char.toLowerCase() === "a" || char === "%" ) {
  //       ship.leftTurn = true;
  //     } else if ( char.toLowerCase() === "d" || char === "'" ) {
  //       ship.rightTurn = true;
  //     }
  //
  //     if ( char.toLowerCase() === "w" || char === "&") {
  //       ship.thrust = true;
  //     }
  //
  //     if ( e.keyCode === 13 ) {
  //       Asteroids.Sound.theme.stop();
  //       Asteroids.Sound.lightsaber.play();
  //       game.stop = false;
  //       $(".new-game").removeClass("is-active");
  //       $(".game-over").removeClass("is-active");
  //       if (!that.startAnimate) {
  //         that.lastTime = 0;
  //         game.stop = false;
  //         Asteroids.Sound.empire._loop = true;
  //         Asteroids.Sound.empire.play();
  //         requestAnimationFrame(that.animate.bind(that));
  //         ship.setInvulnerable();
  //
  //       }
  //     }
  //   }.bind(this));
  //
  //   $(this).on('keyup', function (e) {
  //     var char = String.fromCharCode(e.keyCode);
  //
  //     if ( char.toLowerCase() === "a" || char === "%" ) {
  //       ship.leftTurn = false;
  //     } else if ( char.toLowerCase() === "d" || char === "'" ) {
  //       ship.rightTurn = false;
  //     }
  //
  //     if ( char.toLowerCase() === "w" || char === "&" ) {
  //       ship.thrust = false;
  //     }
  //
  //   }.bind(this));
  //
  //   $( window ).resize(function() {
  //     ctx.canvas.width = window.innerWidth;
  //     ctx.canvas.height = window.innerHeight;
  //     game.DIM_X = window.innerWidth;
  //     game.DIM_Y = window.innerHeight;
  //     that.dims = {DIM_X: window.innerWidth, DIM_Y: window.innerHeight};
  //   });
  // };




  GameView.prototype.start = function () {
    //  this.bindKeyHandlers();

     this.lastTime = 0;
     this.game.stop = false;
     //start the animation
    //  requestAnimationFrame(this.animate.bind(this));
     Asteroids.Sound.empire.stop();
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

  //  GameView.prototype.unbindKeyHandlers = function () {
  //    $(this).unbind();
  //    $(this).off('keyup');
  //    $(this).off('keydown');
  //    cancelAnimationFrame(this.frame);
  //    cancelAnimationFrame(this);
  //  };

   GameView.prototype.gameOver = function() {
     Asteroids.Sound.empire._loop = false;
     Asteroids.Sound.empire.stop();
     Asteroids.Sound.failed.play();
     this.game.unbindKeyHandlers();
     $(".game-over").addClass("is-active");
     this.game = new Asteroids.Game(this.dims, this);
    //  this.start();
   };

})();
