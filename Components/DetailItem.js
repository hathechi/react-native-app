import { async } from '@firebase/util';
import { React, useEffect, useState, useRef, useMemo, useCallback } from 'react'
import { View, Text, Image, TouchableOpacity, SafeAreaView, StyleSheet, FlatList, ScrollView, Dimensions } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import _ from 'lodash';
import { Marker } from 'react-native-maps';
import MapView from 'react-native-maps';
import DetailBottomSheet from './DetailBottomSheet';


export default function DetailItem({ route, navigation }) {
    const { item } = route.params;
    console.log("Location detail:", item.address.latitude)
    const HEIGHT_SCREEN = Dimensions.get('window').height;
    const WIDTH_SCREEN = Dimensions.get('window').width;



    return <SafeAreaView style={{ height: '100%', backgroundColor: 'white' }}>

        <ScrollView>
            <View style={{
                width: WIDTH_SCREEN,
                height: HEIGHT_SCREEN * 0.9
            }}>
                <FlatList data={item.image}
                    horizontal
                    decelerationRate={'normal'}
                    renderItem={({ item }) => {
                        return <Image style={{
                            width: WIDTH_SCREEN,
                            height: HEIGHT_SCREEN * 0.8,
                            margin: 5,
                            borderRadius: 20,
                            resizeMode: 'cover'
                        }} source={{ uri: item }}>
                        </Image>

                    }}
                />
            </View>

            <TouchableOpacity
                onPress={() => navigation.pop()} style={{
                    position: 'absolute',
                    top: 0,
                    margin: 10,
                    width: 60,
                    height: 60,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                <View style={{
                    width: 60, height: 60, backgroundColor: 'white', borderRadius: 100,
                    justifyContent: 'center',
                    alignItems: "center"
                }}>
                    <Icon name='arrow-left' color={'black'} size={36} />
                </View>
            </TouchableOpacity>

        </ScrollView>
        <DetailBottomSheet item={item} latitude={item.address.latitude} longitude={item.address.longitude} />
    </SafeAreaView>

}
const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontFamily: 'comfortaa',
        color: 'black',
        fontWeight: 'bold',
        width: '70%',
    },
    price: {
        fontSize: 18,
        fontFamily: 'comfortaa',
        color: 'black',
        fontWeight: 'bold',


    },
    description: {
        fontSize: 16,
        fontFamily: 'comfortaa',


    },
    marginTop: {
        marginTop: 10,
        fontFamily: 'comfortaa',
    },

})
