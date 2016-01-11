(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var GameView = Asteroids.GameView = function (game, ctx) {
    this.game = game;
    this.ctx = ctx;

  };

  GameView.prototype.start = function (canvasEl) {
    // get a 2d canvas drawing context. The canvas API lets us call
    // a `getContext` method on a canvas DOM element.
    var ctx = canvasEl.getContext("2d");

    //this function will update the position of all the circles,
    //clear the canvas, and redraw them
    window.setInterval( function () {
      this.game.moveObjects();
      this.game.draw(this.ctx);
    }, 20);

    //this will cause the first render and start the endless triggering of
    //the function using requestAnimationFrame
    // intervalCallback();
  };





})();
