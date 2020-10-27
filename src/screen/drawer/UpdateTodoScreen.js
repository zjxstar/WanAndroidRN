import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableWithoutFeedback,TextInput } from 'react-native';
import globalStyles from '../../styles/globalStyles'
import HeaderBar from '../../components/HeaderBar';
import Color from '../../styles/color'
import { getRealDP as dp } from '../../utils/screenUtil';
import { Button } from 'react-native-elements';
import { BottomSheet, Divider } from 'react-native-elements';
import { DatePicker } from "react-native-common-date-picker";
import {getToday} from '../../utils/commonUtil'
import { updateTodo} from '../../api';

/**
 * 添加TODO
 */

let title = ''
let content = ''

class UpdateTodoScreen extends PureComponent {

    constructor(props) {
        super(props)

        this.reqUpdateTodo = this.reqUpdateTodo.bind(this)
    }

    state = {
        curTitle: '',
        curContent: '',
        levelVisible: false,
        curLevel: '一般',
        curLevelNum: 2,
        curType: '工作',
        curTypeNum: 1,
        typeVisible: false,
        datePickerVisible: false,
        date: getToday(),
        isLoading: false,
        item: {}
    }

    UNSAFE_componentWillMount() {
        let item = JSON.parse(this.props.route.params.item)
        this.setState({
            item: item,
            curTitle: item.title,
            curContent: item.content,
            curLevel: item.priority === 1 ? '重要' : '一般',
            curLevelNum: item.priority,
            curTypeNum: item.type,
            curType: item.type === 1 ? '工作' : (item.type === 2 ? '学习' : '生活'),
            date: item.dateStr
        })
    }

    onTitleInputChange(value) {
        title = value
        this.setState({
            curTitle: value,
        })
    }

    onContentInputChange(value) {
        content = value
        this.setState({
            curContent: value,
        })
    }

    reqUpdateTodo() {
        if (title === '' || content === '') {
            return
        }
        this.setState({
            isLoading: true,
        })
        const { item, curLevelNum, curTypeNum, date} = this.state
        updateTodo(item.id, title, content, date, curTypeNum, curLevelNum).then(res => {
            console.log('update todo succ: ', res.data)
            this.setState({
                isLoading: false,
            })
            const {route} = this.props
            route.params.callback(res.data)
            global.toast.show('修改成功')
            this.props.navigation.goBack()
        }).catch(err => {
            global.toast.show(err)
            this.setState({
                isLoading: false,
            })
        })
    }

    render() {
        const { navigation } = this.props
        const { curTitle, curContent, levelVisible, typeVisible, curLevel, curType, datePickerVisible, date, isLoading} = this.state
        return (
            <View style={globalStyles.container}>
                <HeaderBar title='修改TODO' navigation={navigation} type='back' />
                <ScrollView style={{ flex: 1 }}>
                    <View style={styles.body}>
                        <View style={styles.section}>
                            <Text style={styles.label}>标题：</Text>
                            <TextInput style={styles.titleInput} placeholder='请输入标题' multiline value={curTitle}
                                textAlignVertical='top' onChangeText={(value) => {this.onTitleInputChange(value)}} />
                        </View>
                        <View style={styles.contentInputSection}>
                            <Text style={styles.label}>详情：</Text>
                            <TextInput style={styles.contentInput} placeholder='请输入详情' multiline value={curContent}
                                textAlignVertical='top' onChangeText={(value) => {this.onContentInputChange(value)}}/>
                        </View>
                        <View style={styles.section}>
                            <Text style={styles.label}>等级：</Text>
                            <TouchableWithoutFeedback onPress={() => this.setState({ levelVisible: true})}>
                                <Text style={styles.content}>{curLevel}</Text>
                            </TouchableWithoutFeedback>
                        </View>
                        <View style={styles.section}>
                            <Text style={styles.label}>分类：</Text>
                            <TouchableWithoutFeedback onPress={() => this.setState({ typeVisible: true })}>
                                <Text style={styles.content}>{curType}</Text>
                            </TouchableWithoutFeedback>
                        </View>
                        <View style={styles.section}>
                            <Text style={styles.label}>待办时间：</Text>
                            <TouchableWithoutFeedback onPress={() => this.setState({ datePickerVisible: true })}>
                                <Text style={styles.content}>{date}</Text>
                            </TouchableWithoutFeedback>
                        </View>

                        <View style={styles.btnArea}>
                            <View style={styles.btn}>
                                <Button
                                    title="确认"
                                    loading={isLoading}
                                    onPress={() => { this.reqUpdateTodo()}}/>
                            </View>
                        </View>
                    </View>
                </ScrollView>

                <BottomSheet isVisible={levelVisible} transparent>
                    <TouchableWithoutFeedback onPress={() => {this.setState({levelVisible: false, curLevel: '一般', curLevelNum: 2})}}>
                        <Text style={styles.bottomSheetText}>一般</Text>
                    </TouchableWithoutFeedback>
                    <Divider style={{ backgroundColor: Color.SPLIT_LINE }} />

                    <TouchableWithoutFeedback onPress={() => { this.setState({ levelVisible: false, curLevel: '重要', curLevelNum: 1 }) }}>
                        <Text style={styles.bottomSheetText}>重要</Text>
                    </TouchableWithoutFeedback>
                    <Divider style={{ backgroundColor: Color.SPLIT_LINE }} />

                    <TouchableWithoutFeedback onPress={() => {this.setState({levelVisible: false})}}>
                        <Text style={styles.bottomSheetCancelText}>取消</Text>
                    </TouchableWithoutFeedback>
                    
                </BottomSheet>

                <BottomSheet isVisible={typeVisible} transparent>
                    <TouchableWithoutFeedback onPress={() => { this.setState({ typeVisible: false, curType: '工作', curTypeNum: 1 }) }}>
                        <Text style={styles.bottomSheetText}>工作</Text>
                    </TouchableWithoutFeedback>
                    <Divider style={{ backgroundColor: Color.SPLIT_LINE }} />

                    <TouchableWithoutFeedback onPress={() => { this.setState({ typeVisible: false, curType: '学习', curTypeNum: 2 }) }}>
                        <Text style={styles.bottomSheetText}>学习</Text>
                    </TouchableWithoutFeedback>
                    <Divider style={{ backgroundColor: Color.SPLIT_LINE }} />

                    <TouchableWithoutFeedback onPress={() => { this.setState({ typeVisible: false, curType: '生活', curTypeNum: 3 }) }}>
                        <Text style={styles.bottomSheetText}>生活</Text>
                    </TouchableWithoutFeedback>
                    <Divider style={{ backgroundColor: Color.SPLIT_LINE }} />

                    <TouchableWithoutFeedback onPress={() => { this.setState({ typeVisible: false }) }}>
                        <Text style={styles.bottomSheetCancelText}>取消</Text>
                    </TouchableWithoutFeedback>
                    
                </BottomSheet>
                {datePickerVisible && (
                    <DatePicker
                        minDate={date}
                        defaultDate={date}
                        maxDate='2030-12-31'
                        cancelText='取消'
                        confirmText='确认'
                        toolBarCancelStyle={{color: Color.WHITE}}
                        toolBarConfirmStyle={{color: Color.WHITE}}
                        toolBarStyle={{backgroundColor: Color.THEME}}
                        confirm={date => {
                            this.setState({
                                datePickerVisible: false,
                                date: date
                            })
                        }}
                        cancel={() => {
                            this.setState({
                                datePickerVisible: false
                            })
                        }}
                    />
                )}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    body: {
        marginTop: dp(20),
        paddingHorizontal: dp(16)
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: dp(10)
    },
    contentInputSection: {
        flexDirection: 'row',
        marginTop: dp(10),
    },
    label: {
        fontSize: dp(30),
        color: Color.TEXT_DARK,
    },
    content: {
        flex: 1,
        fontSize: dp(30),
        color: Color.TEXT_MAIN,
        marginLeft: dp(12),
    },
    titleInput: {
        height: dp(80),
        borderWidth: 1,
        borderColor: Color.THEME,
        flex: 1,
        fontSize: dp(30),
        borderRadius: dp(4),
        marginLeft: dp(12),
    },
    contentInput: {
        height: dp(200),
        borderWidth: 1,
        borderColor: Color.THEME,
        flex: 1,
        fontSize: dp(30),
        borderRadius: dp(4),
        marginLeft: dp(12),
    },
    btnArea: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: dp(40),
    },
    btn: {
        flex: 1,
    },
    btnText: {
        marginLeft: dp(8),
        fontSize: dp(30),
        color: Color.TEXT_MAIN,
    },
    bottomSheetText: {
        fontSize: dp(32),
        color: Color.TEXT_MAIN,
        backgroundColor: Color.WHITE,
        textAlign: 'center',
        paddingVertical: dp(24)
    },
    bottomSheetCancelText: {
        fontSize: dp(32),
        color: Color.THEME,
        backgroundColor: Color.WHITE,
        textAlign: 'center',
        paddingVertical: dp(24)
    }
})

export default UpdateTodoScreen