import { combineReducers } from 'redux';
import home from './home';
import systemTree from './systemTree';
import user from './user';
import coin from './coin';
import search from './search';
import collect from './collect';
import refresh from './refresh';

export default combineReducers({
    home,
    systemTree,
    user,
    coin,
    search,
    collect,
    refresh,
})