import React from 'react'
import { View, Text } from 'react-native'
import ProductItem from './ProductItem'
const DetailItem = ({ route }) => {
    const { item } = route.params;
    return <ProductItem item={item} />

}

export default DetailItem