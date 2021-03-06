import React, { Component } from 'react';
import { View } from 'react-native';
import globalStyles from '../../styles/globalStyles'
import { fetchHomeBanner, fetchHomeTopArticles, fetchHomeArticles, fetchHomeArticlesMore } from '../../actions'
import { updateHomeFavorArticleAction, updateHomeUnfavorArticleAction } from '../../actions/actionCreator';
import { connect } from 'react-redux';
import Banner from '../../components/Banner';
import ArticleItem from '../../components/ArticleItem';
import CommonFlatList from '../../components/CommonFlatList';
import { getRealDP as dp } from '../../utils/screenUtil';
import HeaderBar from '../../components/HeaderBar';
import { favorArticleInner, uncollectArticleInList} from '../../api';
import LoadingView from '../../components/LoadingView';

let lastIsLogin = false

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
            firstLoading: false
        }

        this.renderListHeader = this.renderListHeader.bind(this)
        this.renderListItem = this.renderListItem.bind(this)
        this.refreshPage = this.refreshPage.bind(this)
        this.loadMoreArticles = this.loadMoreArticles.bind(this)
        this.favorArticle = this.favorArticle.bind(this)
    }

    UNSAFE_componentWillMount() {
        lastIsLogin = this.props.isLogin
        let that = this
        this.props.navigation.addListener('focus', () => {
            const { isLogin } = that.props
            if (isLogin != lastIsLogin) {
                that.refreshPage()
                lastIsLogin = isLogin
            }
        })
    }

    async componentDidMount() {
        this.setState({
            firstLoading: true,
        })
        await this.refreshPage()
        this.setState({
            firstLoading: false,
        })
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
            <ArticleItem navigation={navigation} item={item} onFavorClick={() => this.favorArticle(item, index)}/>
        )
    }

    favorArticle(item, index) {
        const { topArticles} = this.props
        let isTop = item.type === 1
        let realIndex = isTop ? index : index - topArticles.length
        if (item.collect) {
            // 取消收藏
            uncollectArticleInList(item.id).then(res => {
                global.toast.show('已取消收藏')
                this.props.updateUnfavorArticle(isTop, realIndex)
            }).catch(err => {
                global.toast.show(err)
            })
        } else {
            // 收藏文章
            favorArticleInner(item.id).then(res => {
                global.toast.show('收藏成功')
                this.props.updateFavorArticle(isTop, realIndex)
            }).catch(err => {
                global.toast.show(err)
            })
        }
    }

    async refreshPage() {
        await Promise.all([this.props.reqHomeBanner(), this.props.reqTopArticles(), this.props.reqArticles()])
    }

    loadMoreArticles() {
        let { page, isFullData } = this.props
        if (isFullData) {
            return
        }
        this.props.reqArticlesMore(page)
    }

    render() {
        const { isFetching, navigation, topArticles, articles } = this.props
        const { firstLoading } = this.state
        let allArticles = topArticles
        allArticles = allArticles.concat(articles)
        return (
            <View style={globalStyles.container}>
                
                <HeaderBar title='首页' navigation={navigation} />

                {firstLoading && (
                    <LoadingView />
                )}
                {!firstLoading && (
                    <CommonFlatList
                        data={allArticles}
                        renderItem={this.renderListItem}
                        keyExtractor={(item, index) => item.id.toString()}
                        ListHeaderComponent={this.renderListHeader}
                        onEndReached={() => { this.loadMoreArticles() }}
                        refreshing={isFetching}
                        onRefresh={this.refreshPage} />
                )}
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        isFetching: state.home.isFetching,
        homeBanner: state.home.homeBanner,
        topArticles: state.home.topArticles,
        page: state.home.page,
        articlesObj: state.home.articlesObj,
        articles: state.home.articles,
        isFullData: state.home.isFullData,
        isLogin: state.user.isLogin,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        reqHomeBanner: () => dispatch(fetchHomeBanner()),
        reqTopArticles: () => dispatch(fetchHomeTopArticles()),
        reqArticles: () => dispatch(fetchHomeArticles()),
        reqArticlesMore: (page) => dispatch(fetchHomeArticlesMore(page)),
        updateFavorArticle: (isTop, index) => dispatch(updateHomeFavorArticleAction(isTop, index)), 
        updateUnfavorArticle: (isTop, index) => dispatch(updateHomeUnfavorArticleAction(isTop, index)), 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)