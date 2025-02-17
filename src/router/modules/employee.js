import layout from '@/layout'
export default {
  path: '/employee',
  component: layout,
  children: [{
    path: '',
    name: 'employee',
    component: () => import('@/views/employee'),
    meta: {
      title: '员工',
      icon: 'people'
    }
  }, {
    path: '/employee/detail', // 员工详情的地址
    component: () => import('@/views/employee/detail.vue'),
    hidden: true, // 表示隐藏在左侧菜单
    meta: {
      title: '员工详情' // 显示在导航的文本
    }
  }]
}

// 只想在左侧菜单显示一级路由，让二级路由只有一个显示在左侧菜单，就想不想显示的二级路由添加一个hidden属性，值为true
