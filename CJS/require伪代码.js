// 全局模块缓存（以模块的绝对路径为键）
const cache = new Map();

function require(modulePath) {
  // 1. **解析为绝对路径**（简化逻辑）
  const resolvedPath = resolveModulePath(modulePath);
  // 2. **检查缓存是否存在**
  if (cache.has(resolvedPath)) {
    return cache.get(resolvedPath).exports;
  }
  // 3. **创建新模块对象**（初始化空 exports）
  const module = {
    exports: {},
    id: resolvedPath,
    loaded: false,
  };
  // 4. **提前缓存，避免循环依赖时的无限递归**
  cache.set(resolvedPath, module);
  // 5. **加载模块代码并执行**

  // 模拟 Node.js 读取文件内容（同步读取）
  const code = fs.readFileSync(resolvedPath, "utf8");
  // 关键！将模块代码包装成函数，注入参数
  const wrapperFunction = (exports, require, module, __filename, __dirname) => {
    // 这里是模块的实际代码，例如：
    // const a = require('./a');
    // exports.value = 123;
    eval(code); // 实际实现中不会用 eval，此处简化
  };
  // 调用包装函数，绑定 module.exports 和其他参数
  wrapperFunction.call(
    module.exports, // this 指向 module.exports
    module.exports, // exports 参数
    require, // require 参数（支持相对路径）
    module, // module 参数
    resolvedPath, // __filename
    path.dirname(resolvedPath) // __dirname
  );
  // 标记模块已加载完成
  module.loaded = true;
  // 6. **返回模块的 exports 对象**
  return module.exports;
}
