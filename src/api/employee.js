/*
  获取员工列表
*/
import request from '@/utils/request'

// 获取员工信息列表数据
export const getEmployeeList = (params) => {
  return request({
    url: '/sys/user',
    params
  })
}

// 导出员工信息excel
export const exportEmployee = () => {
  return request({
    url: '/sys/user/export',
    // 二进制流文件,需要改变一个接收数据格式类型
    responseType: 'blob' // 申明使用blob格式接收二进制流数据
  })
}
