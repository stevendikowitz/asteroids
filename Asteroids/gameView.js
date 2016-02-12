(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var GameView = Asteroids.GameView = function (game, ctx) {
    this.game = game;
    this.ctx = ctx;
    this.ship = this.game.ship;
  };

  GameView.MOVES = {
        w: [ 0, -1],
        a: [-1,  0],
        s: [ 0,  1],
        d: [ 1,  0],
       up: [ 0, -1],
     left: [-1,  0],
     down: [ 0,  1],
    right: [ 1,  0]
  };

  GameView.prototype.bindKeyHandlers = function () {
    var ship = this.ship;

    Object.keys(GameView.MOVES).forEach(function(k) {
      // var move = GameView.MOVES[k];
      // key(k, function () {
      //   ship.power(move);
      // });

      key('space', function () {ship.fireBullet();});
    });
  };


  $(document).on('keydown', this, function (e) {
    var char = String.fromCharCode(e.keyCode),
        ship = this.game.ship;

    if (char.toLowerCase() === "a" || char === "%" ) {
      ship.leftTurn = true;
    } else if ( char.toLowerCase() === "d" || char === "'" ) {
      ship.rightTurn = true;
    }

    if ( char.toLowerCase() === "w" || char === "&") {
      ship.thrust = true;
    }

    if ( e.keyCode === 13 ) {
      this.game.stop = false;
      $(".new-game").removeClass("is-active");
    }
  }.bind(this));

  $(document).on('keyup', this, function (e) {
    var char = String.fromCharCode(e.keyCode),
        ship = this.game.ship;

    if ( char.toLowerCase() === "a" || char === "%" ) {
      ship.leftTurn = false;
    } else if ( char.toLowerCase() === "d" || char === "'" ) {
      ship.rightTurn = false;
    }

    if ( char.toLowerCase() === "w" || char === "&" ) {
      ship.thrust = false;
    }

  }.bind(this));

  GameView.prototype.start = function () {
     this.bindKeyHandlers();
     this.lastTime = 0;
     //start the animation
     requestAnimationFrame(this.animate.bind(this));
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
     this.game.stop = true;
     $(".game-over").addClass("is-active");
   };

})();
