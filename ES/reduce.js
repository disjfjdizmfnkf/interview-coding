Array.prototype.myReduce = function (cb, init) {
  // * 如果有init初值，acc初始化为init，startIndex初始化为0
  const array = this; // 发起调用的数组
  let acc = array[0]; // 累积值
  let startIndex = 1; // 起始索引

  // * 如果传入了init值
  // NOTE: arguments.length 传入参数个数
  // Function.length 函数生命时参数个数
  if (arguments.length > 1) {
    acc = init;
    startIndex = 0;
  }

  // 遍历数组
  for (let i = startIndex; i < array.length; i++) {
    acc = cb(acc, array[i], i, array); // 累计值 当前值 索引 当前数组
  }

  // 返回最终累计值
  return acc;
};

// 累加
const arr1 = [1, 2, 3, 4];
const sum = arr1.myReduce((acc, cur) => acc + cur, 0);
console.log(sum); // 输出 10

// 无初始值
const arr2 = [1, 2, 3, 4];
const product = arr2.myReduce((acc, cur) => acc * cur);
console.log(product); // 输出 24
