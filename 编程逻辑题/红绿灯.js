function red() {
  console.log("red");
}
function green() {
  console.log("green");
}
function yellow() {
  console.log("yellow");
}

function light(fn, timer) {
  return new Promise((resolve) => {
    setTimeout(() => {
      fn();
      resolve();
    }, timer);
  });
}

async function index() {
  //! 循环中如果没有awit就不会等待异步任务执行结束
  while (1) {
    await light(red, 1000);
    await light(green, 1000);
    await light(yellow, 1000);
  }
}

function index() {
  while (1) {
    light(green, 500)
      .then(() => light(yellow, 500))
      .then(() => light(red, 500));
  }
}

//! 如果同步代码想要无限执行异步函数只能使用递归调用, 防止同步执行阻塞代码
// function loop() {
//   light(green, 500)
//     .then(() => light(yellow, 500))
//     .then(() => light(red, 500))
//     .finally(() => {
//       loop();
//     });
// }

// loop();
index();
