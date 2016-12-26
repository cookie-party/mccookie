var express = require('express');
var router = express.Router();
const pool = require('./dbConn');
const tables = ['user','wordbook','words','category','userScore','userBookScore'];

//mysql
pool.getConnection((err, conn)=>{
  if(err){
    //console.log(err);
    //return;
  }

  /*
  //テスト接続
  const sql = 'SELECT name FROM user WHERE id=?';
  conn.query(sql, 1, (err, results)=>{
    if(err) {
      console.log(err);
      return;
    }
    console.log(results);
  });
  */

  //データ取得
  const getDataById = (conn, target, id)=>{
    return new Promise((resolve, reject)=>{
      console.log('getDataById: '+target+',id='+id);
      const sql = 'SELECT * FROM '+target+' WHERE id=?';
      if(conn && id){
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

  //データ取得 by target column id
  const getDataBySpedifiedColumn = (conn, target, column, key)=>{
    return new Promise((resolve, reject)=>{
      console.log('getDataBySpedifiedColumn: '+target+',column['+column+'] key='+key);
      const sql = 'SELECT * FROM '+target+' WHERE '+column+'=?';
      if(conn && key){
        conn.query(sql, key, (err, results)=>{
          if(err) {
            reject(err);
          }
          else {
            resolve(results);
          }
        });
      }
      else{
        resolve({});
      }
    });
  };

  //データ書込
  const insertData = (conn, target, data)=>{
    return new Promise((resolve, reject)=>{
      console.log('insertData:'+target,data);
      if(conn && data){
        conn.query('INSERT INTO '+target+' SET ?', data, function(err, result) {
          if (err){ reject(err); }
          else {
            console.log(result.insertId);
            resolve(result.insertId);
          }
        });
      }else{
        resolve(-1);
      }
    });
  };

  //データ上書き
  const updateData = (conn, target, data)=>{
    return new Promise((resolve, reject)=>{
      const id = data.id;
      console.log('updateData:'+target+'['+id+']',data);
      const sql = 'SELECT * FROM '+target+' WHERE id=?';
      if(conn && id){
        conn.query(sql, id, (err, results)=>{
          if(err) {
            reject(err);
          }
          else {
            const orgData = results[0];
            var _targets = '';
            Object.keys(orgData).forEach((key)=>{
              if(key!=='id'){
                _targets += key+'=?,';
              }
            });
            const targets = _targets.substring(0,_targets.length-1);
            const modData = Object.assign(orgData, data);
            const updateData = Object.keys(modData).map((key)=>{
              return modData[key];
            });
            updateData.push(updateData[0]);
            updateData.splice(0,1); //idを最後に回す
            conn.query('UPDATE '+target+' SET '+targets+' WHERE id = ?', updateData, function(err, result) {
              if (err){ reject(err);}
              else {
                resolve(result);
              }
            });
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

  /* GET DATA */
  tables.forEach((table)=>{
    router.get('/'+table, function(req, res, next) {
      getDataById(conn, table, req.query.id)
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

  /* GET DATA BY TARGETID */
  tables.forEach((table)=>{
    router.get('/'+table+'ByColumn', function(req, res, next) {
      getDataBySpedifiedColumn(conn, table, req.query.column, req.query.id)
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

  /* INSERT DATA */
  tables.forEach((table)=>{
    router.post('/'+table, function(req, res, next) {
      insertData(conn, table, req.body)
      .then((id)=>{
        console.log('insert',id);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({result:'success insert : '+id}));
      }).catch((err)=>{
        console.log('err',err);
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(err));
      });
    });
  });

  /* UPDATE DATA */
  tables.forEach((table)=>{
    router.put('/'+table, function(req, res, next) {
      updateData(conn, table, req.body)
      .then((result)=>{
        console.log('update',result);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(result));
      }).catch((err)=>{
        console.log('err',err);
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(err));
      });
    });
  });

});

module.exports = router;
