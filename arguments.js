function sum () {
  var partSum = 0;
  for (i = 0; i < arguments.length; i++) {
    partSum += arguments[i];
  }
  return partSum;
}

// function myBind (context) {
//   var fn = this;
//   var bindArgs = [].slice.call(arguments, 1);
//
//   var myFunction = function () {
//     var callArgs = [].slice.call(arguments);
//     return fn.apply(context, bindArgs.concat(callArgs));
//   };
//
//   return myFunction;
// }
Function.prototype.myBind = function (context) {
  var fn = this;
  var bindArgs = [].slice.call(arguments, 1);

  var myFunction = function () {
    var callArgs = [].slice.call(arguments);
    return fn.apply(context, bindArgs.concat(callArgs));
  };

  return myFunction;
};

var curriedSum = function (numArgs) {
  var nums = [];
  var _curriedSum = function (num) {
    nums.push(num);
    if (nums.length === numArgs) {
      var sum = 0;
      for (var i = 0; i < nums.length; i++) {
        sum += nums[i];
      }
      return sum;
    } else {
      return _curriedSum;
    }
  };
  return _curriedSum;
};

Function.prototype.curry = function (numArgs) {
  var fn = this;
  var myArgs = [];

  var _curry = function (arg) {
    myArgs.push(arg);

    if (myArgs.length === numArgs) {
      return fn.apply(myArgs);
    }
    else {
      return _curry;
    }
  };
  return _curry;
};

function sumThree(num1, num2, num3) {
  return num1 + num2 + num3;
}

sumThree(4, 20, 6); // == 30

// you'll write `Function#curry`!
var f1 = sumThree.curry(3);
var f2 = f1(4);
var f3 = f2(20);
var result = f3(6); // = 30

// or more briefly:
sumThree.curry(3)(4)(20)(6); // == 30
