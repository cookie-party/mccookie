import React, {Component} from 'react';

export default class Dcanvas extends Component{
  constructor(props, state) {
    super();
    console.log('Dcanvas render');
    //this.state = {}; 
    this.canvas = null;
  }

  componentDidMount() {
    //console.log('Dcanvas componentDidMount',document.getElementById('canvas'));
    this.canvas = document.getElementById('canvas');
    this.canvas && this.canvas.addEventListener('mousemove', (e)=>{
      if(e.buttons === 1){
        //console.log('onMouseMove', e);
        this.props.emitter.emit('onMouseMove', {x: e.offsetX, y: e.offsetY});
      }
    }, false);
  }

  render() {
    return (
      <div>
        <canvas id="canvas" ref={
          (c) => { 
            if(!this.props.context){
              const context = c.getContext('2d');
              this.props.emitter.emit('ctx', context);
            }
          }
        } width="224" height="224"></canvas>
      </div>
    );
  }
}