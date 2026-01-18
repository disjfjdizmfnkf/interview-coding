// NOTE: 使用依赖注入DI实现控制反转IoC
// =========== 0. 未使用 DI：类内部直接 new，难以替换/测试 ===========
class FileLogger {
  write(msg: string) {
    console.log("[FILE]", msg);
  }
}

class UserRepoRaw {
  findAll() {
    return [{ id: 1, name: "Raw" }];
  }
}

class UserServiceTight {
  private logger = new FileLogger(); // 直接 new
  private repo = new UserRepoRaw(); // 直接 new
  list() {
    this.logger.write("list users");
    return this.repo.findAll();
  }
}

// =========== 1. 使用构造函数注入：显式依赖 ===========
interface ILogger {
  write(msg: string): void;
}
interface IUserRepo {
  findAll(): { id: number; name: string }[];
}

class ConsoleLogger implements ILogger {
  write(msg: string) {
    console.log("[LOG]", msg);
  }
}

class MemoryUserRepo implements IUserRepo {
  private data = [{ id: 1, name: "Alice" }];
  findAll() {
    return this.data;
  }
}

class UserService {
  constructor(
    private logger: ILogger,
    private repo: IUserRepo
  ) {}
  list() {
    this.logger.write("list users");
    return this.repo.findAll();
  }
}

// =========== 2. 简易容器：注册 + 解析 ===========
type Token<T> = { new (...a: any[]): T } | symbol;

class Container {
  private singletons = new Map<Token<any>, any>();
  private bindings = new Map<Token<any>, () => any>();
  // 保存工厂函数
  bindSingleton<T>(token: Token<T>, factory: () => T) {
    this.bindings.set(token, factory);
  }

  get<T>(token: Token<T>): T {
    if (this.singletons.has(token)) return this.singletons.get(token);
    const factory = this.bindings.get(token);
    if (!factory) throw new Error("未绑定: " + String(token));
    const instance = factory();
    this.singletons.set(token, instance);
    return instance;
  }
}

// 定义 token（symbol 防止冲突）
const TOKENS = {
  ILogger: Symbol("ILogger"),
  IUserRepo: Symbol("IUserRepo"),
  UserService: Symbol("UserService"),
};

// 容器配置 (Composition Root)
const container = new Container();
container.bindSingleton(TOKENS.ILogger, () => new ConsoleLogger());
container.bindSingleton(TOKENS.IUserRepo, () => new MemoryUserRepo());
container.bindSingleton(
  TOKENS.UserService,
  () =>
    new UserService(
      container.get(TOKENS.ILogger),
      container.get(TOKENS.IUserRepo)
    )
);

// 使用
const userService = container.get<UserService>(TOKENS.UserService);
console.log("Users:", userService.list());

// =========== 3. 替换实现：无需改业务类 ===========
class SilentLogger implements ILogger {
  write(_msg: string) {}
}
// 只需在启动阶段替换绑定即可
container.bindSingleton(TOKENS.ILogger, () => new SilentLogger());
const userService2 = container.get<UserService>(TOKENS.UserService);
console.log("Users(with silent logger):", userService2.list());

// =========== 4. 拦截器/代理：横切关注点 ===========
function withTiming<T extends object>(target: T): T {
  return new Proxy(target, {
    get(obj, key, recv) {
      const orig = Reflect.get(obj, key, recv);
      if (typeof orig === "function") {
        return (...args: any[]) => {
          const start = performance.now();
          const r = orig.apply(obj, args);
          console.log(`[TIMING] ${String(key)} ${performance.now() - start}ms`);
          return r;
        };
      }
      return orig;
    },
  });
}

// 重新绑定带拦截的 service
container.bindSingleton(TOKENS.UserService, () =>
  withTiming(
    new UserService(
      container.get(TOKENS.ILogger),
      container.get(TOKENS.IUserRepo)
    )
  )
);
const timedSvc = container.get<UserService>(TOKENS.UserService);
timedSvc.list();

