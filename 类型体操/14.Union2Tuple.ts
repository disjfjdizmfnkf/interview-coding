// 将联合类型转换为元组类型

// type a1 = UnionToTuple<"a" | "b" | "c">; // ["a", "b", "c"]

// 1. 先将联合类型转换为交叉类型, 利用 条件类型触发分发 参数逆变
type UnionToIntersection<T> = (T extends any ? (input: T) => any : never) extends (
  input: infer R
) => any
  ? R
  : never;
// 2. 提取交叉类型的最后一个类型, 
type LastInUnion<T> = UnionToIntersection<T extends any ? (x: T) => any : never> extends (
  x: infer R
) => any
  ? R
  : never;
// 3. 递归构建元组类型
type UnionToTuple<T, R extends any[] = []> = [T] extends [never]
  ? R
  : UnionToTuple<Exclude<T, LastInUnion<T>>, [LastInUnion<T>, ...R]>;
// test
type a1 = UnionToTuple<"a" | "b" | "c">;
