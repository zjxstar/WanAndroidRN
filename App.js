import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import DrawerStack from './src';

export default function App() {
  return (
    <NavigationContainer>
      <DrawerStack />
    </NavigationContainer>
  );
}
