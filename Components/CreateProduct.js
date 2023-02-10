import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    Alert,
    TextInput,
    Image,
    Button,
    ToastAndroid,
    TouchableOpacity,
    ImageBackground,
    useColorScheme,
    View,
} from 'react-native';
import React from 'react';
import { Picker } from '@react-native-picker/picker';
import { useState, useEffect } from 'react';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import axios, { isCancel, AxiosError } from 'axios';


function CreateProduct() {
    const listCategory = [
        'Apple',
        'SamSung',
        'Xiaomi',
        'Huawei'
    ]
    // const [title, setTitle] = useState('');
    // const [price, setPrice] = useState('');
    // const [description, setDescription] = useState('');
    // const [category, setCategory] = useState(listCategory[0]);

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

                setFilePath(source.assets[0].uri);
                // console.log(source.assets[0].uri)
            }
        });
    }

    const schema = yup.object({
        title: yup.string().required(),
        description: yup.string().required(),
        image: yup.string(),
        category: yup.string().required(),
        price: yup.number().positive().integer().required(),
    }).required();

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            title: '',
            price: '',
            description: '',
            category: listCategory[0],
            image: ''
        },
        resolver: yupResolver(schema)

    });

    // const onSubmit = (data) => console.log("DATA  ", data);

    const urlAPI = 'https://61a5e3c48395690017be8ed2.mockapi.io/blogs/products'

    // const deleteItem = async (id) => {
    //     await axios.delete(urlAPI + "/" + id)
    // }

    const onSubmit = async (data) => {

        data.image = filePath
        console.log("image  ", data)
        const res = await axios.post(urlAPI, data)
        if (res.status === 201) {
            console.log("ok")
        } else {
            console.log("Lỗi")
        }
    }


    // let checkValidation = false
    // function Validation(ten, tuoi, chuyennganh) {
    //     // let tenformat = /[a-z A-Z ]/g;
    //     let tenformat = /^[a-zA-Z]+(([\'\,\.\-_ \/)(:][a-zA-Z_ ])?[a-zA-Z_ .]*)*$/
    //     let emailFormat = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    //     if (ten == '' && tuoi == '' && chuyennganh == '' && email == '') {
    //         setError({
    //             ten: "Không được để trống!",
    //             tuoi: "Không được để trống!",
    //             chuyennganh: "Không được để trống!",
    //             email: 'Không được để trống!'
    //         })
    //     } else if (ten == '') {
    //         setError({ ten: "Không được để trống!", })
    //     } else if (tuoi == '') {
    //         setError({ tuoi: "Không được để trống!", })
    //     } else if (chuyennganh == '') {
    //         setError({ chuyennganh: "Không được để trống!", })
    //     }
    //     else if (!ten.match(tenformat)) {
    //         setError({
    //             ten: "không được chứa số và kí tự đặc biệt!",
    //             tuoi: "",
    //             chuyennganh: ""
    //         })
    //     }
    //     else if (!chuyennganh.match(tenformat)) {
    //         setError({
    //             ten: "",
    //             tuoi: "",
    //             chuyennganh: "không được chứa số và kí tự đặc biệt!"
    //         })
    //     }
    //     else if (!email.match(emailFormat)) {
    //         setError({
    //             ten: "",
    //             tuoi: "",
    //             chuyennganh: "Nhập đúng định dạng email!"
    //         })
    //     }
    //     else {
    //         setError({
    //             ten: "",
    //             tuoi: "",
    //             chuyennganh: ""
    //         })
    //         return checkValidation = !checkValidation
    //     }
    // }

    return (
        <ScrollView>
            <View style={{ alignItems: 'center', margin: 30 }}>
                <Controller
                    control={control}

                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput placeholder='Title'
                            onChangeText={onChange}
                            value={value}
                            style={[styles.input, errors.title && styles.borderInputError]}></TextInput>
                    )}
                    name="title"
                ></Controller>
                {errors.title && <Text style={styles.textError}>{errors.title.message}</Text>}
                <Controller
                    control={control}

                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput keyboardType='number-pad'
                            placeholder='Price'
                            onChangeText={onChange}
                            value={value} style={[styles.input, errors.price && styles.borderInputError]}></TextInput>
                    )}
                    name="price"
                ></Controller>
                {errors.price && <Text style={styles.textError}>{errors.price.message}</Text>}

                <Controller
                    control={control}

                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput placeholder='Description'
                            onChangeText={onChange}
                            value={value} style={[styles.input, errors.description && styles.borderInputError]}>

                        </TextInput>
                    )}
                    name="description"
                ></Controller>
                {errors.description && <Text style={styles.textError}>{errors.description.message}</Text>}

                <View style={{
                    height: 60,
                    width: '90%',
                    backgroundColor: "#DDDDDD",
                    borderRadius: 20,
                    marginTop: 30,
                }}>
                    <Controller
                        control={control}

                        render={({ field: { onChange, onBlur, value } }) => (
                            <Picker selectedValue={value}
                                onValueChange={onChange}>
                                {listCategory.map((item) => {
                                    return (
                                        <Picker.Item key={item} label={item} value={item} />
                                    )
                                }
                                )}
                            </Picker>
                        )}
                        name="category"
                    ></Controller>
                    {errors.category && <Text style={styles.textError}>{errors.category.message}</Text>}

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

                {errors.image && <Text style={styles.textError}>{errors.image.message}</Text>}

                {filePath != '' ? <Image style={{
                    width: '100%',
                    height: 300,
                }} source={{ uri: filePath }}></Image> : null}

                <TouchableOpacity
                    onPress={
                        handleSubmit(onSubmit)
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
const styles = StyleSheet.create({
    input: {
        color: 'black',
        marginTop: 30,
        fontSize: 16,
        paddingStart: 20,
        width: "90%",
        backgroundColor: "#DDDDDD",
        height: 60,
        borderRadius: 20,
        paddingLeft: 10,

    },
    borderInputError: {
        borderColor: 'red',
        borderWidth: 1,
        backgroundColor: "#f7d5d9",

    },
    textError: {
        color: 'red',
        marginTop: 5,
    }
})
export default CreateProduct