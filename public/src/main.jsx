import React, {Component} from 'react';

import EventEmitter2 from 'EventEmitter2';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import FaceIcon from 'material-ui/svg-icons/action/face';
import FolderIcon from 'material-ui/svg-icons/file/folder';
import Paper from 'material-ui/Paper';
import CircularProgress from 'material-ui/CircularProgress';

import {getUserData} from './util/dbUtil';
//import {query, post} from './util/agent';
import {getTweets, getUsers, getCredentials, getTimeline,
  postTweet,getUserTimeline} from './util/agent';

import Register from './register';
import Timeline from './timeline';
import SearchBox from './components/SearchBox';
import MyProfile from './myprof';
import DialogBox from './components/DialogBox';
import AddMylistDialog from './components/AddMylistDialog';
import MyList from './mylist';
import NewList from './newlist';

class Main extends Component{
  constructor(props, state){
    super(props, state);
    const emitter = new EventEmitter2();
    this.userId = this.props.userId;
    window.userId = this.userId; //TODO windowに入れない方がいいような気もする

    this.state = {
      emitter,
      contents: -1,
      wordList: [{
        id: 0,
        key: '覚えたい単語',
        value: '覚えたい意味',
        tagList: ['#タグ付けも可能'],
        updateDate: new Date().getTime()
      }],
      searchWord: '',
      userId: this.props.userId,
      userInfo: {
        icon: '',
      },
      onDeleteItem: ()=>{},
      onAddMylist: ()=>{},
      deleteDialogFlag: false,
      addmylistDialogFlag: false,
    };

    this.state.emitter.on('cookieRegister', (kv)=>{
      const kvtext = kv.key + ':' + kv.value+'  #くーこれ';
      postTweet(kvtext)
      .then((success)=>{
        console.log('success',success);
      }).catch((err)=>{
        console.log(err);
      });
      /*
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
      */
    }).on('cookieSearch', (searchWord)=> {
      this.setState({searchWord});
    }).on('cookieEditMyprof', ()=> {
      this.setState({contents: 1});
    }).on('cookieRegisterMyprof', ()=> {
      //register
    }).on('cookieListStart', (id)=>{
      /*
      query('getWordList',id)
      .then((wordList)=>{
        this.setState({contents: 0, wordList});
      }).catch((err)=>{
        console.log(err);
      });
      */
    }).on('cookieNewList', ()=>{
      this.setState({contents: 3});
    }).on('cookieItemToBook', (cardid)=> {
      this.setState({
        addmylistDialogFlag: true,
        onAddMylist:(bookid)=>{
          /*
          post('addMyList', {
            cardid: cardid,
            bookid: bookid,
          }).then(()=>{
            this.setState({addmylistDialogFlag: false});
          }).catch(()=>{
            alert('Miss Delete');
          });
          */
        }
      });
    }).on('cookieItemDelete', (id)=> {
      //delete
      const wordlist = this.state.wordList;
      let deleteIdx = null;
      wordlist.forEach((w, i)=>{
        if(w.id === id){
          deleteIdx = i;
        }
      });
      if(deleteIdx){
        this.setState({
          deleteDialogFlag: true,
          onDeleteItem:()=>{
            wordlist.splice(deleteIdx, 1);
            /*
            post('deleteWordId', {
              id: id,
              target: 'words'
            }).then(()=>{
              this.setState({wordList: wordlist, deleteDialogFlag: false});
            }).catch(()=>{
              alert('Miss Delete');
            });
            */
          }
        });
      }
    });

  }

  componentDidMount() {
    //ユーザ情報取得
    this.setState({contents: 0});
    //const key = encodeURI('@mccookie0120');
    getCredentials().then((res)=>{
      if(res){
        const response = JSON.parse(res);
        //console.log(response);
        this.setState({
          userInfo: {
            icon: response.profile_image_url
          }
        });
      }
//      return getTimeline();
      return getUserTimeline();
    }).then((res)=>{
      if(res){
        const response = JSON.parse(res);
        const wordList = response.map((v)=>{
          return {
            id: v.id,
            key: v.text,
            value: v.text,
            userid: v.user.name,
            username:v.user.screen_name,
            icon:v.user.profile_image_url,
          };
        });
        this.setState({
          wordList,
          contents: 0
        });
      }
    }).catch((err)=>{
      console.log(err);
    });

      /*
      const wordList = res.statuses.map((v)=>{
        return {
          id: v.id,
          key: v.text,
          value: v.text
        };
      });
      this.setState({
        wordList,
        contents: 0
      });
      /*
      if(words.length > 0){
        const wordList = this.state.wordList;
        words.map((r)=>{
          wordList.push({
            id: r.id, 
            key: r.keyText, 
            value: r.valueText, 
            tags: r.tagList, 
            updateDate: r.updateDate
          });
        });
        this.setState({
          userInfo,
          wordList,
          contents: 0
        });
      }
    }).catch((err)=>{
    });
    */

    /*
    let userInfo = {};
    query('user', this.state.userId)
    .then((retUserInfo)=>{
      userInfo = retUserInfo;
      return query('getTimeline', this.state.userId);
    }).then((words)=>{
      if(words.length > 0){
        const wordList = this.state.wordList;
        words.map((r)=>{
          wordList.push({
            id: r.id, 
            key: r.keyText, 
            value: r.valueText, 
            tags: r.tagList, 
            updateDate: r.updateDate
          });
        });
        this.setState({
          userInfo,
          wordList,
          contents: 0
        });
      }
    }).catch((err)=>{
      console.log('main',err);
    });

    query('tweets')
    .then((data)=>{
      //set wordlist
      console.log(data);
    }).catch((err)=>{
      console.log(err);
    });
    */
  }

  handleTop() {
    //ユーザ情報取得
    this.setState({contents: 0});
    /*
    query('getTimeline', this.state.userId)
    .then((words)=>{
      if(words.length > 0){
        const wordList = this.state.wordList;
        words.map((r)=>{
          wordList.push({
            id: r.id, 
            key: r.keyText, 
            value: r.valueText, 
            tags: r.tagList, 
            updateDate: r.updateDate
          });
        });
        this.setState({
          wordList: wordList,
          contents: 0
        });
      }
    }).catch((err)=>{
      console.log('main',err);
    });
    */
  }
  handleMyprof() {
    this.setState({contents: 1});
  }
  handleMyFolder() {
    this.setState({contents: 2});
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
        border : '.5px solid',
        borderColor: '#fcefd6',
        overflow: 'hidden',
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
        width: this.props.maxHeight, 
        padding: 50,
      },
      mainTable: {
        border : '.5px solid',
        borderColor: '#fcefd6',
        backgroundColor: '#fffcfc',
        margin: '10 auto',
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'nowrap',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
      },
      register: {
        display: 'flex',
        flexWrap: 'nowrap',
        justifyContent: 'center',
        width: '90%',
        margin: 30
      },
      timeline: {
        display: 'flex',
        flexWrap: 'nowrap',
        justifyContent: 'center',
        width: '90%',
      },
    };

    const titleBar = (
      <div style={styles.row}>
        <div style={{width: 250, height: 40, display: 'flex', justifyContent: 'space-around'}}>
          <img src='../img/title_logo.png' style={{cursor: 'pointer'}} width='70%' onTouchTap={this.handleTop.bind(this)}/>
        </div>
        <div>
          <SearchBox {...this.state}/>
        </div>
        <div style={{width: 150, display: 'flex'}}>
          <div style={{display: 'flex',  justifyContent: 'center', flexDirection: 'column',}}>
            <FolderIcon style={{cursor: 'pointer'}}
             onTouchTap={this.handleMyFolder.bind(this)}/>
          </div>
          <div style={{margin: 10}}>
            <IconMenu
            iconButtonElement={<IconButton><FaceIcon /></IconButton>}
            anchorOrigin={{horizontal: 'left', vertical: 'top'}}
            targetOrigin={{horizontal: 'left', vertical: 'top'}}
            >
              <MenuItem primaryText='MyProfile' onClick={this.handleMyprof.bind(this)} ></MenuItem>
              <MenuItem primaryText='logout' onClick={this.handleLogout.bind(this)} ></MenuItem>
            </IconMenu>
          </div>
        </div>
      </div>
    );

    let page = <CircularProgress/>;
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
      page = <MyList {...this.state}/>;
    }
    else if(this.state.contents === 3){
      page = <NewList {...this.state} />;
    }

    const dialogs = (
      <div>
        <div>
          <DialogBox
            title={'Delete Item'}
            message={'単語を削除しますか？'}
            flag={this.state.deleteDialogFlag}
            onOK={this.state.onDeleteItem.bind(this)}
            onCancel={()=>{
              this.setState({deleteDialogFlag: false});
            }}
          />
        </div>
        <div>
          <AddMylistDialog
            title={'Add Mylist'}
            message={'単語を追加しますか？'}
            flag={this.state.addmylistDialogFlag}
            onOK={this.state.onAddMylist.bind(this)}
            onCancel={()=>{
              this.setState({addmylistDialogFlag: false});
            }}
          />
        </div>
      </div>
    );

    return (
      <div>
        <div style={styles.column}>

          <Paper zDepth={0} style={styles.titlebar}>
            {titleBar}
          </Paper>

          <div style={styles.main}>
            {page}
          </div>

          <div>
            {dialogs}
          </div>

        </div>
      </div>
    );
  }
}

export default Main;