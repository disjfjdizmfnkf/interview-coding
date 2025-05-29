//! setTimeout() 和 Promise().then()中 传入的都是一个回调函数 而不是直接调用，
//! 所以有两种写法 setTimeout(fn, 0) setTimeout(() => {fn()}, 0)
//! Promise().then(fn)  Promise().then(() => {fn()})

// 返回一个promise，在seconds时间之后resolve
const sleep = (seconds) =>
  new Promise((resolve) => setTimeout(resolve, seconds));

// 考虑函数返回的是一个promise 延迟 seconds 执行func(...args) 函数
function delay(func, seconds, ...args) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // 为什么需要使用resolve?
      // 如果函数返回的是promsie, 这里会直接执行resovle而不会等函数返回的promise解决
      // func(...args);
      // resolve;
      //  确保函数返回的是promise也可以等到peomise解决之后 resolve
      Promise.resolve(func(...args)).then(resolve);
    }, seconds);
  });
}

// test
delay(console.log, 3000, "hello").then(() => {
  console.log("延迟执行完成");
});

console.log("sleep 2s");

await sleep(2000);