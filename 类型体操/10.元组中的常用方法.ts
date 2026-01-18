// shift
type TupleShift<T extends any[]> = T extends [any, ...infer Rest] ? Rest : [];

// push
type TuplePush<T extends any[], V> = [...T, V];

// reverse: R存放已经反转好的元组
type TupleReverse<T extends any[], R extends unknown[] = []> = T extends [
  infer First,
  ...infer Rest
]
  ? TupleReverse<Rest, [First, ...R]>
  : R;
// test
type TupleReverseTest1 = TupleReverse<["1", "2", "3"]>; // ['3', '2', '1']

// flat
type TupleFlat<T extends any[]> = T extends [infer First, ...infer Rest]
  ? First extends any[]
    ? [...TupleFlat<First>, ...TupleFlat<Rest>]
    : [First, ...TupleFlat<Rest>]
  : [];
// test
type TupleFlatTest1 = TupleFlat<["1", ["2", "3"], [["4"], "5"]]>; // ['1', '2', '3', '4', '5']

// repeat
type TupleRepeat<T, N extends number, R extends any[] = []> = R["length"] extends N
  ? R
  : TupleRepeat<T, N, [...R, T]>;
// test
type TupleRepeatTest1 = TupleRepeat<"a", 3>; // ['a', 'a', 'a']

// filter
type TupleFilter<T extends any[], F> = T extends [infer First, ...infer Rest]
  ? First extends F
    ? TupleFilter<Rest, F>
    : [First, ...TupleFilter<Rest, F>]
  : [];
// test
type TupleFilterTest1 = TupleFilter<["a", 1, "b", 2, "c"], number>; // ['a', 'b', 'c']

// FindIndexOf
type TupleFindIndexOf<T extends any[], V, R extends any[] = []> = T extends [
  infer First,
  ...infer Rest
]
  ? First extends V
    ? R["length"]
    : TupleFindIndexOf<Rest, V, [...R, any]>
  : -1;
// test
type TupleFindIndexOfTest1 = TupleFindIndexOf<["a", "b", "c", "d"], "c">; // 2

// repeat
type Repeat<T, N extends number, R extends any[] = []> = R["length"] extends N
  ? R
  : Repeat<T, N, [...R, T]>;
type a = Repeat<"a", 3>; // ['a', 'a', 'a']
type b = Repeat<1, 4>; // [1, 1, 1, 1]

// 获取元组的第一个元素和最后一个元素
type TupleFirst<T extends any[]> = T extends [infer First, ...any[]] ? First : never;
type TupleLast<T extends any[]> = T extends [...any[], infer Last] ? Last : never;
// test
type TupleFirstTest1 = TupleFirst<["1", "2", "3"]>;
type TupleLastTest1 = TupleLast<["1", "2", "3"]>;

// 计算元组的长度
type TupleLength<T extends any[]> = T["length"];
// test
type TupleLengthTest1 = TupleLength<[]>;
type TupleLengthTest2 = TupleLength<[number, string, boolean]>;

// Filter 按照类型
type FilterByType<T extends any[], U> = T extends [infer First, ...infer Rest]
  ? First extends U
    ? [First, ...FilterByType<Rest, U>]
    : FilterByType<Rest, U>
  : [];
// test
type FilterByTypeTest1 = FilterByType<[1, "2", 3, "4", true, false], string>;

// TupleToEnum
type TupleToEnum<T extends string[], R extends Record<string, string> = {}> = T extends [
  infer First extends string,
  ...infer Rest extends string[]
]
  ? TupleToEnum<Rest, R & { [K in First]: First }>
  : R;
// test
type TupleToEnumTest1 = TupleToEnum<["A", "B", "C"]>; // { A: 'A'; B: 'B'; C: 'C' }

type TupleToEnum2<T extends any[], I extends boolean = false> = {
  [K in T[number] as I extends true ? TupleFindIndexOf<T, K> : K & string]: K;
};

// Slice
type Slice<
  T extends any[],
  Start extends number = 0,
  End extends number = T["length"],
  R extends any[] = [],
  I extends any[] = [],
  Started extends boolean = false
> = T extends [infer F, ...infer Rest]
  ? I["length"] extends End
    ? R
    : Started extends true
    ? Slice<Rest, Start, End, [...R, F], [...I, any], true>
    : I["length"] extends Start
    ? Slice<Rest, Start, End, [...R, F], [...I, any], true>
    : Slice<Rest, Start, End, R, [...I, any], false>
  : R;
// test
type SliceTest1 = Slice<["a", "b", "c", "d", "e"], 1, 4>; // ['b', 'c', 'd']
type SliceTest2 = Slice<["a", "b", "c", "d", "e"], 0, 3>; // ['a', 'b', 'c']
type SliceTest3 = Slice<["a", "b", "c", "d", "e"], 2>; // ['c', 'd', 'e']
type SliceTest4 = Slice<[any], 2>; // []
type SliceTest5 = Slice<[], 0>; // []

// Splice
type Drop<T extends any[], N extends number, C extends any[] = []> = C["length"] extends N
  ? T
  : T extends [any, ...infer R]
  ? Drop<R, N, [...C, any]>
  : [];

type Splice<
  T extends any[],
  Start extends number,
  DeleteCount extends number = 0,
  Insert extends any[] = [],
  L extends any[] = []
> = T extends [infer F, ...infer R]
  ? L["length"] extends Start
    ? [...L, ...Insert, ...Drop<T, DeleteCount>]
    : Splice<R, Start, DeleteCount, Insert, [...L, F]>
  : [...L, ...Insert];

// tests
type SpliceTest1 = Splice<["a", "b", "c", "d"], 1, 2, ["x", "y"]>; // ['a', 'x', 'y', 'd']
type SpliceTest2 = Splice<["a", "b", "c"], 1, 0, ["x"]>; // ['a', 'x', 'b', 'c']
type SpliceTest3 = Splice<["a", "b", "c"], 5, 1, ["z"]>; // ['a', 'b', 'c', 'z']

export {};
