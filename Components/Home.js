import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

import CallAPI from './CallAPI';
import CreateProduct from './CreateProduct'

const Tab = createBottomTabNavigator();
function HomeScreen() {
    return (
        // <NavigationContainer>
        <Tab.Navigator>
            <Tab.Screen name="Home" component={CallAPI}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Icon name="home" size={28} color={color} />
                    ),
                    tabBarActiveTintColor: '#e00061',
                    tabBarInactiveTintColor: '#f797c1'

                }} />

            <Tab.Screen name="CreateProduct" component={CreateProduct}

                options={{
                    tabBarIcon: ({ color }) => (
                        <Icon name="plus" size={28} color={color} />
                    ),
                    tabBarActiveTintColor: '#e00061',
                    tabBarInactiveTintColor: '#f797c1'
                }} />
        </Tab.Navigator>
        // </NavigationContainer>
    );
};
export default HomeScreen;

