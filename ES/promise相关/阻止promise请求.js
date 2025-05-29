const controller = new AbortController();
const signal = controller.signal;

const fetchData = (url) => {
  return new Promise((resolve, reject) => {
    fetch(url, { signal })
      .then(response => response.json())
      .then(data => resolve(data))
      .catch(error => {
        if (error.name === 'AbortError') {
          reject('Request was aborted');
        } else {
          reject(error);
        }
      });
  });
};

// 发起请求
const promise = fetchData('https://jsonplaceholder.typicode.com/todos/1');

// 取消请求
controller.abort();

promise
  .then(data => console.log(data))
  .catch(error => console.error(error));