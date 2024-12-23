import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'

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

// 相应拦截器
service.interceptors.response.use((response) => {
  const { data, message, sucess } = response.data
  if (sucess) {
    return data
  } else {
    Message({ type: 'error', message: message })
    return Promise.reject(new Error(message))
  }
}, (error) => {
  // error.message
  Message({ type: 'error', message: 'error.message' })
  return Promise.reject(error)
})

export default service

