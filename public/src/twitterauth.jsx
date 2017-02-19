import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {authenticate} from './util/agent';

export default class TAuth extends Component{
  constructor(props, state){
    super(props, state);
  }

  authenticate() {
    // authenticate().then((res)=>{
    //   console.log('Logined');
    //   this.props.onLogin('test');
    // }).catch((err)=>{
    //   console.log(err);
    // });
  }

  render() {
    const styles = {
      paper: {
        width: '100%',
        height: '100%',
      },
      row: {
        display: 'flex',
        flexFlow: 'row wrap',
        justifyContent: 'center',
      },
      column: {
        display: 'flex',
        flexFlow: 'column wrap',
        justifyContent: 'center',
      },
    };
    return (
      <div id="authArea">
        <div style={styles.row}>
          <div style={styles.column}>
            <a href='/api/v1/twitter/auth'>Login</a>
          </div>
        </div>
      </div>
    );
  }
}

//            <RaisedButton label="Login" primary={true} onClick={this.authenticate.bind(this)} />


