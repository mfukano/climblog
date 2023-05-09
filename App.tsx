import * as React from 'react'
import TabStack from './src/nav/TabStack';
import { AppRegistry } from 'react-native';

export default function App() {
  return (
      <TabStack />
  );
}

AppRegistry.registerComponent('climblog', () => App)