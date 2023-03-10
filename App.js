import * as React from 'react';
import { useEffect } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import LoginScreen from './Components/LoginScreen';
import HomeScreen from './Components/Home';
import Profile from './Components/Profile';
import Lab2 from './Components/Lab2';
import DetailItem from './Components/DetailItem';
import CallAPI from './Components/CallAPI';
import CreateProduct from './Components/CreateProduct'
import RegisterScreen from './Components/RegisterScreen';
import SettingUser from './Components/SettingUser';
import CRUDScreen from './Components/CRUDScreen';
import EditProduct from './Components/EditProduct';
import Maps from './Components/Maps';
import ListImage from './Components/ListImage';
import FogotPassword from './Components/FogotPassword';
import KiemTraScreen from './Components/KiemTraScreen';
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { firebaseConfig } from "./config_firebase";
import { async } from '@firebase/util';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
import Toast from 'react-native-toast-message';

export default function App() {
    const app = initializeApp(firebaseConfig)
    const auth = getAuth(app)
    const [isLogin, setIsLogin] = React.useState(false)

    onAuthStateChanged(auth, (user) => {
        if (user) {
            if (user) {
                console.log('User email: ', user.email);
                setIsLogin(true)

            }
        } else {
            // user is not logged in
            console.log('NO Login');

        }
    });
    return (
        <NavigationContainer>
            <Stack.Navigator>
                {/* <Stack.Screen
                    name="KiemTraScreen"
                    component={KiemTraScreen}
                    options={{ headerShown: false }}
                /> */}
                <Stack.Screen
                    name="LoginScreen"
                    component={LoginScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="HomeScreen"
                    component={HomeScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Maps"
                    component={Maps}
                />


                <Stack.Screen
                    name="FogotPassword"
                    component={FogotPassword}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="ListImage"
                    component={ListImage}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="DetailItem"
                    component={DetailItem}
                    options={{ headerShown: false }} //???n thanh bar

                />
                <Stack.Screen
                    name="CreateProduct"
                    component={CreateProduct}
                    options={{
                        headerTitleAlign: 'center'
                    }}
                />

                <Stack.Screen
                    name="EditProduct"
                    component={EditProduct}
                    options={{
                        headerTitleAlign: 'center'
                    }}
                />


                <Stack.Screen
                    name="Profile"
                    component={Profile}
                />
                <Stack.Screen
                    name="RegisterScreen"
                    component={RegisterScreen}
                    options={{ headerShown: false }} //???n thanh bar
                />
                <Stack.Screen
                    name="CallAPI"
                    component={CallAPI}
                    options={{ headerShown: false }} //???n thanh bar
                />

                <Stack.Screen
                    name="CRUDScreen"
                    component={CRUDScreen}
                />

                <Stack.Screen
                    name="SettingUser"
                    component={SettingUser}
                />
                <Stack.Screen
                    name="Lab2"
                    component={Lab2}
                />

            </Stack.Navigator>
            <Toast />
        </NavigationContainer>
    );
};

