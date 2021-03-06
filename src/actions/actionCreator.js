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

export function getHomeTopArticlesAction(topArticles) {
    return {
        type: actionTypes.FETCH_HOME_TOP_ARTICLES,
        topArticles
    }
}

export function getHomeArticlesAction(articlesObj) {
    return {
        type: actionTypes.FETCH_HOME_ARTICLES,
        articlesObj
    }
}

export function getHomeArticlesMoreAction(articlesObj) {
    return {
        type: actionTypes.FETCH_HOME_ARTICLES_MORE,
        articlesObj
    }
}

export function getHomeArticlesFailureAction() {
    return {
        type: actionTypes.FETCH_HOME_ARTICLES_FAILURE
    }
}

export function startFetchDataAction(dataType) {
    let type
    switch(dataType) {
        case actionTypes.FETCH_DATA_TYPE_HOME:
            type = actionTypes.FETCH_HOME_DATA_START
            break
        case actionTypes.FETCH_DATA_TYPE_SYSTEM_TREE:
            type = actionTypes.FETCH_SYSTEM_TREE_START
            break
        case actionTypes.FETCH_DATA_TYPE_USER:
            type = actionTypes.LOADING_LOGIN_REGISTER
            break
        case actionTypes.FETCH_DATA_TYPE_SEARCH:
            type = actionTypes.FETCH_SEARCH_DATA_START
            break
        case actionTypes.FETCH_DATA_TYPE_COLLECT:
            type = actionTypes.FETCH_COLLECT_DATA_START
            break
        default:
            type = actionTypes.FETCH_HOME_DATA_START
    }
    return {
        type: type,
    }
}

export function getSystemTreeAction(systemTree) {
    return {
        type: actionTypes.FETCH_SYSTEM_TREE,
        systemTree,
    }
}

export function getSystemTreeFailureAction() {
    return {
        type: actionTypes.FETCH_SYSTEM_TREE_FAILURE,
    }
}

export function loginAction(userInfo) {
    return {
        type: actionTypes.LOGIN_SUCCESS,
        userInfo
    }
}

export function loginFailureAction() {
    return {
        type: actionTypes.LOGIN_FAILURE,
    }
}

export function registerAction(userInfo) {
    return {
        type: actionTypes.REGISTER_SUCCESS,
        userInfo
    }
}

export function registerFailureAction() {
    return {
        type: actionTypes.REGISTER_FAILURE,
    }
}

export function logoutAction() {
    return {
        type: actionTypes.LOGOUT_SUCCESS
    }
}

export function initLoginUserInfoAction(authInfo) {
    return {
        type: actionTypes.INIT_LOGIN_USERINFO,
        authInfo
    }
}

export function getUserCoinAction(coinInfo) {
    return {
        type: actionTypes.FETCH_USER_COIN,
        coinInfo,
    }
}

export function getSearchArticlesAction(articlesObj) {
    return {
        type: actionTypes.FETCH_SEARCH_ARTICLES,
        articlesObj,
    }
}

export function getSearchArticlesMoreAction(articlesObj) {
    return {
        type: actionTypes.FETCH_SEARCH_ARTICLES_MORE,
        articlesObj,
    }
}

export function getSearchArticlesFailureAction() {
    return {
        type: actionTypes.FETCH_SEARCH_ARTICLES_FAILURE
    }
}

export function clearSearchArticlesAction() {
    return {
        type: actionTypes.CLEAR_SEARCH_ARTICLES
    }
}

export function getCollectArticlesAction(articlesObj) {
    return {
        type: actionTypes.FETCH_COLLECT_ARTICLES,
        articlesObj,
    }
}

export function getCollectArticlesMoreAction(articlesObj) {
    return {
        type: actionTypes.FETCH_COLLECT_ARTICLES_MORE,
        articlesObj,
    }
}

export function getCollectArticlesFailureAction() {
    return {
        type: actionTypes.FETCH_COLLECT_ARTICLES_FAILURE
    }
}

export function updateHomeFavorArticleAction(isTop, index) {
    return {
        type: actionTypes.UPDATE_HOME_FAVOR_ARTICLE,
        isTop,
        index
    }
}

export function updateHomeUnfavorArticleAction(isTop, index) {
    return {
        type: actionTypes.UPDATE_HOME_UNFAVOR_ARTICLE,
        isTop,
        index
    }
}