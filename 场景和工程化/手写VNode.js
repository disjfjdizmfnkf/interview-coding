const vnode = {
  tag: "div", // 标签名
  data: {
    // 包含了属性、样式、事件等
    class: "container",
    style: { color: "red" },
    on: {
      click: this.clickHandler,
    },
  },
  children: [
    /* 子 VNode 数组 */
  ], // 子节点
  text: "hello", // 文本节点的文本内容
  elm: Node, // 对应的真实 DOM 节点引用
  key: "uniqueKey", // 用于 diff 算法的 key
  context: Component, // VNode 所在的组件实例
  // ... 其他内部属性
};
