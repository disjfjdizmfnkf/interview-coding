// 超时重试  使用AbortController()
function customFetch(url, options = {}, retryTimes = 3, timeout = 5000) {
  const controller = new AbortController();
  const signal = controller.signal;

  const timeoutId = setTimeout(() => {
    controller.abort();
  }, timeout);

  //! 这里会覆盖用户传入的signal
  return fetch(url, { ...options, signal })
    .then((resp) => {
      clearTimeout(timeoutId);
      return resp;
    })
    .catch((error) => {
      clearTimeout(timeoutId);
      if (retryTimes <= 0) throw error;
      //! 这里使用了异步递归调用, 有效避免执行栈溢出
      return Promise.resolve().then(() =>
        customFetch(url, options, retryTimes - 1, timeout)
      );
    });
}

// 示例用法
customFetch("https://example.com")
  .then((response) => console.log("Response:", response))
  .catch((error) => console.error("Error:", error));

function retry(url, options = {}, timeout = 5000, retry = 3) {
  const controller = new AbortController();
  const signal = controller.signal;
  const timer = setTimeout(() => {
    controller.abort();
  }, timeout);
  return fetch(url, { ...options, signal })
    .then((response) => {
      clearTimeout(timer);
      return response;
    })
    .catch((err) => {
      clearTimeout(timer);
      if (retry === 0) throw err;
      return Promise.resolve().then(() =>
        retry(url, options, timeout, retry - 1)
      );
    });
}
