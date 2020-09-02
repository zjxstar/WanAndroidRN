import React, { Component } from 'react';
import { View, Text } from 'react-native';
import globalStyles from '../../styles/globalStyles'

/**
 * 展示文章内容
 */
export default class WebViewScreen extends Component {
    render() {
        return (
            <View style={globalStyles.container}>
                <Text>这是文章</Text>
            </View>
        )
    }
}