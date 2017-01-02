import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import CopyToClipboard from 'react-copy-to-clipboard';

import {query} from '../util/agent';

export default class Dictionary extends Component{
  constructor(props, state){
    super(props, state);
    this.state = {
      searching: false,
      meaning: '',
      cached: {},
    };
  }

  componentWillReceiveProps() {
    const dialogFlag = this.props.flag;
    const searchWord = this.props.search;

    if(this.state.cached[searchWord]){
      this.setState({meaning: this.state.cached[searchWord], searching: false});
    } else {
      this.setState({searching: true});
      /*
      setTimeout(()=>{
        this.setState({
          meaning: 'meaning',
          searching: false
        });
      }, 1000);
      */
      query('ejdic', searchWord)
      .then((result)=>{
        const cached = this.state.cached;
        cached[searchWord] = result.meaning;
        this.setState({meaning: result.meaning, cached: cached, searching: false});
      }).catch((err)=>{
        console.log(err);
        this.setState({meaning: 'undefined', searching: false});
      });
    }
  }

  render() {
    const dialogFlag = this.props.flag;
    const searchWord = this.props.search;

    let meaningView = <CircularProgress/>;
    if(!this.state.searching) {
      meaningView = (
        <div> {this.state.meaning} </div>
      );
    }
    /*
    else {
      const url = 'https://ja.wikipedia.org/wiki/'+searchWord;
      meaningView = (
        <iframe src={url}/>
      );
    }
    */

    const action = [
      <RaisedButton
        label="Cancel"
        primary={true}
        onTouchTap={this.props.onClose}
      />,
      <CopyToClipboard text={this.state.meaning}
        onCopy={() => this.setState({copied: true})}>
        <RaisedButton
          label="Copy"
          primary={true}
        />
      </CopyToClipboard>
    ];

    return (
      <div>
        <Dialog
          title={this.props.search}
          actions={action}
          modal={true}
          open={dialogFlag}
        >
          {meaningView}
        </Dialog>
      </div>
    );
  }
}
