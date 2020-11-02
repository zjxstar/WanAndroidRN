import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Image, ListItem, Badge } from 'react-native-elements';
import HeaderBar from '../../components/HeaderBar';
import globalStyles from '../../styles/globalStyles'
import Color from '../../styles/color';
import { getRealDP as dp } from '../../utils/screenUtil';

/**
 * 关于
 */
export default class AboutScreen extends Component {

    constructor(props) {
        super(props)

        this.toGitHub = this.toGitHub.bind(this)
    }

    toGitHub() {
        const { navigation } = this.props
        navigation.navigate('WebView', {
            title: 'zjxstar的GitHub',
            url: 'https://github.com/zjxstar'
        })
    }

    toUpdateChangeLog() {
        
    }

    render() {
        const { navigation } = this.props
        return (
            <View style={globalStyles.container}>
                <HeaderBar title='关于' navigation={navigation} type='back'/>
                <View style={styles.header}>
                    <Image
                        source={require('../../images/ic_launcher.png') }
                        style={{ width: dp(200), height: dp(200) }} />
                    <Text style={styles.headerTitle}>玩Android</Text>
                </View>
                <View style={styles.list}>
                    <ListItem topDivider bottomDivider>
                        <ListItem.Content>
                            <ListItem.Title>版本</ListItem.Title>
                        </ListItem.Content>
                        <Badge value="有新版本" status="error" />
                        <ListItem.Title>v1.0.0</ListItem.Title>
                    </ListItem>
                    <ListItem bottomDivider onPress={() => {this.toGitHub()}}>
                        <ListItem.Content>
                            <ListItem.Title>GitHub</ListItem.Title>
                            <ListItem.Subtitle>https://github.com/zjxstar</ListItem.Subtitle>
                        </ListItem.Content>
                        <ListItem.Chevron color={Color.AVATAR_BACKGROUND} />
                    </ListItem>
                    <ListItem bottomDivider>
                        <ListItem.Content>
                            <ListItem.Title>更新日志</ListItem.Title>
                        </ListItem.Content>
                        <ListItem.Chevron color={Color.AVATAR_BACKGROUND} />
                    </ListItem>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        height: dp(400),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.WHITE,
    },
    headerTitle: {
        color: Color.TEXT_MAIN,
        fontSize: dp(34),
        marginTop: dp(16),
        fontWeight: 'bold',
    },
    list: {
        backgroundColor: Color.WHITE,
        flex: 1,
    }
})