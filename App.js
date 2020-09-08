import React, { Component } from 'react';
import { View, StatusBar, Text, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import DrawerStack from './src';
import { Provider } from 'react-redux'
import store from './src/store';

/** 解决Text在miui系统上出现截断问题 */
const defaultFontFamily = {
  ...Platform.select({
    android: { fontFamily: '' }
  })
};

const oldRender = Text.render;
Text.render = function (...args) {
  const origin = oldRender.call(this, ...args);
  return React.cloneElement(origin, {
    style: [defaultFontFamily, origin.props.style]
  });
};

export default class App extends Component {

  componentDidMount() {
  }

  render() {
    return (
      <Provider store={store}>
        <View style={{flex: 1}}>
          <StatusBar barStyle='light-content' translucent={true} backgroundColor = 'transparent'/>
          <NavigationContainer>
            <DrawerStack />
          </NavigationContainer>
        </View>
      </Provider>
    )
  }
}
