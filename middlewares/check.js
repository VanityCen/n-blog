module.expors = {
  checkLogin: function (req, res, next) {
    if (!req.session.user) {
      req.flash('error', 'notLogin')
      return res.redirect('/signin')
    }
    next()
  },
  checkNotLogin: function (req, res, next) {
    if (req.session.user) {
      req.flash('error', 'hasLogin')
    }
  }
}