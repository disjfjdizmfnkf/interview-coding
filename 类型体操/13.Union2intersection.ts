// 将联合类型转换为交叉类型
type A = { a: number } | { b: string } | { c: boolean };
// 期望结果: { a: number } & { b: string } & { c: boolean }
type R = UnionToIntersection<A>;
/**
 * NOTE 参数的逆变: 函数A exntends 函数B 时, 参数满足逆变, 返回值满足协变 所以B的参数 exnteds A的参数
 * A extends B（A 可赋给 B），说明 A 的参数类型是 B 的超类型（更宽）
 * 类型更窄的参数的调用更安全，因为它们可以接受更多的输入类型
 * */

type UnionToIntersection<T> = (T extends any ? (p: T) => any : never) extends (p: infer R) => any
  ? R
  : never;

export {};
