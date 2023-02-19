import React, { useState } from 'react';
import PushScreen from '../Init/PushScreen';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  Image,
  ToastAndroid,
  TouchableOpacity,
  ImageBackground,
  useColorScheme,
  View,
  Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import showToast from './ToastMessage';

import { initializeApp } from "firebase/app";
import { getAuth, sendPasswordResetEmail, onAuthStateChanged } from "firebase/auth";
import { firebaseConfig } from "../config_firebase";
import Loading from './Loading';


function FogotPassword({ navigation }) {
  const [isLogin, setIsLogin] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const app = initializeApp(firebaseConfig)
  const auth = getAuth(app)
  onAuthStateChanged(auth, (user) => {
    if (user) {

      console.log('User email: ', user.email);
      () => navigation.navigate('HomeScreen')
    } else {
      // user is not logged in
      console.log('NO LoginScreen');
    }
  });
  //FireBase
  const handleSignInAuth = async (email) => {
    await sendPasswordResetEmail(auth, email)
      .then((userCredential) => {
        showToast('success', 'Check Email and Login Now')
        setIsLoading(false);
        // { navigation.replace('HomeScreen') }

      })
      .catch((error) => {

        const errorMessage = error.message;
        console.log(errorMessage, errorCode)
        setIsLoading(false)
        showToast('error', ' Email Incorrect')


      });
  }



  const schema = yup.object({
    email: yup.string().email().required(),

  }).required();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',


    },
    resolver: yupResolver(schema)

  });
  const onSubmit = (data) => {
    console.log("DATA : ", data);
    setIsLoading(true)

    handleSignInAuth(data.email)
  }
  if (isLoading) {
    return <Loading />
  }
  return (
    <SafeAreaView style={{ backgroundColor: 'white', height: '100%' }}>
      <ScrollView>
        <View >
          <Image style={{ width: '100%', height: 300 }}
            source={require('../assets/images/forgotPass.png')}></Image>
          <View >
            <View style={{ marginEnd: 34, marginStart: 34, }}>
              <Text style={{
                color: 'black', fontSize: 34, fontWeight: '600',
                marginBottom: 50
              }}>
                Confirm email to reset password
              </Text>
            </View>
            <View style={{ marginStart: 20, marginEnd: 20 }}>
              <View style={[styles.viewStyle, errors.email && styles.borderError,
              isLogin == false && styles.borderError]}>
                <Icon name='envelope' size={20} style={{
                  marginLeft: 20,
                  marginEnd: 10,
                }} />
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      keyboardType={'email-address'}
                      placeholder='Email'
                      onChangeText={onChange} value={value}
                      style={styles.textInput}></TextInput>
                  )}
                  name="email"
                ></Controller>
              </View>
              {errors.email && <Text style={styles.textError}>{errors.email.message}</Text>}


              <View style={{
                alignItems: 'center',
                marginTop: 30
              }}>
                <TouchableOpacity onPress={

                  handleSubmit(onSubmit)
                }
                  style={{
                    marginTop: 20,
                    width: 300, height: 60,
                    backgroundColor: 'orange',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 15
                  }}>
                  <Text style={{
                    fontWeight: '700',
                    fontSize: 16,
                    color: 'black'
                  }}>SEND EMAIL</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={{
            flexDirection: 'row',
            marginTop: 20,
            justifyContent: 'space-evenly',

          }}>
            <View style={{
              alignItems: 'center',
            }}>
              <Text>
                Login Again Now
              </Text>
              <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
                <Text style={{
                  fontSize: 16,
                  color: '#0ea0c4',
                  fontWeight: '600',
                  marginTop: 10
                }}>
                  Login
                </Text>
              </TouchableOpacity>
            </View>

          </View>

        </View>

      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  viewStyle: {
    color: 'black',
    marginTop: 20,
    borderRadius: 20,
    paddingLeft: 10,
    backgroundColor: "#DDDDDD",
    flexDirection: 'row',
    alignItems: 'center'
  },
  textInput: {
    fontSize: 16,
    width: '80%',
    height: 60,
  },
  textError: {
    color: 'red'
  },
  borderError: {
    borderWidth: 1,
    borderColor: 'red'
  }
})

export default FogotPassword;
