// 接收一个多维数组 和想要展开的深度
function flatten(list, depth = 1) {
  if (depth === 0) return list;
  return list.reduce(
    // 累计器 传入a: 累计结果数组 b: 当前迭代的元素
    // concat函数合并数组而不会改变原有数组,并且在拼接时相当于展开了一层数组
    (a, b) => a.concat(Array.isArray(b) ? flatten(b, depth - 1) : b),
    // 当前值
    []
  );
}

// 直接将一个多维数组转换为一维
function _flatten(list) {
  return list.reduce((a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []);
}

// 对展开后的数组排序
function quickSort(list) {
  if (list.length <= 1) return list;

  // 随机pivot减少最坏情况的概率
  const pivotIndex = Math.floor(Math.random() * list.length);
  const pivot = list[pivotIndex];
  const left = [],
    right = [];
  for (let i = 0; i < list.length; i++) {
    if (i === pivotIndex) continue;
    if (list[i] > pivot) right.push(list[i]);
    else left.push(list[i]);
  }
  return [...quickSort(left), pivot, ...quickSort(right)];
}

// 对展开后的数组去重
function foo(list) {
  let index = 0;
  for (const num of list) {
    //! index当前位置是等待改变的 和index之前的位置比较 第一个数直接赋值
    if (index < 1 || num > list[index - 1]) {
      list[index] = num;
      index++;
    }
  }
  return list.slice(0, index + 1);
}

// test
list1 = [[1, 2], [3], 4];
console.log(flatten(list1));
// concat的效果
// const list1 = [1, 2, 3];
// const list2 = [5];
// const num = 4;
// console.log(list1.concat(list2));
// console.log(list1.concat(num));
