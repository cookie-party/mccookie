import request from 'superagent';
import config from './config/config';

export const query = (target, id)=> {
  return new Promise((resolve, reject)=>{
    const host = config.HOST || 'localhost';
    const port = config.PORT || '3000';
    const version = config.APIVERSION || '1';
    const url = 'http://'+host+':'+port+'/api/v'+version+'/';
    request
      .get(url+target)
      .query({ id: id }) 
      .end(function(err, res){
        if(err) reject(err);
        else resolve(JSON.parse(res.text));
      });
  });
};
