/**
 * 比较两个值(包含判断对象)是否相等
 * 1.两个基本数据类型比较 直接使用===
 * 2.有一个不是对象
 * 3.判断两个对象是否相等
 *  3.1 可以先比较两个对象key的长度
 *  3.2 判断key是否是都有的
 *  3.3 递归比较两个key的值是否相同
 * */
function deepEqual(val1, val2) {
  if (val1 === val2) return true;
  if (!isObj(val1) || !isObj(val2)) return false;

  const key1 = Object.keys(val1); // 如果使用Reflect.ownKeys(val1) 可以获取符号属性和不可枚举属性
  const key2 = Object.keys(val2);
  if (key1.length !== key2.length) return false;
  for (const key of key1) {
    if (!(key in val2) || !deepEqual(val1[key], val2[key])) return false;
  }
  return true;
}

const isObj = (val) => val !== null && typeof val === "object";
