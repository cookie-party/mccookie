'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _server = require('react-dom/server');

var _server2 = _interopRequireDefault(_server);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var renderFullPage = function renderFullPage(config) {
  //console.log('dir',__dirname);
  return '\n    <!DOCTYPE html>\n      <html>\n\n      <head>\n          <meta charset="utf-8">\n          <title>Mccookie</title>\n          <link rel="stylesheet" type="text/css" href="./stylesheets/style.css">\n      </head>\n\n      <body bgcolor=\'#FEFFEA\'>\n      \n      <div id = "root"></div>\n\n      <script>\n        var APP_PROPS = ' + JSON.stringify(config) + ';\n      </script>\n\n      <script src="dist/bundle.js"></script>\n\n      </body>\n      </html>\n\n    ';
};

var serverSideRendering = function serverSideRendering(res, config) {
  var renderedPage = renderFullPage(config);
  res.status(200).send(renderedPage);
};

module.exports = serverSideRendering;

//          <link rel=“stylesheet” href="stylesheets/style.css”/>