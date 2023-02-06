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
import React from 'react';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';


function CreateProduct() {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [error, setError] = useState({
        title: "",
        price: '',
        description: '',
        category: ''

    });
    const [filePath, setFilePath] = useState('');

    const chooseFile = () => {
        let options = {
            title: 'Select Image',
            customButtons: [
                {
                    name: 'customOptionKey',
                    title: 'Choose Photo from Custom Option'
                },
            ],
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        launchImageLibrary(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log(
                    'User tapped custom button: ',
                    response.customButton
                );
                alert(response.customButton);
            } else {
                let source = response;
                // You can also display the image using data:
                // let source = {
                //   uri: 'data:image/jpeg;base64,' + response.data
                // };
                // console.log("obj: ", response)
                setFilePath(source.assets[0].uri);
                // console.log(source.assets[0].uri)
            }
        });
    }

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


    return (
        <ScrollView>
            <View style={{ alignItems: 'center', margin: 30 }}>
                <TextInput placeholder='Title' onChangeText={setTitle} value={title} style={{
                    color: 'black',
                    marginTop: 30,
                    fontSize: 16,
                    paddingStart: 20,
                    backgroundColor: "#DDDDDD",
                    height: 60,
                    width: "90%",
                    borderRadius: 20, paddingLeft: 10
                }}></TextInput>
                {(error.title != '') ? <Text>{error.title}</Text> : null}
                <TextInput keyboardType='numeric' placeholder='Price' onChangeText={setPrice} value={price} style={{
                    color: 'black',
                    marginTop: 30,
                    fontSize: 16,
                    paddingStart: 20,
                    width: "90%",
                    backgroundColor: "#DDDDDD",
                    height: 60,
                    borderRadius: 20, paddingLeft: 10
                }}></TextInput>
                {(error.price != '') ? <Text>{error.price}</Text> : null}

                <TextInput placeholder='Description' onChangeText={setDescription} value={description} style={{
                    color: 'black',
                    marginTop: 30,
                    fontSize: 16,
                    paddingStart: 20,
                    width: "90%",
                    backgroundColor: "#DDDDDD",
                    height: 60,
                    borderRadius: 20, paddingLeft: 10
                }}></TextInput>
                {(error.description != '') ? <Text>{error.description}</Text> : null}

                <TextInput placeholder='Category' onChangeText={setCategory} value={category} style={{
                    color: 'black',
                    marginTop: 30,
                    fontSize: 16,
                    paddingStart: 20,
                    width: "90%",
                    backgroundColor: "#DDDDDD",
                    height: 60,
                    borderRadius: 20, paddingLeft: 10
                }}></TextInput>
                {(error.category != '') ? <Text>{error.category}</Text> : null}
                <View style={{
                    height: 60,
                    width: '90%',
                    backgroundColor: "#DDDDDD",
                    borderRadius: 20,
                    marginTop: 30,
                }}>
                    <Picker>
                        <Picker.Item label="Java" value="java" />
                        <Picker.Item label="JavaScript" value="js" />
                    </Picker>
                </View>
                <TouchableOpacity style={{
                    marginTop: 20,
                    width: 300, height: 60,
                    backgroundColor: 'orange',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 20
                }} onPress={chooseFile}>
                    <Text>
                        CHOICE IMAGE
                    </Text>
                </TouchableOpacity>

                <Image style={{
                    width: '100%',
                    height: 300,
                }} source={{ uri: filePath }}></Image>

                <TouchableOpacity
                    onPress={
                        () => {
                            // console.log(source.assets[0].uri)
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
                    <Text>POST</Text>
                </TouchableOpacity>
            </View >
        </ScrollView>
    );
}
export default CreateProduct