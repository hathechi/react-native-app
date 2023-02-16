import { Dimensions, FlatList, Image, StyleSheet, Text, View } from 'react-native'
import axios, { isCancel, AxiosError } from 'axios';
import { React, useState, useEffect, createContext } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import Loading from './Loading';
import MasonryList from "@react-native-seoul/masonry-list";
const ListImage = () => {
    const [products, setProducts] = useState([])
    const [images, setImages] = useState([])

    const [isLoading, setIsLoading] = useState(true)
    const urlAPI = 'https://63e5c253c8839ccc284b255a.mockapi.io/product/product'
    useEffect(() => {
        fetchPost();
    }, []);
    const fetchPost = async () => {
        try {

            let response = await axios.get(urlAPI);
            if (response.status == 200) {
                // setProducts(response.data)
                if (images.length > 0) {
                    setImages([])
                }
                //lặp lấy ra từng phần tử mảng image
                response.data.forEach(item => {

                    const image = item.image
                    //lặp lấy ra từng phần tử trong mảng nhỏ image
                    image.forEach((item) => {
                        console.log("Get image ", item)
                        //add vào mảng từng phần tử lấy được mà không làm mất giá trị cũ
                        setImages(images => [...images, item])
                    })
                    // const itemImage = image.join(",")

                });
                // setImages(response.data.image)
                if (response.data == null) {
                    Alert.alert('NO DATA')
                }
                setIsLoading(false)
            }
        } catch (error) {
            console.error(error);
        }
    }

    const HEIGHT_SCREEN = Dimensions.get('window').height;
    const WIDTH_SCREEN = Dimensions.get('window').width;

    if (isLoading) {
        return <Loading />
    }
    return (
        <View style={{ height: '100%', backgroundColor: "white" }}>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 20,
                marginVertical: 15
            }}>
                <Icon name='bars' size={30} color={'black'} />
                <Icon name='user' size={30} color={'black'} />
            </View>

            <View style={{ height: '100%' }}>
                <MasonryList
                    data={images}
                    keyExtractor={this._keyExtractor}
                    numColumns={2}
                    renderItem={(item) => {
                        console.log('item render', item)
                        return (
                            <View style={{
                                borderRadius: 20,
                                margin: 10,
                                marginTop: item.i % 2 == 0 ? 30 : 10,
                                // shadowColor: "black",
                                // shadowRadius: 2,
                                // shadowOffset: {
                                //     height: 2,
                                //     width: 5
                                // }
                                shadowColor: '#000',
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.5,
                                shadowRadius: 2,
                                elevation: 10,
                            }}>
                                <Image style={{
                                    height: item.i % 3 == 0 ? HEIGHT_SCREEN * 0.4 : HEIGHT_SCREEN * 0.25,
                                    width: '100%',
                                    borderRadius: 20,
                                }}
                                    source={{ uri: item.item }}
                                />
                                <View style={{
                                    width: 36,
                                    height: 36,
                                    borderRadius: 100,
                                    backgroundColor: 'white',
                                    position: 'absolute',
                                    top: 0,
                                    right: 0,
                                    margin: 10,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <Icon name='heart' color={'black'} size={20} />
                                </View>
                            </View>

                        )
                    }}
                />
            </View>
        </View>

    )
}

export default ListImage

const styles = StyleSheet.create({})
