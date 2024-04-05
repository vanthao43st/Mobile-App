import { StyleSheet } from 'react-native'
import { deviceHeight, deviceWidth } from '../../components/Dimension'


const styles = StyleSheet.create({
    backgroundImg: {
        width: deviceWidth,
        height: deviceHeight,
    },
    container: {
        position: 'absolute'
    },
    header: {
        marginTop: 15,
        paddingHorizontal: 20,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    icon: {
        color: 'white',
        fontSize: 32,
    },
    setting: {
        position: 'absolute',
        top: 18,
        left: 15,
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
    user: {
        width: 30,
        height: 30,
    },
    containerMain: {
        marginTop: 100
    },
    title: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 33,
        textAlign: 'center'
    },
    searchText: {
        color: '#fff',
        fontSize: 22,
        marginTop: 50,
        marginLeft: 30
    },
    formSearch: {
        // borderWidth: 1,
        // borderColor: '#fff',
        // borderRadius: 40,
        // flexDirection: 'row',
        // justifyContent: 'space-between',
        // paddingHorizontal: 15,
        alignItems: 'center',
        marginLeft: 10,
        marginTop: 20,
    },
    // searchInput: {
    //     color: '#fff',
    //     fontSize: 20,
    //     width: '90%'
    // },
    locationList: {
        marginTop: 230,
        marginLeft: 20
    },
    locationListText: {
        color: '#fff',
        fontSize: 20,
        marginBottom: 20
    },
})

export default styles