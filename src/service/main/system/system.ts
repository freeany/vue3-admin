import hyRequest from '@/service'

/** 用户的网络请求 */
export function postUsersListData(queryInfo: any) {
  return hyRequest.request({
    method: 'post',
    url: '/users/list',
    data: queryInfo
  })
}

export function deleteUserById(id: number) {
  return hyRequest.request({
    method: 'delete',
    url: `/users/${id}`
  })
}

export function newUserData(userInfo: any) {
  return hyRequest.request({
    method: 'post',
    url: '/users',
    data: userInfo
  })
}

export function editUserData(id: number, userInfo: any) {
  return hyRequest.request({
    method: 'patch',
    url: `/users/${id}`,
    data: userInfo
  })
}

/** 针对页面的网络请求: 增删改查 */
export function postPageListData(pageName: string, queryInfo: any) {
  return hyRequest.request({
    method: 'post',
    url: `/${pageName}/list`,
    data: queryInfo
  })
}

export function deletePageById(pageName: string, id: number) {
  return hyRequest.request({
    method: 'delete',
    url: `/${pageName}/${id}`
  })
}

export function newPageData(pageName: string, pageInfo: any) {
  return hyRequest.request({
    method: 'post',
    url: `/${pageName}`,
    data: pageInfo
  })
}

export function editPageData(pageName: string, id: number, pageInfo: any) {
  return hyRequest.request({
    method: 'patch',
    url: `/${pageName}/${id}`,
    data: pageInfo
  })
}
