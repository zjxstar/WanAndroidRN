import { 
    getHomeBannerAction, 
    getHomeTopArticlesAction,
    getHomeArticlesMoreAction,
    getHomeArticlesFailureAction,
    getHomeArticlesAction,
    getSystemTreeAction,
    startFetchDataAction,
    getSystemTreeFailureAction,
    loginAction,
    loginFailureAction,
    registerAction,
    registerFailureAction,
    logoutAction,
    getUserCoinAction,
    getSearchArticlesAction,
    getSearchArticlesMoreAction,
    getSearchArticlesFailureAction,
} from './actionCreator';
import { 
    getHomeBanner, 
    getHomeTopArticles,
    getHomeArticles,
    getSystemTree,
    login,
    register,
    logout,
    getMyCoin,
    searchArticles,
} from '../api';
import actionTypes from '../actions/actionTypes';
import AuthUtil from '../utils/authUtil';

/**
 * 拉取首页Banner图
 */
export function fetchHomeBanner() {
    return dispatch => {
        dispatch(startFetchDataAction(actionTypes.FETCH_DATA_TYPE_HOME))
        return getHomeBanner().then(
            res => {
                dispatch(getHomeBannerAction(res.data))}
        ).catch(
            err => console.log('home banner err: ', err)
        )
    }
}

/**
 * 拉取首页置顶文章列表
 */
export function fetchHomeTopArticles() {
    return dispatch => {
        return getHomeTopArticles().then(
            res => {
                dispatch(getHomeTopArticlesAction(res.data))}
        ).catch(
            err => console.log('home top article err: ', err)
        )
    }
}

/**
 * 拉取首页文章列表第一页数据
 */
export function fetchHomeArticles() {
    return dispatch => {
        return getHomeArticles().then(
            res => {
                dispatch(getHomeArticlesAction(res.data))}
        ).catch(
            err => {
                console.log('fetch home articles err: ', err)
                dispatch(getHomeArticlesFailureAction())}
        )
    }
}

/**
 * 首页文章列表加载更多
 * @param {Number} page 页码，从0开始
 */
export function fetchHomeArticlesMore(page) {
    return dispatch => {
        return getHomeArticles(page).then(
            res => dispatch(getHomeArticlesMoreAction(res.data))
        ).catch(
            err => {
                console.log('fetch home articles more err: ', err)
                dispatch(getHomeArticlesFailureAction())}
        )
    }
}

/**
 * 知识体系页面分类数据
 */
export function fetchSystemTree() {
    return dispatch => {
        dispatch(startFetchDataAction(actionTypes.FETCH_DATA_TYPE_SYSTEM_TREE))
        return getSystemTree().then(
            
            res => {
                dispatch(getSystemTreeAction(res.data))}
        ).catch(
            err => {
                console.log('fetch system tree err: ', err)
                dispatch(getSystemTreeFailureAction())}
        )
    }
}

/**
 * 用户登录
 * @param {String} username 用户名
 * @param {String} password 密码
 */
export function toLogin(username, password, navigation) {
    console.log('tologin')
    return dispatch => {
        dispatch(startFetchDataAction(actionTypes.FETCH_DATA_TYPE_USER))
        return login(username, password).then(res => {
            console.log('to login su: ', res.data)
            AuthUtil.saveUserInfo(res.data)
            navigation.goBack()
            dispatch(loginAction(res.data))
        }).catch(err => {
            console.log('to login err: ', err)
            dispatch(loginFailureAction())
        })
    }
}

/**
 * 用户注册
 * @param {String} username 用户名
 * @param {String} password 密码
 * @param {String} repassword 二次确认密码
 */
export function toRegister(username, password, repassword, navigation) {
    return dispatch => {
        dispatch(startFetchDataAction(actionTypes.FETCH_DATA_TYPE_USER))
        return register(username, password, repassword).then(res => {
            console.log('to register su: ', res.data)
            AuthUtil.saveUserInfo(res.data)
            navigation.popToTop()
            dispatch(registerAction(res.data))
        }).catch(err => {
            console.log('to register err: ', err)
            dispatch(registerFailureAction())
        })
    }
}

/**
 * 退出登录
 */
export function toLogout() {
    return dispatch => {
        dispatch(startFetchDataAction(actionTypes.FETCH_DATA_TYPE_USER))
        return logout().then(res => {
            console.log('to logout su: ', res)
            dispatch(logoutAction())
        }).catch(err => {
            console.log('to logout err: ', err)
        })
    }
}

/**
 * 获取个人积分信息
 */
export function fetchMyCoin() {
    return dispatch => {
        return getMyCoin().then(res => {
            console.log('fetch my coin: ', res.data)
            dispatch(getUserCoinAction(res.data))
        }).catch(err => {
            console.log('fetch my coin err: ', err)
        })
    }
}

/**
 * 按照关键词搜索文章
 * @param {String} key 搜索关键词 
 */
export function fetchSearchArticles(key) {
    return dispatch => {
        dispatch(startFetchDataAction(actionTypes.FETCH_DATA_TYPE_SEARCH))
        return searchArticles(key).then(res => {
            console.log('search a: ', res.data)
            dispatch(getSearchArticlesAction(res.data))
        }).catch(err => {
            console.log('search a err: ', err)
            dispatch(getSearchArticlesFailureAction())
        })
    }
}

/**
 * 按照关键词搜索文章
 * @param {String} key 搜索关键词
 * @param {Number} page 页码，从0开始
 */
export function fetchSearchArticlesMore(key, page) {
    return dispatch => {
        dispatch(startFetchDataAction(actionTypes.FETCH_SEARCH_DATA_START))
        return searchArticles(key, page).then(res => {
            console.log('search a more: ', res.data)
            dispatch(getSearchArticlesMoreAction(res.data))
        }).catch(err => {
            console.log('search a more err: ', err)
            dispatch(getSearchArticlesFailureAction())
        })
    }
}