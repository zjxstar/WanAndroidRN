import React, { Component } from 'react';
import { View, Text } from 'react-native';
import globalStyles from '../../styles/globalStyles'

/**
 * 知识体系
 */
export default class HomeScreen extends Component {
    render() {
        return (
            <View style={globalStyles.container}>
                <Text>这是知识体系</Text>
            </View>
        )
    }
}