// optionalKeys 获取对象类型中可选属性的联合类型
type OptionalKeys<T extends object> = {
  // 如果k是可选的 {} 可以赋值给它,反之则不能
  // -? 取消可选属性修饰符
  // [keyof T] 获取对象T的所有键的联合类型
  // <Obj>[keyof Obj] 获取值的联合类型
  [K in keyof T]-?: {} extends Pick<T, K> ? K : never; // 如果不是可选类型返回值为never
}[keyof T];
// test
type OptionalKeysTest1 = OptionalKeys<{ a: number; b?: string; c?: boolean }>; // "b" | "c"

// pickOptional 从对象类型中提取可选属性
type PickOptional<T extends object> = Pick<T, OptionalKeys<T>>;
// test
type PickOptionalTest1 = PickOptional<{ a: number; b?: string; c?: boolean }>;

// RequiredKeys
type RequiredKeys<T extends object> = Omit<T, OptionalKeys<T>>;
// test
type RequiredKeysTest1 = RequiredKeys<{ a: number; b?: string; c?: boolean }>;

// IsNever 判断类型是否为 never
type IsNever<T> = [T] extends [never] ? true : false;
// test
type IsNeverTest1 = IsNever<never>; // true
type IsNeverTest2 = IsNever<string>; // false

// IsEmptyObject 判断类型是否为空对象 {}
type IsEmptyObject<T> = [T] extends [never]
  ? false // 排除 never
  : 0 extends 1 & T
  ? false // 排除 any
  : (<G>() => G extends {} ? 1 : 2) extends <G>() => G extends T ? 1 : 2
  ? true
  : false;
// test
type IsEmptyObjectTest1 = IsEmptyObject<{}>; // true
type IsEmptyObjectTest2 = IsEmptyObject<{ a: number }>; // false
type IsEmptyObjectTest4 = IsEmptyObject<any>; // false
type IsEmptyObjectTest5 = IsEmptyObject<string>; // false
type IsEmptyObjectTest6 = IsEmptyObject<object>; // false
type IsEmptyObjectTest7 = IsEmptyObject<Object>; // false

// IsAny
// 任何类型都可以赋值给any, any与任意类型交叉仍是any
// unkonwn 只能赋值给 any 和 unknown 自身
type IsAny<T> = 0 extends 1 & T ? true : false;
// test
type A = IsAny<any>; // true  （1 & any -> any，0 extends any 为 true）
type B = IsAny<unknown>; // false （1 & unknown -> 1，0 extends 1 为 false）
type C = IsAny<number>; // false （1 & number -> 1，0 extends 1 为 false）
type D = IsAny<never>; // false （1 & never -> never，0 extends never 为 false）

export {};
