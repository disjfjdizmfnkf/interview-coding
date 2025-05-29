// 但是这些方法都有缺陷
// 最好使用 Array.isArray

Array.myIsArray = (arg) => {
  // Object.prototype.toString方法检查的是this的的内部类型标签（internal [[Class]] property）
  return Object.prototype.toString.call(arg) === "[object Array]";
};

Array.myIsArray = (arg) => {
  // 判断arg是否是Array的一个实例
  return arg instanceof Array;
};

// test
console.log(Array.myIsArray([1, 2, 3]));
// true
console.log(Array.myIsArray([1, 2, 3, NaN]));
// true
console.log(Array.myIsArray({ foo: 123 }));
// false
Array.myIsArray("foobar");
// false
Array.myIsArray(undefined);
// false
Array.myIsArray(NaN);
// false
