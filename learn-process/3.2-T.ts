/**
 * 这一章讲的是泛型了
 */

import { type } from 'os';

// 1. 复习一下 stringify clone
type Stringify<T> = {
  [K in keyof T]: string;
};
type clone<T> = {
  [K in keyof T]: T[K];
};

type stringCopy = Stringify<{ abc: number }>;
type cloneItem = clone<{ abc: number }>;

// 2. Partial  (alike clone )
type TMyPartial<T> = {
  [K in keyof T]?: T[K];
};
type partialItem = TMyPartial<{ abc: number }>;
type partialItem2 = Partial<{ abc: number }>;

// 3. 条件类型 (alike boolean ? statement1 : statement2 )
type IsEqual<T> = T extends true ? 1 : 2;

type A = IsEqual<true>; // 1
type B = IsEqual<false>; // 2
type C = IsEqual<'linbudu'>; // 2

// 4. 泛型具有默认值
type Factory<T = boolean> = T | number | string;
const item: Factory = true;

// 5. 通过类型来约束逻辑
/**
 * - 入参要求是数字 否则ts类型检查报错
 * - 入参在 10000 | 10001 就返回 success 类型 否则为 false
 */
type ResStatus<ResCode extends number> = ResCode extends 10000 | 100001
  ? 'success'
  : 'false';

type ResStatusItem = ResStatus<10000>;
type ResStatusItem2 = ResStatus<10002>;
// type ResStatusItem3 = ResStatus<'1'>;

/**
 * 场景2 泛型类型关联
 */
type Conditional<Type, Condition, TruthyResult, FalsyResult> =
  Type extends Condition ? TruthyResult : FalsyResult;
//  "success"
type Result1 = Conditional<'lwt', string, 'success', 'false'>;
// "false"
type Result2 = Conditional<'lwt', boolean, 'success', 'false'>;

/**
 * 场景3 接口数据
 */
interface IRes<IData> {
  code: number;
  errorInfo?: any;
  data: IData;
}
interface IUserData {
  name: string;
  age: number;
}

function getUserInfo(userId: number): Promise<IRes<IUserData>> {
  console.log(userId);
  return Promise.resolve({
    code: 1,
    data: {
      name: 'lwt',
      age: 1,
    },
  });
}

/**
 * 场景4 list数据 多层封装
 */
interface IUserList<UserData = unknown> {
  count: number;
  page: number;
  limit: number;
  data: UserData[];
}
function getUserInfoList(userId: number): Promise<IRes<IUserList<IUserData>>> {
  console.log(userId);
  return Promise.resolve({
    code: 1,
    data: {
      count: 1,
      page: 1,
      limit: 10,
      data: [
        {
          name: 'lwt',
          age: 1,
        },
      ],
    },
  });
}

/**
 * 场景5 pick
 */
// type pick<T extends object, U extends keyof T>(object: T, ...props: Array<U>): Pick<T, U>;

// 6. 箭头函数的泛型
const handle = <T>(input: T): T => {
  return input;
};

interface inputType {
  a: string | number;
}
const handle2 = function (input: inputType) {
  if (typeof input.a === 'string') return input.a.match(/test/);
};
