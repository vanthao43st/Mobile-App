import { StyleSheet } from 'react-native'
import { deviceHeight, deviceWidth } from '../../components/Dimension'

const styles = StyleSheet.create({
    backgroundCard: {
        width: deviceWidth / 3 + 20,
        height: deviceHeight / 5,
    },
    locationName: {
        position: 'absolute',
        height: '100%',
        width: '100%'
    },
    locationNameText: {
        color: '#fff',
        fontSize: 20,
        height: '100%',
        textAlign: 'center',
        textAlignVertical: 'center'
    }
})

export default styles