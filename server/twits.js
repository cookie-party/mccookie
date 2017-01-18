const router = require('express').Router();
const Twit = require('twit');

module.exports = function twitWrapeer(router) {
  const T = new Twit({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
    timeout_ms: 60*1000,
  });

  /* GET version. */
  router.get('/twits', function(req, res, next) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ 'twits-version': 'v1' }));
  });

  router.get('/tweets', function(req, res, next) {
    console.log('get tweets', req);
    const q = req.query.q || '#mccookie since:2017-01-01';
    const count = req.query.count || 100;
    T.get('search/tweets', { q, count }, (err, data, response)=> {
      if(err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(err));
      }
      else {
        console.log(data);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(data));
      }
    });
  });

};

