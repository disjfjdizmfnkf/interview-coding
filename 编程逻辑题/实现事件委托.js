//! 在parent上监听子元素tagname的 event 调用callback回调
//* addEventListener toLowerCase
function delegateEvent(parent, tagName, event, callback) {
  parent.addEventListener(event, (e) => {
    //? 判断触发事件的元素是target
    if (e.target.tagName.toLowerCase() === tagName.toLowerCase()) {
      //* e.target.tagName是大写
      // 调用异步回调
      callback(e).then((res) => {
        // 处理异步回调
        console.log(res);
      });
    }
  });
}
