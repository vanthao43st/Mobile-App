import { StyleSheet } from 'react-native'
import { COLORS } from '../../components/theme'

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10,
        marginTop: 20,
        backgroundColor: COLORS.lightGrey,
        padding: 15,
        borderRadius: 5,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    date: {
        fontWeight: 'bold',
        fontSize: 17,
        color: COLORS.primary
    },
    index: {
        paddingTop: 5,
        fontWeight: 'bold',
        fontSize: 15,
        color: COLORS.accent
    },
    title: {
        color: '#00b94d',
        fontWeight: '600'
    },
    txRow: {
        flexDirection: 'row'
    },
    subTitle: {
        color: COLORS.primary,
        fontWeight: '600'
    },
    subTitleSub: {
        color: COLORS.primary,
        fontWeight: '600',
        lineHeight: 16
    },
    line: {
        height: 1,
        backgroundColor: COLORS.darkGrey,
        marginVertical: 5
    }
})

export default styles