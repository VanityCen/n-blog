var path = require('path')
var express = require('express')
var session = require('express-session')
var MongoStore = require('connect-mongo')
var flash = require('connect-flash')
var config = require('config-lite')(__dirname)
var pkg = require('./package.json')
var router = require('./routes')
var app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(express.static(path.join(__dirname, 'public')))

// session 中间件
app.use(session({
  name: config.session.key, // 设置 cookie 中保存 session id 的字段名称
  secret: config.session.secret, // 通过设置 secret 来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
  resave: true, // 强制更新 session
  saveUninitialized: false, // 设置为 false，强制创建一个 session，即使用户未登录
  cookie: {
    maxAge: config.session.maxAge// 过期时间，过期后 cookie 中的 session id 自动删除
  },
  // store: new MongoStore({// 将 session 存储到 mongodb
  //   url: config.mongodb// mongodb 地址
  // })
}))
// flash 中间件，用来显示通知
app.use(flash())

app.locals.blog = {
  title: pkg.name,
  description: pkg.description
}

app.use(function (req, res, next) {
  res.locals.user = req.session.user
  res.locals.success = req.flash('success').toString()
  res.locals.error = req.flash('error').toString()
  next()
})
router(app)
app.listen(config.port, function () {
  console.log(`${pkg.name} listening on ${config.port}`)
})