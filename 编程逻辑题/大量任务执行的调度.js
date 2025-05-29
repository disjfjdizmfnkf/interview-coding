/**
 * 运行一个耗时任务
 * 如果需要异步执行，返回一个Promise
 * 要尽快完成任务，同时不要让页面产生卡顿
 * 尽量兼容更多的浏览器
 * @param {Function} task
 */
function runTask(task) {
  return new Promise((resolve) => {
    _run(task, resolve);
  });
}

//* 兼容性实现
function _run(task, cb) {
  const start = performance.now();
  requestAnimationFrame(() => {
    // 16.6 约为 60fps 帧率下每一帧的时间
    if (performance.now() - start < 16.6) {
      task();
      cb();
    } else {
      _run(task, cb);
    }
  });
}

//*
function _run(task, cb) {
    //* requestIdleCallback 在必要的渲染和用户交互处理后执行回调
  requestIdleCallback((deadline) => {
    if (deadline.timeRemaining() > 0) {
      task();
      cb();
    } else {
      _run(task, cb);
    }
  });
}
