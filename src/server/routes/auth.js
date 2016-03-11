var express = require('express');
var router = express.Router();
var passport = require('passport');
var knex = require('../../../db/knex.js');

function Users() {
    return knex('users');
}
router.get('/linkedin', passport.authenticate('linkedin'));

router.get('/linkedin/callback', passport.authenticate('linkedin', {
  failureRedirect: '/'
}), function (req, res, next) {
    console.log(req.user);
  var user = req.user.displayName;
  // Users().insert({})
  res.render('index', {title: 'LinkedIn Auth', message: user});
});

router.get('/logout', function(req, res, next) {
    req.logout();
    res.redirect('/');
});

module.exports = router;