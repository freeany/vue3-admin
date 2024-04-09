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
    component: () => import('../views/login/index.vue'),
    meta: {
      title: '登录'
    }
  },
  {
    path: '/main',
    name: 'main',
    redirect: '/main/analysis/overview',
    component: () => import('../layout/index.vue'),
    children: [
      {
        path: 'analysis/dashboard',
        name: 'dashboard',
        component: () => import('@/views/main/analysis/dashboard/dashboard.vue'),
        meta: {
          title: '控制台'
        }
      },
      {
        path: 'analysis/overview',
        name: 'overview',
        component: () => import('@/views/main/analysis/overview/overview.vue'),
        meta: {
          title: '总览'
        }
      },
      {
        path: 'product/category',
        name: 'category',
        component: () => import('@/views/main/product/category/category.vue'),
        meta: {
          title: '商品类别'
        }
      },
      {
        path: 'product/goods',
        name: 'goods',
        component: () => import('@/views/main/product/goods/goods.vue'),
        meta: {
          title: '商品信息'
        }
      },
      {
        path: 'story/chat',
        name: 'chat',
        component: () => import('@/views/main/story/chat/chat.vue'),
        meta: {
          title: '聊天'
        }
      },
      {
        path: 'story/list',
        name: 'list',
        component: () => import('@/views/main/story/list/list.vue'),
        meta: {
          title: '故事列表'
        }
      },
      {
        path: 'system/user',
        name: 'user',
        component: () => import('@/views/main/system/user/user.vue'),
        meta: {
          title: '用户管理'
        }
      },
      {
        path: 'system/role',
        name: 'role',
        component: () => import('@/views/main/system/role/role.vue'),
        meta: {
          title: '角色管理'
        }
      },
      {
        path: 'system/menu',
        name: 'menu',
        component: () => import('@/views/main/system/menu/menu.vue'),
        meta: {
          title: '菜单管理'
        }
      },
      {
        path: 'system/department',
        name: 'department',
        component: () => import('@/views/main/system/department/department.vue'),
        meta: {
          title: '部门管理'
        }
      }
    ]
  },
  {
    path: '/:pathMatch(.*)',
    component: () => import('../views/not-found/NotFound.vue'),
    meta: {
      title: '404'
    }
  }
]
