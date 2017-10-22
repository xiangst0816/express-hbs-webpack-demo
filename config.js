var path = require('path')

module.exports = {
  // the position of page view templates
  clientPath: path.join(__dirname, 'client'),
  viewsPath: path.join(__dirname, 'client/views'),
  layoutName: 'layout.hbs',
  assetsRoot: path.join(__dirname, 'public')
}
