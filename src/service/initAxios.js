import axios from 'axios';
import qs from 'querystring'
const BASE_URL = 'https://www.wanandroid.com/'

/**
 * 初始化 Axios 的配置
 */
export function initAxios() {
    axios.defaults.baseURL = BASE_URL
    axios.defaults.timeout = 6000
    // 设置请求时的拦截器，补充Cookie
    axios.interceptors.request.use( config => {
        return config
    }, error => {
        return Promise.reject(error)
    })
    // 设置请求返回的拦截器，统一处理返回结果
    axios.interceptors.response.use(response => {
        let { data } = response
        // TODO 缺少保存Cookie的操作
        if (data.errorCode === 0) {
            return Promise.resolve(data)
        }
        return Promise.reject(data.errorMsg || '请求失败')        
    }, error => {
        return Promise.reject(error)
    })
}