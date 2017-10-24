# hbs使用最佳实践

hbs是Express提供的默认视图引擎，是对Handlerbars的封装。具体用法参考下面的项目地址，这里额外说明使用Handlerbars模板引擎及其开发配套的一些插件用法.

> Handlerbars使用环境: Node+Express+hbs后端渲染模式 

**主插件**

- [Handlerbars](https://github.com/wycats/handlebars.js)
- [hbs](https://github.com/pillarjs/hbs)

**拓展插件**

-  [handlebars-layouts](https://github.com/shannonmoeller/handlebars-layouts)
- [handlebars-helpers](https://github.com/helpers/handlebars-helpers)
- [hbs-utils](https://github.com/dpolivy/hbs-utils)

## Handlerbars

Handlebars是一个Javascript模板引擎，能让你轻松高效的编写语义化模板，它是Mustache模板引擎的一个扩展，Handlebars和Mustache都是弱逻辑的模板引擎，能将Web前端的视图和代码分离，降低两者之间耦合.

Handlebars以声明式的书写方式定义模板逻辑，一切都是表达式，编写简单易于拓展，可前后端共用。

学习Handlebars主要是理解:

- 模板函数: Markup字符串 = 模板函数 + 数据
- Helper: 逻辑处理/数据过滤/内容转移等，**使用前必须注册**
- Partials: 子模板，**使用前必须注册**
- ```{{}}```和```{{{}}}```的区别
- inline helper和block helper的不同写法
- 最终生成的是Markup HTML片段字符串
- Helper定义有先后之分，模板规则类最后定义
- 理解模板中的this和路径


## hbs

> Express.js view engine for handlebars.js

```hbs```是一个运行在Express上，对```Handlerbars```模板引擎再次封装的视图引擎。

### 特点

#### 1. registerPartials

```registerPartial```可输入路径注册，对应的方法: ```hbs.registerPartials```，会比原始方法更便捷。

#### 2. localsAsTemplateData

 可在视图模板中传入node环境变量/全局变量

```js
var hbs = require('hbs');
var express = require('express');

var app = express();
hbs.localsAsTemplateData(app);

app.locals.foo = "bar";
```

```html
top level: {{@foo}}
```

#### 3. handlebars实例

因为是对Handlerbars的封装，Handlerbars的实例在这里取到:

```js
// hbs.handlebars is the handlebars module
hbs.handlebars === require('handlebars');
```

### 问题点

#### 1. 如何根据页面插入对应的```style```和```script```

可以使用下面讲到的```handlebars-layouts```处理这个需求，主要是使用Helper的特性.

#### 2. 如何更换layout.hbs的路径和名称

```js
// view的路径
app.set('views'，path.join(__dirname，'client/views'))
// 模板后缀
app.set('view engine'，'hbs')
// layout名称
app.set('view options'，{layout: 'layout.hbs'})
```


#### 3. 模板加载顺序

```
1. compile body template(inject all partials and helpers) 
2. inject to layout template
```



## handlebars-layouts

这个插件提供handlerbars的基础布局的helper，包括: extend/embed/content/block四种子模板嵌套结构，具体来说就是: 继承/嵌套/定义内容及插入方式/插入点。

> 这四种功能我认为已经能覆盖到所有使用的环境了。

### Helper介绍

#### 1. extend

Extend Helper是继承的意思，与ES6的Class Extend类似，将继承的模板拿来与当前模板整合，Extend的内容不能包括HTML的tag，只能是各类Helper.

逻辑思路是这样:

> 将"layout"子模板拿来，嵌入```content```中定义的内容(根据```content```的名称在"layout"中找到对应的```block```)，之后返回组装好的模板.

例如:


```html
{{#extend "layout"}}
    {{#content "head" mode="append"}}
        <link rel="stylesheet" href="assets/css/home.css" />
    {{/content}}

    {{#content "body"}}
        <h2>Welcome Home</h2>

        <ul>
            {{#items}}
                <li>{{.}}</li>
            {{/items}}
        </ul>
    {{/content}}

    {{#content "foot" mode="prepend"}}
        <script src="assets/js/analytics.js"></script>
    {{/content}}
{{/extend}}
```

#### 2. embed


Embed Helper是嵌入的意思，将Embed模板嵌入当前的子模板中，同样，Embed的内容不能包括HTML的tag，只能是各类Helper.

逻辑思路是这样:

> 将"gallery"子模板拿来，"gallery"中嵌入内部定义的```content```内容，之后将"gallery"整体嵌入当前模板内，之后是继承的操作...

例如:

```html
{{#extend "layout"}}

    {{#content "body"}}
        {{#embed "gallery"}}
            {{#content "body"}}
                <img src="1.png" alt="" />
                <img src="2.png" alt="" />
            {{/content}}
        {{/embed}}

        {{#embed "modal" foo="bar" name=user.fullName}}
            {{#content "title" mode="prepend"}}Image 1 - {{/content}}
            {{#content "body"}}<img src="1.png" alt="" />{{/content}}
        {{/embed}}
    {{/content}}

{{/extend}}
```

#### 3. block

Block Helper定义一个插入点，插入的内容由Content Helper定义。Block Helper内部可定义一些HTML Markup.

逻辑思路是这样:

>类似于Vue/Angular的slot概念

例如:

```html
{{#block "header"}}
    <h1>Hello World</h1>
{{/block}}

{{#block "main"}}
    <p>Lorem ipsum...</p>
{{/block}}

{{#block "footer"}}
    <p>&copy; 1970</p>
{{/block}}
```

#### 4. content

Content Helper定义一个插入内容，```mode```可以决定插入的方式，比如: 前插入(prepend)/后插入(append)/替换(replace)。默认是替换(replace)。

例如:

```html
{{#extend "layout"}}

    {{#content "header"}}
        <h1>Goodnight Moon</h1>
    {{/content}}

    {{#content "main" mode="append"}}
        <p>Dolor sit amet.</p>
    {{/content}}

    {{#content "footer" mode="prepend"}}
        <p>MIT License</p>
    {{/content}}

{{/extend}}
```

### 安装


```js
var hbs = require('hbs')
var layouts = require('handlebars-layouts')
hbs.registerHelper(layouts(hbs.handlebars))
```

### 问题点

####  1. ```createFrame```未定义报错

 ```hbs```是对```handlebars```的再次封装，因此```handlebars-layouts```初始化使用的handlebars实例并不是```hbs```，因为```hbs```中并没有```createFrame```方法(```handlebars-layouts```需要这个方法，没有会报错)。
 
 因此，初始化时需要从hbs中调用handlebars的原始实例(不需要重复引入```handlebars```)
 
 ```js
 hbs.registerHelper(layouts(hbs.handlebars))
 ```
#### 2. 子模板未找到

```extend```和```embed```操作的模板都是```partials```，注意使用前需要```registerPartials```注册.

#### 3. hbs子模板更改页面没生效

```registerPartials```注册是一次性行为，除非有watch文件再次执行注册，或者重启node服务，否则node中保存的都是第一次的编译结果，关于watch的工具会在```hbs-utils```中讲到.

#### 4.```extend```和```embed```书写的partials在页面没正常初始化

可能是未正常初始化的Partials使用了别的模块注册的Helper，且这个Helper没有在```handlebars-layouts```之前先注册，更改下顺序吧，比如```handlebars-helpers```和```handlebars-layouts```的顺序:

```
1. handlebars-helpers: 提供基础的Helper
2. handlebars-layouts: 提供布局的Helper
```


## handlebars-helpers

这个是各类Handlerbars的Helper集合，涵盖了全部可能用到的Helper，不需要自己再实现一遍。具体内容参考[这里](https://github.com/helpers/handlebars-helpers).

> More than 130 Handlebars helpers in ~20 categories.


### 安装

```js
var hbs = require('hbs')
var helpers = require('handlebars-helpers')
helpers({handlebars: hbs})
```

### 问题点

#### 1. 按照```handlebars-helpers```文档安装，Helper未成功注册

因为这个插件是自动做```registerHelper```注册的，需要使用```hbs```的```registerHelper```的方法完成注册，但是插件默认是使用```handlebars```，因此需要手动传入```hbs```对象:

```
var helpers = require('handlebars-helpers')
helpers({handlebars: hbs})
```

可以通过下面的方法查看是否成功注册了Helper:

```js
console.log(Object.keys(hbs.handlebars.helpers))
```

## hbs-utils

这个工具是在开发时为hbs提供```Partials```注册及watch的功能。

### 安装

```js
var hbs = require('hbs')
var hbsutils = require('hbs-utils')(hbs)
hbsutils.registerWatchedPartials(config.viewsPath，{
    onchange () {
      // Partials has changed!
      console.log(`Partials has changed!`)
    }
  }，function () {
    // The initial registration of partials is complete.
    console.log(`The initial registration of partials is complete`)
})
```

### 问题点

#### 1. 和hbs提供的```registerPartials```之间的区别

主要是提供了```precompile```的功能，默认是关闭的的。另外，提供```name```属性来修改```Partials```的注册名称.


#### 2. ```registerWatchedPartials```之前需要```registerPartials```吗?

不需要，因为```registerWatchedPartials```会自己按照给定的目录先注册```Partials```，之后再watch。

#### 3. 如何开启开发模式

提前设好模式，根据下面的判断开启

```js
if (process.env.NODE_ENV === 'development') {
	...
} else {
	...
}
```

## 总结

以上是我在使用hbs时的最佳时间和插件组合，希望能对你有用.


