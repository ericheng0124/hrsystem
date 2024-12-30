import layout from '@/layout'

export default {
  path: '/employee',
  component: layout,
  children: [{
    name: 'employee',
    path: '',
    component: () => import('@/views/employee'),
    meta: {
      title: '员工',
      icon: 'people'
    }
  }]
}
