import React, {Component} from 'react';
import {List, ListItem} from 'material-ui/List';

export default class Percentage extends Component{
  constructor(props, state) {
    super();
    console.log('Percentage render');
    this.state = {};    
  }
  render() {
    const style = {
      height: 20
    };
    //console.log('probs',this.props.probs);
    const probs = this.props.probs || {};
    const probview = Object.keys(probs).map((i)=>{
      return <ListItem style={style} key={i} > {i+': ' +probs[i]+'%'} </ListItem>;
    });
    return (
      <div>
        <List>
          {probview}
        </List>
      </div>
    );
  }
}
