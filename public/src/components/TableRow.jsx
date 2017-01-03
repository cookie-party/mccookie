import React, {Component} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import StarIcon from 'material-ui/svg-icons/toggle/star';
import LibraryAddIcon from 'material-ui/svg-icons/av/library-add';
import ReplyIcon from 'material-ui/svg-icons/content/reply';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import IconView from './IconView';
import WordPaper from './WordPaper';

export class TableRow extends Component { 
  constructor(props, state){
    super(props,state);
  }

  onReply() {
    console.log('onReply');
  }

  onAddMyList() {
    console.log('onAddMyList');
  }

  onLike() {
    console.log('onLike');
  }

  onDelete() {
    console.log('onDelete');
    this.props.emitter.emit('cookieDeleteItem', this.props.item.id);
  }

  render() {
    const styles = {
      row: {
        display: 'flex',
        flexFlow: 'row wrap',
        alignItems: 'flexStart',
      },
      column: {
        display: 'flex',
        flexFlow: 'column wrap',
        alignItems: 'flexStart',
      },
      header: {
        display: 'flex',
        flexFlow: 'row wrap',
        alignItems: 'flexStart',
      },
      icon: {
        width: 50,
        height: 50,
      },
      userid: {
        width: '50px',
        fontSize: '5pt'
      },
      username: {
        width: '150px',
        fontSize: '12pt',
        fontWeight: 'bold',
      },
      time: {
        width: '30px',
        fontSize: '5pt'
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
    let time = 0;
    const now = new Date().getTime;
    if(item.time){
      time = now - item.time;
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
            {time} ms
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
          <div style={{margin: 10}}>
            <img src={icon} style={styles.icon}/>
          </div>
          <div>
            {content}
          </div>
        </div>
      </ReactCSSTransitionGroup>
    );
  }
}

