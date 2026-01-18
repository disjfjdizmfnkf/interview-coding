
class Promise {
  constructor(excutor) {
    this.status = 'p';
    this.reason = undefined;
    this.value = undefined;
    this.resolveCallBack = [];
    this.rejectCallBack = [];


    function resovle(value) {
      if (this.status == 'p') {
        this.status = 'r';
        this.value = value;
        this.resolveCallBack.forEach(fn => fn());
      }
    }

    function reject(reason) {

    }

    try {
      excutor(resovle, reject);
    } catch (error) {
      throw Error(error);
    }
  }

  then(onFulfilled, onRejected) {
    return new Promise((resovle, reject) => {
      switch (this.status) {
        case 'p':
          break;
      }
    })
  }
}



// NOTE: new Promise((resolve, reject) => {}).then(() => {}, () => {})
