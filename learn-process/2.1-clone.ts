// 1. 把一个类型的属性都定义为string
// 2. 映射一个类型到另一个类型上 (拷贝)

interface IBase {
  name: string;
  age: number;
}

// 通过 in 能取出 联合类型的 每一项
type TStringify<T> = {
  [K in keyof T]: string;
};
type TClone<T> = {
  [K in keyof T]: T[K];
};

type TStringifiedBase = TStringify<IBase>;
type TBaseBak = TClone<IBase>;
