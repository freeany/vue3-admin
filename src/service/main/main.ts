import hyRequest from '..'

export function getEntireRoles() {
  return hyRequest.request<any, any>({
    method: 'post',
    url: '/role/list'
  })
}

export function getEntireDepartments() {
  return hyRequest.request<any, any>({
    method: 'post',
    url: '/department/list'
  })
}

export function getEntireMenus() {
  return hyRequest.request<any, any>({
    method: 'post',
    url: '/menu/list'
  })
}
