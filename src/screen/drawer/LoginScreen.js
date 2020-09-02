import React, { Component } from 'react';
import { View, Text } from 'react-native';
import globalStyles from '../../styles/globalStyles'

/**
 * 登录页面
 */
export default class LoginScreen extends Component {
    render() {
        return (
            <View style={globalStyles.container}>
                <Text>这是登录页面</Text>
            </View>
        )
    }
}