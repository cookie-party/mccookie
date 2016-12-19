import React, {Component} from 'react';

import firebase from 'firebase';

import config from './config/config';
import Auth from './auth';
import Main from './main';

export default class LoginPage extends Component{
  constructor(props, state){
    super(props, state);

    const fbapp = firebase.initializeApp(config.firebase);

    this.state = {
      fb: fbapp,
      authed: false,
      userId: '',
      config: config,
      authenticated: this.authenticated.bind(this)
    };
  }

  authenticated (uid) {
    //console.log('authenticated', uid);
    this.setState({authed: true, userId: uid});
  }

  logout() {
    //TODO logout
  }

  render() {
    const Next = this.state.authed? <Main {...this.state}/>: <Auth {...this.state}/>;

    return (
      <div>
        {Next}
      </div>
    );
  }
}
