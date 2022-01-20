import React, {useContext} from 'react';
import {StyleSheet, SafeAreaView, Text, Button} from 'react-native';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = () => {
  const {setIsLoggedIn, user} = useContext(MainContext);
  console.log('profile:', user);
  // const logOut = () => {
  //   setIsLoggedIn(false);
  // };
  return (
    <SafeAreaView style={styles.container}>
      <Text>Profile</Text>
      <Text>User name: {user.username}</Text>
      <Text>Email: {user.email}</Text>
      <Text>Full name: {user.full_name}</Text>
      <Text>User id : {user.user_id}</Text>
      <Button
        title="Log out"
        onPress={async () => {
          await AsyncStorage.clear();
          setIsLoggedIn(false);
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
});

export default Profile;
