async function async1() {
  console.log("async1 start");
  await new Promise((resolve, reject) => {
    resolve();
    console.log("async2 promise");
  });
  console.log("async1 end");
}

async1();

new Promise(function (resolve) {
  console.log("promise1");
  resolve();
})
  .then(function () {
    console.log("promise2");
  })
  .then(function () {
    console.log("promise3");
  });

// async1 start
// async2 promise
// promise1
// async1 end
// promise2
// promise3
