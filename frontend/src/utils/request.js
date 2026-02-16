import axios from 'axios'
import { ElMessage } from 'element-plus'
import { getToken, clearToken, addPendingRequest, removePendingRequest, markAuthenticated } from './auth'

// 创建axios实例
const request = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000
})

// 请求拦截器
request.interceptors.request.use(
  config => {
    // 从localStorage获取token
    const token = getToken()
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

    // 成功响应，标记认证为有效
    if (res.code === '200') {
      markAuthenticated()
    }

    // 业务错误（不等于200），显示错误消息但不跳转
    if (res.code !== '200') {
      console.warn('业务错误:', res.msg)

      // 只在非认证相关错误时显示消息
      if (res.msg && !res.msg.includes('登录') && !res.msg.includes('认证')) {
        ElMessage.warning(res.msg)
      }

      return Promise.reject(new Error(res.msg || 'Error'))
    }

    return res
  },
  error => {
    console.error('响应错误:', error)

    // HTTP 错误状态码处理
    const status = error.response?.status
    const url = error.config?.url || ''

    // 生成唯一请求ID
    const requestId = `${url}_${Date.now()}`

    if (status === 401 || status === 403) {
      // 认证错误 - 不自动清除token，不自动跳转
      // 只提示用户，让用户决定怎么做

      // 防止同一时间的多个请求重复提示
      if (!hasPendingAuthError()) {
        addPendingRequest(requestId)

        ElMessage({
          message: '登录已过期，请重新登录',
          type: 'warning',
          duration: 3000,
          showClose: true
        })

        // 3秒后移除标记
        setTimeout(() => {
          removePendingRequest(requestId)
        }, 3000)
      }

      // 清除token（因为已经无效了）
      clearToken()

      // 不自动跳转，让用户自己决定
      // 如果需要跳转，可以在组件中处理
      return Promise.reject(error)
    }

    if (status === 404) {
      ElMessage.error('请求的资源不存在')
      return Promise.reject(error)
    }

    if (status === 500) {
      ElMessage.error('服务器错误，请稍后再试')
      return Promise.reject(error)
    }

    if (status === 502 || status === 503) {
      ElMessage.error('服务暂时不可用，请稍后再试')
      return Promise.reject(error)
    }

    // 网络错误
    if (!status) {
      ElMessage.error('网络连接失败，请检查网络')
      return Promise.reject(error)
    }

    // 其他错误
    const errorMsg = error.response?.data?.msg || error.message || '请求失败'
    ElMessage.error(errorMsg)
    return Promise.reject(error)
  }
)

// 辅助函数：检查是否有待处理的认证错误
function hasPendingAuthError() {
  // 通过检查是否有401错误的标记来判断
  return sessionStorage.getItem('auth_error_pending') === 'true'
}

export default request
