// 5. 模式匹配, 推断函数最后一个参数的类型
function sum(a: string, b: string, c: number) {}

type InferLastParameter<T extends Function> = T extends (
  ...args: [...infer Rest, infer Last]
) => any
  ? Last
  : never;

type R = InferLastParameter<typeof sum>; // number
