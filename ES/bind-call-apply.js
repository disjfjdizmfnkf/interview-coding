// NOTE: 对比bind、call、apply 的使用方式
// bind: 延迟调用, 返回一个新的函数
// call: 立即调用, 返回函数调用结果, 传入的是this和列表 fn.call(ctx, 1, 2);
// apply: 立即调用, 返回函数调用结果, 传入的是this和数组 fn.apply(ctx, [1, 2]);


//////////////////////////// call //////////////////////////////////
/*
输入
输出
处理输入?
处理输出?
trick: 将函数绑定到对象上调用改变this指向，通过symbol创建属性名
*/
Function.prototype.myCall = function (ctx, ...args) {
  // 处理参数 是null undefined就指向this, 基本数据类型转换为包转数据类型，对象就还是对象
  // ctx = ctx === null || ctx === undefined ? globalThis : Object(ctx);
  ctx = ctx == null ? globalThis : Object(ctx);

  // 创建一个独一无二的属性
  var key = Symbol();
  // 将函数绑定到ctx的一个属性上调用从而让函数的this绑定到ctx上
  Object.defineProperty(ctx, key, {
    enumerable: false, // 不可枚举，打印对象时就看不到属性
    value: this, // 这个function的this指向的是调用这个函数的函数对象
  });

  // ctx[key] = this;  替换为使用属性描述符定义属性 优化打印对象的效果
  var result = ctx[key](...args);
  // 绑定好this之后删除自定义的属性

  // 删除symbol属性名
  delete ctx[key];
  // 删除字符串属性名
  // delete ctx.key;

  return result;
};

// test
function method(a) {
  console.log(this);
  console.log(a);
}
method.myCall(null, 1, 2);
method.myCall("aa", 1, 2);

//////////////////////////// bind //////////////////////////////////
/* 
bind 创建一个新函数，将这个新函数的this绑定到指定对象，并且可以预置参数
ctx: 上下文环境
*/

Function.prototype.myBind = function (ctx, ...args) {
  ctx = ctx == null ? globalThis : Object(ctx);
  // myBind调用时 this 指向了调用myBind的旧函数
  const func = this;
  // 返回新函数
  return function (...restArgs) {
    // 如果使用new调用，忽略this绑定
    // 使用new调用函数时, 函数内部new.target返回被调用的构造函数
    if (new.target) {
      // ...展开运算符得到的一些列单个的元素
      return new func(...args, ...restArgs);
    }
    // apply接收一个要绑定的this和一个参数数组
    return func.apply(ctx, [...args, ...restArgs]);
  };
};

// test
function fn(a, b, c, d) {
  console.log("args", a, b, c, d);
  console.log("this", this);
  return 123;
}
const newFn = fn.myBind("ctx", 1, 2);
console.log(new newFn(3, 4));

//////////////////////////// apply //////////////////////////////////
Function.prototype.myApply = function (ctx, argsArray) {
  ctx = ctx == null ? globalThis : Object(ctx);
  const key = Symbol();

  // 原生 apply 要求第二个参数必须是数组或类数组
  if (argsArray && typeof argsArray !== "object") {
    throw new TypeError("Arguments must be an array-like object");
  }

  Object.defineProperty(ctx, key, { enumerable: false, value: this });
  const args = argsArray ? [...argsArray] : [];
  const result = ctx[key](...args);
  delete ctx[key];
  return result;
};
