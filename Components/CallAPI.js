import { React, useEffect, useState } from 'react'
import ProductItem from '../Components/ProductItem';
import { View, Text, ActivityIndicator, ScrollView } from 'react-native'
import axios, { isCancel, AxiosError } from 'axios';


export default function CallAPI() {
    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const urlAPI = 'https://61a5e3c48395690017be8ed2.mockapi.io/blogs/products'

    useEffect(() => {
        fetchPost();
    }, []);

    const fetchPost = async () => {
        try {
            const response = await axios.get(urlAPI);
            console.log(response);

            if (response.status == 200) {
                setProducts(response.data)
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
            <ScrollView>
                {products.map((product) => {
                    return <ProductItem item={product} key={product.id} />
                })}
            </ScrollView>

        )
    } else {
        return (
            <View>
                <Text>
                    NO DATA
                </Text>
            </View>
        )
    }
}
