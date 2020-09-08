import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Color from '../styles/color';

export default function Tag(props) {
    let { tagName, tagColor } = props
    return (
        <View style={tagColor === 'red' ? tagRed : tagBlue}>
            <Text style={{color: tagColor === 'red' ? Color.RED : Color.BLUE}}>{tagName}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    tagBase: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 2,
        paddingVertical: 2,
        paddingHorizontal: 3,
        marginRight: 4,
    },
    tagBorderRed: {
        borderColor: Color.RED,
    },
    tagBorderBlue: {
        borderColor: Color.BLUE,
    }
})

const tagRed = StyleSheet.compose(styles.tagBase, styles.tagBorderRed)
const tagBlue = StyleSheet.compose(styles.tagBase, styles.tagBorderBlue)