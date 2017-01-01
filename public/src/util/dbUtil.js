import {query} from './agent';

export function getUserData(uid) {
  return new Promise((resolve, reject)=>{
    const results = {
      userInfo: {},
      userScore: {},
      userBookScore: {}
    };
    query('user', uid)
    .then((res)=>{
      results.userInfo = res;
      return query('userScoreByColumn', uid, 'userId');
    }).then((res)=>{
      results.userScore = res; //配列をobjに直した方がいいかも？
      return query('userBookScoreByColumn', uid, 'userId');
    }).then((res)=>{
      results.userBookScore = res; //配列をobjに直した方がいいかも？
      resolve(results);
    }).catch((err)=>{
      //console.log('getUserData ',err);
      reject(err);
    });
  });
}

export function getBookList(uid) {
  return new Promise((resolve, reject)=>{
    query('user', uid)
    .then((res)=>{
      if(res.myBookIdlist){
        const getBooksQuery = res.myBookIdlist.split(',').map((id)=>{
          return query('wordbook', id);
        });
        Promise.all(getBooksQuery)
        .then((results)=>{
          resolve(results);
        }).catch((err)=>{
          //console.log('getBookList ',err);
          reject(err);
        });
      }else{
        resolve([]);
      }
    }).catch((err)=>{
      //console.log('getBookList ',err);
      reject(err);
    });
  });
}

export function getWordList(bookId) {
  return new Promise((resolve, reject)=>{
    query('wordbook', bookId)
    .then((res)=>{
      if(res.wordlist){
        const getWordsQuery = res.wordlist.split(',').map((id)=>{
          return query('words', id);
        });
        Promise.all(getWordsQuery)
        .then((results)=>{
          resolve(results);
        }).catch((err)=>{
          //console.log('getWordList ',err);
          reject(err);
        });
      }else{
        resolve([]);
      }
    }).catch((err)=>{
      //console.log('getWordList ',err);
      reject(err);
    });
  });
}