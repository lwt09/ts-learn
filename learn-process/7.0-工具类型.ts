export {};
/**
 * 1. 属性修饰工具类型
 * +? 等于 ? 表示可选
 * -? 表示一定有
 */
type Partial<T> = {
  [P in keyof T]+?: T[P];
};

type Required<T> = {
  [P in keyof T]-?: T[P];
};

type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

/**
 * 2. 结构工具类型
 */
//  - 2.1
type Record<K extends keyof any, T> = {
  [P in K]: T;
};
// 键名均为字符串，键值类型未知
type Record1 = Record<string, unknown>;
// 键名均为字符串，键值类型任意
type Record2 = Record<string, any>;
// 键名为字符串或数字，键值类型任意
type Record3 = Record<string | number, any>;

// - 2.2
// 选择部分属性提取
type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};
// 剔除部分属性 提取剩余的
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;

type PickedFoo = Pick<{ name: string; age: 1; property: 'p' }, 'name' | 'age'>;

/**
 * 3. 集合工具类型
 * 联合类型 交并补等
 */
// 交集 （公有）
type Extract<T, U> = T extends U ? T : never;
type Intersection = Extract<1 | 2, 1 | 2 | 3>;

// 差集 （前者独有）
type Exclude<T, U> = T extends U ? never : T;
type Diff = Exclude<1 | 2 | 4, 1 | 2 | 3>;

// 并集 （全部）
export type Concurrence<A, B> = A | B;

// 补集 （A - B）
export type Complement<A, B extends A> = Exclude<A, B>;

// 常用
type NonNullable<T> = T extends null | undefined ? never : T;
type _NonNullable<T> = Exclude<T, null | undefined>;

/**
 * 4. 模式匹配工具类型
 * infer 来对 类/接口 的模式（长啥样） 进行(提取)操作
 */
type FunctionType = (...args: any) => any;
// 返回 函数 的 入参类型
type Parameters<T extends FunctionType> = T extends (...args: infer P) => any
  ? P
  : never;
// 返回 函数 的 return 类型
type ReturnType<T extends FunctionType> = T extends (...args: any) => infer R
  ? R
  : any;

const fun = (a: number | string, b: { name: string }) => a;
type testParameters = Parameters<typeof fun>; // [a: string | number, b: {name: string}]

//  匹配函数第一个入参
type getFirstParams<T extends FunctionType> = T extends (
  firstParams: infer first,
  ...args: any
) => any
  ? first
  : never;
type testGetFirstParams = getFirstParams<typeof fun>; // string | number
// 或者 把中间抽离出来 提取数组第一个参数
type FirstArrayItemType<T extends any[]> = T extends [infer P, ...any[]]
  ? P
  : never;
type testGetFirstParams2 = FirstArrayItemType<Parameters<typeof fun>>; // string | number

// 匹配数组第一个参数， 并且数组第一个参数是 string 的
type getFirstParamsTobeString<T extends any[]> = T extends [
  infer P extends string,
  ...any[]
]
  ? P
  : never;
type F1 = getFirstParamsTobeString<['lwt', 1234]>; // 'lwt'
type F2 = getFirstParamsTobeString<[1234, 'lwt']>; // never

// 或者 数组最后一个参数
type GetLast<T extends unknown[]> = T extends [...any, infer L] ? L : T[number];
type L1 = GetLast<[1234, 1245, 'lwt']>;
