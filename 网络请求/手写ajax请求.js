//* 使用xhr创建一个get请求
const xhr = new XMLHttpRequest(); //* 1.创建一个对象
xhr.open("GET", "/api", true); //* 2.准备发送请求, 指定请求(方法, url, 是否异步)
xhr.onreadystatechange = function () {
  //* 3.监听onreadystatechange事件处理回调
  if (xhr.readyState === 4) {
    if (xhr.status === 200) {
      alert(xhr.responseText);
    }
  }
};
xhr.send(null); //* 4.发送请求

//* 创建一个post请求
const xhrPost = new XMLHttpRequest();
xhrPost.open("POST", "/api", true);
xhrPost.onreadystatechange = function () {
  if (xhrPost.readyState === 4) {
    if (xhrPost.status === 200) {
      alert(xhrPost.responseText);
    }
  }
};
xhrPost.send(JSON.stringify({})); //* post请求调用send发送传递请求体(JSON格式)
