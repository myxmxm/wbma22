import {useEffect, useState} from 'react';
import {baseUrl} from '../utils/variables';
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
  const loadMedia = async (start = 0, limit = 10) => {
    try {
      const response = await fetch(
        `${baseUrl}media?start=${start}&limit=${limit}`
      );
      if (!response.ok) {
        throw Error(response.statusText);
      }
      const json = await response.json();
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
    } catch (error) {
      console.error(error);
    }
  };
  // call loadMedia() only once when the com component is loaded
  useEffect(() => {
    loadMedia(0, 5);
  }, []);
  console.log(mediaArray);
  return {mediaArray};
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

  return {getUserByToken, postUser};
};

export {useMedia, useLogin, useUser};
