import React, { Component } from 'react';
import { View, Text } from 'react-native';
import globalStyles from '../../styles/globalStyles';
import { WebView } from 'react-native-webview';
import { Header, } from 'react-native-elements';
import Color from '../../styles/color';
import { getRealDP as dp } from '../../utils/screenUtil';
import Ionicons from 'react-native-vector-icons/Ionicons';

/**
 * 展示文章内容
 */
export default class WebViewScreen extends Component {

    constructor(props) {
        super(props)
        this.renderBackBtn = this.renderBackBtn.bind(this)
    }

    renderBackBtn() {
        const { navigation } = this.props
        return (
            <Ionicons 
                name="md-chevron-back" 
                color={Color.WHITE} 
                size={dp(40)} 
                onPress={() => navigation.goBack()} />
        )
    }

    render() {
        const { route } = this.props
        const { url } = route.params
        const { title } = route.params
        return (
            <View style={globalStyles.container}>
                <Header
                    backgroundColor={Color.THEME}
                    leftComponent={this.renderBackBtn}
                    centerComponent={{text: title, style: { color: Color.WHITE, fontSize: dp(30)}}} />
                <WebView 
                    source={{uri: url}} />
            </View>
        )
    }
}