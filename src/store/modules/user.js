import { getToken, setToken, removeToken } from '@/utils/auth'
import { login, getUserInfo } from '@/api/user'

const state = {
  token: getToken(), // 从缓存中读取输出值
  userInfo: {} // 用户基本信息
}

const mutations = {
  setToken(state, token) {
    state.token = token
    // 同步到缓存中
    setToken(token)
  },
  removeToken(state) {
    state.token = null
    removeToken()
  },
  setUserInfo(state, userInfo) {
    state.userInfo = userInfo
  }
}

const actions = {
  async login(context, data) {
    // console.log(data)
    // todo:调用登陆接口
    const token = await login(data)
    // console.log(token)
    // 返回一个 token
    context.commit('setToken', token)
  },
  // 获取用户基本资料
  async getUserInfo(context) {
    console.log('调用action')
    const res = await getUserInfo()
    context.commit('setUserInfo', res)
    console.log(res)
  }
}

export default {
  namespaced: true, // 开启命名空间
  state,
  mutations,
  actions
}
