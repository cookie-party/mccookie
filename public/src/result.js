import React, {Component} from 'react';

export default class Result extends Component{
  constructor(props, state) {
    super();
    console.log('Result render');
    this.state = {};    
  }
  render() {
    const style = {
      textAlign: 'center'
    };
    return (
      <div>
        <p style={style}> Recognized: {this.props.result || '?'} </p>
      </div>
    );
  }
}
