// 工厂函数
function hardMan(name) {
  return new hardManClass(name);
}

class hardManClass {
  constructor(name) {
    this.task = [];
    this.name = name;

    this.task.push(() => {
      console.log(`Hi! I am ${this.name}.`);
      this.next();
    });

    //! 代码同步加入所有任务, 使用setTimeOut确保开始时所有任务都在队列中
    setTimeout(() => {
      this.next();
    }, 0);
  }

  next() {
    if (this.task.length) {
      const task = this.task.shift();
      task();
    }
  }

  study(subject) {
    this.task.push(() => {
      console.log(`I'm studying ${subject}`);
      this.next();
    });
    return this; //! 每个方法返回this确保可以链式调用
  }

  rest(time) {
    this._addRest(time, false);
    return this;
  }

  restFirst(time) {
    this._addRest(time, true);
    return this;
  }

  _addRest(time, isFirst) {
    const t = () => {
      setTimeout(() => {
        console.log(`Wait ${time} seconds.`);
        this.next();
      }, time * 1000);
    };
    isFirst ? this.task.unshift(t) : this.task.push(t);
  }
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
