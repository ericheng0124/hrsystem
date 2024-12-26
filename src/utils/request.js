import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'
import router from '@/router'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // 基础地址
  timeout: 10000 // 请求超时时间
}) // 创建一个新的axios实例

// 请求拦截器 2个参数，都是回调函数，成功了执行第一个，失败了执行第二个
service.interceptors.request.use((config) => {
  // 注入token
  // store.getters.token 放入 请求头里面
  if (store.getters.token) {
    config.headers.Authorization = `Bearer ${store.getters.token}`
  }
  return config
}, (error) => {
  // 失败执行 Promise
  return Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use((response) => {
  const { data, message, success } = response.data // 默认json格式
  if (success) {
    return data
  } else {
    Message({ type: 'error', message })
    return Promise.reject(new Error(message))
  }
}, async(error) => {
  if (error.response.status === 401) {
    // 说明token超时了
    Message({ type: 'warning', message: '登录超时，请重新登录' })
    await store.dispatch('user/logout')
    // 跳转登录页
    router.push('/login')
    return Promise.reject(error)
  }
  // error.message
  Message({ type: 'error', message: error.message })
  return Promise.reject(error)
})

export default service

