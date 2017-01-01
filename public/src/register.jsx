import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

export default class Register extends Component {
  constructor(props, state){
    super(props, state);  
    this.state = {
      key: '',
      value: '',
    };
  }

  onChangeKey(e) {
    this.setState({key: e.target.value});
  }
  onChangeValue(e) {
    this.setState({value: e.target.value});
  }
  onClickRegister(e){
    this.setState({key: '', value: ''});
    this.props.emitter.emit('cookieRegister', {key: this.state.key, value: this.state.value});
  }

  render(){
    const styles = {
      register: {
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'space-around',
        alignItems: 'flex-end',
      },
      icon: {
        width: '50px',
        height: '50px'
      },
    };

    const icon = this.props.userInfo.icon || '../img/satomi.jpg';

    return (
      <div style={styles.register}>
        <div style={{width: '50px', margin: 10}}>
            <img src={icon} style={styles.icon}/>
        </div>
        <div style={{margin: 10}}>
            <TextField
            hintText='単語'
            value={this.state.key}
            onChange={this.onChangeKey.bind(this)}
            multiLine={true}
            rows={1}
            rowsMax={2}
            />
        </div>
        <div style={{margin: 10}}>
            <TextField
            hintText="意味"
            value={this.state.value}
            onChange={this.onChangeValue.bind(this)}
            multiLine={true}
            rows={1}
            rowsMax={2}
            />
        </div>
        <div style={{margin: 10}}>
            <RaisedButton label="登録" primary={true} onClick={this.onClickRegister.bind(this)} />
        </div>
      </div>
    );
  }

}