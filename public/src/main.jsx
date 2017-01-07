import React, {Component} from 'react';

import EventEmitter2 from 'EventEmitter2';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
//import FlatButton from 'material-ui/FlatButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Paper from 'material-ui/Paper';

import {getUserData} from './util/dbUtil';
import {query, post} from './util/agent';

import Register from './register';
import Timeline from './timeline';
import SearchBox from './components/SearchBox';
import MyProfile from './myprof';

class Main extends Component{
  constructor(props, state){
    super(props, state);
    const emitter = new EventEmitter2();
    this.userId = this.props.userId;

    this.state = {
      emitter,
      contents: 0,
      wordList: [{
        id: 0,
        key: '覚えたい単語',
        value: '覚えたい意味',
        tagList: ['#タグ付けも可能'],
        updateDate: new Date().getTime()
      }],
      searchWord: '',
      userId: this.props.userId,
      userInfo: {},
    };

    this.state.emitter.on('cookieRegister', (kv)=>{
      post('newword', {
        id: kv.id,
        key: kv.key,
        value: kv.value,
        tags: kv.tagList.join(','),
      }).then((res)=>{
        const wordlist = this.state.wordList;
        wordlist.push(kv);
        this.setState({wordList: wordlist});
      }).catch((err)=>{
        alert('Regist Error', err);
        console.log('Regist Error', err);
      });
    }).on('cookieSearch', (searchWord)=> {
      this.setState({searchWord});
    }).on('cookieEditMyprof', (searchWord)=> {
      this.setState({contents: 1});
    }).on('cookieRegisterMyprof', (searchWord)=> {
      //register
    }).on('cookieItemDelete', (id)=> {
      //delete
    });

  }

  componentDidMount() {
    //ユーザ情報取得
    getUserData(this.userId)
    .then((results)=>{
      this.setState({
        userInfo: results.userInfo
      });
      return query('getTimeline', this.userId);
    }).then((words)=>{
      if(words.length > 0){
        const wordList = this.state.wordList;
        words.map((r)=>{
          wordList.push({id: r.id, key: r.keyText, value: r.valueText, tags: r.tagList, updateDate: r.updateDate});
        });
        this.setState({
          wordList: wordList
        });
      }
    }).catch((err)=>{
      console.log('getUserData',err);
    });
  }

  handleTop() {
    this.setState({contents: 0});
  }
  handleMyprof() {
    this.setState({contents: 1});
  }

  handleLogout() {
    this.props.onLogout(this.userId);
  }

  render() {
    const styles = {
      column: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: '100%'
      },
      row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%'
      },
      titlebar: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%'
      },
      main: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 50,
      },
      mainTable: {
        border : '1px solid',
        borderColor: '#e9d97f',
        margin: '10 auto',
        width: '90%',
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'nowrap',
        justifyContent: 'space-around',
        alignItems: 'center',
      },
      register: {
        display: 'flex',
        flexWrap: 'nowrap',
        justifyContent: 'space-around',
        width: 700,
//        height: '150px',
        margin: 30
      },
      timeline: {
        display: 'flex',
        flexWrap: 'nowrap',
        justifyContent: 'space-around',
        width: 700,
//        height: '600',
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
      tdStyle1: {
        border : '1px solid orange',
      },
    };

    const titleBar = (
      <div style={styles.row}>
        <div style={{width: 200}}>
          <img src='../img/title_logo.png' style={{cursor: 'pointer'}} width='100%' onTouchTap={this.handleTop.bind(this)}/>
        </div>
        <div>
          <SearchBox {...this.state}/>
        </div>
        <div style={{width: 250, display: 'flex'}}>
          <div style={{margin: 10}}>
            <RaisedButton label="MyProfile" onClick={this.handleMyprof.bind(this)} />
          </div>
          <div style={{margin: 10}}>
            <RaisedButton label="Logout" onClick={this.handleLogout.bind(this)} />
          </div>
        </div>
      </div>
    );

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
      page = <MyProfile {...this.state}/>;
    }
    else if(this.state.contents === 2){
      page = <div/>;
    }

    return (
      <div>
        <div style={styles.column}>

          <Paper zDepth={0} style={styles.titlebar}>
            {titleBar}
          </Paper>

          <div style={styles.main}>
            {page}
          </div>

        </div>
      </div>
    );
  }
}

export default Main;