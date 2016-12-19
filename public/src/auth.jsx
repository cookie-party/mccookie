import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

export default class Auth extends Component{
  constructor(props, state){
    super(props, state);

    this.state = {
      email: '',
      password: ''
    };
  }

  onChangeEmail(e) {
    this.setState({email: e.target.value});
  }

  onChangePassword(e) {
    this.setState({password: e.target.value});
  }

  authenticate() {
    //console.log('authenticate '+this.state.email+' '+this.state.password);
    if(this.state.email === 'test') {
      //this.props.emitter.emit('authed', 'testuser');
      this.props.authenticated('test');
    } else {
      const firebase = this.props.fb;
      // 既存ユーザーのログイン機能
      firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((ret)=>{
        //console.log('logined '+JSON.stringify(ret));
        const userId = firebase.auth().currentUser.uid;
        //console.log('uid = '+userId);
        this.props.authenticated(userId);
      })
      .catch(function(error) {
        alert('loginできません（' + error.message + '）');
      });  
    }
  }

  register() {
    //console.log('register '+this.state.email+' '+this.state.password);
    const firebase = this.props.fb;
    // 新規ユーザーを登録
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
    .catch(function(error) {
      alert('登録できません（' + error.message + '）');
    });
  }

  logout() {
    //console.log('logout');
    const firebase = this.props.fb;
    firebase.auth().signOut();
  } 

  render() {
    const tableStyle = {
      margin: '0 auto'
    };
    return (
      <div id="authArea">
        <table style={tableStyle}>
        <tr>
          <td style={{colspan: 2}}>
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
            <RaisedButton label="ログイン" primary={true} onClick={this.authenticate.bind(this)} />
          </td>
          <td>
            <RaisedButton label="新規登録" primary={true} onClick={this.register.bind(this)} />
          </td>
        </tr>
        </table>
      </div>
    );
  }
}



