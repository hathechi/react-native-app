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


function LoginScreen({ navigation }) {
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')

  return (
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
            <TextInput placeholder='User' onChangeText={setUser} value={user} style={{
              color: 'black',
              marginTop: 30,
              fontSize: 16,
              backgroundColor: "#DDDDDD",
              height: 60,
              paddingStart: 20,
              borderRadius: 20, paddingLeft: 10
            }}></TextInput>
            <TextInput placeholder='Password' onChangeText={setPass} value={pass} style={{
              color: 'black',
              marginTop: 30,
              fontSize: 16,
              paddingStart: 20,
              backgroundColor: "#DDDDDD",
              height: 60,
              borderRadius: 20, paddingLeft: 10
            }}></TextInput>
            <View style={{ alignItems: 'center' }}>
              <TouchableOpacity onPress={() => PushScreen({ navigation }, 'Profile')

              }
                style={{
                  marginTop: 20,
                  width: 300, height: 60,
                  backgroundColor: 'orange',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 20
                }}>
                <Text>LOGIN</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={
                console.log(user + pass)
              }
                style={{
                  marginTop: 20,
                  width: 300, height: 60,
                  backgroundColor: 'orange',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 20
                }}>
                <Text>TEST</Text>
              </TouchableOpacity>

            </View>
          </View>
        </View>
      </View>
    </ScrollView>

  );
};

export default LoginScreen;
