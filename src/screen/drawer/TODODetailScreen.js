import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableWithoutFeedback } from 'react-native';
import globalStyles from '../../styles/globalStyles'
import HeaderBar from '../../components/HeaderBar';
import Color from '../../styles/color'
import { getRealDP as dp } from '../../utils/screenUtil';
import Ionicons from 'react-native-vector-icons/Ionicons';

/**
 * todo详情页
 */
class TODODetailScreen extends PureComponent {

    state = {
        item: {}
    }

    UNSAFE_componentWillMount() {
        this.setState({
            item: JSON.parse(this.props.route.params.item)
        })
    }

    render() {
        const {navigation} = this.props
        const {item} = this.state
        let finished = item.status === 1
        let headerBarTitle = finished ? '已完成' : '待办'
        let type = item.type === 1 ? '工作' : (item.type === 2 ? '学习' : '生活')

        return (
            <View style={globalStyles.container}>
                <HeaderBar title={headerBarTitle} navigation={navigation} type='back' 
                    right={{ icon: 'edit', color: Color.WHITE, size: dp(40), onPress: () => console.log('edit todo') }}/>
                <ScrollView style={{flex: 1}}>
                    <View style={styles.body}>
                        <View style={styles.section}>
                            <Text style={styles.label}>标题：</Text>
                            <Text style={styles.content}>{item.title}</Text>
                        </View>
                        <View style={styles.section}>
                            <Text style={styles.label}>详情：</Text>
                            <Text style={styles.content}>{item.content}</Text>
                        </View>
                        <View style={styles.section}>
                            <Text style={styles.label}>等级：</Text>
                            <Text style={styles.content}>{item.priority === 1 ? '重要' : '一般'}</Text>
                        </View>
                        <View style={styles.section}>
                            <Text style={styles.label}>分类：</Text>
                            <Text style={styles.content}>{type}</Text>
                        </View>
                        {finished && (
                            <View style={styles.section}>
                                <Text style={styles.label}>完成时间：</Text>
                                <Text style={styles.content}>{item.completeDateStr}</Text>
                            </View>
                        )}
                        {!finished && (
                            <View style={styles.section}>
                                <Text style={styles.label}>待办时间：</Text>
                                <Text style={styles.content}>{item.dateStr}</Text>
                            </View>
                        )}

                        <View style={styles.btnArea}>
                            {!finished && (
                                <TouchableWithoutFeedback onPress={() => console.log('finish todo')}>
                                    <View style={styles.btn}>
                                        <Ionicons name='md-checkmark-circle' size={dp(44)} color={Color.THEME} />
                                        <Text style={styles.btnText}>完成</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            )}
                            <TouchableWithoutFeedback onPress={() => console.log('delete todo')}>
                                <View style={styles.btn}>
                                    <Ionicons name='md-close-circle' size={dp(44)} color={Color.THEME} />
                                    <Text style={styles.btnText}>删除</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                </ScrollView>

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
    label: {
        fontSize: dp(24),
        color: Color.TEXT_DARK,
    },
    content: {
        flex: 1,
        fontSize: dp(24),
        color: Color.TEXT_MAIN,
    },
    btnArea: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: dp(30),
    },
    btn: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    btnText: {
        marginLeft: dp(8),
        fontSize: dp(28),
        color: Color.TEXT_MAIN,
    }
})

export default TODODetailScreen