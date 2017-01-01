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

import {getUserData, getWordList} from './dbUtil';
import {query} from './agent';

import Register from './register';
import Timeline from './timeline';
import SearchBox from './components/SearchBox';

class Main extends Component{
  constructor(props, state){
    super(props, state);
    const emitter = new EventEmitter2();
    this.userId = this.props.userId;

    this.state = {
      emitter,
      contents: 0,
      wordList: [{
        key: '覚えたい単語',
        value: '覚えたい意味',
      }],
      searchWord: '',
      userId: this.props.userId,
      userInfo: {}
    };

    this.state.emitter.on('cookieRegister', (kv)=>{
      const wordlist = this.state.wordList;
      wordlist.push(kv);
      this.setState({wordList: wordlist});
    }).on('cookieSearch', (searchWord)=> {
      this.setState({searchWord});
    });

  }

  componentDidMount() {
    //ユーザ情報取得
    getUserData(this.userId)
    .then((results)=>{
      this.setState({
        userInfo: results.userInfo
      });
    }).catch((err)=>{
      console.log('getUserData',err);
    });
  }

  handleTop() {
    this.setState({contents: 0});
  }

  handleLogout() {
    this.props.onLogout(this.userId);
  }

  render() {
    const styles = {
      main: {
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
      titleStyle: {
        color: 'red',
        fontSize: '30px'
      },
      tdStyle1: {
        border : '1px solid orange',
      },
      mainTable: {
        border : '1px solid black',
        borderColor: 'red',
//        height: '450px',
        margin: '10 auto',
        tableLayout: 'fixed',
        width: '90%',
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'nowrap',
        justifyContent: 'space-around',
        alignItems: 'center',
      },
      register: {
//        height: '150px',
        margin: 30
      },
      timeline: {
        width: '450px',
        height: '400px',
      },
    };

    let page = <div/>;
    
    if(this.state.contents === 0){
      page = (
        <div style={styles.mainTable}>
          <div style={styles.register}>
            <Register {...this.state}/>
          </div>
          <div style={styles.timeline}>
            <Timeline {...this.state}/>
          </div>
        </div>
      );
    }
    else if(this.state.contents === 1){
      page = <div/>;
    }

    return (
      <div>
        <div style={styles.main}>
          <table style={styles.tableStyle1}>
          <tbody>
            <tr>
              <td style = {styles.tdStyle1}>
                <img src='../img/title_logo.png' style={{cursor: 'pointer'}} width='100%' onTouchTap={this.handleTop.bind(this)}/>
              </td>
              <td style = {styles.tdStyle1}>
                <SearchBox {...this.state}/>
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