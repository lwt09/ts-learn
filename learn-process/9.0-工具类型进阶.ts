// expectType<T>({typeTestItem}) typeTestItem符不符合T
import { expectType } from 'tsd';
export {};

/**
 * 1.递归
 */
type Partial<T> = {
  [K in keyof T]?: T[K];
};

type DeepPartial<T extends object> = {
  [K in keyof T]?: T[K] extends {} ? DeepPartial<T[K]> : T[K];
};
type test = {
  name: 'lwt';
  friend: {
    name: 'fy';
  };
};
// 每个节点都可选 deep
type DeepPartialStruct = DeepPartial<{
  foo: string;
  nested: {
    nestedFoo: string;
    nestedBar: {
      nestedBarFoo: string;
    };
  };
}>;
expectType<DeepPartialStruct>({
  foo: 'bar',
  nested: {},
});
expectType<DeepPartialStruct>({
  nested: {
    nestedBar: {},
  },
});
// error
// expectType<
//   Partial<{
//     foo: string;
//     nested: {
//       nestedFoo: string;
//       nestedBar: {
//         nestedBarFoo: string;
//       };
//     };
//   }>
// >({
//   nested: {
//     nestedFoo: 1,
//     nestedBar: {
//       nestedBarFoo: '2',
//     },
//   },
// });

type DeepRequired<T> = {
  [K in keyof T]: T[K] extends {} ? DeepRequired<T[K]> : T[K];
};

export type DeepReadonly<T extends object> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];
};

export type DeepMutable<T extends object> = {
  -readonly [K in keyof T]: T[K] extends object ? DeepMutable<T[K]> : T[K];
};

type NonNullable<T> = T extends undefined | null ? never : T;
export type DeepNonNullable<T extends object> = {
  [K in keyof T]: T[K] extends object
    ? DeepNonNullable<T[K]>
    : NonNullable<T[K]>;
};

/**
 * 2. 修饰一部分属性
 */
// 将一个类型的部分属性标记为可选
type MakePropsAsOptions<T extends {}, K extends keyof T> = Partial<Pick<T, K>> &
  Omit<T, K>;
type MarkPropsAsOptionalStruct = MakePropsAsOptions<
  {
    foo: string;
    bar: number;
    baz: boolean;
  },
  'bar'
>;

// 拷贝类型 功能: 可以把上面的 T & K 联合类型变成平层的.
export type Flatten<T> = { [K in keyof T]: T[K] };
type MakePropsAsOptionsAsFlat<T extends {}, K extends keyof T> = Flatten<
  Partial<Pick<T, K>> & Omit<T, K>
>;
type MarkPropsAsOptionalStruct2 = MakePropsAsOptionsAsFlat<
  {
    foo: string;
    bar: number;
    baz: boolean;
  },
  'bar'
>;

// 同上完成各种类型的 部分修饰 带默认值
export type MarkPropsAsRequired<
  T extends object,
  K extends keyof T = keyof T
> = Flatten<Omit<T, K> & Required<Pick<T, K>>>;

export type MarkPropsAsReadonly<
  T extends object,
  K extends keyof T = keyof T
> = Flatten<Omit<T, K> & Readonly<Pick<T, K>>>;

// export type MarkPropsAsMutable<
//   T extends object,
//   K extends keyof T = keyof T
// > = Flatten<Omit<T, K> & Mutable<Pick<T, K>>>;

// export type MarkPropsAsNullable<
//   T extends object,
//   K extends keyof T = keyof T
// > = Flatten<Omit<T, K> & Nullable<Pick<T, K>>>;

export type MarkPropsAsNonNullable<
  T extends object,
  K extends keyof T = keyof T
> = Flatten<Omit<T, K> & NonNullable<Pick<T, K>>>;

/**
 * 3. 基于值进行类型裁剪 (之前都是基于 key 属性进行裁剪)
 */
// type PickByValueType <T, V>
// 3.1 首先要拿到函数所有的 value 的类型
// 把需要的属性的 value 映射到对象右边（比如我需要这个类型对象里面 所有函数类型的 value）, 再通过 [keyof T]拿到value值
type getAllValue<T> = T[keyof T];
type testNormalValue = getAllValue<{
  name: string;
  fn: () => {};
}>;

type fnFactory = (...args: any[]) => any;
type getFnValue<T> = {
  [K in keyof T]: T[K] extends fnFactory ? T[K] : never;
}[keyof T];
type testFnValue = getFnValue<{
  name: string;
  fn: (a: number) => string;
}>;

// 3.2 通过传入 valueType 筛选出类型对象中的 key
type ExpectedPropKeys<T extends {}, V> = {
  [K in keyof T]-?: T[K] extends V ? K : never;
}[keyof T];
// 封装一层 我现在就只需要 valueType 是 函数的 key
type FuncStruct = (...args: any[]) => any;
type ExprctedFnKeys<T extends {}> = ExpectedPropKeys<T, FuncStruct>;
type flatRes = Flatten<
  ExprctedFnKeys<{
    foo: () => void;
    bar: () => number;
    baz: number;
  }>
>;
// 3.3 通过 key 到 源类型中 pick 出我们要的结构
type PickByValueType<T extends object, pickValue> = Pick<
  T,
  ExpectedPropKeys<T, pickValue>
>;
type pickValueInstance = PickByValueType<
  {
    foo: () => void;
    bar: () => number;
    baz: number;
    name: string;
  },
  FuncStruct | string
>;
// 3.4 通理 写出 omit 的形式 ： 通过value剔除不要的结构
type FilteredPropKeys<T extends object, ValueType> = {
  [Key in keyof T]-?: T[Key] extends ValueType ? never : Key;
}[keyof T];

export type OmitByValueType<T extends object, ValueType> = Pick<
  T,
  FilteredPropKeys<T, ValueType>
>;

expectType<OmitByValueType<{ foo: string; bar: number }, string>>({
  bar: 599,
});

expectType<
  OmitByValueType<{ foo: string; bar: number; baz: boolean }, string | number>
>({
  baz: true,
  // name: 1,
});

// 3.5 把 pickValue 和 omitValue 融合通过第三个参数来控制
// type Conditional<Value, Condition, Resolved, Rejected> = Value extends Condition
//   ? Resolved
//   : Rejected;

// export type ValueTypeFilter<
//   T extends object,
//   ValueType,
//   Positive extends boolean
// > = {
//   [Key in keyof T]-?: T[Key] extends ValueType
//     ? Conditional<Positive, true, Key, never>
//     : Conditional<Positive, true, never, Key>;
// }[keyof T];

// export type PickByValueType<T extends object, ValueType> = Pick<
//   T,
//   ValueTypeFilter<T, ValueType, true>
// >;

// export type OmitByValueType<T extends object, ValueType> = Pick<
//   T,
//   ValueTypeFilter<T, ValueType, false>
// >;
// 需要注意的是  1 | 2 extends 1 | 2 |3 是成立的。所以 Conditional 的控制其实有点问题
// 可以通过 以下 解决 不引入了先
/**
 * type StrictConditional<A, B, Resolved, Rejected, Fallback = never> = [
      A
    ] extends [B]
      ? [B] extends [A]
        ? Resolved
        : Rejected
      : Fallback;
 */

/**
 * 4. 互斥接口
 */
// vip user 的标记和 commonUser 的标记不能同时存在
interface VIP {
  vipExpires: number;
}
interface CommonUser {
  promotionUsed: boolean;
}

// a ?: never 可以用来表示这个属性不存在 ;;; 直接用 a: never 来表示的话 会有问题(a必须有这个属性 但是又必须是never)。
// 独属于 T 的属性 ?:never
export type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

// 独属于T的属性 不存在 与 U   |  独属于 U 的不存在 与 T => 互斥 但是必须要存在一个
export type XOR<T, U> = (Without<T, U> & U) | (Without<U, T> & T);

type XORUser = Flatten<XOR<VIP, CommonUser>>;
expectType<XORUser>({
  promotionUsed: false,
});
// expectType<XORUser>({
//   promotionUsed: false,
//   vipExpires: 0,
// });

interface Visitor {
  refererType: string;
}

// 联合类型会自动合并重复的部分
type XORUser2 = XOR<VIP, XOR<CommonUser, Visitor>>;

// 4.2 要么都有 要么都没有 还挺好玩的。
type XORStruct = XOR<
  {},
  {
    foo: string;
    bar: number;
  }
>;

// 没有 foo、bar
expectType<XORStruct>({});

// 同时拥有 foo、bar
expectType<XORStruct>({
  foo: 'linbudu',
  bar: 599,
});

/**
 * 5. 接口 并 差 补 与 等扩展 。有点枯燥 先跳过了
 */

/**
 * 6. 模式匹配工具进阶
 */
type FunctionType = (...args: any) => any;
// params 两个参数(且参数的类型不同) extends 不了一个参数的
type LastParams<T extends FunctionType> = T extends (args: infer A) => any
  ? A
  : never;
type LastParameter<T extends FunctionType> = T extends (arg: infer P) => any
  ? P
  : T extends (...args: infer R) => any
  ? R extends [...any, infer Q]
    ? Q
    : never
  : never;
type getString = LastParameter<(a: number, b: string) => any>;
