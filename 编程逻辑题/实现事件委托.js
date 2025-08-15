//! 在parent上监听子元素tagname的 event 调用callback回调
//* addEventListener toLowerCase
function delegateEvent(parent, tagName, event, callback) {
  parent.addEventListener(event, (e) => {
    //? 判断事件触发的元素是否是目标子元素
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

// e.target 这个dom对象的其他属性
function handleClick(e) {
  const element = e.target;
  
  console.log(element.tagName);      // "BUTTON" (标签名)
  console.log(element.id);           // "btn1" (ID属性)
  console.log(element.className);    // "my-class" (CSS类名)
  console.log(element.textContent);  // "按钮1" (文本内容)
  console.log(element.getAttribute('data-value')); // 自定义属性
  console.log(element.style);        // CSSStyleDeclaration对象
}
