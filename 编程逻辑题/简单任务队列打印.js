/*
 * 要求设计一个简单的任务队列，要求分别在1，3，4秒后打印出"1", "2", "3"
 */
class Queue {
  constructor() {
    this.curTime = 0;
    this.task = [];
    this.timers = []; //* 记录定时器ID
  }

  task(time, cb) {
    this.curTime += time; //* 记录当前时间
    this.task.push([time, cb]);
    return this; //! 实现链式调用
  }

  start() {
    this.task.forEach((item, index) => {
      this.timers[index] = setTimeout(item[0], item[1]);
    });
  }

  stop() {
    for (const item of this.timers) {
      clearTimeout(item);
    }
  }
}

const q = new Queue();

q.task(1000, () => {
  console.log(1);
})
  .task(2000, () => {
    console.log(2);
  })
  .task(1000, () => {
    console.log(3);
  })
  .start();
q.stop(); // 可以随时终止任务
