const { time } = require("console");
const { clearTimeout } = require("timers");
const { setTimeout } = require("timers/promises");

// 判断一个对象是否是一个Promise
function isPromiseLike(obj) {
  return obj && typeof obj.then === "function";
}

let a = { n: 1 };
let b = a;
a.x = a = { n: 2 };

console.log(a.x);
console.log(b.x);

// undegined {n: 2}
