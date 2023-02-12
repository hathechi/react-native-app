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

import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { firebaseConfig } from "../config_firebase";
import Loading from './Loading';


function LoginScreen({ navigation }) {
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
  const handleSignInAuth = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // console.log("firebase", user.email)
        if (user != null) {

          // Alert.alert('Login Successful')
          console.log("userName", auth.currentUser.email)
          setIsLoading(false)

          //Chuyển màn khi đăng nhập thành công
          { navigation.replace('HomeScreen') }
        }

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage, errorCode)
        setIsLoading(false)
        Alert.alert('Password or Email Incorrect')
        setIsLogin(false)

      });
  }

  const [isShowPass, setIsShowPass] = useState(true)

  const schema = yup.object({
    email: yup.string().email().required(),
    pass: yup.number().positive().required()

  }).required();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      pass: '',

    },
    resolver: yupResolver(schema)

  });
  const onSubmit = (data) => {
    console.log("DATA : ", data);
    setIsLoading(true)
    handleSignInAuth(data.email, data.pass)
  }
  if (isLoading) {
    return <Loading />
  }
  return (
    <SafeAreaView style={{ backgroundColor: 'white', height: '100%' }}>
      <ScrollView>
        <View >
          <Image style={{ width: '100%', height: 300 }}
            source={require('../assets/images/login.png')}></Image>
          <View >
            <View style={{ marginEnd: 34, marginStart: 34, }}>
              <Text style={{ color: 'black', fontSize: 34, fontWeight: '600' }}>
                Sign in to experience it now
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
              <View style={[styles.viewStyle, errors.pass && styles.borderError,
              isLogin == false && styles.borderError]}>
                <Icon name='lock' size={24} style={{
                  marginLeft: 20,
                  marginEnd: 10,
                }} />
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput maxLength={6}
                      keyboardType={'number-pad'}
                      placeholder='Password' secureTextEntry={isShowPass}
                      onChangeText={onChange} value={value}
                      style={styles.textInput}></TextInput>
                  )}
                  name="pass"
                ></Controller>
                <TouchableOpacity onPress={() => setIsShowPass(!isShowPass)}>
                  {isShowPass ? <Icon name='eye-slash' size={22} style={{
                    marginRight: 20,
                  }} /> : <Icon name='eye' size={22} style={{
                    marginRight: 20,
                  }} />}
                </TouchableOpacity>
              </View>
              {errors.pass && <Text style={styles.textError}>{errors.pass.message}</Text>}
              <View style={{
                alignItems: 'center',
                marginTop: 30
              }}>
                <TouchableOpacity onPress={
                  // () => navigation.navigate('HomeScreen')
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
                  }}>LOGIN</Text>
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
                Do not have an account?
              </Text>
              <TouchableOpacity onPress={() => navigation.replace('RegisterScreen')}>
                <Text style={{
                  fontSize: 16,
                  color: '#0ea0c4',
                  fontWeight: '600',
                }}>
                  Register
                </Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity>
                <Text style={{
                  fontSize: 16,
                  color: '#0b7dd4',
                  fontWeight: '600',
                  marginTop: 20
                }}>
                  Forgot password
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

export default LoginScreen;
