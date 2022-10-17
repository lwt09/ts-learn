/**
 * 最顶层 any 最底层 never
 * 判断 b 是不是 a 的子类型
 * 1. a = b  说明 b类型 extends a类型 ，说明 b类型 是 a类型 的子类型。
 * 2. type c = b extends a ? 1 : 2  c类型是1的话则成立
 */
// 下面为类型链 ， 也就是下面的全部成立

type TypeChain = never extends 'linbudu'
  ? 'linbudu' extends 'linbudu' | '599'
    ? 'linbudu' | '599' extends string
      ? string extends String
        ? String extends Object
          ? Object extends any
            ? any extends unknown
              ? unknown extends any
                ? 8
                : 7
              : 6
            : 5
          : 4
        : 3
      : 2
    : 1
  : 0;
type VerboseTypeChain = never extends 'linbudu'
  ? 'linbudu' extends 'linbudu' | 'budulin'
    ? 'linbudu' | 'budulin' extends string
      ? string extends {}
        ? string extends String
          ? String extends {}
            ? {} extends object
              ? object extends {}
                ? {} extends Object
                  ? Object extends {}
                    ? object extends Object
                      ? Object extends object
                        ? Object extends any
                          ? Object extends unknown
                            ? any extends unknown
                              ? unknown extends any
                                ? 8
                                : 7
                              : 6
                            : 5
                          : 4
                        : 3
                      : 2
                    : 1
                  : 0
                : -1
              : -2
            : -3
          : -4
        : -5
      : -6
    : -7
  : -8;
