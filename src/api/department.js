import request from '@/utils/request'

/*
  获取组织架构数据
*/

export const getDepartment = () => {
  return request({
    url: '/company/department'
  })
}

/*
  获取部门负责人数据
*/
export const getManagerList = () => {
  return request({
    url: '/sys/user/simple'
  })
}

/*
  添加部门
*/
export const addDepartment = (data) => {
  return request({
    url: '/company/department',
    method: 'post',
    data
  })
}

/*
  获取部门详情
*/
export const getDepartmentDetail = (id) => {
  return request({
    url: `/company/department/${id}`
  })
}

/*
  更新部门
*/
export const updateDepartment = (data) => {
  return request({
    url: `/company/department/${data.id}`,
    method: 'put',
    data
  })
}

/*
  删除部门的请求
*/
export const delDepartment = (id) => {
  return request({
    url: `/company/department/${id}`,
    method: 'delete'
  })
}
