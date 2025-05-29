//* 半径为1, 圆心在原点的圆, 使用正方形外切
function calculatePI(iterations) {
  let insideCircleCount = 0;

  for (let i = 0; i < iterations; i++) {
    const x = Math.random();
    const y = Math.random();
    // 判断距离原点的距离
    if (x * x + y * y <= 1) insideCircleCount++;
  }

  // 圆的面积是 π * r * r / 正方形面积 r * r = π
  // 因此 π ~= 圆内点的个数 / 正方形内点的个数
  const pi = (4 * insideCircleCount) / iterations;

  return pi;
}

// 使用10000次迭代来计算PI的值
const estimatedPI = calculatePI(100000000);
console.log(`Estimated PI: ${estimatedPI}`);
