/**
 * 网络请求接口
 */

import {get} from '../service/httpHelper'
import {post} from '../service/httpHelper'
import {post2} from '../service/httpHelper'

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
export function getSystemTreeArticles(cid, page = 0) {
    return get(`article/list/${page}/json?cid=${cid}`)
}

/**
 * 获取微信公众号
 */
export function getWXTabs() {
    return get('wxarticle/chapters/json')
}

/**
 * 获取某个公众号下的历史文章
 * @param {Number}} id 微信公众号id
 * @param {Number} page 分页码，从1开始
 */
export function getWXArticles(id, page = 1) {
    return get(`wxarticle/list/${id}/${page}/json`)
}

/**
 * 获取导航页面数据
 */
export function getNavigationData() {
    return get('navi/json')
}

/**
 * 获取项目分类
 */
export function getProjectTabs() {
    return get('project/tree/json')
}

/**
 * 获取某个项目分类的项目文章列表
 * @param {Number} cid 项目分类id
 * @param {Number} page 页码，从1开始
 */
export function getProjects(cid, page = 1) {
    return get(`project/list/${page}/json?cid=${cid}`)
}

/**
 * 用户登录
 * @param {String} username 用户名
 * @param {String} password 密码
 */
export function login(username, password) {
    console.log('login u: ', username, ' p: ', password)
    return post('user/login', {
        username: username,
        password: password
    })
}

/**
 * 用户注册
 * @param {String} username 用户名
 * @param {String} password 密码
 * @param {String} repassword 二次确认密码
 */
export function register(username, password, repassword) {
    return post('user/register', {
        username,
        password,
        repassword
    })
}

/**
 * 退出登录
 */
export function logout() {
    return get('user/logout/json')
}

/**
 * 获取个人积分
 */
export function getMyCoin() {
    return get('lg/coin/userinfo/json')
}

/**
 * 根据关键词搜索文章列表
 * @param {String} key 搜索关键词，过个关键字用空格隔开
 * @param {Number} page 分页页码，从0开始
 */
export function searchArticles(key, page = 0) {
    return post(`article/query/${page}/json`, {
        k: key
    })
}