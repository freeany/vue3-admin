import hyRequest from '..'
import type { IAccount } from '@/types'
// import { localCache } from '@/utils/cache'
// import { LOGIN_TOKEN } from '@/global/constants'

export function accountLoginRequest(account: IAccount) {
  return hyRequest.request<any, any>({
    method: 'POST',
    url: '/login',
    data: account
  })
}

export function getUserInfoById(id: number) {
  return hyRequest.request<any, any>({
    method: 'GET',
    url: `/users/${id}`
  })
}

export function getUserMenusByRoleId(id: number) {
  return hyRequest.request<any, any>({
    method: 'GET',
    url: `/role/${id}/menu`
  })
}
