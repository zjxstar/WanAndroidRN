/**
 * redux 的 action 各种 type 
 */

const actionTypes = {

    // Fetching data type
    FETCH_DATA_TYPE_HOME: 'HOME',
    FETCH_DATA_TYPE_SYSTEM_TREE: 'SYSTEM_TREE',
    FETCH_DATA_TYPE_USER: 'USER',

    // Home Screen
    FETCH_HOME_DATA_START: 'FETCH_HOME_DATA_START',
    FETCH_HOME_BANNER: 'FETCH_HOME_BANNER',
    FETCH_HOME_TOP_ARTICLES: 'FETCH_HOME_TOP_ARTICLES',
    FETCH_HOME_ARTICLES: 'FETCH_HOME_ARTICLES',
    FETCH_HOME_ARTICLES_MORE: 'FETCH_HOME_ARTICLES_MORE',
    FETCH_HOME_ARTICLES_FAILURE: 'FETCH_HOME_ARTICLES_FAILURE',

    // System Screen
    FETCH_SYSTEM_TREE_START: 'FETCH_SYSTEM_TREE_START',
    FETCH_SYSTEM_TREE: 'FETCH_SYSTEM_TREE',
    FETCH_SYSTEM_TREE_FAILURE: 'FETCH_SYSTEM_TREE_FAILURE',

    // Login、Register、Logout
    LOADING_LOGIN_REGISTER: 'LOADING_LOGIN_REGISTER',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGIN_FAILURE: 'LOGIN_FAILURE',
    REGISTER_SUCCESS: 'REGISTER_SUCCESS',
    REGISTER_FAILURE: 'REGISTER_FAILURE',
    LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
    INIT_LOGIN_USERINFO: 'INIT_LOGIN_USERINFO',

    // Coin
    FETCH_USER_COIN: "FETCH_USER_COIN"
}

export default actionTypes