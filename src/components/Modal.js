import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const CustomModal = ({
    visible,
    setVisible,
    selectedUnit,
    setSelectedUnit,
    unitOptions,
    containerStyle
}) => {
    const isUnitSelected = (unit) => selectedUnit === unit;

    return (
        <Modal
            animationType='fade'
            transparent={true}
            visible={visible}
            onRequestClose={() => setVisible(false)}
        >
            <TouchableOpacity
                style={styles.modalOverlay}
                activeOpacity={1}
                onPressOut={() => setVisible(false)}
            >
                <View style={[styles.unitContainer, containerStyle]}>
                    {
                        unitOptions.map((unit) => (
                            <TouchableOpacity
                                onPress={() => {
                                    setSelectedUnit(unit)
                                    setVisible(false)
                                }}
                            >
                                <Text style={isUnitSelected(unit) ? styles.selected : styles.unitText} >{unit}</Text>
                            </TouchableOpacity>
                        ))
                    }
                </View>
            </TouchableOpacity>
        </Modal>
    )
}

export default CustomModal;

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Đây là background mờ
    },
    selected: {
        marginLeft: 'auto',
        marginLeft: 30,
        marginTop: 20,
        fontSize: 20,
        fontWeight: 'bold',
        color: 'blue', // Ví dụ: đổi màu và định dạng cho text được chọn
    },
    unitText: {
        color: '#000',
        fontSize: 20,
        marginLeft: 'auto',
        marginLeft: 30,
        marginTop: 20
    }
})