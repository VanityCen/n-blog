
module.exports = function (app) {
  app.get('/', function (req, res, next) {
    res.redirect('/posts')
  })
  app.use('/posts', require('./posts'))
}