import { View, Text, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard, FlatList, ScrollView } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import IonIcon from 'react-native-vector-icons/Ionicons'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { WEATHER_API_KEY, weather_baseURL } from '../../api/Constants';
import { useWeather } from '../../hooks/useTemperature';
import { useFocusEffect } from '@react-navigation/native';
import styles from './styles';

const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
)

// Hàm lấy thông tin thời tiết từ API
const fetchWeatherData = async (lat, lon) => {
    const weatherUrl = `${weather_baseURL}/current.json?key=${WEATHER_API_KEY}&q=${lat},${lon}&aqi=yes`
    const weatherResponse = await fetch(weatherUrl);
    const data = await weatherResponse.json();
    return data;
};

// Hàm lưu danh sách thành phố và thông tin thời tiết vào AsyncStorage
const saveCitiesToStorage = async (cities) => {
    try {
        const jsonValue = JSON.stringify(cities);
        await AsyncStorage.setItem('@cities', jsonValue);
    } catch (e) {
        console.log(e)
    }
};

// Hàm lấy danh sách thành phố từ AsyncStorage
const getCitiesFromStorage = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('@cities');
        return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch (e) {
        console.log(e)
    }
};

const Location = (props) => {
    const { flag, city, lat, lon } = props.route.params;
    const [citySearch, setCitySearch] = useState('');
    const [cities, setCities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editMode, setEditMode] = useState(false);
    const [selectedCity, setSelectedCity] = useState(null);
    const [selectedCities, setSelectedCities] = useState([]);
    const { temperatureUnit, windSpeedUnit, atmosphericPressureUnit } = useWeather();

    useEffect(() => {
        getCitiesFromStorage().then(data => {
            const citiesWithId = data.map(city => ({ ...city, id: city.id || Date.now().toString() }));
            setCities(citiesWithId);
            setLoading(false);
        });
    }, []);

    useEffect(() => {
        if (flag === 'AddLocationSearch' && city && lat && lon) {
            handleAddCity(city, lat, lon);
        }
    }, [flag, city, lat, lon]);

    useFocusEffect(
        useCallback(() => {
            const intervalId = setInterval(async () => {
                const newCities = await Promise.all(cities.map(async city => {
                    const weatherData = await fetchWeatherData(city.lat, city.lon);
                    return { ...city, lat: city.lat, lon: city.lon, weather: weatherData };
                }));
                setCities(newCities);
                await saveCitiesToStorage(newCities);
            }, 30 * 60 * 1000); // 30 phút

            return () => clearInterval(intervalId);
        }, [cities])
    );

    const handleAddCity = async (cityName, lat, lon) => {
        const storedCities = await getCitiesFromStorage();
        const cityIndex = storedCities.findIndex(city => city.name === cityName);

        if (cityIndex === -1) {
            const weatherData = await fetchWeatherData(lat, lon);
            const newCity = { id: Date.now().toString(), name: cityName, lat: lat, lon: lon, weather: weatherData };
            const updatedCities = [...storedCities, newCity];
            setCities(updatedCities);
            await saveCitiesToStorage(updatedCities);
        } else {
            console.log(`Thành phố ${cityName} đã tồn tại trong danh sách.`);
        }
    };

    useEffect(() => {
        handleAddCity(city, lat, lon);
    }, []);

    const handleLongPress = (city) => {
        setSelectedCity(city.id);
        setEditMode(true);
        setSelectedCities([city.id]);
    };

    const handleTick = () => {
        setEditMode(false);
        setSelectedCity(null);
        setSelectedCities([]);
    };

    const handleSelectAll = () => {
        const allCityIds = cities.map(city => city.id);
        setSelectedCities(allCityIds);
    };

    const handleDelete = async () => {
        const updatedCities = cities.filter(city => !selectedCities.includes(city.id));
        setCities(updatedCities);
        await saveCitiesToStorage(updatedCities);
        setEditMode(false);
        setSelectedCity(null);
        setSelectedCities([]);
    };

    const handleSelectCity = (city) => {
        if (selectedCities.includes(city.id)) {
            setSelectedCities(selectedCities.filter(id => id !== city.id));
        } else {
            setSelectedCities([...selectedCities, city.id]);
        }
    };

    const renderCity = ({ item }) => {
        if (loading || !item.weather) {
            return <Text>Đang tải...</Text>;
        }

        let windSpeedDisplay
        switch (windSpeedUnit) {
            case 'Kilometers per hour (km/h)':
                windSpeedDisplay = (`${item.weather.current.wind_kph.toFixed(1)}km/h`)
                break;
            case 'Meters per second (m/s)':
                windSpeedDisplay = (`${(item.weather.current.wind_kph / 3.6).toFixed(1)}m/s`)
                break;
            case 'Miles per hour (mph)':
                windSpeedDisplay = (`${item.weather.current.wind_mph.toFixed(1)}mph`)
                break
            default:
                windSpeedDisplay = (`${item.weather.current.wind_kph.toFixed(1)}km/h`)
                break;
        }

        return (
            <TouchableOpacity
                onPress={() => editMode ? handleSelectCity(item) : props.navigation.navigate('Detail', { city: item.name, lat: item.lat, lon: item.lon })}
                onLongPress={() => handleLongPress(item)}
            >
                <View style={[styles.cityItem, selectedCities.includes(item.id) && styles.selectedCityItem]}>
                    <View style={styles.cityItemLeft}>
                        <Text style={styles.cityItemName}>{item.name}</Text>
                        <Text style={styles.cityItemAirquality}>
                            AQI {item.weather.current.air_quality.pm2_5}
                        </Text>
                        <Text style={styles.cityItemText}>Humidity: {item.weather.current.humidity}</Text>
                        <Text style={styles.cityItemText}>Wind Speed: {windSpeedDisplay}</Text>
                    </View>
                    <View style={styles.cityItemRight}>
                        {
                            temperatureUnit === '°C' ?
                                <Text style={styles.cityItemTemp}>{item.weather.current.temp_c}°C</Text>
                                :
                                <Text style={styles.cityItemTemp}>{item.weather.current.temp_f}°F</Text>
                        }
                        {selectedCities.includes(item.id) && <IonIcon name="checkmark-circle" size={24} color="#00f603" style={{ marginTop: 10 }} />}
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <DismissKeyboard>
            <ScrollView style={{ flex: 1 }}>
                <View style={styles.container}>
                    <View style={styles.headerContainer}>
                        {editMode ? (
                            <View style={styles.editModeButtons}>
                                <TouchableOpacity onPress={handleTick} style={styles.headerButtonTick}>
                                    <IonIcon name="close" size={40} color="green" />
                                </TouchableOpacity>
                                <View style={styles.headerSelectDelete}>
                                    <TouchableOpacity onPress={handleDelete} style={styles.headerButtonDelete}>
                                        <IonIcon name="trash" size={30} color="red" />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={handleSelectAll} style={styles.headerButtonSelect}>
                                        <IonIcon name="checkmark-done" size={40} color="blue" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ) : (
                            <TouchableOpacity onPress={() => {
                                // if (flag === 'Home')
                                //     props.navigation.navigate('Home')
                                // else if (flag === 'Detail')
                                //     props.navigation.navigate('Detail', { city, lat, lon })
                                props.navigation.goBack()
                            }} style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
                                <IonIcon name="arrow-back-sharp" style={styles.backIcon} />
                                <Text style={styles.backIcon}>Back</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                    <Text style={styles.title}>City Management</Text>
                    <TouchableOpacity onPress={() => props.navigation.navigate('AddLocationSearch')}>
                        <View style={styles.formInput}>
                            <IonIcon name='search' size={22} style={styles.searchIcon} />
                            <TextInput
                                value={citySearch}
                                placeholder='Type the city name'
                                onChangeText={(val) => setCitySearch(val)}
                                style={styles.textInput}
                                editable={false} // không cho phép chỉnh sửa
                                pointerEvents="none" // không cho phép tương tác
                            />
                        </View>
                    </TouchableOpacity>
                    <View>
                        <View>
                            <FlatList
                                data={cities}
                                renderItem={renderCity}
                                keyExtractor={item => item.id}
                                extraData={selectedCities}
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </DismissKeyboard>
    );
}

export default Location;
