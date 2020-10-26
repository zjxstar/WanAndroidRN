import React, { Component } from 'react';
import { View, Text } from 'react-native';
import globalStyles from '../../styles/globalStyles'
import HeaderBar from '../../components/HeaderBar';
import Color from '../../styles/color'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { getRealDP as dp } from '../../utils/screenUtil';
import TODOFlatList from '../../components/TODOFlatList';

/**
 * TODO
 */
export default class TODOScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            tabs: [
                { title: '工作', id: 'tab1', type: 1 }, 
                { title: '学习', id: 'tab2', type: 2 }, 
                { title: '生活', id: 'tab3', type: 3 },]
        }
    }

    render() {
        const { navigation } = this.props
        const Tab = createMaterialTopTabNavigator();

        return (
            <View style={globalStyles.container}>
                <HeaderBar title='TODO' navigation={navigation} type='back'/>
                    <Tab.Navigator
                        lazy={true}
                        backBehavior='none'
                        tabBarOptions={{
                            scrollEnabled: true,
                            activeTintColor: Color.WHITE,
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
                                backgroundColor: Color.WHITE,
                                width: dp(100),
                                height: dp(4),
                                marginLeft: dp(50)
                            },
                            style: {
                                backgroundColor: Color.THEME,
                                height: dp(110),
                            }
                        }}>
                        {this.state.tabs.map(item => (
                            <Tab.Screen key={item.id} name={item.title} options={{ tabBarLabel: item.title }}>
                                {props => <TODOFlatList {...props} type={item.type} />}
                            </Tab.Screen>
                        ))}
                    </Tab.Navigator>
            </View>
        )
    }
}