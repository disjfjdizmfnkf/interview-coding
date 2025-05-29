/**
 * @desc 返回防抖处理过的函数(首次点击不会执行)
 * @param f 回调函数
 * @param delay 延长时间
 * */
function debounce(f, delay, immediate = false) {
  let timer;
  let isImmediate = false;
  // 这里不能是箭头函数
  return function (...args) {
    if (!isImmediate && immediate) {
      f.apply(this, args);
      isImmediate = true;
      return;
    }
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      // 外层使用箭头函数，实现将这里的this绑定到返回函数的this上
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
