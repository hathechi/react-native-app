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
export default function RegisterScreen() {
    return (
        <SafeAreaView>
            <ScrollView>
                <View style={{
                    alignItems: 'center',
                    marginTop: 20,
                }}>
                    <Text style={{
                        fontSize: 24,
                        color: 'black',
                        fontWeight: '600',
                        fontFamily: 'Comfortaa'
                    }}>
                        Register for free !!
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}