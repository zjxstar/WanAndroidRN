import React, { Component } from 'react';
import { View, Text } from 'react-native';
import globalStyles from '../../styles/globalStyles'

/**
 * 注册页面
 */
export default class HomeScreen extends Component {
    render() {
        return (
            <View style={globalStyles.container}>
                <Text>这是注册页面</Text>
            </View>
        )
    }
}