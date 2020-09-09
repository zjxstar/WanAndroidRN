import React, { Component } from 'react';
import { View, Text } from 'react-native';
import globalStyles from '../../styles/globalStyles'

/**
 * 公众号
 */
export default class WeChatArticleScreen extends Component {
    render() {
        return (
            <View style={globalStyles.container}>
                <Text>这是公众号</Text>
            </View>
        )
    }
}