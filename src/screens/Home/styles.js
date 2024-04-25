import { StyleSheet } from 'react-native'
import { deviceHeight, deviceWidth } from '../../components/Dimension'


const styles = StyleSheet.create({
    backgroundImg: {
        width: deviceWidth,
        height: deviceHeight,
    },
    container: {
        position: 'absolute',
        width: '100%',
        height: '100%'
    },
    header: {
        marginTop: 15,
        paddingHorizontal: 20,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    headerText: {
        fontSize: 22,
        color: '#fff'
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
    addLLocation: {
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
    searchContainer: {
        height: 280
    },
    formSearch: {
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingRight: 50,
        alignItems: 'center',
        marginHorizontal: 10,
        marginTop: 20,
    },
    searchInput: {
        color: '#fff',
        fontSize: 20,
        width: '100%'
    },
    suggestionsContainer: {
        maxHeight: 150, // Giới hạn chiều cao của danh sách gợi ý
        overflow: 'hidden', // Ẩn phần dữ liệu ngoài giới hạn chiều cao
        marginTop: 20,
        marginHorizontal: 10,
        borderWidth: 1,
        borderColor: 'rgba(236,236,236, 0.3)',
        borderRadius: 20,
    },
    suggestionItem: {
        padding: 10,
    },
    suggestionText: {
        color: '#fff'
    },
    locationList: {
        marginLeft: 20,
        marginTop: 20
    },
    locationListText: {
        color: '#fff',
        fontSize: 20,
        marginBottom: 20
    },
})

export default styles