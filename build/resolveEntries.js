/**
 * this file is resolve path and name for
 * 1. webpack.entry
 * 2. webpack.plugins -> HtmlWebpackPlugin(options)
 * */
var glob = require('glob')
var config = require('./config.js')
var webpackEntry = {}                 // for webpack entry
var htmlWebpackPluginOptions = []     // for HtmlWebpackPlugin options

/**
 * read path of js entry files(for webpack entry)
 * notice: the entry file name must be main.js or index.js, and only one exist
 */
glob.sync(`${config.viewsPath}/**/{main,index}.js`).forEach(function (entry) {
  var tmp = entry.split('/').splice(-3)
  var moduleName = tmp.slice(1, 2)[0]

  // eg: entry -> {about: '/Users/xxx/xxx/express-here/client/views/about/main.js'}
  webpackEntry[moduleName] = entry
})

/**
 * read path of html template info(for HtmlWebpackPlugin options)
 * */
glob.sync(`${config.viewsPath}/**/partials/resource.ejs`).forEach(function (entry) {
  /**
   * path.basename 提取出用 ‘/' 隔开的path的最后一部分，除第一个参数外其余是需要过滤的字符串
   * path.extname 获取文件后缀
   */
  var tmp = entry.split('/').splice(-3)
  var moduleName = tmp.slice(0, 1)[0]

  // eg: htmlWebpackPluginOptions -> [{filename: 'about-resource.hbs',template: '/Users/xxx/xxx/express-here/client/views/about/partials/resource.ejs'}]
  htmlWebpackPluginOptions.push({
    moduleName,
    filename: `${moduleName}-resource.hbs`, // final file name: ejs -> hbs
    template: entry
  })
})

// console.log('入口数据')
// console.log(webpackEntry)
// console.log(htmlWebpackPluginOptions)

module.exports = {
  webpackEntry,
  htmlWebpackPluginOptions
}
