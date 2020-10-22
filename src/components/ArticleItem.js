import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Color from '../styles/color';
import Tag from './Tag';
import { getRealDP as dp } from '../utils/screenUtil';
import { filterHtmlFromStr } from '../utils/commonUtil';
import { favorArticleInner, 
    uncollectArticleInList, 
    uncollectArticleInFavorPage} from '../api';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

/**
 * 文章列表Item
 */

const propTypes = {
    inCollectPage: PropTypes.bool,
}

const defaultProps = {
    inCollectPage: false,
}

class ArticleItem extends PureComponent {

    constructor(props) {
        super(props)
        this.toWebView = this.toWebView.bind(this)
        this.favorArticle = this.favorArticle.bind(this)

        this.state = {
            realCollect: props.item.collect || props.inCollectPage
        }
    }

    toWebView(item) {
        const { navigation } = this.props
        const { title, link } = item
        let url = link
        navigation.navigate('WebView', {
            title,
            url
        })
    }

    favorArticle(item) {
        let that = this
        let { isLogin, navigation } = this.props
        if (!isLogin) {
            // 未登录
            navigation.navigate('Login')
            return
        }
        if (this.state.realCollect) {
            // 取消收藏
            if (this.props.inCollectPage) {
                // 在我的收藏页面取消
                uncollectArticleInFavorPage(item.id, item.originId).then(res => {
                    console.log('uncollectArticleInFavorPage su: ', res.data)
                    that.setState({
                        realCollect: false,
                    })
                }).catch(err => {
                    console.log('uncollectArticleInFavorPage err: ', err)
                })
            } else {
                // 在列表页取消
                uncollectArticleInList(item.id).then(res => {
                    console.log('uncollectArticleInList su: ', res.data)
                    that.setState({
                        realCollect: false,
                    })
                }).catch(err => {
                    console.log('uncollectArticleInList err: ', err)
                })
            }
        } else {
            favorArticleInner(item.id).then(res => {
                console.log('favor inner article suc: ', res.data)
                that.setState({
                    realCollect: true,
                })
            }).catch(err => {
                console.log('favor inner article err: ', err)
            })
        }
    }

    render() {
        let { item, inCollectPage, isLogin } = this.props
        console.log('item collect: ', item.collect)
        return (
            <TouchableWithoutFeedback style={styles.container} onPress={() => { this.toWebView(item) }}>
                <View style={styles.itemWrapper} >
                    <View style={styles.lineOne}>
                        <View style={styles.lineContentLeft}>
                            {item.type === 1 && <Tag tagName='置顶' tagColor='red' />}
                            {item.fresh && <Tag tagName='新' tagColor='red' />}
                            {item.tags && item.tags.map((tag) => (<Tag key={tag.url} tagName={tag.name} tagColor='green' />))}
                            <Text style={{ marginLeft: dp(2), fontSize: dp(26), color: Color.TEXT_DARK }}>{item.author || item.shareUser || item.chapterName}</Text>
                        </View>
                        <Text style={{ fontSize: dp(26), color: Color.TEXT_DARK }}>{item.niceDate}</Text>
                    </View>
                    <View style={styles.lineTwo}>
                        <Text style={{ fontSize: dp(32), color: Color.TEXT_MAIN }} numberOfLines={1}>{filterHtmlFromStr(item.title)}</Text>
                    </View>
                    <View style={styles.lineThree}>
                        {inCollectPage &&
                            <Text style={{ fontSize: dp(20), color: Color.TEXT_LIGHT }}>{item.chapterName}</Text>
                        }
                        {!inCollectPage &&
                            <Text style={{ fontSize: dp(20), color: Color.TEXT_LIGHT }}>{item.superChapterName} / {item.chapterName}</Text>
                        }
                        <TouchableWithoutFeedback onPress={() => { this.favorArticle(item) }}>
                            <Ionicons name='md-heart' size={dp(40)} color={isLogin && (this.state.realCollect || item.collect) ? Color.COLLECT : Color.ICON_GRAY} />
                        </TouchableWithoutFeedback>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    itemWrapper: {
        backgroundColor: Color.WHITE,
        paddingTop: dp(14),
        paddingLeft: dp(20),
        paddingRight: dp(20),
        paddingBottom: dp(14),
        borderRadius: dp(14),
        marginVertical: dp(4),
        marginHorizontal: dp(10),
    },
    lineOne: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: dp(6),
    },
    lineTwo: {
        marginRight: dp(24),
        marginVertical: dp(6),
    },
    lineThree: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: dp(6),
    },
    lineContentLeft: {
        flexDirection: 'row',
        alignItems: 'center'
    }
})

ArticleItem.propTypes = propTypes
ArticleItem.defaultProps = defaultProps

const mapStateToProps = state => {
    return {
        isLogin: state.user.isLogin,
    }
}

export default connect(mapStateToProps)(ArticleItem)