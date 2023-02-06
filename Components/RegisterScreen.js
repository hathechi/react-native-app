import React, { useState } from 'react';
import PushScreen from '../Init/PushScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import DatePicker from 'react-native-date-picker'

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
export default function RegisterScreen({ navigation }) {
    const [user, setUser] = useState('')
    const [pass, setPass] = useState('')
    const [cfpass, setCfPass] = useState('')
    const [email, setEmail] = useState('')
    const [date, setDate] = useState(new Date())
    const [isShowPass, setIsShowPass] = useState(true)
    //open datePicker
    const [open, setOpen] = useState(false)

    return (
        <SafeAreaView style={{
            backgroundColor: 'white',
            height: '100%'
        }}>
            <ScrollView >
                <View style={{
                    alignItems: 'center',
                    marginTop: 30,

                }}>
                    <Text style={{
                        fontSize: 24,
                        color: 'black',
                        fontWeight: '700',
                        fontFamily: 'comfortaa',

                    }}>
                        Register for free !!
                    </Text>
                    <Image style={{
                        width: '80%',
                        height: 150,
                        marginTop: 30
                    }} source={require('../assets/images/register.png')} />
                </View>
                <View style={{ marginStart: 20, marginEnd: 20, marginTop: 20 }}>
                    <View style={{
                        color: 'black',
                        marginTop: 20,
                        borderRadius: 20,
                        paddingLeft: 10,
                        backgroundColor: "#DDDDDD",
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <Icon name='user' size={22} style={{
                            marginLeft: 20,
                            marginEnd: 10,
                        }} />
                        <TextInput placeholder='Username' onChangeText={setUser} value={user} style={{
                            fontSize: 16,
                            width: '80%',
                            height: 60,
                        }}></TextInput>
                    </View>
                    <View style={{
                        color: 'black',
                        marginTop: 30,
                        borderRadius: 20,
                        paddingLeft: 10,
                        backgroundColor: "#DDDDDD",
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <Icon name='lock' size={22} style={{
                            marginLeft: 20,
                            marginEnd: 10,
                        }} />
                        <TextInput maxLength={6} keyboardType={'number-pad'} placeholder='Password' secureTextEntry={isShowPass} onChangeText={setPass} value={pass} style={{
                            fontSize: 16,
                            width: '80%',
                            height: 60,
                        }}></TextInput>
                        <TouchableOpacity onPress={() => setIsShowPass(!isShowPass)}>
                            {isShowPass ? <Icon name='eye-slash' size={22} style={{
                                marginRight: 20,
                            }} /> : <Icon name='eye' size={22} style={{
                                marginRight: 20,
                            }} />}
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        color: 'black',
                        marginTop: 30,
                        borderRadius: 20,
                        paddingLeft: 10,
                        backgroundColor: "#DDDDDD",
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <Icon name='lock' size={22} style={{
                            marginLeft: 20,
                            marginEnd: 10,
                        }} />
                        <TextInput maxLength={6} keyboardType={'number-pad'} placeholder='Comfirm Password' secureTextEntry={isShowPass} onChangeText={setCfPass} value={cfpass} style={{
                            fontSize: 16,
                            width: '80%',
                            height: 60,
                        }}></TextInput>
                        <TouchableOpacity onPress={() => setIsShowPass(!isShowPass)}>
                            {isShowPass ? <Icon name='eye-slash' size={22} style={{
                                marginRight: 20,
                            }} /> : <Icon name='eye' size={22} style={{
                                marginRight: 20,
                            }} />}
                        </TouchableOpacity>

                    </View>
                    <View style={{
                        color: 'black',
                        marginTop: 30,
                        borderRadius: 20,
                        paddingLeft: 10,
                        backgroundColor: "#DDDDDD",
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <Icon name='envelope' size={22} style={{
                            marginLeft: 20,
                            marginEnd: 10,
                        }} />
                        <TextInput placeholder='Email' keyboardType='email-address' onChangeText={setEmail} value={email} style={{
                            fontSize: 16,
                            width: '80%',
                            height: 60,
                        }}></TextInput>
                    </View>
                    <View style={{
                        color: 'black',
                        marginTop: 30,
                        borderRadius: 20,
                        paddingLeft: 10,
                        height: 60,
                        backgroundColor: "#DDDDDD",
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <Icon name='calendar' size={22} style={{
                            marginLeft: 20,
                            marginEnd: 10,
                        }} />
                        <TouchableOpacity style={{
                            width: '80%',
                            height: 60,
                            justifyContent: 'center'
                        }} onPress={() => {
                            setOpen(!open)
                        }}>
                            <TextInput on editable={false} selectTextOnFocus={false} placeholder={'Date'} value={date}
                                style={{
                                    fontSize: 16,
                                }} />
                        </TouchableOpacity>
                        <DatePicker
                            modal
                            mode='date'
                            open={open}
                            date={date}
                            onConfirm={(date) => {
                                setOpen(false)
                                setDate(date)
                            }}
                            onCancel={() => {
                                setOpen(false)
                            }}
                        />
                    </View>

                    <View style={{
                        alignItems: 'center',
                        marginTop: 30
                    }}>
                        <TouchableOpacity onPress={
                            console.log('date', date)
                        }
                            style={{
                                marginTop: 20,
                                width: 300, height: 60,
                                backgroundColor: 'orange',
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 15
                            }}>
                            <Text style={{
                                fontWeight: '700',
                                fontSize: 16,
                                color: 'black'
                            }}>SIGN IN</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
                            <Text style={{
                                fontSize: 16,
                                color: '#0b7dd4',
                                fontWeight: '600',
                                marginTop: 20
                            }}>
                                Login Now
                            </Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}