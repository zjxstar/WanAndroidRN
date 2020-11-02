import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Color from '../styles/color';
import { getRealDP as dp } from '../utils/screenUtil';
import globalStyles from '../styles/globalStyles';

/**
 * 知识体系的卡片
 */
class SystemCard extends PureComponent {
    
    constructor(props) {
        super(props)

        this.toSystemDetail = this.toSystemDetail.bind(this)
    }

    toSystemDetail(classification) {
        const { navigation } = this.props
        navigation.navigate('ArticleTab', {
            classification
        })
    }

    render() {
        const { classification } = this.props
        return (
            <TouchableOpacity 
                style={globalStyles.container} 
                activeOpacity={0.6}
                onPress={() => { this.toSystemDetail(classification) }}>
                <View style={styles.cardWrapper}>
                    <Text style={styles.cardTitle}>{classification.name}</Text>
                    <View style={styles.childrenWrapper}>
                        {classification.children && classification.children.map((item) => {
                            return (
                                <View style={styles.child} key={item.id.toString()}>
                                    <Text style={{color: Color.TEXT_DARK}}>{item.name}</Text>
                                </View>
                            )
                        })}
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    cardWrapper: {
        alignItems: 'center',
        backgroundColor: Color.WHITE,
        marginHorizontal: dp(10),
        marginTop: dp(14),
        paddingVertical: dp(20),
        paddingHorizontal: dp(20),
        borderRadius: dp(14),
    },
    cardTitle: {
        color: Color.TEXT_MAIN,
        fontSize: dp(30),
        fontWeight: 'bold'
    },
    childrenWrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: dp(10),
    },
    child: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: dp(10),
        paddingVertical: dp(4),
        margin: dp(6),
        borderWidth: dp(1),
        borderRadius: dp(30),
    }
})

export default SystemCard