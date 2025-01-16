/*
  用于角色管理的请求
*/

// 获取角色列表
import request from '@/utils/request'

export const getRoleList = (params) => {
  return request({
    url: '/sys/role',
    params // 查询参数
  })
}

// 新增角色
export const addRole = (data) => {
  request({
    url: '/sys/role',
    method: 'post',
    data
  })
}
