<template>
  <div class="container">
    <div class="app-container">
      <!-- 组织架构 -->
      <!-- 展示树形结构 -->
      <!--
        data：展示的数据
        props：配置选项
        default-expand-all：是否默认展开 默认值为：false
       -->
      <el-tree :data="depts" :props="defaultProps" default-expand-all :expand-on-click-node="false">
        <!-- 节点结构 -->
        <!-- v-slot="{node,data}" 只能作用在template标签上 -->
        <template v-slot="{data}">
          <el-row style="width: 100%;height: 40px;" type="flex" justify="space-around" align="middle">
            <el-col>{{ data.name }}</el-col>
            <el-col :span="4">
              <span class="tree-manager">{{ data.managerName }}</span>
              <el-dropdown style="margin-left: 25px;" @command="operateDept">
                <!-- 下拉菜单显示区域内容 -->
                <span class="el-dropdown-link">
                  操作<i class="el-icon-arrow-down el-icon--right" />
                </span>
                <!-- 下拉菜单选项 -->
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="add">添加子部门</el-dropdown-item>
                  <el-dropdown-item command="edit">编辑部门</el-dropdown-item>
                  <el-dropdown-item command="del">删除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
          </el-row>
        </template>
      </el-tree>
    </div>
    <!-- 放置弹层 -->
    <!-- :show-dialog.sync 表示会接收子组件的事件 update:showDialog 的值 => 给show-Dialog属性 -->
    <add-dept :show-dialog.sync="showDialog" />
  </div>
</template>

<script>
import { getDepartment } from '@/api/department'
import { transListToTreeData } from '@/utils'
import AddDept from './components/add-dept.vue'

export default {
  neme: 'Department',
  components: { AddDept },
  data() {
    return {
      showDialog: false, // 控制弹层的显示和隐藏
      depts: [], // 数据树形
      defaultProps: {
        label: 'name', // 要显示的字段的名字
        children: 'children'
      }
    }
  },
  created() {
    this.getDepartment()
  },
  methods: {
    async getDepartment() {
      const result = await getDepartment()
      this.depts = transListToTreeData(result, 0)
    },
    // 操作部门的方法
    operateDept(type) {
      if (type === 'add') {
        // 添加子部门
        this.showDialog = true
      }
    }
  }
}
</script>

<style scoped>
.app-container{
  padding:30px 140px;
  font-size: 14px;
}
.tree-manager{
  width: 50px;
  display: inline-block;
  margin:10px;
}
</style>
