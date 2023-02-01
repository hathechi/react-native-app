import React, { useState } from 'react'
import Profile from "./Profile";
import PushScreen from '../Init/PushScreen'
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    Alert,
    TextInput,
    Image,
    ToastAndroid,
    TouchableOpacity,
    ImageBackground,
    useColorScheme,
    View,
} from 'react-native';
export default function Lab2({ navigation }) {
    const [ten, setTen] = useState('');
    const [tuoi, setTuoi] = useState('');
    const [chuyennganh, setChuyenNganh] = useState('');
    const [email, setEmail] = useState('');
    const [display, setDisplay] = useState(false);
    const [error, setError] = useState({
        ten: "",
        tuoi: '',
        chuyennganh: '',
        email: ''

    });
    let checkValidation = false
    function Validation(ten, tuoi, chuyennganh) {
        // let tenformat = /[a-z A-Z ]/g;
        let tenformat = /^[a-zA-Z]+(([\'\,\.\-_ \/)(:][a-zA-Z_ ])?[a-zA-Z_ .]*)*$/
        let emailFormat = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (ten == '' && tuoi == '' && chuyennganh == '' && email == '') {
            setError({
                ten: "Không được để trống!",
                tuoi: "Không được để trống!",
                chuyennganh: "Không được để trống!",
                email: 'Không được để trống!'


            })

        } else if (ten == '') {
            setError({ ten: "Không được để trống!", })
        } else if (tuoi == '') {
            setError({ tuoi: "Không được để trống!", })
        } else if (chuyennganh == '') {
            setError({ chuyennganh: "Không được để trống!", })

        }
        else if (!ten.match(tenformat)) {
            setError({
                ten: "không được chứa số và kí tự đặc biệt!",
                tuoi: "",
                chuyennganh: ""
            })
        }
        else if (!chuyennganh.match(tenformat)) {
            setError({
                ten: "",
                tuoi: "",
                chuyennganh: "không được chứa số và kí tự đặc biệt!"
            })
        }
        else if (!email.match(emailFormat)) {
            setError({
                ten: "",
                tuoi: "",
                chuyennganh: "Nhập đúng định dạng email!"
            })
        }
        else {
            setError({
                ten: "",
                tuoi: "",
                chuyennganh: ""
            })
            return checkValidation = !checkValidation
        }
    }




    let profile1 = {
        name: ten,
        age: tuoi,
        sex: chuyennganh,
        email: email
    }
    return (
        display ? <Profile profile={profile1} display={display} setHienthi={setDisplay} /> :
            <View style={{ alignItems: 'center', margin: 30 }}>
                <TextInput placeholder='Tên' onChangeText={setTen} value={ten} style={{
                    color: 'black',
                    marginTop: 30,
                    fontSize: 16,
                    paddingStart: 20,
                    // borderColor: 'red',
                    // borderWidth: 1,
                    backgroundColor: "#DDDDDD",
                    height: 60,
                    width: "90%",
                    borderRadius: 20, paddingLeft: 10
                }}></TextInput>
                {(error.ten != '') ? <Text>{error.ten}</Text> : null}
                <TextInput keyboardType='numeric' placeholder='Tuổi' onChangeText={setTuoi} value={tuoi} style={{
                    color: 'black',
                    marginTop: 30,
                    fontSize: 16,
                    paddingStart: 20,
                    width: "90%",
                    backgroundColor: "#DDDDDD",
                    height: 60,
                    borderRadius: 20, paddingLeft: 10
                }}></TextInput>
                {(error.tuoi != '') ? <Text>{error.tuoi}</Text> : null}

                <TextInput placeholder='Chuyên Ngành' onChangeText={setChuyenNganh} value={chuyennganh} style={{
                    color: 'black',
                    marginTop: 30,
                    fontSize: 16,
                    paddingStart: 20,
                    width: "90%",

                    backgroundColor: "#DDDDDD",
                    height: 60,
                    borderRadius: 20, paddingLeft: 10
                }}></TextInput>
                <TextInput placeholder='Email' keyboardType='email-address' onChangeText={setEmail} value={email} style={{
                    color: 'black',
                    marginTop: 30,
                    fontSize: 16,
                    paddingStart: 20,
                    width: "90%",
                    backgroundColor: "#DDDDDD",
                    height: 60,
                    borderRadius: 20, paddingLeft: 10
                }}></TextInput>
                {(error.chuyennganh != '') ? <Text>{error.chuyennganh}</Text> : null}

                <TouchableOpacity
                    onPress={
                        () => {
                            // setDisplay(!display)
                            Validation(ten, tuoi, chuyennganh)
                            if (checkValidation) {
                                setDisplay(!display)
                            }
                        }
                    }
                    style={{
                        marginTop: 20,
                        width: 300, height: 60,
                        backgroundColor: 'orange',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 20
                    }}>
                    <Text>SAVE</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={
                    () => PushScreen({ navigation }, 'ProductItem')

                }
                    style={{
                        marginTop: 20,
                        width: 300, height: 60,
                        backgroundColor: 'orange',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 20
                    }}>
                    <Text>PREVIEW</Text>
                </TouchableOpacity>


            </View >
    )
}
