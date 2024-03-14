import { createRouter, createWebHistory } from 'vue-router'
import MainView from '../views/main/index.vue'
import { localCache } from '@/utils/cache'
import { LOGIN_ID, LOGIN_TOKEN } from '@/global/constants'
import { firstMenu } from '@/utils/map-menus'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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
      component: () => import('../views/main/index.vue')
    },
    {
      path: '/:pathMatch(.*)',
      component: () => import('../views/not-found/NotFound.vue')
    }
  ]
})

// 导航守卫
// 返回值: 返回值决定导航的路径(不返回或者返回undefined, 默认跳转)
router.beforeEach((to) => {
  // 只有登录成功(token), 才能真正进入到main页面
  const token = localCache.getCache(LOGIN_TOKEN)
  const id = localCache.getCache(LOGIN_ID)
  if (to.path === '/login') return // 不可return '/login' 否则无限循环
  if (!token || !id) return '/login'

  if (to.path === '/main') {
    return firstMenu?.url
  }
})
export default router
