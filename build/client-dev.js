/**
 * client dev mode
 * watch and recompile
 * */
module.exports = function clientDev () {
  if (process.env.NODE_ENV === 'development') {
    var webpack = require('webpack')
    var merge = require('webpack-merge')
    var webpackConfig = require('./webpack.dev.config.js')
    webpackConfig = merge(webpackConfig, {
      watch: true,
      watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
      }
    })
    webpack(webpackConfig, function () {
      console.log('webpack pack success!')
    })
  }
}
