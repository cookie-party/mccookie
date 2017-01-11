import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {query} from './util/agent';

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
    const newlist = {
      name: this.state.name,
      wordlist: '',
      categoryId: '',
      createUserId: this.props.userId,
      activate: 1
    };
    query('wordbook', newlist)
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