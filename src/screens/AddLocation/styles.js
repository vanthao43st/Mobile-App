import { StyleSheet } from 'react-native'
import { COLORS } from '../../components/theme'

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        marginHorizontal: 15,
        flex: 1
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
        fontSize: 22,
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
        width: '100%'
    }
})

export default styles