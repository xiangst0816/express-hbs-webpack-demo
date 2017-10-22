/**
 * init hbs view engine
 * */
var hbs = require('hbs')
var config = require('./config')
var layouts = require('handlebars-layouts')
var helpers = require('handlebars-helpers')
var debounce = require('lodash.debounce')

module.exports = function hbsSetup (app) {
  // init handlebars-helpers
  helpers({handlebars: hbs})
  // init handlebars-layouts(must put behind handlebars-helpers)
  layouts.register(hbs.handlebars)
  // pass data to hbs template
  hbs.localsAsTemplateData(app)

  // view engine setup
  app.set('views', config.viewsPath)
  app.set('view engine', 'hbs')
  app.set('view options', {layout: config.layoutName})

  if (process.env.NODE_ENV === 'development') {
    // @NODE_ENV in template
    app.locals.NODE_ENV = 'development'

    // in dev env to client browser pages
    var reload = require('reload')
    var reloadServer = reload(app)

    // register and watch partials
    var hbsutils = require('hbs-utils')(hbs)
    hbsutils.registerWatchedPartials(config.viewsPath, {
      onchange: debounce(function () {
        // 增加防抖函数, 避免集中多次触发
        // Partials has changed!
        console.log(`Partials has changed!`)
        reloadServer && reloadServer.reload()
      }, 100)
    }, function () {
      // The initial registration of partials is complete.
      console.log(`The initial registration of partials is complete`)
    })

    setTimeout(function () {
      console.log('\n')
      console.log('已注册的 Handlerbars Partials 名称:')
      console.log(Object.keys(hbs.handlebars.partials))
      console.log('\n')
      console.log('已注册的 Handlerbars helpers 名称:')
      console.log(Object.keys(hbs.handlebars.helpers))
    }, 400)
  } else {
    // register partials
    hbs.registerPartials(config.viewsPath)
  }
}
