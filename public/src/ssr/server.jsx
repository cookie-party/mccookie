import React from 'react';
import ReactDOMServer from 'react-dom/server';

const renderFullPage = function(config) {
  console.log('dir',__dirname);
  return `
    <!DOCTYPE html>
      <html>

      <head>
          <meta charset="utf-8">
          <title>Mccookie</title>
      </head>

      <body>

      <div id = "root"></div>

      <script>
        var APP_PROPS = ${JSON.stringify(config)};
      </script>

      <script src="dist/bundle.js"></script>

      </body>
      </html>

    `;
};

const serverSideRendering = function(res, config){
  const renderedPage = renderFullPage(config);
  res.status(200).send(renderedPage);
};

module.exports = serverSideRendering;
