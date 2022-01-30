import React, {useContext} from 'react';
import {View, ScrollView} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useLogin, useUser} from '../hooks/Apihooks';
import {MainContext} from '../contexts/MainContext';
import {Input, Button, Text} from 'react-native-elements';

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
    <ScrollView>
      <View>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              autoCapitalize="none"
              placeholder="Username"
            />
          )}
          name="username"
        />
        {errors.username && <Text>This is required.</Text>}

        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              autoCapitalize="none"
              secureTextEntry={true}
              placeholder="Password"
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
            <Input
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              autoCapitalize="none"
              placeholder="Email"
            />
          )}
          name="email"
        />
        {errors.email && <Text>This is required.</Text>}

        <Controller
          control={control}
          render={({field: {onChange, onBlur, value}}) => (
            <Input
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              autoCapitalize="words"
              placeholder="Full name"
            />
          )}
          name="full_name"
        />

        <Button title="Submit" onPress={handleSubmit(onSubmit)} />
      </View>
    </ScrollView>
  );
};

export default RegisterForm;
