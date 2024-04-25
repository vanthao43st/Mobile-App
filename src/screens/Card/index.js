import { View, Text, ImageBackground, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from './styles'

const Card = ({ city, image, navigation, lat, lon, temperature }) => {
    return (
        <TouchableOpacity style={{ marginRight: 20 }} onPress={() => { navigation.navigate('Detail', { city, lat, lon, temperature }) }}>
            <ImageBackground source={image} style={styles.backgroundCard} imageStyle={{ borderRadius: 25 }} />
            <View style={styles.locationName}>
                <Text style={styles.locationNameText}>{city}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default Card