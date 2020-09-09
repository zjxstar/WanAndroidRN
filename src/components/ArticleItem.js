import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Color from '../styles/color';
import Tag from './Tag';
import { getRealDP as dp } from '../utils/screenUtil';

/**
 * 文章列表Item
 */
class ArticleItem extends PureComponent {

    constructor(props) {
        super(props)
        this.toWebView = this.toWebView.bind(this)
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

    render() {
        let { item } = this.props
        return (
            <TouchableWithoutFeedback style={styles.container} onPress={() => { this.toWebView(item) }}>
                <View style={styles.itemWrapper} >
                    <View style={styles.lineOne}>
                        <View style={styles.lineContentLeft}>
                            {item.type === 1 && <Tag tagName='置顶' tagColor='red'/>}
                            {item.fresh && <Tag tagName='新' tagColor='red'/>}
                            {item.tags.map((tag) => (<Tag key={tag.url} tagName={tag.name} tagColor='green'/>))}
                            <Text style={{ marginLeft: dp(2), fontSize: dp(26), color: Color.TEXT_DARK}}>{item.author || item.shareUser}</Text>
                        </View>
                        <Text style={{ fontSize: dp(26), color: Color.TEXT_DARK}}>{item.niceDate}</Text>
                    </View>
                    <View style={styles.lineTwo}>
                        <Text style={{fontSize: dp(32), color: Color.TEXT_MAIN}} numberOfLines={1}>{item.title}</Text>
                    </View>
                    <View style={styles.lineThree}>
                        <Text style={{fontSize: dp(20), color: Color.TEXT_LIGHT}}>{item.superChapterName} / {item.chapterName}</Text>
                        <TouchableWithoutFeedback onPress={() => {console.log('collect: ', item.id)}}>
                            <Ionicons name='md-heart' size={dp(40)} color={item.collect ? Color.COLLECT : Color.ICON_GRAY} />
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

export default ArticleItem