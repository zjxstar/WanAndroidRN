import actionTypes from '../actions/actionTypes';

const initState = {
    systemTree: [],
    isFetching: false,
}

const systemTree = (state = initState, action) => {
    switch(action.type) {
        case actionTypes.FETCH_SYSTEM_TREE_START:
            return {
                ...state,
                isFetching: true
            }
        case actionTypes.FETCH_SYSTEM_TREE:
            return {
                ...state,
                systemTree: action.systemTree,
                isFetching: false
            }
        case actionTypes.FETCH_SYSTEM_TREE_FAILURE:
            return {
                ...state,
                isFetching: false
            }
        default:
            return state
    }
}

export default systemTree