<template>
  <div class="container">
    <div class="app-container">
      <!-- 角色管理的内容 -->
      <div class="role-operate">
        <el-button type="primary" size="mini">添加角色</el-button>
      </div>
      <!-- 放置table组件 -->
      <el-table :data="rows">
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
      <el-row type="flex" justify="end" style="height: 60px;" align="middle">
        <!-- 放置分页组件 -->
        <el-pagination background layout="prev,pager,next" :total="total" />
      </el-row>
    </div>
  </div>
</template>

<script>
import { getRoleList } from '@/api/role'
export default {
  neme: 'Role',
  data() {
    return {
      rows: [],
      total: null
    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    async getRoleList() {
      const { rows, total } = await getRoleList()
      this.rows = rows
      this.total = total
    }
  }
}
</script>

<style scoped>
.role-operate{
  padding: 10px;
}
</style>
