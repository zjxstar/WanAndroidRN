import React, { Component } from 'react';
import { View, Text } from 'react-native';
import globalStyles from '../../styles/globalStyles'

/**
 * 搜索
 */
export default class SearchScreen extends Component {
    render() {
        return (
            <View style={globalStyles.container}>
                <Text>这是搜索</Text>
            </View>
        )
    }
}