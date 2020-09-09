import React, { Component } from 'react';
import { View, Text } from 'react-native';
import globalStyles from '../../styles/globalStyles'

/**
 * 关于
 */
export default class AboutScreen extends Component {
    render() {
        return (
            <View style={globalStyles.container}>
                <Text>这是关于</Text>
            </View>
        )
    }
}