import { View, Text, ImageBackground, TouchableOpacity, FlatList, TouchableWithoutFeedback, Keyboard, Modal, TextInput, ScrollView, PermissionsAndroid, Image, LogBox } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './styles'
import IonIcon from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Card from '../Card';
import cityList from '../../api/vn.json'
import Geolocation from '@react-native-community/geolocation';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { WEATHER_API_KEY, HERE_API, weather_baseURL, HERE_baseURL } from '../../api/Constants'
import { useWeather } from '../../hooks/useTemperature'

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
    const [currentPosition, setCurrentPosition] = useState({
        lat: '',
        lon: '',
    })
    const [currentCity, setCurrentCity] = useState('')
    const [currentWeatherData, setCurrentWeatherData] = useState(null)
    const [flag] = useState('Home')
    const { temperatureUnit } = useWeather()

    useEffect(() => {
        // Gọi API thời tiết ở đây
        Geolocation.getCurrentPosition(
            info => {
                setCurrentPosition({
                    lat: info.coords.latitude,
                    lon: info.coords.longitude
                });
                // console.log(info.coords.latitude + ' - ' + info.coords.longitude)
            },

            error => console.error("Error getting location: ", error),
            { enableHighAccuracy: true }  // Yêu cầu độ chính xác cao
        );

        if (currentPosition.lat && currentPosition.lon) {
            fetchData()
        }
    }, [currentPosition.lat]);

    const fetchData = async () => {
        try {
            const savedCurrentWeatherData = await AsyncStorage.getItem(`WEATHER_DATA_${currentPosition.lat}_${currentPosition.lon}`);
            const savedCurrentCityData = await AsyncStorage.getItem(`CURRENT_CITY_DATA_${currentPosition.lat}_${currentPosition.lon}`);

            // console.log(savedCurrentCityData)


            // console.log(savedCurrentWeatherData != null && savedCurrentCityData != null)

            if (savedCurrentWeatherData && savedCurrentCityData) {
                const now = new Date().getTime()
                const item = JSON.parse(savedCurrentWeatherData)
                const currentCity = JSON.parse(savedCurrentCityData)

                // console.log(now)
                // console.log(item.time)

                if (now - item.time < 1800 * 1000) {
                    // console.log(1111111111111)
                    setCurrentWeatherData(item.data);
                    setCurrentCity(currentCity)
                } else {
                    // console.log(22222222222222)
                    await AsyncStorage.removeItem(`WEATHER_DATA_${currentPosition.lat}_${currentPosition.lon}`);
                    await AsyncStorage.removeItem(`CURRENT_CITY_DATA_${currentPosition.lat}_${currentPosition.lon}`)
                    fetchData()
                }
            } else {
                const currentWeatherUrl = `${weather_baseURL}/current.json?key=${WEATHER_API_KEY}&q=${currentPosition.lat},${currentPosition.lon}&aqi=no`
                const currentCityUrl = `${HERE_baseURL}/revgeocode?at=${currentPosition.lat},${currentPosition.lon}&apiKey=${HERE_API}`

                // console.log(currentCityUrl)
                const [currentWeatherResponse, currentCityResponse] = await Promise.all(
                    [
                        fetch(currentWeatherUrl),
                        fetch(currentCityUrl)
                    ]
                )

                console.log(333)
                const currentWeatherData = await currentWeatherResponse.json();
                const currentCityData = await currentCityResponse.json()

                setCurrentWeatherData(currentWeatherData);
                setCurrentCity(currentCityData.items[0].address.city)

                // Lưu vào AsyncStorage
                await AsyncStorage.setItem(`WEATHER_DATA_${currentPosition.lat}_${currentPosition.lon}`, JSON.stringify({
                    time: new Date().getTime(),
                    data: currentWeatherData
                }));
                await AsyncStorage.setItem(`CURRENT_CITY_DATA_${currentPosition.lat}_${currentPosition.lon}`, JSON.stringify(currentCityData.items[0].address.city))
            }

        } catch (error) {
            console.error(error);
        }
    }

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
        props.navigation.navigate('Detail', { city: item.city, lat: item.lat, lon: item.lon })
        setValue()
        setCity([])
    }

    const searchPress = () => {
        props.navigation.navigate('Detail', { city: getLocation.city, lat: getLocation.lat, lon: getLocation.lon })
        setValue()
        setCity([])
    }


    // Hàm để ngăn không cho sự kiện onPress của cha lan truyền xuống con
    const stopPropagation = (event) => {
        event.stopPropagation();
    }

    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    console.error = (message) => {
        if (typeof message === 'string' && message.includes("VirtualizedLists should")) {
            return;
        }
    }

    return (
        //Hide Keyboard when click outside TextInput
        <DismissKeyboard>
            <View style={{ flex: 1 }}>
                <ImageBackground source={require('../../assets/img/background.png')} style={styles.backgroundImg} imageStyle={{ opacity: 0.8, backgroundColor: '#000' }} />
                <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={{ flex: 1 }}>
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
                                                        props.navigation.navigate('Setting', { flag: flag })
                                                        setVisible(false)
                                                    }}
                                                >
                                                    <Text style={styles.settingText}>Setting</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        setVisible(false)
                                                    }}
                                                >
                                                    <Text style={styles.settingText}>Share</Text>
                                                </TouchableOpacity>
                                            </View>
                                        }
                                    </TouchableWithoutFeedback>
                                </View>
                            </TouchableWithoutFeedback>
                        </Modal>


                        <View style={styles.container}>
                            <View style={styles.header}>
                                <TouchableOpacity onPress={() => setVisible(true)}>
                                    <IonIcon name="menu" style={styles.icon} />
                                </TouchableOpacity>
                                {
                                    currentCity ?
                                        <Text style={styles.headerText}>{currentCity}</Text>
                                        :
                                        <Text style={styles.headerText}>Current Location</Text>
                                }
                                <TouchableOpacity onPress={() => props.navigation.navigate('AddLocation', { flag: flag, city: currentCity, lat: currentPosition.lat, lon: currentPosition.lon })}>
                                    <AntDesign name="plus" size={20} style={styles.icon} />
                                </TouchableOpacity>
                            </View>

                            <View style={styles.containerMain}>
                                {
                                    currentCity ?
                                        <View style={{ alignItems: 'center' }}>
                                            {/* <Text style={styles.title}>{currentCity}</Text> */}
                                            {
                                                temperatureUnit === '°C' ?
                                                    <Text style={styles.tempNumber}>{currentWeatherData.current.temp_c}&deg;C</Text>
                                                    :
                                                    <Text style={styles.tempNumber}>{currentWeatherData.current.temp_f}&deg;F</Text>
                                            }
                                            <Text style={styles.tempState}>
                                                <Image
                                                    source={{ uri: `https:${currentWeatherData.current.condition.icon}` }}
                                                    style={{ width: 40, height: 40 }}
                                                />
                                                {currentWeatherData.current.condition.text}
                                            </Text>
                                            <TouchableOpacity style={styles.buttonDetail} onPress={() => props.navigation.navigate('Detail', { city: currentCity, lat: currentPosition.lat, lon: currentPosition.lon })}>
                                                <Text style={styles.detail}>Detail</Text>
                                            </TouchableOpacity>
                                        </View>
                                        :
                                        <Text style={styles.title}>Weather App</Text>
                                }

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
                                                initialNumToRender={5}
                                                maxToRenderPerBatch={5}
                                                nestedScrollEnabled={true}
                                                // contentContainerStyle={{ flexGrow: 1 }}
                                                pointerEvents="auto" // Cho phép sự kiện cuộn ở đây
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
                                            <Card city={item.city} image={item.image} lat={item.lat} lon={item.lon} navigation={props.navigation} />
                                        )}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </DismissKeyboard >
    )
}

export default Home