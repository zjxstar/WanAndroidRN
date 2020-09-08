import { Dimensions, Platform } from 'react-native';

export let DEVICE_WIDTH = Dimensions.get('window').width;
export let DEVICE_HEIGHT = Dimensions.get('window').height;
export const isAndroid = Platform.OS === 'android';