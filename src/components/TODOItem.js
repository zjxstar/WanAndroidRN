import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Color from '../styles/color';
import { getRealDP as dp } from '../utils/screenUtil';
import Tag from '../components/Tag'

class TODOItem extends PureComponent {



    render() {
        let {item} = this.props

        return (
            <TouchableWithoutFeedback style={styles.container} onPress={() => console.log('todo detail')} onLongPress={() => console.log('delete todo')}>
                <View style={styles.itemWrapper}>
                    <View style={styles.lineOne}>
                        <View style={styles.lineContentLeft}>
                            <Tag tagName={item.priority === 1 ? '重要' : '一般'} tagColor={item.priority === 1 ? 'red' : 'green'}/>
                            <Tag tagName={item.status === 1 ? '已完成' : '未完成'} tagColor={item.status === 1 ? 'red' : 'green'}/>
                        </View>
                        <Text style={{ fontSize: dp(26), color: Color.TEXT_DARK }}>{item.dateStr}</Text>
                    </View>
                    <View style={styles.lineTwo}>
                        <Text style={{ fontSize: dp(32), color: Color.TEXT_MAIN }}>{item.title}</Text>
                    </View>
                    <View style={styles.lineThree}>
                        <Text style={{ fontSize: dp(20), color: Color.TEXT_LIGHT }}>{item.content}</Text>
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
        marginVertical: dp(6),
    },
    lineThree: {
        marginVertical: dp(6),
    },
    lineContentLeft: {
        flexDirection: 'row',
        alignItems: 'center'
    }
})

export default TODOItem