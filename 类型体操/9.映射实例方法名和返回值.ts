// 9. 映射实例方法名和返回值
import { KebabToPascalCase } from "./7.字符串检测";

type a1 = {
  "handle-open": (flag: boolean) => true;
  "handle-close": (flag: boolean) => true;
  "update-model-value": (value: boolean) => true;
};

type ComponentEmitType<T extends object> = {
  [K in keyof T as `on${KebabToPascalCase<string & K>}`]: T[K] extends (...args: infer P) => any
    ? (...args: P) => void
    : never;
};

type a2 = ComponentEmitType<a1>;
// 目标结果
// {
//     onHandleOpen: (flag: boolean) => void;
//     onHandleClose: (flag: boolean) => void;
//     onUpdateModelValue: (value: boolean) => void;
// }
