var createError = require('http-errors');

var path = require('path');
var cookieParser = require('cookie-parser');
 
var logger = require('morgan');
var session = require('express-session');
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var multer = require('multer');
var flash = require('connect-flash');
var mongo= require('mongodb');
var mongoose = require('mongoose');
var db = mongoose.connection;
 var expressValidator=require('express-validator');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

  var express = require('express');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
 
app.set(multer({dest:'./uploads'}));

app.use(flash());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//session
app.use(session({
secret:'secret',
saveUninitialized:true,
resave:true
}));

//passport
app.use(passport.initialize());
app.use(passport.session());

//validator
 app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
    var namespace = param.split('.'),
      root = namespace.shift(),
      formParam = root;

    while (namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param: formParam,
      msg: msg,
      value: value
    };
  }
}));

 
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  //console.log(req.app.get('env'));
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
 