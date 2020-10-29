import React, { PureComponent } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import Color from '../styles/color';
import { getRealDP as dp } from '../utils/screenUtil';

export default class LoadingView extends PureComponent {

    render () {

        return (
            <View style={styles.container}>
                <ActivityIndicator size={dp(80)} color={Color.THEME} />
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