import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { Header, Avatar, } from 'react-native-elements';
import Color from '../styles/color';
import PropTypes from 'prop-types';
import { getRealDP as dp } from '../utils/screenUtil';

/**
 * 顶部导航栏
 */

const propTypes = {
    title: PropTypes.string.isRequired,
    navigation: PropTypes.object.isRequired,
    isLogin: PropTypes.bool
}

const defaultProps = {
    title: '玩Android',
    isLogin: false,
}

class HeaderBar extends PureComponent {

    constructor(props) {
        super(props)
        this.renderHeaderAvatar = this.renderHeaderAvatar.bind(this)
    }

    renderHeaderAvatar() {
        const { navigation, isLogin } = this.props
        if (isLogin) {
            return (
                <Avatar
                    rounded
                    source={{
                        uri: 'https://wx.qlogo.cn/mmopen/vi_32/eudayfvoav2bibTSsiaxWyLW6gMqTF32RPT6hULQ9Z6wrtjU97SkVOLOdlYujdKDFic34wuib9dwIcBQbUkRtJI2MA/132'
                    }}
                    onPress={() => navigation.toggleDrawer()}
                    size={dp(40)}
                    activeOpacity={0.7} />
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
        const { navigation, title } = this.props
        return (
            <View>
            <Header
                backgroundColor={Color.THEME}
                leftComponent={this.renderHeaderAvatar()}
                centerComponent={{ text: title, style: { color: Color.WHITE, fontSize: dp(30) } }}
                rightComponent={{ icon: 'search', color: Color.WHITE, size: dp(40), onPress: () => navigation.navigate('Search') }} />
            </View>
        )
    }
}

HeaderBar.propTypes = propTypes
HeaderBar.defaultProps = defaultProps

export default HeaderBar