import actionTypes from '../actions/actionTypes';

const initState = {
    coinCount: 0,
    level: 0,
    rank: 0,
}

const coin = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_USER_COIN:
            return {
                ...state,
                coinCount: action.coinInfo.coinCount,
                level: action.coinInfo.level,
                rank: action.coinInfo.rank,
            }
        default:
            return state
    }
}

export default coin