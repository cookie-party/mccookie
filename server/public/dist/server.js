'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _server = require('react-dom/server');

var _server2 = _interopRequireDefault(_server);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var renderFullPage = function renderFullPage(config, session) {
  //console.log('session',session);
  return '\n    <!DOCTYPE html>\n      <html>\n\n      <head>\n          <meta charset="utf-8">\n          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">\n          <title>Mccookie</title>\n          <link rel="stylesheet" type="text/css" href="./stylesheets/style.css">\n      </head>\n\n      <body>\n\n      <div id = "root"></div>\n\n      <script>\n        var APP_PROPS = ' + JSON.stringify(config) + ';\n        var APP_OAUTH = ' + JSON.stringify(session.oauth) + ';\n      </script>\n\n      <script src="dist/bundle.js"></script>\n\n      </body>\n      </html>\n\n    ';
};

var serverSideRendering = function serverSideRendering(res, config, session) {
  var renderedPage = renderFullPage(config, session);
  res.status(200).send(renderedPage);
};

module.exports = serverSideRendering;

//          <link rel=“stylesheet” href="stylesheets/style.css”/>