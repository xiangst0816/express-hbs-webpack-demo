var webpack = require('webpack')
var path = require('path')
var config = require('./config.js')
var utils = require('./utils')

/**
 * 第三方依赖 js & css
 * 必须是所有页面都使用到的第三方库
 * 可配合插件 ProvidePlugin 省去依赖声明
 * https://doc.webpack-china.org/plugins/commons-chunk-plugin/#-chunk
 * */
var entries = utils.webpackEntry()

var webpackConfig = {
  entry: entries,
  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      client: config.clientPath,
      'app': path.join(__dirname, '../client/app.js') // for vimo module
    }
  },
  module: {
    rules: [
      ...utils.styleLoaders({
        sourceMap: true,
        extract: true
      }),
      // {
      //   test: /\.js$/,
      //   loader: 'eslint-loader',
      //   enforce: 'pre',
      //   include: config.clientPath,
      //   options: {
      //     formatter: require('eslint-friendly-formatter')
      //   }
      // },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        include: config.clientPath
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },
      {
        test: require.resolve('jquery'),
        use: [{
          loader: 'expose-loader',
          options: 'jQuery'
        }, {
          loader: 'expose-loader',
          options: '$'
        }]
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.$': 'jquery',
      'window.jQuery': 'jquery'
    })
  ]
}

module.exports = webpackConfig
