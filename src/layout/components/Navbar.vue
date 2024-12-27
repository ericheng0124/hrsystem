<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <!-- 头像 -->
          <img v-if="avatar" :src="avatar" class="user-avatar">
          <span v-else class="username">{{ name?.charAt(0) }}</span>
          <!-- 用户名称 -->
          <span class="user-username">{{ name }}</span>
          <i class="el-icon-setting" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item>
              首页
            </el-dropdown-item>
          </router-link>
          <a target="_blank" href="https://github.com/ericheng0124/hrsystem.git">
            <el-dropdown-item>项目地址</el-dropdown-item>
          </a>
          <!-- 阻止默认事件 使用修饰符 prevent -->
          <!-- native事件修饰符 -->
          <!-- 注册组件的根元素的原生事件 -->
          <a target="_blank" @click.prevent="updatePassword">
            <el-dropdown-item>修改密码</el-dropdown-item>
          </a>

          <!-- <el-dropdown-item @click.native="logout">
            <span style="display:block;">登出</span>
          </el-dropdown-item> -->
          <a target="_blank" @click.prevent.stop="isShowLogout = true">
            <el-dropdown-item>登出</el-dropdown-item>
          </a>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <!-- dialog 弹层 -->
    <!-- sync 可以接收子组件传过来的事件和值 -->
    <!-- :close-on-click-modal="false" 取消点击蒙层关闭弹框的效果 -->
    <!-- append-to-body - Dialog 自身是否插入至 body 元素上 嵌套的 Dialog 必须指定该属性并赋值为 true -->
    <!-- 退出登陆的弹层 -->
    <el-dialog title="退出登陆" width="500px" :visible.sync="isShowLogout" :close-on-click-modal="false" append-to-body>
      <span>确认需要退出登陆吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShowLogout = false">取 消</el-button>
        <el-button type="primary" @click="logout">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改密码的弹层 -->
    <el-dialog title="修改密码" width="500px" :visible.sync="dialogVisible" :close-on-click-modal="false" append-to-body @close="btnCancle">
      <!-- 放置表单 -->
      <el-form ref="passForm" label-width="120px" :model="passForm" :rules="passRules">
        <el-form-item label="原密码" prop="oldPassword">
          <el-input v-model="passForm.oldPassword" size="small" type="password" />
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input v-model="passForm.newPassword" size="small" type="password" />
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input v-model="passForm.confirmPassword" size="small" type="password" />
        </el-form-item>
        <el-form-item>
          <el-button size="mini" type="primary" @click="btnOK">修改密码</el-button>
          <el-button size="mini" @click="btnCancle">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import { updateUserPassword } from '@/api/user'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  data() {
    return {
      dialogVisible: false, // 控制修改密码的弹层
      isShowLogout: false, // 控制退出登陆的弹层
      passForm: {
        oldPassword: '', // 原密码
        newPassword: '', // 新密码
        confirmPassword: '' // 确认密码
      },
      passRules: {
        oldPassword: [
          { required: true, message: '请输入原密码', trigger: 'blur' }
        ], // 原密码效验规则
        newPassword: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { min: 6, max: 16, message: '新密码长度为6-16位之间', trigger: 'blur' }
        ], // 新密码效验规则
        confirmPassword: [
          { required: true, message: '请输入确认密码', trigger: 'blur' },
          { validator: (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请再次输入密码'))
            } else if (value !== this.passForm.newPassword) {
              callback(new Error('两次输入的密码不一致'))
            } else {
              callback()
            }
          }, trigger: 'blur'
          }
        ] // 确认密码效验规则
      }
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar', // 引入头像
      'name' // 引入用户名
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push('/login')
      this.isShowLogout = false
    },
    updatePassword() {
      this.dialogVisible = true
    },
    btnOK() {
      this.$refs.passForm.validate(async isOK => {
        if (isOK) { // 效验通过
          // console.log(this.passForm.oldPassword, this.passForm.newPassword, this.passForm.confirmPassword)
          // 调用api接口发送请求
          await updateUserPassword({
            oldPassword: this.passForm.oldPassword,
            newPassword: this.passForm.newPassword
          })
          this.$message.success('修改密码成功')
          this.$refs.passForm.resetFields() // 重置表单
          this.dialogVisible = false // 关闭弹层
          this.$router.push('/login') // 跳转到登陆页
        }
      })
    },
    btnCancle() {
      this.$refs.passForm.resetFields() // 重置表单
      this.dialogVisible = false // 关闭弹层
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
        display: flex;
        align-items: center;

        .user-username{
          margin-right: 10px;
          font-size: 16px;
        }

        .user-avatar {
          cursor: pointer;
          width: 30px;
          height: 30px;
          border-radius: 50%;
        }

        .username {
          background-color: #04c9be;
          color:white;
          width: 30px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          border-radius: 50%;
          margin-right: 4px;
        }

        .el-icon-setting{
          font-size: 18px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
