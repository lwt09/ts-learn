declare let $n: number;
declare const o: {
  name: string;
};

declare global {
  interface String {
    hump(input: string): string;
  }
}

export {};
