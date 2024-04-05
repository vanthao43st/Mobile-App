import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './styles'
import { COLORS } from '../../components/theme'
import Icon from 'react-native-vector-icons/Ionicons'

const Panel = (props) => {
    const { data } = props
    const [date] = useState(new Date(data.dt * 1000).toLocaleDateString('en-GB'))
    const [time] = useState(new Date(data.dt * 1000).toLocaleTimeString('en-GB'))
    const [airQuality, setAirQuality] = useState('')
    const [collapse, setCollapse] = useState(false)

    useEffect(() => {
        switch (data.main.aqi) {
            case 1: setAirQuality('Good')
                break
            case 2: setAirQuality('Fair')
                break
            case 3: setAirQuality('Moderate')
                break
            case 4: setAirQuality('Poor')
                break
            case 5: setAirQuality('Very Poor')
                break
            default: setAirQuality('Not Identified')
        }
    }, [data])

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => setCollapse(!collapse)}>
                <View style={styles.row}>
                    <View>
                        <Text style={styles.date}>
                            {date}
                            {' | '}
                            {time}
                        </Text>
                        <Text style={styles.index}>
                            Quality Index:
                            {' '}
                            {data.main.aqi}
                            {' '}
                            ({airQuality})
                        </Text>
                    </View>
                    <Icon name={collapse ? 'chevron-down-sharp' : 'chevron-up-sharp'} size={25} color={COLORS.accent} />
                </View>
            </TouchableOpacity>
            {collapse &&
                <View>
                    <View style={styles.row}>
                        <View><Text style={styles.title}>CO</Text></View>
                        <View style={styles.txRow}>
                            <Text style={styles.subTitle}>{data.components.co}</Text>
                            <Text style={styles.subTitle}>{' '}μg/m</Text>
                            <Text style={styles.subTitleSub}>3</Text>
                        </View>
                    </View>
                    <View style={styles.line} />

                    <View style={styles.row}>
                        <View><Text style={styles.title}>NO</Text></View>
                        <View style={styles.txRow}>
                            <Text style={styles.subTitle}>{data.components.no}</Text>
                            <Text style={styles.subTitle}>{' '}μg/m</Text>
                            <Text style={styles.subTitleSub}>3</Text>
                        </View>
                    </View>
                    <View style={styles.line} />

                    <View style={styles.row}>
                        <View><Text style={styles.title}>NO2</Text></View>
                        <View style={styles.txRow}>
                            <Text style={styles.subTitle}>{data.components.no2}</Text>
                            <Text style={styles.subTitle}>{' '}μg/m</Text>
                            <Text style={styles.subTitleSub}>3</Text>
                        </View>
                    </View>
                    <View style={styles.line} />

                    <View style={styles.row}>
                        <View><Text style={styles.title}>O3</Text></View>
                        <View style={styles.txRow}>
                            <Text style={styles.subTitle}>{data.components.o3}</Text>
                            <Text style={styles.subTitle}>{' '}μg/m</Text>
                            <Text style={styles.subTitleSub}>3</Text>
                        </View>
                    </View>
                    <View style={styles.line} />

                    <View style={styles.row}>
                        <View><Text style={styles.title}>SO2</Text></View>
                        <View style={styles.txRow}>
                            <Text style={styles.subTitle}>{data.components.so2}</Text>
                            <Text style={styles.subTitle}>{' '}μg/m</Text>
                            <Text style={styles.subTitleSub}>3</Text>
                        </View>
                    </View>
                    <View style={styles.line} />

                    <View style={styles.row}>
                        <View><Text style={styles.title}>PM2_5</Text></View>
                        <View style={styles.txRow}>
                            <Text style={styles.subTitle}>{data.components.pm2_5}</Text>
                            <Text style={styles.subTitle}>{' '}μg/m</Text>
                            <Text style={styles.subTitleSub}>3</Text>
                        </View>
                    </View>
                    <View style={styles.line} />

                    <View style={styles.row}>
                        <View><Text style={styles.title}>PM10</Text></View>
                        <View style={styles.txRow}>
                            <Text style={styles.subTitle}>{data.components.pm10}</Text>
                            <Text style={styles.subTitle}>{' '}μg/m</Text>
                            <Text style={styles.subTitleSub}>3</Text>
                        </View>
                    </View>
                    <View style={styles.line} />

                    <View style={styles.row}>
                        <View><Text style={styles.title}>NH3</Text></View>
                        <View style={styles.txRow}>
                            <Text style={styles.subTitle}>{data.components.nh3}</Text>
                            <Text style={styles.subTitle}>{' '}μg/m</Text>
                            <Text style={styles.subTitleSub}>3</Text>
                        </View>
                    </View>
                    <View style={styles.line} />
                </View>}
        </View>
    )
}

export default Panel