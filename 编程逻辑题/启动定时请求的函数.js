/*
 * 函数返回一个定时(time)执行的fn 执行count次
 */
function requestFn(fn, count, time) {
  return function (...args) {
    let num = 0;
    const intervalId = setInterval(() => {
      if (num < count) {
        fn.apply(this, args);
      } else {
        clearInterval(intervalId);
      }
    }, time);
  };
}

 