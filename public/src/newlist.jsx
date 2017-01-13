import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {query, post} from './util/agent';

export default class NewList extends Component {
  constructor(props, state){
    super(props, state);
    this.state = {
      name: ''
    };
  }

  onChangeName(e) {
    this.setState({name: e.target.value});
  }

  onClickRegister() {
    post('newbook', {name: this.state.name})
    .then((result)=>{
      console.log(result);
    }).catch((err)=>{
      console.log(err);
    });
    this.setState({name: ''});
  }

  render() {
    const styles = {
      newlist: {
        display: 'flex',
      }
    };
    return (
      <div style={styles.newlist}>
        <TextField
          hintText='New list name'
          value={this.state.key}
          onChange={this.onChangeName.bind(this)}
          multiLine={true}
          rows={1}
          />
        <RaisedButton label="登録" primary={true} onClick={this.onClickRegister.bind(this)} />
      </div>
    );
  }

}