import { StyleSheet } from 'react-native'
import { COLORS } from '../../components/theme'

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 12,
        marginTop: 40
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    formInput: {
        borderWidth: 2,
        borderRadius: 25,
        // marginTop: 30,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        // marginRight: 30,
        flex: 10
    },
    searchIcon: {
        color: COLORS.primary,
        marginRight: 5
    },
    textInput: {
        width: 260,
    },
    closeButton: {
        // marginRight: 50
    },
    closeIcon: {
        color: COLORS.primary
    },
    cancelButton: {
        flex: 1,
        marginLeft: 18
    },
    cancelButtonText: {
        color: 'blue',
        fontSize: 18
    },
    suggestionsContainer: {
        maxHeight: 300, // Giới hạn chiều cao của danh sách gợi ý
        overflow: 'hidden', // Ẩn phần dữ liệu ngoài giới hạn chiều cao
        marginTop: 20,
        marginHorizontal: 10,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 20,
    },
    suggestionItem: {
        padding: 5,
        paddingLeft: 15,
        paddingVertical: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: 20
    },
    suggestionText: {
        color: '#000',
        fontSize: 20
    },
    addLocationIcon: {
        color: '#22cf03'
    }
})

export default styles