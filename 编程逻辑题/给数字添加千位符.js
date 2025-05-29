/* 
`\s` 匹配space空白字符
`\d` digits 数字
(\d) 创建一个数字捕获组，第一个用来捕千分位
(?=) 正向前瞻,main表达式之后必须满足括号内的条件，并且这个不会包含在结果中
(?=(\d{3})+) 匹配 三的倍数个数字
(?!\d) 负向后瞻, main表达式之后不能有的东西 这里是数字
(?=(\d{3})+(?!\d)) 将这两个结合才能保证main表达式之后必须是3的倍数，并且三位数字组后面没有额外的数字
*/

function numberThousands(number, thousandsSeperator = ",") {
  return String(number).replace(/(\d)(?=(\d{3})+$)/g, '$1' + thousandsSeperator);
  //! 错误示例, /(\d)(?=(\d{3}+)$)/g {3}和+都是量词,要分开 
}

console.log(numberThousands(1234567890));
