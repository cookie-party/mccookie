var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const session = require('express-session');

const router = require('./server/index');
//var users = require('./server/users');

var app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 60000, secure: false } 
}));

//APIは /api/v?/~
app.use('/api/v1/', router);

//client向けにbundle.jsを公開
app.use(express.static(path.join(__dirname, 'public')));

//web mainのssr
app.use('/', function(req, res, next) {
  if(req.url === '/') {
    const server = require('./server/public/dist/server');
    const config = process.env;
    server(res, config, req.session);
  } else {
    var err = new Error('Not Found');
    err.status = 404;
    const errssr = require('./server/public/dist/error');
    errssr(res, err.message, err);
  }
});

module.exports = app;
