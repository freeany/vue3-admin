import type { RouteRecordRaw } from 'vue-router'

/* 页面中的一些固定路由，错误页等 */
export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/index.vue')
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('../layout/index.vue'),
    children: [
      {
        path: 'analysis/dashboard',
        component: () => import('@/views/main/analysis/dashboard/dashboard.vue')
      },
      {
        path: 'analysis/overview',
        component: () => import('@/views/main/analysis/overview/overview.vue')
      },
      {
        path: 'product/category',
        name: 'category',
        component: () => import('@/views/main/product/category/category.vue'),
        children: []
      },
      {
        path: 'product/goods',
        name: 'goods',
        component: () => import('@/views/main/product/goods/goods.vue'),
        children: []
      },
      {
        path: 'story/chat',
        name: 'chat',
        component: () => import('@/views/main/story/chat/chat.vue'),
        children: []
      },
      {
        path: 'story/list',
        name: 'list',
        component: () => import('@/views/main/story/list/list.vue'),
        children: []
      },
      {
        path: 'system/user',
        component: () => import('@/views/main/system/user/user.vue')
      },
      {
        path: 'system/role',
        component: () => import('@/views/main/system/role/role.vue')
      },
      {
        path: 'system/menu',
        name: 'menu',
        component: () => import('@/views/main/system/menu/menu.vue'),
        children: []
      },
      {
        path: 'system/department',
        name: 'department',
        component: () => import('@/views/main/system/department/department.vue'),
        children: []
      }
    ]
  },
  {
    path: '/:pathMatch(.*)',
    component: () => import('../views/not-found/NotFound.vue')
  }
]
