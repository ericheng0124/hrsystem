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
              <!-- $event 实参 表示 下拉菜单的类型(add,edit,del) -->
              <el-dropdown style="margin-left: 25px;" @command="operateDept($event,data.id)">
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
    <!-- ref 可以获取dom的实力对象 ref也可以获取自定义组件的实力对象 -->
    <add-dept ref="addDept" :show-dialog.sync="showDialog" :current-node-id="currentNodeId" @updateDepartment="getDepartment" />
  </div>
</template>

<script>
import { delDepartment, getDepartment } from '@/api/department'
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
      },
      currentNodeId: null // 存储当前子节点的部门id
    }
  },
  created() {
    this.getDepartment()
  },
  methods: {
    async getDepartment() {
      const result = await getDepartment()
      // 调用方法将列表型数据转换成树形结构
      this.depts = transListToTreeData(result, 0)
    },
    // 操作部门的方法
    operateDept(type, id) {
      // console.log(type, id)
      if (type === 'add') {
        // 添加子部门
        this.showDialog = true
        this.currentNodeId = id
      } else if (type === 'edit') {
        // 编辑部门
        this.showDialog = true
        // 更新props属性 -> 异步动作
        this.currentNodeId = id // 记录id 用它获取数据
        // 要在子组件获取数据
        // 父组件调用子组件的方法来获取数据
        // 直接调用子组件方法 -> 同步动作
        // 等待前面的刷新渲染完成之后，再执行回调任务，即前面的props数据更新完毕，再执行回调函数
        this.$nextTick(() => {
          this.$refs.addDept.getDepartmentDetail() // this.$refs.addDept等同于子组件的this
        })
      } else {
        // 删除部门
        this.$confirm('您确认要删除该部门吗？', { confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning' }).then(async() => {
          await delDepartment(id)
          this.$message({
            type: 'success',
            message: '删除部门成功!'
          })
          this.getDepartment()
        })
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
