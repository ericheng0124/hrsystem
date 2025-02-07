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

// 更新角色接口
export const updateRole = (data) => {
  return request({
    url: `/sys/role/${data.id}`,
    method: 'put',
    data
  })
}

// 删除角色接口
export const delRole = (id) => {
  return request({
    url: `/sys/role/${id}`,
    method: 'delete'
  })
}
