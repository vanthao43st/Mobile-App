import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import IonIcon from 'react-native-vector-icons/Ionicons'
import styles from './styles'
import { COLORS } from '../../components/theme'

const AirQualityDetail = (props) => {
    const { city, airQualityData } = props.route.params;
    const [currentAirQuality, setCurrentAirQuality] = useState('')
    const [time] = useState(new Date(airQualityData[0]?.dt * 1000).toLocaleTimeString('en-GB',
        {
            timeZone: 'Asia/Ho_Chi_Minh',
            hour: '2-digit',
            minute: '2-digit'
        }
    ))
    const components = airQualityData[0].components

    useEffect(() => {
        switch (airQualityData[0].main.aqi) {
            case 1: setCurrentAirQuality('Good')
                break
            case 2: setCurrentAirQuality('Fair')
                break
            case 3: setCurrentAirQuality('Moderate')
                break
            case 4: setCurrentAirQuality('Poor')
                break
            case 5: setCurrentAirQuality('Very Poor')
                break
            default: setCurrentAirQuality('Not Identified')
        }
    }, [])

    return (
        <View>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => { props.navigation.navigate('Detail', { city }) }} style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
                    <IonIcon name="arrow-back-sharp" style={styles.headerIcon} />
                    <Text style={styles.headerIconText}>Back</Text>
                </TouchableOpacity>
                <Text style={styles.headerText}>Air Quality Index</Text>
                <Text style={styles.time}>
                    {city}
                    {' posted at '}
                    {time}
                </Text>
            </View>
            <View style={styles.detail}>
                <View style={styles.detailIndex}>
                    <Text style={styles.detailNumber}>{airQualityData[0].components.pm2_5.toFixed(0)}</Text>
                    <Text style={styles.detailText}>{currentAirQuality}</Text>
                </View>
                <View style={styles.mainDetail}>
                    <Text style={styles.mainDetailText}>Please pay attention to your health, wear a mask before going out.</Text>

                    <View style={styles.row}>
                        <View style={styles.textRow}>
                            <Text style={styles.prominentIndex}>{components.pm2_5.toFixed(1)}</Text>
                            <Text style={{ color: COLORS.primary, fontSize: 12 }}>PM2.5</Text>
                        </View>

                        <View style={styles.textRow}>
                            <Text style={styles.index}>{components.pm10.toFixed(1)}</Text>
                            <Text style={{ color: COLORS.primary, fontSize: 12 }}>PM10</Text>
                        </View>

                        <View style={styles.textRow}>
                            <Text style={styles.index}>{components.so2.toFixed(1)}</Text>
                            <View style={styles.title}>
                                <Text style={{ color: COLORS.primary, fontSize: 12, }}>SO</Text>
                                <Text style={{ lineHeight: 25, fontSize: 10, color: COLORS.primary }}>2</Text>
                            </View>
                        </View>

                        <View style={styles.textRow}>
                            <Text style={styles.index}>{components.no2.toFixed(1)}</Text>
                            <View style={styles.title}>
                                <Text style={{ color: COLORS.primary, fontSize: 12, }}>NO</Text>
                                <Text style={{ lineHeight: 25, fontSize: 10, color: COLORS.primary }}>2</Text>
                            </View>
                        </View>

                        <View style={styles.textRow}>
                            <Text style={styles.index}>{components.o3.toFixed(1)}</Text>
                            <View style={styles.title}>
                                <Text style={{ color: COLORS.primary, fontSize: 12, }}>O</Text>
                                <Text style={{ lineHeight: 25, fontSize: 10, color: COLORS.primary }}>3</Text>
                            </View>
                        </View>

                        <View style={styles.textRow}>
                            <Text style={styles.index}>{components.co.toFixed(1)}</Text>
                            <Text style={{ color: COLORS.primary, fontSize: 12 }}>CO</Text>
                        </View>
                    </View>

                    <View style={styles.line} />

                    <TouchableOpacity onPress={() => { props.navigation.navigate('AirQualityList', { city, airQualityData }) }}>
                        <View style={styles.moreInfo}>
                            <Text style={styles.moreInfoText}>Air Quality Forcast</Text>
                            <IonIcon name='chevron-forward' size={20} style={styles.moreInfoIcon} />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default AirQualityDetail