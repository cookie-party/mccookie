import request from 'superagent';
import config from '../config/config';

const host = config.HOST || 'localhost';
//const port = config.PORT || '3000';
const port = config.PORT? ':'+config.PORT:'';
const ssl = config.SSL || false;
const http = ssl ? 'https://' : 'http://';
const version = config.APIVERSION || '1';
const url = http+host+port+'/api/v'+version+'/';

//TODO validate
//TODO authenticate
//TODO sns連携
//TODO activate=false のdelete判定

// export const authenticate = ()=> {
//   return new Promise((resolve, reject)=>{
//     console.log('authenticate');
//     request
//       .get(url+'/twitter/auth')
//       .end((err, res)=>{
//         console.log('twitter/auth',res);
//         if(err) reject(err);
//         else if(!res.text) reject('{}'); //no data
//         else resolve(JSON.parse(res.text));
//       });
//   });
// };

export const getTweets = (key)=> {
  return new Promise((resolve, reject)=>{
    console.log('getTweets', key);
    request
      .get(url+'/twitter/search')
      .query({key: key})
      .end((err, res)=>{
        console.log('/twitter/search',res);
        if(err) reject(err);
        else if(!res.text) reject('{}'); //no data
        else resolve(JSON.parse(res.text));
      });
  });
};

export const getUsers = (key)=> {
  return new Promise((resolve, reject)=>{
    console.log('getUsers', key);
    request
      .get(url+'/twitter/users')
      .query({key: key})
      .end((err, res)=>{
        console.log('/twitter/users',res);
        if(err) reject(err);
        else if(!res.text) reject('{}'); //no data
        else resolve(JSON.parse(res.text));
      });
  });
};

export const getCredentials = ()=>{
  return new Promise((resolve, reject)=>{
    console.log('getCredentials');
    request
      .get(url+'/twitter/account/credentials')
      .end((err, res)=>{
        console.log('/twitter/account/credentials', res);
        if(err) reject(err);
        else if(!res.text) reject({});
        else resolve(JSON.parse(res.text));
      });
  });
};

export const getTimeline = ()=>{
  return new Promise((resolve, reject)=>{
    console.log('getTimeline');
    request
      .get(url+'/twitter/statuses/timeline')
      .end((err, res)=>{
        console.log('/twitter/statuses/timeline', res);
        if(err) reject(err);
        else if(!res.text) reject({});
        else resolve(JSON.parse(res.text));
      });
  });
};

export const postTweet = (text)=> {
  return new Promise((resolve, reject)=>{
    console.log('postTweet',text);
    request
      .get(url+'/twitter/post')
      .query({text:text})
      .end((err, res)=>{
        console.log('query',res);
        if(err) reject(err);
        else if(!res.text) reject('{}'); //no data
        else resolve(res);
      });
  });
};

export const query = (target, id, column)=> {
  return new Promise((resolve, reject)=>{
    console.log('query',target);
    const query = column? {id: id, column: column} : {id: id};
    request
      .get(url+target)
      .set('userid', window.userId)
      .query(query)
      .end(function(err, res){
        console.log('query',res);
        if(err) reject(err);
        else if(!res.text) reject('{}'); //no data
        else resolve(JSON.parse(res.text));
      });
  });
};

/*
export const post = (target, body)=> {
  return new Promise((resolve, reject)=>{
    console.log('post',target);
    request
      .post(url+target)
      .set('userid', window.userId)
      .send(body)
      .end(function(err, res){
        console.log('post',res);
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
      .set('userid', window.userId)
      .send(body)
      .end(function(err, res){
        console.log('update',res);
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
      .set('userid', window.userId)
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
*/