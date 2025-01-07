<template>
  <div class="container">
    <div class="app-container">
      <!-- 角色管理的内容 -->
      <div class="role-operate">
        <el-button type="primary" size="mini">添加角色</el-button>
      </div>
      <!-- 放置table组件 -->
      <el-table>
        <!-- 放置列 -->
        <el-table-column width="200px" label="角色" align="center" />
        <el-table-column width="200px" label="启用" align="center" />
        <el-table-column label="描述" align="center" />
        <el-table-column label="操作" align="center" />
      </el-table>
      <!-- 放置分页组件 -->
      <el-row type="flex" justify="end" style="height: 60px;" align="middle">
        <!-- 放置分页组件 -->
        <el-pagination background layout="prev,pager,next" :total="100" />
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  neme: 'Role'
}
</script>

<style scoped>
.role-operate{
  padding: 10px;
}
</style>
