import storageUtil from './storageUtil'

const userInfoKey = '@userInfo'
const cookieKey = '@cookie'

export default class AuthUtil {

    static saveUserInfo = info => {
        return storageUtil.save(userInfoKey, info);
    };

    static getUserInfo = () => {
        return storageUtil.get(userInfoKey);
    };

    static removeUserInfo = () => {
        return storageUtil.delete(userInfoKey);
    };

    static saveCookie(cookie) {
        return storageUtil.save(cookieKey, cookie);
    }

    static getCookie = () => {
        return storageUtil.get(cookieKey);
    };

    static removeCookie = () => {
        return storageUtil.delete(cookieKey);
    };
}