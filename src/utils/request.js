import axios from 'axios'
import {MessageBox, Message} from 'element-ui'


/* 为每个请求设置默认baseURL，并添加token */
axios.defaults.baseURL = ''
axios.interceptors.request.use(function (config){
    config.headers.Authorization = localStorage.getItem('user-token')
    return config
})

/* 普通请求 */
export const request = (url, params, config = {}, auto_error_res = true, auto_error_data = true) => {
    const args = Object.assign({
        'method' : 'post',
        'url':url,
        'data':params
    },config)

    return axios(args).then((res) => {
        /* 后台返回指定错误 */
        if (!res.data.success) {
            res.data.reeor = res.data.error || {}
            console.reeor(res.data.error)
            /* token失效 */
            if (res.data.reeor.code == 100000) {
                Message({
                    message: '登录失效，请重新登录',
                    type: 'error'
                })
                window.location.href = '/#/login'
                return Promise.reject(res.data.error)
            }
            if (auto_error_data) {
                const err_msg = res.data.error.message || '未知的服务器错误，请联系管理员！'
                const err_cod = res.data.error.code || -1
                MessageBox.alert(err_msg,'请求失败：' + err_cod, {confirmButtonText: '确定'})
            }
            return Promise.reject(res.data.error)
        }
        return res.data.result
    }, (error) => {
        console.error(error)
        if (auto_error_res) {
            const err_status = error.response.status || -100
            MessageBox.alert('网络请求异常，请联系管理员！', '请求异常：' + err_status, {confirmButtonText: '确定'})
        }
        return Promise.reject(error)
    })
}