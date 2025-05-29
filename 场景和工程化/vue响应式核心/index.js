const obj = {
  a: 1,
  b: 2,
  c: {
    a: 1,
    b: 2,
  }
}

const isObj = (val) => typeof val === "object" && val !== null;

// NOTE: defineProperty
// 缺点:
// 1. 调用时就会对内部值是对象的属性进行递归调用
// 2. 调用之后就完成对所有属性的配置, 无法对新添加的属性生效
function observe(obj) {
  for (const key in obj) {
    if (isObj(obj[key])) observe(obj[key]);
    const v = obj[key];
    Object.defineProperty(obj, key, {
      get() {
        console.log("读取", key);
        return v;
      },
      set(val) {
        console.log("更新", key);
        v = val;
      }
    })
  }
}


// NOTE: Proxy 
// 相比属性描述符, 它对对象属性设置逻辑的时间不同
// 只有读取到对象的属性也是对象时才会递归监听
function reactive(obj) {
  const proxy = new Proxy(obj, {
    get(target, p, receiver) {
      console.log("读取", p);
      // IMPORTANT: 如果读取到对象的属性也是对象, 递归调用
      if (isObj(target[p])) {
        return reactive(target[p]);
      }
      return target[p];
    },
    set(target, p, newValue, receiver) {
      if (newValue === target[p]) return;
      console.log("更新", p);
      target[p] = newValue;
    }
  })
  return proxy;
}
