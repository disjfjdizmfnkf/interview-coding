// 比较两个值是否相等
function deepEqual(val1, val2) {
  if (val1 === val2) return true;
  if (!_isObject(val1) || !_isObject(val2)) return false; // 如果两个不是基本类型又有不是对象的
  // if (!_isObject(val1) || !_isObject(val2)) return val1 === val2;
  // 判断到此二者都是对象
  let keys1 = Object.keys(val1); //! 如果要获取所有属性使用 Reflect.ownKeys()
  let keys2 = Object.keys(val2);
  if (keys1.length !== keys2.length) return false;
  // 只判断了可枚举属性
  for (const key of keys1) {
    if (!(key in val2) || !deepEqual(val1[key], val2[key])) {
      return false;
    }
  }
  return true;
}
const _isObject = (val) => val !== null && typeof val === "object";
