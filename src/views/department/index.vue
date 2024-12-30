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
      <el-tree :data="depts" :props="defaultProps" default-expand-all />
    </div>
  </div>
</template>

<script>

export default {
  neme: 'Department',
  data() {
    return {
      depts: [
        { name: '传智教育',
          children: [
            {
              name: '总裁办'
            },
            {
              name: '行政部'
            },
            {
              name: '人事部'
            }
          ]
        }
      ], // 数据树形
      defaultProps: {
        label: 'name', // 要显示的字段的名字
        children: 'children'
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
</style>
