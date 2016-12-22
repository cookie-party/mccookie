import React, {Component} from 'react';

import firebase from 'firebase';
import cookie from 'react-cookie';

//import config from './config/config';
import Auth from './auth';
import Main from './main';
const env = window ? window.APP_PROPS : {};

export default class LoginPage extends Component{
  constructor(props, state){
    super(props, state);

    const fconf = {
      apiKey: env.apiKey,
      authDomain: env.authDomain,
      databaseURL: env.databaseURL,
      storageBucket: env.storageBucket,
      messagingSenderId: env.messagingSenderId
    };

    const fbapp = firebase.initializeApp(fconf);

    this.state = {
      fb: fbapp,
      userId: null,
      config: fconf,
      onLogin: this.onLogin.bind(this),
      onLogout: this.onLogout.bind(this)
    };
  }

  componentWillMount() {
    this.setState({ userId: cookie.load('userId') });
  }

  onLogin (userId) {
    //console.log('onLogin', uid);
    this.setState({userId: userId});
    cookie.save('userId', userId, { path: '/' });
  }

  onLogout(uid) {
    //console.log('onLogout');
    this.state.fb.auth().signOut();
    this.setState({userId: null});
    cookie.remove('userId', { path: '/' });
  }

  render() {
    let main = <Main {...this.state}/>;

    if (!this.state.userId) {
      main =  <Auth {...this.state} />;
    }

    return (
      <div>
        {main}
      </div>
    );
  }
}
