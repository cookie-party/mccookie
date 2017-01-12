import React, {Component} from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import AddIcon from 'material-ui/svg-icons/action/note-add';
import Paper from 'material-ui/Paper';
import CircularProgress from 'material-ui/CircularProgress';

import {query} from './util/agent';

export default class MyList extends Component {
  constructor(props, state){
    super(props, state);

    this.state = {
      tilesData :[
        {
          key: 1,
          title: '中学英語１',
          author: 'kani',
          atePercentage: 20,
        },
        {
          key: 2,
          title: '中学歴史１',
          author: 'murakami',
          atePercentage: 60,
        },
        {
          key: 3,
          title: '基本情報',
          author: 'kumi',
          atePercentage: 50,
        }
      ],
      loading: true
    };
  }

  //TODO
  //1~ => 単語帳
  //-1 => mylist新規追加
  onClick(id) {
    if(id>0){
      this.props.emitter.emit('cookieListStart', id);
    }
    else if(id === -1){
      this.props.emitter.emit('cookieNewList');
    }
  }

  componentDidMount(){
    //get
    query('stocklist', this.props.userId)
    .then((result)=>{
      const tilesData = result.map((item, i)=>{
        return {
          key: i,
          title: item.name,
          author: item.user
        };
      });
      this.setState({loading: true, tilesData });
    }).catch((err)=>{
      console.log(err);
      this.setState({loading: true });
    });
  }

  render(){
    const styles = {
      root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
      },
      gridList: {
        display: 'flex',
        flexWrap: 'wrap',
//        flexDirection: 'row',
        justifyContent: 'space-around',
//        overflowY: 'auto',
//        alignItems: 'stretch'
      },
      tile: {
        cursor:'pointer',
        margin: '0 auto',
        width: 250,
        height: 200,
      }, 
      mediumIcon: {
        width: 100,
        height: 100,
      }, 
    };

    const images = this.state.tilesData.map((tile) => (
      <GridTile
        key={tile.key}
        title={tile.title}
        subtitle={<span>by <b>{tile.author}</b></span>}
        actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
        onTouchTap={this.onClick.bind(this, tile.key)}
      >
        <div style={styles.tile}>
          <Paper zDepth={1}>
            {tile.title}
          </Paper>
        </div>
      </GridTile>
    ));

    images.push((
      <GridTile
        style={styles.tile}
        key={-1}
        title={'新規追加'}
        actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
        onTouchTap={this.onClick.bind(this, -1)}
      >
        <div style={styles.tile}>
          <Paper zDepth={1}>
            <AddIcon style={styles.mediumIcon}/>
          </Paper>
        </div>
      </GridTile>
    ));

    const contentsView = this.state.loading ? 
        <GridList
          cellHeight={200}
          style={styles.gridList}
        >
          <Subheader>MyList</Subheader>
          {images}
        </GridList>
      : 
        <CircularProgress />;

    return (
      <div style={styles.root}>
        {contentsView}
      </div>
    );
  }

}

