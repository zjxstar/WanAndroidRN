import { 
    getHomeBannerAction, 
    getHomeTopArticlesAction,
    getHomeArticlesMoreAction,
    getHomeArticlesFailureAction,
    getHomeArticlesAction
} from './actionCreator';
import { 
    getHomeBanner, 
    getHomeTopArticles,
    getHomeArticles
} from '../api';

/**
 * 拉取首页Banner图
 */
export function fetchHomeBanner() {
    return dispatch => {
        return getHomeBanner().then(
            res => dispatch(getHomeBannerAction(res.data))
        )
    }
}

/**
 * 拉取首页置顶文章列表
 */
export function fetchHomeTopArticles() {
    return dispatch => {
        return getHomeTopArticles().then(
            res => dispatch(getHomeTopArticlesAction(res.data))
        )
    }
}

/**
 * 拉取首页文章列表第一页数据
 */
export function fetchHomeArticles() {
    return dispatch => {
        return getHomeArticles().then(
            res => dispatch(getHomeArticlesAction(res.data))
        ).catch(
            err => dispatch(getHomeArticlesFailureAction())
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
            err => dispatch(getHomeArticlesFailureAction())
        )
    }
}