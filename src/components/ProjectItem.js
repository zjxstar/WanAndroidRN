import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Image } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Color from '../styles/color';
import { getRealDP as dp } from '../utils/screenUtil';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

/**
 * 项目列表Item
 */

const propTypes = {
    onFavorClick: PropTypes.func
}

const defaultProps = {
    onFavorClick: () => { }
}

class ProjectItem extends PureComponent {

    constructor(props) {
        super(props)
        this.toWebView = this.toWebView.bind(this)
        this.toLoginPage = this.toLoginPage.bind(this)
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

    toLoginPage() {
        const { navigation } = this.props
        navigation.navigate('Login')
    }

    render() {
        let { item, isLogin } = this.props
        return (
            <TouchableWithoutFeedback style={styles.container} onPress={() => { this.toWebView(item) }}>
                <View style={styles.itemWrapper} >
                    <View style={styles.imgContainer}>
                        <Image
                            source={{ uri: item.envelopePic }}
                            style={styles.img}/>
                    </View>
                    <View style={styles.contentContainer}>
                        <View style={styles.lineOne}>
                            <Text style={{ fontSize: dp(32), color: Color.TEXT_MAIN }} numberOfLines={2}>{item.title}</Text>
                        </View>
                        <View style={styles.lineTwo}>
                            <Text style={{ fontSize: dp(26), color: Color.TEXT_DARK }} numberOfLines={3}>{item.desc}</Text>
                        </View>
                        <View style={styles.lineThree}>
                            <Text style={{ fontSize: dp(20), color: Color.TEXT_LIGHT }}>{item.author || item.shareUser} / {item.niceDate}</Text>
                            {isLogin && (
                                <TouchableWithoutFeedback onPress={this.props.onFavorClick }>
                                    <Ionicons name='md-heart' size={dp(40)} color={item.collect ? Color.COLLECT : Color.ICON_GRAY} />
                                </TouchableWithoutFeedback>
                            )}
                            {!isLogin && (
                                <TouchableWithoutFeedback onPress={() => { this.toLoginPage() }}>
                                    <Ionicons name='md-heart' size={dp(40)} color={Color.ICON_GRAY} />
                                </TouchableWithoutFeedback>
                            )}
                        </View>
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
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Color.WHITE,
        paddingTop: dp(14),
        paddingLeft: dp(20),
        paddingRight: dp(20),
        paddingBottom: dp(14),
        borderRadius: dp(14),
        marginVertical: dp(4),
        marginHorizontal: dp(10),
    },
    imgContainer: {
        borderWidth: dp(1),
        borderColor: Color.SPLIT_LINE,
        borderStyle: 'solid'
    },
    img: {
        width: dp(100),
        height: dp(170),
    },
    contentContainer: {
        flex: 1,
        marginLeft: dp(14)
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
})

ProjectItem.propTypes = propTypes
ProjectItem.defaultProps = defaultProps

const mapStateToProps = state => {
    return {
        isLogin: state.user.isLogin,
    }
}

export default connect(mapStateToProps)(ProjectItem)