/**
 * 网络请求接口
 */

import httpHelper from '../service/httpHelper'

/**
 * 获取首页Banner列表
 */
export async function getHomeBanner() {
    return httpHelper.get('banner/json')
}