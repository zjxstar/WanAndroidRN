import React, { Component } from 'react';
import { View, Text } from 'react-native';
import globalStyles from '../../styles/globalStyles'

/**
 * 我的收藏
 */
export default class HomeScreen extends Component {
    render() {
        return (
            <View style={globalStyles.container}>
                <Text>这是我的收藏</Text>
            </View>
        )
    }
}