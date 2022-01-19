import React, {useContext, useEffect} from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import PropTypes from 'prop-types';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation}) => {
  // props is needed for navigation
  const {isLoggedIn, setIsLoggedIn} = useContext(MainContext);

  const checkToken = async () => {
    // TODO: save the value of userToken saved in AsyncStorage as userToken
    const userToken = await AsyncStorage.getItem('userToken');
    console.log('token is:', userToken);
    // TODO if the content of userToken is 'abc'), set isLoggedIn to true and navigate to Tabs
    if (userToken === 'abc') {
      setIsLoggedIn(true);
    }
  };
  // we use useEffect hook, because we only want run checkToken function once when Login page loaded
  // 2 parameters, first is function what to do, second is array list of state
  useEffect(() => {
    checkToken();
  }, []);

  const logIn = async () => {
    console.log('Login Button pressed');
    // in reality, it will call api with user credential and get a token as response
    // now we are using a "dummy" token
    await AsyncStorage.setItem('userToken', 'abc');
    setIsLoggedIn(true);
  };
  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <Button title="Sign in!" onPress={logIn} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;
