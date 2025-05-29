//* 如果调用fn当前参数不够, 继续接收剩余参数
const curry = (fn, ...args) => {
  return args.length >= fn.length
    ? fn(...args)
    : (..._args) => curry(fn, ...args, ..._args);
};

// 接收单一参数 => 接收多个参数
Function.prototype.uncurry = function () {
  const fn = this;
  return function (...args) {
    return fn.apply(args[0], args.slice(1));
  };
};

const add = (a, b, c) => a + b + c;
const curriedAdd = curry(add);
// 测试柯里化函数
console.log(curriedAdd(1)(2)(3)); // 输出 6
console.log(curriedAdd(1, 2)(3)); // 输出 6
console.log(curriedAdd(1)(2, 3)); // 输出 6
console.log(curriedAdd(1, 2, 3)); // 输出 6
// 测试反柯里化函数
const uncurriedAdd = curriedAdd.uncurry();
console.log(uncurriedAdd(1, 2, 3)); // 输出 6
