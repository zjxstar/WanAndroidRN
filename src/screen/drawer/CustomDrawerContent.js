import React, { PureComponent } from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import { Avatar } from 'react-native-elements';
import {
    DrawerItem,
} from '@react-navigation/drawer';
import globalStyles from '../../styles/globalStyles'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Color from '../../styles/color';
import { connect } from 'react-redux';
import { getRealDP as dp } from '../../utils/screenUtil';
import { fetchMyCoin, toLogout } from '../../actions';
import AuthUtil from '../../utils/authUtil';

/**
 * 自定义Drawer样式
 */

class CustomDrawerContent extends PureComponent {

    constructor(props) {
        super(props)

        this.toLoginPage = this.toLoginPage.bind(this)
        this.toLogout = this.toLogout.bind(this)
        this.reqLogout = this.reqLogout.bind(this)
    }

    toLoginPage(navigation) {
        navigation.navigate('Login')
    }

    toLogout() {
        Alert.alert(
            '提示',
            '确认要退出当前帐号吗？',
            [
                {
                    text: '取消',
                    style: 'cancel'
                },
                {
                    text: '确定',
                    onPress: () => { this.reqLogout()},
                }
            ]
        )
    }   

    reqLogout() {
        console.log('log out')
        this.props.logout()
        AuthUtil.removeUserInfo()
        AuthUtil.removeCookie()
    }

    componentDidMount() {
        console.log('drawer componentDidMount')
        this.props.navigation.addListener('focus', () => {
            const {isLogin} = this.props
            console.log('drawer on resume: ', isLogin)
            if (isLogin) {
                this.props.reqMyCoin()
            }
        })
    }

    render() {
        const { navigation, isLogin, userInfo, level, coinCount, rank} = this.props
        console.log('isLogin: ', isLogin)
        return (
            <View style={globalStyles.container}>
                {isLogin && userInfo && (
                    <View style={styles.headerWrapper}>
                        <Avatar
                            size="large"
                            rounded
                            title={userInfo.username.substring(0,1)}
                            onPress={() => this.toLoginPage(navigation)}
                            activeOpacity={0.7}
                            containerStyle={{ backgroundColor: Color.AVATAR_BACKGROUND, marginTop: dp(80) }}
                        />
                        <Text style={styles.headerUserName}>{userInfo.nickname}</Text>
                        <Text style={styles.headerUserInfo}>{`等级：${level} 积分：${coinCount} 排名：${rank}`}</Text>
                    </View>
                )}
                {!isLogin && (
                    <View style={styles.headerWrapper}>
                        <Avatar
                            size="large"
                            rounded
                            source={require('../../images/icon-default-avatar.png')}
                            onPress={() => this.toLoginPage(navigation)}
                            activeOpacity={0.7}
                        />
                    </View>
                )}
                <DrawerItem label="我的收藏" onPress={() => navigation.navigate('Favor')}
                    icon={({ focused, color, size }) => {
                        return <Ionicons name={'heart'} color={Color.ICON_DEFAULT} size={size} />
                    }} />
                <DrawerItem label="TODO" onPress={() => navigation.navigate('Favor')}
                    icon={({ focused, color, size }) => {
                        return <Ionicons name={'pricetag'} color={Color.ICON_DEFAULT} size={size} />
                    }} />
                <DrawerItem label="关于" onPress={() => navigation.navigate('About')}
                    icon={({ focused, color, size }) => <Ionicons name={'person'} color={Color.ICON_DEFAULT} size={size} />} />
                {isLogin && (<DrawerItem label="退出登录" onPress={() => this.toLogout()}
                    icon={({ focused, color, size }) => <Ionicons name={'power'} color={Color.ICON_DEFAULT} size={size} />} />
                )}
                {!isLogin && (<DrawerItem label="请登录" onPress={() => this.toLoginPage(navigation)}
                    icon={({ focused, color, size }) => <Ionicons name={'power'} color={Color.ICON_DEFAULT} size={size} />} />
                )}
                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    headerWrapper: {
        height: dp(400),
        backgroundColor: Color.THEME,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerUserName: {
        color: Color.WHITE,
        fontSize: dp(34),
        marginTop: dp(16),
    },
    headerUserInfo: {
        color: Color.WHITE,
        marginTop: dp(10),
    }
})

const mapStateToProps = state => {
    return {
        isLogin: state.user.isLogin,
        userInfo: state.user.userInfo,
        coinCount: state.coin.coinCount,
        level: state.coin.level,
        rank: state.coin.rank,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        reqMyCoin: () => dispatch(fetchMyCoin()),
        logout: () => dispatch(toLogout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomDrawerContent)