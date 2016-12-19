var express = require('express');
var router = express.Router();
const pool = require('./dbConn');

//mysql
pool.getConnection((err, conn)=>{
  if(err){
    console.log(err);
    return;
  }

  //テスト接続
  const sql = 'SELECT name FROM user WHERE id=?';
  conn.query(sql, 1, (err, results)=>{
    if(err) {
      console.log(err);
      return;
    }
    console.log(results);
  });

  /* GET version. */
  router.get('/', function(req, res, next) {
  //  res.render('index', { title: 'Express' });
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ 'api-version': 'v1' }));
  });

  /* GET version. */
  router.get('/version', function(req, res, next) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ 'api-version': 'v1' }));
  });

  /* GET user info */
  router.get('/user', function(req, res, next) {
    const sql = 'SELECT * FROM user WHERE userId=?';
    const userId = req.query.userId;
    if(userId){
      conn.query(sql, userId, (err, results)=>{
        if(err) {
          console.log(err);
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(err));
          return;
        }
        console.log(results);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(results[0]));
      });
    }
    else{
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({}));
    }
  });

  //booklist

  //wordlist

  //...


});

module.exports = router;
