import Firebase from 'firebase';

export default class Auth {
  constructor(env){
    const fconf = {
      apiKey: env.apiKey,
      authDomain: env.authDomain,
      databaseURL: env.databaseURL,
      storageBucket: env.storageBucket,
      messagingSenderId: env.messagingSenderId
    };
    this.fb = Firebase.initializeApp(fconf);
  }

  basic(email, password) {
    return new Promise((resolve, reject) => {
      //console.log('auth '+this.state.email+' '+this.state.password);
      if(email === 'test') {
        //this.props.emitter.emit('authed', 'testuser');
        resolve('test');
      } else {
        const firebase = this.fb;
        // 既存ユーザーのログイン機能
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        .then((ret)=>{
          //console.log('logined '+JSON.stringify(ret));
          const userId = firebase.auth().currentUser.uid;
          //console.log('uid = '+userId);
          resolve(userId);
        })
        .catch(function(error) {
          //alert('loginできません（' + error.message + '）');
          console.error('loginできません（' + error.message + '）');
          reject(error);
        });  
      }
    });
  }

  twitter() {
    return new Promise((resolve, reject) => {
      //console.log('twitterAuth');
      const provider = new Firebase.auth.TwitterAuthProvider();
      const firebase = this.fb;
      provider.setCustomParameters({
        'lang': 'ja'
      });
      firebase.auth().signInWithPopup(provider)
      .then((result)=> {
        const token = result.credential.accessToken;
        const secret = result.credential.secret;
        const user = result.user;
        console.log('logined '+JSON.stringify(result));
        resolve(result.uid);
      }).catch((error)=> {
  //      const errorCode = error.code;
  //      const errorMessage = error.message;
  //      const email = error.email;
  //      const credential = error.credential;
        console.error('login failed '+JSON.stringify(error));
        reject(error);
      });
    });
  }

  register(email, password) {
    return new Promise((resolve, reject)=>{
      //console.log('register '+this.state.email+' '+this.state.password);
      const firebase = this.fb;
      // 新規ユーザーを登録
      firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((result)=>{
        console.log('register',result);
        resolve(result.uid);
      })
      .catch(function(error) {
        console.error('登録できません（' + error.message + '）');
        resolve(error);
      });
    });
  }

  logout() {
    //console.log('logout');
    const firebase = this.fb;
    firebase.auth().signOut();
  }
}



