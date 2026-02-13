import axios from 'axios'

// 创建axios实例
const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000
})

// 请求拦截器
request.interceptors.request.use(
  config => {
    // 从localStorage获取token
    const token = localStorage.getItem('token')
    console.log('请求拦截器 - token:', token ? '存在' : '不存在')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    console.error('请求拦截器错误:', error)
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  response => {
    const res = response.data
    console.log('响应拦截器 - 响应数据:', res)
    // 如果返回的状态码不是200，说明接口有问题
    if (res.code !== '200') {
      console.error('接口错误:', res.msg)
      return Promise.reject(new Error(res.msg || 'Error'))
    }
    return res
  },
  error => {
    console.error('响应错误:', error)
    // 处理401未授权错误
    if (error.response?.status === 401) {
      console.log('401 未授权，清除token')
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    // 处理403禁止访问错误
    if (error.response?.status === 403) {
      console.log('403 禁止访问，清除token并跳转登录页')
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default request
