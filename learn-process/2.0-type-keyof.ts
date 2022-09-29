// 1. 基本使用
type TFactory<T> = T | number | string;
type TFactoryWithBoolean = TFactory<boolean>;
const instance: TFactoryWithBoolean = true;

type TStruct = {
  name: string;
  age: number;
};

// 1.1 交叉类型 都满足
interface ITest1 {
  name: string;
}
interface ITest2 {
  age: number;
}
type TCombine = ITest2 & ITest1;
const instance2: TCombine = {
  name: 'lw',
  age: 1421,
};
type Mynever = string & number; //never
type UnionIntersection1 = (1 | 2 | 3) & (1 | 2); // 1 | 2

// 1.2 索引类型
type TAllStringType = {
  [key: string]: string;
};
const instance3: TAllStringType = {
  name: 'lw',
  age: '1234',
};
type TPropType1 = TAllStringType['name']; // string
interface StringOrBooleanTypes {
  // propError: string;
  propA: number;
  propB: boolean;
  [key: string]: number | boolean;
}

// 查询 keyof
interface Foo {
  name: string;
  age: number;
  1234: 2;
}
type TKey = keyof Foo; // 'name' | 'age' | 1234
const instance4: TKey = 'name';
type FooValueUnion = Foo[keyof Foo]; // string | number | 2

// 2. 嵌套使用
type TMaybeNull<T> = T | null;
function fun(input: TMaybeNull<{ sayHello: () => {} }>) {
  input?.sayHello();
}
