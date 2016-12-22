'use strict';

var React = require('react'),
    ReactDOMServer = require('react-dom/server');

var renderFullPage = function renderFullPage(message, error) {
  return '\n    <!DOCTYPE html>\n      <html>\n\n      <head>\n          <meta charset="utf-8">\n          <title>Error</title>\n      </head>\n\n      <body>\n\n      <h1> ' + message + ' </h1>\n      <h2> ' + error.status + ' </h2>\n      <p> ' + error.stack + ' </p>\n\n      </body>\n      </html>\n\n    ';
};

var serverSideRendering = function serverSideRendering(res, message, error) {
  var renderedPage = renderFullPage(message, error);
  res.status(200).send(renderedPage);
};

module.exports = serverSideRendering;