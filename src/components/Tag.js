import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Color from '../styles/color';
import { getRealDP as dp } from '../utils/screenUtil';

export default function Tag(props) {
    let { tagName, tagColor } = props
    return (
        <View style={tagColor === 'red' ? tagRed : tagGreen}>
            <Text style={{color: tagColor === 'red' ? Color.RED : Color.GREEN, fontSize: dp(18)}}>{tagName}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    tagBase: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: dp(1),
        borderRadius: dp(4),
        paddingVertical: dp(4),
        paddingHorizontal: dp(4),
        marginRight: dp(4),
    },
    tagBorderRed: {
        borderColor: Color.RED,
    },
    tagBorderBlue: {
        borderColor: Color.GREEN,
    }
})

const tagRed = StyleSheet.compose(styles.tagBase, styles.tagBorderRed)
const tagGreen = StyleSheet.compose(styles.tagBase, styles.tagBorderBlue)