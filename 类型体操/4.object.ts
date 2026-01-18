// 4.对象 交 差 并 补
interface A {
  address: string;
  phone: string;
}

// B 也是A的全集
interface B {
  name: string;
  address: string;
  phone: string;
}

// NOTE 交集
type ObjectInter<T extends object, U extends object> = Pick<
  T,
  Extract<keyof T, keyof U>
>;
type R1 = ObjectInter<B, A>;

// NOTE 差集 A - B: A 中有但 B 中没有的键
type ObjectDiff<T extends object, U extends object> = Pick<
  T,
  Exclude<keyof T, keyof U>
>;
type R2 = ObjectDiff<A, B>; // { name: string }

// NOTE 补集 ∁ᵤT: 在全集 U 中，但不在 T 中的键
// 要求 T 是 U 的子类型，U 是全集
type ObjectComplement<T extends U, U extends object> = Pick<
  U,
  Exclude<keyof U, keyof T> // 注意：是 U - T，不是 T - U
>;
type R3 = ObjectComplement<B, A>; // { name: string }

// NOTE 并集 A ∪ B: 包含 A 和 B 的所有键（B 的类型会覆盖 A）
type ObjectUnion<T extends object, U extends object> = Omit<T, keyof U> & U;
type R4 = ObjectUnion<A, B>; // { name: string; address: string; phone: string }

// NOTE 对称差集 A ⊕ B: (A - B) ∪ (B - A)，只在 A 或 B 中出现的键
type ObjectSymmetricDiff<T extends object, U extends object> = Pick<
  T & U,
  Exclude<keyof T, keyof U> | Exclude<keyof U, keyof T>
>;
type R5 = ObjectSymmetricDiff<A, B>; // { name: string }

// NOTE 重写：用 B 的类型覆盖 A 中同名的键
type OverWrite<A extends object, B extends object> = Omit<A, keyof B> & B;
type R6 = Compute<OverWrite<A, B>>;

export {};
