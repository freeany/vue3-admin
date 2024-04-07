import type { Router } from 'vue-router'
import { localCache } from '@/utils/cache'
import { LOGIN_TOKEN } from '@/global/constants'

const title = import.meta.env.VITE_APP_NAME
// 白名单
const whiteList = ['/login']
export function setupRouterGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    // 判断有无TOKEN,登录鉴权
    const isLogin = Boolean(localCache.getCache(LOGIN_TOKEN))
    if (!isLogin) {
      if (to.name === 'login') next()

      if (whiteList.indexOf(to.path) > -1) {
        next()
      } else {
        const redirect = to.name === '404' ? undefined : to.fullPath
        next({ path: '/login', query: { redirect } })
      }
      return false
    }

    next()
  })

  router.afterEach((to) => {
    // 修改网页标题
    document.title = `${to.meta.title} - ${title}`
  })
}
