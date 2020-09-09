import React, { Component } from 'react';
import { View } from 'react-native';
import globalStyles from '../../styles/globalStyles'
import { fetchHomeBanner, fetchHomeTopArticles, fetchHomeArticles, fetchHomeArticlesMore } from '../../actions'
import { connect } from 'react-redux';
import Banner from '../../components/Banner';
import ArticleItem from '../../components/ArticleItem';
import CommonFlatList from '../../components/CommonFlatList';
import { getRealDP as dp } from '../../utils/screenUtil';
import HeaderBar from '../../components/HeaderBar';


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
            isRefreshing: false
        }
        this.renderListHeader = this.renderListHeader.bind(this)
        this.renderListItem = this.renderListItem.bind(this)
        this.refreshPage = this.refreshPage.bind(this)
        this.loadMoreArticles = this.loadMoreArticles.bind(this)
    }

    async componentDidMount() {
        await this.refreshPage()
    }

    renderListHeader() {
        const { homeBanner, navigation } = this.props

        return (
            <View>
                <Banner dataArr={homeBanner} navigation={navigation} />
                <View style={{height: dp(20)}} />
            </View>
        )
    }

    renderListItem({item, index}) {
        const { navigation } = this.props

        return (
            <ArticleItem navigation={navigation} item={item} />
        )
    }

    async refreshPage() {
        this.setState({
            isRefreshing: true
        })

        await Promise.all([this.props.reqHomeBanner(), this.props.reqTopArticles(), this.props.reqArticles()])
        
        this.setState({
            isRefreshing: false
        })
    }

    loadMoreArticles() {
        let { page } = this.props
        console.log('load more page: ', page)
        this.props.reqArticlesMore(page)
    }

    render() {
        const { navigation, topArticles, articles } = this.props
        let allArticles = topArticles.concat(articles)
        return (
            <View style={globalStyles.container}>
                
                <HeaderBar title='首页' navigation={navigation} isLogin={false} />

                <CommonFlatList 
                    data={allArticles} 
                    renderItem={this.renderListItem}
                    keyExtractor={(item, index) => item.id.toString()}
                    ListHeaderComponent={this.renderListHeader}
                    onEndReached={() => {this.loadMoreArticles()}}
                    refreshing={this.state.isRefreshing}
                    onRefresh={this.refreshPage} />
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