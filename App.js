import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../ReactApp/Components/LoginScreen';
import HomeScreen from '../ReactApp/Components/Home';
import Profile from '../ReactApp/Components/Profile';
import Lab2 from './Components/Lab2';
import ProductItem from './Components/ProductItem';
import CallAPI from './Components/CallAPI';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                {/* <Stack.Screen
                    name="ProductItem"
                    component={ProductItem}
                /> */}
                <Stack.Screen
                    name="CallAPI"
                    component={CallAPI}
                />
                <Stack.Screen
                    name="Lab2"
                    component={Lab2}
                />

                <Stack.Screen
                    name="HomeScreen"
                    component={HomeScreen}
                />
                <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                />
                <Stack.Screen
                    name="Profile"
                    component={Profile}
                />


            </Stack.Navigator>
        </NavigationContainer>
    );
};




