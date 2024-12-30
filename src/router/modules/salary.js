import layout from '@/layout'

export default {
  path: '/salary',
  component: layout,
  children: [{
    name: 'salary',
    path: '',
    component: () => import('@/views/salary'),
    meta: {
      title: '工资',
      icon: 'money'
    }
  }]
}
