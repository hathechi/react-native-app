import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Toast from 'react-native-toast-message';

const showToast = (type, message) => {
    Toast.show({
        type: type,
        text1: type.toUpperCase(),
        text2: message
    });
}

export default showToast

const styles = StyleSheet.create({})