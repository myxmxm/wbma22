import {View, Text} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import List from '../components/List';

const MyFiles = ({navigation}) => {
  return <List navigation={navigation} myFilesOnly={true} />;
};

MyFiles.propTypes = {
  navigation: PropTypes.object,
};

export default MyFiles;
