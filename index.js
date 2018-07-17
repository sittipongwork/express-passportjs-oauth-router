var express = require('express')
var router = express.Router()
var passport = require('passport')

router.use(require('cookie-parser')());
router.use(require('body-parser').urlencoded({ extended: true }));
router.use(require('express-session')({
  secret: process.env.SESSION_SECRET_KEY,
  resave: true,
  saveUninitialized: true
}));

var facebookAuthRouter = require('./facebookAuth')

router.use(passport.initialize());
router.use(passport.session());

// GET Index page of auth
router.get('/', function (req, res) {
  res.send('Auth index home page')
})

router.use('/facebook', facebookAuthRouter)

module.exports = router
