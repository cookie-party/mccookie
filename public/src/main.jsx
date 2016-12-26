import React, {Component} from 'react';

import EventEmitter2 from 'EventEmitter2';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Paper from 'material-ui/Paper';

import CookieBox from './cookiebox';
import CookieCommunity from './cookieCommunity';
import MyList from './mylist';
import Discovery from './discovery';

import {query} from './agent';

class Main extends Component{
  constructor(props, state){
    super(props, state);
    const emitter = new EventEmitter2();
    this.userId = this.props.userId;

    /*
    //superagent例
    query('user', 1)
    .then((res)=>{
      console.log('query ',res);
    }).catch((err)=>{
      console.log('query ',err);
    });
    */

    this.state = {
      emitter,
      contents: 0,
      userId: this.props.userId
    };

  }

  handleTop() {
    this.setState({contents: 0});
  }

  handleCookieBox() {
    this.setState({contents: 1});
  }

  handleCookieCommunity() {
    this.setState({contents: 2});
  }

  handleLogout() {
    this.props.onLogout(this.userId);
  }

  render() {
    const tableStyle1 = {
      border : '1px solid black',
      borderCollapse: 'collapse',
      borderColor: 'red',
      height: '75px',
      margin: '10 auto',
      tableLayout: 'fixed',
      width: '80%'
    };
    const tableStyle2 = {
      border : '1px solid black',
      borderCollapse: 'collapse',
      borderColor: 'red',
      height: '400px',
      margin: '10 auto',
      tableLayout: 'fixed',
      width: '80%'
    };
    const titleStyle = {
      color: 'red',
      fontSize: '30px'
    };
    const tdStyle1 = {
      border : '1px solid orange',
    };
    const tdStyle2 = {
      border : '1px solid orange',
    };

    let page = <div/>;
    
    if(this.state.contents === 0){
      page = (
            <table style={tableStyle2}>
            <tbody>
              <tr>
                <td style={tdStyle2}>
                  <MyList {...this.state}/>
                </td>
              </tr>
              <tr>
                <td style={tdStyle2}>
                  <Discovery {...this.state}/>
                </td>
              </tr>
            </tbody>
            </table>
      );
    }
    else if(this.state.contents === 1){
      page = <CookieBox {...this.state}/>;
    }
    else if(this.state.contents === 2){
      page = <CookieCommunity {...this.state}/>;
    }

    return (
      <div>
        <div>
          <table style={tableStyle1}>
          <tbody>
            <tr>
              <td style = {tdStyle1}>
                <img src='../img/logo.png' style={{cursor: 'pointer'}} width='100%' onTouchTap={this.handleTop.bind(this)}/>
              </td>
              <td style = {tdStyle1}>
                <FlatButton onClick={this.handleCookieBox.bind(this)}>Cookie Box</FlatButton>
              </td>
              <td style = {tdStyle1}>
                <FlatButton onClick={this.handleCookieCommunity.bind(this)}>Cookie Community</FlatButton>
              </td>
              <td style = {tdStyle1}>
                Search Other Sweets
              </td>
              <td style = {tdStyle1}>
                <FlatButton label="Notification" />
              </td>
              <td style = {tdStyle1}>
                <FlatButton label="Edit Profile" />
              </td>
              <td style = {tdStyle1}>
                <FlatButton label="Logout" onClick={this.handleLogout.bind(this)} />
              </td>
            </tr>
          </tbody>
          </table>

          {page}

        </div>
      </div>
    );
  }
}

export default Main;