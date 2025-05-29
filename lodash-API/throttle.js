// 在一定时间内多次触发时间只执行一次
// 用当前时间减去之前时间 获得这段时间内的时间差 判断是否在限制时间内
const throttle = (f, limit) => {
  let previous = 0;
  return function (...args) {
    let now = Date.now();
    if (now - previous > limit) {
      previous = now;
      // 将f的this指向返回函数的this
      return f.apply(this, args);
    }
  };
};

// 可以在第一次执行的
const throttle_ = (f, limit) => {
  let previous = 0;
  return function (...args) {
    let now = Date.now();
    if (previous === 0 || now - previous > limit) {
      previous = now;
      // 将f的this指向返回函数的this
      return f.apply(this, args);
    }
  };
};

console.log(typeof null);
