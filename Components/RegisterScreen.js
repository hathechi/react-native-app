import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import DatePicker from 'react-native-date-picker'
import { compareAsc, format } from 'date-fns'
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { firebaseConfig } from "../config_firebase";
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
    Alert,
} from 'react-native';
import { da } from 'date-fns/locale';


export default function RegisterScreen({ navigation }) {
    const app = initializeApp(firebaseConfig)
    const auth = getAuth(app)


    const schema = yup.object({
        user: yup.string().required(),
        pass: yup.number().positive().integer().required(),
        cfpass: yup.number().positive().integer().required(),
        email: yup.string().email().required(),
        date: yup.string(),
    }).required();

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            user: '',
            pass: '',
            cfpass: '',
            email: '',
            date: format(new Date(), 'dd-MM-yyyy')
        },
        resolver: yupResolver(schema)

    });


    // const [user, setUser] = useState('')
    // const [pass, setPass] = useState('')
    // const [cfpass, setCfPass] = useState('')
    // const [email, setEmail] = useState('')
    const [date, setDate] = useState(new Date())
    const [isShowPass, setIsShowPass] = useState(true)
    //open datePicker
    const [open, setOpen] = useState(false)
    //FireBase
    const handleSignUpAuth = async (email, password, name) => {
        await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log("firebase", user.email)
                if (user != null) {

                    Alert.alert('Register Successful')
                    console.log("userName", auth.currentUser.email)
                    //Chuyển màn khi đăng kí thành công
                    // { navigation.navigate('HomeScreen') }
                }

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage, errorCode)
            });
    }

    const onSubmit = (data) => {
        data.date = format(date, 'dd-MM-yyyy')

        if (data.pass != data.cfpass) {
            Alert.alert('two passwords must be the same')
        } else {
            handleSignUpAuth(data.email, data.pass)
            console.log("DATA : ", data.email, data.pass);

        }

    }

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
                    <View style={[styles.viewStyle, errors.email && styles.borderError]}>
                        <Icon name='envelope' size={22} style={{
                            marginLeft: 20,
                            marginEnd: 10,
                        }} />
                        <Controller
                            control={control}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    keyboardType={'email-address'}
                                    placeholder='Email'
                                    onChangeText={onChange} value={value}
                                    style={styles.textInput}></TextInput>
                            )}
                            name="email"
                        ></Controller>
                    </View>
                    {errors.email && <Text style={styles.textError}>{errors.email.message}</Text>}

                    <View style={[styles.viewStyle, errors.pass && styles.borderError]}>
                        <Icon name='lock' size={22} style={{
                            marginLeft: 20,
                            marginEnd: 10,
                        }} />
                        <Controller
                            control={control}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput maxLength={6}
                                    keyboardType={'number-pad'}
                                    placeholder='Password' secureTextEntry={isShowPass}
                                    onChangeText={onChange} value={value}
                                    style={styles.textInput}></TextInput>
                            )}
                            name="pass"
                        ></Controller>
                        <TouchableOpacity onPress={() => setIsShowPass(!isShowPass)}>
                            {isShowPass ? <Icon name='eye-slash' size={22} style={{
                                marginRight: 20,
                            }} /> : <Icon name='eye' size={22} style={{
                                marginRight: 20,
                            }} />}
                        </TouchableOpacity>
                    </View>
                    {errors.pass && <Text style={styles.textError}>{errors.pass.message}</Text>}
                    <View style={[styles.viewStyle, errors.pass && styles.borderError]}>
                        <Icon name='lock' size={22} style={{
                            marginLeft: 20,
                            marginEnd: 10,
                        }} />
                        <Controller
                            control={control}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput maxLength={6}
                                    keyboardType={'number-pad'}
                                    placeholder='Comfirm Password' secureTextEntry={isShowPass}
                                    onChangeText={onChange} value={value}
                                    style={styles.textInput}></TextInput>
                            )}
                            name="cfpass"
                        ></Controller>
                        <TouchableOpacity onPress={() => setIsShowPass(!isShowPass)}>
                            {isShowPass ? <Icon name='eye-slash' size={22} style={{
                                marginRight: 20,
                            }} /> : <Icon name='eye' size={22} style={{
                                marginRight: 20,
                            }} />}
                        </TouchableOpacity>
                    </View>
                    {errors.cfpass && <Text style={styles.textError}>{errors.cfpass.message}</Text>}
                    <View style={[styles.viewStyle, errors.user && styles.borderError]}>
                        <Icon name='user' size={22} style={{
                            marginLeft: 20,
                            marginEnd: 10,
                        }} />
                        <Controller
                            control={control}
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput placeholder='Name'
                                    onChangeText={onChange}
                                    value={value}
                                    style={[styles.textInput]}>
                                </TextInput>
                            )}
                            name="user"
                        ></Controller>
                    </View>
                    {errors.user && <Text style={styles.textError}>{errors.user.message}</Text>}


                    <View style={[styles.viewStyle]}>
                        <Icon name='calendar' size={22} style={{
                            marginLeft: 20,
                            marginEnd: 10,
                        }} />
                        <TouchableOpacity style={{
                            width: '80%',
                            height: 60,
                            justifyContent: 'center'
                        }} onPress={
                            () => {
                                setOpen(!open)
                            }
                        }>
                            <Controller
                                control={control}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput on editable={false}
                                        selectTextOnFocus={false}
                                        placeholder={'Birthday'}
                                        onChangeText={onChange}
                                        // value={value}
                                        defaultValue={format(date, 'dd-MM-yyyy')}
                                        style={{
                                            fontSize: 16,
                                        }} />
                                )}
                                name="date"
                            ></Controller>

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
                    {errors.date && <Text style={styles.textError}>{errors.date.message}</Text>}


                    <View style={{
                        alignItems: 'center',
                        marginTop: 30
                    }}>
                        <TouchableOpacity onPress={

                            handleSubmit(onSubmit)
                            // console.log(date)

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
const styles = StyleSheet.create({
    viewStyle: {
        color: 'black',
        marginTop: 20,
        borderRadius: 20,
        paddingLeft: 10,
        backgroundColor: "#DDDDDD",
        flexDirection: 'row',
        alignItems: 'center'
    },
    textInput: {
        fontSize: 16,
        width: '80%',
        height: 60,
    },
    textError: {
        color: 'red'
    },
    borderError: {
        borderWidth: 1,
        borderColor: 'red'
    }
})