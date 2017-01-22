import React, {Component} from 'react';

import Paper from 'material-ui/Paper';

require('velocity-animate');
require('velocity-animate/velocity.ui');
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
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

export default class WordPaper extends Component {
  constructor(props, state){
    super(props, state);  
    this.state = {
      keytouch: false,
      hovering: false,
    };
  }

  handleClicked(){
    //TODO detailを出す
    this.setState({hovering: !this.state.hovering});
  }

  whenMouseEntered () {
    this.setState({ hovering: true });
  }

  whenMouseLeft() {
    this.setState({ hovering: false });
  }

  render() {
    const styles = {
      value: {
        width: '100%',
//        height: 120,
        cursor: 'pointer',
        fontSize: '20pt'
      },
      itemView: {
        display: 'flex',
        flexFlow: 'row wrap',
        alignItems: 'center',
        animation: 'roll 2s linear infinite'
      },
    };

    const item = this.props.item;
    let key = item.key || 'nokey';
    let value = item.value || 'novalue';

    let strLength = 0;

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

    let flipAnimation;
    if (this.state.hovering) {
      flipAnimation = FlipAnimations.up;
    } else {
      flipAnimation = FlipAnimations.down;
    }

    return (
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
    );
  }

}