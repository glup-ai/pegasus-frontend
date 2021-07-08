var createError = require('http-errors');
var express = require('express');
var path = require('path');
var session = require('express-session');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var flash = require('connect-flash');

const keys = require('./config/secrets/keys');
var indexRouter = require('./routes/index')(keys);
var authRouter = require('./routes/auth');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
    secret: keys.session.secret,
    resave: true,
    saveUninitialized: true
}));

app.use(flash())
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport.js')(passport, keys);

app.use(express.static(path.join(__dirname, 'public')));

app.use('/auth', authRouter);

app.use('/', isLoggedIn, indexRouter);

function isLoggedIn(req, res, next) {
    return next();
    if(req.isAuthenticated()) {
        return next();
    } else {
        return res.redirect('/auth/login');
    }
}

app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
