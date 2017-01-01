import React, {Component} from 'react';
import TextField from 'material-ui/TextField';

export default class SeachBox extends Component {
  constructor(props, state){
    super(props, state);  
  }

  onChangeSearchWord(e) {
    this.props.emitter.emit('cookieSearch', e.target.value);
  }

  render() {
    const style = {
      display: 'flex',
      justifyContent: 'center',
    };
    return (
      <div style={style}>
        <TextField
          hintText="検索"
          onChange={this.onChangeSearchWord.bind(this)}
        />
      </div>
    );
  }

}