import { async } from '@firebase/util';
import { React, useEffect, useState } from 'react'
import { View, Text, Image, TouchableOpacity, SafeAreaView, StyleSheet, FlatList, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import MapView from 'react-native-maps';
import _ from 'lodash';
import { Marker } from 'react-native-maps';


export default function DetailItem({ route, navigation }) {
    const { item } = route.params;
    console.log("Location detail:", item.address.latitude)
    return <SafeAreaView style={{ height: '100%', backgroundColor: 'white' }}>
        <ScrollView>
            <View style={{
                width: '100%',
                height: 600
            }}>
                <FlatList data={item.image}
                    horizontal
                    decelerationRate={'normal'}
                    renderItem={({ item }) => {
                        return <Image style={{
                            width: 450,
                            height: '100%',
                            marginEnd: 20,
                            borderBottomLeftRadius: 30,
                            borderBottomRightRadius: 30,
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
                <Icon name='arrow-left' color={'black'} size={36} />
            </TouchableOpacity>
            <View style={{ margin: 20, }}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',

                }}>
                    <Text style={styles.title}>
                        {item.title}
                    </Text>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        width: '30%',
                        justifyContent: 'flex-end'


                    }}>
                        <Text style={styles.price}>
                            {'$' + item.price + ' '}
                        </Text>
                        <Text style={{}}>
                            /day
                        </Text>

                    </View>

                </View>
                {/* <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 10
            }}>
                <Icon style={{ marginEnd: 5 }} name='location-arrow' color={'black'} size={20} />
                <Text style={{
                    fontFamily: 'comfortaa',
                }}>
                    {item.address}
                </Text>
            </View> */}
                <Text style={styles.description}>{item.description}</Text>
                <View elevation={1} style={{
                    flexDirection: 'row', justifyContent: 'space-evenly',
                    margin: 10,
                    backgroundColor: '#fafafa',
                    paddingVertical: 20,
                    borderRadius: 10
                }}>
                    <View style={{ alignItems: 'center' }}>
                        <Icon name='bed' color={'black'} size={28} />
                        <Text style={styles.marginTop}>
                            2 Beds
                        </Text>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <Icon name='user' color={'black'} size={28} />
                        <Text style={styles.marginTop}>
                            2-4 Adults
                        </Text>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <Icon name='wifi' color={'black'} size={28} />
                        <Text style={styles.marginTop}>
                            Wifi Free
                        </Text>
                    </View>
                </View>
                <MapView style={{
                    width: '100%',
                    height: 500
                }}
                    showsUserLocation
                    // region={region}
                    // onRegionChange={onRegionChange}
                    initialRegion={{
                        latitude: item.address.latitude,
                        longitude: item.address.longitude,
                        latitudeDelta: 0.00999,
                        longitudeDelta: 0.00999,
                    }}
                >
                    <Marker
                        coordinate={{ latitude: item.address.latitude, longitude: item.address.longitude }}
                    // image={{ uri: 'custom_pin' }}
                    />
                </MapView>
            </View>
        </ScrollView>
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

    }
})
