import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, SafeAreaView, Text, Button, Image} from 'react-native';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {userTag} from '../hooks/Apihooks';
import {uploadsUrl} from '../utils/variables';

const Profile = () => {
  const {setIsLoggedIn, user} = useContext(MainContext);
  const [avatar, setAvatar] = useState('http://placekitten.com/640');
  const {getFileByTag, postTag} = userTag();
  console.log('profile:', user);

  const fetchAvatar = async () => {
    try {
      // console.log(await getFileByTag('avatar_' + user.user_id));
      const avatarArray = await getFileByTag('avatar_' + user.user_id);
      // console.log('avatar', avatarArray.pop());
      const avatar = avatarArray.pop();

      setAvatar(uploadsUrl + avatar.filename);
    } catch (error) {
      console.log(error.message);
    }
  };

  // temp testing postTag
  // this is not needed yet and should be called only when you want to set new avatarin the remote API
  const createAvatar = async (mediaId) => {
    const data = {
      file_id: mediaId,
      tag: 'avatar_' + user.user_id,
    };
    try {
      const result = await postTag(data, 'correct token should be here to use');
      console.log(result);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchAvatar();
    // createAvatar(95); for testing
  }, []);
  // const logOut = () => {
  //   setIsLoggedIn(false);
  // };

  return (
    <SafeAreaView style={styles.container}>
      <Text>Profile</Text>
      <Text>User name: {user.username}</Text>
      <Image
        source={{uri: avatar}}
        style={{width: '90%', height: '80%'}}
        resizeMode="contain"
      />
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
