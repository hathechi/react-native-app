import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';


const SettingUser = () => {
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
                <View style={{

                }}>
                    <Image style={{
                        width: 200,
                        height: 200,
                        borderWidth: 1,
                        borderColor: 'black',
                        borderRadius: 400,
                    }} source={require('../assets/images/avatar.jpeg')} />
                    <Icon style={{
                        position: 'absolute',
                        right: 0,
                        margin: 20
                    }} name='camera' color={'black'} size={30} />
                </View>
            </View>
            <View style={{
                marginHorizontal: 20,
                flex: 1
            }}>
                <TouchableOpacity
                    style={styles.button}>
                    <Icon style={styles.iconStyle} name='lock' color={'black'} size={24} />
                    <Text style={styles.textButton}>Administration</Text>
                </TouchableOpacity>
                <View style={{ flex: 1 }} />
                <TouchableOpacity
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
    }
})