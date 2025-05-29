// 使用map保存el 绑定的value 这里是一个回调函数
const map = new WeakMap();

// 这个对象可以监听多个dom元素的resize, 如果 entries中包含多个dom元素
const ob = new ResizeObserver((entries) => {
  for (const entry of entries) {
    const handler = map.get(entry.target);
    if (handler) {
      handler({
        //! borderBoxSize 会获取到el中所有的盒子信息(li元素前面的点也算一个盒子)
        //! 不使用宽度和高度是考虑到盒子的排布方式不一定是从上到下的
        width: entry.borderBoxSize[0].blockSize,
        height: entry.borderBoxSize[0].inlineSize,
      });
    }
  }
});

export default {
  mounted(el, binding) {
    // 监听元素的尺寸变化
    map.set(el, binding.value); // binding.value 是指令传入的回调函数
    ob.observe(el);
  },
  unmounted() {
    ob.unobserve(el);
  },
};
