////////////////////////////////
//        Promise.all         //
////////////////////////////////

// promise.all 接受一个可迭代对象，返回一个新的Promise, 在所有操作完成时完成，或者有一个失败时结束
// 考虑promise主要是异步执行的，注意变量的使用

// 1.处理多个promise, 返回一个promise
Promise.myall = function (proms) {
  // 2.使用resolve和reject保存返回的promise状态
  let res, rej;
  const p = new Promise((resolve, reject) => {
    res = resolve;
    rej = reject;
  });
  const result = [];

  // 3.判断传入的可迭代对象
  // 3.1 为空，直接结束
  // 3.2 不为空，使用promse.resolve归一化
  // 4.有一个prom为reject 整体返回rej
  let i = 0;
  for (const prom of proms) {
    const index = i; // const创建的变量有所用域，可以形成闭包
    i++;
    Promise.resolve(prom).then((data) => {
      // 5.将完成的数据加入最终结果,对应一开始下标
      result[index] = data;
      // 6.计算是否是最后一个promise promise是异步的，这里count早计算完了
      i--;
      if (i === 0) {
        res(result);
      }
    }, rej);
  }

  if (i === 0) {
    // 返回一个空数组
    res(result);
  }

  return p;
};

// test
Promise.myall([1, 2, 3, Promise.reject(1)]).then(
  (datas) => {
    console.log(datas);
  },
  (err) => console.log(err)
);

////////////////////////////////
//        Promise.race        //
////////////////////////////////

Promise.myrace = function (proms) {
  let res, rej;
  const p = new Promise((resolve, reject) => {
    res = resolve;
    rej = reject;
  });

  for (const prom of proms) {
    Promise.resolve(prom).then((data) => res(data), rej);
  }

  return p;
};

////////////////////////////////
//    Promise.allsettled      //
////////////////////////////////
Promise.fakePromiseAllsettled = function (proms) {
  let res, rej;
  const p = new Promise((resolve, reject) => {
    res = resolve;
    rej = reject;
  });
  const result = [];
  let i = 0;
  for (const prom of proms) {
    const index = i;
    i++;
    Promise.resolve(prom)
      .then((data) => {
        result[index] = { status: "fulfilled", value };
      })
      .catch((err) => {
        result[index] = { status: "rejected", reason };
      })
      .finally(() => {
        i--; // 异步
        if (i === 0) res(result);
      });
  }

  if (i === 0) res([]);

  return p;
};
