import React, {useState, useEffect} from 'react';
import {FlatList} from 'react-native';
import {useMedia} from '../hooks/Apihooks';
import {baseUrl} from '../utils/variables';
import ListItem from './ListItem';

// const dataUrl =
//   'https://raw.githubusercontent.com/mattpe/wbma/master/docs/assets/test.json';

// const baseUrl = 'https://media.mw.metropolia.fi/wbma/';

const List = () => {
  // loadMedia();

  const {mediaArray} = useMedia();

  return (
    <FlatList
      data={mediaArray}
      keyExtractor={(item) => item.file_id.toString()}
      renderItem={({item}) => <ListItem singleMedia={item} />}
    ></FlatList>
  );
};

export default List;
