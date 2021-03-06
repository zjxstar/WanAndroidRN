import React, { PureComponent } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, FlatList } from 'react-native';
import { DEVICE_HEIGHT, getRealDP as dp } from '../utils/screenUtil';
import Color from '../styles/color';
import Ionicons from 'react-native-vector-icons/Ionicons';

/**
 * 普通列表：支持上拉加载和下拉刷新
 */
class CommonFlatList extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            isShowTop: false
        }

        this.flatListRef = null
        this._handleScrollTop = this._handleScrollTop.bind(this)
        this._onScroll = this._onScroll.bind(this)
    }

    _handleScrollTop() {
        this.flatListRef && this.flatListRef.scrollToOffset({
            offset: 0,
            animated: true,
        })
    }

    _onScroll(e) {
        let offsetY = e.nativeEvent.contentOffset.y
        if (offsetY > DEVICE_HEIGHT) {
            this.setState({
                isShowTop: true
            })
        } else {
            this.setState({
                isShowTop: false
            })
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    ref={comp => {
                        this.flatListRef = comp;
                    }}
                    onEndReachedThreshold={0.1}
                    onScroll={this._onScroll}
                    {...this.props} 
                />
                {this.state.isShowTop && 
                    <TouchableWithoutFeedback onPress={this._handleScrollTop}>
                        <View style={styles.topBtn}>
                        <Ionicons name='chevron-up-circle' size={dp(80)} color={Color.THEME} />
                        </View>
                    </TouchableWithoutFeedback>}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    topBtn: {
        position: 'absolute',
        bottom: dp(50),
        right: dp(40),
    }
})

export default CommonFlatList