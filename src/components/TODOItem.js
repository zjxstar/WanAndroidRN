import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Alert } from 'react-native';
import Color from '../styles/color';
import { getRealDP as dp } from '../utils/screenUtil';
import Tag from './Tag'
import {deleteTodo} from '../api';

class TodoItem extends PureComponent {

    constructor(props) {
        super(props)

        this.toDetailPage = this.toDetailPage.bind(this)
        this.confirmDeleteTodo = this.confirmDeleteTodo.bind(this)
        this.reqDeleteTodo = this.reqDeleteTodo.bind(this)
    }

    state = {
        isLoading: false,
    }

    toDetailPage(item) {
        const {navigation} = this.props
        navigation.navigate('TODODetail', {
            item: JSON.stringify(item)
        })
    }

    confirmDeleteTodo(item) {
        Alert.alert(
            '提示',
            '确认要删除该TODO吗？',
            [
                {
                    text: '取消',
                    style: 'cancel'
                },
                {
                    text: '确定',
                    onPress: () => { this.reqDeleteTodo(item) },
                }
            ]
        )
    }

    reqDeleteTodo(item) {
        const { navigation } = this.props
        this.setState({
            isLoading: true,
        })
        deleteTodo(item.id).then(res => {
            this.setState({
                isLoading: false,
            })
            global.toast.show('该TODO已删除')
            navigation.goBack()
        }).catch(err => {
            global.toast.show(err)
            this.setState({
                isLoading: false,
            })
        })
    }

    render() {
        let {item} = this.props

        return (
            <TouchableWithoutFeedback style={styles.container} 
                onPress={() => this.toDetailPage(item)} 
                onLongPress={() => this.confirmDeleteTodo(item)}>
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
                        <Text style={{ fontSize: dp(24), color: Color.TEXT_LIGHT }}>{item.content}</Text>
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

export default TodoItem