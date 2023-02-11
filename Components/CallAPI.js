import { React, useEffect, useState } from 'react'
import ProductItem from '../Components/ProductItem';
import { View, Image, Text, ActivityIndicator, ScrollView, TextInput, StatusBar, TouchableOpacity, Alert, FlatList } from 'react-native'
import axios, { isCancel, AxiosError } from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import ListView from './ListView';
import { DataContext } from '../context';
import { Rating, AirbnbRating } from 'react-native-ratings';
export default function CallAPI() {
    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [search, setSearch] = useState('')
    const urlAPI = 'https://63e5c253c8839ccc284b255a.mockapi.io/product/product'
    useEffect(() => {
        fetchPost();
    }, []);
    const fetchPost = async () => {
        try {
            let response
            // response = await axios.get(dbJson);
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
            // <DataContext.Provider value={{ fetchPost }}>
            <View style={{
                backgroundColor: 'white',
                height: '100%',
            }}>
                <ScrollView nestedScrollEnabled={true}  >
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        paddingHorizontal: 20,
                        marginVertical: 15
                    }}>
                        <Icon name='bars' size={30} color={'black'} />
                        <Icon name='user' size={30} color={'black'} />
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                        <TextInput elevation={1}
                            autoFocus={false}
                            onChangeText={setSearch} value={search}
                            placeholder='Search' style={{
                                backgroundColor: '#f7f7f7',
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
                            <Icon name='search' size={28} color={'black'} />
                        </TouchableOpacity>
                    </View>
                    <View>
                        <View>
                            <Text style={{
                                fontFamily: 'comfortaa',
                                fontSize: 28,
                                marginHorizontal: 20,
                                color: 'black'
                            }}>
                                Top Rateting
                            </Text>
                        </View>
                        <FlatList data={products}
                            horizontal
                            decelerationRate={'fast'}
                            renderItem={({ item, index }) => {
                                return <View elevation={8} style={{
                                    margin: 20,
                                    borderRadius: 20,
                                    shadowColor: "black",
                                    shadowOpacity: 0.8,
                                    shadowRadius: 2,
                                    shadowOffset: {
                                        height: 2,
                                        width: 2
                                    }
                                }}>
                                    <Image style={{
                                        width: 350,
                                        height: 250,
                                        borderRadius: 20,
                                        opacity: 0.9,
                                        backgroundColor: 'black',
                                    }} source={{ uri: item.image[0] }}>
                                    </Image>
                                    <View style={{
                                        // backgroundColor: 'red',
                                    }}>
                                        <Text style={{
                                            color: 'white',
                                            fontSize: 28,
                                            fontFamily: 'comfortaa',
                                            position: 'absolute',
                                            width: '70%',
                                            bottom: 0,
                                            margin: 5,
                                            fontWeight: 'bold'
                                        }}>{item.title}</Text>
                                    </View>
                                    <View style={{
                                        position: 'absolute',
                                        top: 0,
                                        right: 0,
                                        margin: 10
                                    }}>
                                        <AirbnbRating
                                            count={5}
                                            defaultRating={item.rateting}
                                            size={20}
                                            showRating={false}
                                        />
                                    </View>
                                </View>
                            }
                            } />
                    </View>
                    <View>
                        <Text style={{
                            fontFamily: 'comfortaa',
                            fontSize: 28,
                            marginHorizontal: 20,
                            color: 'black'
                        }}>
                            Recommended
                        </Text>
                    </View>
                    <View>
                        {products.map((item, i) => {
                            return <View key={i}>
                                <ProductItem item={item} />
                            </View>
                        }
                        )}
                        {/* <ScrollView horizontal={false} style={{ width: "100%" }}>
                                <FlatList data={products}
                                    scrollEnabled={false}
                                    decelerationRate={'fast'}
                                    renderItem={({ item }) => {
                                        return <View elevation={8} style={{
                                            margin: 20,
                                            borderRadius: 20,
                                            shadowColor: "black",
                                            shadowOpacity: 0.8,
                                            shadowRadius: 2,
                                            shadowOffset: {
                                                height: 2,
                                                width: 2
                                            }
                                        }}>
                                            <Image style={{
                                                width: '100%',
                                                height: 150,
                                                borderRadius: 20,
                                                opacity: 0.9,
                                                backgroundColor: 'black',
                                            }} source={{ uri: item.image }}>
                                            </Image>
                                           
                                        </View>
                                    }
                                    } />
                            </ScrollView> */}
                    </View>
                </ScrollView>
                {/* <View style={{
                        marginBottom: 30
                    }}>
                        <ListView data={products} />
                    </View> */}
            </View >
            //</DataContext.Provider>
        )
    }
}
