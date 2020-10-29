import React, { Component } from 'react';
import { View, StatusBar, Text, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import DrawerStack from './src';
import { Provider } from 'react-redux'
import store from './src/store';
import AuthUtil from './src/utils/authUtil';
import { initLoginUserInfoAction, getUserCoinAction } from './src/actions/actionCreator';
import { getMyCoin } from './src/api';
import Toast from './src/components/Toast'
import SplashScreen from 'react-native-splash-screen'

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

  constructor(props) {
    super(props)
    this.initInfo = this.initInfo.bind(this)
    this.toast = React.createRef()
  }

  async UNSAFE_componentWillMount() {
    await this.initInfo()
    const userInfo = await AuthUtil.getUserInfo()
    if (!!userInfo) {
      getMyCoin().then(res => {
        store.dispatch(getUserCoinAction(res.data))
      }).catch(err => {
        console.log('fetch my coin err: ', err)
      })
    }
  }

  componentDidMount() {
    SplashScreen.hide();
    global.toast = this.toast.current
  }

  async initInfo() {
    const userInfo = await AuthUtil.getUserInfo()
    const authInfo = {
      isLogin: !!userInfo,
      userInfo
    }
    store.dispatch(initLoginUserInfoAction(authInfo))
  }

  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <StatusBar barStyle='light-content' translucent={true} backgroundColor='transparent' />
          <NavigationContainer>
            <DrawerStack />
          </NavigationContainer>
          <Toast ref={this.toast} />
        </View>
      </Provider>
    )
  }
}
