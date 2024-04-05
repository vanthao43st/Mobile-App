import { StyleSheet } from 'react-native'
import { COLORS } from '../../components/theme'

const styles = StyleSheet.create({
    header: {
        backgroundColor: COLORS.primary,
        paddingBottom: 20,
    },
    headerText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 25,
        paddingTop: 30,
        textAlign: 'center'
    },
    headerIcon: {
        color: 'white',
        fontSize: 30,
        marginLeft: 20
    },
    headerIconText: {
        color: '#fff',
        fontSize: 20,
        marginLeft: 5
    },
    time: {
        color: '#fff',
        marginTop: 30,
        textAlign: 'center'
    },
    detail: {
        marginTop: 80,
        marginHorizontal: 15,
    },
    detailIndex: {
        flexDirection: 'row',
    },
    detailNumber: {
        color: '#ff7150',
        fontWeight: '500',
        fontSize: 50,
    },
    detailText: {
        color: '#ff7150',
        fontSize: 20,
        marginLeft: 20,
        lineHeight: 90,
        fontWeight: '500'
    },
    mainDetail: {
        marginHorizontal: 5,
        marginTop: 5
    },
    mainDetailText: {
        color: COLORS.primary,
        fontSize: 16
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    textRow: {
        alignItems: 'center'
    },
    title: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    prominentIndex: {
        color: '#ff7150',
        fontSize: 18,
    },
    index: {
        color: '#2fa183',
        fontSize: 18,
    },
    line: {
        height: 1,
        backgroundColor: COLORS.darkGrey,
        marginTop: 35,
        marginBottom: 20
    },
    moreInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    moreInfoText: {
        color: COLORS.primary,
        fontSize: 17
    },
    moreInfoIcon: {
        color: COLORS.primary
    }
})

export default styles