import actionTypes from '../actions/actionTypes';

const initialState = {
    isFetching: false,
    page: 0, // 分页页码从0开始
    articlesObj: {}, // 服务端返回的是对象
    articles: [], // 真正的文章列表，在articles的datas字段
    isFullData: false, // 是否已经加载完全部数据，没有加载更多了
}

const collect = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_COLLECT_DATA_START:
            return {
                ...state,
                isFetching: true,
            }
        case actionTypes.FETCH_COLLECT_ARTICLES:
            return {
                ...state,
                isFetching: false,
                page: 1,
                articlesObj: action.articlesObj,
                articles: action.articlesObj.datas,
                isFullData: action.articlesObj.curPage === action.articlesObj.pageCount
            }
        case actionTypes.FETCH_COLLECT_ARTICLES_MORE:
            return {
                ...state,
                page: ++state.page,
                articles: state.articles.concat(action.articlesObj.datas), // 添加新数据
                isFullData: action.articlesObj.datas.length === 0
            }
        case actionTypes.FETCH_COLLECT_ARTICLES_FAILURE:
            return {
                ...state,
                isFetching: false,
            }
        default:
            return state
    }
}

export default collect