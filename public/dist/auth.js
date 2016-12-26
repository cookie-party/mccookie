'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _firebase = require('firebase');

var _firebase2 = _interopRequireDefault(_firebase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Auth = function () {
  function Auth(env) {
    _classCallCheck(this, Auth);

    var fconf = {
      apiKey: env.apiKey,
      authDomain: env.authDomain,
      databaseURL: env.databaseURL,
      storageBucket: env.storageBucket,
      messagingSenderId: env.messagingSenderId
    };
    this.fb = _firebase2.default.initializeApp(fconf);
  }

  _createClass(Auth, [{
    key: 'basic',
    value: function basic(email, password) {
      var _this = this;

      return new Promise(function (resolve, reject) {
        //console.log('auth '+this.state.email+' '+this.state.password);
        if (email === 'test') {
          //this.props.emitter.emit('authed', 'testuser');
          resolve('test');
        } else {
          (function () {
            var firebase = _this.fb;
            // 既存ユーザーのログイン機能
            firebase.auth().signInWithEmailAndPassword(_this.state.email, _this.state.password).then(function (ret) {
              //console.log('logined '+JSON.stringify(ret));
              var userId = firebase.auth().currentUser.uid;
              //console.log('uid = '+userId);
              resolve(userId);
            }).catch(function (error) {
              //alert('loginできません（' + error.message + '）');
              console.error('loginできません（' + error.message + '）');
              reject(error);
            });
          })();
        }
      });
    }
  }, {
    key: 'twitter',
    value: function twitter() {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        //console.log('twitterAuth');
        var provider = new _firebase2.default.auth.TwitterAuthProvider();
        var firebase = _this2.fb;
        provider.setCustomParameters({
          'lang': 'ja'
        });
        firebase.auth().signInWithPopup(provider).then(function (result) {
          var token = result.credential.accessToken;
          var secret = result.credential.secret;
          var user = result.user;
          console.log('logined ' + JSON.stringify(result));
          resolve(result.uid);
        }).catch(function (error) {
          //      const errorCode = error.code;
          //      const errorMessage = error.message;
          //      const email = error.email;
          //      const credential = error.credential;
          console.error('login failed ' + JSON.stringify(error));
          reject(error);
        });
      });
    }
  }, {
    key: 'register',
    value: function register(email, password) {
      var _this3 = this;

      return new Promise(function (resolve, reject) {
        //console.log('register '+this.state.email+' '+this.state.password);
        var firebase = _this3.fb;
        // 新規ユーザーを登録
        firebase.auth().createUserWithEmailAndPassword(email, password).then(function (result) {
          console.log('register', result);
          resolve(result.uid);
        }).catch(function (error) {
          console.error('登録できません（' + error.message + '）');
          resolve(error);
        });
      });
    }
  }, {
    key: 'logout',
    value: function logout() {
      //console.log('logout');
      var firebase = this.fb;
      firebase.auth().signOut();
    }
  }]);

  return Auth;
}();

exports.default = Auth;