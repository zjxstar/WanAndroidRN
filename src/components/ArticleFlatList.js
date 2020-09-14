import React, { PureComponent } from 'react'
import { View, StyleSheet, Text } from 'react-native';
import globalStyles from '../styles/globalStyles'
import ArticleItem from '../components/ArticleItem';
import CommonFlatList from '../components/CommonFlatList';
import { getSystemTreeArticles } from '../api/index';
import { getRealDP as dp } from '../utils/screenUtil';

/**
 * 文章列表
 * 这里不使用Redux
 */
class ArticleFlatList extends PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            isFetching: false,
            page: 0,
            articlesObj: {},
            articles: [],
            isFullData: false,
        }
        this.renderListItem = this.renderListItem.bind(this)
        this.refreshList = this.refreshList.bind(this)
        this.loadMoreArticles = this.loadMoreArticles.bind(this)
        this.renderBlankDivider = this.renderBlankDivider.bind(this)
    }

    componentDidMount() {
        this.refreshList()
    }

    renderListItem({item, index}) {
        const { navigation } = this.props
        return (
            <ArticleItem navigation={navigation} item={item} />
        )
    }

    renderBlankDivider() {
        return (
            <View style={{ height: dp(14) }} />
        )
    }

    refreshList() {
        const { cid } = this.props
        let that = this
        console.log('fresh system tree a cid: ', cid)
        this.setState({
            isFetching: true
        })
        getSystemTreeArticles(cid).then(
            res => {
                let articlesObj = res.data
                that.setState({
                    isFetching: false,
                    page: 1,
                    articlesObj: articlesObj,
                    articles: articlesObj.datas,
                    isFullData: articlesObj.curPage === articlesObj.pageCount
                })
            }
        ).catch(
            err => {
                console.log('refresh articles err: ', err)
                that.setState({
                    isFetching: false,
                })
            }
        )
    }

    loadMoreArticles() {
        const { cid } = this.props
        if (this.state.isFullData) {
            return
        }
        let that = this
        console.log('load more s t a page: ', this.state.page, ' cid: ', cid)
        getSystemTreeArticles(cid, this.state.page).then(
            res => {
                let articlesObj = res.data
                that.setState({
                    isFetching: false,
                    page: ++that.state.page,
                    articles: that.state.articles.concat(articlesObj.datas),
                    isFullData: articlesObj.datas.length === 0
                })
            }
        ).catch(
            err => {
                console.log('load more articles err: ', err)
                that.setState({
                    isFetching: false,
                })
            }
        )
    }

    render() {
        return (
            <View style={globalStyles.container}>
                <CommonFlatList
                    data={this.state.articles}
                    renderItem={this.renderListItem}
                    ListHeaderComponent={this.renderBlankDivider}
                    ListFooterComponent={this.renderBlankDivider}
                    keyExtractor={(item, index) => item.id.toString()}
                    onEndReached={this.loadMoreArticles}
                    refreshing={this.state.isFetching}
                    onRefresh={this.refreshList} />
            </View>
        )
    }
}

export default ArticleFlatList