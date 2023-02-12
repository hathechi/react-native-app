import React, { useContext } from 'react'
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
// import CallAPI from './CallAPI'
import { useNavigation } from '@react-navigation/native'
import axios, { isCancel, AxiosError } from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { DataContext } from '../context';




export default ProductItem = (props) => {


    const urlAPI = 'https://63e5c253c8839ccc284b255a.mockapi.io/product/product'

    const DeleteItem = async (id) => {
        const deleteItem = await axios.delete(urlAPI + '/' + id)

        if (deleteItem.status === 200) {
            console.log('Xoa OK')
            // Alert.alert("Delete Success")

        } else {
            console.log('Xoa Loi')

        }
    }
    const navigation = useNavigation();

    // const value = useContext(DataContext)
    // console.log("context test ", value)



    return (


        <TouchableOpacity onPress={() => navigation.navigate('DetailItem', { item: props.item })}>


            <View
                elevation={5}
                style={{
                    margin: 10,
                    padding: 20,
                    borderRadius: 10,
                    shadowColor: "#bdbbbb",
                    shadowOpacity: 0.8,
                    shadowRadius: 20,
                    shadowOffset: {
                        height: 5,
                        width: 5
                    }
                }}>
                <Image style={{
                    width: '100%',
                    height: 150,
                    borderRadius: 5,
                }} source={{ uri: props.item.image[0] }}>
                </Image>
                <View style={{
                    marginVertical: 10
                }}>
                    <View style={{

                        flexDirection: 'row',
                        justifyContent: 'space-between',

                    }}>
                        <View style={{
                            width: '65%',

                        }}>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',

                            }}>
                                <Icon style={{ marginEnd: 10 }} name='hotel' color={'black'} size={18} />
                                <Text style={{
                                    fontFamily: 'comfortaa',
                                    fontSize: 18,
                                    color: 'black',
                                }}>
                                    {props.item.title}
                                </Text>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                                <Icon style={{ marginEnd: 18 }} name='location-arrow' color={'black'} size={18} />
                                <Text style={{
                                    fontFamily: 'comfortaa',
                                }}>
                                    {props.item.address}
                                </Text>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                                <Icon style={{ marginEnd: 22 }} name='dollar' color={'black'} size={18} />
                                <Text style={{
                                    fontFamily: 'comfortaa',
                                    color: 'black',
                                }}>
                                    {props.item.price + '$/day'}
                                </Text>
                            </View>
                        </View>
                        <View style={{
                            justifyContent: 'flex-start',
                            marginTop: 10,

                        }}>
                            <AirbnbRating
                                count={5}
                                defaultRating={props.item.rateting}
                                size={16}
                                showRating={false}
                            />
                        </View>
                    </View>
                </View>
            </View>

        </TouchableOpacity>



    )
}

// const styles = StyleSheet.create(
//     {
//         title: {
//             fontSize: 20,
//             color: "red",
//             margin: 10
//         },
//         price: {
//             fontSize: 20,
//             color: "red",
//             margin: 10,
//             fontWeight: "700"
//         },
//         description: {
//             fontSize: 18,
//             margin: 10
//         }
//     }
// )
