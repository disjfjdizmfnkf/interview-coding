//* promise的串行
// 使用async和awiat实现
async function serial(tasks) {
  const results = [];
  for (const task of tasks) {
    const result = await task(); // 等待当前任务完成
    results.push(result);
  }
  return results; // 返回所有结果
}

//* promise并行
function parallel(proms) {
  // 2.使用resolve和reject保存返回的promise状态
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
    Promise.resolve(prom).then((data) => {
      result[index] = data;
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
}
