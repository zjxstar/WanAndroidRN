import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import DrawerStack from './src';
import { initAxios } from './src/service/initAxios'
import { Provider } from 'react-redux'
import store from './src/store';

export default function App() {

  useEffect(() => {
    // 网络设置
    initAxios()
  })

  return (
    <Provider store={store}>
      <NavigationContainer>
        <DrawerStack />
      </NavigationContainer>
    </Provider>
  );
}
