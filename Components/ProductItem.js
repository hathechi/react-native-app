import React from 'react'
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import PushScreen from '../Init/PushScreen'
import { useNavigation } from '@react-navigation/native'
export default ProdustItem = (props) => {
    const navigation = useNavigation();
    return (
        <View style={{
            margin: 10,
            padding: 15,
            backgroundColor: "#dfe2e8",
            flex: 1,
            borderRadius: 10
        }}>
            <Image style={{
                width: '100%',
                height: 300,
                borderRadius: 15,
            }} source={{ uri: props.item.image }} />
            <View style={{
                marginVertical: 20
            }}>
                <Text style={{
                    fontSize: 20,
                    color: 'black',
                    fontWeight: '700'
                }}>
                    Title: {props.item.title}
                </Text>
                <View style={{
                    flexDirection: 'row',
                    marginTop: 10,
                    justifyContent: 'space-around'
                }}>
                    <View style={{
                        padding: 10,
                        backgroundColor: "#f0f2f2",
                        borderRadius: 10,
                        marginEnd: 20
                    }}>
                        <Text style={{
                            marginEnd: 10,
                            fontSize: 16,
                            color: '#f72346'
                        }}>
                            Price: {props.item.price} $
                        </Text>
                    </View>
                    <View style={{
                        padding: 10,
                        backgroundColor: "#f0f2f2",
                        borderRadius: 10,
                    }}>
                        <Text style={{
                            color: '#f72346',
                            fontSize: 16,
                        }} >
                            Quantity: {props.item.quantity}
                        </Text>
                    </View>

                </View>
                {/* <Text style={{
                    fontSize: 14,
                    marginTop: 10
                }}>
                    Description: {props.item.description}
                </Text> */}

                <View>
                    <TouchableOpacity onPress={() => navigation.navigate('DetailItem', { item: props.item })
                    }
                        style={{
                            marginTop: 20,
                            width: '100%', height: 60,
                            backgroundColor: 'orange',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 20,

                        }}>
                        <Text style={{
                            color: 'white',
                            fontWeight: '700',
                            fontSize: 16,
                        }}>DETAIL</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View >
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
