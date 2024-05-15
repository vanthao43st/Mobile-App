import { StyleSheet } from 'react-native'
import { COLORS } from '../../components/theme'

const styles = StyleSheet.create({
    container: {
        marginLeft: 20,
        backgroundColor: '#f5f5f5',
        flex: 1
    },
    // temperatureUnit: {
    //     position: 'absolute',
    //     top: 170,
    //     left: 15,
    //     width: 120,
    //     height: 100,
    //     backgroundColor: 'white',
    //     borderRadius: 20,
    //     // padding: 20,
    //     shadowColor: '#000',
    //     shadowOffset: {
    //         width: 0,
    //         height: 2,
    //     },
    //     shadowOpacity: 0.25,
    //     shadowRadius: 4,
    //     elevation: 5,
    // },
    // modalOverlay: {
    //     flex: 1,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     backgroundColor: 'rgba(0, 0, 0, 0.5)', // Đây là background mờ
    // },
    // temperatureUnitText: {
    //     color: '#000',
    //     fontSize: 20,
    //     marginLeft: 'auto',
    //     marginRight: 30,
    //     marginTop: 14
    // },
    // selected: {
    //     marginLeft: 'auto',
    //     marginRight: 30,
    //     marginTop: 14,
    //     fontSize: 20,
    //     fontWeight: 'bold',
    //     color: 'blue', // Ví dụ: đổi màu và định dạng cho text được chọn
    // },
    temperatureUnitContainer: {
        position: 'absolute',
        top: 170,
        left: 15,
        width: 120,
        height: 110,
        backgroundColor: 'white',
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    windSpeedUnitContainer: {
        position: 'absolute',
        top: 190,
        right: 15,
        width: 300,
        height: 150,
        backgroundColor: 'white',
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    atmosphericPressureUnitContainer: {
        position: 'absolute',
        top: 190,
        right: 15,
        width: 300,
        height: 230,
        backgroundColor: 'white',
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    header: {
        paddingBottom: 20,
    },
    headerText: {
        color: COLORS.primary,
        fontWeight: 'bold',
        fontSize: 30,
        paddingTop: 30,
    },
    headerIcon: {
        color: COLORS.primary,
        fontSize: 30,
    },
    unitComponent: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    columnTitle: {
        flex: 1
    },
    columnTitleText: {
        color: COLORS.primary,
        fontSize: 20,
    },
    columnUnit: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        marginRight: 10
    },
    unit: {
        fontSize: 16,
        color: '#8f8f90',
        textAlign: 'right',
        flex: 1
    },
    icon: {
        color: '#8f8f90',
        marginLeft: 10
    }
})

export default styles