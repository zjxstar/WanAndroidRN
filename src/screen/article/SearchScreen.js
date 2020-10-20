import React, { Component } from 'react';
import { View, Text } from 'react-native';
import globalStyles from '../../styles/globalStyles'
import HeaderBar from '../../components/HeaderBar';
import CommonFlatList from '../../components/CommonFlatList';
import { SearchBar } from 'react-native-elements';
import ArticleItem from '../../components/ArticleItem';
import Color from '../../styles/color';
import { connect } from 'react-redux';
import { fetchSearchArticles, fetchSearchArticlesMore } from '../../actions';
import { getRealDP as dp } from '../../utils/screenUtil'

/**
 * 搜索
 */
class SearchScreen extends Component {

    constructor(props) {
        super(props)

        this.renderListItem = this.renderListItem.bind(this)
        this.loadMoreArticles = this.loadMoreArticles.bind(this)
        this.renderFooter = this.renderFooter.bind(this)
    }

    state = {
        search: '',
    };

    updateSearch = (search) => {
        this.setState({ search });
        this.refreshPage(search)
    };

    renderListItem({ item, index }) {
        const { navigation } = this.props

        return (
            <ArticleItem navigation={navigation} item={item} />
        )
    }

    refreshPage(key) {
        this.props.reqArticles(key)
    }

    loadMoreArticles() {
        let { page, isFullData } = this.props
        if (isFullData) {
            return
        }
        this.props.reqArticlesMore(this.state.search, page)
    }

    renderFooter() {
        return (
            <View style={{ height: dp(14) }} />
        )
    }

    render() {
        const { navigation, articles, isFetching} = this.props
        const {search} = this.state
        return (
            <View style={globalStyles.container}>
                <HeaderBar title='搜索' navigation={navigation} type='back' />
                <SearchBar
                    placeholder="请输入关键词"
                    placeholderTextColor='#9CA2A9'
                    onChangeText={this.updateSearch}
                    value={search}
                    lightTheme
                    inputStyle={{color: '#111111'}}
                    containerStyle={{backgroundColor: Color.WHITE}}
                    inputContainerStyle={{ backgroundColor: '#F5F6F7'}}
                />
                <CommonFlatList
                    data={articles}
                    renderItem={this.renderListItem}
                    keyExtractor={(item, index) => item.id.toString()}
                    ListFooterComponent={this.renderFooter}
                    onEndReached={() => { this.loadMoreArticles() }}
                    refreshing={isFetching}
                    onRefresh={this.refreshPage} />
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        isFetching: state.search.isFetching,
        page: state.search.page,
        articlesObj: state.search.articlesObj,
        articles: state.search.articles,
        isFullData: state.search.isFullData,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        reqArticles: (key) => dispatch(fetchSearchArticles(key)),
        reqArticlesMore: (key, page) => dispatch(fetchSearchArticlesMore(key, page)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen)