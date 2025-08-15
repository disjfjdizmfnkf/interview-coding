//* 实现
const obj = { sum: 0 };
const add = new Proxy(obj, {
  get: function (target, prop, receiver) {
    // 将访问的属性值累加到 sum 中
    target.sum += Number(prop);
    // 返回代理对象本身以支持链式调用
    return receiver;
  },
  valueOf: function () {
    // 当进行加法运算时，返回当前的 sum 值
    return target.sum;
  },
});

//
const res1 = add[1][2] + 3; // 输出6
const res2 = add[3][4][5] + 6; // 输出18
console.log(res1);
console.log(res2);
