//! 在一堆根节点中寻找对应id的node
function findNodeById1(roots, id) {
  for (const node of roots) {
    if (node.id === id) return node;
    if (node.children) {
      const res = findNodeById1(node.children, id);
      if (res) return res;
    }
  }
  return null;
}

function findNodeById2(roots, id) {
  for (const item of roots) {
    const res = find(item, id);
    if (res) return res;
  }
  return null;
}

function find(item, id) {
  if (!item) return null;
  if (item.id === id) return item;

  for (const child of item.children) {
    const res = find(child, id);
    if (res) return res;
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
// 输出: { id: 3, name: 'Node 1.1.1' };
const res1 = findNodeById1(treeData, 3);
console.log("🚀 ~ res1:", res1);
const res2 = findNodeById2(treeData, 3);
console.log("🚀 ~ res2:", res2);
