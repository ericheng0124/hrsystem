import request from '@/utils/request'

// 登录
export function login(data) {
  return request({
    url: '/sys/login',
    method: 'post',
    data
  })
}

// 获取用户资料
export const getUserInfo = () => {
  return request({
    url: '/sys/profile'
  })
}

// 修改用户密码
export const updateUserPassword = (data) => {
  return request({
    url: '/sys/user/updatePass',
    method: 'put',
    data
  })
}
