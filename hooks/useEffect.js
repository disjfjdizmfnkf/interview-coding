/**
 * 1. state/props 变化触发重新渲染
 * 2. 组件函数重新执行，依赖数组重新计算
 * 3. 浅比较依赖函数，
 *  3.1 依赖不变: 直接跳转到步骤5
 *  3.2 依赖变化: 将回调函数加入异步任务队列
 * 4. 渲染提交: 执行副作用函数在 useLayoutEffect的回调执行完毕后（同步执行）开始执行 useEffect的异步回调（通过 requestIdleCallback或 setTimeout调度）
 * 5. 如果有上一次的清除函数，会在新回调执行前运行
 *
 */
let hookIndex = 0;
const hookStates = []; // 存储所有 hook 的状态，而不仅仅是 useEffect

const useEffect = (callback, deps) => {
  const currentIndex = hookIndex;
  const oldState = hookStates[currentIndex];
  const oldDeps = oldState?.deps;
  // 检查依赖是否发生变化
  let hasChanged = true; // 默认为变化
  if (oldDeps) {
    // 如果旧依赖存在，则进行比较
    if (deps && deps.length === oldDeps.length && deps.every((item, index) => item === oldDeps[index])) {
      hasChanged = false;
    }
  }
  // 如果依赖数组为空(undefined)或发生变化，执行回调
  if (hasChanged) {
    // 在执行新 effect 之前，先执行上一次的清理函数
    if (oldState?.cleanup) {
      oldState.cleanup();
    }
    // 模拟异步执行 effect
    // 在真实 React 中，这会由调度器在绘制后执行
    setTimeout(() => {
      const cleanup = callback();
      hookStates[currentIndex] = {
        deps,
        cleanup: typeof cleanup === "function" ? cleanup : null,
      };
    });
  }
  hookIndex++;
};

// 模拟 React 的渲染过程
function render(Component) {
  hookIndex = 0; // 每次渲染前重置 hook 索引
  Component();
  console.log("Render complete.");
}

// --- 下面是测试代码 ---

let count = 0;
let name = "React";

function MyComponent() {
  useEffect(() => {
    console.log(`Effect for count: ${count}`);
    return () => {
      console.log(`Cleanup for count: ${count}`);
    };
  }, [count]);

  useEffect(() => {
    console.log(`Effect for name: ${name}`);
    return () => {
      console.log(`Cleanup for name: ${name}`);
    };
  }, [name]);

  useEffect(() => {
    console.log("This effect runs only once");
    return () => {
      console.log("Cleanup for the single run effect");
    };
  }, []);
}

console.log("--- First Render ---");
render(MyComponent);

// 模拟 state 更新
setTimeout(() => {
  console.log("\n--- Second Render (count changed) ---");
  count = 1;
  render(MyComponent);
}, 100);

setTimeout(() => {
  console.log("\n--- Third Render (no change) ---");
  // 依赖没有变化，effect 不会执行
  render(MyComponent);
}, 200);

setTimeout(() => {
    console.log("\n--- Fourth Render (name changed) ---");
    name = "Hooks";
    render(MyComponent);
}, 300);