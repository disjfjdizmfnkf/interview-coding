//! 在一堆根节点中寻找对应id的node
function findNodeById(roots, id) {
  for (const node of roots) {
    if (node.id === id) return node;
    if (node.children) {
      const res = findNodeById(node.children, id);
      if (res) return res;
    }
  }
  return null;
}

const treeData = [
  {
    id: 1,
    name: "Node 1",
    children: [
      {
        id: 2,
        name: "Node 1.1",
        children: [
          {
            id: 3,
            name: "Node 1.1.1",
          },
        ],
      },
    ],
  },
  {
    id: 4,
    name: "Node 2",
    children: [
      {
        id: 5,
        name: "Node 2.1",
      },
    ],
  },
];

// 使用示例
const node = findNodeById(treeData, 3);
console.log(node); // 输出: { id: 3, name: 'Node 1.1.1' }
