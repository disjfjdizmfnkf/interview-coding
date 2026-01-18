// NOTE: 将字符串类型转换为首字母大写
type CapitalizeString<S extends string> = S extends `${infer First}${infer Rest}`
  ? `${Uppercase<First>}${Rest}`
  : S;

type CapitalizeString2<S> = S extends string ? Capitalize<S> : S;
// test
type CapitalizeStringTest = CapitalizeString<"hello world">;

// NOTE: 获取字符串字面量的第一个字符
type FirstCharacter<S extends string> = S extends `${infer First}${infer Rest}` ? First : never;
// test
type FirstCharacterTest = FirstCharacter<"hello">; // "h"

// NOTE: 获取字符串字面量的最后一个字符
// 递归地左右拆分,保存上一轮拆分的左侧字符,直到无法拆分为止( <左侧任意字符>, "") 之后就无法拆分了
type LastCharacter<S extends string, R = never> = S extends `${infer Left}${infer Rest}`
  ? LastCharacter<Rest, Left>
  : R;
// test
type LastCharacterTest = LastCharacter<"hello">; // "o"

// NOTE: 字符串转换为元组类型
type StringToTuple<S extends string, R extends any[] = []> = S extends `${infer First}${infer Rest}`
  ? StringToTuple<Rest, [...R, First]>
  : R;
// test
type StringToTupleTest = StringToTuple<"hello">; // ["h", "e", "l", "l", "o"]

// NOTE: 元组转换为字符串
type TupleToString<T extends any[], R extends string = ""> = T extends [infer F, ...infer Rest]
  ? TupleToString<Rest, `${R}${F & string}`>
  : R;
// test
type TupleToStringTest = TupleToString<["h", "e", "l", "l", "o"]>; // "hello"

// NOTE: Repeat字符串N次
type RepeatString<S extends string, N extends number, R extends any[] = []> = R["length"] extends N
  ? ""
  : `${S}${RepeatString<S, N, [...R, any]>}`;
// test
type RepeatStringTest = RepeatString<"ab", 3>; // "ababab"

// NOTE: split字符串分割
type SplitString<S extends string, D extends string> = S extends `${infer First}${D}${infer Rest}`
  ? [First, ...SplitString<Rest, D>]
  : [S];
// test
type SplitStringTest1 = SplitString<"a-b-c-d", "-">; // ["a", "b", "c", "d"]
type SplitStringTest2 = SplitString<"hello world", " ">; // ["hello", "world"]

// NOTE: 获取字符串长度
type LengthOfString<
  T extends string,
  R extends any[] = []
> = T extends `${infer First}${infer Rest}` ? LengthOfString<Rest, [...R, First]> : R["length"];
//test
type LengthOfStringTest1 = LengthOfString<"hello">; // 5
type LengthOfStringTest2 = LengthOfString<"">; // 0

// NOTE: 驼峰命令转换为连接符命令
type CamelToKebabCase<S extends string> = S extends `${infer First}${infer Rest}`
  ? Rest extends Uncapitalize<Rest>
    ? `${Lowercase<First>}${CamelToKebabCase<Rest>}`
    : `${Lowercase<First>}-${CamelToKebabCase<Rest>}`
  : S;
// test
type CamelToKebabCaseTest = CamelToKebabCase<"helloWorldTest">; // "hello-world-test"

// NOTE: 连接符命名转换为驼峰命名
type KebabToCamelCase<S extends string> = S extends `${infer First}-${infer Rest}`
  ? `${First}${KebabToCamelCase<Capitalize<Rest>>}`
  : S;
// test
type KebabToCamelCaseTest = KebabToCamelCase<"hello-world-test">; // "helloWorldTest"

// NOTE: 连接符命名转换为驼峰命名(首字母大写)
type KebabToPascalCase<S extends string> = S extends `${infer First}-${infer Rest}`
  ? `${Capitalize<First>}${KebabToPascalCase<Capitalize<Rest>>}`
  : Capitalize<S>;

// NOTE: Include 判断字符串中是否包含某个子串
type IncludesSubstring<S extends string, Sub extends string> = S extends ""
  ? Sub extends ""
    ? true
    : false
  : Sub extends ""
  ? false
  : S extends `${infer _Prefix}${Sub}${infer _Suffix}`
  ? true
  : false;
//test
type a1 = IncludesSubstring<"hello world", "world">; // true
type a2 = IncludesSubstring<"hello", "">; // false
type a3 = IncludesSubstring<"", "">; // true 空字符串

// NOTE: Trim 去除字符串两端空格
type Trim<S extends string> = S extends ` ${infer Rest}`
  ? Trim<Rest>
  : S extends `${infer Rest} `
  ? Trim<Rest>
  : S;
// 去除空格和无效字符
// type Trim<S extends string> = S extends ` ${infer Rest}` | S extends `\t${infer Rest}` | S extends `\n${infer Rest}` | S extends `\r${infer Rest}`
//   ? Trim<Rest>
//   : S extends `${infer Rest} ` | S extends `${infer Rest}\t` | S extends `${infer Rest}\n` | S extends `${infer Rest}\r`
//   ? Trim<Rest>
//   : S;
// test
type TrimTest1 = Trim<"  hello world  ">; // "hello world"
type TrimTest2 = Trim<"hello">;

// NOTE: Replace
type Replace<
  S extends string,
  From extends string,
  To extends string
> = S extends `${infer Start}${From}${infer End}` ? `${Start}${To}${End}` : S;
// test
type ReplaceTest1 = Replace<"hello world", "world", "TypeScript">; // "hello TypeScript"

// NOTE: ReplaceAll
type ReplaceAll<
  S extends string,
  From extends string,
  To extends string
> = S extends `${infer Start}${From}${infer End}` ? `${Start}${To}${ReplaceAll<End, From, To>}` : S;
// test
type ReplaceAllTest1 = ReplaceAll<"hello world world", "world", "TypeScript">; // "hello TypeScript TypeScript"

// 导出所有
export {
  CapitalizeString,
  FirstCharacter,
  LastCharacter,
  StringToTuple,
  TupleToString,
  RepeatString,
  SplitString,
  LengthOfString,
  CamelToKebabCase,
  KebabToCamelCase,
  IncludesSubstring,
  KebabToPascalCase,
  Trim,
  Replace,
  ReplaceAll,
};
