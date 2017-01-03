import {query} from './agent';

export function getUserData(uid) {
  return new Promise((resolve, reject)=>{
    const results = {
      userInfo: {},
//      userScore: {},
//      userBookScore: {}
    };
    query('user', uid)
    .then((res)=>{
      results.userInfo = res;
      resolve(results);
    }).catch((err)=>{
      //console.log('getUserData ',err);
      reject(err);
    });
  });
}

export function getTagList() {
  return new Promise((resolve, reject)=>{
    query('popularTags', 1)
    .then((res)=>{
      if(res){
        resolve(res);
      }else{
        resolve('');
      }
    }).catch((err)=>{
      reject(err);
    });
  });
}