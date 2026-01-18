
function workLoop(deadLine) {
  // IdleDeadLine.timeReaming() 获取当前剩余时间
  console.log(deadLine.timeRemaing());

  let shouldYield = false;  // 让出执行权
  while (!shouldYield) {
   
    
    shouldYield = deadLine.timeRemaing() < 1;
  }

  requestIdleCallback(workLoop);
}

// 会在浏览器空闲时执行回调(
// 空闲时: 主线程没有高优先级任务处理 
// 高优先级任务: 滚动、动画、渲染) 
// 回调时自动传入IdleDeadline对象
requestIdleCallback(workLoop);
