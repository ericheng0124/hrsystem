<!-- 添加子部门的弹层表单 -->

<template>
  <!-- :close-on-click-modal="false" 关闭点击蒙层关闭弹层效果 -->
  <el-dialog title="新增部门" :visible="showDialog" :close-on-click-modal="false" @close="close">
    <!-- 放置弹层表单 -->

  </el-dialog>
</template>

<script>
export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    close() {
      // 修改父组件的值 子传父
      this.$emit('update:showDialog', false)
    }
  }
}
</script>

<style>

</style>
