/**
 * @param {number[]} nums
 */
var Solution = function (nums) {
  this.nums = nums;
};

/**
 * @return {number[]}
 */
Solution.prototype.reset = function () {
  return this.nums;
};

/**
 * @return {number[]}
 */
Solution.prototype.shuffle = function () {
  const shuffle = [...this.nums];
  for (let i = 0; i < shuffle.length; i++) {
    //随机获取到数组中的一个数
    const randIndex = Math.floor(Math.random() * (shuffle.length - i));
    [shuffle[i], shuffle[randIndex]] = [shuffle[randIndex], shuffle[i]];
  }
  return shuffle;
};

/**
 * Your Solution object will be instantiated and called as such:
 * var obj = new Solution(nums)
 * var param_1 = obj.reset()
 * var param_2 = obj.shuffle()
 */
