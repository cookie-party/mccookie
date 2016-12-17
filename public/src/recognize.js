import React, {Component} from 'react';
import FlatButton from 'material-ui/FlatButton';
//import injectTapEventPlugin from 'react-tap-event-plugin';
//injectTapEventPlugin();

export default class Recognize extends Component{
  constructor(props, state) {
    super();
    console.log('Recognize render');
    this.state = {};    
  }

  onRec() {
    this.props.emitter.emit('onRecognize', ()=>{
    });
  }

  onClear() {
    this.props.emitter.emit('onClear', ()=>{
    });
  }

  render() {
    return (
      <div>
        <FlatButton primary={true} id="btn_clear" onClick={this.onClear.bind(this)}>Clear</FlatButton>
      </div>
    );
  }
}

//        <FlatButton primary={true} id="btn_recognize" onClick={this.onRec.bind(this)}>Recognize</FlatButton>
