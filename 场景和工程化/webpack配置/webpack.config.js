const path = require("path");
const ESLintPlugin = require("eslint-webpack-plugin"); // 用于在编译时进行代码检查
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // 用于将CSS提取到单独的文件中
const HtmlWebpackPlugin = require("html-webpack-plugin"); // 根据编译产物自动生成 HTML 文件的 Webpack 插件
const { VueLoaderPlugin } = require("vue-loader"); // 用于处理Vue文件的加载

module.exports = (env) => {
  const isProduction = env === "production";

  const config = {
    // 公共配置
    entry: "./index",
    output: {
      filename: "[name].js",
      path: path.resolve(__dirname, "dist"),
      clean: true, // 清理dist目录
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          use: "vue-loader", // 处理Vue文件的加载
        },
        {
          test: /\.ts$/,
          use: "ts-loader", // 编译TS为js,提供类型检查 balbel-loader不提供类型检查
        },
        {
          test: /\.(js|ts|jsx|tsx)$/,
          use: "babel-loader", // babel-loader可以将ES6之后的代码转换为低版本供浏览器,node环境使用
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"], // 使用@babel/preset-env预设
          },
        },
        // 处理css文件
        
        {
          test: /\.css$/, // i表示不区分大小写 ignore
          use: [
            isProduction
              ? "style-loader" // 将CSS注入到HTML的style标签中
              : MiniCssExtractPlugin.loader, // 将CSS提取到单独的文件中
            "css-loader", // 解析CSS文件
          ], // 从右到左执行, loader将css文件转换为js, style-loader将js插入到html的style标签中
        },
        // 其他公共规则
      ],
    },
    plugins: [
      new HtmlWebpackPlugin(), // 根据编译产物自动生成 HTML 文件
      new VueLoaderPlugin(), // 处理Vue文件的加载
      // 其他公共插件
    ],
  };

  if (isProduction) {
    // 生产环境配置
    config.mode = "production";
    config.plugins.push(new MiniCssExtractPlugin()); // 将CSS提取到单独的文件中
  } else {
    // 开发环境配置
    config.mode = "development";
    config.devServer = {
      hot: true, // 启用热更新
      open: true, // 自动打开浏览器
    };
    config.devtool = "source-map"; // 生成source-map文件，便于调试
  }

  return config;
};
