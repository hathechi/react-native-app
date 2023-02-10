import * as React from 'react';
import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import LoginScreen from './Components/LoginScreen';
import HomeScreen from './Components/Home';
import Profile from '../ReactApp/Components/Profile';
import Lab2 from './Components/Lab2';
import DetailItem from './Components/DetailItem';
import CallAPI from './Components/CallAPI';
import CreateProduct from './Components/CreateProduct'
import RegisterScreen from './Components/RegisterScreen';

// import { initializeApp } from "firebase/app";
// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// import { firebaseConfig } from "./config_firebase";
import { async } from '@firebase/util';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
export default function App() {

    // const app = initializeApp(firebaseConfig)
    // const auth = getAuth(app)
    // const isLogin = () => {
    //     console.log("userLogin", auth.currentUser.email)
    // }

    return (
        <NavigationContainer>
            <Stack.Navigator
            >
                <Stack.Screen
                    name="HomeScreen"
                    component={HomeScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="LoginScreen"
                    component={LoginScreen}
                    options={{ headerShown: false }}
                />

                <Stack.Screen
                    name="RegisterScreen"
                    component={RegisterScreen}
                    options={{ headerShown: false }} //ẩn thanh bar
                />
                <Stack.Screen
                    name="CallAPI"
                    component={CallAPI}
                    options={{ headerShown: false }} //ẩn thanh bar
                />
                <Stack.Screen
                    name="DetailItem"
                    component={DetailItem}
                />
                <Stack.Screen
                    name="Lab2"
                    component={Lab2}
                />
                <Stack.Screen
                    name="Profile"
                    component={Profile}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

