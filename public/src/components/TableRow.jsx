import React, {Component} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import StarIcon from 'material-ui/svg-icons/toggle/star';
import LibraryAddIcon from 'material-ui/svg-icons/av/library-add';
import ReplyIcon from 'material-ui/svg-icons/content/reply';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import IconView from './IconView';
import WordPaper from './WordPaper';

import moment from 'moment';

//TODO 画像も表示する
export class TableRow extends Component { 
  constructor(props, state){
    super(props,state);
  }

  onReply() {
    console.log('onReply');
  }

  onAddMyList() {
    console.log('onAddMyList');
    this.props.emitter.emit('cookieItemToBook', this.props.item.id);
  }

  onLike() {
    console.log('onLike');
  }

  onDelete() {
    console.log('onDelete');
    this.props.emitter.emit('cookieItemDelete', this.props.item.id);
  }

  render() {
    const styles = {
      row: {
        display: 'flex',
//        flexFlow: 'row wrap',
//        justifyContent: 'space-around',
//        alignItems: 'flexStart',
      },
      column: {
        display: 'flex',
        flexFlow: 'column wrap',
        justifyContent: 'center',
      },
      header: {
        display: 'flex',
        flexFlow: 'row wrap',
        justifyContent: 'center',
      },
      icon: {
        width: 50,
        height: 50,
      },
      username: {
        flexGrow: 3,
        fontSize: '12pt',
        fontWeight: 'bold',
        margin: 5,
      },
      userid: {
        flexGrow: 0,
        fontSize: '5pt',
        margin: 5,
      },
      time: {
        flexGrow: 0,
        fontSize: '5pt',
        margin: 5,
      },
      smallIcon: {
        width: 20,
        height: 20,
        fill: '#42AFE3', //d0d8e5
        cursor: 'pointer',
      }, 
    };

    const item = this.props.item;

    const icon = item.icon || '../../img/satomi.jpg';
    const username = item.userid || 'satomi';
    const userid = item.username || '@satomi';
//    const key = item.key || 'nokey';
//    const value = item.value || 'novalue';

    let time = '';
    const now = moment();
    if(item.time){
      const day = now.diff(moment(item.time), 'days');
      const hour = now.diff(moment(item.time), 'hours');
      const minute = now.diff(moment(item.time), 'minutes');
      const second = now.diff(moment(item.time), 'seconds');
      if(day !== 0) {
        time += day + ' days';
      } else if(hour !== 0) {
        time += hour + ' hours';
      } else if(minute !== 0) {
        time += minute + ' minutes';
      } else if(second !== 0) {
        time += second + ' seconds';
      }
    }

    const iconlist = (
      <div style={styles.row}>
        <div style={{margin: 5}}>
          <IconView icon={ReplyIcon} style={styles.smallIcon} onClick={this.onReply.bind(this)}/>
        </div>
        <div style={{margin: 5}}>
          <IconView icon={LibraryAddIcon} style={styles.smallIcon} onClick={this.onAddMyList.bind(this)}/>
        </div>
        <div style={{margin: 5}}>
          <IconView icon={StarIcon} style={styles.smallIcon} onClick={this.onLike.bind(this)}/>
        </div>
        <div style={{margin: 5}}>
          <IconView icon={DeleteIcon} style={styles.smallIcon} onClick={this.onDelete.bind(this)}/>
        </div>
      </div>
    );

    const content = (
      <div style={styles.column}>
        <div style={styles.header}>
          <div style={styles.username}>
            {username}
          </div>
          <div style={styles.userid}>
            {userid}
          </div>
          <div style={styles.time}>
            {time}
          </div>
        </div>
        <WordPaper {...this.props}/>
        <div style={styles.row}>
          {iconlist}
        </div>
      </div>
    );

    return (
      <ReactCSSTransitionGroup
          transitionName="animation"
          transitionAppear={true}
          transitionAppearTimeout={500}
          transitionEnter={true}
          transitionEnterTimeout={500}
          transitionLeave={true}
          transitionLeaveTimeout={500}
          >
        <div style={styles.row}>
          <div style={{flexGrow: 0, margin: 10}}>
            <img src={icon} style={styles.icon}/>
          </div>
          <div style={{flexGrow: 1, margin: 10}}>
            {content}
          </div>
        </div>
      </ReactCSSTransitionGroup>
    );
  }
}

