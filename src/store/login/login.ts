import { defineStore } from 'pinia'
import { accountLoginRequest, getUserInfoById, getUserMenusByRoleId } from '@/service/login/login'
import type { IAccount } from '@/types/index'
import { localCache } from '@/utils/cache'
import router from '@/router'
import { LOGIN_TOKEN, LOGIN_ID } from '@/global/constants'
import { mapMenusToRoutes } from '@/utils/map-menus'

interface ILoginState {
  id: number | null
  token: string
  userInfo: any // 因为属性太多了，后期可以根据swagger + 插件进行接口直接转化为ts类型。
  userMenus: any
}

const useLoginStore = defineStore('login', {
  state: (): ILoginState => ({
    token: localCache.getCache(LOGIN_TOKEN) ?? '',
    userInfo: localCache.getCache('userInfo') ?? {},
    id: localCache.getCache('userInfo') ?? null,
    userMenus: []
  }),
  actions: {
    async loginAccountAction(account: IAccount) {
      // 1.账号登录, 获取token等信息
      const loginResult = await accountLoginRequest(account)
      const id = loginResult.data.id
      this.token = loginResult.data.token
      localCache.setCache(LOGIN_TOKEN, this.token)
      localCache.setCache(LOGIN_ID, this.id)
      this.getUserInfo(id)
    },
    async getUserInfo(id: number) {
      // 2.获取登录用户的详细信息(role信息)
      const userInfoResult = await getUserInfoById(id)
      const userInfo = userInfoResult.data
      this.userInfo = userInfo

      // 3.根据角色请求用户的权限(菜单menus)
      const userMenusResult = await getUserMenusByRoleId(this.userInfo.role.id)
      const userMenus = userMenusResult.data
      this.userMenus = userMenus

      const routes = mapMenusToRoutes(userMenus)

      routes.forEach((route) => {
        // console.log(route, '/xxx')
        /*
           {
              path: '/main/analysis/overview',
              component: () => import('@/views/main/analysis/overview/overview.vue')
            }
           */

        router.addRoute('main', route)
      })

      // 4.进行本地缓存
      localCache.setCache('userInfo', userInfo)
      // localCache.setCache('userMenus', userMenus)

      // 5.页面跳转(main页面)
      router.push('/main')
    },
    loadLocalCacheAction() {
      // 1.用户进行刷新默认加载数据
      const token = localCache.getCache(LOGIN_TOKEN)
      const userInfo = localCache.getCache('userInfo')
      const userMenus = localCache.getCache('userMenus')
      if (token && userInfo && userMenus) {
        this.token = token
        this.userInfo = userInfo
        this.userMenus = userMenus

        // 3.动态添加路由
        const routes = mapMenusToRoutes(userMenus)
        // 'main' 是路由的name
        routes.forEach((route) => router.addRoute('main', route))
      }
    }
  }
})

export default useLoginStore
