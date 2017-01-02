import request from 'superagent';
import config from '../config/config';

const host = config.HOST || 'localhost';
const port = config.PORT || '3000';
const version = config.APIVERSION || '1';
const url = 'http://'+host+':'+port+'/api/v'+version+'/';

//TODO validate
//TODO authenticate
//TODO sns連携
//TODO activate=false のdelete判定

export const query = (target, id, column)=> {
  return new Promise((resolve, reject)=>{
    const query = column? {id: id, column: column} : {id: id};
    request
      .get(url+target)
      .query(query)
      .end(function(err, res){
        if(err) reject(err);
        else if(!res.text) reject('{}'); //no data
        else resolve(JSON.parse(res.text));
      });
  });
};

export const post = (target, body)=> {
  return new Promise((resolve, reject)=>{
    request
      .post(url+target)
      .send(body)
      .end(function(err, res){
        if(err) reject(err);
        else if(!res.text) reject('{}'); //no data
        else resolve(JSON.parse(res.text));
      });
  });
};

export const update = (target, body)=> {
  return new Promise((resolve, reject)=>{
    request
      .put(url+target)
      .send(body)
      .end(function(err, res){
        if(err) reject(err);
        else if(!res.text) reject('{}'); //no data
        else resolve(JSON.parse(res.text));
      });
  });
};

export const deleteColumn = (target, id)=> {
  return new Promise((resolve, reject)=>{
    request
      .get(url+target)
      .query({id: id})
      .end(function(err, res){
        if(err) reject(err);
        else if(!res.text) reject('{}'); //no data
        else {
          const body = JSON.parse(res.text);
          body.activate = 0;
          request
            .put(url+target)
            .send(body)
            .end(function(err, res){
              if(err) reject(err);
              else if(!res.text) reject('{}'); //no data
              else resolve(JSON.parse(res.text));
            });
        }
      });
  });
};
