/**
 * 并发请求控制函数
 * @param {string[]} urls 请求的URL数组
 * @param {number} limit 最大并发数
 * @returns {Promise<any[]>} 按请求顺序返回的结果数组
 */
//* 记得这个函数是异步的，返回的是一个promise
function limitConcurrencyRequest(urls, limit) {
  let currentIndex = 0; // 当前执行到的url索引
  let completedCount = 0;
  const res = [];
  return new Promise((resolve) => {
    if (urls.length === 0) {
      resolve([]);
      return;
    }

    // 递归的发送网络请求
    async function _request() {
      if (currentIndex >= urls.length) return;
      // 使用局部变量记录当前的请求index
      const index = currentIndex;
      const url = urls[index];
      currentIndex++;
      try {
        const data = await fetch(url);
        res[index] = data;
      } catch (err) {
        res[index] = err;
      } finally {
        completedCount++;
        if (completedCount === urls.length) resolve(res);
        _request();
      }
    }

    const batchSize = Math.min(urls.length, limit);
    for (let i = 0; i < batchSize; i++) {
      _request();
    }
  });
}
