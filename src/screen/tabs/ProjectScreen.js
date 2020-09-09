import React, { Component } from 'react';
import { View, Text } from 'react-native';
import globalStyles from '../../styles/globalStyles'

/**
 * 项目
 */
export default class ProjectScreen extends Component {
    render() {
        return (
            <View style={globalStyles.container}>
                <Text>这是项目</Text>
            </View>
        )
    }
}