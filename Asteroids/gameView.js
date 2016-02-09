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
      var move = GameView.MOVES[k];
      key(k, function () {
        ship.power(move);
      });

      key('space', function () {ship.fireBullet();});
    });
  };

  GameView.prototype.start = function () {
     this.bindKeyHandlers();
     this.lastTime = 0;
     //start the animation
     requestAnimationFrame(this.animate.bind(this));
   };

   GameView.prototype.animate = function(time){
     var timeDelta = time - this.lastTime;

     this.game.step(timeDelta);
     this.game.draw(this.ctx);
     this.lastTime = time;

     //every call to animate requests causes another call to animate
     requestAnimationFrame(this.animate.bind(this));
   };






})();
