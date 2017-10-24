/**
 * init hbs view engine
 * */
var hbs = require('hbs')
var config = require('../config')
var layouts = require('handlebars-layouts')
var helpers = require('handlebars-helpers')
var debounce = require('lodash.debounce')
// setup client dev mode
var clientDev = require('./client-dev')
var isFirstRefresh = false
var opn = require('opn')

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
        // Increase the anti-shake function to avoid the concentration of multiple triggers
        if (!isFirstRefresh && config.dev.autoOpenBrowser) {
          var url = 'http://localhost:' + process.env.PORT
          console.log(`Browser will open at: ${url}`)
          opn(url)
          isFirstRefresh = true
        }
        reloadServer && reloadServer.reload()
        console.log(`Partials refreshed success!`)
      }, 100)
    }, function () {
      // The initial registration of partials is complete.
      clientDev()
      console.log(`The initial registration of partials is complete`)
    })
  } else {
    // register partials
    hbs.registerPartials(config.viewsPath)
  }
}
