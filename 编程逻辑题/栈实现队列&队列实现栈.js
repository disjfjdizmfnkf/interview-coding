//* 队列FIFO： 一个入队栈 一个出队栈
//* 队列中的元素出栈时是从出队栈出去
class MyQueue {
  constructor() {
    // 用于入队操作的栈
    this.stackIn = [];
    // 用于出队操作的栈
    this.stackOut = [];
  }

  // 入队操作
  enqueue(value) {
    this.stackIn.push(value);
  }

  // 出队操作
  dequeue() {
    // 如果 stackOut 为空，将 stackIn 中的元素全部转移到 stackOut 中
    if (this.stackOut.length === 0) {
      while (this.stackIn.length > 0) {
        this.stackOut.push(this.stackIn.pop());
      }
    }
    // 如果 stackOut 仍然为空，说明队列为空，返回 null
    if (this.stackOut.length === 0) {
      return null;
    }
    // 弹出 stackOut 的栈顶元素，即队列的队首元素
    return this.stackOut.pop();
  }

  // 获取队首元素
  peek() {
    const result = this.dequeue();
    if (result !== null) {
      this.stackOut.push(result);
    }
    return result;
  }

  // 判断队列是否为空
  isEmpty() {
    return this.stackIn.length === 0 && this.stackOut.length === 0;
  }
}

//* 后进先出:  模仿栈出元素需要输出队列中的最后一个元素, 可以将之前的元素弹出再加入栈中
class MyStack {
  constructor() {
    this.size = 0;
    this.queue = [];
  }

  push(x) {
    this.queue.push(x);
    this.size++;
  }

  pop() {
    if (!this.size) return null;
    for (let i = this.size - 1; i >= 0; i--) {
      const temp = this.queue.shift();
      this.queue.push(temp);
    }
    this.size--;
    return this.queue.shift();
  }

  isEmpty() {
    return this.size === 0;
  }
}