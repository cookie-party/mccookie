import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import SchoolIcon from 'material-ui/svg-icons/social/school';
import AddPhotoIcon from 'material-ui/svg-icons/image/add-a-photo';
import LabelOutlineIcon from 'material-ui/svg-icons/action/label-outline';

import IconView from './components/IconView';
import Dictionary from './components/Dictionary';
import AddTag from './components/AddTag';

export default class Register extends Component {
  constructor(props, state){
    super(props, state);  
    this.state = {
      key: '',
      value: '',
      tagList: [],
      focused: false,
      openDictionary: false,
      openAddTag: false,
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
    const value = e.target.value;
    //タグ抽出
    let tagStr = '', tagList = [];
    if(value.indexOf('#')>0) {
      tagStr = value.substring(value.indexOf(' #'));
      const wspace=new String('\u3000');
      tagStr = tagStr.replace( wspace , ' ' ) ;
      tagStr = tagStr.replace( '\n' , ' ' ) ;
      if(tagStr){
        tagList = tagStr.split(' ');
      }
      tagList = tagList.filter((tag)=>{
        if(tag.indexOf('#')>=0){
          return tag;
        }
      });
    }
    this.setState({value: value, tagList: tagList});
  }
  onClickRegister(e){
    this.setState({key: '', value: '', focused: false});
    this.props.emitter.emit('cookieRegister', this.state);
  }

  onDictionary() {
    this.setState({openDictionary: !this.state.openDictionary});
  }
  onAddTag() {
    this.setState({openAddTag: !this.state.openAddTag});
  }

  onAddPhoto() {
    console.log('onAddPhoto');
  }

  render(){
    const styles = {
      main: {
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'center',
        width: '100%',
      },
      row: {
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'center',
        //alignItems: 'baseline',
      },
      column: {
        display: 'flex',
        flexFlow: 'column nowrap',
        justifyContent: 'center',
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
          <IconView icon={SchoolIcon} style={styles.smallIcon} onClick={this.onDictionary.bind(this)}/>
          <Dictionary
           search={this.state.key}
           flag={this.state.openDictionary}
           onClose={this.onDictionary.bind(this)} 
           onDictionary={this.onChangeValue.bind(this)}/>
        </div>
      </div>
    );

    const registerMainView = (
      <div>
          {wordInput}
          <div style={{width: '70%'}}>
            <div style={{margin: 10}}>
                <TextField
                hintText="意味"
                value={this.state.value}
                onChange={this.onChangeValue.bind(this)}
                multiLine={true}
                rows={2}
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
              <AddTag 
              tagList={this.state.tagList}
              flag={this.state.openAddTag}
              onClose={this.onAddTag.bind(this)} 
              onAddTag={(tag)=>this.onChangeValue({target:{value: this.state.value+' '+tag}})}/>
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
      <div style={styles.main}>
        <div style={{width: 50, margin: 10}}>
            <img src={icon} style={styles.icon}/>
        </div>
        <div style={styles.column}>
          {registerView}
        </div>
      </div>
    );
  }

}