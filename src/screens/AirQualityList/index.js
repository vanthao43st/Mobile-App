import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import IonIcon from 'react-native-vector-icons/Ionicons'
import styles from './styles'
import Panel from '../Panel'

const AirQualityList = (props) => {
    const { airQualityData, city, lat, lon } = props.route.params;
    // const first24Items = airQualityData.forecast.forecastday[0].hour.slice(11, 25)
    // console.log(airQualityData.forecast)

    const renderItem = ({ item }) => (
        <View style={{ marginBottom: 10 }}>
            <Panel data={item} />
        </View>
    )

    return (
        <View>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => { props.navigation.navigate('AirQualityDetail', { city, airQualityData, lat, lon }) }} style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
                    <IonIcon name="arrow-back-sharp" style={styles.headerIcon} />
                    <Text style={styles.headerIconText}>Back</Text>
                </TouchableOpacity>
                <Text style={styles.headerText}>Air Quality Forecast</Text>
                <Text style={styles.headerText}>{city}</Text>
            </View>
            <View>
                <FlatList
                    data={airQualityData.forecast}
                    renderItem={renderItem}
                    keyExtractor={item => item.time}
                    contentContainerS tyle={{ paddingBottom: 30 }}
                    initialNumToRender={5} // giới hạn số lượng phần tử hiển thị từ đầu
                    maxToRenderPerBatch={5} // giới hạn số lượng phần tử hiển thị trong mỗi lần cuộn
                />
            </View>
        </View>
    )
}

export default AirQualityList