import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import SchoolIcon from 'material-ui/svg-icons/social/school';
import AddPhotoIcon from 'material-ui/svg-icons/image/add-a-photo';
import LabelOutlineIcon from 'material-ui/svg-icons/action/label-outline';

import IconView from './components/IconView';
import Dictionary from './components/Dictionary';

export default class Register extends Component {
  constructor(props, state){
    super(props, state);  
    this.state = {
      key: '',
      value: '',
      focused: false,
      keyDictionary: false,
      valueDictionary: false,
    };
  }

  onFocusRegister() {
    this.setState({focused: true});
  }
  onUnfocusRegister() {
    if(!this.state.key){
      this.setState({focused: false});
    }
  }

  onChangeKey(e) {
    this.setState({key: e.target.value});
  }
  onChangeValue(e) {
    this.setState({value: e.target.value});
  }
  onClickRegister(e){
    this.setState({key: '', value: '', focused: false});
    this.props.emitter.emit('cookieRegister', {key: this.state.key, value: this.state.value});
  }

  onKeyDictionary() {
    this.setState({keyDictionary: !this.state.keyDictionary});
  }

  onValueDictionary() {
    this.setState({valueDictionary: !this.state.valueDictionary});
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

    const wordInput = (
      <div style={styles.row}
        onFocus={this.onFocusRegister.bind(this)}
        onBlur={this.onUnfocusRegister.bind(this)}
      >
        <div style={{margin: 10}}>
          <TextField
          hintText='単語'
          value={this.state.key}
          onChange={this.onChangeKey.bind(this)}
          multiLine={true}
          rows={1}
          rowsMax={2}
          autoFocus={this.state.focused}
          />
        </div>
        <div style={{margin: 20}}>
          <IconView icon={SchoolIcon} style={styles.smallIcon} onClick={this.onKeyDictionary.bind(this)}/>
          <Dictionary
           search={this.state.key}
           flag={this.state.keyDictionary}
           onClose={this.onKeyDictionary.bind(this)} 
           onDictionary={this.onChangeValue.bind(this)}/>
        </div>
      </div>
    );

    const registerMainView = (
      <div>
          {wordInput}
          <div style={{width: '100%'}}>
            <div style={{margin: 10}}>
                <TextField
                hintText="意味"
                value={this.state.value}
                onChange={this.onChangeValue.bind(this)}
                multiLine={true}
                rows={1}
                rowsMax={3}
                />
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
    );

    let registerView = <div/>;
    if(this.state.focused){
      registerView = registerMainView;
    }
    else {
      registerView = wordInput;
    }

    return (
      <div style={styles.row}>
        <div style={{width: '50px', margin: 10}}>
            <img src={icon} style={styles.icon}/>
        </div>
        <div style={styles.column}>
          {registerView}
        </div>
      </div>
    );
  }

}