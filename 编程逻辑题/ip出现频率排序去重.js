function sortByFrequencyAndRemoveDuplicates(arr) {
    // 创建一个对象来记录每个元素的出现频率
    const frequency = {};
    arr.forEach(item => {
        frequency[item] = (frequency[item] || 0) + 1;
    });

    // 去重
    const uniqueArr = [...new Set(arr)];

    // 根据频率排序
    return uniqueArr.sort((a, b) => {
        if (frequency[b] === frequency[a]) {
            return a - b; // 如果频率相同，按数值大小排序
        }
        return frequency[b] - frequency[a]; // 按频率从高到低排序
    });
}

// 示例使用
const arr = [4, 6, 2, 2, 6, 6, 4, 4, 4];
const sortedUniqueArr = sortByFrequencyAndRemoveDuplicates(arr);
console.log(sortedUniqueArr); // 输出: [4, 6, 2]
