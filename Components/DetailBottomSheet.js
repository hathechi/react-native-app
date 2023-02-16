import { React, useEffect, useState, useRef, useMemo, useCallback } from 'react'
import { View, Text, Image, TouchableOpacity, SafeAreaView, StyleSheet, FlatList, ScrollView, Dimensions } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';

//maps
import { Marker } from 'react-native-maps';
import MapView from 'react-native-maps';
//bottomsheet 
import BottomSheet from '@gorhom/bottom-sheet';
import * as Animatable from 'react-native-animatable'
import { Rating, AirbnbRating } from 'react-native-ratings';

import { Linking } from 'react-native';


export default DetailBottomSheet = (props) => {

    const bottomSheetRef = useRef(null);

    // variables
    const snapPoints = useMemo(() => ['15%', '100%'], []);

    // callbacks
    const handleSheetChanges = useCallback((index) => {
        console.log('handleSheetChanges', index);
    }, []);
    const HEIGHT_SCREEN = Dimensions.get('window').height;

    //Gọi điện 
    const callNumber = (phone) => {
        let phoneNumber = phone;
        if (Platform.OS !== 'android') {
            phoneNumber = `telprompt:${phone}`;
        } else {
            phoneNumber = `tel:${phone}`;
        }
        Linking.openURL(phoneNumber);
    };

    return (
        <BottomSheet
            ref={bottomSheetRef}
            index={0}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}
        >

            <Animatable.View
                duration={400}
                delay={500}
                easing='ease-in-out'
                animation='fadeInUp' style={{ margin: 20, }}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 20,

                }}>
                    <Text style={styles.title}>
                        {props.item.title}
                    </Text>
                    <View style={{ width: '30%', }}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'flex-end'
                        }}>
                            <Text style={styles.price}>
                                {'$' + props.item.price + ' '}
                            </Text>
                            <Text>
                                /day
                            </Text>

                        </View>
                        <AirbnbRating
                            count={5}
                            defaultRating={props.item.rateting}
                            size={20}

                            showRating={false}
                        />
                    </View>

                </View>

                <Text style={styles.description}>{props.item.description}</Text>
                <View elevation={1} style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    margin: 10,
                    backgroundColor: '#fafafa',
                    paddingVertical: 20,
                    borderRadius: 10
                }}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                        <Icon style={{ marginHorizontal: 10 }} name='phone' color={'black'} size={20} />
                        <Text style={styles.phone}>{props.item.phone}</Text>
                    </View>

                    <TouchableOpacity onPress={() => callNumber(props.item.phone)} style={styles.btnCall}>
                        <Text>CALL</Text>
                    </TouchableOpacity>

                </View>
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
                    height: HEIGHT_SCREEN * 0.5
                }}
                    // scrollEnabled={false}
                    // zoomEnabled={false}
                    // rotateEnabled={false}
                    showsUserLocation
                    // region={region}
                    // onRegionChange={onRegionChange}
                    initialRegion={{
                        latitude: props.latitude,
                        longitude: props.longitude,
                        latitudeDelta: 0.00999,
                        longitudeDelta: 0.00999,
                    }}
                >
                    <Marker
                        coordinate={{ latitude: props.latitude, longitude: props.longitude }}
                    // image={{ uri: 'custom_pin' }}
                    />
                </MapView>

            </Animatable.View>
        </BottomSheet>
    )

}

const styles = StyleSheet.create({
    title: {
        fontSize: 30,
        fontFamily: 'comfortaa',
        color: 'black',
        fontWeight: 'bold',
        width: '70%',
        marginBottom: 15
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
    phone: {
        fontFamily: 'comfortaa',
        fontSize: 18,
        fontWeight: "bold"
    },
    viewPhone: {

    },
    marginTop: {
        marginTop: 10,
        fontFamily: 'comfortaa',
    },
    btnCall: {
        backgroundColor: '#e8ebea',
        height: 40, width: 80,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginEnd: 30
    }

})
