// 3. 子类型互斥
interface Man1 {
  infancy: string;
}

interface Man2 {
  youth: string;
}

interface Man3 {
  Old: string;
}

type ManType = Man1 | Man2 | Man3; // 联合类型

// 至少有一个属性
type ExclusiveUnion<T, U = T> = T extends any
  ? T & Partial<Record<Exclude<keyof U, keyof T>, never>>
  : never;

// 只能有一个属性
type StrictExclusiveUnion<T> = {
  [K in keyof T]: Pick<T, K> & {
    [P in Exclude<keyof T, K>]?: never;
  };
}[keyof T];

// 合并所有接口的属性
type AllManProps = Man1 & Man2 & Man3;

// 使用严格的互斥类型
type ManType2 = StrictExclusiveUnion<AllManProps>;

// 使用示例
const man1: ManType2 = { infancy: "婴儿期" }; // ✓ 正确
const man2: ManType2 = { youth: "青年期" }; // ✓ 正确
const man3: ManType2 = { Old: "老年期" }; // ✓ 正确
// const man4: ManType2 = { infancy: "婴儿期", youth: "青年期" }; // ✗ 错误：不能同时拥有多个属性

// StrictExclusiveUnion 工作原理：
// 1. 遍历所有属性键 K
// 2. Pick<T, K>: 选择当前属性
// 3. Exclude<keyof T, K>: 获取除当前属性外的所有其他键
// 4. [P in ...]?: never: 其他键设为可选never,严格禁止传入
// 5. [keyof T]: 通过索引访问生成联合类型

export {};