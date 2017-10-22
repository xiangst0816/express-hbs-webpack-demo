var webpack = require('webpack')
var path = require('path')
var webpackMerge = require('webpack-merge')
var webpackBaseConfig = require('./webpack.base.config.js')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var config = require('./config.js')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var webpackConfig = {
  // https://doc.webpack-china.org/configuration/output/
  output: {
    filename: 'js/[name].[chunkhash:9].js',
    path: config.assetsRoot,
    // html资源中的路径, 例如: "https://cdn.example.com/assets/"
    publicPath: config.build.assetsPublicPath
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    // https://doc.webpack-china.org/plugins/define-plugin/
    new webpack.DefinePlugin({
      'process.env': config.build.env
    }),

    // https://doc.webpack-china.org/plugins/extract-text-webpack-plugin/
    new ExtractTextPlugin({
      filename: config.assetsSubDirectory + '/css/[name].[contenthash:9].css',
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

    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../client/static'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ],

  // https://doc.webpack-china.org/configuration/devtool/
  devtool: 'source-map'
}

if (process.env.NODE_ENV === 'production') {
  // https://doc.webpack-china.org/plugins/uglifyjs-webpack-plugin/
  webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({
    sourceMap: true
  }))
}

module.exports = webpackMerge(webpackBaseConfig, webpackConfig)
