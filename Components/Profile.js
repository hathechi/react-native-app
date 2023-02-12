import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

export default Profile = () => {
    return (
        <SwipeItem
            rightButtons={[
                <TouchableOpacity >
                    <Text >Delete</Text>
                </TouchableOpacity>
            ]}
        >
            <View>
                <Text>Item</Text>
            </View>
        </SwipeItem>
    )
}
