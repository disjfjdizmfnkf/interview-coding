function timeout(time) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

class SuperTask {
  constructor(parallel) {
    this.parallel = parallel;
    this.running = 0;
    this.queue = []; 
  }

  add(task) {
    return new Promise((resolve, reject) => {
      this.queue.push({ task, resolve, reject });
      // 当任务被加入队列中时触发执行
      this._run();
    });
  }

  // 执行任务
  _run() {
    // 满足执行条件
    while (this.queue.length > 0 && this.running < this.parallel) {
      const { task, resolve, reject } = this.queue.pop();
      this.running++;
      Promise.resolve(task)
        .then(resolve)
        .catch(reject)
        .finally(() => {
          this.running--;
          this._run();
        });
    }
  }
}

const superTask = new SuperTask();
function addTask(time, name) {
  superTask
    .add(() => timeout(time))
    .then(() => {
      console.log(`任务${name}完成`);
    });
}

//! 同时执行的是两个任务
addTask(1000, "任务1"); // 1000ms后输出 任务1完成
addTask(500, "任务2"); // 500ms后输出 任务2完成
addTask(300, "任务3"); // 800ms后输出 任务3完成
addTask(400, "任务4"); // 1200ms后输出 任务4完成
addTask(500, "任务5"); // 1500ms后输出 任务5完成

/* 
constructor(paralleCount = 2) {
  this.paralleCount = paralleCount; //* 最大并发数
  this.tasks = []; //* 存放异步任务
  this.runningCount = 0;
}

//* 将任务加入到队列中, 触发自动执行
//! 队列中的任务都是异步执行的, 应该返回一个promise
add(task) {
  return new Promise((resolve, reject) => {
    this.tasks.push({ task, resolve, reject });
    this._run(); //* 加入后自动触发执行
  });
}

// 自动执行任务
_run() {
  //* 在任务没有执行完和未达到并发限制时不断执行任务
  while (this.tasks.length && this.runningCount < this.paralleCount) {
    const { task, resolve, reject } = this.tasks.pop();
    this.runningCount++;
    task()
      .then(resolve)
      .catch(reject)
      .finally(() => {
        this.runningCount--;
        this._run();
      });
  }
} */
