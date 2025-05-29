/**
 * 按照顺序执行任务队列
 * 所有任务完成之后得到每个任务的执行
 * 具有两个方法, start用于启动任务，pause用于暂停任务
 * 每个任务具有原子性，不可被打断，只能等待其执行完毕
 * @param {...Function} tasks
 */
// 1. 返回的是一个有start和pause的对象
// 2. start返回的是一个promise
// 3. 确保同时只有一个promise
// 4. 每个任务执行后检查是否停止执行
// 5. 任务队列中的是promise，编写的是异步代码
function TaskQueue(...tasks) {
  let isRunning = false;
  let i = 0; //* 标记当前执行的任务索引,通过闭包访问
  const res = [];
  return {
    start() {
      // 返回一个Promise是因为执行n次完成所有任务是一个Promise, 每次执行start 1次也是一次Promise
      return new Promise(async (resolve, reject) => {
        if (isRunning) return; // 同时只应该有一个promise
        isRunning = true; // 开始执行
        while (i < tasks.length) {
          try {
            res.push(await tasks[i]()); // 调用这个任务
          } catch (err) {
            reject(err); // 捕获问题,这个start返回的promsie rejected
            return; // 后面的代码就不执行了
          }
          i++;
          if (!isRunning) return; // 直接返回, 函数的执行结束, 因为是
        }
        isRunning = false; // 结束执行
        resolve(res);
      });
    },
    pause() {
      isRunning = false;
    },
  };
}
