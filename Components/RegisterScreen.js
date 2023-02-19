import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import DatePicker from 'react-native-date-picker'
import { compareAsc, format } from 'date-fns'
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getStorage, ref, uploadBytes, uploadFile, getDownloadURL } from 'firebase/storage';
import { convertUriToBlob } from '../config_firebase';
import { firebaseConfig } from "../config_firebase";
import Loading from './Loading';
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
import showToast from './ToastMessage';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';




export default function RegisterScreen({ navigation }) {
    const [isLoading, setIsLoading] = useState(false)
    const [imageUrl, setImageUrl] = useState('');
    const app = initializeApp(firebaseConfig)
    const auth = getAuth(app)

    const chooseFile = (type) => {
        let options =
        {
            mediaType: type,
            maxWidth: 300,
            maxHeight: 550,
            quality: 1,
            // selectionLimit: 5
        };
        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                const uri = response.assets[0].uri
                console.log("image register ", response)
                setImageUrl(uri)
            };
        })
    };

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

    const [date, setDate] = useState(new Date())
    const [isShowPass, setIsShowPass] = useState(true)
    //open datePicker
    const [open, setOpen] = useState(false)

    const upLoadImageToFireBase = async () => {
        // Tạo tham chiếu tới file trên Firebase Storage
        const storage = getStorage();
        // Upload ảnh lên Firebase Storage
        //convert từ uri sang blob để upload
        const blob = await convertUriToBlob(imageUrl);
        const fileRef = ref(storage, "images/" + Date.now() + ".png");
        const snapshot = await uploadBytes(fileRef, blob);
        console.log("Uploaded a blob or file!", snapshot);
        const downloadUrl = await getDownloadURL(fileRef);

        console.log("File available at", downloadUrl);
        return downloadUrl

    }

    //FireBase
    const handleSignUpAuth = (email, password, name) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log("firebase", user.email)
                // const urlImage = upLoadImageToFireBase()
                // Tạo tham chiếu tới file trên Firebase Storage
                const storage = getStorage();
                // Upload ảnh lên Firebase Storage
                //convert từ uri sang blob để upload
                const blob = await convertUriToBlob(imageUrl);
                const fileRef = ref(storage, "images/" + Date.now() + ".png");
                const snapshot = await uploadBytes(fileRef, blob);
                console.log("Uploaded a blob or file!", snapshot);
                const downloadUrl = await getDownloadURL(fileRef);

                console.log("File available at", downloadUrl);
                await updateProfile(user, {
                    displayName: name,
                    photoURL: downloadUrl,
                }).then(() => {
                    console.log('URL', user.photoURL)
                }).catch((error) => {
                    console.log(error);
                });

                if (user != null) {

                    setIsLoading(false)
                    console.log("userName", auth.currentUser.email)
                    //Chuyển màn khi đăng kí thành công
                    navigation.replace('LoginScreen')
                    showToast('success', 'Register Successful')

                }

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                Alert.alert(errorMessage)
                setIsLoading(false)
                console.log(errorMessage, errorCode)
            });


    }

    const onSubmit = (data) => {
        data.date = format(date, 'dd-MM-yyyy')

        if (data.pass != data.cfpass) {
            showToast('error', '2 password is not be same')

        } else {
            setIsLoading(true)
            handleSignUpAuth(data.email, data.pass, data.user)
            console.log("DATA : ", data.email, data.pass, data.user);

        }

    }
    if (isLoading) {
        return <Loading />
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
                    <TouchableOpacity onPress={() => chooseFile('photo')}>
                        <View style={{
                            marginTop: 20
                        }}>
                            <Image style={{
                                width: 150,
                                height: 150,
                                borderWidth: 1,
                                borderColor: 'black',
                                borderRadius: 400,
                            }} source={imageUrl != '' ? { uri: imageUrl } :
                                require('../assets/images/avatarCamera.png')} />
                            <Icon style={{
                                position: 'absolute',
                                right: 0,
                                margin: 20
                            }} name='camera' color={'black'} size={30} />
                        </View>
                    </TouchableOpacity>
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
                        <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
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
        </SafeAreaView >
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