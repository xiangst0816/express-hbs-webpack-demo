var webpack = require('webpack')
var path = require('path')
var utils = require('./utils')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.config.js')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var config = require('./config.js')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var resolveHtmlWebpackPlugins = require('./resolveHtmlWebpackPlugins')
// var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')

var webpackConfig = merge(baseWebpackConfig, {
  output: {
    filename: utils.assetsPath('js/[name].[chunkhash:9].js'),
    // chunkFilename: utils.assetsPath('js/[id].[chunkhash:9].js'),
    path: config.assetsRoot,
    // html资源中的路径, 例如: "https://cdn.example.com/assets/"
    publicPath: config.build.assetsPublicPath
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),

    new webpack.DefinePlugin({
      'process.env': config.build.env
    }),

    // extract css into its own file
    new ExtractTextPlugin({
      filename: config.assetsSubDirectory + '/css/[name].[contenthash:9].css',
      allChunks: true
    }),

    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    // new OptimizeCSSPlugin(),

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

    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../client/static'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*']
      }
    ]),

    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true
      },
      sourceMap: true
    }),

    // html-webpack-plugin
    ...resolveHtmlWebpackPlugins(true)
  ],

  // https://doc.webpack-china.org/configuration/devtool/
  devtool: config.build.productionSourceMap ? 'source-map' : false
})

if (config.build.productionGzip) {
  var CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (config.build.bundleAnalyzerReport) {
  var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
