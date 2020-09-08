import actionTypes from '../actions/actionTypes';

const initialState = {
    homeBanner: [], // 首页banner
    topArticles: [], // 置顶文章列表
    page: 0, // 分页页码从0开始
    articlesObj: {}, // 服务端返回的是对象
    articles: [], // 真正的文章列表，在articles的datas字段
    isFullData: false // 是否已经加载完全部数据，没有加载更多了
}

const home = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.FETCH_HOME_BANNER:
            return {
                ...state,
                homeBanner: action.homeBanner
            }
        case actionTypes.FETCH_HOME_TOP_ARTICLES:
            return {
                ...state,
                topArticles: action.topArticles
            }
        case actionTypes.FETCH_HOME_ARTICLES:
            return {
                ...state,
                page: 1,
                articlesObj: action.articlesObj,
                articles: action.articlesObj.datas,
                isFullData: action.articlesObj.curPage === action.articlesObj.pageCount
            }
        case actionTypes.FETCH_HOME_ARTICLES_MORE:
            return {
                ...state,
                page: ++state.page,
                articles: state.articles.concat(action.articlesObj.datas), // 添加新数据
                isFullData: action.articlesObj.datas.length === 0
            }
        case actionTypes.FETCH_HOME_ARTICLES_FAILURE:
            return state
        default:
            return state
    }
}

export default home