var path = require('path')
var config = require('./config')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var glob = require('glob')

exports.assetsPath = function (_path) {
  var assetsSubDirectory = config.assetsSubDirectory
  let res = path.posix.join(assetsSubDirectory, _path)
  // static/img/[name].[hash:7].[ext]
  // static/fonts/[name].[hash:7].[ext]
  return res
}

exports.cssLoaders = function (options) {
  options = options || {}

  var cssLoader = {
    loader: 'css-loader',
    options: {
      minimize: process.env.NODE_ENV === 'production',
      sourceMap: options.sourceMap
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders (loader, loaderOptions) {
    var loaders = [cssLoader]
    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'css-loader',
        publicPath: '../'
      })
    } else {
      return loaders
    }
  }

  // http://vuejs.github.io/vue-loader/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', {indentedSyntax: true}),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  var output = []
  var loaders = exports.cssLoaders(options)
  for (var extension in loaders) {
    var loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }
  return output
}

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
}

/**
 * read path of html template info(for HtmlWebpackPlugin options)
 * */
exports.htmlWebpackPluginOptions = function () {
  var htmlWebpackPluginOptions = [] // for HtmlWebpackPlugin options
  glob.sync(`${config.viewsPath}/**/partials/resource.ejs`).forEach(function (entry) {
    /**
     * path.basename 提取出用 ‘/' 隔开的path的最后一部分，除第一个参数外其余是需要过滤的字符串
     * path.extname 获取文件后缀
     */
    var tmp = entry.split('/').splice(-3)
    var moduleName = tmp.slice(0, 1)[0]
    // eg: htmlWebpackPluginOptions ->
    // [{filename: '/Users/xxx/xxx/express-here/client/views/index/partials/resource.ejs',template:
    // '/Users/xxx/xxx/express-here/client/views/about/partials/resource.ejs'}]
    htmlWebpackPluginOptions.push({
      moduleName,
      filename: entry.replace('ejs', 'hbs'), // final file name: ejs -> hbs
      template: entry
    })
  })

  return htmlWebpackPluginOptions
}
