import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, ActivityIndicator} from 'react-native';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {userTag} from '../hooks/Apihooks';
import {uploadsUrl} from '../utils/variables';
import {Card, Text, Button, ListItem, Avatar} from 'react-native-elements';

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
    <Card>
      <Card.Title>
        <Text h1>{user.username}</Text>
      </Card.Title>
      <Card.Image
        source={{uri: avatar}}
        style={styles.image}
        PlaceholderContent={<ActivityIndicator />}
      />
      <ListItem>
        <Avatar icon={{name: 'email', color: 'black'}} />
        <Text>{user.email}</Text>
      </ListItem>
      <ListItem>
        <Avatar icon={{name: 'user', type: 'font-awesome', color: 'black'}} />
        <Text>{user.full_name}</Text>
      </ListItem>
      <Button
        title="Log out!"
        onPress={async () => {
          await AsyncStorage.clear();
          setIsLoggedIn(false);
        }}
      />
    </Card>
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
