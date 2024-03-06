import { createRouter, createWebHistory } from 'vue-router'
import MainView from '../views/main/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/main'
    },
    {
      path: '/login',
      component: () => import('../views/login/index.vue')
    },
    {
      path: '/main',
      component: MainView,
      children: [
        {
          path: '/main/analysis/overview',
          component: () => import('../views/main/analysis/overview/overview.vue')
        },
        {
          path: '/main/analysis/dashboard',
          component: () => import('../views/main/analysis/dashboard/dashboard.vue')
        },
        {
          path: '/main/system/user',
          component: () => import('../views/main/system/user/user.vue')
        },
        {
          path: '/main/system/role',
          component: () => import('../views/main/system/role/role.vue')
        }
      ]
    },
    {
      path: '/:pathMatch(.*)',
      component: () => import('../views/not-found/NotFound.vue')
    }
  ]
})

export default router
