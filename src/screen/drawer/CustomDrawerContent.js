import React, { Component } from 'react';
import { View, Text, StatusBar, ScrollView } from 'react-native';
import {
    DrawerContentScrollView,
    DrawerItem,
} from '@react-navigation/drawer';
import globalStyles from '../../styles/globalStyles'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Color from '../../styles/color';

/**
 * 自定义Drawer样式
 * @param {*} props 
 */
export default function CustomDrawerContent({props, navigation}) {
    return (
        <View style={{flex: 1}}>
            <View style={{ height: 200, backgroundColor: Color.THEME}}>
                <Text style={{fontSize: 20, marginTop: 20}}>这是Header</Text>
            </View>
            <DrawerItem label="我的收藏" onPress={() => navigation.navigate('Favor')} 
                icon={({ focused, color, size }) => {
                    return <Ionicons name={'heart'} color={Color.ICON_DEFAULT} size={size} /> }} />
            <DrawerItem label="关于作者" onPress={() => navigation.navigate('About')} 
                icon={({ focused, color, size }) => <Ionicons name={'person'} color={Color.ICON_DEFAULT} size={size} />}/>
            <DrawerItem label="退出登录" onPress={() => alert('退出登录')}
                icon={({ focused, color, size }) => <Ionicons name={'power'} color={Color.ICON_DEFAULT} size={size} />} />
        </View>
    );
}