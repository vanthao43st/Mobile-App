import { StyleSheet } from 'react-native'
import { deviceHeight, deviceWidth } from '../../components/Dimension'

const styles = StyleSheet.create({
    backgroundImg: {
        width: deviceWidth,
        height: deviceHeight
    },
    setting: {
        position: 'absolute',
        top: 18,
        right: 8,
        zIndex: 9999,
        width: 140,
        height: 100,
        backgroundColor: '#fff',
        borderRadius: 15,
    },
    settingText: {
        color: '#000',
        fontSize: 20,
        marginLeft: 20,
        marginTop: 14
    },
    scrollView: {
        position: 'absolute',
        width: '100%',
    },
    header: {
        marginTop: 20,
        paddingRight: 20,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    headerIcon: {
        color: 'white',
        fontSize: 30,
        marginLeft: 10,
        marginRight: 10
    },
    headerText: {
        color: '#fff',
        fontSize: 22
    },
    tempContainer: {
        padding: 10,
        marginTop: deviceHeight * 0.1,
        width: '100%'
    },
    tempText: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginLeft: 35
    },
    tempTextNumber: {
        color: '#fff',
        fontSize: 70,
        textAlign: 'center',
    },
    tempTextDot: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        top: 10
    },
    tempTextUnit: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30,
        marginLeft: 5,
        top: 15
    },
    tempState: {
        alignSelf: 'center',
        color: '#fff',
        marginTop: 15,
        fontSize: 20,
        justifyContent: 'center'
    },
    airQuality: {
        marginTop: 20,
        paddingHorizontal: 15,
        paddingVertical: 10,
        alignItems: 'center',
        backgroundColor: '#c9c9d0',
        borderRadius: 20,
        alignSelf: 'center',

    },
    airQualityText: {
        color: '#000',
        opacity: 1
    },
    airQualityIcon: {
        marginTop: 10,
        fontSize: 22,
        color: '#000',
    },
    forecast: {
        marginTop: 200
    },
    forecastDetail: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 'auto',
        marginRight: 10
    },
    forecastDetailText: {
        color: '#fff',
        fontSize: 15
    },
    forecastDetailIcon: {
        color: '#fff',
        fontSize: 25
    },
    weatherDetail: {
        marginTop: 150,
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingVertical: 10,
        marginHorizontal: 15,
        borderRadius: 15,
    },
    weatherDetailText: {
        color: '#fff',
        fontSize: 25,
        fontWeight: '600',
        textAlign: 'center',
    }
})

export default styles