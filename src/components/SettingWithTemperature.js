import React from 'react';
import Setting from '../screens/Setting';
import { WeatherProvider } from '../hooks/useTemperature';

// Higher Order Component để wrap Setting Screen với TemperatureProvider
const SettingWithTemperature = () => (
    <WeatherProvider>
        <Setting />
    </WeatherProvider>
);

export default SettingWithTemperature;