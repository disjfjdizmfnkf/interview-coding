// 条件类型会对联合类型进行分发,不需要枚举
type ObjectAccessPath<T, F extends string = "", K = keyof T> = K extends keyof T
  ? T[K] extends object
    ? ObjectAccessPath<T[K], `${F}${F extends "" ? "" : "."}${K & string}`>
    : `${F}${F extends "" ? "" : "."}${K & string}`
  : never;

function createI18n<Schema>(schema: Schema): (path: ObjectAccessPath<Schema>) => void {
  return (path) => {};
}

const i18n = createI18n({
  home: {
    topBar: {
      title: "首页",
      subtitle: "欢迎来到首页",
    },
    bottomBar: {
      title: "底部导航",
      subtitle: "这是底部导航栏",
    },
  },
  about: {
    topBar: {
      subtitle: "了解更多关于我们",
    },
  },
});

//test
i18n("home.topBar.title"); // "首页"
i18n("home.topBar.subtitle");
i18n("home.bottomBar.title");
i18n("home.bottomBar.subtitle");
// @ts-ignore
i18n("about.topBar.title"); // 错误路径

export {};
