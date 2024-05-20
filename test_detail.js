import { View, Text, ImageBackground, TouchableOpacity, ScrollView, TouchableWithoutFeedback, TouchableOpacityComponent, ActivityIndicator, Modal, FlatList, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import WeatherIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import IonIcon from 'react-native-vector-icons/Ionicons'
import styles from './styles';
import { OPENWEATHER_API_KEY, WEATHER_API_KEY, openweather_baseURL, weather_baseURL } from '../../api/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { deviceHeight, deviceWidth } from '../../components/Dimension';
import { useWeather } from '../../hooks/useTemperature';

// const WEATHER_STORAGE_KEY = 'WEATHER_DATA';
// const AIR_QUALITY_STORAGE_KEY = 'AIR_QUALITY_DATA';
// const MULTIDAY_WEATHER_STORAGE_KEY = 'MULTIDAY_WEATHER_DATA'

const Detail = (props) => {
    const [weatherData, setWeatherData] = useState(null)
    const [airQualityData, setAirQualityData] = useState(null)
    const [multiDayWeatherData, setMultiDayWeatherData] = useState({
        yesterday_minc: '',
        yesterday_maxc: '',
        yesterday_minf: '',
        yesterday_maxf: '',
        today_minc: '',
        today_maxc: '',
        today_minf: '',
        today_maxf: '',
        tomorrow_minc: '',
        tomorrow_maxc: '',
        tomorrow_minf: '',
        tomorrow_maxf: '',
        yesterdayIcon: '',
        todayIcon: '',
        tomorrowIcon: '',
    });
    const [todayData, setTodayData] = useState(null)
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const { city, lat, lon } = props.route.params;
    const { temperatureUnit, windSpeedUnit, atmosphericPressureUnit } = useWeather()
    const [flag] = useState('Detail')
    const [visible, setVisible] = useState(false)
    const [weatherForcastData, setWeatherForcastData] = useState()
    const [addLocationVisible, setAddLocationVisible] = useState(false)
    const currentHour = new Date().getHours();

    useEffect(() => {
        let isMounted = true; // Thêm biến cờ để kiểm soát vòng đời component
        fetchData(isMounted);
        return () => {
            isMounted = false; // Cleanup
        };
    }, [lat]); // Dependency array rỗng để chạy một lần

    const fetchData = async (isMounted) => {
        if (!isMounted) return; // Kiểm tra biến cờ trước khi tiếp tục

        const today = new Date()
        const yesterday = new Date(today)
        const tomorrow = new Date(today)
        yesterday.setDate(yesterday.getDate() + -1)
        tomorrow.setDate(tomorrow.getDate() + 1)
        const formatDate = (date) => {
            const year = date.getFullYear();
            const month = (`0${date.getMonth() + 1}`).slice(-2); // Đảm bảo định dạng hai chữ số
            const day = (`0${date.getDate()}`).slice(-2); // Đảm bảo định dạng hai chữ số
            return `${year}-${month}-${day}`;
        };


        // setIsLoading(true);
        try {
            const savedWeatherData = await AsyncStorage.getItem(`WEATHER_DATA_${lat}_${lon}`);
            const savedAirQualityData = await AsyncStorage.getItem(`AIR_QUALITY_DATA_${lat}_${lon}`);
            const saveForecastData = await AsyncStorage.getItem(`FORECAST_DATA_${lat}_${lon}`)
            const savedMultiDayWeatherData = await AsyncStorage.getItem(`MULTIDAY_WEATHER_DATA_${lat}_${lon}`)
            const saveTodayData = await AsyncStorage.getItem(`TODAY_DATA_${lat}_${lon}`)

            console.log(1111)

            if (savedWeatherData && savedAirQualityData && saveForecastData && savedMultiDayWeatherData && saveTodayData) {
                const item = JSON.parse(savedWeatherData)
                const now = new Date().getTime()

                console.log(2222)

                // console.log('hellooooooooo')
                if (now - item.time < 1800 * 1000) {
                    console.log(3333)
                    setWeatherData(item.data);
                    setAirQualityData(JSON.parse(savedAirQualityData));
                    setWeatherForcastData(JSON.parse(saveForecastData))
                    setMultiDayWeatherData(JSON.parse(savedMultiDayWeatherData))
                    setTodayData(JSON.parse(saveTodayData))
                } else {
                    console.log(4444)
                    await AsyncStorage.removeItem(`WEATHER_DATA_${lat}_${lon}`);
                    await AsyncStorage.removeItem(`AIR_QUALITY_DATA_${lat}_${lon}`);
                    await AsyncStorage.removeItem(`FORECAST_DATA_${lat}_${lon}`);
                    await AsyncStorage.removeItem(`MULTIDAY_WEATHER_DATA_${lat}_${lon}`);
                    await AsyncStorage.removeItem(`TODAY_DATA_${lat}_${lon}`)
                    if (isMounted) await fetchData(isMounted); // Gọi lại fetchData với biến cờ
                }
            } else {
                setIsLoading(true);
                const weatherUrl = `${weather_baseURL}/current.json?key=${WEATHER_API_KEY}&q=${lat},${lon}&aqi=yes`
                const airQualityUrl = `${openweather_baseURL}/air_pollution/forecast?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}`
                const historyUrl = `${weather_baseURL}/history.json?key=${WEATHER_API_KEY}&q=${lat},${lon}&dt=${formatDate(yesterday)}`;
                const forecastUrl = `${weather_baseURL}/forecast.json?key=${WEATHER_API_KEY}&q=${lat},${lon}&days=3&aqi=no&alerts=no`;

                const [weatherResponse, airQualityResponse, historyResponse, forecastResponse] = await Promise.all(
                    [
                        fetch(weatherUrl),
                        fetch(airQualityUrl),
                        fetch(historyUrl),
                        fetch(forecastUrl)
                    ]
                )

                const weatherData = await weatherResponse.json();
                const airQualityData = await airQualityResponse.json();
                const historyData = await historyResponse.json();
                const forecastData = await forecastResponse.json();

                console.log(5555555)
                setWeatherData(weatherData);
                setAirQualityData(airQualityData.list);
                setWeatherForcastData(forecastData.forecast.forecastday[0])
                setMultiDayWeatherData({
                    yesterday_minc: historyData.forecast.forecastday[0].day.mintemp_c,
                    yesterday_maxc: historyData.forecast.forecastday[0].day.maxtemp_c,
                    yesterday_minf: historyData.forecast.forecastday[0].day.mintemp_f,
                    yesterday_maxf: historyData.forecast.forecastday[0].day.maxtemp_f,
                    today_minc: forecastData.forecast.forecastday[0].day.mintemp_c,
                    today_maxc: forecastData.forecast.forecastday[0].day.maxtemp_c,
                    today_minf: forecastData.forecast.forecastday[0].day.mintemp_f,
                    today_maxf: forecastData.forecast.forecastday[0].day.maxtemp_f,
                    tomorrow_minc: forecastData.forecast.forecastday[1].day.mintemp_c,
                    tomorrow_maxc: forecastData.forecast.forecastday[1].day.maxtemp_c,
                    tomorrow_minf: forecastData.forecast.forecastday[1].day.mintemp_f,
                    tomorrow_maxf: forecastData.forecast.forecastday[1].day.maxtemp_f,

                    yesterdayIcon: historyData.forecast.forecastday[0].day.condition.icon,
                    todayIcon: forecastData.forecast.forecastday[0].day.condition.icon,
                    tomorrowIcon: forecastData.forecast.forecastday[1].day.condition.icon
                });

                // console.log(lat + ',' + lon)


                const nextFullHour = currentHour; // Tìm giờ tiếp theo mà không có phút hoặc giây
                const hoursToDisplay = 13; // Số lượng giờ để hiển thị từ giờ tiếp theo
                const filteredHours = forecastData?.forecast?.forecastday?.[0]?.hour?.filter(hour => {
                    const hourTime = new Date(hour.time).getHours();
                    return hourTime >= nextFullHour && hourTime < nextFullHour + hoursToDisplay;
                });

                let combinedHoursData = [...filteredHours];
                const remainTime = 24 - currentHour
                const timeNeedNextDay = hoursToDisplay - remainTime + 1

                if (timeNeedNextDay > 0) {
                    const tomorrow = new Date(today);
                    tomorrow.setDate(tomorrow.getDate() + 1);
                    const forecastUrlTomorrow = `${weather_baseURL}/forecast.json?key=${WEATHER_API_KEY}&q=${lat},${lon}&dt=${formatDate(tomorrow)}&days=1&aqi=no&alerts=no`;

                    const responseTomorrow = await fetch(forecastUrlTomorrow);
                    const dataTomorrow = await responseTomorrow.json();
                    const hoursDataTomorrow = dataTomorrow.forecast.forecastday[0].hour.slice(0, timeNeedNextDay);

                    combinedHoursData = combinedHoursData.concat(hoursDataTomorrow);
                }

                // console.log(filteredHours[0].time)
                setTodayData(combinedHoursData)

                // console.log(filteredHours)


                // Lưu vào AsyncStorage
                await AsyncStorage.setItem(`WEATHER_DATA_${lat}_${lon}`, JSON.stringify({
                    time: new Date().getTime(),
                    data: weatherData
                }));
                await AsyncStorage.setItem(`AIR_QUALITY_DATA_${lat}_${lon}`, JSON.stringify(airQualityData.list))
                await AsyncStorage.setItem(`FORECAST_DATA_${lat}_${lon}`, JSON.stringify(forecastData.forecast.forecastday[0]))
                await AsyncStorage.setItem(`MULTIDAY_WEATHER_DATA_${lat}_${lon}`, JSON.stringify({
                    yesterday_minc: historyData.forecast.forecastday[0].day.mintemp_c,
                    yesterday_maxc: historyData.forecast.forecastday[0].day.maxtemp_c,
                    yesterday_minf: historyData.forecast.forecastday[0].day.mintemp_f,
                    yesterday_maxf: historyData.forecast.forecastday[0].day.maxtemp_f,
                    today_minc: forecastData.forecast.forecastday[0].day.mintemp_c,
                    today_maxc: forecastData.forecast.forecastday[0].day.maxtemp_c,
                    today_minf: forecastData.forecast.forecastday[0].day.mintemp_f,
                    today_maxf: forecastData.forecast.forecastday[0].day.maxtemp_f,
                    tomorrow_minc: forecastData.forecast.forecastday[1].day.mintemp_c,
                    tomorrow_maxc: forecastData.forecast.forecastday[1].day.maxtemp_c,
                    tomorrow_minf: forecastData.forecast.forecastday[1].day.mintemp_f,
                    tomorrow_maxf: forecastData.forecast.forecastday[1].day.maxtemp_f,

                    yesterdayIcon: historyData.forecast.forecastday[0].day.condition.icon,
                    todayIcon: forecastData.forecast.forecastday[0].day.condition.icon,
                    tomorrowIcon: forecastData.forecast.forecastday[1].day.condition.icon
                }))
                await AsyncStorage.setItem(`TODAY_DATA_${lat}_${lon}`, JSON.stringify(combinedHoursData))
            }

        } catch (error) {
            setError('Có lỗi xảy ra khi gọi API thời tiết')
            console.error(error);
        } finally {
            // setIsLoading(false)
            if (isMounted) setIsLoading(false); // Kiểm tra biến cờ trước khi cập nhật state
        }
    }

    if (isLoading) {
        return <ActivityIndicator size="large" style={{ justifyContent: 'center', width: deviceWidth, height: deviceHeight }} />;
    }

    if (error) {
        return <Text style={styles.error}>{error}</Text>;
    }

    // Hàm để ngăn không cho sự kiện onPress của cha lan truyền xuống con
    const stopPropagation = (event) => {
        event.stopPropagation();
    }

    const WeatherIcon1 = ({ uri }) => {
        return (
            <View style={styles.container}>
                <Image
                    source={{ uri: `https:${uri}` }}
                    style={styles.icon}
                />
            </View>
        );
    };

    const renderItem = ({ item }) => {
        const time = new Date(item.time).getHours()
        let windSpeedDisplay

        if (windSpeedUnit === 'Kilometers per hour (km/h)') {
            windSpeedDisplay = (`${item.wind_kph.toFixed(1)} km/h`)
        } else if (windSpeedUnit === 'Meters per second (m/s)') {
            windSpeedDisplay = (`${(item.wind_kph / 3.6).toFixed(1)} m/s`)
        } else if (windSpeedUnit === 'Miles per hour (mph)') {
            windSpeedDisplay = (`${item.wind_mph.toFixed(1)} mph`)
        }

        return (
            <View style={styles.timeItem}>
                {
                    time === currentHour ?
                        <Text style={styles.textTimetem}>Now</Text>
                        :
                        <Text style={styles.textTimetem}>{time}:00</Text>
                }

                {
                    temperatureUnit === '°C' ?
                        <Text style={styles.textTempItem}>{item.temp_c}°C</Text>
                        :
                        <Text style={styles.textTempItem}>{item.temp_f}°F</Text>
                }

                <WeatherIcon1 uri={item.condition.icon} />

                <Text style={styles.windSpeed}>{windSpeedDisplay}</Text>
            </View>
        )
    };


    let pressureUnitDisplay
    console.log(66666)
    switch (atmosphericPressureUnit) {
        case 'Standard atmosphere (atm)':
            pressureUnitDisplay = (`${(weatherData.current.pressure_mb * 0.000967).toFixed(2)}atm`)
            break;
        case 'Inches of mercury (inHg)':
            pressureUnitDisplay = (`${weatherData.current.pressure_in.toFixed(2)}inHg`)
            break;
        case 'Millimeters of mercury (mmHg)':
            pressureUnitDisplay = (`${(weatherData.current.pressure_in * 25.4).toFixed(2)}mmHg`)
            break;
        case 'Millibar (mbar)':
            pressureUnitDisplay = (`${weatherData.current.pressure_mb.toFixed(2)}mbar`)
            break;
        default:
            pressureUnitDisplay = (`${(weatherData.current.pressure_mb * 0.000967).toFixed(2)}atm`)
            break;
    }

    let windSpeedDisplay
    switch (windSpeedUnit) {
        case 'Kilometers per hour (km/h)':
            windSpeedDisplay = (`${weatherData.current.wind_kph.toFixed(1)}km/h`)
            break;
        case 'Meters per second (m/s)':
            windSpeedDisplay = (`${(weatherData.current.wind_kph / 3.6).toFixed(1)}m/s`)
            break;
        case 'Miles per hour (mph)':
            windSpeedDisplay = (`${weatherData.current.wind_mph.toFixed(1)}mph`)
            break
        default:
            windSpeedDisplay = (`${weatherData.current.wind_kph.toFixed(1)}km/h`)
            break;
    }

    return (
        <View style={{ flex: 1, marginBottom: 20 }}>
            <ImageBackground source={require('../../assets/img/background.png')} style={styles.backgroundImg} />
            <ScrollView style={{ flex: 1 }}>

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
                                                props.navigation.navigate('Setting', { flag: flag, city: city, lat: lat, lon: lon })
                                                setVisible(false)
                                            }}
                                        >
                                            <Text style={styles.settingText}>Setting</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => {
                                                setAddLocationVisible(true)
                                                setVisible(false)
                                            }}
                                        >
                                            <Text style={styles.settingText}>Add location</Text>
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

                <Modal
                    animationType='fade'
                    transparent={true}
                    visible={addLocationVisible}
                    onRequestClose={() => setAddLocationVisible(false)}
                >
                    <TouchableOpacity
                        style={styles.modalOverlay}
                        activeOpacity={1}
                        onPressOut={() => setAddLocationVisible(false)}
                    >
                        <TouchableWithoutFeedback onPress={() => setVisible(false)}>
                            <View style={styles.addLocationContainer}>
                                <Text style={styles.addLocationQuestion}>Are you sure you want to add this location?</Text>
                                <TouchableWithoutFeedback onPress={stopPropagation}>
                                    <View style={styles.optional}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                props.navigation.navigate('AddLocation', { flag: flag, city: city, lat: lat, lon: lon })
                                                setAddLocationVisible(false)
                                            }}
                                        >
                                            <Text style={styles.addLocationText}>Yes</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => {
                                                setAddLocationVisible(false)
                                            }}
                                        >
                                            <Text style={styles.addLocationText}>No</Text>
                                        </TouchableOpacity>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                        </TouchableWithoutFeedback>
                    </TouchableOpacity>
                </Modal>


                <View style={styles.viewContainer}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => { props.navigation.navigate('Home') }}>
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
                                temperatureUnit === '°C' ?
                                    (

                                        <View style={styles.tempText}>
                                            <Text style={styles.tempTextNumber}>
                                                {weatherData.current.temp_c}&deg;C
                                            </Text>
                                        </View>
                                    )
                                    :
                                    (
                                        <View style={styles.tempText}>
                                            <Text style={styles.tempTextNumber}>
                                                {weatherData.current.temp_f}&deg;F
                                            </Text>
                                        </View>
                                    )
                            }
                            <Text style={styles.tempState}>
                                <Image
                                    source={{ uri: `https:${weatherData.current.condition.icon}` }}
                                    style={{ width: 40, height: 40 }}
                                />
                                {' '}
                                {weatherData.current.condition.text}
                            </Text>
                            <TouchableOpacity style={styles.airQuality} onPress={() => { props.navigation.navigate('AirQualityDetail', { airQualityData, city, lat, lon }) }}>
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
                        {
                            temperatureUnit === '°C' ?
                                <View>
                                    <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                            <WeatherIcon1 uri={multiDayWeatherData.yesterdayIcon} />
                                            <Text style={{ color: '#fff', fontSize: 16 }}>Yesterday</Text>
                                        </View>
                                        <Text style={{ color: '#fff', fontSize: 16 }}>{multiDayWeatherData.yesterday_maxc}&deg; / {multiDayWeatherData.yesterday_minc}&deg;</Text>
                                    </View>
                                    <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                            <WeatherIcon1 uri={multiDayWeatherData.todayIcon} />
                                            <Text style={{ color: '#fff', fontSize: 16 }}>Today</Text>
                                        </View>
                                        <Text style={{ color: '#fff', fontSize: 16 }}>{multiDayWeatherData.today_maxc}&deg; / {multiDayWeatherData.today_minc}&deg;</Text>
                                    </View>
                                    <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                            <WeatherIcon1 uri={multiDayWeatherData.todayIcon} />
                                            <Text style={{ color: '#fff', fontSize: 16 }}>Tomorrow</Text>
                                        </View>
                                        <Text style={{ color: '#fff', fontSize: 16 }}>{multiDayWeatherData.tomorrow_maxc}&deg; / {multiDayWeatherData.tomorrow_minc}&deg;</Text>
                                    </View>
                                </View>
                                :
                                <View>
                                    <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                            <WeatherIcon1 uri={multiDayWeatherData.yesterdayIcon} />
                                            <Text style={{ color: '#fff', fontSize: 16 }}>Hôm qua</Text>
                                        </View>
                                        <Text style={{ color: '#fff', fontSize: 16 }}>{multiDayWeatherData.yesterday_maxf}&deg; / {multiDayWeatherData.yesterday_minf}&deg;</Text>
                                    </View>
                                    <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                            <WeatherIcon1 uri={multiDayWeatherData.todayIcon} />
                                            <Text style={{ color: '#fff', fontSize: 16 }}>Hôm nay</Text>
                                        </View>
                                        <Text style={{ color: '#fff', fontSize: 16 }}>{multiDayWeatherData.today_maxf}&deg; / {multiDayWeatherData.today_minf}&deg;</Text>
                                    </View>
                                    <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                            <WeatherIcon1 uri={multiDayWeatherData.todayIcon} />
                                            <Text style={{ color: '#fff', fontSize: 16 }}>Ngày mai</Text>
                                        </View>
                                        <Text style={{ color: '#fff', fontSize: 16 }}>{multiDayWeatherData.tomorrow_maxf}&deg; / {multiDayWeatherData.tomorrow_minf}&deg;</Text>
                                    </View>
                                </View>
                        }
                        <View>
                            <FlatList
                                data={todayData}
                                renderItem={renderItem}
                                keyExtractor={item => item.time}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                            />
                        </View>

                        <View style={styles.containerDtail}>
                            <View style={styles.detailItemSun}>
                                <Text style={styles.detailItemText}>Sunrise {weatherForcastData.astro.sunrise}</Text>
                                <Text style={styles.detailItemText}>Sunset {weatherForcastData.astro.sunset}</Text>
                            </View>

                            <View style={styles.detailItem}>
                                <View>
                                    <View style={styles.detailItemSpace}>
                                        <Text style={styles.detailItemText}>Feel like</Text>
                                        {
                                            temperatureUnit === '°C' ?
                                                <Text style={styles.detailItemText}>{weatherData.current.feelslike_c}{temperatureUnit}</Text>
                                                :
                                                <Text style={styles.detailItemText}>{weatherData.current.feelslike_f}{temperatureUnit}</Text>
                                        }
                                    </View>
                                    <View style={styles.detailItemSpace}>
                                        <Text style={styles.detailItemText}>There may be rain</Text>
                                        <Text style={styles.detailItemText}>{weatherForcastData.day.daily_chance_of_rain}%</Text>
                                    </View>
                                    <View style={styles.detailItemSpace}>
                                        <Text style={styles.detailItemText}>Wind speed</Text>
                                        <Text style={styles.detailItemText}>{windSpeedDisplay}</Text>
                                    </View>
                                </View>

                                <View>
                                    <View style={styles.detailItemSpace}>
                                        <Text style={styles.detailItemText}>humidity</Text>
                                        <Text style={styles.detailItemText}>{weatherData.current.humidity}%</Text>
                                    </View>
                                    <View style={styles.detailItemSpace}>
                                        <Text style={styles.detailItemText}>Pressure</Text>
                                        <Text style={styles.detailItemText}>{pressureUnitDisplay}</Text>
                                    </View>
                                    <View style={styles.detailItemSpace}>
                                        <Text style={styles.detailItemText}>UV index</Text>
                                        <Text style={styles.detailItemText}>{weatherData.current.uv}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                        <View style={styles.containerDtail}>

                        </View>
                    </View>


                </View>
            </ScrollView>

        </View>
    )
}

export default Detail