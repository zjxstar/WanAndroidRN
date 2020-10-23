import React, { PureComponent } from 'react'
import { View, StyleSheet, Text } from 'react-native';
import globalStyles from '../styles/globalStyles'
import ArticleItem from '../components/ArticleItem';
import CommonFlatList from '../components/CommonFlatList';
import { getSystemTreeArticles, getWXArticles } from '../api';
import { getRealDP as dp } from '../utils/screenUtil';
import { favorArticleInner, uncollectArticleInList } from '../api';

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
        this.favorArticle = this.favorArticle.bind(this)
    }

    componentDidMount() {
        this.refreshList()
    }

    renderListItem({item, index}) {
        const { navigation } = this.props
        return (
            <ArticleItem navigation={navigation} item={item} onFavorClick={() => this.favorArticle(item, index)}/>
        )
    }


    favorArticle(item, index) {
        if (item.collect) {
            // 取消收藏
            uncollectArticleInList(item.id).then(res => {
                console.log('unfavor')
                let tempArticles = [...this.state.articles]
                tempArticles[index].collect = false
                console.log('temp: ', tempArticles)
                this.setState({
                    articles: tempArticles
                })
            }).catch(err => {
                console.log('uncollectArticleInList err: ', err)
            })
        } else {
            // 收藏文章
            favorArticleInner(item.id).then(res => {
                console.log('favor')
                let tempArticles = [...this.state.articles]
                tempArticles[index].collect = true
                this.setState({
                    articles: tempArticles
                })
            }).catch(err => {
                console.log('favor inner article err: ', err)
            })
        }
    }

    renderBlankDivider() {
        return (
            <View style={{ height: dp(14) }} />
        )
    }

    refreshList() {
        const { cid, isWX } = this.props
        let that = this
        console.log('fresh system tree a cid: ', cid)
        this.setState({
            isFetching: true
        })
        if (isWX) {
            getWXArticles(cid).then(
                res => {
                    let articlesObj = res.data
                    that.setState({
                        isFetching: false,
                        page: 2,
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
        } else {
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
        
    }

    loadMoreArticles() {
        const { cid, isWX } = this.props
        if (this.state.isFullData) {
            return
        }
        let that = this
        console.log('load more s t a page: ', this.state.page, ' cid: ', cid)
        if (isWX) {
            getWXArticles(cid, this.state.page).then(
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
        } else {
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