var express = require('express')
var router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Megakit'
  })
})

router.get('/about', function (req, res, next) {
  res.render('about', {
    title: 'About'
  })
})

router.get('/team', function (req, res, next) {
  res.render('team', {
    title: 'Team'
  })
})

router.get('/services', function (req, res, next) {
  res.render('services', {
    title: 'Services'
  })
})

router.get('/events', function (req, res, next) {
  res.render('events', {
    title: 'Events'
  })
})

router.get('/faq', function (req, res, next) {
  res.render('faq', {
    title: 'Faq'
  })
})

router.get('/contacts', function (req, res, next) {
  res.render('contacts', {
    title: 'Contacts'
  })
})

router.get('/app', function (req, res, next) {
  res.render('app', {
    title: 'App'
  })
})

router.get('/portfolio', function (req, res, next) {
  res.render('portfolio', {
    title: 'Portfolio'
  })
})

router.get('/lawyer', function (req, res, next) {
  res.render('lawyer', {
    title: 'Lawyer'
  })
})

router.get('/clinic', function (req, res, next) {
  res.render('clinic', {
    title: 'Clinic'
  })
})

module.exports = router

