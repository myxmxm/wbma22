import {useContext, useEffect, useState} from 'react';
import {MainContext} from '../contexts/MainContext';
import {appId, baseUrl} from '../utils/variables';
// options = {} make it optional
const doFetch = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);
    const json = await response.json();
    if (response.ok) {
      return json;
    } else {
      // let message = '';
      // if (json.error){
      //   message = json.message + ': ' + json.error;
      // } else {
      //   message = json.message;
      // }
      // (ternary) operator way
      const message = json.error
        ? `${json.message}: ${json.error}`
        : json.message;
      // || if json.message not exist show response.statusText
      throw new Error(message || response.statusText);
    }
  } catch (error) {
    throw new Error(Error.message);
  }
};

const useMedia = () => {
  const [mediaArray, setMediaArray] = useState([]);
  const [loading, setLoading] = useState(false);
  const {update} = useContext(MainContext);
  const loadMedia = async (start = 0, limit = 10) => {
    setLoading(true);
    try {
      // const response = await fetch(`${baseUrl}tags/${appId}`);
      // if (!response.ok) {
      //   throw Error(response.statusText);
      // }
      // const json = await response.json();
      // we can either use code from line 37 to 42 or line 43
      const json = await useTag().getFilesByTag(appId);
      const media = await Promise.all(
        json.map(async (item) => {
          const response = await fetch(baseUrl + 'media/' + item.file_id);
          const mediaData = await response.json();
          // console.log(mediaData);
          return mediaData;
        })
      );
      setMediaArray(media);
      // console.log(mediaArray);
      // when media is ready do setLoading(false)
      // media && setLoading(false);
    } catch (error) {
      console.error(error);
      // setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  // call loadMedia() only once when the com component is loaded
  // Or when the update state in MainContext is changed
  useEffect(() => {
    loadMedia(0, 5);
  }, [update]);

  const postMedia = async (formData, token) => {
    setLoading(true);
    const options = {
      method: 'POST',
      headers: {
        'x-access-token': token,
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    };

    const result = await doFetch(baseUrl + 'media', options);
    // if (result) {
    //   setLoading(false);
    // }
    // same as if statement
    result && setLoading(false);
    return result;
  };
  console.log(mediaArray, postMedia);
  return {mediaArray, postMedia, loading};
};

const useLogin = () => {
  const postLogin = async (userCredentials) => {
    // user credentials format: {username: 'someUsername', password: 'somePassword'}
    const options = {
      // TODO: add method, headers and body for sending json data with POST
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(userCredentials),
    };
    return await doFetch(baseUrl + 'login', options);
    // try {
    //   // TODO: use fetch to send request to login endpoint and return the result as json, handle errors with try/catch and response.ok
    //   const response = await fetch(baseUrl + 'login', options);
    //   const userDate = await response.json();
    //   if (response.ok) {
    //     return userDate;
    //   } else {
    //     throw new Error(userDate.message);
    //   }
    // } catch (error) {
    //   throw new Error(error.message);
    // }
  };

  return {postLogin};
};

const useUser = () => {
  const getUserByToken = async (token) => {
    const options = {
      // get method is default,not necessary to put it.
      method: 'GET',
      // if there is - like x-access-token  use {}
      headers: {'x-access-token': token},
    };
    return await doFetch(baseUrl + 'users/user', options);
  };

  const postUser = async (data) => {
    const options = {
      // TODO: add method, headers and body for sending json data with POST
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(data),
    };
    return await doFetch(baseUrl + 'users', options);
  };

  const checkUsername = async (username) => {
    const result = await doFetch(baseUrl + 'users/username/' + username);
    return result.available;
  };

  const putUser = async (data, token) => {
    const options = {
      // TODO: add method, headers and body for sending json data with POST
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token,
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(data),
    };
    return await doFetch(baseUrl + 'users', options);
  };

  return {getUserByToken, postUser, checkUsername, putUser};
};

const useTag = () => {
  const postTag = async (tagData, token) => {
    // todo: implement later
    const options = {
      // TODO: add method, headers and body for sending json data with POST
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token,
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(tagData),
    };
    return await doFetch(baseUrl + 'tags/', options);
  };
  // option is not needed for get method,so we give only url parameter, option take default value {}(check line 4), get is default method, no need to mention it when using it(not like post method).
  const getFilesByTag = async (tag) => {
    return await doFetch(baseUrl + 'tags/' + tag);
  };
  return {postTag, getFilesByTag};
};

export {useMedia, useLogin, useUser, useTag};
