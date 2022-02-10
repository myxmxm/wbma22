import React, {useRef, useState, useEffect, useContext} from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {uploadsUrl} from '../utils/variables';
import {Avatar, Button, Card, ListItem, Text} from 'react-native-elements';
import {Video, AVPlaybackStatus} from 'expo-av';
import {useUser, useTag, useFavorite} from '../hooks/ApiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {User} from 'react-native-feather';
import {MainContext} from '../contexts/MainContext';

const Single = ({route}) => {
  console.log('route:', route);
  const {file} = route.params;
  // const [videoRef, setVideoRef] = useState(null);
  const videoRef = useRef(null);
  const {getUserById} = useUser();
  const [owner, setOwner] = useState({username: 'fetch...'});
  const [avatar, setAvatar] = useState('http://placekitten.com/180');
  const {postTag, getFilesByTag} = useTag();
  const [likes, setLikes] = useState([]);
  const {postFavourite, getFavouritesByFileId, deleteFavourite} = useFavorite();
  const [userLike, setUserLike] = useState(false);
  console.log('user like:', userLike);
  const {user} = useContext(MainContext);

  const fetchOwner = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const userData = await getUserById(file.user_id, token);
      setOwner(userData);
      console.log('user data:', userData);
    } catch (error) {
      // TODO: how should user be notified?
      console.error('fetch owner error', error);
    }
  };

  const fetchAvatar = async () => {
    try {
      const avatarArray = await getFilesByTag('avatar_' + file.user_id);
      if (avatarArray.length === 0) {
        return;
      }
      const avatar = avatarArray.pop();
      setAvatar(uploadsUrl + avatar.filename);
      // console.log('avatar:', avatar.filename);
    } catch (error) {
      console.error(error.message);
    }
  };

  const fetchLikes = async () => {
    try {
      const likesData = await getFavouritesByFileId(file.file_id);
      console.log('like data:', likesData);
      setLikes(likesData);
      likesData.forEach((like) => {
        if (like.user_id === user.user_id) {
          setUserLike(true);
        }
      });
    } catch (error) {
      // TODO: how should user be notified?
      console.error('fetchLikes', error);
    }
  };

  const createFavourite = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await postFavourite(file.file_id, token);
      // console.log('createFavourite()', response);
      response && setUserLike(true);
    } catch (error) {
      // TODO: how should user be notified?
      // console.error('createFavourite', error);
      setUserLike(true);
    }
  };

  const removeFavourite = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await deleteFavourite(file.file_id, token);
      response && setUserLike(false);
    } catch (error) {
      // TODO: how should user be notified?
      console.error('removeFavourite', error);
    }
  };

  useEffect(() => {
    fetchLikes();
  }, [userLike]);

  useEffect(() => {
    fetchOwner();
    fetchAvatar();
  }, []);

  return (
    <Card>
      <Card.Title h4>{file.title}</Card.Title>
      <Card.Title>{file.time_added}</Card.Title>
      <Card.Divider />
      {file.media_type === 'image' ? (
        <Card.Image
          source={{uri: uploadsUrl + file.filename}}
          style={styles.image}
          PlaceholderContent={<ActivityIndicator />}
        />
      ) : (
        <Video
          ref={videoRef}
          style={styles.image}
          source={{
            uri: uploadsUrl + file.filename,
          }}
          // usePoster is not working on IOS
          usePoster
          posterSource={{
            uri: uploadsUrl + file.screenshot,
          }}
          useNativeControls={true}
          resizeMode="contain"
          // isLooping
          onError={(error) => {
            console.error('<Video> error'), error;
          }}
        ></Video>
      )}
      <Card.Divider />
      <Text style={styles.description}>{file.description}</Text>
      <ListItem>
        <Avatar source={{uri: avatar}} />
        <Text>Owner: {owner.username}</Text>
      </ListItem>
      <ListItem>
        <Text>Likes count: {likes.length}</Text>
        <Button
          disabled={userLike}
          title="Like"
          onPress={() => {
            createFavourite();
          }}
        ></Button>
        <Button
          disabled={!userLike}
          title="Unlike"
          onPress={() => {
            removeFavourite();
          }}
        ></Button>
      </ListItem>
    </Card>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
  },
  description: {
    marginBottom: 10,
  },
});

Single.propTypes = {
  route: PropTypes.object,
};

export default Single;
