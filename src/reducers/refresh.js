import actionTypes from '../actions/actionTypes';

const initState = {
    forceRefresh: false,
}

const refresh = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.NOTIFY_PAGE_FORCE_REFRESH:
            return {
                ...state,
                isLoading: true,
            }
        default:
            return state
    }
}

export default refresh