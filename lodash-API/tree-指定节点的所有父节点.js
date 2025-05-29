const list = [
  {
    id: 1,
    children: [
      {
        id: 3,
        children: [
          {
            id: 4,
          },
        ],
      },
    ],
  },
  {
    id: 2,
    children: [
      {
        id: 5,
        children: [
          {
            id: 6,
          },
        ],
      },
    ],
  },
];
// 输入6返回[5,2]
// 输入3返回[1]

function getAncestors(arr, targetId) {
  // 记录所有子节点id到父节点的id映射
  const parentId = new Map();
  function buildMap(node, parent) {
    // 如果有父节点，设置映射
    if (parent) {
      parentId.set(node.id, parent.id);
    }
    // 如果有子节点, 递归执行
    if (node.children) {
      node.children.forEach((child) => {
        buildMap(child, node);
      });
    }
  }
  arr.forEach((root) => {
    buildMap(root);
  });

  const res = [];
  while (parentId.has(targetId)) {
    targetId = parentId.get(targetId);
    res.push(targetId);
  }
  return res;
}

console.log(getAncestors(list, 6));
console.log(getAncestors(list, 3));
