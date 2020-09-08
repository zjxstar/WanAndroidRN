import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Color from '../styles/color';
import Tag from './Tag';

/**
 * 文章列表Item
 */
class ArticleItem extends PureComponent {

    render() {
        let { item, navigation } = this.props
        return (
            <TouchableWithoutFeedback style={styles.container} onPress={() => { console.log(item.link) }}>
                <View style={styles.itemWrapper} >
                    <View style={styles.lineOne}>
                        <View style={styles.lineContentLeft}>
                            {item.type === 1 && <Tag tagName='置顶' tagColor='red'/>}
                            {item.fresh && <Tag tagName='新' tagColor='red'/>}
                            {item.tags.map((tag) => (<Tag tagName={tag.name} tagColor='blue'/>))}
                            <Text style={{marginLeft: 2,}}>{item.author || item.shareUser}</Text>
                        </View>
                        <Text>{item.niceDate}</Text>
                    </View>
                    <View style={styles.lineTwo}>
                        <Text style={{fontSize: 20}} numberOfLines={1}>{item.title}</Text>
                    </View>
                    <View style={styles.lineThree}>
                        <Text>{item.superChapterName} / {item.chapterName}</Text>
                        <TouchableWithoutFeedback onPress={() => {console.log('collect: ', item.id)}}>
                            <Ionicons name='md-heart' size={24} color={item.collect ? Color.COLLECT : Color.ICON_GRAY} />
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
        paddingTop: 10,
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 10,
        borderRadius: 10,
        marginVertical: 4,
        marginHorizontal: 6,
    },
    lineOne: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
    },
    lineTwo: {
        marginRight: 24,
        marginVertical: 5
    },
    lineThree: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 5,
    },
    lineContentLeft: {
        flexDirection: 'row',
        alignItems: 'center'
    }
})

export default ArticleItem