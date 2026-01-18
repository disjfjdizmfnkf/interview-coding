//* 模拟一个简单的Promise
class Promise {
  constructor(executor) {
    this.status = "pending";
    this.data = undefined;
    this.reason = undefined;
    this.onResolvedCb = [];
    this.onRejectedCb = [];

    // NOTE: 1.改变promise状态 2.无论是异步还是同步,调用时都执行所有回调
    // 提供给executor的resolve/reject函数
    const resolve = (value) => {
      if (this.status === "pending") {
        this.status = "fulfilled";
        this.data = value;
        this.onResolvedCb.forEach((fn) => fn());
      }
    };

    const reject = (reason) => {
      if (this.status === "pending") {
        this.status = "rejected";
        this.reason = reason;
        this.onRejectedCb.forEach((fn) => fn());
      }
    };

    try {
      //NOTE: 传入executor的两个参数
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  // NOTE: 1. 同步执行回调/异步添加回调 2. 返回一个新的promise
  then(onFulfilled, onRejected) {
    return new Promise((resolve, reject) => {
      // NOTE: 包装函数执行 then 回调要使用上次promise的执行结果
      const handleFulfilled = () => {
        // NOTE: 执行then中传入的回调之后将结果传递给下一个then
        try {
          const res = onFulfilled(this.data);
          resolve(res);
        } catch (error) {
          reject(error);
        }
      };

      const handleRejected = () => {
        try {
          const res = onRejected(this.reason);
          resolve(res);
        } catch (error) {
          reject(error);
        }
      };

      // NOTE: then中成功或者是失败的回调要么是同步执行要么是异步加入回调
      switch (this.status) {
        case "pending":
          this.onResolvedCb.push(handleFulfilled);
          this.onRejectedCb.push(handleRejected);
          break;
        case "rejected":
          handleRejected();
          break;
        case "fulfilled":
          handleFulfilled();
          break;
      }
    });
  }
}

// test
const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("success");
  }, 1000);
});

p1.then((res) => {
  console.log("res1", res);
  return "res1";
}, (err) => {
  console.log("err1", err);
}).then((res) => {
  console.log("res2", res);
}, (err) => {
  console.log("err2", err);
});
