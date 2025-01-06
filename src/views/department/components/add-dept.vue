<!-- 添加子部门的弹层表单 -->

<template>
  <!-- :close-on-click-modal="false" 关闭点击蒙层关闭弹层效果 -->
  <el-dialog title="新增部门" :visible="showDialog" :close-on-click-modal="false" @close="close">
    <!-- 放置弹层表单 -->
    <el-form ref="addDept" label-width="120px" :model="formData" :rules="rules">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="formData.name" style="width: 80%" size="mini" placeholder="2-10个字符" />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input v-model="formData.code" style="width: 80%" size="mini" placeholder="2-10个字符" />
      </el-form-item>
      <el-form-item label="部门负责人" prop="managerId">
        <el-select v-model="formData.managerId" style="width: 80%" size="mini" placeholder="请选择负责人">
          <!-- 下拉选项 循环 负责人数据 laber:显示字段 value:存储字段 -->
          <el-option v-for="item in managerList" :key="item.id" :label="item.username" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input v-model="formData.introduce" style="width: 80%" type="textarea" :rows="4" size="mini" placeholder="1-100个字符" />
      </el-form-item>
      <el-form-item>
        <!-- 按钮 -->
        <el-row type="flex" justify="center">
          <el-col :span="12">
            <el-button type="primary" size="mini">确定</el-button>
            <el-button size="mini" style="margin-left: 40px" @click="close">取消</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { getDepartment, getManagerList } from '@/api/department'
export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      formData: {
        code: '', // 部门编码
        introduce: '', // 部门介绍
        managerId: '', // 部门负责人名字
        name: '', // 部门名称
        pid: '' // 部门父级部门id
      },
      rules: {
        code: [
          { required: true, message: '部门编码不能为空', trigger: 'blur' },
          { min: 2, max: 10, message: '部门编码的长度为2-10个字符', trigger: 'blur' },
          {
            trigger: 'blur',
            // 自定义校验
            validator: async(rule, value, callback) => {
              // value -> 输入的编码
              const result = await getDepartment()
              // result 数组中是否存在value的值
              if (result.some(item => item.code === value)) {
                callback(new Error('部门中已经有该编码了'))
              } else {
                callback()
              }
            }
          }
        ], // 部门编码
        introduce: [
          { required: true, message: '部门介绍不能为空', trigger: 'blur' },
          { min: 1, max: 100, message: '部门介绍的长度为1-100个字符', trigger: 'blur' }
        ], // 部门介绍
        managerId: [
          { required: true, message: '部门负责人不能为空', trigger: 'blur' }
        ], // 部门负责人名字
        name: [
          { required: true, message: '部门名称不能为空', trigger: 'blur' },
          { min: 2, max: 10, message: '部门名称的长度为2-10个字符', trigger: 'blur' },
          {
            trigger: 'blur',
            // 自定义校验
            validator: async(rule, value, callback) => {
              // value -> 输入的编码
              const result = await getDepartment()
              // result 数组中是否存在value的值
              if (result.some(item => item.name === value)) {
                callback(new Error('部门中已经有该名称了'))
              } else {
                callback()
              }
            }
          }
        ] // 部门名称
      },
      managerList: [] // 存储负责人的列表
    }
  },
  created() {
    this.getManagerList()
  },
  methods: {
    close() {
      this.$refs.addDept.resetFields() // 清空表单内容
      // 修改父组件的值 子传父
      this.$emit('update:showDialog', false)
    },
    async getManagerList() {
      this.managerList = await getManagerList()
    }
  }
}
</script>

<style scoped>

</style>
