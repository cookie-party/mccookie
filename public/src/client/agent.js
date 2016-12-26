import request from 'superagent';
import config from '../config/config';

export const query = (target, id)=> {
  return new Promise((resolve, reject)=>{
    const url = config.HOST || 'http://127.0.0.1:3000/api/';
    request
      .get(url+target)
      .query({ id: id }) 
      .end(function(err, res){
        if(err) reject(err);
        else resolve(res.text);
      });
  });
};
