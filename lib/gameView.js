(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }




  var GameView = Asteroids.GameView = function (canvasEl, dims, ctx) {
    this.ctx =  canvasEl.getContext("2d");
    this.dims = dims;
    this.game = new Asteroids.Game(this.dims, this);
  };

  GameView.prototype.start = function () {
    //  this.bindKeyHandlers();

     this.lastTime = 0;
     this.game.paused = false;
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
     if ( !this.game.paused ) {
       this.game.step(timeDelta);
       this.game.draw(this.ctx);
       this.lastTime = time;
       requestAnimationFrame(this.animate.bind(this));
     }
   };


   GameView.prototype.gameOver = function() {
     Asteroids.Sound.empire._loop = false;
     Asteroids.Sound.empire.stop();
     Asteroids.Sound.failed.play();
     this.game.unbindKeyHandlers();
     $(".game-over").addClass("is-active");
     this.game = new Asteroids.Game(this.dims, this);
   };

})();
