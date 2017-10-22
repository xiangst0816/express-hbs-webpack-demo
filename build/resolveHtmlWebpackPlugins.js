/**
 * prepare for HtmlWebpackPlugin plugins
 * https://github.com/kangax/html-minifier#options-quick-reference
 * */
var utils = require('./utils')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var htmlWebpackPluginOptions = utils.htmlWebpackPluginOptions()

/**
 * @param {Boolean} minify=false - whether minify html
 * */
module.exports = function (minify) {
  let HtmlWebpackPlugins = []
  htmlWebpackPluginOptions.forEach(function (entry) {
    var options = {
      title: entry.moduleName,
      filename: entry.filename,
      template: entry.template,
      inject: false,
      chunks: ['manifest', 'vendor', 'common', entry.moduleName],
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    }

    if (minify) {
      options.minify = {
        caseSensitive: true,
        collapseBooleanAttributes: true,
        collapseInlineTagWhitespace: true,
        collapseWhitespace: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
        removeAttributeQuotes: true,
        removeComments: true,
        removeEmptyAttributes: true,
        removeOptionalTags: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        sortAttributes: true,
        sortClassName: true,
        useShortDoctype: true
      }
    }

    // https://github.com/jantimon/html-webpack-plugin
    HtmlWebpackPlugins.push(new HtmlWebpackPlugin(options))
  })

  return HtmlWebpackPlugins
}
