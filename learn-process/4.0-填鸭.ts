/**
 * 奇怪的case起手
 */
interface ICat {
  eat: () => {};
}
interface IDog {
  eat: () => {};
}
const dog: IDog = {
  eat: function () {
    return {};
  },
};
function getCat(cat: ICat) {
  return cat;
}
// 为什么传入的类型是dog的实例，可以匹配上 ICat 的类型呢。
getCat(dog);

/**
 * 同上写法
 */
class Duck {
  eat() {}
}
class Dog {
  eat() {}
}
function feedDuck(cat: Duck) {}

feedDuck(new Dog());

/**
 * 引入 TS 结构化类型系统 Duck Test
 * 只要具备了鸭子的类型特性，就把这个对象能看成鸭子
 * https://juejin.cn/book/7086408430491172901/section/7086440845053788196
 * 两种方式模拟标称类型系统(类型名不一样就不兼容)
    1. 类型层面：使用type工具类型，用泛型坑位去传入唯一标识。
    2. 逻辑层面：使用私有变量去标识区分SNY和USD 或者
 */

// 1. 通过 type 限制
type SpecialTag<Tag> = {
  __tag__: Tag;
};
type Nominal<T, U extends string> = T & SpecialTag<U>;
// 使用
type CNY = Nominal<number, 'CNY'>;
type USD = Nominal<number, 'USD'>;

const CNYCount = 100 as CNY;

const USDCount = 100 as USD;

function addCNY(source: CNY, input: CNY) {
  return (source + input) as CNY;
}

addCNY(CNYCount, CNYCount);

// 报错了！
// addCNY(CNYCount, USDCount);

// 2. 通过私有变量来防止类型填鸭

class CNY2 {
  private __tag__!: void;
  constructor(public value: number) {}
}
class USD2 {
  private __tag__!: void;
  constructor(public value: number) {}
}

const CNYCount2 = new CNY2(100);
const USDCount2 = new USD2(100);

function addCNY2(source: CNY2, input: CNY2) {
  return source.value + input.value;
}

addCNY2(CNYCount2, CNYCount2);
// 报错了！
// addCNY2(CNYCount2, USDCount2);
