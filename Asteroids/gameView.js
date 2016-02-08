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

  GameView.prototype.start = function (canvasEl) {
    this.bindKeyHandlers();
    // get a 2d canvas drawing context. The canvas API lets us call
    // a `getContext` method on a canvas DOM element.
    var ctx = canvasEl.getContext("2d");

    //this function will update the position of all the circles,
    //clear the canvas, and redraw them
    window.setInterval( function () {
      this.game.step();
      this.game.draw(this.ctx);
    }, 20);

    //this will cause the first render and start the endless triggering of
    //the function using requestAnimationFrame
    // intervalCallback();
  };






})();
