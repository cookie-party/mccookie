const router = require('express').Router();
//const Twit = require('twit');
const OAuth = require('oauth').OAuth;
//const OAuth2 = require('oauth').OAuth2;

module.exports = function twitWrapeer(router) {

  /* GET version. */
  router.get('/twitterWrapper/vesrion', (req, res, next)=> {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ 'twits-version': 'v1' }));
  });

  const oa = new OAuth(
    'https://api.twitter.com/oauth/request_token',
    'https://api.twitter.com/oauth/access_token',
    process.env.CONSUMER_KEY, //twitter appで発行されたConsumer keyを入力。
    process.env.CONSUMER_SECRET, //twitter appで発行されたConsumer secretを入力。
    '1.0A',
    'http://127.0.0.1:3000/api/v1/twitter/auth/callback',
    'HMAC-SHA1'
  );

  /*
  const twitterConsumerKey = process.env.CONSUMER_KEY;
  const twitterConsumerSecret = process.env.CONSUMER_SECRET;
  const oa2 = new OAuth2(
    twitterConsumerKey,
    twitterConsumerSecret, 
    'https://api.twitter.com/', 
    null,
    'oauth2/token', 
    null);
  const HttpsProxyAgent = require('https-proxy-agent');
  if (process.env['https_proxy']) {
    const httpsProxyAgent = new HttpsProxyAgent(process.env['https_proxy']);
    oa2.setAgent(httpsProxyAgent);
  }
  oa2.getOAuthAccessToken(
    '',
    {'grant_type':'client_credentials'},
    function (e, access_token, refresh_token, results){
      console.log('bearer: ',access_token);
      console.log('results: ',results);
    });
  */

  //OAuth 1.0 //passport-twitterにしてもいいかも
  router.get('/twitter/auth', (req, res, next)=> {
    const sess = req.session;
    sess.view = sess.view? sess.view++ : 1;
    // console.log('req.session',sess);
    oa.getOAuthRequestToken((error, oauth_token, oauth_token_secret, results)=>{
      if (error) {
        //console.log(error);
        res.send(error);
      } else {
        sess.oauth = {};
        sess.oauth.token = oauth_token;
        // console.log('oauth.token: ' + sess.oauth.token);
        sess.oauth.token_secret = oauth_token_secret;
        //console.log('oauth.token_secret: ' + sess.oauth.token_secret);
        sess.save(()=>{
          //console.log('sess.save req.session',sess);
          res.redirect('https://twitter.com/oauth/authenticate?oauth_token='+oauth_token);
        });
      }
    });
  });

  router.get('/twitter/auth/callback', (req, res, next)=>{
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
          //console.log('oauth callback',results);
          res.redirect('http://127.0.0.1:3000');
        }
      });
    } else {
      next(new Error('you\'re not supposed to be here.'));
    }
  });

  router.get('/twitter/post', (req, res, next)=>{
    console.log('twitter/post session', req.session);
    const text = req.query.text || '';
    if(req.session.oauth) {
      oa.post(
        'https://api.twitter.com/1.1/statuses/update.json',
        req.session.oauth.access_token, 
        req.session.oauth.access_token_secret,
        {status: text},
        (err, data, response) => {
          if (err) {
            res.send('too bad.' + JSON.stringify(err));
          } else {
            res.send('posted successfully...!');
          }
        });
    }
    else {
      next(new Error('you\'re not supposed to be here.'));
    }
  });

  router.get('/twitter/search', (req, res, next)=>{
    console.log('twitter/search session', req.session);
    const key = req.query.key;
    if(req.session.oauth) {
      oa.get(
        'https://api.twitter.com/1.1/search/tweets.json?q='+key,
        req.session.oauth.access_token, 
        req.session.oauth.access_token_secret,
        (err, data, response) => {
          if (err) {
            res.send(JSON.stringify(err));
          } else {
            res.send(JSON.stringify(data));
          }
        });
    }
    else {
      //next(new Error('you\'re not supposed to be here.'));
      res.redirect('/');
    }
  });

  router.get('/twitter/users', (req, res, next)=>{
    console.log('twitter/user session', req.session);
    const key = req.query.key;
    if(req.session.oauth) {
      oa.get(
        'https://api.twitter.com/1.1/users/show.json?user_id='+key,
        req.session.oauth.access_token, 
        req.session.oauth.access_token_secret,
        (err, data, response) => {
          if (err) {
            res.send(JSON.stringify(err));
          } else {
            res.send(JSON.stringify(data));
          }
        });
    }
    else {
      //next(new Error('you\'re not supposed to be here.'));
      res.redirect('/');
    }
  });

  router.get('/twitter/account/settings', (req, res, next)=>{
    console.log('twitter/account/settings session', req.session);
    if(req.session.oauth) {
      oa.get(
        'https://api.twitter.com/1.1/account/settings.json',
        req.session.oauth.access_token, 
        req.session.oauth.access_token_secret,
        (err, data, response) => {
          if (err) {
            res.send(JSON.stringify(err));
          } else {
            res.send(JSON.stringify(data));
          }
        });
    }
    else {
      res.redirect('/');
    }
  });

  router.get('/twitter/account/credentials', (req, res, next)=>{
    console.log('twitter/account/credentials session', req.session);
    if(req.session.oauth) {
      oa.get(
        'https://api.twitter.com/1.1/account/verify_credentials.json',
        req.session.oauth.access_token, 
        req.session.oauth.access_token_secret,
        (err, data, response) => {
          if (err) {
            res.send(JSON.stringify(err));
          } else {
            res.send(JSON.stringify(data));
          }
        });
    }
    else {
      res.redirect('/');
    }
  });

  router.get('/twitter/application/rate', (req, res, next)=>{
    console.log('twitter/application/rate session', req.session);
    if(req.session.oauth) {
      oa.get(
        'https://api.twitter.com/1.1/applicaion/rate_limit_status.json',
        req.session.oauth.access_token, 
        req.session.oauth.access_token_secret,
        (err, data, response) => {
          if (err) {
            res.send(JSON.stringify(err));
          } else {
            res.send(JSON.stringify(data));
          }
        });
    }
    else {
      res.redirect('/');
    }
  });

  router.get('/twitter/collections/entries', (req, res, next)=>{
    console.log('twitter/collections/entries session', req.session);
    const id = req.query.id;
    if(req.session.oauth) {
      oa.get(
        'https://api.twitter.com/1.1/collections/entries.json?id='+id,
        req.session.oauth.access_token, 
        req.session.oauth.access_token_secret,
        (err, data, response) => {
          if (err) {
            res.send(JSON.stringify(err));
          } else {
            res.send(JSON.stringify(data));
          }
        });
    }
    else {
      res.redirect('/');
    }
  });

  router.get('/twitter/collections/list', (req, res, next)=>{
    console.log('twitter/collections/list session', req.session);
    const userId = req.query.userId;
    if(req.session.oauth) {
      oa.get(
        'https://api.twitter.com/1.1/collections/list.json?user_id='+userId,
        req.session.oauth.access_token, 
        req.session.oauth.access_token_secret,
        (err, data, response) => {
          if (err) {
            res.send(JSON.stringify(err));
          } else {
            res.send(JSON.stringify(data));
          }
        });
    }
    else {
      res.redirect('/');
    }
  });

  router.get('/twitter/collections/show', (req, res, next)=>{
    console.log('twitter/collections/show session', req.session);
    const userId = req.query.userId;
    if(req.session.oauth) {
      oa.get(
        'https://api.twitter.com/1.1/collections/list.json?user_id='+userId,
        req.session.oauth.access_token, 
        req.session.oauth.access_token_secret,
        (err, data, response) => {
          if (err) {
            res.send(JSON.stringify(err));
          } else {
            res.send(JSON.stringify(data));
          }
        });
    }
    else {
      res.redirect('/');
    }
  });
  
  router.get('/twitter/statuses/timeline', (req, res, next)=>{
    console.log('twitter/statuses/timeline session', req.session);
    const userId = req.query.userId;
    if(req.session.oauth) {
      oa.get(
        'https://api.twitter.com/1.1/statuses/home_timeline.json',
        req.session.oauth.access_token, 
        req.session.oauth.access_token_secret,
        (err, data, response) => {
          if (err) {
            res.send(JSON.stringify(err));
          } else {
            res.send(JSON.stringify(data));
          }
        });
    }
    else {
      res.redirect('/');
    }
  });

  router.get('/twitter/statuses/userTimeline', (req, res, next)=>{
    console.log('twitter/statuses/userTimeline session', req.session);
    const userId = req.query.userId;
    if(req.session.oauth) {
      oa.get(
        'https://api.twitter.com/1.1/statuses/user_timeline.json',
        req.session.oauth.access_token, 
        req.session.oauth.access_token_secret,
        (err, data, response) => {
          if (err) {
            res.send(JSON.stringify(err));
          } else {
            res.send(JSON.stringify(data));
          }
        });
    }
    else {
      res.redirect('/');
    }
  });

  /*
  //Twit
  const T = new Twit({
    consumer_key: process.env.CONSUMER_KEY,
    consumer_secret: process.env.CONSUMER_SECRET,
    access_token: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
    timeout_ms: 60*1000,
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
  */

};

