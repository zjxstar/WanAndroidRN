import React, { Component, PureComponent } from 'react';
import { View, Text } from 'react-native';
import { Header, Avatar } from 'react-native-elements';
import globalStyles from '../../styles/globalStyles'
import DefaultAvatar from '../../images/icon-default-avatar.png';
import { fetchHomeBanner } from '../../actions'
import { connect } from 'react-redux';
import { get } from '../../service/httpHelper';

/**
 * 首页
 * Header：用户头像、Title、搜索入口
 * Banner轮播图
 * 文章列表
 */
class HomeScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            avatarUrl: DefaultAvatar
        }
        this.renderHeaderAvatar = this.renderHeaderAvatar.bind(this)
        this.renderBanner = this.renderBanner.bind(this)
    }

    componentDidMount() {
        // initAxios()
        // fetchHomeBanner()
        get('banner/json').then(res => {
            console.log('get success a: ', res)
        }).catch(err => {
            console.log('get error a: ', err)
        })

        get('article/list/0/json', {cid: 60}).then(res => {
            console.log('get success b: ', res)
        }).catch(err => {
            console.log('get error b: ', err)
        })

    }

    renderHeaderAvatar() {
        const { navigation, isLogin } = this.props
        console.log('isLogin: ', isLogin)
        if (isLogin) {
            return (
                <Avatar
                    rounded 
                    source={ {
                        uri: 'https://wx.qlogo.cn/mmopen/vi_32/eudayfvoav2bibTSsiaxWyLW6gMqTF32RPT6hULQ9Z6wrtjU97SkVOLOdlYujdKDFic34wuib9dwIcBQbUkRtJI2MA/132'
                    }}
                    onPress={() => navigation.toggleDrawer()}
                    size={28}
                    activeOpacity={0.7} />
            )
        } else {
            return (
                <Avatar
                    rounded 
                    source={require('../../images/icon-default-avatar.png')}
                    onPress={() => navigation.toggleDrawer()}
                    size={28}
                    activeOpacity={0.7} />
            )
        }
    }

    renderBanner() {
        const { homeBanner } = this.props
        console.log('homeBanner render: ', homeBanner)
    }

    render() {
        const { navigation } = this.props
        this.renderBanner()

        return (
            <View style={globalStyles.container}>
                <Header 
                    leftComponent={ this.renderHeaderAvatar() }
                    centerComponent={{ text: '首页', style: { color: '#fff', fontSize: 20 } }}
                    rightComponent={{ icon: 'search', color: '#fff', onPress: () => navigation.navigate('Search') }} />
                
            <Text>这是首页</Text>
                
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        homeBanner: state.home.homeBanner
    }
}

export default connect(mapStateToProps)(HomeScreen)