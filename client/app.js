/**
 * app.js 模块是每个页面都必须引入的模块
 * 这里存放每个页面都必须要执行的公共内容
 *
 * assets: 为页面调用的资源归档
 * static: 为公共静态资源, 内部内容将原封不动转移到public中, 比如favicon.ion等
 * */
/**
 * Vendor Styles
 * */
import './assets/css/style.css'
import './assets/css/global.css'
import './assets/vendor/themify/themify-icons.css'
// global
import global from './assets/js/global'

$(function () {
  // global
  global()
})
