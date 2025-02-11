<template>
  <!-- elementUI 的级联组件 -->
  <el-cascader
    :value="value"
    :options="depts"
    size="mini"
    :props="props"
    separator="-"
    @change="changeValue"
  />
</template>

<script>
import { getDepartment } from '@/api/department'
import { transListToTreeData } from '@/utils'
export default {
  props: {
    value: {
      type: Number, // 存储选中的部门id
      default: null
    }
  },
  data() {
    return {
      depts: [], // 部门列表 赋值给级联组件的options
      props: {
        value: 'id', // 选中要存储的值
        label: 'name' // 要展示的字段
      }
    }
  },
  created() {
    this.getDepartment()
  },
  methods: {
    // 获取部门列表的方法
    async getDepartment() {
      const result = await getDepartment()
      this.depts = transListToTreeData(result, 0)
      console.log(this.depts)
    },
    changeValue(list) {
      // console.log(list)
      // 取数组的最后一位
      if (list.length > 0) {
        this.$emit('input', list[list.length - 1])
      } else {
        this.$emit('input', null) // 如果没有内容，说明值为空
      }
    }
  }
}
</script>
