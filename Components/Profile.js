import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

export default function Profile(props) {
    let info = props.profile;
    return (
        <View style={{
            alignItems: 'center',
            margin: 30,
            borderColor: 'black',
            borderWidth: 2,
            padding: 30
        }}>
            <Text>Tên: {info.name}</Text>
            <Text>Tuổi: {info.age}</Text>
            <Text>Chuyên Ngành: {info.sex}</Text>
            <Text>Email: {info.email}</Text>
            <TouchableOpacity onPress={
                () => props.setHienthi(!props.display)
            }
                style={{
                    marginTop: 20,
                    width: 300, height: 60,
                    backgroundColor: 'orange',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 20
                }}>
                <Text>EDIT</Text>
            </TouchableOpacity>
        </View>
    )
}
