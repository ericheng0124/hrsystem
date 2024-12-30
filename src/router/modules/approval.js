import layout from '@/layout'

export default {
  path: '/approval',
  component: layout,
  children: [{
    path: '',
    component: () => import('@/views/approval'),
    name: 'approval',
    meta: {
      title: '审批',
      icon: 'tree-table'
    }
  }]
}
