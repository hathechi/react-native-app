import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  // CheckBox,
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
import CheckBox from '@react-native-community/checkbox'
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { firebaseConfig } from "../config_firebase";
import Loading from './Loading';

//Lưu thông tin đăng nhập 
import AsyncStorage from '@react-native-community/async-storage';


function LoginScreen({ navigation }) {
  const [isLogin, setIsLogin] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [isCheckbox, setIsCheckbox] = useState(false)
  const [isShowPass, setIsShowPass] = useState(true)


  //email password Local storage 
  const [emailLocal, setEmailLocal] = useState('')
  const [passwordLocal, setPasswordLocal] = useState('')

  const app = initializeApp(firebaseConfig)
  const auth = getAuth(app)
  onAuthStateChanged(auth, (user) => {
    if (user) {

      console.log('User URL: ', user.photoURL);
      // console.log('User email: ', user.email);
      // console.log('User pass: ', user.password);
      // () => navigation.navigate('HomeScreen')
    } else {
      // user is not logged in
      console.log('No Login');
    }
  });
  useEffect(() => {
    checkLoginInfo()
  }, []);

  //FireBase
  const handleSignInAuth = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        if (user != null) {
          if (isCheckbox) {
            saveLoginInfo(email, password)
            console.log("save")

          } else {
            deleteLoginInfo()
            console.log("delete email name")
          }
          //Chuyển màn khi đăng nhập thành công
          navigation.replace('HomeScreen')
        }

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage, errorCode)
        // setIsLoading(false)
        Alert.alert('Password or Email Incorrect')
        setIsLogin(false)

      });
  }

  // Lưu tên đăng nhập và mật khẩu vào AsyncStorage
  async function saveLoginInfo(username, password) {
    try {
      await AsyncStorage.setItem('email', username);
      await AsyncStorage.setItem('password', password.toString());
    } catch (error) {
      console.log(error);
    }
  }
  // Kiểm tra xem có thông tin đăng nhập trong AsyncStorage hay không
  async function checkLoginInfo() {
    try {
      const email = await AsyncStorage.getItem('email');
      const password = await AsyncStorage.getItem('password');


      if (email !== null && password !== null) {


        setValue('email', email, {
          shouldValidate: true,
          shouldDirty: true
        }),
          setValue('pass', password, {
            shouldValidate: true,
            shouldDirty: true
          })

        // setEmailLocal(email)
        // setPasswordLocal(password)
        setIsCheckbox(true)
        // console.log("LOCAL: ", emailLocal, passwordLocal);
      }
    } catch (error) {
      console.log(error);
    }
  }
  // Xóa thông tin đăng nhập khỏi AsyncStorage khi người dùng đăng xuất
  async function deleteLoginInfo() {
    try {
      await AsyncStorage.removeItem('email');
      await AsyncStorage.removeItem('password');
    } catch (error) {
      console.log(error);
    }
  }


  const schema = yup.object({
    email: yup.string().email().required("Không bỏ trống"),
    pass: yup.number('Mật khẩu phải là số').positive().required()

  }).required();
  // console.log('log pass:', emailLocal, passwordLocal)
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      pass: '',
      // email: emailLocal != '' ? emailLocal : '',
      // pass: passwordLocal != '' ? passwordLocal : '',

    },
    resolver: yupResolver(schema)

  });
  const onSubmit = (data) => {
    console.log("DATA : ", data);
    // setIsLoading(true)
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
                flexDirection: 'row',
                alignItems: 'center',
                margin: 20,
              }}>
                <CheckBox onValueChange={setIsCheckbox}
                  value={isCheckbox}
                />
                <Text>
                  Remember me
                </Text>
              </View>
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
              <TouchableOpacity onPress={() => navigation.navigate('FogotPassword')}>
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
