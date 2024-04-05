import { View, Text, ImageBackground, TouchableOpacity, ScrollView, TouchableWithoutFeedback, TouchableOpacityComponent } from 'react-native'
import React, { useEffect, useState } from 'react'
import WeatherIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import IonIcon from 'react-native-vector-icons/Ionicons'
import styles from './styles';
import { API_KEY, baseURL } from '../../api/Constants';

const Detail = (props) => {
    const [hide, setHide] = useState(false)
    const [weatherData, setWeatherData] = useState()
    const [airQualityData, setAirQualityData] = useState()
    // const [lat, setLat] = useState()
    // const [lng, setLng] = useState()
    const { city } = props.route.params;
    const [time] = useState(new Date((weatherData?.sys?.sunrise + weatherData?.timezone) * 1000).toLocaleTimeString('en-GB'))

    // useEffect(() => {
    //     fetch(`${baseURL}/weather?q=${city}&appid=${API_KEY}`)
    //         .then(res => res.json())
    //         .then(res => {
    //             setLat(res.coord.lat)
    //             setLng(res.coord.lon)
    //             setWeatherData(res)
    //         })
    //         .catch(err => console.log(err))
    // }, [city])

    // useEffect(() => {
    //     if (lat && lng) {
    //         fetch(`${baseURL}/air_pollution/forecast?lat=${lat}&lon=${lng}&appid=${API_KEY}`)
    //             .then(res => res.json())
    //             .then(res => setAirQuality(res.list))
    //             .catch(err => console.log(err))
    //     }
    // }, [lat, lng])

    // useEffect(() => {
    //     async function fetchData() {
    //         try {
    //             const weatherResponse = await fetch(`${baseURL}/weather?q=${city}&appid=${API_KEY}`);
    //             const weatherData = await weatherResponse.json();
    //             setLat(weatherData.coord.lat);
    //             setLng(weatherData.coord.lon);
    //             setWeatherData(weatherData);

    //             if (lat && lng) {
    //                 const airQualityResponse = await fetch(`${baseURL}/air_pollution/forecast?lat=${lat}&lon=${lng}&appid=${API_KEY}`);
    //                 const airQualityData = await airQualityResponse.json();
    //                 setAirQuality(airQualityData.list);
    //             }
    //         } catch (err) {
    //             console.log(err);
    //         }
    //     }

    //     fetchData()
    // }, [city, lat, lng])

    useEffect(() => {
        // Gọi API thời tiết ở đây
        fetchWeatherData();
    }, []); // Dependency array rỗng để chạy một lần

    const fetchWeatherData = async () => {
        const weatherUrl = `${baseURL}/weather?q=${city}&appid=${API_KEY}`;

        try {
            const weatherResponse = await fetch(weatherUrl);
            const weatherData = await weatherResponse.json();
            setWeatherData(weatherData);
            // Gọi API chất lượng không khí với vĩ độ và kinh độ lấy được
            fetchAirQualityData(weatherData.coord.lat, weatherData.coord.lon);
        } catch (error) {
            console.error('Có lỗi xảy ra khi gọi API thời tiết:', error);
        }
    };

    const fetchAirQualityData = async (lat, lon) => {
        const airQualityUrl = `${baseURL}/air_pollution/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`;

        try {
            const airQualityResponse = await fetch(airQualityUrl);
            const airQualityData = await airQualityResponse.json();
            setAirQualityData(airQualityData.list);
        } catch (error) {
            console.error('Có lỗi xảy ra khi gọi API chất lượng không khí:', error);
        }
    };


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

    return (
        <TouchableWithoutFeedback onPress={() => setHide(false)}>
            <View style={styles.container}>
                {hide &&
                    <View style={styles.setting}>
                        <TouchableOpacity>
                            <Text style={styles.settingText}>Chia sẻ</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text style={styles.settingText}>Cài đặt</Text>
                        </TouchableOpacity>
                    </View>
                }

                <ImageBackground source={require('../../assets/img/background.jpg')} style={styles.backgroundImg} />
                <ScrollView style={styles.scrollView}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => { props.navigation.navigate('Home') }}>
                            <IonIcon name="arrow-back-sharp" style={styles.headerIcon} />
                        </TouchableOpacity>
                        <Text style={styles.headerText}>{city}</Text>
                        <TouchableOpacity onPress={() => setHide(true)}>
                            <IonIcon name="menu" style={styles.headerIcon} />
                        </TouchableOpacity>
                    </View>

                    {
                        weatherData &&
                        <View style={styles.tempContainer}>
                            <View style={styles.tempText}>
                                <Text style={styles.tempTextNumber}>
                                    {(weatherData?.main?.temp - 273).toFixed(2)}&deg;
                                </Text>
                                <Text style={{ fontSize: 50, fontWeight: 'bold', color: '#fff', lineHeight: 65, marginLeft: 5 }}>C</Text>
                            </View>
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
        </TouchableWithoutFeedback>
    )
}

export default Detail