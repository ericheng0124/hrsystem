import { getToken, setToken, removeToken } from '@/utils/auth'
import { login } from '@/api/user'

const state = {
  token: getToken() // 从缓存中读取输出值
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
  }
}

export default {
  namespaced: true, // 开启命名空间
  state,
  mutations,
  actions
}
