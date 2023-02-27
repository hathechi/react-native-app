import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native'
import { React, useEffect, useState } from 'react'
import * as yup from "yup";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Loading from './Loading';
import axios, { isCancel, AxiosError } from 'axios';



const KiemTraScreen = () => {
    const [search, setSearch] = useState('')
    const [price, setPrice] = useState(1000000)

    const [isLoading, setIsLoading] = useState(false)
    const [maKM, setMaKM] = useState([])
    const urlAPI = 'https://63eede715e9f1583bdc8805c.mockapi.io/checkKM'
    useEffect(() => {
        // fetchPost();
    }, []);
    const fetchPost = async (search) => {
        try {
            let response
            // response = await axios.get(dbJson);
            response = await axios.get(`${urlAPI}?search=${search}`);
            // if (!search) {
            //     response = await axios.get(urlAPI);
            // } else {
            // }
            if (response.status == 200) {
                if (response.data != '') {
                    setIsLoading(false)
                    let priceGiam = price - ((price / 100) * response.data[0].giaTri)
                    setPrice(priceGiam)
                    console.log("search", response.data)
                    Alert.alert("Mã Khuyến Mãi:", response.data[0].maKM + " Giảm " + response.data[0].giaTri +
                        '% ' + " Ngày Hết Hạn: " + response.data[0].ngayHH)
                    setIsLoading(false)

                } else {
                    Alert.alert('Mã Không Tồn Tại')
                    setIsLoading(false)

                }
            }
        } catch (error) {
            console.error(error);
        }
    }
    // console.log("xxx", maKM)

    const schema = yup.object({
        magiamgia: yup.string().required(),
    }).required();

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            magiamgia: '',

        },
        resolver: yupResolver(schema)

    });

    const onSubmit = (data) => {

        setIsLoading(true)
        fetchPost(data.magiamgia);

    }
    if (isLoading) {
        return <Loading />
    }
    return (
        <View style={{
            marginHorizontal: 20,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 200
        }}>

            <Text>{price}</Text>
            <View style={[styles.viewStyle, errors.email && styles.borderError]}>
                <Icon name='envelope' size={22} style={{
                    marginLeft: 20,
                    marginEnd: 10,
                }} />
                <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            placeholder='Magiamgia'
                            onChangeText={onChange} value={value}
                            style={styles.textInput}></TextInput>
                    )}
                    name="magiamgia"
                ></Controller>
            </View>
            {errors.magiamgia && <Text style={styles.textError}>{errors.magiamgia.message}</Text>}

            <TouchableOpacity onPress={
                handleSubmit(onSubmit)
                // () => console.log(makm[0])
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
                }}>CHECK</Text>
            </TouchableOpacity>
        </View>
    )
}

export default KiemTraScreen

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