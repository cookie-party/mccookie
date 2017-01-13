import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';

import {getTagList} from '../util/dbUtil';

export default class AddTags extends Component{
  constructor(props, state){
    super(props, state);
    this.state = {
      tagList: []
    };
  }

  componentDidMount() {
    let tagList = [];
    getTagList().then((tags)=>{
      tagList = tags;
      this.setState({tagList});
    }).catch((err)=>{
      console.log(err);
    });
  }

  render() {
    const dialogFlag = this.props.flag;

    const taglist = this.state.tagList.map((tag, id)=>{
      return <FlatButton key={id}
        label={tag} 
        primary={true}
        onTouchTap={()=>{
          this.props.onAddTag(tag);
          this.props.onClose();
        }}/>;
    });

    const action = [
      <RaisedButton
        label="Cancel"
        primary={false}
        onTouchTap={this.props.onClose}
      />
    ];

    return (
      <div>
        <Dialog
          title='Add tags'
          actions={action}
          modal={true}
          open={dialogFlag}
        >
          {taglist}
        </Dialog>
      </div>
    );
  }
}
