import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import { Image } from 'react-native-elements';
import Color from '../styles/color';
import { getRealDP as dp } from '../utils/screenUtil';

export default class LoadingView extends PureComponent {


    render () {

        return (
            <View style={styles.container}>
                <Image
                    source={require('../images/ic_launcher.png')}
                    style={{ width: dp(200), height: dp(200) }} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})