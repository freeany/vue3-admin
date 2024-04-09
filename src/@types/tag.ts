import type { RouteLocationNormalizedLoaded } from 'vue-router'

type TagKeyList = 'fullPath' | 'meta' | 'name' | 'params' | 'path' | 'query'
type FilterByRouteLocationNormalizedLoaded = Pick<RouteLocationNormalizedLoaded, TagKeyList>
export interface TagViewType extends FilterByRouteLocationNormalizedLoaded {
  title: string
}

export enum RightClickOptionsEnum {
  other = 'other',
  right = 'right',
  index = 'index'
}
