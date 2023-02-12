import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import RNModal from 'react-native-modal';

const ConfirmModal = ({ visible, onConfirm, onCancel, message }) => {
    return (
        <RNModal isVisible={visible}>
            <View style={{ backgroundColor: 'white', padding: 22, borderRadius: 10 }}>
                <Text style={styles.message}>{message}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                    <TouchableOpacity style={[styles.button, styles.colorCancel]} onPress={onCancel}>
                        <Text style={styles.text}>Cancel</Text></TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.colorConfirm]} onPress={onConfirm}>
                        <Text style={styles.text}>Confirm</Text></TouchableOpacity>
                </View>
            </View>
        </RNModal>
    );
};
const styles = StyleSheet.create({
    button: {
        width: 100,
        height: 50,
        backgroundColor: '#16bedb',
        marginHorizontal: 5,
        justifyContent: 'center',
        alignItems: "center",
        borderRadius: 5
    },
    text: {
        fontFamily: 'comfortaa',
        fontSize: 16,
        color: 'white'
    },
    message: {
        fontFamily: 'comfortaa',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 30,
        color: 'black'
    },
    colorCancel: {
        backgroundColor: 'red'
    }
})
export default ConfirmModal;