/**
 * 将一维数组升维为指定形状的多维数组
 * @param {number[]} array - 一维数组
 * @param {number[]} shape - 目标形状，例如 [2, 3] 表示 2 行 3 列
 * @returns {number[][]} - 升维后的多维数组
 */

//! 不检查输入的简单版本
//* 对子数组构建shape维度
function reshapeArray(array, shape) {
  if (shape.length === 0) return array;

  const res = [];
  const curDim = shape[0];
  for (let i = 0; i < array.length; i += curDim) {
    //! 构建下一层
    res.push(reshapeArray(array.slice(i, i + curDim), shape.slice(1)));
  }
  return res;
}

function reshapeArray(array, shape) {
  //* 判断是否足够升高维度
  const totalSize = shape.reduce((a, b) => a * b, 1);
  if (array.length !== totalSize) return null;

  //* 对范围内的数组升维
  function buildDimension(arr, dims) {
    if (dims.length === 0) return arr;
    const size = dims[0]; //* 当前每次分组的大小
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(buildDimension(arr.slice(i, i + size), dims.slice(1)));
    }
    return result;
  }

  return buildDimension(array, shape);
}
