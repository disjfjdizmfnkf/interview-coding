// 对这样一个嵌套数组进行dfs bfs遍历
const nestedArray = [1, [2, 3], [4, [5, 6]], 7];

function bfs(list) {
  //! 和树的广度优先遍历只有加入节点的过程不同
  //* 获取每层的长度之后 从queue中获取前len个
  const queue = [list];
  while (queue.length) {
    const len = queue.length;
    for (let i = 0; i < len; i++) {
      const cur = queue.shift();
      if (Array.isArray(cur)) {
        queue.push(...cur); //! 是将子节点加入队列
      } else {
        console.log(cur);
      }
    }
  }
}

// 示例
console.log("bfs:");
bfs(nestedArray);
// 输出顺序：1, 7, 2, 3, 4, 5, 6

function dfs(list) {
  for (const item of list) {
    if (Array.isArray(item)) {
      dfs(item);
    } else {
      console.log(item);
    }
  }
}
console.log("dfs:");
dfs(nestedArray);
