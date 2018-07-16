var express = require('express')
var router = express.Router()

var passport = require('passport')
var FacebookStrategy = require('passport-facebook').Strategy;

router.use(require('cookie-parser')());
router.use(require('body-parser').urlencoded({ extended: true }));
router.use(require('express-session')({
  secret: process.env.SESSION_SECRET_KEY,
  resave: true,
  saveUninitialized: true
}));
router.use(passport.initialize());
router.use(passport.session());

// GET Index page of auth
router.get('/', function (req, res) {
  res.send('Auth index home page')
})

// =============== Facebook Login Strategy ==============

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_KEY,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: "http://localhost:8080/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    // Query User whatever you want
    User.findOrCreate(..., function(err, user) {
        if (err) { return done(err); }
        done(null, user);
    });
  }
));

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

// GET Login by facebook page
router.get('/facebook', passport.authenticate('facebook'));
//router.get('/facebook', passport.authenticate('facebook'), { scope: 'read_stream' });

// GET Login by facebook callback
router.get('/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/auth',
                                      failureRedirect: '/' }));

module.exports = router