declare function curry<A extends any[], R>(fn: (...args: A) => R): Function;

function sum(a: number, b: number, c: number) {
    return a + b + c;
}

const currySum = curry(sum);
