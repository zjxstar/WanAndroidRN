import axios from 'axios'

/**
 * 网络请求帮助类
 */

const instance = axios.create({
    baseURL: 'https://www.wanandroid.com/',
    timeout: 5000,
})

// 设置请求时的拦截器，补充Cookie
instance.interceptors.request.use(config => {
    console.log('default config: ', config)
    return config
}, error => {
    return Promise.reject(error)
})

// 设置请求返回的拦截器，统一处理返回结果
instance.interceptors.response.use(response => {
    let { data } = response
    // TODO 缺少保存Cookie的操作
    if (data.errorCode === 0) {
        return data
    }
    return Promise.reject(data.errorMsg || '请求失败')
}, error => {
    return Promise.reject(error)
})

export function get(api, params) {
    return new Promise((resolve, reject) => {
        instance.get(api, {
            params: params
        }).then(res => {
            resolve(res)
        }).catch(err => {
            console.log(`路径: ${url} \n报错信息: ${err}`)
            reject(err)
        })
    })
}

export function post(api, params) {
    return new Promise((resolve, reject) => {
        instance.post(api, params)
            .then(res => {
                resolve(res)
            }).catch(err => {
                console.log(`路径: ${url} \n报错信息: ${err}`)
                reject(err)
            })
    })
}