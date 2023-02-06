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
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';



function LoginScreen({ navigation }) {
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  const [isShowPass, setIsShowPass] = useState(true)

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{ backgroundColor: 'white', height: 1000 }}>

          <Image style={{ width: '100%', height: 300 }}
            source={require('../assets/images/login.png')}></Image>

          <View >
            <View style={{ marginEnd: 34, marginStart: 34, }}>
              <Text style={{ color: 'black', fontSize: 34, fontWeight: '600' }}>
                Sign in to experience it now
              </Text>
            </View>
            <View style={{ marginStart: 20, marginEnd: 20 }}>
              <View style={{
                color: 'black',
                marginTop: 30,
                borderRadius: 20,
                paddingLeft: 10,
                backgroundColor: "#DDDDDD",
                flexDirection: 'row',
                alignItems: 'center'
              }}>
                <Icon name='user' size={22} style={{
                  marginLeft: 20,
                  marginEnd: 10,
                }} />
                <TextInput placeholder='User' onChangeText={setUser} value={user} style={{
                  fontSize: 16,
                  width: '80%',
                  height: 60,
                }}></TextInput>
              </View>
              <View style={{
                color: 'black',
                marginTop: 30,
                borderRadius: 20,
                paddingLeft: 10,
                backgroundColor: "#DDDDDD",
                flexDirection: 'row',
                alignItems: 'center'
              }}>
                <Icon name='lock' size={22} style={{
                  marginLeft: 20,
                  marginEnd: 10,
                }} />
                <TextInput placeholder='Password' secureTextEntry={isShowPass} onChangeText={setPass} value={pass} style={{
                  fontSize: 16,
                  width: '80%',
                  height: 60,
                }}></TextInput>
                <TouchableOpacity onPress={() => setIsShowPass(!isShowPass)}>
                  {isShowPass ? <Icon name='eye-slash' size={22} style={{
                    marginRight: 20,
                  }} /> : <Icon name='eye' size={22} style={{
                    marginRight: 20,
                  }} />}
                </TouchableOpacity>
              </View>
              <View style={{
                alignItems: 'center',
                marginTop: 30
              }}>
                <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')
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
              <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
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

export default LoginScreen;
