var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
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
      client: config.clientPath
    }
  },
  module: {
    // noParse: /jquery/,
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
    /**
     * https://doc.webpack-china.org/plugins/banner-plugin/
     * */
    new webpack.BannerPlugin({
      banner: 'hash:[hash], chunkhash:[chunkhash], name:[name], filebase:[filebase], query:[query], file:[file]'
    }),
    /**
     * https://doc.webpack-china.org/plugins/provide-plugin/
     * */
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.$': 'jquery',
      'window.jQuery': 'jquery'
    })
  ]
}

/**
 * prepare for HtmlWebpackPlugin plugins
 * https://github.com/kangax/html-minifier#options-quick-reference
 * */
var htmlWebpackPluginOptions = utils.htmlWebpackPluginOptions()
htmlWebpackPluginOptions.forEach(function (entry) {
  var options = {
    title: entry.moduleName,
    filename: entry.filename,
    template: entry.template,
    inject: false,
    chunks: ['manifest', 'vendor', 'common', entry.moduleName]
  }

  if (process.env.NODE_ENV === 'production') {
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
  webpackConfig.plugins.push(new HtmlWebpackPlugin(options))
})

module.exports = webpackConfig
