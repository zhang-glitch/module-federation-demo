## container
微应用容器，通过配置模块联邦实现在容器应用中加载微应用。
```js
  new ModuleFederationPlugin({
    name: "container",
    // 配置导入模块映射
    remotes: {
      // 字符串 "products" 和被导入模块的 name 属性值对应
      // 属性 products 是映射别名, 是在当前应用中导入该模块时使用的名字
      products: "products@http://localhost:8081/remoteEntry.js",
      cart: "cart@http://localhost:8082/remoteEntry.js"
    }
  }),
```

## products, cart
微应用服务。
```js
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
```

注意我们使用共享模块时，需要异步导入。