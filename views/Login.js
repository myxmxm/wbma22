import React, {useContext, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Button,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import PropTypes from 'prop-types';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useLogin, useUser} from '../hooks/Apihooks';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import {Card, Text} from 'react-native-elements';

const Login = ({navigation}) => {
  // props is needed for navigation
  const {setIsLoggedIn, setUser} = useContext(MainContext);
  const {postLogin} = useLogin();
  const {getUserByToken} = useUser();

  const checkToken = async () => {
    // TODO: save the value of userToken saved in AsyncStorage as userToken
    const userToken = await AsyncStorage.getItem('userToken');
    console.log('token is:', userToken);
    if (!userToken) {
      return;
    }
    try {
      const userData = await getUserByToken(userToken);
      console.log('checkToken function return:', userData);
      console.log('token:', userToken);
      setUser(userData);
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

  return (
    <TouchableOpacity
      style={{flex: 1}}
      activeOpacity={1}
      onPress={() => Keyboard.dismiss()}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : ''}
        style={styles.container}
      >
        <View style={styles.appTitle}>
          <Text>MyApp</Text>
        </View>
        <View style={styles.form}>
          <Card>
            <Card.Title h4>Login</Card.Title>
            <Card.Divider />
            <LoginForm />
          </Card>
          <Card>
            <Card.Title h4>Register</Card.Title>
            <Card.Divider />
            <RegisterForm />
          </Card>
        </View>
      </KeyboardAvoidingView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  appTitle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    flex: 8,
  },
});

Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;
