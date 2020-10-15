import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Avatar } from 'react-native-elements';
import {
    DrawerItem,
} from '@react-navigation/drawer';
import globalStyles from '../../styles/globalStyles'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Color from '../../styles/color';
import { getRealDP as dp } from '../../utils/screenUtil';

/**
 * 自定义Drawer样式
 * @param {*} props 
 */
export default function CustomDrawerContent({props, navigation}) {

    let userinfo = `等级：${1} 积分：${12} 排名：${20}`

    return (
        <View style={globalStyles.container}>
            <View style={styles.headerWrapper}>
                <Avatar
                    size="large"
                    rounded
                    title="CR"
                    onPress={() => console.log("Works!")}
                    activeOpacity={0.7}
                    containerStyle={{backgroundColor: Color.AVATAR_BACKGROUND, marginTop: dp(80)}}
                />
                <Text style={styles.headerUserName}>zjxstar</Text>
                <Text style={styles.headerUserInfo}>{userinfo}</Text>
            </View>
            <DrawerItem label="我的收藏" onPress={() => navigation.navigate('Favor')} 
                icon={({ focused, color, size }) => {
                    return <Ionicons name={'heart'} color={Color.ICON_DEFAULT} size={size} /> }} />
            <DrawerItem label="TODO" onPress={() => navigation.navigate('Favor')}
                icon={({ focused, color, size }) => {
                    return <Ionicons name={'pricetag'} color={Color.ICON_DEFAULT} size={size} />
                }} />
            <DrawerItem label="关于" onPress={() => navigation.navigate('About')} 
                icon={({ focused, color, size }) => <Ionicons name={'person'} color={Color.ICON_DEFAULT} size={size} />}/>
            <DrawerItem label="退出登录" onPress={() => alert('退出登录')}
                icon={({ focused, color, size }) => <Ionicons name={'power'} color={Color.ICON_DEFAULT} size={size} />} />
        </View>
    );
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