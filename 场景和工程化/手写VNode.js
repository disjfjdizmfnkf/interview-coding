const vnode = {
  tag: "div", // 标签名
  props: { id: "app", className: "container" }, // 属性
  children: [
    // 子节点
    {
      tag: "h1",
      props: { className: "title" },
      children: ["Hello, World!"],
    },
    {
      tag: "p",
      props: { className: "description" },
      children: ["This is a virtual DOM example."],
    },
  ],
};
