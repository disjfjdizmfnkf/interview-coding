const obj1 = {
  vals: [1, 2, 3],
  index: 0,
  valueOf() {
    return this.vals[this.index++ % this.vals.length]
  },
};

console.log(obj1 == 1 && obj1 == 2 && obj1 == 3 && obj1 == 1 && obj1 == 2 && obj1 == 3);
