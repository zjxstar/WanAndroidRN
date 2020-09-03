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