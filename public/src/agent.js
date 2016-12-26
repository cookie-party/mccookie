import request from 'superagent';
import config from './config/config';

export const query = (target, id, column)=> {
  return new Promise((resolve, reject)=>{
    const host = config.HOST || 'localhost';
    const port = config.PORT || '3000';
    const version = config.APIVERSION || '1';
    const url = 'http://'+host+':'+port+'/api/v'+version+'/';
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
