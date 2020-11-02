import React, { PureComponent } from 'react';
import { View } from 'react-native'
import globalStyles from '../../styles/globalStyles';
import HeaderBar from '../../components/HeaderBar';
import ArticleTabComponent from '../../components/ArticleTabComponent';

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