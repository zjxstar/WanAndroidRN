import React, { PureComponent } from 'react'
import { View, StyleSheet, Text } from 'react-native';
import globalStyles from '../styles/globalStyles'
import TodoItem from './TodoItem';
import CommonFlatList from './CommonFlatList';
import { getMyTodoList } from '../api';
import { getRealDP as dp } from '../utils/screenUtil';

/**
 * TODO列表
 * 这里不使用Redux
 */
class TodoFlatList extends PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            isFetching: false,
            page: 1,
            todoObj: {},
            todos: [],
            isFullData: false,
        }

        this.renderListItem = this.renderListItem.bind(this)
        this.refreshList = this.refreshList.bind(this)
        this.loadMoreTodos = this.loadMoreTodos.bind(this)
    }

    componentDidMount() {
        this.props.navigation.addListener('focus', () => {
            this.refreshList()
        })
    }

    renderListItem({item, index}) {
        const { navigation } = this.props
        return (
            <TodoItem navigation={navigation} item={item} />
        )
    }


    renderBlankDivider() {
        return (
            <View style={{ height: dp(14) }} />
        )
    }

    refreshList() {
        const { type } = this.props
        let that = this
        this.setState({
            isFetching: true
        })
        
        getMyTodoList(type).then(
            res => {
                let todoObj = res.data
                that.setState({
                    isFetching: false,
                    page: 2,
                    todoObj: todoObj,
                    todos: todoObj.datas,
                    isFullData: todoObj.curPage === todoObj.pageCount
                })
            }
        ).catch(
            err => {
                console.log('refresh todo err: ', err)
                that.setState({
                    isFetching: false,
                })
            }
        )
 
    }

    loadMoreTodos() {
        const { type } = this.props
        if (this.state.isFullData) {
            return
        }
        let that = this
        
        getMyTodoList(type, this.state.page).then(
            res => {
                let todoObj = res.data
                that.setState({
                    isFetching: false,
                    page: ++that.state.page,
                    todos: that.state.todos.concat(todoObj.datas),
                    isFullData: todoObj.datas.length === 0
                })
            }
        ).catch(
            err => {
                console.log('load more todo err: ', err)
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
                    data={this.state.todos}
                    renderItem={this.renderListItem}
                    ListHeaderComponent={this.renderBlankDivider}
                    ListFooterComponent={this.renderBlankDivider}
                    keyExtractor={(item, index) => item.id.toString()}
                    onEndReached={this.loadMoreProjects}
                    refreshing={this.state.isFetching}
                    onRefresh={this.refreshList} />
            </View>
        )
    }
}

export default TodoFlatList