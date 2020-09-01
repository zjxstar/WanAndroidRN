import actionTypes from '../actions/actionTypes';

const initialState = {
    homeBanner: [] // 首页banner
}

const home = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.FETCH_HOME_BANNER:
            return {
                ...state,
                homeBanner: action.homeBanner
            }
        default:
            return state
    }
}

export default home