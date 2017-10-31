/**
 * prepare for HtmlWebpackPlugin plugins
 * https://github.com/kangax/html-minifier#options-quick-reference
 * */
var utils = require('./utils')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var htmlWebpackPluginOptions = utils.htmlWebpackPluginOptions()

module.exports = function () {
  let HtmlWebpackPlugins = []
  htmlWebpackPluginOptions.forEach(function (entry) {
    var options = {
      title: entry.moduleName,
      filename: entry.filename,
      template: entry.template,
      inject: false,
      cache: true,
      chunks: ['manifest', 'vendor', 'common', entry.moduleName],
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    }

    // https://github.com/jantimon/html-webpack-plugin
    HtmlWebpackPlugins.push(new HtmlWebpackPlugin(options))
  })

  return HtmlWebpackPlugins
}
