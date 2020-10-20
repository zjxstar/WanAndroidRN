import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native'
import globalStyles from '../../styles/globalStyles';
import HeaderBar from '../../components/HeaderBar';
import ArticleTabComponent from '../../components/ArticleTabComponent';
import { Header, Avatar, } from 'react-native-elements';
import Color from '../../styles/color';
import { getRealDP as dp } from '../../utils/screenUtil';

/**
 * 顶部Tab文章列表页面
 */
class ArticleTabScreen extends PureComponent {

    constructor(props) {
        super(props)
    }

    render() {
        const { navigation } = this.props
        const { classification } = this.props.route.params
        return (
            <View style={globalStyles.container}>
                <HeaderBar title={classification.name} navigation={navigation} type='back' />
                <ArticleTabComponent data={classification} />
            </View>
      )
    }
}

export default ArticleTabScreen