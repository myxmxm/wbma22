import React, {useContext} from 'react';
import {Text, View, TextInput, Button} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useLogin, useUser} from '../hooks/Apihooks';
import {MainContext} from '../contexts/MainContext';

const RegisterForm = () => {
  const {setIsLoggedIn} = useContext(MainContext);
  const {postLogin} = useLogin();
  const {postUser} = useUser();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      full_name: '',
    },
  });
  const onSubmit = async (data) => {
    console.log(data);
    try {
      const userData = await postUser(data);
      console.log('Refister onSubmit', userData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            // style={styles.input}
            style={{borderWidth: 1, padding: 5}}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
            placeholder="username"
          />
        )}
        name="username"
      />
      {errors.username && <Text>This is required.</Text>}

      <Controller
        control={control}
        rules={{
          maxLength: 100,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            style={{borderWidth: 1, padding: 5}}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
            placeholder="password"
          />
        )}
        name="password"
      />
      {errors.password && <Text>This is required.</Text>}

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            // style={styles.input}
            style={{borderWidth: 1, padding: 5}}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
            placeholder="email"
          />
        )}
        name="email"
      />
      {errors.email && <Text>This is required.</Text>}

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            // style={styles.input}
            style={{borderWidth: 1, padding: 5}}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
            placeholder="full_name"
          />
        )}
        name="full_name"
      />
      {errors.full_name && <Text>This is required.</Text>}

      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};

export default RegisterForm;
