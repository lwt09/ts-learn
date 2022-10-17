// 1. 条件类型
// a extends b ? statenmet1 : statement
type Func = (...args: any[]) => any;

type FunctionConditionType<T extends Func> = T extends (
  ...args: any[]
) => string
  ? 'A string return func!'
  : 'A non-string return func!';

//  "A string return func!"
type StringResult = FunctionConditionType<() => string>;
// 'A non-string return func!';
type NonStringResult1 = FunctionConditionType<() => boolean>;
// 'A non-string return func!';
type NonStringResult2 = FunctionConditionType<() => number>;

// 但是如果想要从 b 中提取一个变量作为 statement 的一个结果 以上办不到
// 也就是条件的输出结果受到 extends 中的变量的控制

// 2. infer 放入条件类型中去控制这一操作 infer A 可以理解为 any A
// case T 如果是一个2个元素构成的元组，则返回前后交换位置的元组的类型，否则返回输入T
type Swap<T extends any[]> = T extends [infer A, infer B] ? [B, A] : T;

type SwapResult1 = Swap<[1, 2]>; // 符合元组结构，首尾元素替换[2, 1]
type SwapResult2 = Swap<[1, 2, 3]>; // 不符合结构，没有发生替换，仍是 [1, 2, 3]

// case2
// 提取类型对象的属性类型
type PropType<T, K extends keyof T> = T extends { [Key in K]: infer R }
  ? R
  : never;

type PropTypeResult1 = PropType<{ name: string }, 'name'>; // string
interface Test {
  n: string;
}

// case3
// 提取 promise 返回的内容 递归了
type PromiseValue<T> = T extends Promise<infer V> ? PromiseValue<V> : T;
type PValue1 = PromiseValue<Promise<Promise<boolean>>>; //boolean

// 3. 分布式条件类型
/**
 * 首先，你的类型参数需要是一个联合类型 。
 * 其次，类型参数需要通过泛型参数的方式传入，而不能直接在外部进行判断（如 Res2 中）。
 * 最后，条件类型中的泛型参数不能被包裹。
 */

type Naked<T> = T extends boolean ? 'Y' : 'N';
type Wrapped<T> = [T] extends [boolean] ? 'Y' : 'N';
// "N" | "Y"
// (number extends boolean ? "Y" : "N") | (boolean extends boolean ? "Y" : "N")
type Res3 = Naked<number | boolean>;
// "N"
type Res4 = Wrapped<number | boolean>;

export {};
