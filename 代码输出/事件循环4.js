const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(1);
  }, 0);
  console.log(2);
});
p.then((res) => {
  console.log(res);
  new Promise((resolve, reject) => {
    console.log(3);
    resolve(res);
  })
    .then((res) => {
      console.log(4);
      return res;
    })
    .then((res) => {
      console.log(5);
      return res;
    });
}).then((res) => {
  console.log(6);
});
// 2
// 1
// 3
// 4
// 6
// 5
