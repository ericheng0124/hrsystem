import router from '@/router'
import nProgress from 'nprogress' // 引入进度条
import 'nprogress/nprogress.css' // 引入进度条样式
import store from '@/store'
import { getUserInfo } from './api/user'

/*
  前置守卫
*/

// 白名单页面
const whiteList = ['/login', '/404']

router.beforeEach(async(to, from, next) => {
  nProgress.start() // 开启进度条
  // 判断是否存在token
  if (store.getters.token) {
    // 存在token
    if (to.path === '/login') {
      // 有token访问的是登录页，跳转到主页
      next('/') // 跳转到中转页
      // next(有地址)并没有执行后置守卫，如果next(没有地址)默认会进入到后置守卫
      nProgress.done() // next(有地址）需要手动关闭进度条
    } else {
      // 判断是否获取过用户资料
      if (!store.getters.userId) {
        await store.dispatch('user/getUserInfo')
      }
      next() // 直接放行
    }
  } else {
    // 没有token
    if (whiteList.includes(to.path)) {
      next() // 访问的地址在白名单列表直接放行
    } else {
      next('/login') // 不在跳转到登录页
      nProgress.done() // next(有地址）需要手动关闭进度条
    }
  }
})

/*
  后置守卫
*/
router.afterEach(() => {
  nProgress.done() // 关闭进度条
})
