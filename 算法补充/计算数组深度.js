const getArrayDepth = (array) => {
  return array.reduce(
    (pre, cur) => Math.max(pre, Array.isArray(cur) ? getDepth(cur) + 1 : 0),
    1
  );
};

function getArrayDepth(array) {
  let maxDepth = 0;
  for (const item of array) {
    maxDepth = Math.max(
      maxDepth,
      Array.isArray(item) ? getArrayDepth(item) + 1 : 1
    );
  }
  return maxDepth;
}

function getArrayDepth(array) {
  if (!Array.isArray(array)) return 0;

  let maxDepth = 0;
  const stack = [{ arr: array, depth: 0 }];
  while (stack.length > 0) {
    const { arr, depth } = stack.pop();
    maxDepth = Math.max(maxDepth, depth);

    if (Array.isArray(arr)) {
      for (const item of arr) {
        stack.push({ arr: item, depth: depth + 1 });
      }
    }
  }
  return maxDepth;
}

// 示例用法
const arr0 = [];
console.log(getArrayDepth(arr0)); // 输出: 0

const arr1 = [1, 2, 3];
console.log(getArrayDepth(arr1)); // 输出: 1

const arr2 = [1, [2, [3]]];
console.log(getArrayDepth(arr2)); // 输出: 3

const arr3 = [1, [2, [3]], [4, 5]];
console.log(getArrayDepth(arr3)); // 输出: 3
