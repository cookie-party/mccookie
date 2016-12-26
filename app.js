import express from 'express';
import path from 'path';
import favicon from 'serve-favicon';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

import React from 'react';
import { match, RouterContext } from 'react-router';
import { renderToString } from 'react-dom/server';

import v1 from '../routes/index';
import routes from '../public/dist/routes';
import errssr from '../public/dist/error';

const app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//APIは /api/v?/~
app.use('/api/v1/', v1);

//client向けにbundle.jsを公開
app.use(express.static(path.join(__dirname, '../public')));

//web mainのssr react-router
app.use((req, res, next)=> {
  match({ routes, location: req.url }, (error, redirectLocation, renderProps)=>{
    if (error) {
      res.status(500).send(error.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      const config = process.env;
      res.status(200).send(renderToString(<RouterContext {...renderProps}/>));
    } else {
      const err = new Error('Not Found');
      err.status = 404;
      errssr(res, err.message, err);
    }
  });
});

module.exports = app;
