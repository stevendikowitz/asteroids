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

  MovingObject.prototype.move = function () {
    var origX = this.pos[0];
    var origY = this.pos[1];

    var dx = this.vel[0];
    var dy = this.vel[1];

    var posX = origX + dx;
    var posY = origY + dy;
    this.pos = [posX, posY];
  };
  //
  // MovingObject.randomCircle = function (maxX, maxY, numCircles) {
  //   return new Circle(
  //     maxX * Math.random(),
  //     maxY * Math.random(),
  //     Circle.radius(maxX, maxY, numCircles),
  //     Circle.randomColor()
  //   );
  // };
  //
  // var HEX_DIGITS = "0123456789ABCDEF";
  // MovingObject.randomColor = function () {
  //   var color = "#";
  //   for (var i = 0; i < 6; i++) {
  //     color += HEX_DIGITS[Math.floor((Math.random() * 16))];
  //   }
  //
  //   return color;
  // };
  //
  // MovingObject.radius = function (maxX, maxY, numCircles) {
  //   var targetCircleArea = (maxX * maxY) / numCircles;
  //   var targetRadius = Math.sqrt(targetCircleArea / Math.PI);
  //   return 2 * targetRadius;
  // };
  //

})();
