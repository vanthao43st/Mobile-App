import { StyleSheet } from 'react-native'
import { COLORS } from '../../components/theme'

const styles = StyleSheet.create({
    header: {
        backgroundColor: COLORS.primary,
        paddingBottom: 30,
    },
    headerText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 20,
        paddingTop: 20,
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
    }
})

export default styles