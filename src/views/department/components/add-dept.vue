<!-- 添加子部门的弹层表单 -->

<template>
  <!-- :close-on-click-modal="false" 关闭点击蒙层关闭弹层效果 -->
  <el-dialog title="新增部门" :visible="showDialog" :close-on-click-modal="false" @close="close">
    <!-- 放置弹层表单 -->
    <el-form label-width="100px">
      <el-form-item label="部门名称">
        <el-input style="width: 80%" size="mini" placeholder="2-10个字符" />
      </el-form-item>
      <el-form-item label="部门编码">
        <el-input style="width: 80%" size="mini" placeholder="2-10个字符" />
      </el-form-item>
      <el-form-item label="部门负责人">
        <el-select style="width: 80%" size="mini" placeholder="请选择负责人" />
      </el-form-item>
      <el-form-item label="部门介绍">
        <el-input style="width: 80%" type="textarea" :rows="4" size="mini" placeholder="1-100个字符" />
      </el-form-item>
      <el-form-item>
        <!-- 按钮 -->
        <el-row type="flex" justify="center">
          <el-col :span="12">
            <el-button type="primary" size="mini">确定</el-button>
            <el-button size="mini" style="margin-left: 40px">取消</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
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
