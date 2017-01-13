import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

export default class DialogBox extends Component{
  constructor(props, state){
    super(props, state);
    this.state = {
    };
  }

  render() {
    const title = this.props.title || 'Dialog box';
    const message = this.props.message || 'Message';
    const flag = this.props.flag || false;

    const action = [
      <RaisedButton
        label="OK"
        primary={false}
        onTouchTap={this.props.onOK}
      />
      ,
      <FlatButton
        label="Cancel"
        primary={false}
        onTouchTap={this.props.onCancel}
      />
    ];

    return (
      <div>
        <Dialog
          title={title}
          actions={action}
          modal={true}
          open={flag}
        >
          {message}
        </Dialog>
      </div>
    );
  }
}
