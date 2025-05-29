//! 使用集合保存事件: 可以自动实现去重, 但是无法按照顺序触发事件
class EventEmitter {
  constructor() {
    this.listener = {};
  }

  on(eventName, cb) {
    if (!this.listener[eventName]) {
      this.listener[eventName] = new Set();
    }
    this.listener[eventName].add(cb);
  }

  off(eventName, cb) {
    if (this.listener[eventName]) {
      this.listener[eventName].delete(cb);
    }
  }

  emit(eventName, ...args) {
    if (!this.listener[eventName]) return null;
    this.listener[eventName].forEach((cb) => {
      cb(...args);
    });
  }

  // 添加 once 方法
  once(eventName, cb) {
    const wrapper = (...args) => {
      cb(...args); // 执行原始回调
      this.off(eventName, wrapper); // 自动移除监听器
    };
    this.on(eventName, wrapper);
  }
}

// 创建一个数组存放事件
class EventEmitter {
  constructor() {
    this.listener = {};
  }

  on(eventName, cb) {
    if (!this.listener[eventName]) {
      this.listener[eventName] = [cb];
      return;
    }

    if (this.listener[eventName].includes(cb)) return;

    this.listener[eventName].push(cb);
  }

  off(eventName, cb) {
    if (this.listener[eventName].length) {
      const index = this.listener[eventName].indexOf(cb);
      if (index !== -1) {
        this.listener[eventName].splice(index, 1);
      }
    }
  }

  emit(eventName, ...args) {
    if (this.listener[eventName]) {
      this.listener[eventName].forEach((cb) => cb(...args));
    }
    return;
  }
}
