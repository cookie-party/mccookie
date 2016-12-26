import React, {Component} from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
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
              style={{cursor:'pointer'}}
              key={tile.key}
              title={tile.title}
              subtitle={<span>by <b>{tile.author}</b></span>}
              actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
              onTouchTap={this.onClick.bind(this, tile.key)}
            >
              <Pie data={_calcData(tile.atePercentage)} />
            </GridTile>
          ));

    images.push((
      <GridTile
        style={{cursor:'pointer'}}
        key={-1}
        title={'新規追加'}
        actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
        onTouchTap={this.onClick.bind(this, -1)}
      >
        新規追加っぽい画像
      </GridTile>
    ));

    const styles = {
      root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
      },
      gridList: {
        display: 'flex',
        flexWrap: 'nowrap',
        overflowY: 'auto',
      },
    };

    return (
      <div style={styles.root}>
        <GridList
          cellHeight={180}
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