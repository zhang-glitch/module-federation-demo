const HtmlWebpackPlugin = require("html-webpack-plugin")
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin")

module.exports = {
  mode: "development",
  devServer: {
    port: 8081
  },
  plugins: [
    // 将 products 自身当做模块暴露出去
    new ModuleFederationPlugin({
      // 模块文件名称, 其他应用引入当前模块时需要加载的文件的名字
      filename: "remoteEntry.js",
      // 模块名称, 具有唯一性, 相当于 single-spa 中的组织名称
      name: "products",
      // 当前模块具体导出的内容
      exposes: {
        "./Index": "./src/bootstrap"
      },
      // 加载共享模块，需要被异步加载
      shared: {
        faker: {
          singleton: true
        }
      }
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html"
    })
  ]
}


// 在容器应用中要如何引入产品列表应用模块?
// 1. 在容器应用中加载产品列表应用的模块文件
// 2. 在容器应用中通过 import 关键字从模块文件中导入产品列表应用模块
