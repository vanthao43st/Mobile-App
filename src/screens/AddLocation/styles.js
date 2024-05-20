import { StyleSheet } from 'react-native'
import { COLORS } from '../../components/theme'
import { deviceWidth } from '../../components/Dimension'

const styles = StyleSheet.create({
    // container: {
    //     marginTop: 20,
    //     marginHorizontal: 15,
    //     flex: 1,
    //     marginBottom: 15
    // },
    // title: {
    //     color: COLORS.primary,
    //     fontSize: 25,
    //     fontWeight: 'bold',
    //     marginTop: 20,
    //     textAlign: 'center'
    // },
    // backIcon: {
    //     color: COLORS.primary,
    //     fontSize: 22,
    //     marginRight: 5
    // },
    // formInput: {
    //     borderWidth: 1,
    //     borderRadius: 25,
    //     marginTop: 30,
    //     flexDirection: 'row',
    //     alignItems: 'center',
    //     paddingLeft: 10
    // },
    // searchIcon: {
    //     color: COLORS.primary,
    //     marginRight: 5
    // },
    // textInput: {
    //     width: '100%',
    // },
    // cityItem: {
    //     backgroundColor: '#5b7498',
    //     marginTop: 20,
    //     borderRadius: 20,
    //     padding: 20,
    //     flexDirection: 'row',
    //     justifyContent: 'space-between',
    // },
    // cityItemLeft: {
    //     justifyContent: 'center'
    // },
    // cityItemRight: {
    //     justifyContent: 'center'
    // },
    // cityItemName: {
    //     fontSize: 20,
    //     color: '#fff'
    // },
    // cityItemAirquality: {
    //     color: '#fff'
    // },
    // cityItemText: {
    //     color: '#fff',
    //     // fontSize: 20
    // },
    // cityItemTemp: {
    //     color: '#fff',
    //     fontSize: 30
    // },
    // buttonText: {
    //     top: 10
    // }

    container: {
        marginTop: 20,
        marginHorizontal: 15,
        flex: 1,
        marginBottom: 15
    },
    title: {
        color: COLORS.primary,
        fontSize: 25,
        fontWeight: 'bold',
        marginTop: 20,
        textAlign: 'center'
    },
    backIcon: {
        color: COLORS.primary,
        fontSize: 25,
        marginRight: 5
    },
    formInput: {
        borderWidth: 1,
        borderRadius: 25,
        marginTop: 30,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10
    },
    searchIcon: {
        color: COLORS.primary,
        marginRight: 5
    },
    textInput: {
        width: '100%',
    },
    cityItem: {
        backgroundColor: '#5b7498',
        marginTop: 20,
        borderRadius: 20,
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cityItemLeft: {
        justifyContent: 'center'
    },
    cityItemRight: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    cityItemName: {
        fontSize: 20,
        color: '#fff'
    },
    cityItemAirquality: {
        color: '#fff'
    },
    cityItemText: {
        color: '#fff',
        // fontSize: 20
    },
    cityItemTemp: {
        color: '#fff',
        fontSize: 30,
    },
    buttonText: {
        top: 10
    },
    headerContainer: {
        // flexDirection: 'row',
        // justifyContent: 'space-between',
        // alignItems: 'center',
        marginTop: 20,
        marginHorizontal: 10,
    },
    editModeButtons: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    headerSelectDelete: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerButtonSelect: {
        marginLeft: 10
    },
})

export default styles