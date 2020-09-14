import { 
    getHomeBannerAction, 
    getHomeTopArticlesAction,
    getHomeArticlesMoreAction,
    getHomeArticlesFailureAction,
    getHomeArticlesAction,
    getSystemTreeAction,
    startFetchDataAction,
    getSystemTreeFailureAction,
} from './actionCreator';
import { 
    getHomeBanner, 
    getHomeTopArticles,
    getHomeArticles,
    getSystemTree,
} from '../api';
import actionTypes from '../actions/actionTypes';

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

