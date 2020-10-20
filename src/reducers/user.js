import actionTypes from '../actions/actionTypes';

const initState = {
    isLoading: false,
    isLogin: false,
    userInfo: {},
}

const user = (state = initState, action) => {
    switch(action.type) {
        case actionTypes.LOADING_LOGIN_REGISTER:
            console.log('user isLoading')
            return {
                ...state,
                isLoading: true,
            }
        case actionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isLogin: true,
                userInfo: action.userInfo
            }
        case actionTypes.LOGIN_FAILURE:
            return {
                ...state,
                isLoading: false,
                isLogin: false,
            }
        case actionTypes.REGISTER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isLogin: true,
                userInfo: action.userInfo,
            }
        case actionTypes.REGISTER_FAILURE:
            return {
                ...state,
                isLoading: false,
                isLogin: false,
            }
        case actionTypes.LOGOUT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isLogin: false
            }
        case actionTypes.INIT_LOGIN_USERINFO:
            return {
                ...state,
                isLogin: action.authInfo.isLogin,
                userInfo: action.authInfo.userInfo,
            }
        default:
            return state
    }
}

export default user