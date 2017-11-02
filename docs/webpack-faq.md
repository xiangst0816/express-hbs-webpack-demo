# Webpack问答

到目前，Webpack已发布到[v3.8.1](https://github.com/webpack/webpack/releases)，网上有很多Webpack入门到精通的教程及文档，此文就从**问答**的角度梳理下Webpack的知识脉络。



## 基础篇

### 1. 为什么要使用Webpack？

在面对复杂的业务需求和前端性能优化的场景时，会存在以下需要解决的问题：

- 前端模块化工具
- 异步模块加载及管理
- 样式（Style）预处理：Scss、Less、Postcss等
- 样式（Style）后处理：autoprefixer、img资源内联、原子css、css module
- ES6语法、TypeScript、CoffeeScript支持
- 专有代码处理：JSX、*.vue
- 外部依赖模块：Handlerbars等模板、gzip、text、json等
- 公共模块提取
- 开模模式自动刷新浏览器
- 长效缓存处理
- 代码压缩混淆
- ...

等等以上如果人肉处理则会相当麻烦，按照Webpack的模块打包思路，以上问题都能很好的解决。

### 2. 什么是Webpack？

**Webpack是模块打包器**：它做的事情是，分析你的项目结构，找到JavaScript模块以及其它的一些浏览器不能直接运行的拓展语言（Scss，TypeScript等），并将其转换和打包为合适的格式供浏览器使用。


### 3. Webpack和Browserify、Rollup、Gulp、Grunt、Seajs、Requirejs的区别？

以上工具的功能可分为两类：

#### 1. 任务管理器(Task Runner）

**Gulp / Grunt**是一种任务管理工具，能够优化前端工作流程。比如自动刷新页面、combo、压缩css、js、编译less等等。简单来说，就是使用Gulp/Grunt，然后配置你需要的插件，就可以把以前需要手工做的事情让它帮你做了。

#### 2. 模块化解决方案

##### 2.1 在线模块方案

**Seajs/Requirejs**是一种在线"编译" 模块的方案，相当于在页面上加载一个 CMD/AMD 解释器。这样浏览器就认识了 define、exports、module 这些东西。也就实现了模块化。

##### 2.2 模块打包器

**Browserify / Webpack / Rollup**是一个预编译模块的方案，相比于上面 ，这个方案更加智能。没用过browserify，这里以webpack为例。首先，它是预编译的，不需要在浏览器中加载解释器。另外，你在本地直接写JS，不管是 AMD / CMD / ES6 风格的模块化，它都能认识，并且编译成浏览器认识的JS。以上三个工具都能完成对lib库的打包，React，Vue，Ember，Preact，D3，Three.js，Moment 以及其他许多知名的库都使用 Rollup 。Rollup使用```Tree Shaking```技术精简Lib库，这个最新的Webpack也能做到，但是从最终的打包代码中分析，Rollup做好的包会更纯净一些，性能更好一些。

### 4. Webpack的构建思路？


#### 一切都是模块

就像JS文件可以视作“模块”一样，其他所有的一切（CSS，图片，HTML）都可以被视作模块。也就是说，你可以```require("myJSfile.js")```或者```require("myCSSfile.css")```。这意味着我们可以把任何静态资源分割成可控的模块，以供重复使用等不同的操作。

#### 只加载“你需要的”和“你何时需要”的

典型的模块加载器会把所有的模块最终打包生成一个巨大的“bundle.js”文件。但在很多实际的项目当中，这个“bundle.js”文件体积可能会达到10MB~15MB，并且会一直不停进行加载！所以Webpack通过大量的特性去分割你的代码，生成多个“bundle”片段，并且异步地加载项目的不同部分，因此只会为你加载“你需要的”和“你何时需要”的部分。


## 入门篇

> 入门主要是对Webpack配置的解读及常见问题点解答。

### 1. 如何区分Webpack构建形式（开发环境 VS 生产环境）？

按照Webpack文档中说明的，[使用配置对象编写配置文档](https://doc.webpack-china.org/concepts/configuration/#-)，一般Webpack构建分为两个环境：开发、发布。因此需要三个配置：

- ```webpack.base.config.js```：基础公共
- ```webpack.dev.config.js```：开发模式
- ```webpack.prod.config.js```：发布模式

通过```webpack-merge```将配置合并，使用```pkg.script```管理构建任务。

为了在window和max上都能无缝兼容，这里使用了 [cross-env](https://www.npmjs.com/package/cross-env) 配置环境变量，例如：

```json
"scripts": {
    "clear": "rm -rf build&& mkdir build",
    "start": "npm run clear&& cross-env NODE_ENV=development webpack-dev-server --host 0.0.0.0 --devtool eval --progress --color --profile",
    "deploy": "npm run pre&& npm run clear&& cross-env NODE_ENV=production webpack -p --progress"
}
```

代码中可使用如下方式判断：

```javascript
if (process.env.NODE_ENV === 'development') {
	// ...
}
```

### 2. Entry在MPA下如何写？

MPA是Muti Page Application的缩写，指多页应用程序。这种需求常见于：

1. 多页静态项目编写
2. 多页后端渲染模板编写

如果页面不多，且模板路径无规律的话，使用对象语法定义Entry配置，具体Entry配置[参考文档](https://doc.webpack-china.org/concepts/entry-points/#-)。

如果页面结构已约定，且页面众多，这里建议使用JS代码获取入口路径，比如像这个项目[express-hbs-webpack-demo](https://github.com/xiangsongtao/express-hbs-webpack-demo/tree/master/client/views)，约定了chunkName和入口JS```index: .../views/index/main.js```

```
|   ├── views        // 前端各个页面
|   |   |── common   // 公共Partials
|   |   |── layout.hbs
|   |   |── index    // 主页
|   |   |   |── partials
|   |   |   |   |── content.hbs    // 页面Partials
|   |   |   |   |── xxxxxxxx.hbs   // 其余页面Partials
|   |   |   |   |── resource.ejs   // webpack的 HTMLHtmlWebpackPlugin 插件需要这个模板
|   |   |   |   └── resource.hbs   // 最终生成的hbs资源片段
|   |   |   |── index.hbs    // 页面主结构
|   |   |   |── main.js      // 页面入口js，约定只能是index.js或者main.js
|   |   |   └── style.less   // 当前页面的样式，支持scss/less/css等
|   |   └── xxxxx    // 其余页面
|   └── app.js       // 页面公共部分，比如全局样式及脚本，或者页面初始化时的动作

```

代码示例如下[(源码)](https://github.com/xiangsongtao/express-hbs-webpack-demo/blob/master/build/utils.js)：

```javascript
/**
 * read path of js entry files(for webpack entry)
 * notice: the entry file name must be main.js or index.js, and only one exist
 */
exports.webpackEntry = function () {
  var webpackEntry = {} // for webpack entry
  glob.sync(`${config.viewsPath}/**/{main,index}.js`).forEach(function (entry) {
    var tmp = entry.split('/').splice(-3)
    var moduleName = tmp.slice(1, 2)[0]
    // eg: entry -> {about: '/Users/xxx/xxx/express-here/client/views/about/main.js'}
    webpackEntry[moduleName] = entry
  })
  return webpackEntry
```

### 4. 如何在移动配置文件的同时不影响构建结果？

因为在配置中需要使用相对路径获取某些文件/模块的位置，因此当移动Webpack配置时会影响资源引用，这个很好处理，使用[```context```](https://doc.webpack-china.org/configuration/entry-context/)即可，这使得你的配置独立于 CWD(current working directory - 当前执行路径)。

```
context: path.resolve(__dirname, "app")
```


### 4. 静态资源托管到CDN时，构建时资源如何改写？

需要看下文档中对[```output.publicPath```](https://doc.webpack-china.org/configuration/output/#output-path)的说明。这里需要对三个常用属性进行解读：

- filename：决定了每个输出 bundle 的名称
- path：这些 bundle 将写入到 output.path 选项指定的目录下。
- publicPath：将上面两个准备的路径字符串前面加上外部路径，比如某个CDN：```http://xx.xx.com/public/```，此时原资源位置：```js/xx.xxxxx.bundle.js``` --> ```http://xx.xx.com/public/js/xx.xxxxx.bundle.js```

因此，增加```publicPath```属性就可改写资源名称外部路径。

### 5. 构建Lib库使用Rollup还是Webpack？

建议使用Rollup打包，编译最终生成的模块干净清晰。

### 6. 引入模块时，rules的匹配顺序是？

```module```是对```import/require```引入的资源进行匹配处理的配置项。


#### module.noParse

首先，如果定义了```module.noParse```且匹配到时，则不解析匹配的模块，因此模块内部**不应该有**：```import```, ```require```, ```define``` 的调用，或任何其他导入机制，这样做可以忽略大型的 library 可以提高构建性能。比如：

```
noParse: /jquery|lodash/

// 从 webpack 3.0.0 开始
noParse: function(content) {
  return /jquery|lodash/.test(content);
}
```

#### module.rules

其次，如果上述未匹配到，则进行```module.rules```匹配。数组中对象可通过属性：```test```, ```include```, ```exclude``` 和 ```resource```对资源匹配。

**这里需要注意**，Webpack执行最后一次匹配到的rule配置。因此，rule配置顺序影响构建，无用的rule全部去掉。


### 7. 代码中```import/require```找模块的过程？

这个问题也是对“模块解析(Module Resolution)”过程的提问。

Webpack使用[enhanced-resolve](https://github.com/webpack/enhanced-resolve)来解析文件路径。

#### 1. 绝对路径

不需要解析

#### 2. 相对路径

由当前文件的上下文生成绝对路径，之后转到第一种情况。

#### 3. 模块路径

```javascript
import "module"; // 文件
import "module/lib/file"; // 文件夹
```

模块将在 resolve.modules 中指定的所有目录内搜索。

1. 在```resolve.alias```查找有没匹配到的别名，如果匹配到则替换路径，继续向下
2. 如果路径指向**文件**：
	- 如果文件自带拓展名，则直接引用
	- 否则，使用```resolve.extensions```作为拓展名解析
3. 如果路径指向**文件夹**：
	- 如果文件夹中包含 package.json 文件，则按照顺序查找 ```resolve.mainFields``` 配置选项中指定的字段（默认为index）。并且 package.json 中的第一个这样的字段确定文件路径。
	- 如果 package.json 文件不存在或者 package.json 文件中的 main 字段没有返回一个有效路径，则按照顺序查找 ```resolve.mainFields``` 配置选项中指定的文件名，看是否能在 ```import/require``` 目录下匹配到一个存在的文件名。
	- 文件扩展名通过 ```resolve.mainFields``` 选项采用类似的方法进行解析。


### 8. 外部依赖如何处理？

比如公共模块不希望打包到vendor中，而是通过CDN的方式引入的时候。这里参考下[```externals```](https://doc.webpack-china.org/configuration/externals/)的配置。


配置：

```javascript
externals: {
  jquery: 'jQuery'
}
```

代码中：

```javascript
import $ from 'jquery';
```

**说明：**


 ```jQuery``` 为```<script>```中的引入全局变量```window.jQuery```。```jquery```为代码中的引入名称。



### 9. Webpack管理的模块如何挂载到```window```上？

参考这个loader：[expose-loader](https://doc.webpack-china.org/loaders/expose-loader/)。


### 8. 如何选择SourceMap生成类型？

SourceMap 在```devtool``` 属性下设置：

- 开发模式时，使用```source-map```，他提供全套支持
- 发布模式时，使用```cheap-module-eval-source-map```，不影响构建速度


## 进阶篇

### 1. 长效缓存怎么处理？

#### 原则

一般来说，我们发布到线上的资源都会再次进行迭代开发，或者增加新需求。为了保证用户浏览的流畅性，服务端会对静态资源进行长效缓存。这里我们希望：

- 新需求上线**对缓存变更影响越小越好**，最小化用户本地更新，减少服务器请求带宽
- 用户本地缓存**不能和新上线的资源产生冲突**
- 资源和页面在进行升级时，**不能出现资源引用的问题（404）**


传统的方式使用资源名后面加query的方式处理缓存，比如：

```javascript
var sourcePath = `http://xx.xx.com/public/js/index.js?time=${new Date().getTime()}`
var sourcePath = `http://xx.xx.com/public/js/index.js?v=${version()}`
```

类似的方式进行防缓存处理，但是这样的做法不便于管理，且页面和资源部署先后会出现冲突。

因此，最暴力直接的方式是**根据资源内容改写文件名**的方式处理长效缓存的问题。当资源发生变化时修改资源名称，不变则不处理。使用这种方式，可以先替换静态资源，之后替换页面，不会造成冲突。

以上的介绍建议阅读这篇文章：[用 webpack 实现持久化缓存](https://sebastianblade.com/using-webpack-to-achieve-long-term-cache/)。我这里总结最终执行的部分。

#### Webpack解读

Webpack使用内建模块系统管理模块引用，为了保证模块内容稳定，这里需要将**webpack runtime/chunk清单（经常改变）**和**模块（相对固定）**分离。

因此，长效缓存的核心就是：**生成稳定的模块及模块ID，只有模块内容变动才会改变模块及模块ID，只进行必要的模块及模块ID变更。**

#### 措施

-  合理划分公共模块
	- 提取vendor模块
	- 使用```CommonsChunkPlugin```提取公共模块
	- 提取manifest，将模块与webpack runtime/Manifest分离
- 使用chunkhash改写js模块的文件名, 使模块唯一化
- 使用```HashedModuleIdsPlugin```稳定模块ID
- 使用```import()```加载异步模块
- 使用```inline-manifest-webpack-plugin```将 manifest文件 inline到html中处理


### 2. 模块热替换的思路是？

[参考文档](https://doc.webpack-china.org/concepts/hot-module-replacement/)


### 3. 如何优化构建性能？

[参考文档](https://doc.webpack-china.org/guides/build-performance/)

### 4. 如何在编译后的代码中添加作者信息， 在文件后面添加版权信息？

使用``` new webpack.BannerPlugin('版权所有，翻版必究')```处理

