import React, {Component} from 'react';
import {TableRow} from './components/TableRow';

export default class Timeline extends Component {
  constructor(props, state){
    super(props, state);  
  }

  render(){
    const styles = {
      main: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
        flexWrap: 'nowrap',
        alignItems: 'stretch',
      },
      item: {
//        width: 700
      }
    };

    const kvList = this.props.wordList.map((kv, i)=>{
      return (
        <div key={i} style={styles.item}>
          <TableRow item={kv} emitter={this.props.emitter}/>
        </div>
      );
    });

    return (
      <div style={styles.main}>
        {kvList}
      </div>
    );
  }

}