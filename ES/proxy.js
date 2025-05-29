//* 实现
const obj = { sum: 0 };
const add = new Proxy(obj, {
  get: function (target, prop, receiver) {},
});

//
const res1 = add[1][2] + 3; // 输出6
const res2 = add[3][4][5] + 6; // 输出18
console.log(res1);
console.log(res2);
