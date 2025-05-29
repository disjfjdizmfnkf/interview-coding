//* Symbol.hasInstance
//* 就是判断构造函数的prototype属性是否出现在函数的原型链上
function myInstanceof(left, right) {
  // 检查 constructor 是否有 Symbol.hasInstance 方法
  if (typeof constructor[Symbol.hasInstance] === "function") {
    // 如果有，调用该方法并返回结果
    return constructor[Symbol.hasInstance](obj);
  }

  let prototype = right.prototype; // 获取右边构造函数的原型对象
  let proto = left.__proto__; // 从原型链向上寻找
  while (proto) {
    if (proto === prototype) {
      return true;
    }
    proto = proto.__proto__;
  }
  return false;
}

// 测试案例
console.log(myInstanceof([], Array)); // true
console.log(myInstanceof([], Object)); // true
console.log(myInstanceof({}, Object)); // true
console.log(myInstanceof({}, Array)); // false
console.log(myInstanceof(new Date(), Date)); // true
console.log(myInstanceof(new Date(), Object)); // true
console.log(myInstanceof(new Date(), Array)); // false

// 使用原型链判断类型的缺点：
/* 
1. 原型链可能会被修改: Object.setPrototypeOf(obj, {})
2. 跨iframe或窗口时: 因为每个iframe和窗口都有自己的全局对象和构造函数 
*/
