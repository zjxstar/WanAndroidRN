import axios from 'axios'
import { get as getParse } from 'lodash';
import AuthUtil from '../utils/authUtil';

/**
 * 网络请求帮助类
 */

const instance = axios.create({
    baseURL: 'https://www.wanandroid.com/',
    timeout: 10000,
    headers: {
        'Content-Type': 'multipart/form-data;charset=utf-8',
    }
})

// 设置请求时的拦截器，补充Cookie
instance.interceptors.request.use(
    async config => {
        if (config.method === 'post') {
            let data = new FormData()
            for (const i in config.data) {
                data.append(i, config.data[i])
            }
            config.data = data
        }
        const cookie = await AuthUtil.getCookie();
        if (config.url !== 'user/login' && cookie) {
            config.headers.cookie = cookie;
        }
        return config
}, error => {
    return Promise.reject(error)
})

// 设置请求返回的拦截器，统一处理返回结果
instance.interceptors.response.use(response => {
    let { data } = response
    if (data.errorCode === 0) {
        handleCookie(response)
        return Promise.resolve(data)
    }
    return Promise.reject(data.errorMsg || '请求失败')
}, error => {
    return Promise.reject(error)
})

async function handleCookie(response) {
    const cookie = getParse(response, 'headers.set-cookie[0]', '');
    if (cookie) {
        await AuthUtil.saveCookie(cookie);
    }
}

export function get(api, params) {
    return new Promise(async (resolve, reject) => {
        try {
            let res = await instance.get(api, {
                params: params
            })
            resolve(res)
        } catch (error) {
            let errorMsg = `路径: ${api} \n报错信息: ${error}`
            reject(errorMsg)
        }
    })
}

export function post(api, params) {
    return new Promise(async (resolve, reject) => {
        try {
            let res = await instance.post(api, params);
            resolve(res);
        } catch (error) {
            const errorMsg = `请求报错路径: ${api} \n请求报错信息: ${error}`
            reject(error)
        }
    })
}