import React, { Component } from 'react';
import { View } from 'react-native';
import globalStyles from '../../styles/globalStyles'
import HeaderBar from '../../components/HeaderBar';
import Color from '../../styles/color'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ProjectFlatList from '../../components/ProjectFlatList';
import { getRealDP as dp } from '../../utils/screenUtil';
import { getProjectTabs } from '../../api';
import LoadingView from '../../components/LoadingView';

/**
 * 项目
 */
export default class ProjectScreen extends Component {

    constructor(props) {
        super(props)
        
        this.state = {
            tabs: [],
            firstLoading: false,
        }
    }

    componentDidMount() {
        this.setState({
            firstLoading: true,
        })
        getProjectTabs().then(res => {
            this.setState({
                tabs: res.data,
                firstLoading: false,
            })
        }).catch(err => {
            console.log('get project tabs err: ', err)
            this.setState({
                firstLoading: false,
            })
        })
    }

    render() {
        const { navigation } = this.props
        const { tabs, firstLoading } = this.state
        const Tab = createMaterialTopTabNavigator();

        return (
            <View style={globalStyles.container}>
                <HeaderBar title='项目' navigation={navigation} />

                {firstLoading && tabs.length === 0 && (
                    <LoadingView />
                )}

                {!firstLoading && tabs.length > 0 && (
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
                            <Tab.Screen key={item.id.toString()} name={item.name} options={{ tabBarLabel: item.name }}>
                                {props => <ProjectFlatList {...props} cid={item.id}/>}
                            </Tab.Screen>
                        ))}
                    </Tab.Navigator>
                )}
            </View>
        )
    }
}