// * 构造函数可以返回一个对象，也可以返回一个非对象值

function customNew(constructor, ...args) {
  //* 1.create方法将创建的新对象的原型设置为create方法中的参数
  const obj = Object.create(constructor.prototype);
  //* 2.调用构造函数(给这个对象添加属性)
  let result = constructor.apply(obj, args);
  //* 3.如果构造函数有返回值则返回，没有则返回obj
  // NOTE:
  //const obj = Object.create(null); // 创建一个没有原型的对象
  //console.log(Object.getPrototypeOf(obj)); // null
  //const invalidObj = Object.create(42); // 非法，但不会抛出错误
  //console.log(Object.getPrototypeOf(invalidObj)); // Number.prototype
  // 如果是基本类型返回obj
  return result instanceof Object ? result : obj;
}

const obj = customNew(Student, "khs");
console.log(obj);
