/*global __dirname*/
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

//const CookieParser = require('cookie-parser');
//const React = require('react');
//const ReactCookie = require('react-cookie');

var app = express();

// view jadeは使わない
// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

/*
//TODO sessionルーティング reactレベルでやるか, expressでやるか?
app.use(express.session({
  secret: 'secret',
  store: {},
  cookie: {
    httpOnly: false,
    maxAge: new Date(Date.now() + 60 * 60 * 1000)
  }
}));
*/

//webはpublic直叩き
app.use(express.static(path.join(__dirname, 'public')));

//APIは /api/v?/~
app.use('/api/', index);

/*
//cookie ssrで使うかも用
app.use(CookieParser());
app.use(function(req, res){
  ReactCookie.plugToRequest(req, res);
  res.send('' + React.renderToString());
});
*/

//error case
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  const ssr = require('./public/dist/error');
  ssr(res, err.message, err);
});

/*
//TODO ゆくゆくAPIが増えたらわけるかも
//app.use('/api/users', users);
*/

module.exports = app;
