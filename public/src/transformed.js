import React, {Component} from 'react';
import nj from './lib/numjs';

export default class Transformed extends Component{
  constructor(props, state) {
    super();
    console.log('Transformed render');
    this.state = {};    
  }
  render() {
    const transformed = document.getElementById('transformed');
    this.props.transformed && nj.images.save(this.props.transformed, transformed);
    return (
      <div>
        <canvas id="transformed" width="28" height="28"></canvas>
      </div>
    );
  }
}
