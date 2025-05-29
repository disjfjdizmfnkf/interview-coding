function fn(n, o) {
  console.log(o);
  return {
    fn(m) {
      return fn(m, n);
    },
  };
}
const b = fn(0).fn(1).fn(2).fn(3); // undefined, 0, 1, 2
