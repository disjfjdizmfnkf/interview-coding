Array.prototype.myMap = function (fn) {
  const result = [];
  const context = arguments[1] || window;

  if (typeof fn === "function") {
    for (let i = 0; i < this.length; i++) {
      result.push(fn.call(context, this[i], i, this));
    }
  } else {
    throw new Error("parameter1 is not a function");
  }

  return result;
};
