import { View, Text, ImageBackground, TouchableOpacity, FlatList, TouchableWithoutFeedback, Keyboard, Modal, TextInput } from 'react-native'
import React, { useState } from 'react'
import styles from './styles'
import IonIcon from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Card from '../Card';
import cityList from '../../api/vn.json'

const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
)

const Home = (props) => {
    const cities = [
        {
            city: 'Hà Nội',
            lat: "21.0000",
            lon: "105.8500",
            image: require('../../assets/img/hanoi.jpg')
        },
        {
            city: 'Đà Nẵng',
            lat: "16.0748",
            lon: "108.2240",
            image: require('../../assets/img/danang.jpg')
        },
        {
            city: 'Cần Thơ',
            lat: "10.0333",
            lon: "105.7833",
            image: require('../../assets/img/cantho.jpg')
        },
        {
            city: 'Hồ Chí Minh',
            lat: "10.7756",
            lon: "106.7019",
            image: require('../../assets/img/hochiminh.jpg')
        },
        {
            city: 'Huế',
            lat: "16.4667",
            lon: "107.5792",
            image: require('../../assets/img/hue.jpg')
        },
    ]

    const [visible, setVisible] = useState(false)
    const [value, setValue] = useState()
    const [city, setCity] = useState([])
    const [flag] = useState('Home')
    const { temperature } = props.route.params || {};

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

    const getLocation = () => {
        const result = city.find(item => removeVietnameseTones(item.city).toLowerCase() === removeVietnameseTones(value).toLowerCase())
        return result ? result : null
    }


    // Hàm lọc dữ liệu dựa trên input
    const handleSearch = (val) => {
        setValue(val);
        if (!val || val === '') {
            setCity([]);
        } else {
            setCity(
                cityList.filter((item) =>
                    removeVietnameseTones(item.city).toLowerCase().includes(removeVietnameseTones(val).toLowerCase())
                )
            );
        }
    };

    const handlePress = (item) => {
        props.navigation.navigate('Detail', { city: item.city, lat: item.lat, lon: item.lon, temperature: temperature })
        setValue()
        setCity([])
    }

    const searchPress = () => {
        props.navigation.navigate('Detail', { city: getLocation.city, lat: getLocation.lat, lon: getLocation.lon, temperature: temperature })
        setValue()
        setCity([])
    }


    // Hàm để ngăn không cho sự kiện onPress của cha lan truyền xuống con
    const stopPropagation = (event) => {
        event.stopPropagation();
    }

    return (
        //Hide Keyboard when click outside TextInput
        <DismissKeyboard>
            <View>
                {/* Modal to hide setting when clicking outside */}
                <Modal
                    animationType='fade'
                    transparent
                    visible={visible}
                    onRequestClose={() => setVisible(false)}
                >
                    <TouchableWithoutFeedback onPress={() => setVisible(false)}>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            {/* Sử dụng stopPropagation để ngăn sự kiện lan truyền */}
                            <TouchableWithoutFeedback onPress={stopPropagation}>
                                {/* setting */}
                                {visible &&
                                    <View style={styles.setting}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                setVisible(false)
                                            }}
                                        >
                                            <Text style={styles.settingText}>Chia sẻ</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => {
                                                props.navigation.navigate('Setting', { flag: flag, temperature: temperature })
                                                setVisible(false)
                                            }}
                                        >
                                            <Text style={styles.settingText}>Cài đặt</Text>
                                        </TouchableOpacity>
                                    </View>
                                }
                            </TouchableWithoutFeedback>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>


                <ImageBackground source={require('../../assets/img/background.jpg')} style={styles.backgroundImg} imageStyle={{ opacity: 0.8, backgroundColor: '#000' }} />
                <View style={styles.container}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => setVisible(true)}>
                            <IonIcon name="menu" style={styles.icon} />
                        </TouchableOpacity>
                        <Text style={styles.headerText}>Current Location</Text>
                        <TouchableOpacity onPress={() => { props.navigation.navigate('AddLocation') }}>
                            <AntDesign name="plus" size={20} style={styles.icon} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.containerMain}>
                        <Text style={styles.title}>Weather App</Text>
                        <Text style={styles.searchText}>Search city by the name</Text>

                        <View style={styles.searchContainer}>
                            <View style={styles.formSearch}>
                                <TextInput
                                    placeholder='Enter the city'
                                    placeholderTextColor={'#fff'}
                                    style={styles.searchInput}
                                    value={value}
                                    onChangeText={(val) => handleSearch(val)}
                                />
                                <TouchableOpacity onPress={() => searchPress()}>
                                    <IonIcon name="search" style={styles.icon} />
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
                                            <TouchableOpacity
                                                style={styles.suggestionItem}
                                                onPress={() => handlePress(item)}
                                            >
                                                <Text style={styles.suggestionText}>{item.city}</Text>
                                            </TouchableOpacity>
                                        )}
                                    />
                                </View>
                            }
                        </View>

                        <View style={styles.locationList}>
                            <Text style={styles.locationListText}>Some famous places</Text>
                            <FlatList
                                horizontal
                                data={cities}
                                renderItem={({ item }) => (
                                    <Card city={item.city} image={item.image} lat={item.lat} lon={item.lon} navigation={props.navigation} temperature={temperature} />
                                )}
                            />
                        </View>
                    </View>
                </View>
            </View>
        </DismissKeyboard >
    )
}

export default Home