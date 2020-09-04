import React, { Component, PureComponent } from 'react';
import { View, Text, Button } from 'react-native';
import { Header, Avatar,  } from 'react-native-elements';
import globalStyles from '../../styles/globalStyles'
import DefaultAvatar from '../../images/icon-default-avatar.png';
import { fetchHomeBanner, fetchHomeTopArticles, fetchHomeArticles, fetchHomeArticlesMore } from '../../actions'
import { connect } from 'react-redux';

/**
 * 首页
 * Header：用户头像、Title、搜索入口
 * Banner轮播图
 * 文章列表
 */
class HomeScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            avatarUrl: DefaultAvatar
        }
        this.renderHeaderAvatar = this.renderHeaderAvatar.bind(this)
        this.renderBanner = this.renderBanner.bind(this)
        this.refreshPage = this.refreshPage.bind(this)
        this.loadMoreArticles = this.loadMoreArticles.bind(this)
    }

    componentDidMount() {
        // this.props.reqHomeBanner()
        // this.props.reqTopArticles()
        this.props.reqArticles()
    }

    renderHeaderAvatar() {
        const { navigation, isLogin } = this.props
        if (isLogin) {
            return (
                <Avatar
                    rounded 
                    source={ {
                        uri: 'https://wx.qlogo.cn/mmopen/vi_32/eudayfvoav2bibTSsiaxWyLW6gMqTF32RPT6hULQ9Z6wrtjU97SkVOLOdlYujdKDFic34wuib9dwIcBQbUkRtJI2MA/132'
                    }}
                    onPress={() => navigation.toggleDrawer()}
                    size={28}
                    activeOpacity={0.7} />
            )
        } else {
            return (
                <Avatar
                    rounded 
                    source={require('../../images/icon-default-avatar.png')}
                    onPress={() => navigation.toggleDrawer()}
                    size={28}
                    activeOpacity={0.7} />
            )
        }
    }

    renderBanner() {
        const { homeBanner, topArticles, page, articles } = this.props
        // console.log('homeBanner render: ', homeBanner)
        // console.log('top articles render: ', topArticles)
        console.log(`articles page: ${page} , length: ${articles.length}`)
    }

    refreshPage() {
        // TODO 刷新页面：Banner和第一页文章列表
        this.props.reqArticles()
    }

    loadMoreArticles() {
        let { page } = this.props
        console.log('load more page: ', page)
        this.props.reqArticlesMore(page)
    }

    render() {
        const { navigation } = this.props
        this.renderBanner()

        return (
            <View style={globalStyles.container}>
                <Header 
                    leftComponent={ this.renderHeaderAvatar() }
                    centerComponent={{ text: '首页', style: { color: '#fff', fontSize: 20 } }}
                    rightComponent={{ icon: 'search', color: '#fff', onPress: () => navigation.navigate('Search') }} />
                
            <Text>这是首页</Text>
            <Button title="load more" onPress={() => {this.loadMoreArticles()}} />
            <Button title="Refresh" onPress={() => {this.refreshPage()}} />
                
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        homeBanner: state.home.homeBanner,
        topArticles: state.home.topArticles,
        page: state.home.page,
        articlesObj: state.home.articlesObj,
        articles: state.home.articles,
        isFullData: state.home.isFullData
    }
}

const mapDispatchToProps = dispatch => {
    return {
        reqHomeBanner: () => dispatch(fetchHomeBanner()),
        reqTopArticles: () => dispatch(fetchHomeTopArticles()),
        reqArticles: () => dispatch(fetchHomeArticles()),
        reqArticlesMore: (page) => dispatch(fetchHomeArticlesMore(page)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)