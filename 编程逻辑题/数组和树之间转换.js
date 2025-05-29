const flatArray = [
  { id: 1, parentId: null, name: "root1" },
  { id: 2, parentId: 1, name: "child1" },
  { id: 3, parentId: 1, name: "child2" },
  { id: 4, parentId: 2, name: "grandchild1" },
  { id: 5, parentId: 3, name: "grandchild2" },
];

//* 数组转树
function flatArrayToTree(array) {
  const id2node = new Map();
  const res = []; 
  for (const item of array) {
    id2node.set(item.id, { ...item, children: [] });
  }
  for (const item of array) {
    //! 直接取反判断会误判0
    if (item.parentId === null) {
      res.push(id2node.get(item.id));
    } else {
      id2node.get(item.parentId).children.push(id2node.get(item.id));
    }
  }
  return res;
}

//* 树转数组
function treeToArray(tree) {
  const res = [];

  function helper(node) {
    const { children, ...nodeWithoutChildren } = node; //* 从树节点中解构出普通节点
    res.push(nodeWithoutChildren);

    if (children && children.length > 0) {
      for (const child of children) {
        helper(child);
      }
    }
  }
  // 处理每个顶层的节点
  for (const node of tree) {
    helper(node);
  }
  return res;
}

// 测试输出
function deepClone(obj) {
  if (obj == null || typeof obj !== "object") {
    return obj;
  }

  const objCopy = Array.isArray(obj) ? [] : {};

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      objCopy[key] = obj[key];
    }
  }

  return objCopy;
}
const tree = flatArrayToTree(flatArray);
console.log("数组转树:", tree);
// const cloneTree = deepClone(tree);
// console.log(treeToArray(cloneTree));
