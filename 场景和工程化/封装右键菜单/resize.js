// 使用map保存el 绑定的value 这里是一个回调函数
const map = new WeakMap();

// 这个对象可以监听多个dom元素的resize, 如果 entries中包含多个dom元素
const ob = new ResizeObserver((entries) => {
  for (const entry of entries) {
    const handler = map.get(entry.target);
    if (handler) {
      // 修正尺寸获取方式
      const width = entry.contentRect.width;
      const height = entry.contentRect.height;
      handler({ width, height });
    }
  }
});

export default {
  mounted(el, binding) {
    // 监听元素的尺寸变化
    map.set(el, binding.value); // binding.value 是指令传入的回调函数
    ob.observe(el);
  },
  unmounted(el) {
    // 修复缺少el参数的问题
    ob.unobserve(el);
    map.delete(el);
  },
};
