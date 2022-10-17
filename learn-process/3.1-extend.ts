interface Struct1 {
  primitiveProp: string;
}

interface Struct1 {
  // 后续属性声明必须属于同一类型。
  // 属性“primitiveProp”的类型必须为“string”，但此处却为类型“number”。
  // primitiveProp: number;
}
