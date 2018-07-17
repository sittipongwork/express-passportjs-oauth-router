var express = require('express')
var router = express.Router()
var passport = require('passport')

var FacebookStrategy = require('passport-facebook').Strategy;

// =============== Facebook Login Strategy ==============

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_KEY,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: "http://localhost:8080/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    // Query User whatever you want
    done(null, profile);
  }
));

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

// GET Login by facebook page
router.get('/', passport.authenticate('facebook'));
//router.get('/facebook', passport.authenticate('facebook'), { scope: 'read_stream' });

// GET Login by facebook callback
router.get('/callback',
  passport.authenticate('facebook', { successRedirect: '/auth',
                                      failureRedirect: '/' }));

module.exports = router