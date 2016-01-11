function sum () {
  var partSum = 0;
  for (i = 0; i < arguments.length; i++) {
    partSum += arguments[i];
  }
  return partSum;
}

function myBind (context) {
  var fn = this;
  var bindArgs = [].slice.call(arguments, 1);

  var myFunction = function () {
    var callArgs = [].slice.call(arguments);
    return fn.apply(context, bindArgs.concat(callArgs));
  };

  return myFunction;
}

// EXAMPLE BELOW

function Cat(name) {
  this.name = name;
}
Cat.prototype.says = function (sound, person) {
  console.log(this.name + " says " + sound + " to " + person + "!");
  return true;
};

markov = new Cat("Markov");
breakfast = new Cat("Breakfast");

markov.says("meow", "Ned");
// Markov says meow to Ned!
// true

markov.says.myBind(breakfast, "meow")("Kush");
// Breakfast says meow to Kush!
// true

markov.says.myBind(breakfast)("meow", "a tree");
// Breakfast says meow to a tree!
// true

markov.says.myBind(breakfast, "meow")("Markov");
// Breakfast says meow to Markov!
// true

var notMarkovSays = markov.says.myBind(breakfast);
notMarkovSays("meow", "me");
// Breakfast says meow to me!
// true
