/* 
 1. split(char) 以 char为分隔符拆分字符串为数组
* 2. map(() => {}) 对数组中每项执行回调，返回新数组, map() 对于回调函数自动传入的是item, index, arr
* 3. parseInt(str, 10) string => radix 将字符串转换为几进制的数
* 4. toString(2) 
* 5. padStart(8, '0') ipv4 0~255 二进制 2^8 8 bit
  6. join('') 将数组拼接为字符串

先将字符按照 '.' 拆分为一个数组，
对于数组中的每一项，要将首先要将字符串转换为数字，再对数字进行进制转换
最后将数组拼接起来 .join('.')
*/

// 将IPv4地址转换为二进制表示
function ipv4ToBinary(ipv4) {
    return ipv4.split('.')
        .map(num => parseInt(num, 10).toString(2).padStart(8, '0'))
        .join('.');
}

// 将二进制表示转换为十进制表示
function binaryToDecimal(binary) {
    return binary.split('.')
        .map(bin => parseInt(bin, 2).toString(10))
        .join('.');
}


// 示例
const ipv4 = '192.168.1.1';
const binary = ipv4ToBinary(ipv4);
console.log(`IPv4: ${ipv4} -> Binary: ${binary}`);

const decimal = binaryToDecimal(binary);
console.log(`Binary: ${binary} -> Decimal: ${decimal}`);

function toB(ipv4) {
    const strs = ipv4.split('.');
    strs.map(str => parseInt(str, 10).toString(2)).join('.');
}