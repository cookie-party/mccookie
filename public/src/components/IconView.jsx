import React, {Component} from 'react';

export default class IconView extends Component{
  constructor(props, state){
    super(props, state);
    this.state = {
      hovering: false
    };
  }

  whenMouseEntered() {
    this.setState({hovering: true});
  }
  whenMouseLeft() {
    this.setState({hovering: false});
  }

  onClick() {
    this.props.onClick && this.props.onClick();
  }

  render() {
    const style = this.props.style || {
      width: 20,
      height: 20,
      fill: '#d0d8e5',
      cursor: 'pointer',
    };

    if(this.state.hovering) {
      style.fill = '#42AFE3';
    }
    else {
      style.fill = '#d0d8e5';
    }

    const Icon = this.props.icon;
    return (
      <div
        onMouseEnter={this.whenMouseEntered.bind(this)}
        onMouseLeave={this.whenMouseLeft.bind(this)}>
        <Icon style={style} onTouchTap={this.onClick.bind(this)}/>
      </div>
    );
  }
}
