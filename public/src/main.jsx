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
import Words from './words';

import {getUserData, getWordList} from './dbUtil';
import {query} from './agent';

class Main extends Component{
  constructor(props, state){
    super(props, state);
    const emitter = new EventEmitter2();
    this.userId = this.props.userId;

    this.state = {
      emitter,
      contents: 0,
      wordList: [],
      userId: this.props.userId,
      userInfo: {},
      userScore: {},
      userBookScore: {}
    };

    this.state.emitter.on('cookieStart',(id)=>{
      //単語帳実践モード
      getWordList(id)
      .then((results)=>{
        let wordList = results.map((data)=>{
          return {
            key: data.keyText,
            value: data.valueText,
            ate: false //TODO ate情報とってくる
          };
        });

        //テストよう
        if(wordList.length <= 0){
          wordList = [
            {key: 'key', value: 'value', ate: true},
            {key: 'key2', value: 'value2', ate: false},
          ];
        }

        this.setState({ 
          contents: 3,
          wordList: wordList
        });
      }).catch((err)=>{
        console.log('getWordList',err);
        //テストよう
        let wordList = [
          {key: 'key', value: 'value', ate: true},
          {key: 'key2', value: 'value2', ate: false},
        ];

        this.setState({ 
          contents: 3, //テスト用
          wordList: wordList
        });
      });
    }).on('cookieRegister',()=>{
      //TODO 単語帳登録モード
    }).on('cookieAte', (id, ate)=>{
      const list = this.state.wordList;
      list[id].ate = ate;
      this.setState({wordList: list});
    });

  }

  componentDidMount() {
    //ユーザ情報取得
    getUserData(this.userId)
    .then((results)=>{
      this.setState({
        userInfo: results.userInfo,
        userScore: results.userScore,
        userBookScore: results.userBookScore,
      });
    }).catch((err)=>{
      console.log('getUserData',err);
    });
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
    const styles = {
      center: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
      },
      tableStyle1: {
        border : '1px solid black',
        borderCollapse: 'collapse',
        borderColor: 'red',
        height: '75px',
        margin: '10 auto',
        tableLayout: 'fixed',
        width: '90%'
      },
      tableStyle2: {
        border : '1px solid black',
        borderCollapse: 'collapse',
        borderColor: 'red',
        height: '450px',
        margin: '10 auto',
        tableLayout: 'fixed',
        width: '90%'
      },
      titleStyle: {
        color: 'red',
        fontSize: '30px'
      },
      tdStyle1: {
        border : '1px solid orange',
      },
      tdStyle2: {
        border : '1px solid orange',
      },
    };

    let page = <div/>;
    
    if(this.state.contents === 0){
      page = (
            <table style={styles.tableStyle2}>
            <tbody>
              <tr>
                <td style={styles.tdStyle2}>
                  <MyList {...this.state}/>
                </td>
              </tr>
              <tr>
                <td style={styles.tdStyle2}>
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
    else if(this.state.contents === 3){
      page = <Words {...this.state}/>;
    }

    return (
      <div>
        <div style={styles.center}>
          <table style={styles.tableStyle1}>
          <tbody>
            <tr>
              <td style = {styles.tdStyle1}>
                <img src='../img/logo.png' style={{cursor: 'pointer'}} width='100%' onTouchTap={this.handleTop.bind(this)}/>
              </td>
              <td style = {styles.tdStyle1}>
                <FlatButton onClick={this.handleCookieBox.bind(this)}>Cookie Box</FlatButton>
              </td>
              <td style = {styles.tdStyle1}>
                <FlatButton onClick={this.handleCookieCommunity.bind(this)}>Cookie Community</FlatButton>
              </td>
              <td style = {styles.tdStyle1}>
                Search Other Sweets
              </td>
              <td style = {styles.tdStyle1}>
                <FlatButton label="Notification" />
              </td>
              <td style = {styles.tdStyle1}>
                <FlatButton label="Edit Profile" />
              </td>
              <td style = {styles.tdStyle1}>
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