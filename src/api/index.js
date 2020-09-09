/**
 * 网络请求接口
 */

import {get} from '../service/httpHelper'

/**
 * 获取首页Banner列表
 */
export function getHomeBanner() {
    return get('banner/json')
}

/**
 * 获取首页置顶文章
 */
export function getHomeTopArticles() {
    return get('article/top/json')
}

/**
 * 获取首页常规文章列表
 * 有分页逻辑，页面从0开始
 * @param {Number} page 分页码，从0开始
 */
export function getHomeArticles(page = 0) {
    return get(`article/list/${page}/json`)
}

/**
 * 获取知识体系数据
 */
export function getSystemTree() {
    return get('tree/json')
}

/**
 * 获取知识体系下的文章
 * @param {Number} page 分页码，从0开始
 * @param {Number} cid 二级目录id
 */
export function getSystemTreeArticles(page = 0, cid) {
    return get(`article/list/${page}/json?cid=${cid}`)
}