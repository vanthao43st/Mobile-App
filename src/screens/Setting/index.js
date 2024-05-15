import { View, Text, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native'
import React, { useState } from 'react'
import IonIcon from 'react-native-vector-icons/Ionicons'
import styles from './styles'
import { useWeather } from '../../hooks/useTemperature'
import CustomModal from '../../components/Modal'

const Setting = (props) => {
    const { flag, city, lat, lon } = props.route.params;
    const [visibleTemperature, setVisibleTemperature] = useState(false)
    const [visibleWindSpeed, setVisibleWindSpeed] = useState(false)
    const [visibleAtmosphericPressure, setVisibleAtmosphericPressure] = useState(false)

    const { temperatureUnit, setTemperatureUnit, windSpeedUnit, setWindSpeedUnit, atmosphericPressureUnit, setAtmosphericPressureUnit } = useWeather();

    return (
        <View style={styles.container}>
            {/* Modal to hide temperature unit when clicking outside */}
            {/* <Modal
                animationType='fade'
                transparent={true}
                visible={visibleTemperature}
                onRequestClose={() => setVisibleTemperature(false)}
            >
                <TouchableOpacity
                    style={styles.modalOverlay}
                    activeOpacity={1}
                    onPressOut={() => setVisibleTemperature(false)}
                >
                    <View style={styles.temperatureUnit}>
                        <TouchableOpacity
                            onPress={() => {
                                setTemperatureUnit('C')
                                setVisibleTemperature(false)
                            }}
                        >
                            <Text style={isUnitTemperatureSelected('C') ? styles.selected : styles.temperatureUnitText} >&deg;C</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                setTemperatureUnit('F')
                                setVisibleTemperature(false)
                            }}
                        >
                            <Text style={isUnitTemperatureSelected('F') ? styles.selected : styles.temperatureUnitText}>&deg;F</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal> */}

            <CustomModal
                visible={visibleTemperature}
                setVisible={setVisibleTemperature}
                selectedUnit={temperatureUnit}
                setSelectedUnit={setTemperatureUnit}
                unitOptions={['°C', '°F']}
                containerStyle={styles.temperatureUnitContainer}
            />

            <CustomModal
                visible={visibleWindSpeed}
                setVisible={setVisibleWindSpeed}
                selectedUnit={windSpeedUnit}
                setSelectedUnit={setWindSpeedUnit}
                unitOptions={['Kilometers per hour (km/h)', 'Meters per second (m/s)', 'Miles per hour (mph)']}
                containerStyle={styles.windSpeedUnitContainer}
            />

            <CustomModal
                visible={visibleAtmosphericPressure}
                setVisible={setVisibleAtmosphericPressure}
                selectedUnit={atmosphericPressureUnit}
                setSelectedUnit={setAtmosphericPressureUnit}
                unitOptions={['Standard atmosphere (atm)', 'Millibar (mbar)', 'Inches of mercury (inHg)', 'Millimeters of mercury (mmHg)']}
                containerStyle={styles.atmosphericPressureUnitContainer}
            />

            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => {
                        if (flag === 'Home')
                            props.navigation.navigate('Home')

                        else if (flag === 'Detail')
                            props.navigation.navigate('Detail', { city: city, lat: lat, lon: lon })

                    }}
                    style={{ marginTop: 20 }}
                >
                    <IonIcon name="arrow-back-sharp" style={styles.headerIcon} />
                </TouchableOpacity>
                <Text style={styles.headerText}>Setting</Text>
            </View>

            <View>
                <Text style={{ fontSize: 22 }}>Units</Text>
                <TouchableOpacity
                    onPress={() => setVisibleTemperature(true)}
                    style={styles.unitComponent}
                >
                    <View style={styles.columnTitle}>
                        <Text style={styles.columnTitleText}>Temperature unit</Text>
                    </View>
                    <View style={{ flex: 1 }}></View>
                    <View style={styles.columnUnit}>
                        <Text style={styles.unit}>{temperatureUnit}</Text>
                        <IonIcon name='chevron-expand-outline' size={16} style={styles.icon} />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => setVisibleWindSpeed(true)}
                    style={styles.unitComponent}
                >
                    <View style={styles.columnTitle}>
                        <Text style={styles.columnTitleText}>Wind speed unit</Text>
                    </View>
                    <View style={{ flex: 1 }}></View>
                    <View style={styles.columnUnit}>
                        <Text style={styles.unit}>{windSpeedUnit}</Text>
                        <IonIcon name='chevron-expand-outline' size={16} style={styles.icon} />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => setVisibleAtmosphericPressure(true)}
                    style={styles.unitComponent}
                >
                    <View style={styles.columnTitle}>
                        <Text style={styles.columnTitleText}>atmospheric pressure unit</Text>
                    </View>
                    <View style={{ flex: 1 }}></View>
                    <View style={styles.columnUnit}>
                        <Text style={styles.unit}>{atmosphericPressureUnit}</Text>
                        <IonIcon name='chevron-expand-outline' size={16} style={styles.icon} />
                    </View>
                </TouchableOpacity>

            </View>
        </View >
    )
}

export default Setting