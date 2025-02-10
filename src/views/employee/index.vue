<template>
  <div class="container">
    <div class="app-container">
      <div class="left">
        <!-- 搜索框 -->
        <el-input
          v-model="queryParams.keyword"
          style="margin-bottom:10px"
          type="text"
          prefix-icon="el-icon-search"
          size="small"
          placeholder="输入员工姓名全员搜索"
          @input="changeValue"
        />
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
          <el-button size="mini" @click="showExcelDialog=true">excel导入</el-button>
          <el-button size="mini" @click="exportEmployee">excel导出</el-button>
        </el-row>
        <!-- 表格组件 -->
        <el-table :data="employeeList">
          <el-table-column prop="staffPhoto" align="center" label="头像">
            <template v-slot="{row}">
              <el-avatar v-if="row.staffPhoto" :src="row.staffPhoto" :size="30" />
              <span v-else class="username">{{ row.username.charAt(0) }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="username" label="姓名" />
          <el-table-column prop="mobile" label="手机号" sortable />
          <el-table-column prop="workNumber" label="工号" sortable />
          <el-table-column prop="formOfEmployment" label="聘用形式">
            <template v-slot="{row}">
              <span v-if="row.formOfEmployment === 1">正式</span>
              <span v-else-if="row.formOfEmployment === 2">非正式</span>
              <span v-else>无</span>
            </template>
          </el-table-column>
          <el-table-column prop="departmentName" label="部门" />
          <el-table-column prop="timeOfEntry" label="入职时间" sortable />
          <el-table-column label="操作" width="280px">
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
            :total="total"
            :current-page="queryParams.page"
            :page-size="queryParams.pageSize"
            @current-change="changePage"
          />
        </el-row>
      </div>
    </div>
    <import-excel :show-excel-dialog.sync="showExcelDialog" />
  </div>
</template>

<script>
import { getDepartment } from '@/api/department'
import { transListToTreeData } from '@/utils/index'
import { getEmployeeList, exportEmployee } from '@/api/employee'
import FileSaver from 'file-saver'
import ImportExcel from './components/import-excel.vue'
export default {
  name: 'Employee',
  components: {
    ImportExcel
  },
  data() {
    return {
      depts: [], // 组织结构
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      // 存储查询参数
      queryParams: {
        departmentId: null,
        page: 1, // 当前页码，初始值为1
        pageSize: 10, // 每页显示条数
        keyword: '' // 搜索关键字
      },
      employeeList: [], // 存储员工列表数据
      total: 0, // 记录当前查询员工的总数
      showExcelDialog: false // 控制导入excel的弹窗显示和隐藏
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
      this.queryParams.departmentId = node.id // 更新选中的部门id
      this.queryParams.page = 1 // 重置页码
      this.getEmployeeList()
    },
    // 获取员工列表的方法
    async getEmployeeList() {
      const { rows, total } = await getEmployeeList(this.queryParams)
      this.employeeList = rows
      this.total = total
    },
    // 切换页面的事件
    changePage(newPage) {
      // console.log(newPage)
      this.queryParams.page = newPage // 更新当前页码
      this.getEmployeeList()
    },
    // 搜索框输入事件
    changeValue() {
      // console.log(this.queryParams.keyword)
      // 防抖延迟处理
      // 使用定时器 控制 单位时间内只执行最后一次
      // 给this的实例上赋值一个timer属性（非响应式），用来存储定时器
      clearTimeout(this.timer) // 清理上一次的定时器
      this.timer = setTimeout(() => {
        this.queryParams.page = 1 // 重置页码
        this.getEmployeeList()
      }, 300)
    },
    // 导出员工信息excel
    async exportEmployee() {
      // console.log('导出员工信息')
      const result = await exportEmployee()
      console.log(result) // 使用一个npm的file-saver库来实现文件下载
      // FileSaver.saveAs(blob对象，文件名称)
      FileSaver.saveAs(result, '员工信息表.xlsx') // 下载文件
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
