const HtmlWebpackPlugin = require("html-webpack-plugin")
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin")

module.exports = {
  mode: "development",
  devServer: {
    port: 8082
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "cart",
      filename: "remoteEntry.js",
      exposes: {
        "./Index": "./src/bootstrap"
      }, 
      // 加载共享模块，需要被异步加载
      shared: {
        faker: {
          // 当共享模块被使用时，版本不一致时，使用高版本
          singleton: true
        }
      }
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html"
    })
  ]
}
