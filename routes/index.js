var express = require('express');
var router = express.Router();
const pool = require('./dbConn');
const tables = ['user','tag','wordbook','words'];

//mysql
//サブクエリも使ったらいいかも
pool.getConnection((err, conn)=>{
  if(err){
    console.log(err);
    //return;
  }

  //データ取得
  const getDataById = (conn, target, id)=>{
    return new Promise((resolve, reject)=>{
      console.log('getDataById: '+target+',id='+id);
      const sql = 'SELECT * FROM '+target+' WHERE id=?';
      if(conn && id){
        conn.query(sql, id, (err, results)=>{
          console.log(results[0]);
          if(err) {
            reject(err);
          }
          else if(!results[0] || results[0].activate === 0){
            resolve({});
          }else {
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
      const id = 1; //TODO request-header にユーザidを入れたい
      var insertId = -1;
      if(conn && data){
        conn.beginTransaction(function(err) {
          if (err) { throw err; }
          conn.query('INSERT INTO '+target+' SET ?', data, function(err, result) {
            if (err){ conn.rollback(function() { throw err; });}
            else {
              //コミットする
              conn.commit((err)=> {
                if (err) {  conn.rollback(function() { throw err; }); }
                console.log('success!', result);
                resolve(result);
              });
            }
          });
        });
      }else{
        resolve(-1);
      }
    });
  };

  //データ上書き
  //TODO id指定で特定のカラムの変更を可能に
  const updateData = (conn, target, data)=>{
    return new Promise((resolve, reject)=>{
      const id = data.id;
      console.log('updateData:'+target+'['+id+']',data);
      const sql = 'SELECT * FROM '+target+' WHERE id=?';
      if(conn && id){
        getDataById(conn, target, id)
        .then((result)=>{
          const orgData = result;
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
        }).catch((err)=>{
          console.log(err);
          reject(err);
          //resolve({});
        });
      } else{
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

  /** worddata取得 */
  router.get('/getTimeline', function(req, res, next) {
    const userid = req.headers.userid || 1;
    getDataById(conn, 'user', userid)
    .then((result)=>{
      if(!result.myWordIdlist || result.myWordIdlist.length < 0){
        return [];
      }else{
        const getWordsQuery = result.myWordIdlist.split(',').map((wordid)=>{
          return getDataById(conn, 'words', wordid);
        });
        return Promise.all(getWordsQuery);
      }
    }).then((words)=>{
      const setTagList = (word)=>{
        return new Promise((resolve, reject)=>{
          if(!word.tags || word.tags.length === 0 ){ resolve(word); }
          else {
            const getTagsQuery = word.tags.split(',').map((tagid)=>{
              return getDataById(conn, 'tag', tagid);
            });
            Promise.all(getTagsQuery).then((tagList)=>{
              word.tagList = tagList;
              resolve(word);
            }).catch((err)=>{throw err;});
          }
        });
      };
      const setTagLists = words.map((word)=>{
        return setTagList(word);
      });
      return Promise.all(setTagLists);
    }).then((settedTagListWordList)=>{
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(settedTagListWordList));
    }).catch((err)=>{
      console.log('err',err);
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(err));
    });
  });

  /** worddata取得 from wordbook */
  router.get('/getWordList', function(req, res, next) {
    const bookid = req.query.id || 1;
    getDataById(conn, 'wordbook', bookid)
    .then((result)=>{
      if(!result.wordlist || result.wordlist.length < 0){
        return [];
      }else{
        const getWordsQuery = result.wordlist.split(',').map((wordid)=>{
          return getDataById(conn, 'words', wordid);
        });
        return Promise.all(getWordsQuery);
      }
    }).then((words)=>{
      const setTagList = (word)=>{
        return new Promise((resolve, reject)=>{
          if(!word.tags || word.tags.length === 0 ){ resolve(word); }
          else {
            const getTagsQuery = word.tags.split(',').map((tagid)=>{
              return getDataById(conn, 'tag', tagid);
            });
            Promise.all(getTagsQuery).then((tagList)=>{
              word.tagList = tagList;
              resolve(word);
            }).catch((err)=>{throw err;});
          }
        });
      };
      const setTagLists = words.map((word)=>{
        return setTagList(word);
      });
      return Promise.all(setTagLists);
    }).then((settedTagListWordList)=>{
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(settedTagListWordList));
    }).catch((err)=>{
      console.log('err',err);
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(err));
    });
  });

  /******** API ********/
  router.post('/deleteWordId', function(req, res, next) {
    const deleteId = req.body.id;
    const userId = req.headers.userid;
//    const target = req.body.target;
    var deletedId = null;
    if(deleteId && userId){
      conn.beginTransaction((err)=> {
        getDataById(conn, 'words', deleteId)
        .then((item)=>{
          if(!item.activate){
            return {};
          }else{
            deletedId = item.id;
            item.activate = 0;
            return updateData(conn, 'words', item);
          }
        }).then((itemUpdateResult)=>{
          return getDataById(conn, 'user', userId);
        }).then((userInfo)=>{
          const wordIds = userInfo.myWordIdlist.split(',');
          const idx = wordIds.indexOf(deletedId+'');
          if(idx>=0){
            wordIds.splice(idx, 1);
          }
          userInfo.myWordIdlist = wordIds.join(',');
          return updateData(conn, 'user', userInfo);
        }).then((result)=>{
          conn.commit((err)=> {
            if (err) { conn.rollback(function() {throw err;}); }
            else{
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify(result));
            }
          });
        }).catch((err)=>{
          console.log('err',err);
          conn.rollback(function() { throw err; }); 
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(err));
        });
      });
    }else{
      console.log('No data');
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end('No data');
    }
  });



  /** 
   * register word data 
   * */
  /** タグ追加 */
  const putTag = (tag)=>{
    return new Promise((resolve,reject)=>{
      conn.query('SELECT * FROM tag WHERE name=?', tag, function(err, result) {
        if (err){ throw err; }
        else if(result.length>0){
          resolve(result.id);
        } else {
          conn.query('INSERT INTO tag SET ?', {name: tag}, function(err, result) {
            if (err){ throw err; }
            else {
              resolve(result.insertId);
            }
          });
        }
      });
    });
  };
  /** 単語追加 */
  router.post('/newword', function(req, res, next) {
    const id = 1; //TODO request-header にユーザidを入れたい
    const tagList = req.body.tags.split(',');
    if(conn){
      conn.beginTransaction(function(err) {
        if (err) { throw err; }
        const putTags = tagList.map((tag)=>{
          return putTag(tag);
        });
        Promise.all(putTags).then((ids)=>{
          const data = {
            keyText: req.body.key,
            valueText: req.body.value,
            tags: ids.join(','),
            activate: 1
          };
          conn.query('INSERT INTO words SET ?', data, function(err, result) {
            if (err){ conn.rollback(function() { throw err; }); }
            else {
              conn.query('SELECT * FROM user WHERE id=?', id, (err, results)=>{
                if(err) { throw err; }
                else {
                  var insertId = result.insertId;
                  var userInfo = results[0];
                  var myWordIdlist = userInfo.myWordIdlist;
                  myWordIdlist = myWordIdlist.length === 0 ? insertId : myWordIdlist + ',' + insertId;
                  conn.query('UPDATE user SET myWordIdlist = ? WHERE id = ?', 
                  [myWordIdlist, 1], function(err, result) {
                    if (err){ conn.rollback(function() { throw err; }); }
                    else {
                      //コミットする
                      conn.commit(function(err) {
                        if (err) { conn.rollback(function() {throw err;}); }
                        console.log('success!',result);
                        res.writeHead(200, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify(result));
                      });
                    }
                  });
                }
              });
            }
          });

        }).catch((err)=>{
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(err));
        });
      });
    }else{
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end('{}');
    }
  });

  /** booklistを追加 */
  router.post('/newbook', function(req, res, next) {
    const id = 1; //TODO request-header にユーザidを入れたい
    const userId = req.headers.userid;
    const bookname = req.body.name;
    var insertId = -1;
    if(conn){
      conn.beginTransaction((err)=> {
        if (err) { throw err; }
        insertData(conn, 'wordbook', {
          name: bookname,
          wordlist: '',
          categoryId: '',
          createUserId: userId,
          activate: 1
        })
        .then((result)=>{
          insertId = result.insertId;
          return getDataById(conn, 'user', userId);
        }).then((userInfo)=>{
          const bookIds = userInfo.favoriteBookIdList.split(',');
          if(insertId>=0){
            bookIds.push(insertId);
            return updateData(conn, 'user', {id: userId, favoriteBookIdList:  bookIds.join(',')});
          }else{
            return [];
          }
        }).then((result)=>{
          conn.commit(function(err) {
            if (err) { conn.rollback(function() {throw err;}); }
            console.log('success!',result);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(result));
          });
        }).catch((err)=>{
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(err));
        });
      });
    }else{
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end('{}');
    }
  });

  /** booklistに追加 */
  router.post('/addmylist', function(req, res, next) {
    const id = 1; //TODO request-header にユーザidを入れたい
    const userId = req.headers.userid;
    const cardid = req.body.cardid;
    const bookid = req.body.bookid;
    if(conn){
      conn.beginTransaction((err)=> {
        if (err) { throw err; }
        getDataById(conn, 'wordbook', bookid)
        .then((wb)=>{
          if(wb.wordlist){
            const wordlist = wb.wordlist.split(',');
            if(wordlist.length <= 0 || wordlist.indexOf(cardid+'')<0){
              wordlist.push(cardid);
              const wordlistStr = wordlist.join(',');
              return updateData(conn, 'wordbook', {id: bookid, wordlist: wordlistStr});
            }
          }
          return [];
        }).then((result)=>{
          conn.commit(function(err) {
            if (err) { conn.rollback(function() {throw err;}); }
            console.log('success!',result);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(result));
          });
        }).catch((err)=>{
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(err));
        });
      });
    }else{
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end('{}');
    }
  });

  //自分が作ったリスト
  router.get('/mybooklist', function(req, res, next) {
    const id = req.query.id || 1;
    getDataById(conn, 'user', id)
    .then((result)=>{
      if(!result.favoriteBookIdList){
        return [];
      }else{
        const getBookQuery = result.favoriteBookIdList.split(',').map((id)=>{
          return getDataById(conn, 'wordbook', id);
        });
        return Promise.all(getBookQuery);
      }
    }).then((items)=>{
      const names = items.map((item)=>{return {id: item.id, name: item.name};});
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(names));
    }).catch((err)=>{
      console.log('err',err);
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(err));
    });
  });

  //自分がストックしたリスト
  router.get('/stocklist', function(req, res, next) {
    const id = req.query.id || 1;
    const results = [];
    getDataById(conn, 'user', id)
    .then((result)=>{
      if(!result.favoriteBookIdList){
        return [];
      }else{
        const getBookQuery = result.favoriteBookIdList.split(',').map((id)=>{
          return getDataById(conn, 'wordbook', id);
        });
        return Promise.all(getBookQuery);
      }
    }).then((items)=>{
      if(!items){
        return [];
      }else{
        items.forEach((item)=>{results.push({id: item.id, name: item.name});});
        const getUserNames = items.map((item)=>{
          return getDataById(conn, 'user', item.createUserId);
        });
        return Promise.all(getUserNames);
      }
    }).then((uinfo)=>{
      uinfo.forEach((user,id)=>{results[id].user = user.name;});
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(results));
    }).catch((err)=>{
      console.log('err',err);
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(err));
    });
  });

  /** System data */
  router.get('/popularTags', function(req, res, next) {
    const id = req.query.id || 1;
    getDataById(conn, 'system', id)
    .then((result)=>{
      if(!result.popularTags){
        return [];
      }else{
        const getTagsQuery = result.popularTags.split(',').map((id)=>{
          return getDataById(conn, 'tag', id);
        });
        return Promise.all(getTagsQuery);
      }
    }).then((items)=>{
      const tags = items.map((item)=>{return item.name;});
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(tags));
    }).catch((err)=>{
      console.log('err',err);
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(err));
    });
  });

  /* GET Dictionary. */
  router.get('/ejdic', function(req, res, next) {
    const dictionary = require('./ref/ejdic');
    var meaning = {result: false, meaning: 'undefined'};
    dictionary.forEach((item)=>{
      if(item.word === req.query.id){
        meaning = {result: true, meaning: item.meaning};
      }
    });
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(meaning));
  });

});

module.exports = router;
