import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  ImageBackground,
  Text,
} from 'react-native';
import {StatusBar} from 'expo-status-bar';
import GlobalStyles from './utils/GlobalStyles';
import List from './components/List';
import {Menu, Settings} from 'react-native-feather';

const App = () => {
  return (
    <>
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="rgb(250,200,200)" barStyle="dark-content" />
        <View style={styles.header}>
          <ImageBackground
            source={require('./assets/cat_background.jpeg')}
            style={styles.bgImage}
            imageStyle={{borderBottomRightRadius: 65}}
          ></ImageBackground>
          <Text style={styles.headerText}>Some interesting pics</Text>
          <Settings
            stroke="white"
            width={32}
            height={32}
            style={styles.settings}
          />
          <Menu stroke="white" width={32} height={32} style={styles.menu} />
        </View>

        <List />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    backgroundColor: 'black',
    height: '100%',
    paddingTop: 0,
  },
  header: {
    height: 340,
    backgroundColor: 'black',
  },
  bgImage: {
    width: '100%',
    height: 300,
  },
  headerText: {
    position: 'absolute',
    bottom: 50,
    left: 20,
    color: 'white',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
    fontSize: 30,
  },
  menu: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  settings: {
    position: 'absolute',
    top: 40,
    right: 20,
  },
});

export default App;
