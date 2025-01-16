<template>
  <div class="container">
    <div class="app-container">
      <!-- 角色管理的内容 -->
      <div class="role-operate">
        <el-button type="primary" size="mini" @click="showDialog=true">添加角色</el-button>
      </div>
      <!-- 放置table组件 -->
      <el-table :data="rileList">
        <!-- 放置列 -->
        <el-table-column
          type="index"
          width="80"
          align="center"
          label="序号"
        />
        <el-table-column width="200px" label="角色" align="center" prop="name" />
        <el-table-column width="200px" label="启用" align="center" prop="state">
          <!-- 自定义列结构 -->
          <template v-slot="{row}">
            {{ row.state===1?'已启用':row.state===0?'未启用':'无' }}
          </template>
        </el-table-column>
        <el-table-column label="描述" align="center" prop="description" />
        <el-table-column label="操作" align="center">
          <!-- 放置按钮 -->
          <template>
            <el-button size="mini" type="text">分配权限</el-button>
            <el-button size="mini" type="text">编辑</el-button>
            <el-button size="mini" type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 放置分页组件 -->
      <el-row type="flex" justify="center" style="height: 80px;" align="middle">
        <!-- 放置分页组件 -->
        <el-pagination
          layout="prev,pager,next"
          :total="pageParams.total"
          :page-size="pageParams.pagesize"
          :current-page="pageParams.page"
          @current-change="changePage"
        />
      </el-row>
    </div>
    <!-- 放置弹层 -->
    <el-dialog title="新增角色" width="500px" :visible.sync="showDialog" :close-on-click-modal="false" @close="close">
      <!-- 表单内容 -->
      <el-form ref="roleForm" :model="roleForm" :rules="rules" label-width="120px">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="roleForm.name" type="text" style="width:300px" size="mini" placeholder="请输入角色名称" />
        </el-form-item>
        <!-- 如果不需要效验 就不写prop属性 如果需要重置表单就需要写porp属性 -->
        <el-form-item label="启用" prop="state">
          <!-- active-value:设置开启的值为1 , inactive-value:设置关闭的值为0 -->
          <el-switch
            v-model="roleForm.state"
            :active-value="1"
            :inactive-value="0"
          />
        </el-form-item>
        <el-form-item label="角色描述" prop="description">
          <el-input v-model="roleForm.description" style="width:300px" size="mini" type="textarea" :rows="3" />
        </el-form-item>
        <el-form-item>
          <el-row type="flex" justify="center">
            <el-col :span="12" :pull="2">
              <el-button size="mini" type="primary" @click="btnOK">确定</el-button>
              <el-button size="mini" @click="close">取消</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { addRole, getRoleList } from '@/api/role'
export default {
  neme: 'Role',
  data() {
    return {
      rileList: [],
      // 将分页信息放入到一个对象中
      pageParams: {
        page: 1, // 当前是第几页 即element ui 中的 current-page
        pagesize: 5, // 每页多少条
        total: 0
      },
      showDialog: false, // 控制弹层显示和隐藏的属性
      roleForm: {
        name: '',
        description: '',
        state: 0 // 角色的启用状态 默认为未启用  关闭为0  开启为1
      },
      rules: {
        name: [
          { required: true, message: '角色名称不能为空', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '角色描述不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    async getRoleList() {
      const { rows, total } = await getRoleList(this.pageParams)
      this.rileList = rows
      this.pageParams.total = total
    },
    // 切换分页时请求新的数据
    changePage(newPage) {
      // alert(newPage)
      this.pageParams.page = newPage // 赋值当前页码
      this.getRoleList()
    },
    close() {
      this.$refs.roleForm.resetFields()
      this.showDialog = false
    },
    async btnOK() {
      // 效验表单
      this.$refs.roleForm.validate(async isOK => {
        if (isOK) {
          // 发送请求新增表单
          await addRole(this.roleForm)
        }
        this.$message.success(`新增角色${this.roleForm.name}成功`)
      })
      // 发送请求获取新的数据
      await this.getRoleList()
      // 关闭弹层
      this.close()
    }
  }
}
</script>

<style scoped>
.role-operate{
  padding: 10px;
}
</style>
