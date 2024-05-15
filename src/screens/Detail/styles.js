import { StyleSheet } from 'react-native'
import { deviceHeight, deviceWidth } from '../../components/Dimension'
import { COLORS } from '../../components/theme'

const styles = StyleSheet.create({
    setting: {
        position: 'absolute',
        top: 18,
        right: 15,
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
    error: {
        width: deviceWidth,
        height: deviceHeight,
        color: COLORS.primary,
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 20,
        textAlignVertical: 'center',
        backgroundColor: '#f1f1f1'
    },
    backgroundImg: {
        width: deviceWidth,
        height: deviceHeight,
        resizeMode: 'cover', // Đảm bảo hình nền phủ đầy không gian mà không bị méo
        position: 'absolute'
    },
    viewContainer: {
        width: '100%',
    },
    header: {
        marginTop: 20,
        paddingRight: 5,
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
        padding: 5,
        marginTop: deviceHeight * 0.1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
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
        color: '#fff',
        fontSize: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    airQuality: {
        marginTop: 20,
        paddingHorizontal: 15,
        paddingVertical: 10,
        // alignItems: 'center',
        backgroundColor: '#c9c9d0',
        borderRadius: 20,
    },
    airQualityText: {
        color: '#000',
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
        marginTop: 100,
        // backgroundColor: 'rgba(255,255,255,0.2)',
        paddingVertical: 10,
        marginHorizontal: 15,
        borderRadius: 15,
    },
    weatherDetailText: {
        color: '#fff',
        fontSize: 25,
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 30
    },
    timeItem: {
        marginTop: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 30,
        backgroundColor: 'rgba(158, 221, 248, 0.2)',
        borderRadius: 20,
        paddingVertical: 10,
        width: 130
    },
    textTimetem: {
        color: '#fff',
        fontSize: 16,
        marginBottom: 7,
    },
    textTempItem: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold'
    },
    windSpeed: {
        color: '#fff',
        fontSize: 16,
    },
    icon: {
        zIndex: 99999,
        width: 35,
        height: 35,
    },
    containerDtail: {
        backgroundColor: 'rgba(158, 221, 248, 0.2)',
        marginTop: 50,
        paddingTop: 15,
        paddingHorizontal: 40,
        borderRadius: 20
    },
    detailItemSun: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20
    },
    detailItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20
    },
    detailItemSpace: {
        marginBottom: 20
    },
    detailItemText: {
        color: '#fff',
        fontSize: 16
    }
})

export default styles