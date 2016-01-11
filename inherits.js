// function Animal (name) {
//   this.name = name;
// };
//
// Animal.prototype.sayHello = function () {
//   console.log("Hello, my name is " + this.name);
// };
//
// function Dog () {};
//
// // The surrogate will be used to construct `Dog.prototype`.
// function Surrogate () {};
// // A `Surrogate` instance should delegate to `Animal.prototype`.
// Surrogate.prototype = Animal.prototype;
//
// // Set `Dog.prototype` to a `Surrogate` instance.
// // `Surrogate.__proto__` is `Animal.prototype`, but `new
// // Surrogate` does not invoke the `Animal` constructor function.
// Dog.prototype = new Surrogate();
//
// Dog.prototype.bark = function () {
//   console.log("Bark!");
// };

Function.prototype.inherits = function (parent) {
  var self = this;
  var Surrogate = function () {};

  Surrogate.prototype = parent.prototype;
  self.prototype = new Surrogate();
  self.prototype.constructor = self;
};
