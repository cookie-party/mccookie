const router = require('express').Router();
const Twit = require('twit');
const OAuth = require('oauth').OAuth;

module.exports = function twitWrapeer(router) {
  const T = new Twit({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
    timeout_ms: 60*1000,
  });
  
  const oa = new OAuth(
    'https://api.twitter.com/oauth/request_token',
    'https://api.twitter.com/oauth/access_token',
    process.env.CONSUMER_KEY, //twitter appで発行されたConsumer keyを入力。
    process.env.CONSUMER_SECRET, //twitter appで発行されたConsumer secretを入力。
    '1.0',
    'http://127.0.0.1:3000/api/v1/auth/twitter/callback',
    'HMAC-SHA1'
  );

  /* GET version. */
  router.get('/twits', (req, res, next)=> {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ 'twits-version': 'v1' }));
  });

  router.get('/auth/twitter', (req, res, next)=> {
    const sess = req.session;
    sess.view = sess.view? sess.view++ : 1;
    console.log('req.session',sess);
    oa.getOAuthRequestToken((error, oauth_token, oauth_token_secret, results)=>{
      if (error) {
        console.log(error);
        res.send('yeah no. didn\'t work.');
      } else {
        sess.oauth = {};
        sess.oauth.token = oauth_token;
        console.log('oauth.token: ' + sess.oauth.token);
        sess.oauth.token_secret = oauth_token_secret;
        console.log('oauth.token_secret: ' + sess.oauth.token_secret);
        sess.save(()=>{
          console.log('sess.save req.session',sess);
          res.redirect('https://twitter.com/oauth/authenticate?oauth_token='+oauth_token);
        });
      }
    });
  });

  router.get('/auth/twitter/callback', function(req, res, next){
    console.log('callback, session = ', req.session);
    if (req.session.oauth) {
      req.session.oauth.verifier = req.query.oauth_verifier;
      const oauth = req.session.oauth;
      oa.getOAuthAccessToken(oauth.token,oauth.token_secret,oauth.verifier, 
      (error, oauth_access_token, oauth_access_token_secret, results)=>{
        if (error){
          console.log(error);
          res.send('yeah something broke.');
        } else {
          req.session.oauth.access_token = oauth_access_token;
          req.session.oauth.access_token_secret = oauth_access_token_secret;
          console.log('oauth callback',results);
          res.send('worked. nice one.');
        }
      });
    } else {
      next(new Error('you\'re not supposed to be here.'));
    }
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

