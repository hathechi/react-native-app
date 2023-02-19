import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { React, useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { firebaseConfig } from "../config_firebase";

import { async } from '@firebase/util';

const SettingUser = ({ navigation }) => {
    const app = initializeApp(firebaseConfig)
    const auth = getAuth(app)
    const [emailName, setEmailName] = useState('')
    const [urlImage, setUrlImage] = useState('')
    const logout = async () => {
        try {
            await signOut(auth);
            console.log("LogOUT")
        } catch (e) {
            console.error(e);
        }
    };
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // const user = auth.currentUser
            if (user) {
                console.log('User name: ', user.displayName);
                setEmailName(user.email)
                console.log('User URL: ', user.photoURL);
                setUrlImage(user.photoURL)
            }
        } else {
            // user is not logged in
            console.log('NO Login');

        }
    });



    return (
        <View style={{
            height: '100%',
            backgroundColor: 'white',
            flex: 1
        }}>
            <View style={{
                alignItems: 'center',
                marginVertical: 30,
                width: '100%',

            }}>
                <View >
                    <Image style={{
                        width: 200,
                        height: 200,
                        borderWidth: 1,
                        borderColor: 'black',
                        borderRadius: 400,
                    }} source={urlImage != '' ? { uri: urlImage } :
                        require('../assets/images/avatarCamera.png')} />
                    <Icon style={{
                        position: 'absolute',
                        right: 0,
                        margin: 20
                    }} name='camera' color={'black'} size={30} />
                </View>

                {emailName != '' ? <View style={{ alignItems: 'center' }}>
                    <Text style={styles.welcome}>{"Welcome"}</Text>
                    <Text style={styles.emailName}>{emailName.split("@")[0]}</Text>
                </View> : null}
            </View>
            <View style={{
                marginHorizontal: 20,
                flex: 1
            }}>
                {/* thechi1832000@gmail.com */}
                {emailName == 'thechi1832000@gmail.com' ? <TouchableOpacity
                    onPress={() => navigation.navigate('CRUDScreen')}
                    style={styles.button}>
                    <Icon style={styles.iconStyle} name='lock' color={'black'} size={24} />
                    <Text style={styles.textButton}>Administration</Text>
                </TouchableOpacity> : null}
                <View style={{ flex: 1 }} />
                <TouchableOpacity
                    onPress={() => {
                        logout()
                        navigation.replace('LoginScreen')
                    }}
                    style={[styles.button, styles.buttonLogout]}>
                    <Icon style={styles.iconStyle} name='rotate-right' color={'white'} size={24} />
                    <Text style={[styles.textButton, styles.textButtonLogout]}>Logout</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default SettingUser

const styles = StyleSheet.create({
    textButton: {
        fontFamily: 'comfortaa',
        fontSize: 18,
        fontWeight: 'bold'
    },
    textButtonLogout: {
        color: 'white'
    },
    button: {
        width: '100%', height: 60,
        backgroundColor: '#d4d4d4',
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30,
        borderRadius: 5,
        marginTop: 50,
    },
    iconStyle: {
        position: 'absolute',
        left: 20,
    },
    buttonLogout: {
        backgroundColor: 'red',
    },
    emailName: {
        fontFamily: 'comfortaa',
        fontSize: 20,
        color: 'black',
        fontWeight: 'bold'
    },
    welcome: {
        marginTop: 10,
        fontSize: 16,
        fontFamily: 'comfortaa',
        fontWeight: 'bold',
    }
})