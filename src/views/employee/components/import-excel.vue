<template>
  <el-dialog
    width="500px"
    title="员工导入"
    :visible="showExcelDialog"
    :close-on-click-modal="false"
    @close="$emit('update:showExcelDialog', false)"
  >
    <el-row type="flex" justify="center">
      <div class="upload-excel">
        <input
          ref="excel-upload-input"
          class="excel-upload-input"
          type="file"
          accept=".xlsx, .xls"
          @change="uploadChange"
        >
        <div class="drop">
          <i class="el-icon-upload" />
          <el-button type="text" @click="getTemplate">下载导入模板</el-button>
          <span>将文件拖到此处或
            <el-button type="text" @click="uploadTemplate">点击上传</el-button>
          </span>
          <div v-if="filename">
            已选择上传文件：
            <span style="color:red">{{ filename }}</span>
          </div>
        </div>
      </div>
    </el-row>
    <el-row type="flex" justify="end">
      <!-- update:props属性名，值 直接修改 .sync修饰符的属性值 -->
      <el-button size="mini" type="primary" @click="$emit('update:showExcelDialog', false)">取消</el-button>
    </el-row>
  </el-dialog>
</template>
<script>
import { getExportTemplate, uploadExcel } from '@/api/employee'
import FileSaver from 'file-saver'
export default {
  props: {
    showExcelDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // 上传的文件
      filename: null
    }
  },
  methods: {
    // 获取下载模板的方法
    async getTemplate() {
      const templateExcel = await getExportTemplate()
      FileSaver.saveAs(templateExcel, '员工导入模板.xlsx')
    },
    // 弹出文件选择器-web端只有一种方式，通过input 的类型type='file'来实现
    // this.$refs.属性名 和 this.$refs['属性名'] 是等价的
    uploadTemplate() {
      this.$refs['excel-upload-input'].click() // 触发 input DOM元素的点击事件
    },
    // input DOM元素的change事件用来监听文件是否选择了
    async uploadChange(event) {
      console.log(event.target.files)
      const files = event.target.files // input DOM元素的files属性，是一个文件列表
      if (files.length > 0) {
        // 说明有需要上传的文件
        // 调用上传接口
        const data = new FormData()
        data.append('file', files[0]) // 将文件添加到form-data对象中
        this.filename = files[0].name // 保存文件名
        try {
          await uploadExcel(data) // 参数是form-data类型
          // 上传成功后，关闭弹窗
          this.$emit('uploadSuccess') // 通知父组件，上传成功
          this.$message.success('上传成功') // 提示上传成功
          this.$emit('update:showExcelDialog', false) // 关闭弹层
          // this.$refs['excel-upload-input'].value = '' // 清空input的值
        } catch (error) {
          console.log(error)
          // this.$message.error('上传失败：', error) // 提示上传失败
          // this.$refs['excel-upload-input'].value = '' // 清空input的值
        } finally {
          // 不论成功或者失败，都会执行finally
          this.filename = null // 上传成功或失败后，清空文件名
          this.$refs['excel-upload-input'].value = '' // 清空input的值
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
    .upload-excel {
      display: flex;
      justify-content: center;
      margin: 20px;
      width: 360px;
      height: 180px;
      align-items: center;
      color: #697086;
      .excel-upload-input {
        display: none;
        z-index: -9999;
      }
      .btn-upload,
      .drop {
        border: 1px dashed #dcdfe6;
        width: 100%;
        height: 100%;
        text-align: center;
        line-height: 160px;
        border-radius: 8px;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
      .drop {
        line-height: 40px;
        color: #bbb;
        i {
          font-size: 60px;
          display: block;
          color: #c0c4cc;
        }
      }
    }
</style>
