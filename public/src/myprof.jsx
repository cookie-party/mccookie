import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import IconView from './components/IconView';
import Dictionary from './components/Dictionary';

export default class Myprofile extends Component {
  constructor(props, state){
    super(props, state);  
    this.init = {
      name: props.name || '',
      goal: props.goal || '',
      good: props.good || '',
      bad: props.bad || '',
      edited: false
    };
    this.state = this.init;
  }

  onChangeIcon(){
    //icon
    //画像アップロード
  }
  onChangeName(e) {
    this.setState({name: e.target.value, edit: true});
  }
  onChangeGoal(e) {
    this.setState({goal: e.target.value, edit: true});
  }
  onChangeGood(e) {
    this.setState({good: e.target.value, edit: true});
  }
  onChangeBad(e) {
    this.setState({bad: e.target.value, edit: true});
  }
  onClickRegister(e){
    if(this.state.edited) {
      this.props.emitter.emit('cookieRegisterMyprof', this.state);
      this.setState(this.init);
    }
  }

  render(){
    const styles = {
      row: {
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'space-around',
        //alignItems: 'baseline',
      },
      column: {
        display: 'flex',
        flexFlow: 'column nowrap',
        justifyContent: 'space-around',
        alignItems: 'flex-start',
      },
      icon: {
        width: 50,
        height: 50
      },
      smallIcon: {
        width: 30,
        height: 30,
        fill: '#42AFE3',
        cursor: 'pointer',
      }, 
    };

    const icon = this.props.userInfo.icon || '../img/satomi.jpg';

    const editMyiconName = (
      <div style={styles.row}>
        <div style={{width: '50px', margin: 10, cursor: 'pointer'}}
          onTouchTap={this.onChangeIcon.bind(this)}>
          <img src={icon} style={styles.icon}/>
        </div>
        <div style={{width: '50px', margin: 10}}>
          <TextField
            hintText='ユーザ名'
            value={this.state.name}
            onChange={this.onChangeName.bind(this)}
            multiLine={false}
            rows={1}
            rowsMax={1}
            />
        </div>
      </div>
    );

    const editMyprof = (
      <div style={styles.column}>
        <div style={{margin: 20}}>
          <TextField
            hintText='目標'
            value={this.state.goal}
            onChange={this.onChangeGoal.bind(this)}
            multiLine={false}
            rows={1}
            rowsMax={1}
            />
        </div>
        <div style={{margin: 20}}>
          <TextField
            hintText='得意'
            value={this.state.good}
            onChange={this.onChangeGood.bind(this)}
            multiLine={false}
            rows={1}
            rowsMax={1}
            />
        </div>
        <div style={{margin: 20}}>
          <TextField
            hintText='苦手'
            value={this.state.bad}
            onChange={this.onChangeBad.bind(this)}
            multiLine={false}
            rows={1}
            rowsMax={1}
            />
        </div>
      </div>
    );

    const registerButton = (
      <div style={styles.column}>
        <div style={{margin: 20}}>
          <RaisedButton label="登録" primary={true} onClick={this.onClickRegister.bind(this)} />
        </div>
      </div>
    );

    return (
        <div style={styles.column}>
          <div>{editMyiconName}</div>
          <div>{editMyprof}</div>
          <div>{registerButton}</div>
        </div>
    );
  }

}