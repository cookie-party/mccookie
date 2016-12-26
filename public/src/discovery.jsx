import React from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    display: 'flex',
    flexWrap: 'nowrap',
//    width: 500,
//    height: 450,
    overflowX: 'auto',
//    overflowY: 'auto',
  },
};

const tilesData = [
  {
    key: 1,
    img: '../img/satomi.jpg',
    title: '中学英語１',
    author: 'kani',
  },
  {
    key: 2,
    img: '../img/satomi.jpg',
    title: '中学歴史１',
    author: 'murakami',
  },
  {
    key: 3,
    img: '../img/satomi.jpg',
    title: '基本情報',
    author: 'kumi',
  },
  {
    key: 4,
    img: '../img/satomi.jpg',
    title: '基本情報午後',
    author: 'kawa',
  },
];

const images = tilesData.map((tile) => (
        <GridTile
          key={tile.key}
          title={tile.title}
          subtitle={<span>by <b>{tile.author}</b></span>}
          actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
        >
          <img src={tile.img} />
        </GridTile>
      ));

const Discovery = () => (
  <div style={styles.root}>
    <GridList
      cellHeight={180}
      style={styles.gridList}
    >
      <Subheader>Discovery</Subheader>
      {images}
    </GridList>
  </div>
);

export default Discovery;