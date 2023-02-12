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
    FlatList,
} from 'react-native';
import { React, useContext } from 'react';
import { Picker } from '@react-native-picker/picker';
import { useState, useEffect } from 'react';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import axios, { isCancel, AxiosError } from 'axios';
import Loading from './Loading';
const EditProduct = ({ route, navigation }) => {
    const [isLoading, setIsLoading] = useState(false)
    const { itemEdit } = route.params;
    const listRateting = [
        '1',
        '2',
        '3',
        '4',
        '5'
    ]

    const [filePathArray, setFilePathArray] = useState([]);
    const chooseFile = (type) => {
        let options =
        {
            mediaType: type,
            maxWidth: 300,
            maxHeight: 550,
            quality: 30,
            selectionLimit: 5
        };
        launchImageLibrary(options, (response) => {

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                if (filePathArray.length > 0) {
                    setFilePathArray([])
                }
                response.assets.forEach(function (item, index) {
                    setFilePathArray(filePathArray => [...filePathArray, item.uri]);
                });
                console.log("xxx", filePathArray)
            };
        })
    };
    const schema = yup.object({
        title: yup.string().required(),
        description: yup.string().required(),
        image: yup.array(),
        rateting: yup.string(),
        address: yup.string().required(),
        price: yup.number().positive().integer().required(),
        phone: yup.number().positive().integer().required(),
    }).required();

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            title: '',
            price: 0,
            description: '',
            address: '',
            image: [],
            phone: '',
            rateting: listRateting[0]
        },
        resolver: yupResolver(schema)

    });



    const urlAPI = 'https://63e5c253c8839ccc284b255a.mockapi.io/product/product'
    console.log("ID  ", itemEdit.id)

    const onSubmit = async (data) => {
        if (filePathArray.length == 0) {
            Alert.alert('image not selected yet')
        } else {
            data.image = filePathArray
            console.log("data  ", data)
            //Edit API
            setIsLoading(true)
            const res = await axios.put(urlAPI + '/' + itemEdit.id, data)

            if (res.status === 200) {
                console.log("edit ok")
                navigation.replace('HomeScreen')
                // navigation.pop()
                setIsLoading(false)

                Alert.alert("Edit Success")
            } else {
                console.log("Lỗi")
                Alert.alert("Edit Error")

            }
        }

    }
    if (isLoading) {
        return <Loading />
    }
    return (
        <ScrollView style={{ width: '100%', backgroundColor: 'white' }}>
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
                            placeholder='Price /Day'
                            maxLength={6}
                            onChangeText={onChange}
                            value={value} style={[styles.input, errors.price && styles.borderInputError]}></TextInput>
                    )}
                    name="price"
                ></Controller>
                {errors.price && <Text style={styles.textError}>{errors.price.message}</Text>}
                <Controller
                    control={control}

                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput keyboardType='number-pad'
                            placeholder='Phone Number'
                            maxLength={10}
                            onChangeText={onChange}
                            value={value} style={[styles.input, errors.phone && styles.borderInputError]}></TextInput>
                    )}
                    name="phone"
                ></Controller>
                {errors.phone && <Text style={styles.textError}>{errors.phone.message}</Text>}

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
                <Controller
                    control={control}

                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput placeholder='Address'
                            onChangeText={onChange}
                            value={value} style={[styles.input, errors.address && styles.borderInputError]}>

                        </TextInput>
                    )}
                    name="address"
                ></Controller>
                {errors.description && <Text style={styles.textError}>{errors.address.message}</Text>}

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
                                {listRateting.map((item) => {
                                    return (
                                        <Picker.Item key={item} label={item} value={item} />
                                    )
                                }
                                )}
                            </Picker>
                        )}
                        name="rateting"
                    ></Controller>
                    {errors.rateting && <Text style={styles.textError}>{errors.rateting.message}</Text>}

                </View>
                <TouchableOpacity style={{
                    marginTop: 20,
                    width: 300, height: 60,
                    backgroundColor: 'orange',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 20
                }} onPress={() => {
                    chooseFile('photo')

                }}>
                    <Text>
                        CHOICE IMAGE
                    </Text>
                </TouchableOpacity>

                {errors.image && <Text style={styles.textError}>{errors.image.message}</Text>}

                {/* {filePathArray != '' ? filePathArray.map((item, i) => {
                    return <Image key={i} style={{
                        width: 300,
                        height: 200,
                        margin: 10
                    }} source={{ uri: item }}></Image>
                }) : null} */}

                {filePathArray != '' ? <FlatList
                    horizontal
                    data={filePathArray}
                    renderItem={({ item }) => {
                        return <Image style={{
                            width: 300,
                            height: 200,
                            margin: 10
                        }} source={{ uri: item }}></Image>
                    }}
                /> : null}

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
                    <Text>EDIT</Text>
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
export default EditProduct