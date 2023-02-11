import { StyleSheet, Text, View, ActivityIndicator, ScrollView, SafeAreaView, Alert } from 'react-native'
import { React, useState, useEffect, createContext } from 'react'
import axios, { isCancel, AxiosError } from 'axios';
import { FloatingAction } from "react-native-floating-action";
import Icon from 'react-native-vector-icons/FontAwesome';
import { callFetchPost } from '../context';





const CRUDScreen = ({ navigation }) => {
    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const urlAPI = 'https://63e5c253c8839ccc284b255a.mockapi.io/product/product'
    useEffect(() => {
        fetchPost();
    }, []);
    const fetchPost = async () => {
        try {
            let response = await axios.get(urlAPI);

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
    //Floatting Action Button
    const actions = [
        {
            text: "Create New",
            icon: <Icon name='plus' color={'white'} size={30} />,
            name: "btnCreateNew",
            position: 1,
            buttonSize: 52,
            color: '#0cb346'
        },
        {
            text: "Edit",
            icon: <Icon name='edit' color={'white'} size={30} />,
            name: "btnEdit",
            position: 2,
            buttonSize: 52,
            color: '#067bcf'


        },
        {
            text: "Delete",
            icon: <Icon name='trash' color={'white'} size={30} />,
            name: "btnDelete",
            position: 3,
            buttonSize: 52,
            // textStyle: {
            //     fontSize: 20
            // },
            color: 'red'
        },

    ];


    if (isLoading) {
        return <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size={'large'} />
        </SafeAreaView>
    }

    const abc = () => {
        console.log('ok roi nay')
    }
    if (products.length > 0) {


        return (
            <callFetchPost.Provider value={{ fetchPost }}>
                <SafeAreaView style={{ width: '100%', backgroundColor: 'white' }}>
                    <ScrollView>
                        {products.map((item, i) => {
                            return <View key={i}>
                                <ProductItem item={item} />
                            </View>
                        }
                        )}

                    </ScrollView>
                    <FloatingAction
                        color='black'
                        iconHeight={22}
                        iconWidth={22}
                        buttonSize={64}
                        actions={actions}
                        onPressItem={name => {
                            console.log(`selected button: ${name}`);
                            switch (name) {
                                case 'btnCreateNew': navigation.navigate('CreateProduct')
                                    break
                                case 'btnEdit': Alert.alert('Chọn đối tượng cần chỉnh sửa')
                                    break
                                case 'btnDelete': Alert.alert('Chọn đối tượng cần xóa')
                                    break
                            }
                        }}
                    />

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
                </SafeAreaView>
            </callFetchPost.Provider>
        )
    }
}

export default CRUDScreen

const styles = StyleSheet.create({})