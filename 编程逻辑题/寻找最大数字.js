const s = "lka1234lk12j34kl21jl43k56kl3";

function biggestNum(s) {
  let res = 0;
  let hold = "";
  for (const char of s) {
    if (!isNaN(char)) {
      hold += char;
    } else {
      res = Math.max(res, +hold);
      hold = "";
    }
  }
  return res;
}

function biggestNum(s) {
  // 使用正则表达式匹配字符串中的所有数字
  const numbers = s.match(/\d+/g);
  if (!numbers) {
    return 0;
  }
  // 将匹配到的数字字符串数组转换为数字数组
  const numArray = numbers.map(Number);
  return Math.max(...numArray);
}

// 调用函数并输出结果
console.log(biggestNum(s));
