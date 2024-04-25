import { View, Text, ImageBackground, TouchableOpacity, ScrollView, TouchableWithoutFeedback, TouchableOpacityComponent, ActivityIndicator, Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
import WeatherIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import IonIcon from 'react-native-vector-icons/Ionicons'
import styles from './styles';
import { API_KEY, baseURL } from '../../api/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { deviceHeight, deviceWidth } from '../../components/Dimension';

const WEATHER_STORAGE_KEY = 'WEATHER_DATA';
const AIR_QUALITY_STORAGE_KEY = 'AIR_QUALITY_DATA';

const Detail = (props) => {
    const [weatherData, setWeatherData] = useState(null)
    const [airQualityData, setAirQualityData] = useState(null)
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const { city, lat, lon, temperature } = props.route.params;
    const temp = temperature ? temperature : 'C'
    const [time] = useState(new Date((weatherData?.sys?.sunrise + weatherData?.timezone) * 1000).toLocaleTimeString('en-GB'))
    const [flag] = useState('Detail')
    const [visible, setVisible] = useState(false)


    useEffect(() => {
        // Gọi API thời tiết ở đây
        fetchData()
    }, []); // Dependency array rỗng để chạy một lần

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const savedWeatherData = await AsyncStorage.getItem(WEATHER_STORAGE_KEY);
            const savedAirQualityData = await AsyncStorage.getItem(AIR_QUALITY_STORAGE_KEY);

            if (savedWeatherData && savedAirQualityData) {
                setWeatherData(JSON.parse(savedWeatherData));
                setAirQualityData(JSON.parse(savedAirQualityData));
            } else {
                const weatherUrl = `${baseURL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
                const airQualityUrl = `${baseURL}/air_pollution/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`

                const [weatherResponse, airQualityResponse] = await Promise.all(
                    [
                        fetch(weatherUrl),
                        fetch(airQualityUrl)
                    ]
                )

                const weatherData = await weatherResponse.json();
                const airQualityData = await airQualityResponse.json();

                setWeatherData(weatherData);
                setAirQualityData(airQualityData.list);
            }
        } catch (error) {
            setError('Có lỗi xảy ra khi gọi API thời tiết')
            console.error(error);
        } finally {
            setIsLoading(false)
        }
    }

    if (isLoading) {
        return <ActivityIndicator size="large" style={{ justifyContent: 'center', width: deviceWidth, height: deviceHeight }} />;
    }

    if (error) {
        return <Text style={styles.error}>{error}</Text>;
    }

    const StateIcon = ({ iconCode }) => {
        // Ánh xạ mã icon từ API với tên icon của thư viện bạn đang sử dụng
        const getIconName = (code) => {
            switch (code) {
                case '01d':
                    return 'sunny'; // Icon cho trời quang đãng vào ban ngày
                case '01n':
                    return 'moon'; // Icon cho trời quang đãng vào ban đêm
                case '02n':
                    return 'cloud'; // Icon cho mây ít vào ban ngày và ban đêm
                case '03n':
                    return 'cloud'; // mây rải rác ban đêm
                case '04d':
                    return 'cloudy';    // mây cụm ban ngày
                case '04n':
                    return 'cloudy-night'; // mây cụm ban đêm
                case '09d':
                    return 'rainy'; // mưa rào ban ngày
                case '09n':
                    return 'rainy'; // mưa rào ban đêm
                case '10d':
                    return 'rainy'; // mưa nhẹ ban ngày
                case '10n':
                    return 'rainy'; // mưa nhẹ ban đêm
                case '11d':
                    return 'thunderstorm'; // dông ban ngày
                case '11n':
                    return 'thunderstorm'; // dông ban đêm
                case '13d':
                    return 'snow'; // tuyết
                case '13n':
                    return 'snow'; // tuyết ban đêm
                default:
                    return 'cloud'; // Icon mặc định
            }
        };

        const iconName = getIconName(iconCode);

        return <IonIcon name={iconName} size={25} color="#fff" />;
    };

    // Hàm để ngăn không cho sự kiện onPress của cha lan truyền xuống con
    const stopPropagation = (event) => {
        event.stopPropagation();
    }

    return (
        <View style={styles.container}>
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
                                            props.navigation.navigate('Setting', { flag: flag, city: city, lat: lat, lon: lon, temperature: temp })
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

            <ImageBackground source={require('../../assets/img/background.jpg')} style={styles.backgroundImg} />
            <ScrollView style={styles.scrollView}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => { props.navigation.navigate('Home', { temperature: temp }) }}>
                        <IonIcon name="arrow-back-sharp" style={styles.headerIcon} />
                    </TouchableOpacity>
                    <Text style={styles.headerText}>{city}</Text>
                    <TouchableOpacity onPress={() => setVisible(true)}>
                        <IonIcon name="menu" style={styles.headerIcon} />
                    </TouchableOpacity>
                </View>

                {
                    weatherData &&
                    <View style={styles.tempContainer}>
                        {
                            temp === 'C' ?
                                (

                                    <View style={styles.tempText}>
                                        <Text style={styles.tempTextNumber}>
                                            {(weatherData?.main?.temp - 273).toFixed(2)}&deg;
                                        </Text>
                                        <Text style={{ fontSize: 50, fontWeight: 'bold', color: '#fff', lineHeight: 65, marginLeft: 5 }}>C</Text>
                                    </View>
                                )
                                :
                                (
                                    <View style={styles.tempText}>
                                        <Text style={styles.tempTextNumber}>
                                            {((weatherData?.main?.temp - 273) * 1.8 + 32).toFixed(2)}&deg;
                                        </Text>
                                        <Text style={{ fontSize: 50, fontWeight: 'bold', color: '#fff', lineHeight: 65, marginLeft: 5 }}>F</Text>
                                    </View>
                                )
                        }
                        <Text style={styles.tempState}>
                            {<StateIcon iconCode={weatherData?.weather?.[0]?.icon} />}
                            {' '}
                            {weatherData?.weather?.[0]?.main}
                        </Text>
                        <TouchableOpacity style={styles.airQuality} onPress={() => { props.navigation.navigate('AirQualityDetail', { airQualityData, city }) }}>
                            <Text style={styles.airQualityText}>
                                <WeatherIcon name="weather-cloudy" style={styles.airQualityIcon} />
                                <Text> AQI </Text>
                                <Text>{airQualityData?.[0].components.pm2_5.toFixed(0)}</Text>
                            </Text>
                        </TouchableOpacity>
                    </View>
                }

                <View style={styles.weatherDetail}>
                    <Text style={styles.weatherDetailText}>Weather Detail</Text>
                    <View>
                        <View>
                            <Text>Sunrise: { }</Text>
                        </View>
                    </View>
                </View>

            </ScrollView>
        </View>
    )
}

export default Detail