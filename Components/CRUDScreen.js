import { StyleSheet, Text, View, ActivityIndicator, ScrollView, SafeAreaView, Alert, Image, TouchableOpacity } from 'react-native'
import { React, useState, useEffect, createContext } from 'react'
import axios, { isCancel, AxiosError } from 'axios';
import { FloatingAction } from "react-native-floating-action";
import Icon from 'react-native-vector-icons/FontAwesome';
import { callFetchPost } from '../context';
import { SwipeItem, SwipeButtonsContainer, SwipeProvider } from 'react-native-swipe-item';
import ConfirmModal from './ConfirmModal';
import Loading from './Loading';
const CRUDScreen = ({ navigation }) => {
    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [idProduct, setIdProduct] = useState('')
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

            color: 'red'
        },
    ];
    const [isModalVisible, setModalVisible] = useState(false);
    const showModal = () => {
        setModalVisible(true);
    };
    const hideModal = () => {
        setModalVisible(false);
    };
    const handleConfirm = (id) => {
        // Xử lý xóa item
        DeleteItem(id)
        setIsLoading(true)
        hideModal();
    };
    const DeleteItem = async (id) => {
        const deleteItem = await axios.delete(urlAPI + '/' + id)
        if (deleteItem.status === 200) {
            console.log('Xoa OK')
            // Alert.alert("Delete Success")
            fetchPost()
            setIsLoading(false)
        } else {
            console.log('Xoa Loi')
        }
    }
    if (isLoading) {
        return <Loading />
    }
    const abc = () => {
        console.log('ok roi nay')
    }
    if (products.length > 0) {
        return (
            <SafeAreaView style={{ height: '100%', backgroundColor: 'white' }} >
                <ScrollView >
                    {products.map((item, i) => {
                        return <View key={i}>


                            <TouchableOpacity
                                onPress={() => {
                                    setIdProduct(item.id)
                                    console.log(item.id, "XOA")
                                    showModal()
                                }}
                                style={{
                                    position: "absolute",
                                    top: 0,
                                    right: 0,
                                    zIndex: 99,
                                    padding: 20,
                                }} >
                                <Icon name='trash' color={'black'} size={30} />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    // console.log(item.id, "XOA")
                                    // showModal()
                                    navigation.navigate('EditProduct', { itemEdit: item })
                                }}
                                style={{
                                    position: "absolute",
                                    top: 80,
                                    right: 0,
                                    zIndex: 99,
                                    padding: 20,
                                }} >
                                <Icon name='edit' color={'black'} size={30} />
                            </TouchableOpacity>

                            <View style={{
                                margin: 10,
                                backgroundColor: '#e8e8e8',
                                padding: 10,
                                borderRadius: 10,
                            }}>
                                <View style={{ flexDirection: 'row', width: '100%' }}>
                                    <Image style={styles.image} source={{ uri: item.image[0] }} />
                                    <View style={{
                                        marginLeft: 20,
                                        width: '50%',
                                    }}>
                                        <View style={{
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                        }}>
                                            <Icon style={{ marginEnd: 10 }} name='hotel' color={'black'} size={18} />
                                            <Text style={styles.title}>
                                                {item.title}
                                            </Text>
                                        </View>
                                        {/* <View style={{
                                            flexDirection: 'row',
                                            alignItems: 'center'
                                        }}>
                                            <Icon style={{ marginEnd: 18 }} name='location-arrow' color={'black'} size={18} />
                                            <Text style={{
                                                fontFamily: 'comfortaa',
                                            }}>
                                                {item.address.location.latitude}
                                            </Text>
                                        </View> */}
                                        <View style={{
                                            flexDirection: 'row',
                                            alignItems: 'center'
                                        }}>
                                            <Icon style={{ marginEnd: 22 }} name='dollar' color={'black'} size={18} />
                                            <Text style={styles.price}>
                                                {item.price + '$/day'}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </View>

                        </View>
                    }
                    )}
                    <ConfirmModal
                        visible={isModalVisible}
                        onConfirm={() => handleConfirm(idProduct)}
                        onCancel={hideModal}
                        message={"Do you want to delete?"}
                    />
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
                            case 'btnCreateNew': navigation.navigate('CreateProduct', { location: '' })
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
        )
    }
}
export default CRUDScreen
const styles = StyleSheet.create({
    title: {
        color: 'black',
        fontFamily: 'comfortaa',
        fontSize: 18,
        fontWeight: 'bold',
    },
    price: {
        fontFamily: 'comfortaa',
        fontSize: 16,
        fontWeight: 'bold'
    },
    image: {
        width: 150,
        height: 120,
        borderRadius: 10
    },
    button: {
        width: '80%',
        height: 100,
        alignSelf: 'center',
        marginVertical: 5,
    },
    swipeContentContainerStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 10,
        borderColor: '#e3e3e3',
        borderWidth: 1,
    }
})