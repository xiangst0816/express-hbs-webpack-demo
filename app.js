var express = require('express')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var config = require('./config')
var hbsSetup = require('./hbs-setup')
var index = require('./routes/index')
var users = require('./routes/users')
var logger = require('morgan')
var path = require('path')
var favicon = require('serve-favicon')

var app = express()
// view engine setup
hbsSetup(app)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieParser())
app.use(express.static(config.assetsRoot))

// 路由
app.use('/', index)
app.use('/users', users)

app.use(logger('dev'))
// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public/img', 'favicon.ico')))

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error', {
    title: 'Error'
  })
})

module.exports = app
