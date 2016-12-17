//kumiko

import React, {Component} from 'react';
import EventEmitter2 from 'EventEmitter2';

//import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Paper from 'material-ui/Paper';

import Dcanvas from './dcanvas';
import Percentage from './percentage';
import Recognize from './recognize';
import Transformed from './transformed';
import Result from './result';
//import NN from './neuralnet';

class Main extends Component{
  constructor(props, state){
    super(props, state);
    const emitter = new EventEmitter2();

    this.state = {
      emitter,
      context: null,
      imageData: null,
      probs: {0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0},
      result: null,
      transformed: null
    };

//    const nn = new NN();

    this.state.emitter.on('ctx', (context)=>{
      //console.log('context',context);
      const imageData = context.getImageData(0, 244, 1, 1).data;
      this.setState({
        context: context,
        imageData: imageData
      });
    }).on('onRecognize', ()=>{
      //console.log('onRecognize');
//      const ret = nn.recognize(this.state.context);
//      this.setState({probs: ret.probs, transformed: ret.img, result: ret.result});
    }).on('onClear', ()=>{
      //console.log('onClear');
      this.state.context.fillStyle = 'white';
      this.state.context.fillRect(0, 0, 224, 224);
    }).on('onMouseMove', (event)=>{
      //console.log('onMouseMove');
      this.state.context.fillStyle = 'black';
      this.state.context.fillRect(event.x, event.y, 12, 12);
      //auto recog?
//      const ret = nn.recognize(this.state.context);
//      this.setState({probs: ret.probs, transformed: ret.img, result: ret.result});
    });
  }

  render() {
    const style = {
      margin: '0 auto'
    };
    const paperstyle = {
      height: 224,
      width: 224,
      margin: 20,
      textAlign: 'center',
      display: 'inline-block',
    };
    return (
      <div>
        <div>
          <table style={style}>
            <tr>
              <td>
                <Paper style={paperstyle} zDepth={2} >
                  <Dcanvas  {...this.state} />
                </Paper>
              </td>
              <td>
                <Percentage  {...this.state} />
              </td>
            </tr>
            <tr>
              <td>
                <Transformed {...this.state}/>
              </td>
              <td>
                <Recognize {...this.state}/>
              </td>
            </tr>
            <tr>
              <td>
                <Result {...this.state}/>
              </td>
            </tr>
          </table>
        </div>
      </div>
    );
  }
}

export default Main;