const [val, setVal] = useState(0);
// * 1. 更新数据之后重新渲染
// * 2. 重新渲染会多次执行赋值操作
// * 3. 多次使用hook

let stateIndex = 0;
let state = [];

function useState(initValue) {
  const currentIndex = stateIndex;  // 闭包保存当前索引

  state[currentIndex] = initValue === undefined ? state[currentIndex] : initValue;

  const setState = function (newValue) {
    state[currentIndex] = newValue;
    render(); // 重新渲染视图
  };
  stateIndex++;
  return [state[currentIndex], setState];
}

function render() {
  stateIndex = 0; //* 重新渲染时重置顺序
  console.log("触发重新渲染");
}
