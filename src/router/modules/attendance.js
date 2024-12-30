import layout from '@/layout'

export default {
  path: '/attendance',
  component: layout,
  children: [{
    name: 'attendance',
    path: '',
    component: () => import('@/views/attendance'),
    meta: {
      title: '考勤',
      icon: 'excel'
    }
  }]
}
