import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import DrawerStack from './src';
import { Provider } from 'react-redux'
import store from './src/store';

export default class App extends Component {

  componentDidMount() {
  }

  render() {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <DrawerStack />
        </NavigationContainer>
      </Provider>
    )
  }
}
