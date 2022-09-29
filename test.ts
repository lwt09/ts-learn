export {};

interface Test {
  name: string;
  num: number;
}

function getTest(arg: Test) {
  return 1;
}
const arg = {
  name: 'l',
  age: 1,
  num: 1,
};
getTest(arg);

// 获取属性值
type test2<T> = T[keyof T];
