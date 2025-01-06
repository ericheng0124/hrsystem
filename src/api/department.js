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
