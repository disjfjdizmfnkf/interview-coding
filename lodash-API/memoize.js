class memoizeMap {
  constructor() {
    // js中的weakMap的key必须是对象，应为这个map保存的是引用
    this._primaryMap = new Map();
    this._objectMap = new WeakMap();
  }

  _isPrimitive(value) {
    return value == null || typeof value !== "object";
  }

  set(key, value) {
    if (this._isPrimitive(key)) {
      this._primaryMap.set(key, value);
    } else {
      this._objectMap.set(key, value);
    }
  }

  get(key) {
    if (this._isPrimitive(key)) {
      return this._primaryMap.get(key);
    } else {
      return this._objectMap.get(key);
    }
  }

  has(key) {
    if (this._isPrimitive(key)) {
      return this._primaryMap.has(key);
    } else {
      return this._objectMap.has(key);
    }
  }
}

// 烦乎函数的执行结果
function memoize(func, resolver) {
  function memoized(...args) {
    // 作为key的参数由用户传入，如果用户不传入默认使用第一个参数
    const key = resolver ? resolver(...args) : args[0];
    if (memoized.cache.has(key)) {
      return memoized.cache.get(key);
    }
    // apply函数的第二个参数是一个数组
    const result = func.apply(memoized, args);
    memoized.cache.set(key, result);
    return result;
  }
  memoized.cache = new memoizeMap();
  return memoized;
}


//  测试    
const add = (a, b) => a + b;
const memoizedAdd = memoize(add);
console.log(memoizedAdd(1, 2)); // 3
console.log(memoizedAdd(1, 2)); // 3
console.log(memoizedAdd.cache.has(1)); // true
console.log(memoizedAdd.cache.has(2)); // false
console.log(memoizedAdd.cache.has(4)); // false


