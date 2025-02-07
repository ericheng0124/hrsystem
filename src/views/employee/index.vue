<template>
  <div class="container">
    <div class="app-container">
      <div class="left">
        <!-- 搜索框 -->
        <el-input style="margin-bottom:10px" type="text" prefix-icon="el-icon-search" size="small" placeholder="输入员工姓名全员搜索" />
        <!-- 树形组件 -->
        <el-tree
          ref="deptTree"
          :data="depts"
          :props="defaultProps"
          default-expand-all
          :expand-on-click-node="false"
          :highlight-current="true"
          node-key="id"
          @current-change="selectNode"
        />
      </div>
      <div class="right">
        <el-row class="opeate-tools" type="flex" justify="end">
          <el-button size="mini" type="primary">添加员工</el-button>
          <el-button size="mini">excel导入</el-button>
          <el-button size="mini">excel导出</el-button>
        </el-row>
        <!-- 表格组件 -->
        <el-table :data="employeeList">
          <el-table-column prop="staffPhoto" align="center" label="头像" />
          <el-table-column prop="username" label="姓名" />
          <el-table-column prop="mobile" label="手机号" sortable />
          <el-table-column prop="workNumber" label="工号" sortable />
          <el-table-column prop="formOfEmployment" label="聘用形式" />
          <el-table-column prop="departmentName" label="部门" />
          <el-table-column prop="timeOfEntry" label="入职时间" sortable />
          <el-table-column align="center" label="操作" width="280px">
            <template>
              <el-button type="text" size="mini">查看</el-button>
              <el-button type="text" size="mini">角色</el-button>
              <el-button type="text" size="mini">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-row style="height: 60px;" align="middle" type="flex" justify="end">
          <el-pagination
            layout="total, prev, pager, next"
            :total="100"
          />
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import { getDepartment } from '@/api/department'
import { transListToTreeData } from '@/utils/index'
import { getEmployeeList } from '@/api/employee'
export default {
  name: 'Employee',
  data() {
    return {
      depts: [], // 组织结构
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      queryParams: {
        departmentId: null
      },
      employeeList: []
    }
  },
  created() {
    this.getDepartment()
  },
  methods: {
    // 获取部门列表
    async getDepartment() {
      const result = await getDepartment()
      // 转换为树形结构
      this.depts = transListToTreeData(result, 0)
      this.queryParams.departmentId = this.depts[0].id
      // 设置选中节点
      // 树形结构的渲染是异步的，使用 $nextTick 方法等到渲染完成后再设置选中节点
      this.$nextTick(() => {
        this.$refs.deptTree.setCurrentKey(this.queryParams.departmentId)
      })
      // 此时参数才记录的选中的部门id
      this.getEmployeeList()
    },
    selectNode(node) {
      // console.log(node)
      // 重新记录的id
      this.queryParams.departmentId = node.id
      this.getEmployeeList()
    },
    // 获取员工列表的方法
    async getEmployeeList() {
      const { rows } = await getEmployeeList(this.queryParams)
      this.employeeList = rows
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  background: #fff;
  display: flex;
  .left {
    width: 280px;
    padding: 20px;
    border-right: 1px solid #eaeef4;
  }
  .right {
    flex: 1;
    padding: 20px;
    .opeate-tools {
      margin:10px ;
    }
    .username {
      height: 30px;
      width: 30px;
      line-height: 30px;
      text-align: center;
      border-radius: 50%;
      color: #fff;
      background: #04C9BE;
      font-size: 12px;
      display:inline-block;
    }
  }
}

</style>
