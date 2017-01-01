import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import SchoolIcon from 'material-ui/svg-icons/social/school';
import AddPhotoIcon from 'material-ui/svg-icons/image/add-a-photo';
import LabelOutlineIcon from 'material-ui/svg-icons/action/label-outline';

import IconView from './components/IconView';

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

  onKeyDictionary() {
    console.log('onKeyDictionary');
  }

  onValueDictionary() {
    console.log('onValueDictionary');
  }

  onAddTag() {
    console.log('onAddTag');
  }

  onAddPhoto() {
    console.log('onAddPhoto');
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
        alignItems: 'flex-end',
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

    return (
      <div style={styles.row}>
        <div style={{width: '50px', margin: 10}}>
            <img src={icon} style={styles.icon}/>
        </div>
        <div style={styles.column}>
          <div style={styles.row}>
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
            <div style={{margin: 20}}>
              <IconView icon={SchoolIcon} style={styles.smallIcon} onClick={this.onKeyDictionary.bind(this)}/>
            </div>
          </div>
          <div style={styles.row}>
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
            <div style={{margin: 20}}>
              <IconView icon={SchoolIcon} style={styles.smallIcon} onClick={this.onValueDictionary.bind(this)}/>
            </div>
          </div>
          <div style={styles.row}>
            <div style={{margin: 20}}>
              <IconView icon={AddPhotoIcon} style={styles.smallIcon} onClick={this.onAddPhoto.bind(this)}/>
            </div>
            <div style={{margin: 20}}>
              <IconView icon={LabelOutlineIcon} style={styles.smallIcon} onClick={this.onAddTag.bind(this)}/>
            </div>
            <div style={{margin: 20}}>
              <RaisedButton label="登録" primary={true} onClick={this.onClickRegister.bind(this)} />
            </div>
          </div>
        </div>
      </div>
    );
  }

}