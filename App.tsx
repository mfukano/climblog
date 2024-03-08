import { AppRegistry } from 'react-native';
import * as React from 'react';

import * as SplashScreen from 'expo-splash-screen';

import useDatabase from './src/hooks/db/useDB';

import TabStack from './src/nav/TabStack';

export default function App() {
  SplashScreen.preventAutoHideAsync();

  const isDBLoadingComplete = useDatabase();

  if (isDBLoadingComplete) {
    SplashScreen.hideAsync();
    
    return (
      <TabStack />
    );
  } else {
    return null;
  }
}

AppRegistry.registerComponent('climblog', () => App)