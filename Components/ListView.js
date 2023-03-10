import React from 'react'
import { Text, View, FlatList, Image } from 'react-native'
import ProductItem from './ProductItem'


export default ListView = ({ data }) => {

    return (
        <View>
            <FlatList data={data}
                renderItem={({ item }) => {
                    return (
                        <ProductItem item={item} />
                    )
                }}
                keyExtractor={item => item.id}>

            </FlatList>
        </View>

    )
}
