function distributeRedPackets(totalAmount, numPackets, minAmount, maxAmount) {
  const results = []; // 存储所有可能的分配方案
  const currentCombination = []; // 当前分配方案

  // 借助currentMin维护结果中的红包递增, 保证元素不重复  
  function backtrack(remainingAmount, currentMin, remainingPackets) {
    // 如果金额分配完成且没有剩余红包
    if (remainingAmount === 0) {
      if (remainingPackets === 0) {
        results.push([...currentCombination]); // 保存当前分配方案
      }
      return;
    }

    // 剪枝：如果剩余金额无法满足条件，直接返回
    if (
      remainingAmount > remainingPackets * maxAmount || // 剩余金额太大，无法分配
      remainingAmount < remainingPackets * minAmount // 剩余金额太小，无法分配
    ) {
      return;
    }

    // 计算当前允许分配的最大金额
    const maxAllocatable = Math.min(maxAmount, remainingAmount - (remainingPackets - 1) * minAmount);
    for (let currentAmount = currentMin; currentAmount <= maxAllocatable; currentAmount++) {
      currentCombination.push(currentAmount); // 选择当前金额
      backtrack(remainingAmount - currentAmount, currentAmount, remainingPackets - 1); // 递归分配剩余金额
      currentCombination.pop(); // 回溯，撤销选择
    }
  }

  backtrack(totalAmount, minAmount, numPackets);
  return results;
}

console.log(distributeRedPackets(10, 3, 1, 5));
// 输出: [[1, 4, 5], [2, 3, 5], [2, 4, 4], [3, 3, 4]]