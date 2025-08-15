const a = "1234567890123456789012345678901234567890";
const b = "4567890123456789012345678901234567890";

// 1. 使用bigInt
function sum1(a, b) {
  return BigInt(a) + BigInt(b);
}

// 2. 字符串相加
function sum2(a, b) {
  const len = Math.max(a.length, b.length);
  a = a.padStart(len, "0");
  b = b.padStart(len, "0");
  let res = "";
  let carry = 0;
  for (let i = len - 1; i >= 0; i--) {
    const sum = +a[i] + +b[i] + carry;
    carry = Math.floor(sum / 10);
    res = String(sum % 10) + res;
  }
  return (carry ? "1" : "") + res;
}

// 3.优化内存使用
function sum3(a, b) {
  let p1 = a.length - 1, p2 = b.length - 1;
  let sum, carry = 0, res = "";
  while (p1 >= 0 || p2 >= 0) {
    const digit1 = a[p1] ? +a[p1] : 0;
    const digit2 = b[p2] ? +b[p2] : 0;

    sum = digit1 + digit2 + carry;
    carry = Math.floor(sum / 10);
    res = String(sum % 10) + res;

    p1--;
    p2--;
  }
  return carry ? "1" + res : res;
}

console.log("sum1: ", sum1(a, b));
console.log("sum2: ", sum2(a, b));
console.log("sum3: ", sum3(a, b));
