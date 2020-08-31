import React, { Component } from 'react';
import { View, Text } from 'react-native';
import globalStyles from '../../styles/globalStyles'

/**
 * 导航
 */
export default class HomeScreen extends Component {
    render() {
        return (
            <View style={globalStyles.container}>
                <Text>这是导航</Text>
            </View>
        )
    }
}