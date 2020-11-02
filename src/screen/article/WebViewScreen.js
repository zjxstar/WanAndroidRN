import React, { Component } from 'react';
import { View, Text } from 'react-native';
import globalStyles from '../../styles/globalStyles';
import { WebView } from 'react-native-webview';
import Color from '../../styles/color';
import { getRealDP as dp } from '../../utils/screenUtil';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ProgressBar } from 'react-native-paper';
import HeaderBar from '../../components/HeaderBar';
import { filterHtmlFromStr } from '../../utils/commonUtil';

/**
 * 展示文章内容
 */
export default class WebViewScreen extends Component {

    constructor(props) {
        super(props)
        this.renderBackBtn = this.renderBackBtn.bind(this)
    }

    state = {
        progress: 0,
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
        const { route, navigation } = this.props
        const { url, title } = route.params
        let filterTitle = filterHtmlFromStr(title)
        return (
            <View style={globalStyles.container}>
                <HeaderBar title={filterTitle} navigation={navigation} type='back' />
                <ProgressBar progress={this.state.progress} color={Color.THEME} />
                <WebView 
                    source={{uri: url}} 
                    onLoadProgress={({ nativeEvent }) => {
                        this.setState({ progress: nativeEvent.progress });
                    }}/>
            </View>
        )
    }
}