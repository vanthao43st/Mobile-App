import React, { createContext, useState, useContext } from 'react';

const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
    const [temperatureUnit, setTemperatureUnit] = useState('°C'); // Mặc định là 'C'
    const [windSpeedUnit, setWindSpeedUnit] = useState('Kilometers per hour (km/h)'); // Mặc định là km/h
    const [atmosphericPressureUnit, setAtmosphericPressureUnit] = useState('Standard atmosphere (atm)')

    return (
        <WeatherContext.Provider value={{ temperatureUnit, setTemperatureUnit, windSpeedUnit, setWindSpeedUnit, atmosphericPressureUnit, setAtmosphericPressureUnit }}>
            {children}
        </WeatherContext.Provider>
    );
};

export const useWeather = () => useContext(WeatherContext);