const preDepsArray = [];
let index = 0;
const useEffect = (callback, deps) => {
  const lastDeps = preDepsArray[index];
  //* 首次执行 || 没有依赖数组(每次都要触发) || 发生变化
  const changed =
    !lastDeps || !deps || deps.some((dep, index) => dep !== lastDeps[index]);
  if (changed) {
    preDepsArray[index] = deps;
    callback(); 
  }
  index++;
};
