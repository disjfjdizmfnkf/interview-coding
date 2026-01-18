interface Action<T> {
  type: T;
  payload: any;
}

interface Module {
  count: number;
  message: string;
  asyncMethod<T, U>(input: Promise<T>): Promise<Action<U>>;
  syncMethod<T, U>(input: T): Action<U>;
}

type Transform<X> = X extends (input: Promise<infer T>) => Promise<Action<infer U>>
  ? (input: Promise<T>) => Action<U>
  : X extends (input: infer T) => Action<infer U>
  ? (input: T) => Action<U>
  : never;

type Connect<T> = {
  [K in keyof T as T[K] extends (...args: any[]) => any ? K : never]: Transform<T[K]>;
};

// 这个要求的结果
type Result = {
  asyncMethod<T, U>(input: Promise<T>): Action<U>;
  syncMethod<T, U>(input: T): Action<U>;
};
type F = Connect<Module>;
// 实现类型connect, 要求结果和result一致
// 如果函数是异步函数要求自动解析出来promise中的类型

export {};
