import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

import {query} from '../util/agent';

export default class AddMylistDialog extends Component{
  constructor(props, state){
    super(props, state);
    this.state = {
      booklist: [],
      selectedBookId: -1
    };
  }

  componentDidMount() {
    query('mybooklist',this.props.userId)
    .then((result)=>{
      const booklist = result;
      this.setState({booklist: booklist});
    }).catch((err)=>{
      console.log(err);
    });
  }

  onChange(e) {
    this.setState({selectedBookId: e.target.value});
  }

  render() {
    const styles = {
      radioButton: {
        marginTop: 16,
      },
    };

    const title = this.props.title || 'Dialog box';
    const message = this.props.message || 'Message';
    const flag = this.props.flag || false;

    const action = [
      <RaisedButton
        label="OK"
        primary={false}
        onTouchTap={()=>{this.props.onOK(this.state.selectedBookId);}}
      />
      ,
      <FlatButton
        label="Cancel"
        primary={false}
        onTouchTap={this.props.onCancel}
      />
    ];

    const radios = this.state.booklist.map((book, i)=>{
      return (
        <RadioButton
          key={i}
          value={`${book.id}`}
          label={`${book.name}`}
          style={styles.radioButton}
          onClick={this.onChange.bind(this)}
        />
      );
    });

    return (
      <div>
        <Dialog
          title={title}
          actions={action}
          modal={true}
          open={flag}
        >
          {message}
          <RadioButtonGroup name="shipSpeed" defaultSelected="not_light">
            {radios}
          </RadioButtonGroup>
        </Dialog>
      </div>
    );
  }
}
