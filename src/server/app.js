// *** main dependencies *** //
require('dotenv').load();
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var swig = require('swig');
var cookieSession = require('cookie-session');
var passport = require('passport');
var LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
if ( !process.env.NODE_ENV ) { require('dotenv').config(); }

// *** routes *** //
var routes = require('./routes/index.js');
var auth = require('./routes/auth.js');

// *** express instance *** //
var app = express();


// *** view engine *** //
var swig = new swig.Swig();
app.engine('html', swig.renderFile);
app.set('view engine', 'html');


// *** static directory *** //
app.set('views', path.join(__dirname, 'views'));


// *** config middleware *** //
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cookieSession({
  name: 'linkedin-oauth-session-example',
  keys: [process.env.COOKIE_KEY1, process.env.COOKIE_KEY2]
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, '../client')));


// *** main routes *** //
app.use('/', routes);
app.use('/auth', auth);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// *** error handlers *** //

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


app.listen(5007, function() {
  console.log('App is happening at port', 5007);
});

module.exports = app;
