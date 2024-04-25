import { View, Text, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native'
import React, { useState } from 'react'
import IonIcon from 'react-native-vector-icons/Ionicons'
import styles from './styles'

const Setting = (props) => {
    const { flag, city, lat, lon, temperature } = props.route.params || {};
    const [visible, setVisible] = useState(false)
    const [selectedTemperatureUnit, setSelectedTemperatureUnit] = useState(temperature ? temperature : 'C')

    const isUnitTemperatureSelected = (unit) => selectedTemperatureUnit === unit;

    return (
        <View style={styles.container}>
            {/* Modal to hide temperature unit when clicking outside */}
            <Modal
                animationType='fade'
                transparent={true}
                visible={visible}
                onRequestClose={() => setVisible(false)}
            >
                <TouchableOpacity
                    style={styles.modalOverlay}
                    activeOpacity={1}
                    onPressOut={() => setVisible(false)}
                >
                    <View style={styles.temperatureUnit}>
                        <TouchableOpacity
                            onPress={() => {
                                setSelectedTemperatureUnit('C')
                                setVisible(false)
                            }}
                        >
                            <Text style={isUnitTemperatureSelected('C') ? styles.selected : styles.temperatureUnitText} >&deg;C</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                setSelectedTemperatureUnit('F')
                                setVisible(false)
                            }}
                        >
                            <Text style={isUnitTemperatureSelected('F') ? styles.selected : styles.temperatureUnitText}>&deg;F</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Modal>

            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => {
                        if (flag === 'Home')
                            props.navigation.navigate('Home', { temperature: selectedTemperatureUnit })
                        else if (flag === 'Detail')
                            props.navigation.navigate('Detail', { city: city, lat: lat, lon: lon, temperature: selectedTemperatureUnit })
                    }}
                    style={{ marginTop: 20 }}
                >
                    <IonIcon name="arrow-back-sharp" style={styles.headerIcon} />
                </TouchableOpacity>
                <Text style={styles.headerText}>Setting</Text>
            </View>

            <View style={styles.mainContainer}>
                <Text style={{ fontSize: 22 }}>Units</Text>
                <TouchableOpacity
                    onPress={() => setVisible(true)}
                    style={styles.unitComponent}
                >
                    <View style={styles.columnTitle}>
                        <Text style={styles.columnTitleText}>Temperature unit</Text>
                    </View>
                    <View style={{ flex: 1 }}></View>
                    <View style={styles.columnUnit}>
                        {
                            selectedTemperatureUnit === 'C' ?
                                <Text style={styles.unit}>&deg;C</Text>
                                :
                                <Text style={styles.unit}>&deg;F</Text>
                        }
                        <IonIcon name='chevron-expand-outline' size={16} style={styles.icon} />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => { }}
                    style={styles.unitComponent}
                >
                    <View style={styles.columnTitle}>
                        <Text style={styles.columnTitleText}>Wind speed unit</Text>
                    </View>
                    <View style={{ flex: 1 }}></View>
                    <View style={styles.columnUnit}>
                        <Text style={styles.unit}>kilometers per hour (km/h)</Text>
                        <IonIcon name='chevron-expand-outline' size={16} style={styles.icon} />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => { }}
                    style={styles.unitComponent}
                >
                    <View style={styles.columnTitle}>
                        <Text style={styles.columnTitleText}>atmospheric pressure unit</Text>
                    </View>
                    <View style={{ flex: 1 }}></View>
                    <View style={styles.columnUnit}>
                        <Text style={styles.unit}>standard atmosphere (atm)</Text>
                        <IonIcon name='chevron-expand-outline' size={16} style={styles.icon} />
                    </View>
                </TouchableOpacity>
            </View>
        </View >
    )
}

export default Setting