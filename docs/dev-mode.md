# dev-mode

> 这篇Doc是对[express-hbs-webpack-demo](https://github.com/xiangsongtao/express-hbs-webpack-demo)项目开发模式的说明。因为是面相C端使用Handlerbars模板引擎开发，因此便捷高效的Dev方案至关重要。

在介绍**dev-mode**之前先需要先了解：

- 前后端分离的必要及问题点： [前端开发与后台开发如何协作？](https://www.zhihu.com/question/27226086)、[java与web前端的开发分离？](https://www.zhihu.com/question/30385222)
- Nodejs中途岛模型：[美团酒店Node全栈开发实践](https://tech.meituan.com/node-fullstack-development-practice.html)


## 前后端分界

这个项目是集成前后端一体的面相C端的解决方案，前后端都使用JavaScript开发，因此，为了便于代码逻辑区分，前后端分界线需要明确下：

### 前端范围

- 每个页面对应的js+css+img+font等资源，不包括hbs文件。
- 前端使用webpack做模块管理与工程构建
- client目录中全部文件（除去hbs模板）


### 后端范围

- 除去前端部分全部为后端范围


### 脑补一张图

```
前端 <--> (resource.ejs -> resource.hbs) <--> 后端+hbs
```

## 目录结构及约定说明

### 目录

```
├── bin
|   ├── publich      // 发布脚本
|   └── www          // 启动脚本
├── build
|   ├── config.js    // 构建配置文件
|   └── xxx.js       // 其余构建相关文件
├── client
|   ├── assets       // views中代码使用的资源，将会随webpack一同打包
|   ├── static       // 静态文件，文件夹中的内容将原封不动转移到public目录
|   ├── views        // 前端各个页面
|   |   |── common   // 公共Partials
|   |   |── layout.hbs
|   |   |── index    // 主页
|   |   |   |── partials
|   |   |   |   |── content.hbs    // 页面Partials
|   |   |   |   |── xxxxxxxx.hbs   // 其余页面Partials
|   |   |   |   |── resource.ejs   // webpack的HtmlWebpackPlugin插件需要这个模板
|   |   |   |   └── resource.hbs   // 最终生成的hbs资源片段
|   |   |   |── index.hbs    // 页面主结构
|   |   |   |── main.js      // 页面入口js，约定只能是index.js或者main.js
|   |   |   └── style.less   // 当前页面的样式，支持scss/less/css等
|   |   └── xxxxx    // 其余页面
|   └── app.js       // 页面公共部分，比如全局样式及脚本，或者页面初始化时的动作
├── docs             // 文档说明
├── public           // 外部静态资源文件，webpack打包的资源存放位置
├── routes           // express 路由
├── app.js           // express 主文件
├── config.js        // express 配置
└── package.json
```

### 约定

- webpack的HtmlWebpackPlugin插件需要这个resource.ejs模板，不要更改位置
- 页面入口js，约定只能是index.js或者main.js，不要更改位置
- client/app.js文件是页面公共脚本，各个页面的单独按需引入

## 命令说明



### npm run node:dev


使用```npm```开启nodejs的开发模式，设置当前nodejs的环境：

```
NODE_ENV=node-development
```

- 找到未使用的端口，默认是8000
- 使用```node-dev```开启node服务，当nodejs后端代码修改则直接重启服务
- 不处理hbs模板变更的重启动作

当前模式适用于nodejs部分的代码修改，比如：路由定义，API服务处理、调试等，**不涉及hbs模板调整**。

### npm run node-client:dev

继承```npm run node:dev```命令行为，设置当前nodejs的环境：

```
NODE_ENV=development
```

- watch所有hbs模板，当模板变更通知browser刷新浏览器。
- 当hbs模板初始化完毕
	- 使用```webpack.dev.config.js```的配置启动webpack构建，当webpack关联的文件变动自动重新执行webpack构建，构建完成自动刷新浏览器。
	- 如果是第一次构建，则根据上个命令对应的端口，自动开启browser，打开页面。

### npm run client:build

将前端资源使用webpack优化打包，设置当前nodejs的环境：

```
NODE_ENV=development
```

使用```webpack.prod.config.js```的配置启动webpack构建，将各个pages用到的资源打码压缩到各自的目录，例如：

```
client/views/pages/partials/resource.hbs
```

### npm run start

这个是**正式的node的服务启动命令**，如果client项目从来没有构建过会出现意想不到的问题，建议在开启正式服务前先执行一次```client:build```构建过程。

### npm run lint(npm run lint:fix)

这两个命令用于代码检查修复，监控的目录是：```client/views``` 和 ```client/assets/js```


### precommit/commitmsg

两个是不执行命令，是代码commit之前的钩子，用于规范commit时的语法。这里规定commit之前执行一次```npm run lint```命令检查代码是否有格式问题。

- 使用standard代码规范
- commit说明[参考这里](https://conventionalcommits.org/)。


## 问题点

### 1. npm run node-client:dev

这个模式下，不建议同时修改node环境和前端环境

### 2. 为何不是hot-reload，而是硬写入文件后刷新

因为后端需要最终生成的```resource.hbs```文件，hbs文件生成后更新注册的Patrials，之后才能属性浏览器获得正确显示。而hot-reload是在内存中完成资源更新，和现在情况不匹配。

### 3. 第一次开始如何快速预览效果

```bash
# 安装依赖
$ npm install

# 完整构建
$ npm run client:build

# 开启服务
$ npm run start

# 开启浏览器浏览：http://localhost:3000
```

