<template>
  <div class="dashboard-container">
    <div class="app-container">
      <div class="edit-form">
        <el-form ref="userForm" label-width="220px" :rules="rules" :model="userInfo">
          <!-- 姓名 -->
          <el-row>
            <el-col :span="12">
              <el-form-item label="姓名" prop="username">
                <el-input v-model="userInfo.username" size="mini" class="inputW" />
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 手机 -->
          <el-row>
            <el-col :span="12">
              <el-form-item label="手机" prop="mobile">
                <el-input
                  v-model="userInfo.mobile"
                  size="mini"
                  class="inputW"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 工号 -->
          <el-row>
            <el-col :span="12">
              <el-form-item label="工号" prop="workNumber">
                <!-- 工号是系统生成的 所以需要禁用 -->
                <el-input v-model="userInfo.workNumber" size="mini" class="inputW" disabled />
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 部门 -->
          <el-row>
            <el-col :span="12">
              <el-form-item label="部门" prop="departmentId">
                <!-- 放置及联部门组件 -->
                <!-- inputW样式会给到selectTree中的template的第一层的组件 -->
                <select-tree v-model="userInfo.departmentId" class="inputW" />
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 聘用形式 -->
          <el-row>
            <el-col :span="12">
              <el-form-item label="聘用形式" prop="formOfEmployment">
                <el-select v-model="userInfo.formOfEmployment" size="mini" class="inputW">
                  <el-option label="正式" :value="1" />
                  <el-option label="非正式" :value="2" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 入职时间 -->
          <el-row>
            <el-col :span="12">
              <el-form-item label="入职时间" prop="timeOfEntry">
                <el-date-picker
                  v-model="userInfo.timeOfEntry"
                  size="mini"
                  type="date"
                  value-format="yyyy-MM-dd"
                  class="inputW"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 转正时间 -->
          <el-row>
            <el-col :span="12">
              <el-form-item label="转正时间" prop="correctionTime">
                <el-date-picker
                  v-model="userInfo.correctionTime"
                  size="mini"
                  type="date"
                  class="inputW"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 员工照片 -->
          <el-row>
            <el-col :span="12">
              <el-form-item label="员工头像">
                <!-- 放置上传图片 -->
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 保存个人信息 -->
          <el-row type="flex">
            <el-col :span="12" style="margin-left:220px">
              <el-button size="mini" type="primary" @click="saveData">保存更新</el-button>
            </el-col>
          </el-row>
        </el-form>
      </div>

    </div>
  </div>
</template>

<script>
import selectTree from './components/select-tree.vue'
export default {
  components: {
    selectTree
  },
  data() {
    return {
      depts: [], // 部门列表
      userInfo: {
        username: '', // 员工姓名
        workNumber: '', // 员工工号
        mobile: '', // 员工手机号
        departmentId: null, // 员工部门id
        formOfEmployment: '', // 聘用形式
        timeOfEntry: '', // 入职时间
        correctionTime: '' // 转正时间
      },
      rules: {
        // 员工姓名效验规则
        username: [
          { required: true, message: '请输入员工姓名', trigger: 'blur' },
          { min: 2, max: 6, message: '长度在 2 到 6 个字符', trigger: 'blur' }
        ],
        // 员工手机号效验规则
        mobile: [
          { required: true, message: '请输入员工手机号', trigger: 'blur' },
          { pattern: '/^1[3-9]\d{9}$/', message: '手机号格式不正确', trigger: 'blur' }
        ],
        // 员工部门id效验规则
        departmentId: [{ required: true, message: '请选择员工所属部门', trigger: 'blur' }],
        // 聘用形式效验规则
        formOfEmployment: [{ required: true, message: '请选择员工所属聘用形式', trigger: 'blur' }],
        // 入职时间效验规则
        timeOfEntry: [{ required: true, message: '请选择员工入职时间', trigger: 'blur' }],
        // 转正时间效验规则
        correctionTime: [
          { required: true, message: '请选择员工转正时间', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              if (this.userInfo.timeOfEntry) {
                if (new Date(this.userInfo.timeOfEntry) > new Date(value)) {
                  callback(new Error('转正时间不能早于入职时间'))
                  return
                }
              }
              callback()
            }
          }
        ]
      }
    }
  },
  methods: {
    saveData() {
      this.$refs.userForm.validate()
    }
  }
}
</script>

<style scoped lang="scss">
    .edit-form {
      background: #fff;
      padding: 20px;
      .inputW {
        width: 380px
      }
    }

</style>
