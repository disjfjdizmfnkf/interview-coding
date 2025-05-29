// 发布者和订阅者之间通过第三方(事件总线或消息代理)来实现调度实现松耦合
// 使用举例： 使用发布订阅模式解耦
type EventName = "event1" | "event2";
class EventEmitter {
  //* 使用record定义一个新的对象类型
  private listeners: Record<EventName, Set<Function>> = { 
    // 集合是无序的，无法保证函数的执行顺序
    event1: new Set(),
    event2: new Set(),
  };

  // 传入一个事件名和一个回调函数，创建一个事件监听，本质是将回调函数保存到对应的事件中
  on(evnetName: EventName, cb: Function) {
    if (!this.listeners[evnetName]) {
      this.listeners[evnetName] = new Set();
    }
    this.listeners[evnetName].add(cb);
  };

  off(evnetName: EventName, cb: Function) {
    if (!this.listeners[evnetName]) return;
    this.listeners[evnetName].delete(cb);
  };

  // 传入事件名和参数，触发某个事件发生的时的所有反馈，本质上就是调用所有事件对应的所有回调函数
  emit(evnetName: EventName, ...args: any[]) {
    if (!this.listeners[evnetName]) return;
    this.listeners[evnetName].forEach((cb) => {
      cb(...args);
    });
  };
}

// export default 可以导出一个默认的实例化对象
export default new EventEmitter();
// export 直接导出一个变量、函数、或者一个类(不是实例)
// export const e = new EventEmitter;
