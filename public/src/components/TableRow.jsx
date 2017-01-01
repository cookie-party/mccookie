import React, {Component} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Paper from 'material-ui/Paper';
import IconCached from 'material-ui/svg-icons/action/cached';

require('velocity-animate');
require('velocity-animate/velocity.ui');

import {VelocityComponent, velocityHelpers} from 'velocity-react';

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

  render() {
    const styles = {
      top: {
        display: 'flex',
        flexFlow: 'row wrap',
        alignItems: 'flexStart',
      },
      main: {
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
        width: '50px',
        height: '50px'
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
        cursor: 'pointer',
        fontSize: '20px'
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
    };

    const item = this.props.item;

    const icon = item.icon || '../../img/satomi.jpg';
    const username = item.userid || 'satomi';
    const userid = item.username || '@satomi';
    const key = item.key || 'nokey';
    const value = item.value || 'novalue';
    let time = 0;
    const now = new Date().getTime;
    if(item.time){
      time = now - item.time;
    }

    let itemView = '';
    if(this.state.hovering){ 
      itemView = (
        <div style={{margin: 20, transform: 'rotateY(180deg)'}}>
          {value}
        </div>
      ); 
    }
    else {
      itemView = (
        <ReactCSSTransitionGroup
          transitionName="rotateString"
          transitionAppear={true}
          transitionAppearTimeout={500}
          transitionEnter={false}
          transitionLeave={false}
          >
          <div style={{margin: 20}}>
            {key}
          </div>
        </ReactCSSTransitionGroup>
      ); 
    }

    let flipAnimation;
    if (this.state.hovering) {
      flipAnimation = FlipAnimations.up;
    } else {
      flipAnimation = FlipAnimations.down;
    }


    const content = (
      <div style={styles.main}>
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
      <div style={styles.top}>
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

