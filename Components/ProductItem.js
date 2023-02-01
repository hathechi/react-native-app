import React from 'react'
import { View, Text, Image } from 'react-native'

export default ProdustItem = (props) => {
    return (
        <View>
            <Image style={{ width: '100%', height: 300 }} source={{ uri: props.item.image }} />
            <Text>
                Title: {props.item.title}
            </Text>
            <Text>
                Price: {props.item.price}
            </Text>
            <Text>
                Quantity: {props.item.quantity}
            </Text>
            <Text>
                Description: {props.item.description}
            </Text>
        </View>
    )
}
