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

  const getDataById = (conn, target, id)=>{
    return new Promise((resolve, reject)=>{
      console.log('getDataById: '+target+',id='+id);
      const sql = 'SELECT * FROM '+target+' WHERE id=?';
      if(id){
        conn.query(sql, id, (err, results)=>{
          if(err) {
            reject(err);
          }
          else {
            resolve(results[0]);
          }
        });
      }
      else{
        resolve({});
      }
    });
  };

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
    getDataById(conn, 'user', req.query.id)
    .then((data)=>{
      console.log('data',data);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(data));
    }).catch((err)=>{
      console.log('err',err);
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(err));
    });
  });

  /* GET wordbook info */
  router.get('/wordbook', function(req, res, next) {
    getDataById(conn, 'wordbook', req.query.id)
    .then((data)=>{
      console.log('data',data);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(data));
    }).catch((err)=>{
      console.log('err',err);
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(err));
    });
  });

  /* GET words info */
  router.get('/words', function(req, res, next) {
    getDataById(conn, 'words', req.query.id)
    .then((data)=>{
      console.log('data',data);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(data));
    }).catch((err)=>{
      console.log('err',err);
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(err));
    });
  });

  /* GET category info */
  router.get('/category', function(req, res, next) {
    getDataById(conn, 'category', req.query.id)
    .then((data)=>{
      console.log('data',data);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(data));
    }).catch((err)=>{
      console.log('err',err);
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(err));
    });
  });

  /* GET userScore info */
  router.get('/userScore', function(req, res, next) {
    getDataById(conn, 'userScore', req.query.id)
    .then((data)=>{
      console.log('data',data);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(data));
    }).catch((err)=>{
      console.log('err',err);
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(err));
    });
  });

  /* GET userBookScore info */
  router.get('/userBookScore', function(req, res, next) {
    getDataById(conn, 'userBookScore', req.query.id)
    .then((data)=>{
      console.log('data',data);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(data));
    }).catch((err)=>{
      console.log('err',err);
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(err));
    });
  });

});

module.exports = router;
