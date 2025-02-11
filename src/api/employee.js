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

// 下载导入员工信息的导入模板
export const getExportTemplate = () => {
  return request({
    url: '/sys/user/import/template',
    responseType: 'blob' // 申明使用blob格式接收二进制流数据
  })
}

// 上传excel文件的接口
export const uploadExcel = (data) => {
  return request({
    url: '/sys/user/import',
    method: 'post',
    data // data 的文件类型是form-data类型 因为是用于上传文件
  })
}

// 删除员工接口
export const delEmployee = (id) => {
  return request({
    url: `/sys/user/${id}`,
    method: 'delete'
  })
}
