import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import LoginScreen from '../ReactApp/Components/LoginScreen';
import HomeScreen from '../ReactApp/Components/Home';
import Profile from '../ReactApp/Components/Profile';
import Lab2 from './Components/Lab2';
import DetailItem from './Components/DetailItem';
import CallAPI from './Components/CallAPI';
import CreateProduct from './Components/CreateProduct'
import RegisterScreen from './Components/RegisterScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


export default function App() {
    return (
        // <NavigationContainer>
        //     <Stack.Navigator>

        //         <Stack.Screen
        //             name="CallAPI"
        //             component={CallAPI}
        //             options={{ headerShown: false }} //ẩn thanh bar
        //         />
        //         <Stack.Screen
        //             name="DetailItem"
        //             component={DetailItem}
        //         />
        //         <Stack.Screen
        //             name="Lab2"
        //             component={Lab2}
        //         />

        //         <Stack.Screen
        //             name="HomeScreen"
        //             component={HomeScreen}
        //         />
        //         <Stack.Screen
        //             name="Login"
        //             component={LoginScreen}
        //         />
        //         <Stack.Screen
        //             name="Profile"
        //             component={Profile}
        //         />


        //     </Stack.Navigator>
        // </NavigationContainer>
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Home" component={CallAPI}
                    options={{
                        tabBarLabel: 'Home',
                        tabBarIcon: ({ color }) => (
                            <Icon name="home" size={28} color={color} />
                        ),
                        tabBarActiveTintColor: '#e00061',
                        tabBarInactiveTintColor: '#f797c1'

                    }} />
                <Tab.Screen name="Login" component={LoginScreen}

                    options={{
                        tabBarLabel: 'Login',
                        headerShown: false,
                        tabBarIcon: ({ color }) => (
                            <Icon name="user" size={28} color={color} />
                        ),
                        tabBarActiveTintColor: '#e00061',
                        tabBarInactiveTintColor: '#f797c1',

                    }} />
                <Tab.Screen name="CreateProduct" component={CreateProduct}

                    options={{
                        tabBarLabel: 'CreateProduct',
                        tabBarIcon: ({ color }) => (
                            <Icon name="plus" size={28} color={color} />
                        ),
                        tabBarActiveTintColor: '#e00061',
                        tabBarInactiveTintColor: '#f797c1'
                    }} />
                <Tab.Screen name="RegisterScreen" component={RegisterScreen}

                    options={{
                        tabBarLabel: 'RegisterScreen',
                        headerShown: false,
                        tabBarIcon: ({ color }) => (
                            <Icon name="tag" size={28} color={color} />
                        ),
                        tabBarActiveTintColor: '#e00061',
                        tabBarInactiveTintColor: '#f797c1'
                    }} />
            </Tab.Navigator>
        </NavigationContainer>
    );
};




