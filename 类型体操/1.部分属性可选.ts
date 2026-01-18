// 创建一个案例类有多个属性
interface Person {
  name: string;
  age: number;
  address: string;
}

// 将部分属性设为可选
type PartialPerson<T extends object, K extends keyof T> = Partial<Pick<T, K>> &
  Omit<T, K>;

type Computed<T> = {
  [P in keyof T]: T[P];
};

type p = Computed<PartialPerson<Person, "age" | "address">>;

export {};