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
      emitter
    };

  }

  render() {
    const tableStyle1 = {
      border : '1px solid black',
      borderCollapse: 'collapse',
      borderColor: 'red',
      height: '75px',
      margin: '10 auto',
      tableLayout: 'fixed',
      width: '80%'
    };
    const tableStyle2 = {
      border : '1px solid black',
      borderCollapse: 'collapse',
      borderColor: 'red',
      height: '400px',
      margin: '10 auto',
      tableLayout: 'fixed',
      width: '80%'
    };
    const titleStyle = {
      color: 'red',
      fontSize: '30px'
    };
    const tdStyle1 = {
      border : '1px solid black',
      borderColor: 'orange'
    };
    const tdStyle2 = {
      border : '1px solid black',
      borderColor: 'orange'
    };
    return (
      <div>
        <div>
          <table style={tableStyle1}>
            <tr>
              <td style = {tdStyle1}>
                Cookie Box
              </td>
              <td style = {tdStyle1}>
                Cookie Community
              </td>
              <td style = {tdStyle1}>
                Search Other Sweets
              </td>
              <td style = {tdStyle1}>
                <FlatButton label="Notification" />
              </td>
              <td style = {tdStyle1}>
                <FlatButton label="Edit Profile" />
              </td>
              <td style = {tdStyle1}>
                <FlatButton label="Logout" />
              </td>
            </tr>
          </table>
          <table style={tableStyle2}>
            <tr>
              <td style={tdStyle2}>
                MyList
              </td>
              <td style={tdStyle2}>
                Discovery
              </td>
            </tr>
          </table>
        </div>
      </div>
    );
  }
}

export default Main;