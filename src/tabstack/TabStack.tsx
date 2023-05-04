import * as React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { HomeScreen, ProfileScreen, LoggingScreen } from '../views'
import { NavigationContainer } from '@react-navigation/native';

const Tab = createBottomTabNavigator()

export default function TabStack() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
        <Tab.Screen name="Logging" component={LoggingScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}