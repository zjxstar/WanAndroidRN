import React, { Component } from 'react';
import { View, Text, StatusBar, ScrollView } from 'react-native';
import {
    DrawerContentScrollView,
    DrawerItem,
} from '@react-navigation/drawer';
import globalStyles from '../../styles/globalStyles'
import Ionicons from 'react-native-vector-icons/Ionicons';

/**
 * 自定义Drawer样式
 * @param {*} props 
 */
export default function CustomDrawerContent({props, navigation}) {
    return (
        <ScrollView {...props}>
            <StatusBar barStyle="light-content" backgroundColor='#00BFFF' />
            <View style={{ height: 100, backgroundColor: '#00BFFF' }}>
                <Text>这是Header</Text>
            </View>
            <DrawerItem label="我的收藏" onPress={() => navigation.navigate('Favor')} 
                icon={({ focused, color, size }) => {
                    console.log('clolr: ', color, ' size: ', size)
                    return <Ionicons name={'heart'} color={'#696969'} size={size} /> }} />
            <DrawerItem label="关于作者" onPress={() => navigation.navigate('About')} 
                icon={({ focused, color, size }) => <Ionicons name={'person'} color={'#696969'} size={size} />}/>
            <DrawerItem label="退出登录" onPress={() => alert('退出登录')}
                icon={({ focused, color, size }) => <Ionicons name={'power'} color={'#696969'} size={size} />} />
        </ScrollView>
    );
}