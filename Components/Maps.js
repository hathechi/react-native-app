import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import React, { Component, useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import _ from 'lodash';

export default Maps = ({ navigation }) => {
    const [region, setRegion] = useState({
        latitude: 12.70766381028743,
        longitude: 108.06703306246536,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
    });
    const debouncedSetRegion = _.debounce(setRegion, 500);

    const onRegionChange = (newRegion) => {
        debouncedSetRegion(newRegion);
        console.log('Tọa độ: ', region)

    };

    return (
        <View>
            <MapView style={{
                width: '100%',
                height: '100%',
            }}
                region={region}
                onRegionChange={onRegionChange}
            // initialRegion={{
            //     latitude: 12.70766381028743,
            //     longitude: 108.06703306246536,
            //     latitudeDelta: 0.05,
            //     longitudeDelta: 0.05,
            // }}


            >
                <Marker
                    coordinate={{ latitude: 12.70766381028743, longitude: 108.06703306246536 }}
                // image={{ uri: 'custom_pin' }}
                />
            </MapView>
            <Icon style={{
                position: 'absolute',
                zIndex: 99,
                top: '48%',
                // right: '50%',
                left: '48%'

            }} name='thumb-tack' color={'red'} size={50} />

            <TouchableOpacity style={{
                marginTop: 20,
                width: 300, height: 60,
                backgroundColor: 'orange',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 20,
                position: 'absolute',
                bottom: 20,
                left: 70,

            }} onPress={() => {
                navigation.replace('CreateProduct', { location: region })

            }}>
                <Text>
                    Get
                </Text>
            </TouchableOpacity>
        </View>

    )

}

const styles = StyleSheet.create({})