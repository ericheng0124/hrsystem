<template>
  <div class="container">
    <div class="app-container">
      <!-- 角色管理的内容 -->
      <div class="role-operate">
        <el-button type="primary" size="mini" @click="showDialog=true">添加角色</el-button>
      </div>
      <!-- 放置table组件 -->
      <el-table :data="roleList">
        <!-- 放置列 -->
        <el-table-column
          type="index"
          width="80"
          align="center"
          label="序号"
        />
        <el-table-column width="200px" label="角色" align="center" prop="name">
          <template v-slot="{row}">
            <!-- 条件判断 -->
            <el-input v-if="row.isEdit" v-model="row.editRow.name" size="mini" />
            <span v-else>{{ row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column width="200px" label="启用" align="center" prop="state">
          <!-- 自定义列结构 -->
          <template v-slot="{row}">
            <el-switch v-if="row.isEdit" v-model="row.editRow.state" :active-value="1" :inactive-value="0" />
            <span v-else>{{ row.state===1?'已启用':row.state===0?'未启用':'无' }}</span>
          </template>
        </el-table-column>
        <el-table-column label="描述" align="center" prop="description">
          <template v-slot="{row}">
            <el-input v-if="row.isEdit" v-model="row.editRow.description" type="textarea" size="mini" />
            <span v-else>{{ row.description }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <!-- 放置按钮 -->
          <template v-slot="{row}">
            <!-- 编辑状态 -->
            <template v-if="row.isEdit">
              <el-button size="mini" type="primary" @click="btnEditOK(row)">更新</el-button>
              <el-button size="mini" @click="row.isEdit = false">取消</el-button>
            </template>
            <!-- 非编辑状态 -->
            <template v-else>
              <el-button size="mini" type="text">分配权限</el-button>
              <el-button size="mini" type="text" @click="btnEditRow(row)">编辑</el-button>
              <el-popconfirm
                title="确定删除改角色吗？"
                @onConfirm="confirmDel(row.id)"
              >
                <el-button slot="reference" style="margin-left: 10px;" size="mini" type="text">删除</el-button>
              </el-popconfirm>
            </template>
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
import { addRole, getRoleList, updateRole, delRole } from '@/api/role'
export default {
  neme: 'Role',
  data() {
    return {
      roleList: [],
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
      this.roleList = rows
      this.pageParams.total = total
      // 针对每一行数据添加一个编辑状态的标记
      this.roleList.forEach(item => {
        // item.isEdit = false // 添加一个属性，初始值为false
        // 数据响应式问题  数据变化  视图更新
        // 动态添加的属性 不具备响应式特点
        // this.$set(目标对象，需要添加的属性名称，添加的属性的初始值) 可以针对目标对象 添加的属性 添加响应式
        this.$set(item, 'isEdit', false)
        // 创建每一行的缓存数据
        this.$set(item, 'editRow', {
          name: item.name,
          state: item.state,
          description: item.description
        })
      })
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
    },
    // 点击编辑行
    btnEditRow(row) {
      row.isEdit = !row.isEdit
      console.log(row)
      // 更新行缓存数据
      row.editRow = {
        name: row.name,
        state: row.state,
        description: row.description
      }
    },
    // 点击更新时触发
    async btnEditOK(row) {
      // console.log(row.editRow)
      // 判断是否有输入name和description
      if (row.editRow.name && row.editRow.description) {
        // 发送请求更新数据
        await updateRole({ ...row.editRow, id: row.id })
        // 更新数据
        this.$message.success('更新角色成功')
        // 更新显示数据
        // row.name = row.editRow.name // eslint效验的误判
        // Object.assign(target,source)
        Object.assign(row, {
          ...row.editRow,
          isEdit: false // 退出编辑模式
        }) // 规避eslint的误判
      } else {
        this.$message.error('角色名称和角色描述不能为空')
      }
    },
    // 删除角色的方法
    async confirmDel(id) {
      await delRole(id) // 发请求后端删除数据
      this.$message.success('删除角色成功！')
      // 删除的如果是最后一个
      if (this.roleList.length === 1) {
        this.pageParams.page - 1
      }
      // 重新加载数据
      this.getRoleList()
    }
  }
}
</script>

<style scoped>
.role-operate{
  padding: 10px;
}
</style>
