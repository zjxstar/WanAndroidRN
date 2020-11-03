import React, { Component } from 'react';
import { View } from 'react-native';
import globalStyles from '../../styles/globalStyles'
import HeaderBar from '../../components/HeaderBar';
import Color from '../../styles/color'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { getRealDP as dp } from '../../utils/screenUtil';
import TodoFlatList from '../../components/TodoFlatList';

/**
 * TODO
 */
export default class TodoScreen extends Component {

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
                <HeaderBar title='TODO' navigation={navigation} type='back'
                    right={{ icon: 'add', color: Color.WHITE, size: dp(40), onPress: () => navigation.navigate('AddTodo') }}/>
                    <Tab.Navigator
                        lazy={true}
                        backBehavior='none'
                        tabBarOptions={{
                            scrollEnabled: false,
                            activeTintColor: Color.WHITE,
                            labelStyle: {
                                fontFamily: '',
                                fontWeight: 'bold',
                                textTransform: 'none',
                            },
                            tabStyle: {
                                height: dp(100),
                            },
                            indicatorStyle: {
                                backgroundColor: Color.WHITE,
                                height: dp(4),
                            },
                            style: {
                                backgroundColor: Color.THEME,
                                height: dp(110),
                            }
                        }}>
                        {this.state.tabs.map(item => (
                            <Tab.Screen key={item.id} name={item.title} options={{ tabBarLabel: item.title }}>
                                {props => <TodoFlatList {...props} type={item.type} />}
                            </Tab.Screen>
                        ))}
                    </Tab.Navigator>
            </View>
        )
    }
}