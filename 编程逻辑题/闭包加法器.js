function createPlusFunction() {
  let count = 0;
  return () => {
    count++;
    return count;
  }
}

const plus = createPlusFunction();

console.log(plus());
console.log(plus());
console.log(plus());
