class HardMan {
  constructor(name) {
    this.name = name;
    this.queue = [];
    // 初始任务
    this.queue.push(() => {
      console.log(`Hi! I am ${this.name}.`);
      this.next();
    });
    setTimeout(() => this.next(), 0);
  }

  next() {
    const task = this.queue.shift();
    task?.();
  }

  study(subject) {
    this.queue.push(() => {
      console.log(`I'm studying ${subject}`);
      this.next();
    });
    return this;
  }

  rest(seconds) {
    this._addRest(seconds, false);
    return this;
  }

  restFirst(seconds) {
    this._addRest(seconds, true);
    return this;
  }

  _addRest(seconds, isFirst) {
    const task = () => {
      setTimeout(() => {
        console.log(`Wait ${seconds} seconds.`);
        this.next();
      }, seconds * 1000);
    };
    isFirst ? this.queue.unshift(task) : this.queue.push(task);
  }
}

// 工厂函数
function hardMan(name) {
  return new HardMan(name);
}

// 写一个hardMan函数，满足控制台打印效果如下：
hardMan("潘潘");
//> Hi! I am 潘潘.
hardMan("潘潘").study("Project");
//> Hi! I am 潘潘.
//> I am studying Project.
hardMan("潘潘").rest(3).study("敲码");
//> Hi! I am 潘潘.
//> Wait 3 seconds.
//> I am studying 敲码.
hardMan("潘潘").restFirst(3).study("敲码");
//> Wait 3 seconds.
//> Hi! I am 潘潘.
//> I am studying 敲码.
