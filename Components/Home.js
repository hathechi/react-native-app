import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import SettingUser from './SettingUser';
import CallAPI from './CallAPI';
import CreateProduct from './CreateProduct'
// import AnimatedTabBar from '@gorhom/animated-tabbar';

const Tab = createBottomTabNavigator();
// const tabs = {
//     Home: { // < Screen name
//         labelStyle: {
//             color: '#5B37B7',
//         },
//         icon: {
//             component: <Icon name="home" size={28} color={'#5B37B7'} />,
//             activeColor: 'rgba(91,55,183,1)',
//             inactiveColor: 'rgba(0,0,0,1)',
//         },
//         background: {
//             activeColor: 'rgba(223,215,243,1)',
//             inactiveColor: 'rgba(223,215,243,0)',
//         },
//     },
//     Profile: { // < Screen name
//         labelStyle: {
//             color: '#1194AA',
//         },
//         icon: {
//             component: <Icon name="home" size={28} color={'#5B37B7'} />,

//             activeColor: 'rgba(17,148,170,1)',
//             inactiveColor: 'rgba(0,0,0,1)',
//         },
//         background: {
//             activeColor: 'rgba(207,235,239,1)',
//             inactiveColor: 'rgba(207,235,239,0)',
//         },
//     },
// };
const activeColor = 'black'
const inActiveColor = '#bfbfbf'
function HomeScreen() {
    return (
        // <NavigationContainer>
        <Tab.Navigator
            // tabBar={props => (
            //     <AnimatedTabBar tabs={tabs} {...props} />
            // )}
            screenOptions={{
                headerShown: false
            }}

        >

            <Tab.Screen name="Home" component={CallAPI}
                options={{
                    tabBarShowLabel: false,

                    tabBarIcon: ({ color }) => (
                        <Icon name="home" size={32} color={color} />
                    ),
                    tabBarActiveTintColor: activeColor,
                    tabBarInactiveTintColor: inActiveColor

                }} />

            <Tab.Screen name="CreateProduct" component={CreateProduct}

                options={{
                    tabBarShowLabel: false,

                    tabBarIcon: ({ color }) => (
                        <Icon name="plus" size={32} color={color} />
                    ),
                    tabBarActiveTintColor: activeColor,
                    tabBarInactiveTintColor: inActiveColor
                }} />
            <Tab.Screen name="SettingUser" component={SettingUser}

                options={{
                    tabBarShowLabel: false,
                    tabBarIcon: ({ color }) => (
                        <Icon name="user" size={32} color={color} />
                    ),
                    tabBarActiveTintColor: activeColor,
                    tabBarInactiveTintColor: inActiveColor
                }} />
        </Tab.Navigator>
        // </NavigationContainer>
    );
};
export default HomeScreen;

