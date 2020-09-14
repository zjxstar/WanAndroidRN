import React, { PureComponent } from 'react'
import { View, StyleSheet, Text } from 'react-native';
import globalStyles from '../styles/globalStyles'
import Color from '../styles/color'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ArticleFlatList from '../components/ArticleFlatList';
import { getRealDP as dp } from '../utils/screenUtil';


class ArticleTabComponent extends PureComponent {

    render() {
        const { data } = this.props
        const Tab = createMaterialTopTabNavigator();
        return (
            <View style={globalStyles.container}>
                <Tab.Navigator
                    lazy={true}
                    backBehavior='none'
                    tabBarOptions={{
                        scrollEnabled: true,
                        activeTintColor: Color.THEME,
                        labelStyle: {
                            fontFamily: '',
                            fontWeight: 'bold',
                            textTransform: 'none',
                        },
                        tabStyle: {
                            width: dp(200),
                            height: dp(100),
                        },
                        indicatorStyle: {
                            backgroundColor: Color.THEME,
                            width: dp(100),
                            height: dp(4),
                            marginLeft: dp(50)
                        },
                        style: {
                            height: dp(110),
                        }
                    }}>
                    {data.children.map(item => (
                        <Tab.Screen key={item.id.toString()} name={item.name} options={{tabBarLabel: item.name}}>
                            {props => <ArticleFlatList {...props} cid={item.id}/>}
                        </Tab.Screen>
                    ))}
                </Tab.Navigator>
            </View>
        )
    }
}

export default ArticleTabComponent