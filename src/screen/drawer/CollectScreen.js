import React, { Component } from 'react';
import { View } from 'react-native';
import globalStyles from '../../styles/globalStyles'
import HeaderBar from '../../components/HeaderBar';
import CommonFlatList from '../../components/CommonFlatList';
import ArticleItem from '../../components/ArticleItem';
import { connect } from 'react-redux';
import { fetchCollectArticles, fetchCollectArticlesMore } from '../../actions';
import { getRealDP as dp } from '../../utils/screenUtil'
import { uncollectArticleInFavorPage} from '../../api';

/**
 * 我的收藏
 */
class CollectScreen extends Component {

    constructor(props) {
        super(props)

        this.renderListItem = this.renderListItem.bind(this)
        this.loadMoreArticles = this.loadMoreArticles.bind(this)
        this.renderFooter = this.renderFooter.bind(this)
        this.refreshPage = this.refreshPage.bind(this)
        this.unfavorArticle = this.unfavorArticle.bind(this)
    }

    UNSAFE_componentWillMount() {
        this.refreshPage()
    }

    renderListItem({ item, index }) {
        const { navigation } = this.props
        item.collect = true
        return (
            <ArticleItem navigation={navigation} item={item} inCollectPage 
                onFavorClick={() => this.unfavorArticle(item)} />
        )
    }

    unfavorArticle(item) {
        uncollectArticleInFavorPage(item.id, item.originId).then(res => {
            this.refreshPage()
        }).catch(err => {
            console.log('uncollectArticleInFavorPage err: ', err)
        })
        
    }

    refreshPage() {
        this.props.reqArticles()
    }

    loadMoreArticles() {
        let { page, isFullData } = this.props
        if (isFullData) {
            return
        }
        this.props.reqArticlesMore(page)
    }

    renderFooter() {
        return (
            <View style={{ height: dp(14) }} />
        )
    }

    render() {
        const { navigation, articles, isFetching} = this.props

        return (
            <View style={globalStyles.container}>
                <HeaderBar title='我的收藏' navigation={navigation} type='back' />
                {articles.length > 0 && (
                    <CommonFlatList
                        data={articles}
                        renderItem={this.renderListItem}
                        keyExtractor={(item, index) => item.id.toString()}
                        ListFooterComponent={this.renderFooter}
                        onEndReached={() => { this.loadMoreArticles() }}
                        refreshing={isFetching} />
                )}
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        isFetching: state.collect.isFetching,
        page: state.collect.page,
        articlesObj: state.collect.articlesObj,
        articles: state.collect.articles,
        isFullData: state.collect.isFullData,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        reqArticles: () => dispatch(fetchCollectArticles()),
        reqArticlesMore: (page) => dispatch(fetchCollectArticlesMore(page)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CollectScreen)