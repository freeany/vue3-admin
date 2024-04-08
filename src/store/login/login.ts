import { defineStore } from 'pinia'
import { accountLoginRequest, getUserInfoById, getUserMenusByRoleId } from '@/service/login/login'
import type { IAccount } from '@/types'
import { localCache } from '@/utils/storage'
import { mapMenuToPersssions } from '@/utils/map-menu'
import router from '@/router'
import { LOGIN_TOKEN } from '@/global/constants'
import useMainStore from '../main/main'

interface ILoginState {
  token: string
  userInfo: any
  userMenus: any
  permissions: string[]
}

const useLoginStore = defineStore('login', {
  // 如何制定state的类型
  state: (): ILoginState => ({
    token: localCache.getItem(LOGIN_TOKEN) || '',
    userInfo: {},
    userMenus: [],
    permissions: []
  }),
  actions: {
    async loginAccountAction(account: IAccount) {
      // 1.账号登录, 获取token等信息
      const loginResult = await accountLoginRequest(account)
      const id = loginResult.data.id
      this.token = loginResult.data.token
      localCache.setItem(LOGIN_TOKEN, this.token)

      // 2.获取登录用户的详细信息(role信息)
      const userInfoResult = await getUserInfoById(id)
      const userInfo = userInfoResult.data
      this.userInfo = userInfo

      // 3.根据角色请求用户的权限(菜单menus)
      const userMenusResult = await getUserMenusByRoleId(this.userInfo.role.id)
      const userMenus = userMenusResult.data
      this.userMenus = userMenus

      // 4.进行本地缓存
      localCache.setItem('userInfo', userInfo)
      localCache.setItem('userMenus', userMenus)

      // 5.请求所有roles/departments数据
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()

      // 重要: 获取登录用户的所有按钮的权限
      const permissions = mapMenuToPersssions(userMenus)
      this.permissions = permissions

      // 重要: 动态的添加路由
      // routes.forEach((route) => router.addRoute('main', route))

      // 5.页面跳转(main页面)
      router.push('/main')
    },
    loadLocalCacheAction() {
      // 1.用户进行刷新默认加载数据
      const token = localCache.getItem(LOGIN_TOKEN)
      const userInfo = localCache.getItem('userInfo')
      const userMenus = localCache.getItem('userMenus')
      if (token && userInfo && userMenus) {
        this.token = token
        this.userInfo = userInfo
        this.userMenus = userMenus

        // 1..请求所有roles/departments数据
        const mainStore = useMainStore()
        mainStore.fetchEntireDataAction()

        // 2.获取按钮的权限
        const permissions = mapMenuToPersssions(userMenus)
        this.permissions = permissions

        // 3.动态添加路由
        // routes.forEach((route) => router.addRoute('main', route))
      }
    },
    logout() {
      localCache.removeCache('token')
      localCache.removeCache('userInfo')
      localCache.removeCache('userMenus')
      router.push('/login')
    }
  }
})

export default useLoginStore
