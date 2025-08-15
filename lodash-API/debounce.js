/**
 * @desc 返回防抖处理过的函数(首次点击不会执行)
 * @param f 回调函数
 * @param delay 延长时间
 * */
function debounce(f, delay, immediate = false) {
  let timer;
  let isImmediate = false;
  // 返回的函数不能是一个箭头函数
  return function (...args) {
    if (!isImmediate && immediate) {
      f.apply(this, args);
      isImmediate = true;
      return;
    }
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      // f调用时的this和debounce返回的函数调用时的this是同一个
      f.apply(this, args);
    }, delay);
  };
}

// 使用raf在下一次重绘之前执行回调
const raf = (cb) => {
  let requestId;
  if (!requestId) {
    requestId = requestAnimationFrame(() => {
      cb();
      requestId = 0; // 执行后置为0
    });
  }
};

function debounce(fn, delay) {
  let timer = null;
  return function (...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}
