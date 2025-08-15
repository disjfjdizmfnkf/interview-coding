// 可以处理循环引用
function deepClone(value) {
  // 使用weakmap防止垃圾回收器无法回收这些引用
  const cache = new WeakMap();  //* 键是对象, 且不需要枚举键值对 -> 使用weakMap 
  function _deepClone(value) {
    // 如果是非对象的值直接返回
    if (value == null || typeof value !== "object") {
      return value;
    }
    // 使用cache防止循环引用
    if (cache.has(value)) {
      return cache.get(value);
    }
    const result = Array.isArray(value) ? [] : {};
    cache.set(value, result); //! 先存入对象才可以在后面递归中防止循环引用
    for (let key in value) {
      // 确保只不克隆继承自原型链上的属性
      if (value.hasOwnProperty(key)) {
        result[key] = _deepClone(value[key]);
      }
    }
    return result;
  }
  return _deepClone(value);
}

// 奇技淫巧使用Json方法, 无法解决函数和循环引用
function deepClone_(value) {
  return JSON.parse(JSON.stringify(value));
}

// 也可以将cache作为参数
// 如果值是基本类型或者null，直接返回
function deepClone(value, cache = new WeakMap()) {
  if (value == null || typeof value !== "object") {
    return value;
  }
  // 防止循环引用
  if (cache.has(value)) {
    return cache.get(value);
  }
  // 创建一个新的对象或数组
  const result = Array.isArray(value) ? [] : {};
  // 缓存当前对象，防止循环引用
  cache.set(value, result);
  // 递归克隆每个属性
  for (let key in value) {
    if (value.hasOwnProperty(key)) {
      result[key] = deepClone(value[key], cache);
    }
  }
  return result;
}

// 测试：验证多次调用时 cache 是否是不同的实例
function testCacheIndependence() {
  const obj1 = { a: 1 };
  const obj2 = { b: 2 };

  const cache1 = deepClone(obj1); // 第一次调用
  const cache2 = deepClone(obj2); // 第二次调用
  const cache3 = deepClone(obj1); // 再次调用 obj1，测试缓存是否生效

  console.log(cache1 !== cache2); // true，两个不同的调用应该返回不同的结果
  console.log(cache1 !== cache3); // true，应该是不同的引用，因为 cache 是私有的
  console.log(cache2 !== cache3); // true，两个调用的缓存不同
}

// 执行测试
testCacheIndependence();

