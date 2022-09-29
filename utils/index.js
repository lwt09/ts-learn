Array.prototype.forEach2 = function (fn) {
  const arr = this;
  for (const { item, index } of myIter(arr)) {
    // console.log(item, index);
    fn(item, index);
  }
};

function* myIter(list) {
  let i = 0;
  for (const item of list) {
    yield { item, index: i };
    i += 1;
  }
}
[{ a: 1 }, { a: 1 }, { b: 3 }].forEach2((item, index) => {
  console.log(item, index);
});
