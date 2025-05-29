/* 这里的正则表达式的含义 */
/*
 * [...] 字符类，匹配括号中内的任意一个字符
 * ^  在字符类的开头表示取反
 * \[ \]  '['和']'在正则中有特殊含义，需要转义
 * . 匹配字面上的 . 不需要转义
 * + 量词
 */

// path: Array | String
function get(object, path, defalutValue) {
  if (!Array.isArray(path)) {
    path = String(path).match(/[^\[\].]+/g) || [];
  }

  let cur = object;
  for (const item of path) {
    if (cur === null) return defalutValue;

    // 将引用数据类型转换为基本数据类型,对象不会变化
    const obj = Object(cur);
    // 判断item属性是否在对象中，防止访问错误
    if (item in obj) {
      cur = obj[item];
    } else {
      return defalutValue;
    }
  }
  return cur;
}

//* test 测试
const testObject = {
  a: {
    b: {
      c: 42,
      d: null,
    },
    e: [1, 2, 3],
  },
  f: "hello",
};

console.log(get(testObject, "a.e.[2]", "defalut"));  //WARN: [2]应该被作为数组的索引2, 第一种方法直接当作字符串处理
console.log(get(testObject, ["a", "e", "2"], "defalut"));
console.log(get(testObject, ["a", "b", "c"], "defalut"));
console.log(get(testObject, ["a", "b", "c", "d"], "defalut"));
console.log(get(testObject, ["m", "e", "2"], "defalut"));

function foo(obj, path, defalut) {
  if (!Array.isArray(path)) {
    String(path).split(".");
  }
  let cur = obj;
  for (const key of path) {
    if (key in Object(cur)) {
      cur = obj[key];
    } else {
      return defalut;
    }
  }
  return cur;
}
