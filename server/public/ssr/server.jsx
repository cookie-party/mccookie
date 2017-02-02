import React from 'react';
import ReactDOMServer from 'react-dom/server';

const renderFullPage = function(config, session) {
  //console.log('session',session);
  return `
    <!DOCTYPE html>
      <html>

      <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
          <title>Mccookie</title>
          <link rel="stylesheet" type="text/css" href="./stylesheets/style.css">
      </head>

      <body>

      <div id = "root"></div>

      <script>
        var APP_PROPS = ${JSON.stringify(config)};
        var APP_OAUTH = ${JSON.stringify(session.oauth)};
      </script>

      <script src="dist/bundle.js"></script>

      </body>
      </html>

    `;
};

const serverSideRendering = function(res, config, session){
  const renderedPage = renderFullPage(config, session);
  res.status(200).send(renderedPage);
};

module.exports = serverSideRendering;

//          <link rel=“stylesheet” href="stylesheets/style.css”/>
