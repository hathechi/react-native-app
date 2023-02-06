import { React, useEffect, useState } from 'react'
import ProductItem from '../Components/ProductItem';
import { View, Text, ActivityIndicator, ScrollView, TextInput, StatusBar, TouchableOpacity, Alert } from 'react-native'
import axios, { isCancel, AxiosError } from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import ListView from './ListView';
export default function CallAPI() {
    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [search, setSearch] = useState(null)
    const urlAPI = 'https://61a5e3c48395690017be8ed2.mockapi.io/blogs/products'
    useEffect(() => {
        fetchPost();
    }, []);
    const fetchPost = async () => {
        try {
            let response
            if (!search) {
                response = await axios.get(urlAPI);
            } else {
                response = await axios.get(`${urlAPI}?search=${search}`);
            }

            if (response.status == 200) {
                setProducts(response.data)
                if (response.data == null) {
                    Alert.alert('NO DATA')
                }
                setIsLoading(false)
            }
        } catch (error) {
            console.error(error);
        }
    }
    if (isLoading) {
        return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size={'large'} />
        </View>
    }
    if (products.length > 0) {
        return (

            <View>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                    <TextInput onChangeText={setSearch} value={search}
                        placeholder='Search' style={{
                            backgroundColor: '#d8dee8',
                            borderRadius: 10,
                            marginHorizontal: 30,
                            marginVertical: 10,
                            height: 60,
                            width: '75%',
                            paddingStart: 20,
                            fontSize: 18,
                        }} />
                    <TouchableOpacity onPress={
                        () => {
                            fetchPost(),
                                console.log(search)
                        }

                    }>
                        <Icon name='search' size={24} />
                    </TouchableOpacity>


                </View>
                <View>
                    <ListView data={products} />
                    {/* {products.map((product) => {
                    return <ProductItem item={product} key={product.id} />
                })} */}
                </View>
            </View>

        )
    }
}
