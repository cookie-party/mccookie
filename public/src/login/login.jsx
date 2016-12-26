import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import cookie from 'react-cookie';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import Auth from './auth';

export default class Login extends Component{
  constructor(props, state){
    super(props, state);

//    const env = window ? window.APP_PROPS : {};
    //const location = window ? window.location : {};
    console.log('apiKey', cookie.load('apiKey'));
    this.auth = new Auth('apiKey');

    this.state = {
      email: '',
      password: '',
      userId: null
    };

  }

  componentWillMount() {
    console.log('componentWillMount');
    this.setState({ userId: cookie.load('userId') });
  }

  onChangeEmail(e) {
    console.log('e.target.value',e.target.value);
    this.setState({email: e.target.value});
  }

  onChangePassword(e) {
    this.setState({password: e.target.value});
  }

  basic(){
    this.auth.basic(this.state.email, this.state.password)
    .then((userId)=>{
      this.setState({userId: userId});
      cookie.save('userId', userId, { path: '/' });
    })
    .catch((error)=>{
      alert(error.message);
    });
  }

  twitter() {
    this.auth.twitter()
    .then((userId)=>{
      this.setState({userId: userId});
      cookie.save('userId', userId, { path: '/' });
    })
    .catch((error)=>{
      alert(error.message);
    });

  }

  register() {
    this.auth.register()
    .then((userId)=>{
      this.setState({userId: userId});
      cookie.save('userId', userId, { path: '/' });
    })
    .catch((error)=>{
      alert(error.message);
    });
  }

  logout() {
    //console.log('logout');
    const firebase = this.props.fb;
    firebase.auth().signOut();
    cookie.remove('userId', { path: '/' });

  } 

  render() {
    console.log('login',this.state);

    /*
    //redirect
    if (this.state.userId) {
      this.props.router.replaceWith('/main');
    }
    */

    const tableStyle = {
      margin: '0 auto'
    };
    return (
      <div id="authArea">
        <h2> Mccookie </h2>
        <table style={tableStyle}><tbody>
        <tr>
          <td colSpan={2}>
            <TextField
              hintText="メールアドレス"
              onChange={this.onChangeEmail.bind(this)}
            />
            <br/>
            <TextField
              hintText="Password Field"
              floatingLabelText="Password"
              type="password"
              onChange={this.onChangePassword.bind(this)}
              />
          </td>
        </tr>
        <tr>
          <td>
            <RaisedButton label="ログイン" primary={true} onTouchTap={this.basic.bind(this)} />
          </td>
          <td>
            <RaisedButton label="Twitter認証" primary={true} onTouchTap={this.twitter.bind(this)} />
          </td>
        </tr>
        <tr>
          <td>
            <RaisedButton label="新規登録" primary={false} onTouchTap={this.register.bind(this)} />
          </td>
        </tr>
        </tbody></table>
      </div>
    );
  }
}



