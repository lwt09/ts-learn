// 1. 类型守卫
type TInput = string | number;
function foo(input: TInput) {
  if (typeof input === 'string') {
    return input.replace('hi', 'hello');
  }
}

// 不加 input is string 会报错的 input 不能被判断为string
// input is string 当函数return true 时候,将input收集为string , 类似于断言
function isString(input: any): input is string {
  return typeof input === 'string';
}
function foo2(input: TInput) {
  if (isString(input)) {
    return input.replace('hi', 'hello');
  }
}

// isFalsy
export type Falsy = false | '' | 0 | null | undefined;

export const isFalsy = (val: unknown): val is Falsy => !val;

// 2. in 来区分区分类型
interface test1 {
  test1: string;
  name: 'test1Name';
  common: string;
}
interface test2 {
  test2: number;
  name: 'test2Name';
  common: number;
}
function diff(input: test1 | test2) {
  if ('test1' in input) {
    return input.test1.replace('hi', 'helleo');
  } else {
    return input.test2.toFixed(2);
  }
}
function diff2(input: test1 | test2) {
  if (input.name === 'test1Name') {
    return input.test1.replace('hi', 'helleo');
  } else {
    return input.test2.toFixed(2);
  }
}
// 不行
// function diff3(input: test1 | test2) {
//   if (typeof input.common === 'string') {
//     return input.test1.replace('hi', 'helleo');
//   } else {
//     return input.test2.toFixed(2);
//   }
// }

// 阻塞断言
let name: any = 'lwt';
function assertIsNumber(input: any): asserts input is number {
  if (typeof input !== 'number') {
    throw new Error('Not a number!');
  }
}
assertIsNumber(name);

// number 类型！
name.toFixed();
