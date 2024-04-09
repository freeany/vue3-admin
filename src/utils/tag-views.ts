const whiteList = ['/login', '/import', '/404', '/401']

/**
 * path 是否需要被缓存
 * @param {*} path
 * @returns boolean
 */
export function isTags(path: string) {
  return !whiteList.includes(path)
}
