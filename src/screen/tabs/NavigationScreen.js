import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import globalStyles from '../../styles/globalStyles';
import HeaderBar from '../../components/HeaderBar';
import Color from '../../styles/color';
import { getRealDP as dp } from '../../utils/screenUtil';
import { getNavigationData } from '../../api';
import {
    Placeholder,
    PlaceholderMedia,
    PlaceholderLine,
    Fade
} from "rn-placeholder";
import { Image } from 'react-native-elements';
import LoadingView from '../../components/LoadingView';


/**
 * 导航
 */
export default class NavigationScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            selectedIndex: 0,
            navDatas: [],
            isFetching: false,
        }
        this.renderLeftListItem = this.renderLeftListItem.bind(this)
        this.reqNavData = this.reqNavData.bind(this)
        this.toWebView = this.toWebView.bind(this)
    }

    componentDidMount() {
        this.reqNavData()
    }

    renderLeftListItem({item, index}) {
        let selectedIndex = this.state.selectedIndex
        const { isFetching } = this.state
        return (
            <TouchableOpacity style={styles.listItemWrapper} onPress={() => this.onLeftItemClick(index)}>
                <View style={selectedIndex === index ? styles.listItemChecked : styles.listItemUnChecked}>
                    <Text style={selectedIndex === index ? styles.leftTextChecked : styles.leftTextUnChecked}>{item.name}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    onLeftItemClick(index) {
        this.setState({
            selectedIndex: index
        })
    }

    reqNavData() {
        let that = this
        this.setState({
            isFetching: true
        })
        getNavigationData().then(
            res => {
                that.setState({
                    navDatas: res.data,
                    isFetching: false,
                })
            }
        ).catch(
            err => {
                that.setState({
                    isFetching: false,
                })
            }
        )
    }

    toWebView(item) {
        const { navigation } = this.props
        const title = item.title
        const url = item.link
        navigation.navigate("WebView", {
            title,
            url
        })
    }

    render() {
        const { navigation } = this.props
        let datas = this.state.navDatas
        let index = this.state.selectedIndex
        const {isFetching} = this.state
        return (
            <View style={globalStyles.container}>
                <HeaderBar title='导航' navigation={navigation} />
                {isFetching && (
                    <LoadingView />
                )}
                {!isFetching && (
                    <View style={styles.contentWrapper}>
                        <View style={styles.leftListContainer}>
                            <FlatList
                                data={datas}
                                renderItem={this.renderLeftListItem}
                                keyExtractor={item => item.cid.toString()} />
                        </View>
                        <View style={{ backgroundColor: Color.WHITE, width: dp(2) }}></View>
                        <View style={styles.rightDetailContainer}>
                            <View style={styles.detailWrapper}>
                                {datas.length > 0 && <Text style={styles.navigationName}>{datas[index].name}</Text>}
                                <ScrollView style={{ flex: 1, }}>
                                    <View style={styles.scrollWrapper}>
                                        {datas.length > 0 && datas[index].articles
                                            && datas[index].articles.length > 0
                                            && datas[index].articles.map((item) => {
                                                return (
                                                    <TouchableOpacity key={item.id.toString()} onPress={() => this.toWebView(item)}>
                                                        <View style={styles.tagWrapper}>
                                                            <Text style={{ color: Color.TEXT_DARK }}>{item.title}</Text>
                                                        </View>
                                                    </TouchableOpacity>
                                                )
                                            })}
                                    </View>
                                </ScrollView>
                            </View>

                        </View>
                    </View>
                )}
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    placeholder: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    contentWrapper: {
        flex: 1,
        flexDirection: 'row',
    },
    leftListContainer: {
        flex: 1,
        backgroundColor: Color.DEFAULT_BG,
    },
    rightDetailContainer: {
        flex: 2,
    },
    listItemWrapper: {
        flex: 1,
    },
    listItemChecked: {
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: Color.WHITE,
        paddingVertical: dp(20),
    },
    listItemUnChecked: {
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: Color.DEFAULT_BG,
        paddingVertical: dp(20),
    },
    leftTextChecked: {
        color: Color.THEME
    },
    leftTextUnChecked: {
        color: Color.TEXT_MAIN
    },
    detailWrapper: {
        flex: 1,
        alignItems: 'center',
        borderRadius: dp(20),
        marginHorizontal: dp(20),
        marginVertical: dp(20),
        backgroundColor: Color.WHITE
    },
    scrollWrapper: {
        flex: 1,
        marginHorizontal: dp(10),
        marginVertical: dp(10),
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    tagWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: dp(18),
        paddingVertical: dp(8),
        margin: dp(10),
        borderWidth: dp(1),
        borderRadius: dp(30),
    },
    navigationName: {
        fontSize: dp(30),
        marginVertical: dp(20),
        fontWeight: 'bold'
    }
})