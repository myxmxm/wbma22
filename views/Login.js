import React, {useContext, useEffect} from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import PropTypes from 'prop-types';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useLogin, useUser} from '../hooks/Apihooks';

const Login = ({navigation}) => {
  // props is needed for navigation
  const {setIsLoggedIn} = useContext(MainContext);
  const {postLogin} = useLogin();
  const {getUserByToken} = useUser();

  const checkToken = async () => {
    // TODO: save the value of userToken saved in AsyncStorage as userToken
    const userToken = await AsyncStorage.getItem('userToken');
    console.log('token is:', userToken);
    try {
      const userData = await getUserByToken(userToken);
      console.log('checkToken function return:', userData);
      setIsLoggedIn(true);
    } catch (error) {
      console.error(error);
    }
  };
  // we use useEffect hook, because we only want run checkToken function once when Login page loaded
  // 2 parameters, first is function what to do, second is array list of state
  useEffect(() => {
    checkToken();
  }, []);

  const logIn = async () => {
    // hard code your username and password:
    const data = {username: 'xiaoming', password: 'test1234'};
    // TODO: call postLogin
    try {
      const userData = await postLogin(data);
      await AsyncStorage.setItem('userToken', userData.token);
      setIsLoggedIn(true);
    } catch (error) {
      console.error(error);
    }
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
