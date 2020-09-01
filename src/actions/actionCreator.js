/**
 * redux 的 action创建函数
 */

import actionTypes from './actionTypes';

export function getHomeBannerAction(homeBanner) {
    return {
        type: actionTypes.FETCH_HOME_BANNER,
        homeBanner
    }
}