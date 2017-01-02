import React, {Component} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Paper from 'material-ui/Paper';
import IconCached from 'material-ui/svg-icons/action/cached';

require('velocity-animate');
require('velocity-animate/velocity.ui');

import {VelocityComponent, velocityHelpers} from 'velocity-react';

import StarIcon from 'material-ui/svg-icons/toggle/star';
import LibraryAddIcon from 'material-ui/svg-icons/av/library-add';
import ReplyIcon from 'material-ui/svg-icons/content/reply';
import IconView from './IconView';

const FlipAnimations = {
  down: velocityHelpers.registerEffect({
    defaultDuration: 1100,
    calls: [
      [{
        transformPerspective: [ 800, 800 ],
        transformOriginX: [ '50%', '50%' ],
        transformOriginY: [ 0, 0 ],
        rotateY: [0, 'spring'],
        backgroundColor: ['#3f83b7', '#5797c0'],
      }, 1, {
        delay: 100,
        easing: 'ease-in',
      }]
    ],
  }),

  // Flips the box up nearly 180°.
  up: velocityHelpers.registerEffect({
    defaultDuration: 200,
    calls: [
      [{
        transformPerspective: [ 800, 800 ],
        transformOriginX: [ '50%', '50%' ],
        transformOriginY: [ 0, 0 ],
        rotateY: 180,
        backgroundColor: '#5797c0',
      }]
    ],
  }),
};

export class TableRow extends Component { 
  constructor(props, state){
    super(props,state);
    this.state = {
      keytouch: false,
      hovering: false,
    };
  }

  handleClicked(){
    //TODO detailを出す
    this.setState({keytouch: !this.state.keytouch});
  }

  whenMouseEntered () {
    this.setState({ hovering: true });
  }

  whenMouseLeft() {
    this.setState({ hovering: false });
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
      value: {
        width: 400,
//        height: 120,
        cursor: 'pointer',
        fontSize: '20pt'
      },
      time: {
        width: '30px',
        fontSize: '5pt'
      },
      itemView: {
        display: 'flex',
        flexFlow: 'row wrap',
        alignItems: 'center',
        animation: 'roll 2s linear infinite'
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
    const key = item.key || 'nokey';
    const value = item.value || 'novalue';
    let strLength = 0;
    let time = 0;
    const now = new Date().getTime;
    if(item.time){
      time = now - item.time;
    }

    let itemView = '';
    if(this.state.hovering){ 
      itemView = (
        <ReactCSSTransitionGroup
          transitionName="opacity"
          transitionAppear={true}
          transitionAppearTimeout={1000}
          transitionEnter={true}
          transitionEnterTimeout={1000}
          transitionLeave={false}
          >
          <div style={{margin: 20, transform: 'rotateY(180deg)'}}>
            {value}
          </div>
        </ReactCSSTransitionGroup>
      ); 
      strLength = value.length;
    }
    else {
      itemView = (
        <div style={{margin: 20}}>
          {key}
        </div>
      ); 
      strLength = key.length;
    }
    if(strLength > 15) {
      styles.value.fontSize = '12pt';
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
      </div>
    );

    let flipAnimation;
    if (this.state.hovering) {
      flipAnimation = FlipAnimations.up;
    } else {
      flipAnimation = FlipAnimations.down;
    }

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
        <VelocityComponent animation={flipAnimation}>
        <div
          onMouseEnter={this.whenMouseEntered.bind(this)}
          onMouseLeave={this.whenMouseLeft.bind(this)}>
          <Paper style={styles.value} zDepth={2} onTouchTap={this.handleClicked.bind(this)}>
            <div style={styles.itemView}>
                  {itemView}
            </div>
          </Paper>
        </div>
        </VelocityComponent>
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

