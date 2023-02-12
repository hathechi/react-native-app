import { Text, View, ActivityIndicator } from 'react-native'
import React, { Component } from 'react'
import RNModal from 'react-native-modal';


export class Loading extends Component {
    render() {
        return (
            <RNModal style={{
                justifyContent: 'center',
                alignItems: 'center',
            }} isVisible={true}>

                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '80%',
                    height: 100,
                    borderRadius: 10,
                    backgroundColor: 'white',
                    flexDirection: 'row'
                }}>
                    <ActivityIndicator size={'large'} />
                    <Text style={{
                        fontSize: 18,
                        marginLeft: 30,
                        color: 'black'
                    }}>Processing ...</Text>
                </View>
            </RNModal >
        )
    }
}

export default Loading