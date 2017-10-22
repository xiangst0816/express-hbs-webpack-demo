var webpack = require('webpack')
var path = require('path')
var baseWebpackConfig = require('./webpack.base.config.js')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var config = require('./config.js')
var utils = require('./utils.js')
var merge = require('webpack-merge')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
var resolveHtmlWebpackPlugins = require('./resolveHtmlWebpackPlugins')
var CopyWebpackPlugin = require('copy-webpack-plugin')

var webpackConfig = merge(baseWebpackConfig, {
  // see https://doc.webpack-china.org/configuration/output/
  output: {
    filename: utils.assetsPath('js/[name].js'),
    path: config.assetsRoot,
    publicPath: config.dev.assetsPublicPath
  },
  // see https://doc.webpack-china.org/configuration/devtool/
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    // https://doc.webpack-china.org/plugins/define-plugin/
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),

    // https://doc.webpack-china.org/plugins/extract-text-webpack-plugin/
    new ExtractTextPlugin({
      filename: config.assetsSubDirectory + '/css/[name].css',
      allChunks: true
    }),
    // https://doc.webpack-china.org/plugins/commons-chunk-plugin/

    // common module in each pages(>3)
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      minChunks: 3
    }),

    // split vendor js into its own file, only module in node_modules
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      chunks: ['common'],
      minChunks: function (module, count) {
        return module.context && module.context.indexOf('node_modules') !== -1
      }
    }),

    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    }),

    // html-webpack-plugin
    ...resolveHtmlWebpackPlugins(false),
    new FriendlyErrorsPlugin(),

    // copy custom static assets
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../client/static'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

module.exports = webpackConfig
