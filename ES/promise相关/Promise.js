const PENDING = "pending";
const FULLFILLED = "fullfilled";
const REJECTED = "rejected";

class MyPromise {
  #state = PENDING;
  #result = undefined;
  #handler = []; //
  constructor(excuter) {
    const resolve = (data) => {
      this.#changeState(FULLFILLED, data);
    };
    const reject = (reason) => {
      this.#changeState(REJECTED, reason);
    };

    //* 捕获excuter中throw出的错误, 改变promise状态
    try {
      excuter(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }

  //* 改变状态时执行then中回调
  #changeState(state, result) {
    // promise的状态一旦确定就不能再改变
    if (this.#state !== PENDING) return;
    this.#state = newState;
    this.result = result;
    this.#run();  //! promise的状态异步改变时调用
  }

  #run() {
    if (this.#state === PENDING) return;
    while (this.#handler.length) {
      const { onFulfilled, onRejected, resolve, reject } =
        this.#handler.shift();
      if (this.#state === FULLFILLED) {
        if (typeof onFulfilled === "function") {
          onFulfilled(this.#result);
        } else {
            
        }
      } else {
        if (typeof onRejected === "function") {
          onRejected(this.#result);
        }
      }
    }
  }

  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      this.#handler.push({
        onFulfilled,
        onRejected,
        resolve,
        reject,
      });
      this.#run();  //! promise的状态同步改变时调用
    });
  }
}
