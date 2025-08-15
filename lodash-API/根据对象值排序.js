const obj = { a: 2, b: 1, c: 3 };

function sort(obj) {
  // 将对象转换为key-value对
  const entries = Object.entries(obj);
  entries.sort((a, b) => a[1] - b[1]);
  const newObj = {};
  for (const [key, val] of entries) {
    newObj[key] = val;
  }
  return newObj;
}

console.log(sort(obj));
