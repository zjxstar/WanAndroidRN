import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Image } from 'react-native-elements';
import Swiper from 'react-native-swiper'
import PropTypes from 'prop-types';
import { DEVICE_WIDTH, getRealDP as dp } from '../utils/screenUtil';
import Color from '../styles/color';

const propTypes = {
    dataArr: PropTypes.array.isRequired,
    navigation: PropTypes.object.isRequired
}

const defaultProps = {
    dataArr: []
}

/**
 * Banner
 * @property {Array} dataArr 展示的Banner数组
 * @property {Object} navigation 导航
 */
class Banner extends PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            currentBannerIndex: 0,
        }
        this.getCurrentImgIndex = this.getCurrentImgIndex.bind(this)
        this.toWebView = this.toWebView.bind(this)
    }

    getCurrentImgIndex(imageIndex) {
        this.setState({ currentBannerIndex: imageIndex });
    }

    toWebView(data) {
        const { navigation } = this.props
        const { title, url } = data
        navigation.navigate('WebView', {
            title, 
            url
        })
    }

    render() {
        const { dataArr, navigation } = this.props
        let dataCount = dataArr.length
        if (!dataCount) {
            return <View style={styles.defaultBg} />
        }
        return (
            <View style={styles.bannerContainer}>
                <Swiper
                    style={styles.imgCarousel}
                    horizontal={true}
                    loop={true}
                    autoplay={true}
                    showsPagination={false}
                    onIndexChanged={this.getCurrentImgIndex}>
                    {dataArr.map(data => (
                        <Image 
                            key={data.id.toString()} 
                            style={styles.imgBanner} 
                            source={{ uri: data.imagePath }} 
                            onPress={() => this.toWebView(data)}/>
                    ))}
                </Swiper>
                <View style={styles.bannerHint}>
                    <Text style={styles.bannerText} numberOfLines={1}>
                        {dataArr[this.state.currentBannerIndex].title}
                    </Text>
                    <Text style={styles.bannerText}>
                        {this.state.currentBannerIndex + 1}/{dataCount}
                    </Text>
                </View>
            </View>
        )
    }
}

const imageHeight = dp(400)
const styles = StyleSheet.create({
    defaultBg: {
        height: imageHeight,
        backgroundColor: Color.DEFAULT_BG,
    },
    bannerContainer: {
        height: imageHeight,
        backgroundColor: Color.DEFAULT_BG,
    },
    imgCarousel: {
        height: imageHeight,
    },
    imgBanner: {
        width: DEVICE_WIDTH,
        height: imageHeight,
        resizeMode: 'stretch',
    },
    bannerHint: {
        flex: 1,
        width: DEVICE_WIDTH,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: dp(16),
        backgroundColor: 'rgba(0,0,0,0.3)',
        height: dp(50),
        bottom: 0,
        left: 0,
        position: 'absolute',
    },
    bannerText: {
        color: Color.WHITE,
        fontSize: dp(24),
    },
});

Banner.propTypes = propTypes
Banner.defaultProps = defaultProps

export default Banner