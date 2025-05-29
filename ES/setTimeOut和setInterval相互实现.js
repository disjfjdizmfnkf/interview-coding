//* 用setTimeout实现setInterval
/**
 * 用 setTimeout 实现 setInterval 的功能
 * @param {Function} callback 需要定期执行的回调函数
 * @param {number} delay 时间间隔(毫秒)
 * @return {object} 包含 clear 方法的对象，用于停止定时器
 */
function mySetInterval(callback, delay) {
  let timerId;
  let stopped = false;

  function repeat() {
    if (stopped) return;
    callback();
    timerId = setTimeout(repeat, delay);
  }

  // 立即开始第一次调用
  timerId = setTimeout(repeat, delay);

  // 返回一个对象，允许停止定时器
  return {
    clear: function () {
      stopped = true;
      clearTimeout(timerId);
    },
  };
}

// 使用示例
const intervalId = mySetInterval(() => {
  console.log("每1000ms执行一次");
}, 1000);

// 5秒后停止
setTimeout(() => {
  intervalId.clear();
  console.log("定时器已停止");
}, 5000);

//* 用setInterval实现setTimeout
/**
 * 用 setInterval 实现 setTimeout 的功能
 * @param {Function} callback 需要延迟执行的回调函数
 * @param {number} delay 延迟时间(毫秒)
 * @return {object} 包含 clear 方法的对象，用于取消执行
 */
function mySetTimeout(callback, delay) {
  let executed = false;

  const intervalId = setInterval(() => {
    if (!executed) {
      callback();
      clearInterval(intervalId);
      executed = true;
    }
  }, delay);

  // 返回一个对象，允许取消执行
  return {
    clear: function () {
      clearInterval(intervalId);
    },
  };
}

// 使用示例
const timeoutId = mySetTimeout(() => {
  console.log("延迟2000ms后执行一次");
}, 2000);

// 如果需要取消
// timeoutId.clear();
