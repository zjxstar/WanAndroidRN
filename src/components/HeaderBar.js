import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { Header, Avatar, } from 'react-native-elements';
import Color from '../styles/color';
import PropTypes from 'prop-types';
import { getRealDP as dp } from '../utils/screenUtil';
import { connect } from 'react-redux';

/**
 * 顶部导航栏
 */

const propTypes = {
    title: PropTypes.string.isRequired,
    navigation: PropTypes.object.isRequired,
    type: PropTypes.string,
    right: PropTypes.object,
}

const defaultProps = {
    title: '玩Android',
    type: 'avatar',
}

class HeaderBar extends PureComponent {

    constructor(props) {
        super(props)
        this.renderHeaderAvatar = this.renderHeaderAvatar.bind(this)
    }

    renderHeaderAvatar() {
        const { navigation, isLogin, userInfo } = this.props
        console.log('header bar isLogin: ', isLogin, ' userInfo: ', userInfo)
        
        if (isLogin) {
            let avatarName = userInfo.username.substring(0, 1)
            console.log('avatarName', avatarName)
            return (
                <Avatar
                    rounded
                    title={avatarName === '' ? '玩' : avatarName}
                    onPress={() => navigation.toggleDrawer()}
                    size={dp(40)}
                    activeOpacity={0.7}
                    containerStyle={{ backgroundColor: Color.AVATAR_BACKGROUND}} />
            )
        } else {
            return (
                <Avatar
                    rounded
                    source={require('../images/icon-default-avatar.png')}
                    onPress={() => navigation.toggleDrawer()}
                    size={dp(40)}
                    activeOpacity={0.7} />
            )
        }
    }

    render() {
        const { navigation, title, type, right } = this.props
        if (type === 'back') {
            if (right) {
                return (
                    <Header
                        containerStyle={
                            {
                                // 把分割线的颜色设为主题色
                                borderBottomColor: Color.THEME
                            }
                        }
                        backgroundColor={Color.THEME}
                        leftComponent={{ icon: 'chevron-left', color: Color.WHITE, size: dp(40), onPress: () => navigation.goBack() }}
                        centerComponent={{ text: title, style: { color: Color.WHITE, fontSize: dp(30) } }}
                        rightComponent={right}
                    />
                ) 
            }
            return (
                <Header
                    containerStyle={
                        {
                            // 把分割线的颜色设为主题色
                            borderBottomColor: Color.THEME
                        }
                    }
                    backgroundColor={Color.THEME}
                    leftComponent={{ icon: 'chevron-left', color: Color.WHITE, size: dp(40), onPress: () => navigation.goBack() }}
                    centerComponent={{ text: title, style: { color: Color.WHITE, fontSize: dp(30) } }}
                />
            )
        }
        return (
            <Header
                containerStyle={
                    {
                        // 把分割线的颜色设为主题色
                        borderBottomColor: Color.THEME
                    }
                }
                backgroundColor={Color.THEME}
                leftComponent={this.renderHeaderAvatar()}
                centerComponent={{ text: title, style: { color: Color.WHITE, fontSize: dp(30) } }}
                rightComponent={{ icon: 'search', color: Color.WHITE, size: dp(40), onPress: () => navigation.navigate('Search') }} 
                />
        )
    }
}

HeaderBar.propTypes = propTypes
HeaderBar.defaultProps = defaultProps

const mapStateToProps = state => {
    return {
        isLogin: state.user.isLogin,
        userInfo: state.user.userInfo,
    }
}

export default connect(mapStateToProps)(HeaderBar)