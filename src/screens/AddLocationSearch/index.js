import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, TouchableWithoutFeedback, ScrollView, Keyboard } from 'react-native';
import styles from './styles';
import IonIcon from 'react-native-vector-icons/Ionicons';
import cityList from '../../api/vn.json'

const AddLocationSearch = (props) => {
    const [value, setValue] = useState('')
    const [city, setCity] = useState([])
    const [flag] = useState('AddLocationSearch')

    function removeVietnameseTones(str) {
        const accentsMap = {
            'a': 'á|à|ả|ã|ạ|ă|ắ|ặ|ằ|ẳ|ẵ|â|ấ|ầ|ẩ|ẫ|ậ',
            'd': 'đ',
            'e': 'é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ',
            'i': 'í|ì|ỉ|ĩ|ị',
            'o': 'ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ',
            'u': 'ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự',
            'y': 'ý|ỳ|ỷ|ỹ|ỵ',
            'A': 'Á|À|Ả|Ã|Ạ|Ă|Ắ|Ặ|Ằ|Ẳ|Ẵ|Â|Ấ|Ầ|Ẩ|Ẫ|Ậ',
            'D': 'Đ',
            'E': 'É|È|Ẻ|Ẽ|Ẹ|Ê|Ế|Ề|Ể|Ễ|Ệ',
            'I': 'Í|Ì|Ỉ|Ĩ|Ị',
            'O': 'Ó|Ò|Ỏ|Õ|Ọ|Ô|Ố|Ồ|Ổ|Ỗ|Ộ|Ơ|Ớ|Ờ|Ở|Ỡ|Ợ',
            'U': 'Ú|Ù|Ủ|Ũ|Ụ|Ư|Ứ|Ừ|Ử|Ữ|Ự',
            'Y': 'Ý|Ỳ|Ỷ|Ỹ|Ỵ'
        };

        for (const [nonAccentedChar, accentedChars] of Object.entries(accentsMap)) {
            str = str.replace(new RegExp(accentedChars, 'g'), nonAccentedChar);
        }
        return str;
    }

    // Hàm lọc dữ liệu dựa trên input
    const handleSearch = (val) => {
        setValue(val);
        if (!val || val === '') {
            setCity([]);
        } else {
            const filteredCities = cityList.filter((item) =>
                removeVietnameseTones(item.city).toLowerCase().includes(removeVietnameseTones(val).toLowerCase())
            );
            const sortedCities = filteredCities.sort((a, b) => {
                const cityA = removeVietnameseTones(a.city).toLowerCase();
                const cityB = removeVietnameseTones(b.city).toLowerCase();
                const searchVal = removeVietnameseTones(val).toLowerCase();

                if (cityA.startsWith(searchVal) && !cityB.startsWith(searchVal)) {
                    return -1;
                } else if (!cityA.startsWith(searchVal) && cityB.startsWith(searchVal)) {
                    return 1;
                } else {
                    return cityA.localeCompare(cityB);
                }
            });
            setCity(sortedCities);
        }
    };


    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <ScrollView style={{ flex: 1 }}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <View style={styles.formInput}>
                            <IonIcon name='search' size={22} style={styles.searchIcon} />
                            <TextInput
                                // value={citySearch}
                                placeholder='Type the city name'
                                placeholderTextColor={'#000'}
                                onChangeText={(val) => handleSearch(val)}
                                value={value}
                                style={styles.textInput}
                            />
                            <TouchableOpacity
                                style={styles.closeButton}
                                onPress={() => setValue("")}
                            >
                                <IonIcon name='close-circle' size={25} style={styles.closeIcon} />
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity
                            onPress={() => props.navigation.goBack()}
                            style={styles.cancelButton}
                        >
                            <Text style={styles.cancelButtonText}>Hủy</Text>
                        </TouchableOpacity>
                    </View>
                    {value === '' || city.length === 0 ?
                        <View></View>
                        :
                        <View style={styles.suggestionsContainer}>
                            <FlatList
                                data={city}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item }) => (
                                    <View style={styles.suggestionItem}>
                                        <Text style={styles.suggestionText}>{item.city}</Text>
                                        <TouchableOpacity onPress={() => props.navigation.navigate('AddLocation', { flag: flag, city: item.city, lat: item.lat, lon: item.lon })}>
                                            {/* {console.log(flag + ' - ' + item.city + ' - ' + item.lat + ' - ' + item.lon)} */}
                                            <IonIcon name='add-circle' size={30} style={styles.addLocationIcon} />
                                        </TouchableOpacity>
                                    </View>
                                )}
                                initialNumToRender={5}
                                maxToRenderPerBatch={5}
                                nestedScrollEnabled={true}
                                // contentContainerStyle={{ flexGrow: 1 }}
                                pointerEvents="auto" // Cho phép sự kiện cuộn ở đây
                            />
                        </View>
                    }
                    {/* <FlatList
                        data={searchResults}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => {
                                navigation.navigate('Location', { city: item.name, lat: item.lat, lon: item.lon });
                            }}>
                                            <Text>{item.name}</Text>
                                        </TouchableOpacity>
                        )}
                    /> */}
                </View>
            </ScrollView>
        </TouchableWithoutFeedback>
    );
};

export default AddLocationSearch;
