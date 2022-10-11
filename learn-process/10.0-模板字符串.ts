export {};

// 1. 基本使用
type TVersion = `${number}.${number}.${number}`;
const v1: TVersion = '1.1.0';
// const v2 : TVersion = '1.1'  // error

type foo = {
  name: string;
  age: number;
};
type ChangeListener = {
  on: (change: `${keyof foo}Changed`) => void;
};
declare let listener: ChangeListener;
listener.on('ageChanged');

// 2. 结合 keyof 与类型映射
type CopyWithRename<T extends {}> = {
  [K in keyof T as `changed_${string & K}`]: T[K];
};
type renameFoo = CopyWithRename<foo>;

// 3. 几个工具
/**
 * Uppercase、Lowercase、Capitalize、ncapitalize
 * 字符串大写、字符串小写、首字母大写、首字母小写
 */
type Uper<T extends string> = Uppercase<T>;

type CopyWithRenameAndUp<T extends {}> = {
  [K in keyof T as Uper<`changed_${string & K}`>]: T[K];
};
type renameFooAndUp = CopyWithRenameAndUp<foo>;

// 4. 结合 模式匹配 infer
type ReverseName<Str extends string> =
  Str extends `${infer First} ${infer Last}`
    ? `${Capitalize<Last>} ${First}`
    : Str;

type PickByValueType<T extends object, Type> = {
  [K in keyof T as T[K] extends Type ? K : never]: T[K];
};

// 5. 深入一些字符串处理工具 (Include Trim StartWith EndWith Replace Join Split 驼峰处理与匹配等)
// 先跳过 到这里 内置类型工具、类型系统、类型编程与模板字符串类型 学完。