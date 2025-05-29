//? 字符串是不可变值, 所以这里无法实现双指针原地交换

function reverseString2(str) {
  return str.split("").reverse().join("");
}

// 示例用法
const originalString = "你好，世界";
const reversedString1 = reverseString1(originalString);
const reversedString2 = reverseString2(originalString);
console.log(reversedString1); // 输出：界世，好你
console.log(reversedString2); // 输出：界世，好你
