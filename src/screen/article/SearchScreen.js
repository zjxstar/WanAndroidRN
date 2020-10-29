import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import globalStyles from '../../styles/globalStyles'
import HeaderBar from '../../components/HeaderBar';
import CommonFlatList from '../../components/CommonFlatList';
import { SearchBar } from 'react-native-elements';
import ArticleItem from '../../components/ArticleItem';
import Color from '../../styles/color';
import { connect } from 'react-redux';
import { fetchSearchArticles, fetchSearchArticlesMore } from '../../actions';
import { clearSearchArticlesAction} from '../../actions/actionCreator'
import { getRealDP as dp } from '../../utils/screenUtil'
import {getHotKeys} from '../../api';

/**
 * 搜索
 */
class SearchScreen extends Component {

    constructor(props) {
        super(props)

        this.reqHotKeys = this.reqHotKeys.bind(this)
        this.renderListItem = this.renderListItem.bind(this)
        this.loadMoreArticles = this.loadMoreArticles.bind(this)
        this.renderFooter = this.renderFooter.bind(this)
        this.searchHotKey = this.searchHotKey.bind(this)
        this.refreshPage = this.refreshPage.bind(this)
    }

    state = {
        search: '',
        hotKeys: [],
    };

    UNSAFE_componentWillMount() {
        this.reqHotKeys()
    }

    reqHotKeys() {
        getHotKeys().then(res => {
            this.setState({
                hotKeys: res.data
            })
        }).catch(err => {
            console.log('search hot keys err: ', err)
        })
    }

    updateSearch = (search) => {
        this.setState({ search });
        if (search === '') {
            this.props.clearSearch()
        } else {
            this.refreshPage(search)
        }
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

    componentWillUnmount() {
        this.props.clearSearch()
    }

    renderFooter() {
        return (
            <View style={{ height: dp(14) }} />
        )
    }

    searchHotKey(hotKey) {
        this.setState({
            search: hotKey
        })
        this.refreshPage(hotKey)
    }

    render() {
        const { navigation, articles, isFetching} = this.props
        const {search, hotKeys} = this.state
        return (
            <View style={styles.container}>
                <HeaderBar title='搜索' navigation={navigation} type='back' />
                <SearchBar
                    placeholder="请输入关键词"
                    placeholderTextColor='#9CA2A9'
                    onChangeText={this.updateSearch}
                    value={search}
                    lightTheme
                    inputStyle={{color: '#111111', fontSize: dp(28)}}
                    containerStyle={{backgroundColor: Color.WHITE}}
                    inputContainerStyle={{ backgroundColor: '#F5F6F7', height: dp(68)}}
                />
                {articles.length === 0 && hotKeys.length > 0 && (
                    <View style={styles.keysContainer}>
                        <Text style={styles.hotTitle}>热门搜索</Text>
                        <View style={styles.keysWrapper}>
                            {hotKeys.map((item) => {
                                return (
                                    <TouchableOpacity key={item.id.toString()} onPress={() => this.searchHotKey(item.name)}>
                                        <View style={styles.key} >
                                            <Text style={{ color: Color.TEXT_DARK }}>{item.name}</Text>
                                        </View>
                                    </TouchableOpacity>
                                )
                            })}
                        </View>
                    </View>
                )}
                {articles.length > 0 && (
                    <CommonFlatList
                        data={articles}
                        renderItem={this.renderListItem}
                        keyExtractor={(item, index) => item.id.toString()}
                        ListHeaderComponent={this.renderFooter}
                        ListFooterComponent={this.renderFooter}
                        onEndReached={() => { this.loadMoreArticles() }}
                        refreshing={isFetching} />
                )}
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }, 
    keysContainer: {
        flex: 1,
        backgroundColor: Color.WHITE,
        paddingVertical: dp(20),
        paddingHorizontal: dp(20),
    },
    hotTitle: {
        color: Color.TEXT_MAIN,
        fontSize: dp(28),
    },
    keysWrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: dp(10),
    },
    key: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: dp(10),
        paddingVertical: dp(4),
        margin: dp(6),
        borderWidth: dp(1),
        borderRadius: dp(30),
    }
})

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
        clearSearch: () => dispatch(clearSearchArticlesAction())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen)