import { View, Text, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React, { useState } from 'react'
import styles from './styles'
import IonIcon from 'react-native-vector-icons/Ionicons'

const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
)

const Location = (props) => {
    const [city, setCity] = useState('')

    return (
        <DismissKeyboard>
            <View style={styles.container}>
                <TouchableOpacity onPress={() => { props.navigation.navigate('Home') }} style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
                    <IonIcon name="arrow-back-sharp" style={styles.backIcon} />
                    <Text style={styles.backIcon}>Back</Text>
                </TouchableOpacity>
                <Text style={styles.title}>City Management</Text>
                <View style={styles.formInput}>
                    <TouchableOpacity>
                        <IonIcon name='search' size={22} style={styles.searchIcon} />
                    </TouchableOpacity>
                    <TextInput
                        value={city}
                        placeholder='Type the city name'
                        onChangeText={(val) => setCity(val)}
                        style={styles.textInput}
                    />
                </View>
            </View>
        </DismissKeyboard>
    )
}

export default Location