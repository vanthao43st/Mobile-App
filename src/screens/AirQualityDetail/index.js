import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import IonIcon from 'react-native-vector-icons/Ionicons'
import styles from './styles'
import { COLORS } from '../../components/theme'
import { getAQIColor, getAQIForAllPollutants, getAQILevel, getOverallAQI } from '../../utils/AQI_Index'

const AirQualityDetail = (props) => {
    const { airQualityData, city, lat, lon, airQualityHourlyData } = props.route.params;
    const [currentAirQuality, setCurrentAirQuality] = useState('')
    const [time] = useState(new Date(airQualityData.current.last_updated_epoch * 1000).toLocaleTimeString('en-GB',
        {
            timeZone: 'Asia/Ho_Chi_Minh',
            hour: '2-digit',
            minute: '2-digit'
        }
    ))

    // console.log(airQualityData.forcast)

    // useEffect(() => {
    //     switch (airQualityData[0].main.aqi) {
    //         case 1: setCurrentAirQuality('Good')
    //             break
    //         case 2: setCurrentAirQuality('Fair')
    //             break
    //         case 3: setCurrentAirQuality('Moderate')
    //             break
    //         case 4: setCurrentAirQuality('Poor')
    //             break
    //         case 5: setCurrentAirQuality('Very Poor')
    //             break
    //         default: setCurrentAirQuality('Not Identified')
    //     }
    // }, [])

    const aqiValues = getAQIForAllPollutants(airQualityData.current.air_quality);
    const overallAQI = getOverallAQI(aqiValues);
    const aqiColor = getAQIColor(overallAQI);
    const aqiLevel = getAQILevel(overallAQI);
    const aqiColorPm25 = getAQIColor(aqiValues.pm25)
    const aqiColorPm10 = getAQIColor(aqiValues.pm10)
    const aqiColorSo2 = getAQIColor(aqiValues.so2)
    const aqiColorNo2 = getAQIColor(aqiValues.no2)
    const aqiColorO3 = getAQIColor(aqiValues.o3)
    const aqiColorCo = getAQIColor(aqiValues.co)

    return (
        <View>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => { props.navigation.navigate('Detail', { city, lat, lon }) }} style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
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
                    <Text style={[styles.detailNumber, { color: aqiColor }]}>{overallAQI.toFixed(0)}</Text>
                    <Text style={[styles.detailText, { color: aqiColor }]}>{aqiLevel}</Text>
                </View>
                <View style={styles.mainDetail}>
                    <Text style={styles.mainDetailText}>Please pay attention to your health, wear a mask before going out.</Text>

                    <View style={styles.row}>
                        <View style={styles.textRow}>
                            <Text style={[styles.prominentIndex, { color: aqiColorPm25 }]}>{aqiValues.pm25}</Text>
                            <Text style={{ color: COLORS.primary, fontSize: 12 }}>PM2.5</Text>
                        </View>

                        <View style={styles.textRow}>
                            <Text style={[styles.index, { color: aqiColorPm10 }]}>{aqiValues.pm10}</Text>
                            <Text style={{ color: COLORS.primary, fontSize: 12 }}>PM10</Text>
                        </View>

                        <View style={styles.textRow}>
                            <Text style={[styles.index, { color: aqiColorSo2 }]}>{aqiValues.so2}</Text>
                            <View style={styles.title}>
                                <Text style={{ color: COLORS.primary, fontSize: 12, }}>SO</Text>
                                <Text style={{ lineHeight: 25, fontSize: 10, color: COLORS.primary }}>2</Text>
                            </View>
                        </View>

                        <View style={styles.textRow}>
                            <Text style={[styles.index, { color: aqiColorNo2 }]}>{aqiValues.no2}</Text>
                            <View style={styles.title}>
                                <Text style={{ color: COLORS.primary, fontSize: 12, }}>NO</Text>
                                <Text style={{ lineHeight: 25, fontSize: 10, color: COLORS.primary }}>2</Text>
                            </View>
                        </View>

                        <View style={styles.textRow}>
                            <Text style={[styles.index, { color: aqiColorO3 }]}>{aqiValues.o3}</Text>
                            <View style={styles.title}>
                                <Text style={{ color: COLORS.primary, fontSize: 12, }}>O</Text>
                                <Text style={{ lineHeight: 25, fontSize: 10, color: COLORS.primary }}>3</Text>
                            </View>
                        </View>

                        <View style={styles.textRow}>
                            <Text style={[styles.index, { color: aqiColorCo }]}>{aqiValues.co}</Text>
                            <Text style={{ color: COLORS.primary, fontSize: 12 }}>CO</Text>
                        </View>
                    </View>

                    <View style={styles.line} />

                    <TouchableOpacity onPress={() => { props.navigation.navigate('AirQualityList', { city, airQualityData, lat, lon, airQualityHourlyData }) }}>
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