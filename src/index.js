// index.js 
// 构建页面导航配置
import React from 'react';
import { Text } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screen/tabs/HomeScreen';
import SystemScreen from './screen/tabs/SystemScreen';
import WeChatArticleScreen from './screen/tabs/WeChatArticleScreen';
import NavigationScreen from './screen/tabs/NavigationScreen';
import ProjectScreen from './screen/tabs/ProjectScreen';
import CustomDrawerContent from './screen/drawer/CustomDrawerContent';
import AboutScreen from './screen/drawer/AboutScreen';
import FavorScreen from './screen/drawer/FavorScreen';
import LoginScreen from './screen/drawer/LoginScreen';
import RegisterScreen from './screen/drawer/RegisterScreen';
import SearchScreen from './screen/article/SearchScreen';
import WebViewScreen from './screen/article/WebViewScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator()

const TabsConfig = {
    Home: {
        name: '首页',
        iconName: 'md-home'
    },
    System: {
        name: '体系',
        iconName: 'md-book'
    },
    WeChatArticle: {
        name: '公众号',
        iconName: 'md-chatbubbles'
    },
    Navigation: {
        name: '导航',
        iconName: 'paper-plane'
    },
    Project: {
        name: '项目',
        iconName: 'md-document-attach'
    }
}

function TabStack() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName = TabsConfig[route.name].iconName
                    return <Ionicons name={iconName} size={size} color={color}/>
                },
                tabBarLabel: ({ focused, color }) => {
                    return <Text style={{color: color}}>{TabsConfig[route.name].name}</Text>
                }
            })}>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="System" component={SystemScreen} />
            <Tab.Screen name="WeChatArticle" component={WeChatArticleScreen} />
            <Tab.Screen name="Navigation" component={NavigationScreen} />
            <Tab.Screen name="Project" component={ProjectScreen} />
        </Tab.Navigator>
    )
}

const Drawer = createDrawerNavigator()

function DrawerStack() {
    return (
        <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />} >
            <Drawer.Screen name="Tabs" component={TabStack} />
        </Drawer.Navigator>
    )
}

const Stack = createStackNavigator()

function RootStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Drawer" component={DrawerStack} options={{ headerShown: false }} />
            <Stack.Screen name="Favor" component={FavorScreen} />
            <Stack.Screen name="About" component={AboutScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Search" component={SearchScreen} />
            <Stack.Screen name="WebView" component={WebViewScreen} />
        </Stack.Navigator>
    )
}

export default RootStack