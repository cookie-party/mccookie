'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _serveFavicon = require('serve-favicon');

var _serveFavicon2 = _interopRequireDefault(_serveFavicon);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _server = require('react-dom/server');

var _index = require('../routes/index');

var _index2 = _interopRequireDefault(_index);

var _routes = require('../public/dist/routes');

var _routes2 = _interopRequireDefault(_routes);

var _error = require('../public/dist/error');

var _error2 = _interopRequireDefault(_error);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use((0, _morgan2.default)('dev'));
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use((0, _cookieParser2.default)());

//APIは /api/v?/~
app.use('/api/v1/', _index2.default);

//client向けにbundle.jsを公開
app.use(_express2.default.static(_path2.default.join(__dirname, '../public')));

//web mainのssr react-router
app.use(function (req, res, next) {
  (0, _reactRouter.match)({ routes: _routes2.default, location: req.url }, function (error, redirectLocation, renderProps) {
    if (error) {
      res.status(500).send(error.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      var config = process.env;
      res.status(200).send((0, _server.renderToString)(_react2.default.createElement(_reactRouter.RouterContext, renderProps)));
    } else {
      var err = new Error('Not Found');
      err.status = 404;
      (0, _error2.default)(res, err.message, err);
    }
  });
});

module.exports = app;