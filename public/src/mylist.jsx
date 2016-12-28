import React, {Component} from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import AddIcon from 'material-ui/svg-icons/action/note-add';
import {Pie} from 'react-chartjs-2';

import {getBookList} from './dbUtil';
import {query} from './agent';

class MyList extends Component {
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
      ]
    };
  }

  //TODO
  //1~ => 単語帳
  //-1 => mylist新規追加
  onClick(id) {
    if(id>0){
      this.props.emitter.emit('cookieStart', id);
    }
    else if(id === -1){
      this.props.emitter.emit('cookieRegister');
    }
  }

  componentDidMount(){
    getBookList(this.props.userId).then((results)=>{
      //console.log('getBookList',results);
      if(results.length>0){
        this.setState({
          tilesData: results.map((res)=>{
            return {
              key: res.id,
              title: res.name,
              author: res.createUserId, //TODO ユーザ名にする
              atePercentage: 20,
            };
          })
        });
      }
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

    const _calcData = (atePercentage) => {
      return {
        labels: [
          'Ate',
          'Ever'
        ],
        datasets: [{
          data: [atePercentage, 100-atePercentage],
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
          ],
          hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
          ]
        }]
      };
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
          <Pie data={_calcData(tile.atePercentage)} />
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
          <AddIcon style={styles.mediumIcon}/>
        </div>
      </GridTile>
    ));

    return (
      <div style={styles.root}>
        <GridList
          cellHeight={200}
          style={styles.gridList}
        >
          <Subheader>MyList</Subheader>
          {images}
        </GridList>
      </div>
    );
  }

}

export default MyList;