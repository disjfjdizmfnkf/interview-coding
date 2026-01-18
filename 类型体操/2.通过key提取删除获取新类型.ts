interface Person {
  name: string;
  age: number;
  address: string;
}

// 判断两个类型是否相同
// NOTE:
// 1. 把 T 包在函数 () => T 里时，它就变成了一个函数类型, 不会被分布式特性影响
// 2. 使用一个无约束泛型 G，利用 TS 对泛型函数兼容性的检查机制（全称量词 ∀G）
// 3. 使用函数是TS中引入一个局部变量的手段
// 4. 在下面的判断中，实际上G是一个同步的变量
type IsEqual<T, U> = (<G>() => G extends T ? 1 : 2) extends <G>() => G extends U
  ? 1
  : 2
  ? true
  : false;

// 不严格, any可以赋值给任何类型，任何类型也可以赋值给any, { x: 1 } 和 { readonly x: 1 } 是可以互相赋值的（鸭子类型）
// type IsEqual<T, U> = [T] extends [U]
//   ? [U] extends [T]
//     ? true
//     : false
//   : false;

// --- 实战应用：根据值类型提取键 ---

// 1. 提取出值类型为 ValueType 的键名 (返回联合类型)
type ExtractKeysByValueType<T, ValueType> = {
  [K in keyof T]: IsEqual<T[K], ValueType> extends true ? K : never;
}[keyof T];

// 2. 剔除掉值类型为 ValueType 的键名
type OmitKeysByValueType<T, ValueType> = {
  [K in keyof T]: IsEqual<T[K], ValueType> extends true ? never : K;
}[keyof T];

type ExtractKeysByValueType_<T, ValueType, Omit = false> = {
  [K in keyof T]: IsEqual<T[K], ValueType> extends true
    ? Omit extends true
      ? never
      : K
    : Omit extends true
      ? K
      : never;
}[keyof T];

// --- 测试用例 ---

type Test1 = ExtractKeysByValueType<Person, string>; // 预期: "name" | "address"
type Test2 = ExtractKeysByValueType<Person, number>; // 预期: "age"
type Test3 = OmitKeysByValueType<Person, string>; // 预期: "age"

// 验证 IsEqual 的特殊情况
type Check1 = IsEqual<string, string>; // true
type Check2 = IsEqual<string, number>; // false
type Check3 = IsEqual<{ a: 1 }, { a: 1 }>; // true
type Check4 = IsEqual<any, 1>; // false (如果直接用 extends 会因为 any 的特性误判，这里不会)


export {};