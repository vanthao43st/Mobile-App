import { View, Text, ImageBackground, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './styles'

const Card = ({ name, image, city, navigation }) => {
    return (
        <TouchableOpacity style={{ marginRight: 20 }} onPress={() => { navigation.navigate('Detail', { city }) }}>
            <ImageBackground source={image} style={styles.backgroundCard} imageStyle={{ borderRadius: 25 }} />
            <View style={styles.locationName}>
                <Text style={styles.locationNameText}>{name}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default Card