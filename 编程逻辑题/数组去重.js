//*                   无对象的数组                */
//* 使用set  时间复杂度O(n)
function uniqueArray(array) {
  return [...new Set(array)];
}

//* 使用map  时间复杂度O(n)
function uniqueArray(array) {
  const memo = new Map();
  return array.filter((item) => {
    if (!memo.has(item)) {
      memo.set(item, 1);
      return true; //! memo中没有表示是第一次，需要保留
    }
    //! 如果memo中有就不保留
    return false;
  });
}

//* indexOf(item)第一个出现的位置  时间复杂度O(n^2)
function uniqueArray(array) {
  return array.filter((item, index) => array.indexOf(item) === index);
}

// 测试
const arry = [1, 2, 3, 5, 2, 3, "aa", "3", "aa"];
console.log(uniqueArray(arry));

//*                   含有对象的数组                */
// 普通变量还是可以通过 === 判断,所以添加针对对象的逻辑
const arry_ = [
  { a: 1, b: 2 },
  { b: 2, a: 1 },
  { a: 1, n: 2, c: { a: 1, b: 2 } },
  { b: 2, a: 1, c: { b: 2, a: 1 } },
];

for (let i = 0; i < arry_.length; i++) {
  for (let j = i + 1; j < arry_.length; j++) {
    // 修正1：j = i + 1
    if (deepEqual(arry_[i], arry_[j])) {
      arry_.splice(j, 1);
      j--; // 调整索引
    }
  }
}

function isObject(val) {
  return typeof val === "object" && val !== null;
}

function deepEqual(val1, val2) {
  if (!isObject(val1) || !isObject(val2)) return val1 === val2;

  const keys1 = Object.keys(val1);
  const keys2 = Object.keys(val2);
  if (keys1.length !== keys2.length) return false;

  for (const key of keys1) {
    if (!(key in val2) || !isEqual(val1[key], val2[key])) {
      return false;
    }
  }
  return true;
}
