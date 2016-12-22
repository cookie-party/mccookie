const React = require('react'),
  ReactDOMServer = require('react-dom/server');

const renderFullPage = function(message, error) {
  return `
    <!DOCTYPE html>
      <html>

      <head>
          <meta charset="utf-8">
          <title>Error</title>
      </head>

      <body>

      <h1> ${message} </h1>
      <h2> ${error.status} </h2>
      <p> ${error.stack} </p>

      </body>
      </html>

    `;
};

var serverSideRendering = function(res, message, error){
  const renderedPage = renderFullPage(message, error);
  res.status(200).send(renderedPage);
};

module.exports = serverSideRendering;
