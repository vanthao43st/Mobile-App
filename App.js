import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import Home from './src/screens/Home';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Detail from './src/screens/Detail';
import AirQualityList from './src/screens/AirQualityList';
import AirQualityDetail from './src/screens/AirQualityDetail';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='Detail' component={Detail} />
        <Stack.Screen name='AirQualityDetail' component={AirQualityDetail} />
        <Stack.Screen name='AirQualityList' component={AirQualityList} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App