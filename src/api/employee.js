/*
  获取员工列表
*/
import request from '@/utils/request'

export const getEmployeeList = (params) => {
  return request({
    url: '/sys/user',
    params
  })
}
