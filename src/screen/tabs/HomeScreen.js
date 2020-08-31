import React, { Component } from 'react';
import { View, Text, StatusBar } from 'react-native';
import globalStyles from '../../styles/globalStyles'

/**
 * 首页
 */
export default class HomeScreen extends Component {
    render() {
        return (
            <View style={globalStyles.container}>
                <View style={{ height: 100, backgroundColor: '#00BFFF' }}>
                    <Text>这是Header</Text>
                </View>
                <Text>这是首页</Text>
            </View>
        )
    }
}