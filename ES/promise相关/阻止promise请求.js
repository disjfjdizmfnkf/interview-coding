//! 获取controller实例上的signal属性，在signal上监听abort事件，事件触发时手动reject这个请求

/**
 * 创建一个支持中止的延时 Promise
 * @param {number} delay 延时毫秒数
 * @param {AbortSignal} signal AbortController 的 signal 对象
 * @returns {Promise<string>}
 */
function abortableTimeout(delay, signal) {
  return new Promise((resolve, reject) => {
    // 1. 如果在调用时操作就已经被中止，则立即拒绝
    if (signal.aborted) {
      return reject(new DOMException("Operation aborted", "AbortError"));
    }

    // 定义中止处理函数
    const onAbort = () => {
      clearTimeout(timer); // <-- 关键：清除定时器，中止异步操作
      reject(new DOMException("Operation aborted", "AbortError"));
    };

    // 2. 设置实际需要的异步操作
    const timer = setTimeout(() => {
      resolve(`Completed after ${delay}ms`);
      // 3. 操作完成，移除监听器以防内存泄漏
      signal.removeEventListener("abort", onAbort);
    }, delay);

    // 4. 开始监听 abort 事件
    signal.addEventListener("abort", onAbort, { once: true });
  });
}

// --- 使用示例 ---
const controller = new AbortController();
const { signal } = controller;

console.log("Starting abortable operation (will be aborted)...");

abortableTimeout(5000, signal)
  .then((message) => console.log(message))
  .catch((err) => {
    if (err.name === "AbortError") {
      console.log("Operation was successfully aborted!");
    } else {
      console.error("An unexpected error occurred:", err);
    }
  });

// 在 1 秒后中止操作
setTimeout(() => {
  console.log("Aborting...");
  controller.abort();
}, 1000);
